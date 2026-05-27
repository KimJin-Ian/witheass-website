/**
 * Supabase 클라이언트 (witheass-website 사이트용)
 *
 * 환경변수가 없으면 더미 URL로 초기화 (throw 방지).
 * 실제 호출 시 try-catch에서 안전하게 fail.
 */

import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key";

export const supabase = createClient(url, anonKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

export const SITE_KEY = "witheass" as const;

/**
 * Supabase 환경변수가 실제로 설정되었는지 확인
 */
export const isSupabaseConfigured =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
