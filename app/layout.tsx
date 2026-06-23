import type { Metadata, Viewport } from "next";
import Script from "next/script";
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
  alternates: {
    canonical: SITE_URL,
    // 사이트가 한국어 단일 언어이므로 hreflang을 명시하지 않음.
    // (예전엔 4개 언어 모두 같은 URL로 매핑되어 있었음 — Google 중복 콘텐츠 경고 위험)
  },
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

// FAQPage JSON-LD — 홈페이지 <Faq /> 컴포넌트(20개)와 동일.
// admin DB 시드(012) 및 Faq.tsx 폴백과 같은 내용을 유지.
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "1차 원고는 언제까지 받을 수 있나요?", acceptedAnswer: { "@type": "Answer", text: "인터뷰 완료 후 한 달 전후로 받으실 수 있습니다." } },
    { "@type": "Question", name: "1차 원고 수정은 몇 회까지 가능한가요?", acceptedAnswer: { "@type": "Answer", text: "2회까지 가능합니다. 1차 원고 → 1차 피드백 → 수정본 → 2차 피드백 → 최종 원고로 진행됩니다." } },
    { "@type": "Question", name: "제 말투·스타일·표현을 그대로 반영해 줄 수 있나요?", acceptedAnswer: { "@type": "Answer", text: "네. 인터뷰 진행 시 요구사항을 모두 말씀해 주시면 그대로 반영합니다." } },
    { "@type": "Question", name: "표지 디자인은 몇 개 시안이 제공되며, 수정은 몇 회 가능한가요?", acceptedAnswer: { "@type": "Answer", text: "2개 시안 제공, 2회 수정 가능합니다." } },
    { "@type": "Question", name: "본문에 사진·캡션·표·도표를 넣을 수 있나요?", acceptedAnswer: { "@type": "Answer", text: "네. 모두 삽입 가능합니다. 이미지·자료의 정보는 저자가 직접 정리해 주셔야 합니다." } },
    { "@type": "Question", name: "2차 원고 단계에서 내용 수정도 가능한가요?", acceptedAnswer: { "@type": "Answer", text: "2차 단계에서는 오탈자 검토와 의문사항 정리만 가능합니다. 내용 추가는 1차에서 마무리해 주세요." } },
    { "@type": "Question", name: "교정·교열은 어디까지 봐주시나요?", acceptedAnswer: { "@type": "Answer", text: "오탈자뿐 아니라 문장 표현·흐름·맞춤법까지 2차 작가가 함께 봅니다." } },
    { "@type": "Question", name: "ISBN과 저작권은 누구 명의로 등록되나요?", acceptedAnswer: { "@type": "Answer", text: "모두 저자 본인 명의로 등록됩니다." } },
    { "@type": "Question", name: "인세 정산은 어떻게 진행되며 몇 %인가요?", acceptedAnswer: { "@type": "Answer", text: "판매 발생 다음 달 중순~말에 지급. 종이책 45%, 전자책 20%." } },
    { "@type": "Question", name: "매달 판매 현황은 어떻게 확인하나요?", acceptedAnswer: { "@type": "Answer", text: "전용 사이트의 아이디·비밀번호를 발급해 드립니다. 매달 판매 부수·정산을 직접 확인 가능합니다." } },
    { "@type": "Question", name: "출간 후 전자책·2쇄·해외판·강연자료 전환 권리는?", acceptedAnswer: { "@type": "Answer", text: "모두 저자 본인 소유입니다." } },
    { "@type": "Question", name: "유통 기간은 얼마이며, 연장 가능한가요?", acceptedAnswer: { "@type": "Answer", text: "기본 2년. 이후 연 100만원으로 연장 가능." } },
    { "@type": "Question", name: "유통·물류 창고 비용은 별도인가요?", acceptedAnswer: { "@type": "Answer", text: "모든 패키지에 물류 창고비 포함, 2년 무료 보관됩니다." } },
    { "@type": "Question", name: "전자책 제작 + 밀리의서재는 포함인가요?", acceptedAnswer: { "@type": "Answer", text: "네. 올인원 패키지에 전자책 + 밀리의서재 등록 포함입니다." } },
    { "@type": "Question", name: "서점 입고·매대 진열은 어떻게 진행되나요?", acceptedAnswer: { "@type": "Answer", text: "담당 MD 영업으로 부수를 입고시킵니다. 광화문·교보·강남 주요 매장은 출간 직후 1~2달 신간 매대에 진열되는 경우가 많습니다." } },
    { "@type": "Question", name: "초판 후 추가 제작 비용은? (200페이지 기준)", acceptedAnswer: { "@type": "Answer", text: "500권 → 1,000권 변경 +100만원, 500권 후 추가 500권 재인쇄 +300만원, 500권 후 추가 1,000권 +400만원, 초판 2,000부 +270만원." } },
    { "@type": "Question", name: "작가가 직접 책을 구매하거나 받고 싶을 때 비용은?", acceptedAnswer: { "@type": "Answer", text: "책 소유권은 저자에게 있으므로 추가 비용 없이 택배비만 부담하시면 됩니다." } },
    { "@type": "Question", name: "출간 후 강연·컨설팅·기고로 어떻게 연결되나요?", acceptedAnswer: { "@type": "Answer", text: "마케팅 대행(300만~2,000만원)과 강연자 추천으로 연결됩니다. 마케팅 활동이 추천 빈도와 강연료에 직접 영향을 줍니다." } },
    { "@type": "Question", name: "견적서·세부항목 정리본을 받을 수 있나요?", acceptedAnswer: { "@type": "Answer", text: "세 가지 기본 견적: 600만원(저자가 글 작성 + 이메일 교환), 900만원(인터뷰 포함 올인원 200p·500권), 700만원(원고 작성만, 인쇄 없이)." } },
    { "@type": "Question", name: "계약서 양식을 미리 볼 수 있나요?", acceptedAnswer: { "@type": "Answer", text: "네. 카톡 또는 이메일로 요청 주시면 표준 계약서를 공유드립니다." } }
  ],
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
