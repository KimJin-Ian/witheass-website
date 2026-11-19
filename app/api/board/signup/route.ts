import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { RESERVED, SITE, USERNAME_RE, db, ipHash, setMemberCookie, signMember } from "@/lib/board";

/**
 * POST /api/board/signup — 아이디 + 비밀번호로 가입하고 바로 로그인한다
 * 막는 것: 형식 · 예약어 · 중복 · 같은 곳에서 한 시간에 3번 넘는 가입 · 로봇이 채우는 숨은 칸(website)
 * 답은 { ok } 또는 { error: 문구 키 } — 화면이 언어에 맞춰 바꿔 보여 준다
 */
export const dynamic = "force-dynamic";

const fail = (error: string, status = 400) => NextResponse.json({ error }, { status });
const notReady = (e: any) => /PGRST205|42P01|does not exist|schema cache/i.test(String(e?.message ?? e?.code ?? ""));

export async function POST(req: Request) {
  const b = await req.json().catch(() => ({}));
  if (b.website) return fail("err_rate", 429); // 사람 눈에 안 보이는 칸 — 채워졌으면 로봇
  const username = String(b.username ?? "").trim().toLowerCase();
  const password = String(b.password ?? "");
  if (!USERNAME_RE.test(username)) return fail("err_username");
  if (RESERVED.test(username)) return fail("err_reserved");
  if (password.length < 8 || password.length > 72) return fail("err_password");
  if (password !== String(b.password2 ?? "")) return fail("err_password2");

  try {
    const sb = db();
    const ip = ipHash();
    const { count, error: cErr } = await sb.from("board_members").select("id", { count: "exact", head: true })
      .eq("site", SITE).eq("signup_ip_hash", ip).gte("created_at", new Date(Date.now() - 3600e3).toISOString());
    if (cErr && notReady(cErr)) return fail("notReady", 503);
    if ((count ?? 0) >= 3) return fail("err_rate", 429);

    const password_hash = await bcrypt.hash(password, 10);
    const { data, error } = await sb.from("board_members")
      .insert({ site: SITE, username, password_hash, signup_ip_hash: ip, last_login_at: new Date().toISOString() })
      .select("id, username").single();
    if (error) {
      if (notReady(error)) return fail("notReady", 503);
      if (error.code === "23505") return fail("err_taken", 409);
      throw error;
    }
    setMemberCookie(await signMember({ id: (data as any).id, username: (data as any).username }));
    return NextResponse.json({ ok: true, username });
  } catch (e: any) {
    if (notReady(e)) return fail("notReady", 503);
    console.error("board signup", e?.message ?? e);
    return fail("err_server", 500);
  }
}
