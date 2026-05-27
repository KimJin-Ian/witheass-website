import type { MetadataRoute } from "next";

const SITE_URL = "https://www.bookpublishingwithess.com";

/**
 * 주의: 현재는 단일 페이지(SPA) 구조라 sitemap에 루트 URL만 포함.
 *
 * 이전 버전은 #about, #pricing 같은 앵커(fragment) URL을 포함했으나,
 * 검색엔진은 fragment를 별도 페이지로 인덱싱하지 않으므로 효과가 없음.
 *
 * 섹션을 검색 결과에 별도로 노출하려면:
 *   - /about, /pricing, /portfolio 등 실제 라우트로 분리 필요
 *   - 분리 후 이 파일에 각 URL을 추가하면 됨
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: {
        languages: {
          ko: SITE_URL,
          en: SITE_URL,
          zh: SITE_URL,
          ja: SITE_URL,
        },
      },
    },
  ];
}
