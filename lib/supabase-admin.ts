/**
 * Supabase Admin Client (서비스 롤)
 *
 * RLS를 우회하여 click_events 등 보호된 테이블 SELECT가 가능.
 * **반드시 서버사이드(API route)에서만 사용.** 클라이언트에 노출 금지.
 */

import { createClient } from "@supabase/supabase-js";

export function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error("Supabase 환경변수 (URL / SERVICE_ROLE_KEY) 미설정");
  }

  return createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export const hasAdminConfig =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;
