import { NextResponse } from "next/server";
import { verifyPassword, createSessionToken, setSessionCookie } from "@/lib/auth";

// 간단한 rate limit (메모리 — 단일 인스턴스 가정)
const attempts = new Map<string, { count: number; resetAt: number }>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 60 * 1000; // 1분

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = attempts.get(ip);

  if (!entry || entry.resetAt < now) {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }

  if (entry.count >= MAX_ATTEMPTS) return false;
  entry.count++;
  return true;
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
  if (!rateLimit(ip)) {
    return NextResponse.json({ error: "너무 많은 시도. 1분 후 재시도해주세요." }, { status: 429 });
  }

  let password = "";
  try {
    const body = await req.json();
    password = body.password || "";
  } catch {
    return NextResponse.json({ error: "잘못된 요청" }, { status: 400 });
  }

  if (!password) {
    return NextResponse.json({ error: "비밀번호를 입력하세요" }, { status: 400 });
  }

  const ok = await verifyPassword(password);
  if (!ok) {
    return NextResponse.json({ error: "비밀번호가 일치하지 않습니다" }, { status: 401 });
  }

  const token = await createSessionToken();
  await setSessionCookie(token);

  return NextResponse.json({ success: true });
}
