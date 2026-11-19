/**
 * 드림위드에스 출판사 홈페이지 게시판 — 서버 전용 (2026-11-19, 더웰니스앤 게시판과 같은 구조)
 *
 * 회원은 아이디 + 비밀번호만. 로그인 열쇠(쿠키 we_board)는 관리자 로그인(admin_session)과 **다른 키**로 서명한다.
 * 같은 JWT_SECRET 을 그대로 쓰면 회원 쿠키를 관리자 쿠키 자리에 넣었을 때 관리자 화면이 열린다 —
 * 그래서 JWT_SECRET 에서 게시판 전용 키를 따로 뽑고, audience 도 'board' 로 못 박는다.
 * 표: board_members · board_posts (scripts/board-schema.sql)
 */
import "server-only";
import { createHash } from "node:crypto";
import { cookies, headers } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { getAdminClient } from "./supabase-admin";

export const SITE = "witheass";
export const BOARD_COOKIE = "we_board";
export const PAGE_SIZE = 20;
const AUD = "board";

export const USERNAME_RE = /^[a-z0-9_]{4,20}$/;
export const RESERVED = /^(admin|administrator|root|witheass|dreamwithess|publisher|staff|manager|operator)/;

function boardKey(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET 이 없습니다.");
  return new Uint8Array(createHash("sha256").update(`${secret}|witheass-board-member`).digest());
}

export const db = () => getAdminClient();

export type Member = { id: string; username: string };

export async function signMember(m: Member): Promise<string> {
  return new SignJWT({ u: m.username })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(m.id)
    .setAudience(AUD)
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(boardKey());
}

export function setMemberCookie(token: string) {
  cookies().set(BOARD_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export function clearMemberCookie() {
  cookies().delete(BOARD_COOKIE);
}

/** 지금 로그인한 회원 (없거나 열쇠가 틀리면 null) */
export async function currentMember(): Promise<Member | null> {
  const token = cookies().get(BOARD_COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, boardKey(), { audience: AUD });
    if (!payload.sub || typeof payload.u !== "string") return null;
    return { id: payload.sub, username: payload.u };
  } catch {
    return null;
  }
}

/** 가입 도배 막기용 — IP 원문은 저장하지 않고 비밀값과 섞어 해시만 남긴다 */
export function ipHash(): string {
  const h = headers();
  const ip = (h.get("x-forwarded-for") ?? "").split(",")[0].trim() || h.get("x-real-ip") || "unknown";
  return createHash("sha256").update(`${process.env.JWT_SECRET ?? ""}|ip|${ip}`).digest("hex").slice(0, 32);
}

export type PostRow = { id: number; title: string; body?: string; created_at: string; member_id: string; username: string };

export async function listPosts(page: number): Promise<{ rows: PostRow[]; total: number }> {
  const from = (page - 1) * PAGE_SIZE;
  const { data, count, error } = await db().from("board_posts")
    .select("id, title, created_at, member_id, board_members(username)", { count: "exact" })
    .eq("site", SITE).is("deleted_at", null)
    .order("created_at", { ascending: false })
    .range(from, from + PAGE_SIZE - 1);
  if (error) throw new Error(error.message);
  return {
    total: count ?? 0,
    rows: ((data ?? []) as any[]).map((r) => ({ id: r.id, title: r.title, created_at: r.created_at, member_id: r.member_id, username: r.board_members?.username ?? "—" })),
  };
}

export async function getPost(id: number): Promise<PostRow | null> {
  if (!Number.isSafeInteger(id) || id < 1) return null;
  const { data } = await db().from("board_posts")
    .select("id, title, body, created_at, member_id, board_members(username)")
    .eq("site", SITE).eq("id", id).is("deleted_at", null).maybeSingle();
  if (!data) return null;
  const r: any = data;
  return { id: r.id, title: r.title, body: r.body, created_at: r.created_at, member_id: r.member_id, username: r.board_members?.username ?? "—" };
}
