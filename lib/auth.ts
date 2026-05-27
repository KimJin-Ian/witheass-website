/**
 * Admin 인증 라이브러리
 *
 * 사용법:
 * - .env.local 에 ADMIN_PASSWORD와 JWT_SECRET 설정
 * - Vercel 환경변수에도 동일하게 설정 (Production)
 */

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";

const COOKIE_NAME = "admin_session";
const SESSION_DURATION = 60 * 60 * 24 * 7; // 7일

// JWT 비밀키 (환경변수)
function getSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET 환경변수가 설정되지 않았습니다.");
  }
  return new TextEncoder().encode(secret);
}

// 비밀번호 검증
export async function verifyPassword(input: string): Promise<boolean> {
  const stored = process.env.ADMIN_PASSWORD;
  if (!stored) return false;

  // 해시 저장된 경우 (bcrypt $2a$, $2b$, $2y$로 시작)
  if (stored.startsWith("$2")) {
    return bcrypt.compare(input, stored);
  }
  // 평문 저장 (개발용)
  return input === stored;
}

// 세션 토큰 생성
export async function createSessionToken(): Promise<string> {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION}s`)
    .sign(getSecret());
}

// 세션 토큰 검증
export async function verifySessionToken(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, getSecret());
    return true;
  } catch {
    return false;
  }
}

// 로그인 처리 (서버 액션)
export async function setSessionCookie(token: string) {
  const cookieStore = cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DURATION,
  });
}

// 로그아웃 (쿠키 삭제)
export async function clearSessionCookie() {
  const cookieStore = cookies();
  cookieStore.delete(COOKIE_NAME);
}

// 현재 사용자가 인증되었는지 확인
export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return verifySessionToken(token);
}

export const ADMIN_COOKIE_NAME = COOKIE_NAME;
