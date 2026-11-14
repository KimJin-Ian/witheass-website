import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LangProvider } from "./components/LangContext";
import Analytics from "./components/Analytics";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { getSiteSettings } from "@/lib/content";

const SITE_URL = "https://www.bookpublishingwithess.com";

const baseMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "드림위드에스 출판사 | 자비출판·자서전출판·책출판·퍼스널브랜딩 전문",
    template: "%s | 드림위드에스 출판사",
  },
  description:
    "드림위드에스 출판사 | 자비출판·자서전출판·책출판·퍼스널브랜딩·논문 컨설팅 전문. 누적 890권+ 출간 · 베스트셀러 다수 배출. 인터뷰 기반 집필 + 표절 검수 전담팀 + 출판→마케팅→강연·사업 확장까지 원스톱. 강남 위치, 정가의 45% 인세, 3개월 출간.",
  applicationName: "드림위드에스 출판사",
  authors: [{ name: "드림위드에스 출판사", url: SITE_URL }],
  generator: "Next.js",
  keywords: [
    "드림위드에스",
    "드림위드에스 출판사",
    "위드에스마케팅",
    "더컬쳐앤",
    "자비출판",
    "자서전출판",
    "자서전 출판",
    "자서전 대필",
    "논문 컨설팅",
    "박사 논문 컨설팅",
    "책 출판",
    "책출판",
    "퍼스널 브랜딩",
    "퍼스널브랜딩",
    "기업 도서 출판",
    "출판기념회",
    "북토크",
    "전국 서점 유통",
    "전자책 출판",
    "표절 검수",
    "인터뷰 기반 출판",
    "베스트셀러 출판사",
    "이서진",
    "이서진 대표",
    "강남 출판사",
    "퍼블리싱 컨설팅",
  ],
  // 표준 주소(canonical)는 여기서 정하지 않는다 — 페이지마다 자기 주소를 단다.
  // 예전에는 여기 홈 주소를 박아둬서, 따로 안 단 페이지(/team · 없는 주소)가 전부
  // "나는 홈의 복사본" 이라고 구글에 말하고 있었다 (2026-10 Search Console '중복 페이지' 경고).
  // 사이트가 한국어 단일 언어이므로 hreflang 도 명시하지 않는다
  // (예전엔 4개 언어 모두 같은 URL로 매핑되어 있었음 — Google 중복 콘텐츠 경고 위험).
  openGraph: {
    title: "드림위드에스 출판사 | 자비출판·자서전출판·책출판·퍼스널브랜딩 전문",
    description:
      "자비출판·자서전출판·책출판·퍼스널브랜딩·논문 컨설팅 전문. 누적 890권+ 출간 · 베스트셀러 다수. 인터뷰 기반 집필 + 표절 검수 + 마케팅·강연 원스톱.",
    url: SITE_URL,
    siteName: "드림위드에스 출판사",
    type: "website",
    locale: "ko_KR",
    images: [
      {
        url: `${SITE_URL}/og-image.png?v=2`,
        width: 1200,
        height: 630,
        alt: "드림위드에스 출판사 — 책 한 권으로 시작되는 인생의 다음 챕터",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "드림위드에스 출판사 | 자비출판·자서전출판·책출판·퍼스널브랜딩 전문",
    description: "자비출판·자서전출판·책출판·퍼스널브랜딩 전문. 누적 890권+ 출간, 마케팅·강연 원스톱.",
    images: [`${SITE_URL}/og-image.png?v=2`],
  },
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png", sizes: "64x64" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: { telephone: false, email: false, address: false },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "드림위드에스",
  },
  // verification은 generateMetadata에서 DB → env 폴백으로 동적 주입
  category: "Publishing",
};

/**
 * 검색엔진 verification 코드를 DB(site_settings) → env 폴백으로 동적 주입.
 * admin /site/settings 에서 저장하면 60초 내 반영됨 (unstable_cache revalidate).
 */
