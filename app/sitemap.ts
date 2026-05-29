import type { MetadataRoute } from "next";
import { getPublishedPosts } from "@/lib/content";

const SITE_URL = "https://www.bookpublishingwithess.com";

/**
 * Dynamic sitemap — 메인 + /blog 목록 + 블로그 글 모두 포함
 * (witheass-website는 단일 언어 사이트이므로 hreflang alternates 미사용)
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const baseEntries: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  // 발행된 블로그 글들 동적 추가 (최대 1000개)
  try {
    const posts = await getPublishedPosts("ko", 1000);
    const postEntries: MetadataRoute.Sitemap = posts.map((p: any) => ({
      url: `${SITE_URL}/blog/${p.slug}`,
      lastModified: p.published_at ? new Date(p.published_at) : now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
    return [...baseEntries, ...postEntries];
  } catch {
    return baseEntries;
  }
}
