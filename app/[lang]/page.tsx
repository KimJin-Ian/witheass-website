import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AboutClient from "../about/AboutClient";
import { LANG_PAGE_META, langAlternates, type PageLang } from "@/lib/i18n-extra";

/**
 * 영어 · 중국어 · 일본어 회사 소개 — /en · /zh · /ja  (2026-11-16)
 *
 * 화면은 한국어 소개(/about)와 같은 AboutClient 를 그대로 쓴다. 어떤 언어로 그릴지는
 * 주소가 정한다 (app/components/LangContext.tsx 가 주소의 첫 칸을 보고 고른다).
 * 그래서 번역은 lib/i18n.ts · lib/i18n-extra.ts 만 고치면 네 주소에 모두 반영된다.
 *
 * 여기서는 검색엔진용 제목 · 설명 · 표준 주소 · hreflang 만 붙인다.
 * 세 언어 말고 다른 값(/abc 등)은 "없는 페이지"로 보낸다.
 */

const SITE_URL = "https://www.bookpublishingwithess.com";
const PAGE_LANGS: PageLang[] = ["en", "zh", "ja"];

export const dynamicParams = false;

export function generateStaticParams() {
  return PAGE_LANGS.map((lang) => ({ lang }));
}

function isPageLang(v: string): v is PageLang {
  return (PAGE_LANGS as string[]).includes(v);
}

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  if (!isPageLang(params.lang)) return {};
  const m = LANG_PAGE_META[params.lang];
  const url = `${SITE_URL}/${params.lang}`;
  return {
    title: { absolute: m.title },
    description: m.description,
    keywords: m.keywords,
    alternates: { canonical: url, languages: langAlternates(SITE_URL) },
    openGraph: {
      title: m.title,
      description: m.description,
      url,
      type: "website",
      locale: m.ogLocale,
      siteName: m.siteName,
      images: [{ url: `${SITE_URL}/og-image.png?v=2`, width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title: m.title, description: m.description },
  };
}

export default function LangAboutPage({ params }: { params: { lang: string } }) {
  if (!isPageLang(params.lang)) notFound();
  const m = LANG_PAGE_META[params.lang];
  const url = `${SITE_URL}/${params.lang}`;
  const pageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": url,
    url,
    name: m.title,
    description: m.description,
    inLanguage: m.hreflang,
    isPartOf: { "@type": "WebSite", url: SITE_URL, name: m.siteName },
    about: { "@type": "Organization", name: "Dream With Ess", url: SITE_URL },
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }} />
      {/* 사이트 기본값 word-break: keep-all 은 한국어용이다(띄어쓰기에서만 줄바꿈).
          중국어 · 일본어는 띄어쓰기가 없어서 그대로 두면 문장이 한 줄로 뻗어 휴대폰 화면 밖으로 나간다.
          번역 페이지에서만 글자 단위 줄바꿈으로 되돌린다. */}
      <style>{`body, body * { word-break: normal !important; overflow-wrap: break-word; line-break: strict; }`}</style>
      <div lang={m.hreflang}>
        <AboutClient />
      </div>
    </>
  );
}
