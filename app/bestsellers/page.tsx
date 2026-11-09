import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import { BESTSELLERS } from "@/lib/bestsellers";
import { KAKAO_CHAT, KAKAO_PATH } from "@/lib/links";
import h from "../home.module.css";
import b from "./bestsellers.module.css";

/**
 * 분야별 베스트셀러 · 대표 도서 (2026-11-10 — 대표님 매뉴얼 #5 §23)
 * 책 정보 · 순위는 lib/bestsellers.ts 한곳에서 관리한다 (메인 슬라이드와 같이 쓴다).
 */

const SITE_URL = "https://www.bookpublishingwithess.com";
const PAGE_URL = `${SITE_URL}/bestsellers`;
const TITLE = "드림위드에스 베스트셀러 · 대표 도서: 분야별 출간 사례";
const DESC =
  "메디컬 · 건강 · 자기계발 · 진로 · 문학까지, 드림위드에스 출판사가 만든 분야별 베스트셀러와 대표 도서를 소개합니다.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PAGE_URL },
  openGraph: { title: TITLE, description: DESC, url: PAGE_URL, type: "website", siteName: "드림위드에스 출판사" },
};

const GROUPS = [...new Set(BESTSELLERS.map((x) => x.group))];

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ItemList",
      name: "드림위드에스 분야별 베스트셀러 · 대표 도서",
      itemListElement: BESTSELLERS.map((x, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Book",
          name: x.title,
          ...(x.author ? { author: x.author.split(" · ").map((n) => ({ "@type": "Person", name: n })) } : {}),
          publisher: { "@type": "Organization", name: "드림위드에스" },
          image: `${SITE_URL}/bestsellers/${x.key}.jpg`,
          ...(x.links.kyobo ? { url: x.links.kyobo } : {}),
        },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "홈", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "베스트셀러 · 대표 도서", item: PAGE_URL },
      ],
    },
  ],
};

export default function BestsellersPage() {
  return (
    <>
      <SiteHeader />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      <main className={`${h.page} ${b.root}`} id="main-content">
        <header className={b.head}>
          <div className={b.wrap}>
            <p className={b.eyebrow}>BESTSELLERS</p>
            <h1>분야별 베스트셀러 · 대표 도서</h1>
            <p className={b.lead}>드림위드에스가 저자와 함께 만든 책들입니다. 누적 890권 이상 가운데 분야별 대표 도서를 모았습니다.</p>
            <nav className={b.jump} aria-label="분야">
              {GROUPS.map((g, i) => <a key={g} href={`#g${i + 1}`}>{g}</a>)}
            </nav>
          </div>
        </header>

        <div className={b.wrap}>
          {GROUPS.map((g, i) => (
            <section key={g} id={`g${i + 1}`} className={b.group}>
              <h2>{g}</h2>
              <div className={b.list}>
                {BESTSELLERS.filter((x) => x.group === g).map((x) => (
                  <article key={x.key} id={x.key} className={b.card}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`/bestsellers/${x.key}.jpg`} alt={`${x.title} 표지`} width={160} height={230} loading="lazy" />
                    <div className={b.info}>
                      <span className={b.cat}>{x.cat}</span>
                      <h3>{x.title}</h3>
                      {x.author && <p className={b.author}>{x.author} 지음</p>}
                      {x.record && <p className={b.record}>{x.record}</p>}
                      <p className={b.intro}>{x.intro}</p>
                      <div className={b.links}>
                        <a href={x.links.naver} target="_blank" rel="noopener noreferrer">네이버에서 보기</a>
                        {x.links.kyobo && <a href={x.links.kyobo} target="_blank" rel="noopener noreferrer">교보문고</a>}
                        {x.links.instagram && <a href={x.links.instagram} target="_blank" rel="noopener noreferrer">인스타그램</a>}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}

          <p className={b.note}>※ 순위는 기록 당시의 서점 · 분야 기준입니다.</p>

          <section className={b.ask}>
            <h2>다음 책의 주인공이 되어 보세요</h2>
            <p>원고가 없어도 인터뷰로 시작할 수 있습니다.</p>
            <div className={b.actions}>
              <Link className={b.primary} href="/#apply" data-track="cta_click" data-category="consult" data-label="bestsellers_apply">출판 상담 신청하기</Link>
              <a className={h.btnKakao} href={KAKAO_CHAT} target="_blank" rel="noopener noreferrer"
                 data-track="cta_click" data-category="consult" data-label="bestsellers_kakao">
                <svg className={h.kk} viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d={KAKAO_PATH} /></svg>카카오톡 상담
              </a>
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
