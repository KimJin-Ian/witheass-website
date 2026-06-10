/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // 이미지 최적화 — next/image 사용 시 자동 webp/avif 변환
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 64, 96, 128, 256],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },

  // 옛 아임웹(imweb) 사이트 URL → 새 사이트로 301 영구 리다이렉트.
  // 네이버/구글에 아직 남아있는 구버전 색인(예: /53, /HOME/?bmode=view&idx=...)을
  // 클릭하면 새 사이트에 해당 경로가 없어 404가 떴음. 홈으로 보내 404 제거 +
  // 검색엔진에 "영구 이전" 신호를 줘 인덱스 통합을 가속.
  async redirects() {
    return [
      // 아임웹 게시판/페이지 뷰 시그니처(?bmode=...) — 모든 경로에서 홈으로
      {
        source: "/:path*",
        has: [{ type: "query", key: "bmode" }],
        destination: "/",
        permanent: true,
      },
      // 아임웹 기본 경로 /HOME, /HOME/...
      { source: "/HOME", destination: "/", permanent: true },
      { source: "/HOME/:path*", destination: "/", permanent: true },
      // 아임웹 숫자형 페이지 ID(최상위 단일 숫자 경로: /53 등)
      { source: "/:id(\\d+)", destination: "/", permanent: true },
    ];
  },

  // 보안 헤더 (모든 페이지 적용)
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // X-Frame-Options 제거: CSP frame-ancestors가 더 정밀하게 제어
          // (admin이 iframe으로 띄울 수 있어야 비주얼 에디터 작동)
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://va.vercel-scripts.com",
              "style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net",
              "font-src 'self' data: https://cdn.jsdelivr.net",
              "img-src 'self' data: blob: https:",
              "connect-src 'self' https://*.supabase.co https://www.google-analytics.com https://vitals.vercel-insights.com https://va.vercel-scripts.com",
              "frame-ancestors 'self' https://witheass-admin-real.vercel.app https://*.vercel.app",
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },
        ],
      },
      {
        source: "/(.*)\\.(jpg|jpeg|png|webp|avif|svg|ico|woff2)$",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
