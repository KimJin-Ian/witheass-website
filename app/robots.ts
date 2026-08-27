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
      // AI 검색·LLM 크롤러 — 인용·노출을 위해 명시적으로 허용 (관리/API만 차단)
      { userAgent: "GPTBot", allow: "/", disallow }, // OpenAI
      { userAgent: "OAI-SearchBot", allow: "/", disallow }, // ChatGPT Search
      { userAgent: "ChatGPT-User", allow: "/", disallow }, // ChatGPT 브라우징
      { userAgent: "ClaudeBot", allow: "/", disallow }, // Anthropic Claude (학습)
      { userAgent: "Claude-SearchBot", allow: "/", disallow }, // Claude 검색 색인
      { userAgent: "Claude-User", allow: "/", disallow }, // Claude 실시간 열람
      { userAgent: "anthropic-ai", allow: "/", disallow },
      { userAgent: "Claude-Web", allow: "/", disallow },
      { userAgent: "PerplexityBot", allow: "/", disallow }, // Perplexity
      { userAgent: "Perplexity-User", allow: "/", disallow },
      { userAgent: "Google-Extended", allow: "/", disallow }, // Gemini grounding
      { userAgent: "Applebot-Extended", allow: "/", disallow }, // Apple Intelligence
      { userAgent: "CCBot", allow: "/", disallow }, // Common Crawl (다수 LLM 학습)
      { userAgent: "Amazonbot", allow: "/", disallow },
      { userAgent: "Bytespider", allow: "/", disallow }, // ByteDance
      { userAgent: "meta-externalagent", allow: "/", disallow }, // Meta AI
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
