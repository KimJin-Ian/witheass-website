import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { SITE, db, setMemberCookie, signMember } from "@/lib/board";

/**
 * POST /api/board/login — 아이디 + 비밀번호
 * 5번 연속 틀리면 그 아이디를 10분 잠근다. 없는 아이디도 같은 답 · 비슷한 시간으로 돌려준다 (있는 아이디를 알아내지 못하게).
 */
export const dynamic = "force-dynamic";

const fail = (error: string, status = 400) => NextResponse.json({ error }, { status });
const notReady = (e: any) => /PGRST205|42P01|does not exist|schema cache/i.test(String(e?.message ?? e?.code ?? ""));
// 없는 아이디일 때도 bcrypt 비교를 한 번 해서 걸리는 시간을 맞춘다 (모양이 올바른 해시여야 비교가 실제로 돈다)
const DUMMY = bcrypt.hashSync("not-a-real-password-for-timing", 10);

export async function POST(req: Request) {
  const b = await req.json().catch(() => ({}));
  const username = String(b.username ?? "").trim().toLowerCase();
  const password = String(b.password ?? "");
  if (!username || !password) return fail("err_login", 401);
  try {
    const sb = db();
    const { data: m, error } = await sb.from("board_members")
      .select("id, username, password_hash, failed_count, locked_until").eq("site", SITE).eq("username", username).maybeSingle();
    if (error) { if (notReady(error)) return fail("notReady", 503); throw error; }
    if (!m) { await bcrypt.compare(password, DUMMY); return fail("err_login", 401); }
    const mm: any = m;
    if (mm.locked_until && Date.parse(mm.locked_until) > Date.now()) return fail("err_locked", 429);

    const ok = await bcrypt.compare(password, mm.password_hash);
    if (!ok) {
      const n = (mm.failed_count ?? 0) + 1;
      await sb.from("board_members").update(n >= 5
        ? { failed_count: 0, locked_until: new Date(Date.now() + 10 * 60e3).toISOString() }
        : { failed_count: n }).eq("id", mm.id);
      return fail(n >= 5 ? "err_locked" : "err_login", n >= 5 ? 429 : 401);
    }
    await sb.from("board_members").update({ failed_count: 0, locked_until: null, last_login_at: new Date().toISOString() }).eq("id", mm.id);
    setMemberCookie(await signMember({ id: mm.id, username: mm.username }));
    return NextResponse.json({ ok: true, username: mm.username });
  } catch (e: any) {
    if (notReady(e)) return fail("notReady", 503);
    console.error("board login", e?.message ?? e);
    return fail("err_server", 500);
  }
}
