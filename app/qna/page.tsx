import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import { KAKAO_CHAT, KAKAO_PATH } from "@/lib/links";
import h from "../home.module.css";
import q from "./qna.module.css";

/**
 * Q&A 모음집 (2026-11-10 대표님 요청)
 *
 * 메인 바로가기의 '출판 비용 · 책 내는 과정 · 견적 문의' 를 Q&A 하나로 합쳤다.
 * 답은 blog-pipeline/company-guide.md 의 공개 사실과 사이트에 이미 공개된 패키지 금액만 쓴다.
 * 인터뷰 횟수는 쓰지 않는다 (11/10 대표님). 기간은 "약" · "보통" 으로만 쓴다.
 * FAQPage 구조화 데이터는 layout 에 이미 있어서 여기엔 넣지 않는다 (한 페이지에 두 개면 서치 콘솔 오류).
 */

const SITE_URL = "https://www.bookpublishingwithess.com";
const PAGE_URL = `${SITE_URL}/qna`;
const TITLE = "출판 Q&A 모음: 출판 비용 · 책 내는 과정 · 견적 문의";
const DESC =
  "책 출판 비용은 얼마인지, 책은 어떤 순서로 만들어지는지, 견적은 어떻게 받는지 드림위드에스 출판사가 자주 받는 질문을 한곳에 모았습니다.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PAGE_URL },
  openGraph: { title: TITLE, description: DESC, url: PAGE_URL, type: "website", siteName: "드림위드에스 출판사" },
};

type QA = { q: string; a: string; more?: [string, string] };
type Group = { id: string; title: string; items: QA[] };

const GROUPS: Group[] = [
  {
    id: "cost",
    title: "출판 비용 · 견적",
    items: [
      {
        q: "책 출판 비용은 얼마인가요?",
        a: "원고 작성부터 출판까지 900만원, 전문직 전문 패키지 1,500만원, 출판부터 마케팅까지 2,000만원입니다. 원고가 있는지, 인쇄 부수, 마케팅을 어디까지 맡기는지에 따라 달라지고, 희망 예산에 맞춘 견적도 가능합니다.",
        more: ["/blog/publishing-cost-quote-check-3", "출판 비용이 달라지는 이유 보기"],
      },
      {
        q: "원고가 이미 있으면 비용이 줄어드나요?",
        a: "완성된 원고가 있으면 더 낮은 패키지도 가능합니다. 상담에서 원고 상태를 보고 맞는 방법을 안내드립니다.",
      },
      {
        q: "견적은 어떻게 받나요?",
        a: "상담 신청서를 작성하시거나 카카오톡 · 전화(010-2068-0817)로 문의해 주세요. 책 주제와 상황에 맞춰 안내드리며, 첫 상담은 무료입니다.",
        more: ["/#apply", "상담 신청서 작성하기"],
      },
      {
        q: "의사 · 변호사 같은 전문직을 위한 패키지가 있나요?",
        a: "네. 의사 · 변호사 · 세무사 · 회계사 · 컨설턴트 · CEO를 위한 전문직 전문 패키지(1,500만원)가 있습니다.",
        more: ["/professional", "전문직 전문 패키지 보기"],
      },
    ],
  },
  {
    id: "process",
    title: "책 내는 과정 · 기간",
    items: [
      {
        q: "책은 어떤 순서로 만들어지나요?",
        a: "상담 · 계약 → 인터뷰 → 1차 원고 → 원고 수정 → 교정 · 표지 디자인 → 인쇄 · 서점 유통 순서입니다. 교정과 표지 디자인은 동시에 진행해 기간을 줄입니다.",
        more: ["/guide/book-publishing", "출판 방법별 진행 순서 보기"],
      },
      {
        q: "책이 나오기까지 얼마나 걸리나요?",
        a: "인터뷰를 마치고 약 4주 뒤 1차 원고를 받아보십니다. 전체 제작은 원고를 받은 날부터 보통 50~70일 걸리며, 프로젝트마다 달라질 수 있습니다.",
      },
      {
        q: "나에게 맞는 출판 방법은 무엇인가요?",
        a: "제작비를 누가 내는지, 원고가 있는지에 따라 기획출판 · 자비출판 · 독립출판 · 전자책 · 인터뷰 출판 중에서 고르게 됩니다.",
        more: ["/guide/book-publishing", "책출판 방법 총정리 보기"],
      },
    ],
  },
  {
    id: "manuscript",
    title: "원고 · 인터뷰",
    items: [
      {
        q: "원고가 없어도 책을 낼 수 있나요?",
        a: "네. 인터뷰로 시작합니다. 원고나 글솜씨가 없어도 작가가 인터뷰를 바탕으로 함께 씁니다.",
      },
      {
        q: "바빠서 시간을 내기 어렵습니다",
        a: "저자님이 내는 시간은 인터뷰와 원고 확인입니다. 일정은 저희가 잡고 끌고 갑니다.",
      },
      {
        q: "제 말투와 표현을 살릴 수 있나요?",
        a: "네. 인터뷰 때 원하시는 점을 말씀해 주시면 원고에 반영합니다. 원하는 항목을 정리해 주시면 더 정확해집니다.",
      },
    ],
  },
  {
    id: "rights",
    title: "저작권 · 인세 · 유통",
    items: [
      {
        q: "책은 누구 이름으로 나오나요?",
        a: "책은 저자님 이름으로 서지정보에 등록되고, 저작권은 저자님께 귀속됩니다.",
      },
      {
        q: "인세는 얼마이고 언제 받나요?",
        a: "종이책은 정가의 45%, 전자책은 20%입니다. 판매 다음 달 중순~말에 정산합니다.",
      },
      {
        q: "책은 어디에서 판매되나요?",
        a: "전국 온 · 오프라인 서점과 밀리의서재 · 교보 · 예스24 · 리디 전자책으로 기본 2년간 유통합니다.",
      },
      {
        q: "출간 뒤 홍보도 맡길 수 있나요?",
        a: "검색 노출 · SNS · 언론 기사 · 강연까지 마케팅을 이어서 맡을 수 있습니다. 서점 입고와 유통은 출판사가 맡고, 독자를 직접 만나는 활동은 저자님과 함께 움직입니다.",
      },
    ],
  },
];

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "홈", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Q&A 모음집", item: PAGE_URL },
  ],
};

