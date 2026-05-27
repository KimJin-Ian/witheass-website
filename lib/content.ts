/**
 * Supabase에서 사이트 콘텐츠 가져오기 (witheass-website 전용)
 *
 * 환경변수가 없거나 DB가 비어있어도 안전하게 빈 값/null 반환.
 * 사이트는 fallback으로 lib/i18n.ts의 기본값 사용.
 */

import { unstable_cache } from "next/cache";
import { supabase, SITE_KEY, isSupabaseConfigured } from "./supabase";

export type ContentMap = Record<string, string>;

export const getContent = unstable_cache(
  async (section: string, lang: string = "ko"): Promise<ContentMap> => {
    if (!isSupabaseConfigured) return {};
    try {
      const { data, error } = await supabase
        .from("content")
        .select("content_key, value")
        .eq("site", SITE_KEY)
        .eq("section", section)
        .eq("lang", lang);

      if (error) return {};
      const map: ContentMap = {};
      for (const row of data || []) {
        map[(row as any).content_key] = (row as any).value;
      }
      return map;
    } catch {
      return {};
    }
  },
  ["content"],
  { revalidate: 60, tags: ["content"] }
);

export const getSiteSettings = unstable_cache(
  async (_lang: string = "ko") => {
    if (!isSupabaseConfigured) return null;
    try {
      const { data, error } = await supabase
        .from("site_settings")
        .select("*")
        .eq("site", SITE_KEY)
        .maybeSingle();

      if (error) return null;
      return data as any;
    } catch {
      return null;
    }
  },
  ["site_settings"],
  { revalidate: 60, tags: ["settings"] }
);

export const getPublishedPosts = unstable_cache(
  async (lang: string = "ko", limit: number = 20) => {
    if (!isSupabaseConfigured) return [];
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

      if (error) return [];
      return (data || []) as any[];
    } catch {
      return [];
    }
  },
  ["blog_posts_list"],
  { revalidate: 60, tags: ["blog"] }
);

export const getPostBySlug = unstable_cache(
  async (slug: string, lang: string = "ko") => {
    if (!isSupabaseConfigured) return null;
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

      if (error) return null;
      return data as any;
    } catch {
      return null;
    }
  },
  ["blog_post"],
  { revalidate: 60, tags: ["blog"] }
);

/**
 * 발행된 FAQ 목록 (sort_order 순)
 */
export const getFaqs = unstable_cache(
  async (lang: string = "ko") => {
    if (!isSupabaseConfigured) return [];
    try {
      const { data, error } = await supabase
        .from("faqs")
        .select("id, question, answer, category, sort_order")
        .eq("site", SITE_KEY)
        .eq("lang", lang)
        .eq("is_published", true)
        .is("deleted_at", null)
        .order("sort_order", { ascending: true });

      if (error) return [];
      return (data || []) as Array<{
        id: string;
        question: string;
        answer: string;
        category: string | null;
        sort_order: number;
      }>;
    } catch {
      return [];
    }
  },
  ["faqs"],
  { revalidate: 60, tags: ["faqs"] }
);

/**
 * 푸터 링크 (컬럼별 그룹핑된 결과)
 */
export const getFooterLinks = unstable_cache(
  async (lang: string = "ko") => {
    if (!isSupabaseConfigured) return [];
    try {
      const { data, error } = await supabase
        .from("footer_links")
        .select("*")
        .eq("site", SITE_KEY)
        .eq("lang", lang)
        .eq("is_published", true)
        .order("column_order", { ascending: true })
        .order("sort_order", { ascending: true });

      if (error) return [];
      return (data || []) as Array<{
        id: string;
        column_label: string;
        column_order: number;
        label: string;
        url: string;
        is_external: boolean;
        sort_order: number;
      }>;
    } catch {
      return [];
    }
  },
  ["footer_links"],
  { revalidate: 60, tags: ["footer"] }
);

/**
 * GNB 메뉴
 */
export const getNavLinks = unstable_cache(
  async (lang: string = "ko") => {
    if (!isSupabaseConfigured) return [];
    try {
      const { data, error } = await supabase
        .from("nav_links")
        .select("id, label, url, is_external, is_cta, sort_order")
        .eq("site", SITE_KEY)
        .eq("lang", lang)
        .eq("is_published", true)
        .order("sort_order", { ascending: true });
      if (error) return [];
      return (data || []) as Array<{
        id: string; label: string; url: string;
        is_external: boolean; is_cta: boolean; sort_order: number;
      }>;
    } catch {
      return [];
    }
  },
  ["nav_links"],
  { revalidate: 60, tags: ["nav"] }
);

/**
 * 동적 페이지 섹션
 */
export const getPageSections = unstable_cache(
  async (pageKey: string = "home", lang: string = "ko") => {
    if (!isSupabaseConfigured) return [];
    try {
      const { data, error } = await supabase
        .from("page_sections")
        .select("*")
        .eq("site", SITE_KEY)
        .eq("page_key", pageKey)
        .eq("lang", lang)
        .eq("is_published", true)
        .is("deleted_at", null)
        .order("sort_order", { ascending: true });
      if (error) return [];
      return (data || []) as Array<{
        id: string; type: string; title: string | null;
        props: Record<string, any>; sort_order: number;
      }>;
    } catch {
      return [];
    }
  },
  ["page_sections"],
  { revalidate: 60, tags: ["sections"] }
);

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
