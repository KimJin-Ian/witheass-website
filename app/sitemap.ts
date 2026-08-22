import type { MetadataRoute } from "next";
import { getPublishedPosts } from "@/lib/content";

const SITE_URL = "https://www.bookpublishingwithess.com";

/**
 * 1시간마다 재생성.
 * 이 설정이 없으면 sitemap.xml 이 빌드 타임에 고정(Static)되어, DB에 새 블로그 글을
 * 넣어도 재배포 전까지 사이트맵에 반영되지 않는다. 블로그 자동발행 파이프라인은
 * 재배포 없이 글만 추가하므로 이 값이 반드시 필요하다.
 */
export const revalidate = 3600;

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
