import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";

const SITE_URL = "https://www.bookpublishingwithess.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "드림위드에스 출판사 | 위드에스마케팅 — 책 한 권으로 인생을 바꾸는 구조",
    template: "%s | 드림위드에스 출판사",
  },
  description:
    "드림위드에스 출판사 (위드에스마케팅) — 누적 890권+ 출간, 베스트셀러 다수 배출. 인터뷰 기반 출판 + 표절 검수 전담팀 + 출판→마케팅→강연·사업 확장까지 원스톱. 자서전·자비출판·논문 컨설팅 전문.",
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
    languages: {
      "ko-KR": SITE_URL,
      "en-US": SITE_URL,
      "zh-CN": SITE_URL,
      "ja-JP": SITE_URL,
    },
  },
  openGraph: {
    title: "드림위드에스 출판사 | 책 한 권으로 인생을 바꾸는 구조",
    description:
      "누적 890권+ 출간. 인터뷰 기반 출판 + 표절 검수 전담팀 + 마케팅·강연 원스톱. 자서전·자비출판·논문 컨설팅 전문.",
    url: SITE_URL,
    siteName: "드림위드에스 출판사",
    type: "website",
    locale: "ko_KR",
    alternateLocale: ["en_US", "zh_CN", "ja_JP"],
  },
  twitter: {
    card: "summary_large_image",
    title: "드림위드에스 출판사 | 책 한 권으로 인생을 바꾸는 구조",
    description: "누적 890권+ 출간. 인터뷰 기반 출판 + 마케팅·강연 원스톱.",
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
    // 네이버·구글 search console 코드 등록 후 입력
    // google: "구글-사이트소유확인-코드",
    other: {
      // "naver-site-verification": "네이버-사이트소유확인-코드",
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
  image: `${SITE_URL}/og-image.png`,
  "@id": SITE_URL,
  url: SITE_URL,
  telephone: "+82-10-2068-0817",
  email: "dreamwithessmarketing@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressCountry: "KR",
    addressLocality: "Seoul",
    addressRegion: "강남구",
  },
  priceRange: "₩₩₩",
  description: "자서전·자비출판·논문 컨설팅 전문. 누적 890권+ 출간 노하우.",
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
      </head>
      <body>{children}</body>
    </html>
  );
}
