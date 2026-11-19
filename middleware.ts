import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const COOKIE_NAME = "admin_session";

// ─── 게시판 회원 열쇠 (lib/board.ts 와 같은 방식 — JWT_SECRET 에서 게시판 전용 키를 뽑는다, 2026-11-19) ───
// 관리자 열쇠와 키가 달라서 서로의 자리에 넣어도 통과하지 못한다. 미들웨어는 Edge 라 Web Crypto 로 뽑는다.
const BOARD_COOKIE = "we_board";
const BOARD_RE = /^\/board\/(write|login|signup)$/;

async function isBoardMember(token: string | undefined): Promise<boolean> {
  const secret = process.env.JWT_SECRET;
  if (!token || !secret) return false;
  try {
    const key = new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`${secret}|witheass-board-member`)));
    await jwtVerify(token, key, { audience: "board" });
    return true;
  } catch {
    return false;
  }
}
const safeNext = (next: string | null) => (next && next.startsWith("/board") && !next.startsWith("//") ? next : "/board");

async function isValid(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const secret = process.env.JWT_SECRET;
  if (!secret) return false;

  try {
    await jwtVerify(token, new TextEncoder().encode(secret));
    return true;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // 게시판 — 글쓰기는 회원만, 로그인 · 가입 화면은 이미 로그인했으면 돌아갈 곳으로 (화면 깜빡임 없이 바로 307)
  const bm = pathname.match(BOARD_RE);
  if (bm) {
    const member = await isBoardMember(request.cookies.get(BOARD_COOKIE)?.value);
    if (bm[1] === "write" && !member) {
      const to = new URL("/board/login", request.url);
      to.searchParams.set("next", "/board/write");
      return NextResponse.redirect(to);
    }
    if (bm[1] !== "write" && member) return NextResponse.redirect(new URL(safeNext(searchParams.get("next")), request.url));
    return NextResponse.next();
  }

  /**
   * 옛 아임웹 게시판 주소(?bmode=view&idx=…) → 홈으로, **쿼리를 떼고** 보낸다.
   *
   * 예전에는 next.config 의 redirects 로 했다. 그런데 Next 는 리다이렉트할 때 요청 쿼리를
   * 목적지에 그대로 붙인다. 그래서 "/?bmode=…" 로 보내졌고, 그 주소가 같은 규칙에 또 걸려
   * 자기 자신으로 끝없이 돌았다 — 구글 서치콘솔의 "리디렉션 오류" 가 이것이었다.
   * 미들웨어에서는 목적지 주소를 직접 만들 수 있어 쿼리를 확실히 뗀다.
   */
  if (searchParams.has("bmode")) {
    return NextResponse.redirect(new URL("/", request.url), 308);
  }

  // /admin 경로 보호 (단, /admin/login 과 /admin/api/login 제외)
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login") && !pathname.startsWith("/api/admin/login")) {
    const token = request.cookies.get(COOKIE_NAME)?.value;
    const valid = await isValid(token);

    if (!valid) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 이미 로그인한 사용자가 /admin/login 접속하면 대시보드로 리다이렉트
  if (pathname === "/admin/login") {
    const token = request.cookies.get(COOKIE_NAME)?.value;
    const valid = await isValid(token);
    if (valid) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    { source: "/admin/:path*" },
    // 게시판 글쓰기 · 로그인 · 가입
    { source: "/board/write" },
    { source: "/board/login" },
    { source: "/board/signup" },
    // 아임웹 게시판 주소만 — 나머지 페이지는 미들웨어를 거치지 않는다
    { source: "/:path*", has: [{ type: "query", key: "bmode" }] },
  ],
};
