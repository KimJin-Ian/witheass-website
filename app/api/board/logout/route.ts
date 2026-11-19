import { NextResponse } from "next/server";
import { clearMemberCookie } from "@/lib/board";

/** POST /api/board/logout — 게시판 로그인 쿠키만 지운다 (관리자 로그인과 무관) */
export const dynamic = "force-dynamic";

export async function POST() {
  clearMemberCookie();
  return NextResponse.json({ ok: true });
}
