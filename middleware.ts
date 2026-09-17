import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const COOKIE_NAME = "admin_session";

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
    // 아임웹 게시판 주소만 — 나머지 페이지는 미들웨어를 거치지 않는다
    { source: "/:path*", has: [{ type: "query", key: "bmode" }] },
  ],
};
