import { NextResponse } from "next/server";
import { SITE, currentMember, db } from "@/lib/board";

/**
 * POST /api/board/posts — 글쓰기 (로그인한 회원만)
 * 글자는 그대로 저장하고, 화면에서는 글자로만 보여 준다 (HTML 로 해석하지 않는다).
 * 도배 막기: 한 사람이 10분에 5개까지.
 */
export const dynamic = "force-dynamic";

const fail = (error: string, status = 400) => NextResponse.json({ error }, { status });
// 보이지 않는 제어 문자는 지운다 (줄바꿈 · 탭은 남긴다)
const clean = (s: string) => s.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim();

export async function POST(req: Request) {
  const me = await currentMember();
  if (!me) return fail("needLogin", 401);
  const b = await req.json().catch(() => ({}));
  const title = clean(String(b.title ?? "")).replace(/\s+/g, " ");
  const body = clean(String(b.body ?? "")).replace(/\r\n/g, "\n");
  if (title.length < 1 || title.length > 100) return fail("err_title");
  if (body.length < 1 || body.length > 5000) return fail("err_body");
  try {
    const sb = db();
    const { count } = await sb.from("board_posts").select("id", { count: "exact", head: true })
      .eq("member_id", me.id).gte("created_at", new Date(Date.now() - 10 * 60e3).toISOString());
    if ((count ?? 0) >= 5) return fail("err_rate", 429);
    const { data, error } = await sb.from("board_posts").insert({ site: SITE, member_id: me.id, title, body }).select("id").single();
    if (error) throw error;
    return NextResponse.json({ ok: true, id: (data as any).id });
  } catch (e: any) {
    console.error("board post", e?.message ?? e);
    return fail("err_server", 500);
  }
}
