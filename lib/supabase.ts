/**
 * Supabase 클라이언트 (witheass-website 사이트용)
 *
 * 권한: Anon Key (RLS 정책 적용 → 공개 데이터만 읽기)
 *
 * 사용 예:
 *   import { supabase } from "@/lib/supabase";
 *
 *   // 콘텐츠 가져오기
 *   const { data } = await supabase
 *     .from("content")
 *     .select("*")
 *     .eq("site", "witheass")
 *     .eq("lang", "ko");
 *
 *   // 블로그 글 가져오기
 *   const { data: posts } = await supabase
 *     .from("blog_posts")
 *     .select("*")
 *     .eq("site", "witheass")
 *     .eq("status", "published")
 *     .order("published_at", { ascending: false });
 */

import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = createClient(url, anonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

export const SITE_KEY = "witheass" as const;
