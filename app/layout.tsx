import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { LangProvider } from "./components/LangContext";
import Analytics from "./components/Analytics";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const SITE_URL = "https://www.bookpublishingwithess.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "드림위드에스 출판사 | 위드에스마케팅 — 책 한 권으로 시작되는 인생의 다음 챕터",
    template: "%s | 드림위드에스 출판사",
  },
  description:
    "드림위드에스 출판사 | 누적 890권+ 출간 · 베스트셀러 다수 배출. 책 출판·자서전·자비출판·논문 컨설팅 전문. 인터뷰 기반 집필 + 표절 검수 전담팀 + 출판→마케팅→강연·사업 확장까지 원스톱. 강남 위치, 정가의 45% 인세, 3개월 출간. 책 한 권으로 시작되는 인생의 다음 챕터.",
  applicationName: "드림위드에스 출판사",
  authors: [{ name: "드림위드에스 출판사", url: SITE_URL }],
  generator: "Next.js",
  keywords: [
    "드림위드에스",
    "드림위드에스 출판사",
    "위드에스마케팅",
    "더컬쳐앤",
    "자비출판",
    "자서전 출판",
    "자서전 대필",
    "논문 컨설팅",
    "박사 논문 컨설팅",
    "책 출판",
    "퍼스널 브랜딩",
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
  alternates: {
    canonical: SITE_URL,
    // 사이트가 한국어 단일 언어이므로 hreflang을 명시하지 않음.
    // (예전엔 4개 언어 모두 같은 URL로 매핑되어 있었음 — Google 중복 콘텐츠 경고 위험)
  },
  openGraph: {
    title: "드림위드에스 출판사 | 책 한 권으로 시작되는 인생의 다음 챕터",
    description:
      "누적 890권+ 출간. 인터뷰 기반 출판 + 표절 검수 전담팀 + 마케팅·강연 원스톱. 자서전·자비출판·논문 컨설팅 전문.",
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
    title: "드림위드에스 출판사 | 책 한 권으로 시작되는 인생의 다음 챕터",
    description: "누적 890권+ 출간. 인터뷰 기반 출판 + 마케팅·강연 원스톱.",
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
  verification: {
    // ⚠️ 아래 빈 문자열에 실제 코드 입력 후 재배포 필요
    // 1. 구글: https://search.google.com/search-console
    //    → 속성 추가 → HTML 태그 방식 → content="..." 값을 google에 입력
    // 2. 네이버: https://searchadvisor.naver.com
    //    → 사이트 등록 → HTML 태그 → content="..." 값을 naver-site-verification에 입력
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || "",
    other: {
      "naver-site-verification": process.env.NEXT_PUBLIC_NAVER_VERIFICATION || "",
    },
  },
  category: "Publishing",
};

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
    "누적 890권+ 출간한 출판사. 인터뷰 기반 출판 + 표절 검수 전담팀 + 출판→마케팅→강연·사업 확장까지 원스톱.",
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
  description: "자서전·자비출판·논문 컨설팅 전문. 누적 890권+ 출간 노하우.",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "드림위드에스 출판사는 어떤 출판사인가요?", acceptedAnswer: { "@type": "Answer", text: "누적 890권 이상 출간 경험을 가진 한국의 출판사로, 자서전·자비출판·논문 컨설팅·기업 도서를 전문으로 합니다." } },
    { "@type": "Question", name: "책 출판 비용은 얼마인가요?", acceptedAnswer: { "@type": "Answer", text: "단순 인쇄 200만원부터, 완성도 패키지 600만원, 책 출판 올인원 900만원, 마케팅+강연회 풀패키지 2,000만원입니다." } },
    { "@type": "Question", name: "글솜씨가 없어도 책을 낼 수 있나요?", acceptedAnswer: { "@type": "Answer", text: "네. 인터뷰 2~5회만으로 책의 뼈대가 잡힙니다. 전문 작가팀이 표현·구성·디자인까지 동시 진행합니다." } },
    { "@type": "Question", name: "출판까지 얼마나 걸리나요?", acceptedAnswer: { "@type": "Answer", text: "원고 수령일 기준 총 50~70일. 인터뷰 → 목차·원고 → 교정+디자인 → 인쇄 → 유통 → 전자책 → 마케팅 8단계." } },
    { "@type": "Question", name: "ISBN과 저작권은 누구 명의로 등록되나요?", acceptedAnswer: { "@type": "Answer", text: "ISBN과 저작권 모두 저자 본인 명의로 등록됩니다. 전자책·2쇄·해외판·강연자료 전환 등 모든 부가 권리도 저자 소유입니다." } },
    { "@type": "Question", name: "인세는 어떻게 지급되나요?", acceptedAnswer: { "@type": "Answer", text: "판매 발생 다음 달 중순~말 사이 지급. 종이책 정가의 45%, 전자책 정가의 20%." } },
    { "@type": "Question", name: "논문 컨설팅도 가능한가요?", acceptedAnswer: { "@type": "Answer", text: "네. 서울대·해외 박사급 컨설턴트가 1:1로 통과까지 함께합니다. 구조 설계·맞춤 컨설팅부터 표절 검수까지." } },
    { "@type": "Question", name: "전국 서점에서 책을 살 수 있나요?", acceptedAnswer: { "@type": "Answer", text: "네. 출간 후 담당 MD 영업을 통해 광화문·강남·교보·예스24·알라딘 등 주요 서점에 입고됩니다." } }
  ],
};

const offerJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Book Publishing",
  provider: { "@type": "Organization", name: "드림위드에스 출판사", url: SITE_URL },
  areaServed: { "@type": "Country", name: "KR" },
  description: "누적 890권+ 출간 경험의 책 출판·자서전·논문 컨설팅·자비출판 서비스",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "출판 패키지",
    itemListElement: [
      { "@type": "Offer", name: "전자책 / 종이책 인쇄", description: "표지·내지 디자인 + 네이버 책 등록 + 전국 서점 유통", price: "2000000", priceCurrency: "KRW" },
      { "@type": "Offer", name: "완성도 패키지", description: "목차 기획·교정·교열·표지·500권 인쇄·유통", price: "6000000", priceCurrency: "KRW" },
      { "@type": "Offer", name: "책 출판 올인원 패키지", description: "인터뷰 기반 기획·집필·디자인·인쇄·전자책·유통", price: "9000000", priceCurrency: "KRW" },
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
        <Script
          id="ld-organization"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Script
          id="ld-website"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <Script
          id="ld-localbusiness"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <Script
          id="ld-faq"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <Script
          id="ld-service"
          type="application/ld+json"
          strategy="afterInteractive"
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
