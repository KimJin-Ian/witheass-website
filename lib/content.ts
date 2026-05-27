/**
 * Supabase에서 사이트 콘텐츠 가져오기 (witheass-website 전용)
 *
 * 사용 방식:
 *   - Server Component에서 호출
 *   - Next.js cache로 자동 캐싱 (60초)
 *   - DB 비어있으면 fallback 사용
 *
 * 예:
 *   const hero = await getContent("hero", "ko");
 *   // hero.title1, hero.title2 ...
 */

import { unstable_cache } from "next/cache";
import { supabase, SITE_KEY } from "./supabase";

export type ContentMap = Record<string, string>;

/**
 * 특정 섹션의 콘텐츠를 key-value로 반환
 * 예: { title1: "책 한 권으로...", title2: "..." }
 */
export const getContent = unstable_cache(
  async (section: string, lang: string = "ko"): Promise<ContentMap> => {
    try {
      const { data, error } = await supabase
        .from("content")
        .select("content_key, value")
        .eq("site", SITE_KEY)
        .eq("section", section)
        .eq("lang", lang);

      if (error) {
        console.error(`[getContent] ${section}/${lang}:`, error.message);
        return {};
      }

      const map: ContentMap = {};
      for (const row of data || []) {
        map[(row as any).content_key] = (row as any).value;
      }
      return map;
    } catch (e) {
      console.error("[getContent] fetch error:", e);
      return {};
    }
  },
  ["content"],
  { revalidate: 60, tags: ["content"] }
);

/**
 * 사이트 설정 (도메인, 연락처 등)
 */
export const getSiteSettings = unstable_cache(
  async (lang: string = "ko") => {
    try {
      const { data, error } = await supabase
        .from("site_settings")
        .select("*")
        .eq("site", SITE_KEY)
        .maybeSingle();

      if (error) {
        console.error("[getSiteSettings]:", error.message);
        return null;
      }
      return data as any;
    } catch (e) {
      console.error("[getSiteSettings] fetch error:", e);
      return null;
    }
  },
  ["site_settings"],
  { revalidate: 60, tags: ["settings"] }
);

/**
 * 발행된 블로그 글 목록
 */
export const getPublishedPosts = unstable_cache(
  async (lang: string = "ko", limit: number = 20) => {
    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("id, slug, title, excerpt, cover_image_url, tags, reading_time, published_at, view_count")
        .eq("site", SITE_KEY)
        .eq("lang", lang)
        .eq("status", "published")
        .is("deleted_at", null)
        .order("published_at", { ascending: false })
        .limit(limit);

      if (error) {
        console.error("[getPublishedPosts]:", error.message);
        return [];
      }
      return (data || []) as any[];
    } catch (e) {
      console.error("[getPublishedPosts] fetch error:", e);
      return [];
    }
  },
  ["blog_posts_list"],
  { revalidate: 60, tags: ["blog"] }
);

/**
 * 단일 블로그 글 (slug로 조회)
 */
export const getPostBySlug = unstable_cache(
  async (slug: string, lang: string = "ko") => {
    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("site", SITE_KEY)
        .eq("slug", slug)
        .eq("lang", lang)
        .eq("status", "published")
        .is("deleted_at", null)
        .maybeSingle();

      if (error) {
        console.error("[getPostBySlug]:", error.message);
        return null;
      }
      return data as any;
    } catch (e) {
      console.error("[getPostBySlug] fetch error:", e);
      return null;
    }
  },
  ["blog_post"],
  { revalidate: 60, tags: ["blog"] }
);

/**
 * 폴백 헬퍼: DB 값이 없으면 fallback 사용
 */
export function withFallback<T extends ContentMap>(
  fromDb: ContentMap,
  fallback: T
): T {
  const merged: any = { ...fallback };
  for (const [key, value] of Object.entries(fromDb)) {
    if (value !== undefined && value !== null && value !== "") {
      merged[key] = value;
    }
  }
  return merged;
}
