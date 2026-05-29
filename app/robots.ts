import type { MetadataRoute } from "next";

const SITE_URL = "https://www.bookpublishingwithess.com";

/**
 * robots.txt
 * - 모든 공개 페이지는 인덱싱 허용
 * - /admin/*, /api/* 는 명시적으로 차단
 * - 주요 한국·중국·일본 검색엔진 크롤러 모두 허용
 */
export default function robots(): MetadataRoute.Robots {
  // 비공개 경로 — 모든 user-agent에 차단
  const disallow = ["/admin/", "/api/"];

  return {
    rules: [
      // 기본: 모든 봇 허용 + 비공개 경로 차단
      { userAgent: "*", allow: "/", disallow },
      // 주요 검색엔진 명시 (Google이 권장)
      { userAgent: "Googlebot", allow: "/", disallow },
      { userAgent: "Yeti", allow: "/", disallow }, // 네이버
      { userAgent: "Bingbot", allow: "/", disallow },
      { userAgent: "Daumoa", allow: "/", disallow }, // 다음 (Kakao)
      { userAgent: "Baiduspider", allow: "/", disallow }, // 바이두 (중국)
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
