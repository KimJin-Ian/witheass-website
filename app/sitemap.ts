import type { MetadataRoute } from "next";
import { getPublishedPosts } from "@/lib/content";
import { QUESTION_GUIDES } from "@/lib/question-guides";
import { langAlternates } from "@/lib/i18n-extra";

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
 * 회사 소개는 한국어(/about) + 영어 · 중국어 · 일본어(/en · /zh · /ja) 네 주소가 있고,
 * 네 주소가 서로를 hreflang 으로 가리킨다. 나머지 페이지는 한국어만 있다.
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
    {
      url: `${SITE_URL}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: { languages: langAlternates(SITE_URL) },
    },
    // 번역본 — 영어 · 중국어 · 일본어
    ...["en", "zh", "ja"].map((l) => ({
      url: `${SITE_URL}/${l}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: { languages: langAlternates(SITE_URL) },
    })),
    {
      url: `${SITE_URL}/professional`,
      lastModified: new Date("2026-11-09"),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/coaching`,
      lastModified: new Date("2026-11-10"),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/bestsellers`,
      lastModified: new Date("2026-11-10"),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/qna`,
      lastModified: new Date("2026-11-10"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    // 질문별 상세 페이지 (11/14)
    ...QUESTION_GUIDES.map((g) => ({
      url: `${SITE_URL}/guide/${g.slug}`,
      lastModified: new Date("2026-11-14"),
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
    // 출판 가이드 — 글을 고친 날로 적는다 (매번 now 로 두면 lastmod 를 믿지 않게 된다)
    {
      url: `${SITE_URL}/guide`,
      lastModified: new Date("2026-11-07"),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/guide/book-publishing`,
      lastModified: new Date("2026-11-07"),
      changeFrequency: "monthly",
      priority: 0.85,
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