export default function QnaPage() {
  return (
    <>
      <SiteHeader />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      <main className={`${h.page} ${q.root}`} id="main-content">
        <header className={q.head}>
          <div className={q.wrap}>
            <p className={q.eyebrow}>Q&amp;A</p>
            <h1>Q&amp;A 모음집</h1>
            <p className={q.lead}>출판 비용 · 책 내는 과정 · 견적까지, 자주 받는 질문을 한곳에 모았습니다.</p>
            <nav className={q.jump} aria-label="질문 분류">
              {GROUPS.map((g) => <a key={g.id} href={`#${g.id}`}>{g.title}</a>)}
            </nav>
          </div>
        </header>

        <div className={q.wrap}>
          {GROUPS.map((g) => (
            <section key={g.id} id={g.id} className={q.group} aria-labelledby={`${g.id}-title`}>
              <h2 id={`${g.id}-title`}>{g.title}</h2>
              {g.items.map((it) => (
                <details key={it.q} className={q.item}>
                  <summary><span className={q.mark} aria-hidden="true">Q</span>{it.q}</summary>
                  <div className={q.answer}>
                    <p>{it.a}</p>
                    {it.more && <Link href={it.more[0]}>{it.more[1]} →</Link>}
                  </div>
                </details>
              ))}
            </section>
          ))}

          <section className={q.ask}>
            <h2>찾는 질문이 없으신가요?</h2>
            <p>책 주제와 상황을 남겨주시면 맞춰서 안내드립니다.</p>
            <div className={q.actions}>
              <Link className={q.primary} href="/#apply" data-track="cta_click" data-category="consult" data-label="qna_apply">상담 신청서 작성하기</Link>
              <a className={h.btnKakao} href={KAKAO_CHAT} target="_blank" rel="noopener noreferrer"
                 data-track="cta_click" data-category="consult" data-label="qna_kakao">
                <svg className={h.kk} viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d={KAKAO_PATH} /></svg>카카오톡으로 묻기
              </a>
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
