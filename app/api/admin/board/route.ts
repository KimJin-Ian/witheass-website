import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { SITE, db } from "@/lib/board";

/**
 * 관리자 — 게시판 글 관리 (관리자 로그인 쿠키 필요)
 *   GET              최근 글 200개 (지운 글 포함) · 회원 수
 *   DELETE ?id=      글 숨기기 (deleted_at) · PATCH ?id= 다시 보이기
 */
export const dynamic = "force-dynamic";

const deny = () => NextResponse.json({ error: "Unauthorized" }, { status: 401 });

export async function GET() {
  if (!(await isAuthenticated())) return deny();
  const sb = db();
  const [posts, members] = await Promise.all([
    sb.from("board_posts").select("id, title, body, created_at, deleted_at, board_members(username)")
      .eq("site", SITE).order("created_at", { ascending: false }).limit(200),
    sb.from("board_members").select("id", { count: "exact", head: true }).eq("site", SITE),
  ]);
  if (posts.error) {
    const missing = /PGRST205|42P01|schema cache/i.test(`${posts.error.code} ${posts.error.message}`);
    return NextResponse.json({ error: missing ? "게시판 표가 아직 없습니다 — scripts/board-schema.sql 을 Supabase SQL Editor 에서 실행해 주세요." : posts.error.message }, { status: missing ? 503 : 500 });
  }
  return NextResponse.json({
    members: members.count ?? 0,
    posts: (posts.data ?? []).map((p: any) => ({ ...p, username: p.board_members?.username ?? "—", board_members: undefined })),
  });
}

async function setDeleted(req: Request, deleted: boolean) {
  if (!(await isAuthenticated())) return deny();
  const id = Number(new URL(req.url).searchParams.get("id"));
  if (!Number.isSafeInteger(id) || id < 1) return NextResponse.json({ error: "id" }, { status: 400 });
  const { error } = await db().from("board_posts").update({ deleted_at: deleted ? new Date().toISOString() : null }).eq("site", SITE).eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

export const DELETE = (req: Request) => setDeleted(req, true);
export const PATCH = (req: Request) => setDeleted(req, false);