export async function generateMetadata(): Promise<Metadata> {
  let googleVerification = process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || "";
  let naverVerification = process.env.NEXT_PUBLIC_NAVER_VERIFICATION || "";

  try {
    const settings = await getSiteSettings("ko");
    if (settings?.google_verification) googleVerification = settings.google_verification;
    if (settings?.naver_verification) naverVerification = settings.naver_verification;
  } catch {
    /* DB 장애 시 env 폴백으로 안전하게 동작 */
  }

  // ⚠ trim() 필수 — Vercel 환경변수에 trailing newline 들어가면
  //   네이버가 '메타 태그를 찾을 수 없습니다' 오류로 검증 실패함.
  return {
    ...baseMetadata,
    verification: {
      google: googleVerification.trim(),
      other: {
        "naver-site-verification": naverVerification.trim(),
      },
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  minimumScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0a1228" },
    { media: "(prefers-color-scheme: dark)", color: "#0a1228" },
  ],
};

// JSON-LD 구조화 데이터 — 구글이 회사 정보 인식하게 도움
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "드림위드에스 출판사",
  alternateName: ["위드에스마케팅", "더컬쳐앤", "Dream With Ess Publishing"],
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description:
    "자비출판·자서전출판·책출판·퍼스널브랜딩 전문. 누적 890권+ 출간한 출판사. 인터뷰 기반 출판 + 표절 검수 전담팀 + 출판→마케팅→강연·사업 확장까지 원스톱.",
  keywords: "자비출판, 자서전출판, 책출판, 퍼스널브랜딩, 논문 컨설팅, 자서전 대필, 출판기념회, 전국 서점 유통",
  founder: { "@type": "Person", name: "이서진" },
  address: {
    "@type": "PostalAddress",
    addressCountry: "KR",
    addressLocality: "Seoul",
    addressRegion: "강남구",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+82-10-2068-0817",
      contactType: "customer service",
      availableLanguage: ["Korean", "English"],
    },
  ],
  sameAs: [
    "http://pf.kakao.com/_QkZhd",
    "https://search.shopping.naver.com/book/search?query=드림위드에스",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "드림위드에스 출판사",
  url: SITE_URL,
  inLanguage: "ko-KR",
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "드림위드에스 출판사",
  image: `${SITE_URL}/og-image.png?v=2`,
  "@id": SITE_URL,
  url: SITE_URL,
  telephone: "+82-10-2068-0817",
  email: "dreamwithessmarketing@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressCountry: "KR",
    addressLocality: "Seoul",
    addressRegion: "강남구",
    streetAddress: "강남구 (정확한 주소는 상담 시 안내)",
  },
  // 강남구 중심 좌표 (대략) — 정확한 주소 확정 시 업데이트
  geo: {
    "@type": "GeoCoordinates",
    latitude: 37.5172,
    longitude: 127.0473,
  },
  // 영업시간 (평일 10시~19시, 주말 예약제)
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "10:00",
      closes: "19:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday", "Sunday"],
      opens: "10:00",
      closes: "18:00",
      description: "주말은 예약제",
    },
  ],
  priceRange: "₩₩₩",
  currenciesAccepted: "KRW",
  paymentAccepted: "Cash, Credit Card, Bank Transfer",
  areaServed: { "@type": "Country", name: "KR" },
  description: "자비출판·자서전출판·책출판·퍼스널브랜딩·논문 컨설팅 전문. 누적 890권+ 출간 노하우.",
};

const offerJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Book Publishing",
  provider: { "@type": "Organization", name: "드림위드에스 출판사", url: SITE_URL },
  areaServed: { "@type": "Country", name: "KR" },
  description: "누적 890권+ 출간 경험의 자비출판·자서전출판·책출판·퍼스널브랜딩·논문 컨설팅 서비스",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "출판 패키지",
    itemListElement: [
      { "@type": "Offer", name: "1:1 책출판 목차 기획 코칭", description: "주제 · 제목 후보 · 전체 목차 · 집필 방향", price: "500000", priceCurrency: "KRW" },
      { "@type": "Offer", name: "1:1 책쓰기 정규과정", description: "목차 기획 · 원고 피드백 · 원고 컨설팅 (출판 제작비 별도)", price: "1000000", priceCurrency: "KRW" },
      { "@type": "Offer", name: "완성도 패키지", description: "목차 기획·교정·교열·표지·500권 인쇄·유통", price: "6000000", priceCurrency: "KRW" },
      { "@type": "Offer", name: "책 출판 올인원 패키지", description: "인터뷰 기반 기획·집필·디자인·인쇄·전자책·유통", price: "9000000", priceCurrency: "KRW" },
      { "@type": "Offer", name: "전문직 전문 패키지", description: "의사·변호사·세무사·회계사·컨설턴트·CEO를 위한 브랜딩 출판", price: "15000000", priceCurrency: "KRW" },
      { "@type": "Offer", name: "책 출판 & 마케팅 올인원 풀패키지", description: "출판 전과정 + 블로그·인스타·언론 PR + 강연회 주최", price: "20000000", priceCurrency: "KRW" }
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.css"
        />
        <script
          id="ld-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          id="ld-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          id="ld-localbusiness"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <script
          id="ld-service"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(offerJsonLd) }}
        />
      </head>
      <body>
        <Analytics />
        <VercelAnalytics />
        <SpeedInsights />
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
