import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import SiteHeader from "../../components/SiteHeader";
import { KAKAO_CHAT } from "@/lib/links";
import s from "../guide.module.css";

/**
 * 출판 가이드 01 — 책출판 방법 총정리 (시안)
 *
 * 대표님 요청(11/7): 자동 블로그(/blog)와 별도로, 글 위주로 길게 정리한 칼럼 버전.
 * 참고한 구조 — 한 줄 요약 · 진행 방법 · 좋은 점 · 아쉬운 점 · 관련 글. 문장은 우리 것으로 새로 썼다.
 * 회사 숫자는 blog-pipeline/company-guide.md 의 🟢 공개 항목만 쓴다. 패키지 금액은 쓰지 않는다.
 */

const SITE_URL = "https://www.bookpublishingwithess.com";
const TITLE = "책출판 방법 총정리: 기획출판·자비출판·독립출판·인터뷰 출판, 나에게 맞는 방법은?";
const DESC =
  "책출판 방법은 여섯 가지입니다. 제작비를 누가 내는지, 원고가 있는지에 따라 기획출판·자비출판·반기획출판·독립출판·전자책·인터뷰 출판 중 나에게 맞는 방법을 고르는 법을 정리했습니다.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: `${SITE_URL}/guide/book-publishing` },
  openGraph: { title: TITLE, description: DESC, url: `${SITE_URL}/guide/book-publishing`, type: "article", siteName: "드림위드에스 출판사" },
};

const TOC = [
  ["compare", "한눈에 비교"],
  ["planned", "방법 1 · 기획출판"],
  ["self", "방법 2 · 자비출판"],
  ["shared", "방법 3 · 반기획출판"],
  ["indie", "방법 4 · 독립출판"],
  ["ebook", "방법 5 · 전자책 출판"],
  ["interview", "방법 6 · 인터뷰 출판"],
  ["choose", "나에게 맞는 방법 고르기"],
] as const;

type Method = {
  id: string;
  no: string;
  title: string;
  summary: string;
  how: string[];
  pros: string[];
  cons: string[];
  related: [string, string][];
};

const METHODS: Method[] = [
  {
    id: "planned",
    no: "01",
    title: "기획출판 — 출판사가 제작비를 내는 방법",
    summary: "출판사가 원고를 골라 제작비를 대고, 저자는 출판권을 맡기는 가장 전통적인 방식입니다.",
    how: [
      "완성 원고나 샘플 원고 2~3꼭지와 출간기획서(주제 · 독자 · 목차 · 저자 소개)를 준비합니다.",
      "내 책과 분야가 맞는 출판사를 골라 투고하고, 검토 결과를 기다립니다.",
      "채택되면 출판 계약을 맺고, 출판사 일정에 맞춰 편집 · 디자인 · 출간이 진행됩니다.",
    ],
    pros: [
      "저자가 제작비를 부담하지 않습니다.",
      "책이 팔려야 출판사도 수익이 나기 때문에 판매에 힘을 씁니다.",
    ],
    cons: [
      "출판사가 시장성을 보고 고르기 때문에 채택이 쉽지 않고, 답을 받기까지 오래 걸릴 수 있습니다.",
      "제목 · 구성 · 출간 시기에 출판사의 판단이 크게 들어갑니다.",
      "인세율과 조건은 계약마다 다릅니다. 계약서에서 꼭 확인하세요.",
    ],
    related: [
      ["/blog/author-bio-relevant-experience-five-checks", "투고할 때 저자 소개 쓰는 법"],
      ["/blog/book-title-subtitle-reader-content-five-checks", "책 제목 · 부제 정하는 법"],
    ],
  },
  {
    id: "self",
    no: "02",
    title: "자비출판 — 저자가 제작비를 내는 방법",
    summary: "저자가 제작비를 내고, 출판사가 교정 · 디자인 · 인쇄 · 유통을 맡아 주는 방식입니다.",
    how: [
      "출판사 몇 곳에서 견적을 받고, 견적에 들어간 작업 범위를 비교합니다.",
      "계약 후 교정 · 표지 디자인 · 본문 편집을 거쳐 인쇄와 서점 유통을 진행합니다.",
    ],
    pros: [
      "원고만 있으면 출간 일정을 내가 정할 수 있습니다.",
      "표지 · 제목 · 구성에 저자의 뜻을 많이 반영할 수 있습니다.",
      "제작비를 저자가 내는 만큼 인세를 높게 잡는 경우가 많습니다.",
    ],
    cons: [
      "제작비를 저자가 부담합니다.",
      "같은 '자비출판' 이라도 견적마다 교정 횟수 · 디자인 · 인쇄 부수 · 유통과 홍보 범위가 다릅니다. 금액만 보고 고르면 빠진 작업을 나중에 알게 됩니다.",
      "서점 매대 진열이나 홍보가 포함되는지는 계약서에 적힌 대로만 기대할 수 있습니다.",
    ],
    related: [
      ["/blog/publishing-cost-quote-check-3", "책 출판 비용, 견적서에서 확인할 3가지"],
      ["/blog/self-publishing-scam-contract-signals", "자비출판 계약 전에 볼 신호"],
      ["/blog/self-publishing-first-print-run-distribution-plan", "초판 부수와 유통 계획"],
    ],
  },
  {
    id: "shared",
    no: "03",
    title: "반기획출판 — 제작비를 나눠 내는 방법",
    summary: "출판사와 저자가 제작비를 나눠 낸다고 안내되는 방식입니다. 무엇을 누가 내는지가 핵심입니다.",
    how: [
      "출판사에 원고를 보내고, 출판사가 내는 몫과 저자가 내는 몫을 안내받습니다.",
      "계약서에 초판 제작비 · 재쇄 비용 · 홍보비를 각각 누가 내는지 적혀 있는지 확인합니다.",
    ],
    pros: [
      "출판사도 일부를 부담하는 구조라면, 책이 잘 팔릴 때 재쇄 비용을 출판사가 맡기도 합니다.",
    ],
    cons: [
      "'반씩' 이라는 말과 달리, 처음 들어가는 제작비는 저자가 대부분 내는 경우도 있습니다.",
      "저자 몫이 커도 인세는 자비출판보다 낮게 잡히기도 합니다. 금액과 인세를 함께 비교하세요.",
    ],
    related: [["/blog/self-publishing-scam-contract-signals", "계약서에서 확인할 대목"]],
  },
  {
    id: "indie",
    no: "04",
    title: "독립출판 — 출판사까지 직접 하는 방법",
    summary: "저자가 직접 출판사를 신고하고 ISBN · 인쇄 · 유통까지 맡아 내 책을 내는 방식입니다.",
    how: [
      "관할 시 · 군 · 구청에 출판사 신고를 합니다.",
      "국립중앙도서관 서지정보유통지원시스템에서 발행자번호를 받고 ISBN을 신청합니다.",
      "인쇄소와 직접 거래하고, 독립서점이나 유통사에 입고를 요청합니다.",
    ],
    pros: [
      "표지부터 가격까지 모든 결정을 내가 합니다.",
      "출판사 몫까지 내가 가져가는 구조입니다.",
    ],
    cons: [
      "편집 · 디자인 · 인쇄 · 유통 실무를 직접 배워야 해 시간이 많이 듭니다.",
      "책이 나온 뒤에도 주문 · 재고 · 정산 같은 운영 일이 계속 생깁니다.",
      "한 권만 낼 계획이라면 들이는 품에 비해 얻는 것이 적을 수 있습니다.",
    ],
    related: [
      ["/blog/independent-publishing-dummy-page-turn-spread-checks", "독립출판 가제본 점검"],
      ["/blog/isbn-agency-consultation-materials-cost-checks", "ISBN 발급대행 상담 전 준비"],
    ],
  },
  {
    id: "ebook",
    no: "05",
    title: "전자책 출판 — 종이 없이 먼저 내는 방법",
    summary: "원고를 EPUB · PDF 파일로 만들어 전자책 서점에 유통하는 방식입니다.",
    how: [
      "원고를 전자책 파일(EPUB 또는 PDF)로 만들고 목차 · 표지 · 도서 정보를 정리합니다.",
      "교보문고 · 예스24 · 리디 · 밀리의서재 같은 전자책 서점에 등록합니다.",
    ],
    pros: [
      "인쇄비가 들지 않아 시작 부담이 적고, 고칠 내용이 생기면 파일만 바꾸면 됩니다.",
      "종이책을 내기 전에 반응을 먼저 볼 수 있습니다.",
    ],
    cons: [
      "손에 쥐는 책이 주는 무게 · 선물로서의 의미는 종이책과 다릅니다.",
      "서점마다 파일 규격과 도서 정보 입력 방식이 달라 확인할 것이 많습니다.",
    ],
    related: [
      ["/blog/ebook-publishing-method-cost-process-file-checks", "전자책 출판 방법 · 과정"],
      ["/blog/ebook-epub-toc-heading-navigation-checks", "EPUB 목차 점검"],
    ],
  },
  {
    id: "interview",
    no: "06",
    title: "인터뷰 출판 — 원고 없이 말로 시작하는 방법",
    summary: "저자는 이야기하고, 전문 작가가 인터뷰를 바탕으로 원고를 쓰는 방식입니다. 드림위드에스가 주로 하는 방식입니다.",
    how: [
      "인터뷰로 책의 뼈대(주제 · 목차 · 핵심 이야기)를 잡습니다.",
      "인터뷰가 끝나고 약 4주 뒤 1차 원고를 받고, 두 번에 걸쳐 고칩니다.",
      "교정과 표지 디자인(시안 2개 · 수정 2회)을 동시에 진행해 기간을 줄이고, 인쇄 · 유통으로 이어갑니다.",
    ],
    pros: [
      "원고나 글솜씨가 없어도 시작할 수 있습니다.",
      "책은 저자 이름으로 서지정보에 등록되고, 저작권도 저자에게 있습니다.",
      "작가 · 기획자 · 디자이너 · 교정자가 동시에 움직여 제작 기간이 짧습니다.",
    ],
    cons: [
      "인터뷰에 저자의 시간이 들어갑니다. 기억과 자료(사진 · 기록)를 미리 꺼내 두면 좋습니다.",
      "집필까지 맡기는 만큼, 직접 쓴 원고로 내는 것보다 비용이 듭니다. 내 상황에 맞는 범위는 상담에서 정합니다.",
    ],
    related: [
      ["/blog/autobiography-interview-recording-segment-log", "자서전 인터뷰 녹음 정리법"],
      ["/blog/thesis-to-book-publishing-process", "논문 책 출판 방법"],
      ["/blog/doctor-book-publishing-outline-youtube-preparation", "의사 책 출판 준비 5단계"],
    ],
  },
];

const COMPARE: [string, string, string, string][] = [
  ["기획출판", "출판사", "완성 원고 또는 샘플", "시장성 있는 주제 · 원고가 있는 분"],
  ["자비출판", "저자", "완성 원고", "원고가 있고 원하는 때에 내고 싶은 분"],
  ["반기획출판", "나눠서 (계약마다 다름)", "완성 원고", "계약 범위를 꼼꼼히 비교할 수 있는 분"],
  ["독립출판", "저자 (직접 진행)", "완성 원고", "제작 · 유통을 직접 해 보고 싶은 분"],
  ["전자책 출판", "저자 (인쇄비 없음)", "완성 원고", "작게 먼저 내 보고 싶은 분"],
  ["인터뷰 출판", "저자", "없어도 됨", "쓸 시간은 없지만 할 이야기가 있는 분 · CEO · 전문가 · 부모님 자서전"],
];

const MORE: [string, string, string][] = [
  ["/blog/publishing-cost-quote-check-3", "책 출판 비용", "책 출판 비용은 왜 다를까? 견적서에서 확인할 3가지"],
  ["/blog/publishing-copyright-defamation-check", "출판 저작권", "책에 실명과 실제 사례를 써도 될까? 출판 전 저작권 · 명예훼손 확인"],
  ["/blog/thesis-to-book-publishing-process", "논문 책 출판", "논문 책 출판 방법: 학술 논문을 단행본으로 만드는 과정"],
];

// 검색 · AI 답변 엔진이 읽는 글 정보 (블로그 글과 같은 모양)
const ARTICLE_LD = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: TITLE,
  description: DESC,
  url: `${SITE_URL}/guide/book-publishing`,
  datePublished: "2026-11-07",
  dateModified: "2026-11-07",
  inLanguage: "ko-KR",
  image: `${SITE_URL}/og-image.png`,
  author: { "@type": "Organization", name: "드림위드에스 출판사" },
  publisher: { "@type": "Organization", name: "드림위드에스 출판사", url: SITE_URL },
};

export default function BookPublishingGuidePage() {
  return (
    <>
      <Script
        id="guide-article-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_LD) }}
      />
      <SiteHeader />
      <main className={s.page} id="main-content">
        <section className={s.hero}>
          <div className={s.heroInner}>
            <div className={s.eyebrow}>출판 가이드 · 01</div>
            <h1 className={s.heroTitle}>
              책출판 방법 총정리<br />
              <em>나에게 맞는 방법은 무엇일까?</em>
            </h1>
            <p className={s.heroSub}>
              기획출판 · 자비출판 · 반기획출판 · 독립출판 · 전자책 · 인터뷰 출판 — 처음 책을 내는 분이 가장 먼저 묻는 질문을 한 글에 정리했습니다.
            </p>
            <div className={s.meta}>
              <span><b>드림위드에스 출판사 편집부</b></span>
              <span>읽는 시간 약 8분</span>
              <span>2026.11.07 업데이트</span>
            </div>
          </div>
        </section>

        <div className={s.layout}>
          <nav className={s.toc} aria-label="목차">
            <div className={s.tocLabel}>목차</div>
            <ol>
              {TOC.map(([id, label]) => (
                <li key={id}><a href={`#${id}`}>{label}</a></li>
              ))}
            </ol>
          </nav>

          <article className={s.article}>
            <div className={s.takeaway}>
              <div className={s.takeawayLabel}>이 글에서 알 수 있는 것</div>
              <ul>
                <li>책을 내는 여섯 가지 방법과 각각의 좋은 점 · 아쉬운 점</li>
                <li>견적 · 계약 단계에서 저자가 꼭 확인해야 할 것</li>
                <li>원고가 있는지, 제작비를 누가 내는지에 따라 나에게 맞는 방법 고르는 순서</li>
              </ul>
            </div>

            <p>
              책을 내는 방법은 생각보다 많습니다. 하지만 나누는 기준은 두 가지면 충분합니다.
              <strong> 제작비를 누가 내는가</strong>, 그리고 <strong>원고를 누가 쓰는가</strong>입니다.
            </p>
            <p>
              출판사가 비용을 대면 기획출판, 저자가 대면 자비출판, 둘이 나누면 반기획출판입니다.
              출판사 일까지 직접 하면 독립출판, 종이 없이 파일로 내면 전자책 출판입니다.
              원고가 없다면 말로 이야기하고 작가가 쓰는 인터뷰 출판이 있습니다.
            </p>

            <h2 id="compare">한눈에 비교</h2>
            <div className={s.tableWrap}>
              <table className={s.table}>
                <thead>
                  <tr><th>방법</th><th>제작비</th><th>원고</th><th>이런 분께 맞습니다</th></tr>
                </thead>
                <tbody>
                  {COMPARE.map((r) => (
                    <tr key={r[0]} className={r[0] === "인터뷰 출판" ? s.rowOurs : undefined}>
                      {r.map((c, i) => <td key={i}>{c}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className={s.note}>※ 인세율 · 유통 범위 · 홍보 포함 여부는 출판사와 계약마다 다릅니다.</p>

            {METHODS.map((m) => (
              <section key={m.id} className={s.method} aria-labelledby={m.id}>
                <div className={s.methodNo}>방법 {m.no}</div>
                <h2 id={m.id}>{m.title}</h2>
                <p className={s.summary}><span>한 줄 요약</span>{m.summary}</p>
                <h3>진행 방법</h3>
                <ul>{m.how.map((x) => <li key={x}>{x}</li>)}</ul>
                <div className={s.proscons}>
                  <div className={s.pro}>
                    <h3>좋은 점</h3>
                    <ul>{m.pros.map((x) => <li key={x}>{x}</li>)}</ul>
                  </div>
                  <div className={s.con}>
                    <h3>아쉬운 점</h3>
                    <ul>{m.cons.map((x) => <li key={x}>{x}</li>)}</ul>
                  </div>
                </div>
                <div className={s.related}>
                  {m.related.map(([href, label]) => (
                    <Link key={href} href={href}>{label} →</Link>
                  ))}
                </div>
              </section>
            ))}

            <h2 id="choose">나에게 맞는 방법 고르기</h2>
            <p>아래 세 가지를 차례로 답해 보세요. 대부분 여기서 방향이 정해집니다.</p>
            <ol className={s.steps}>
              <li>
                <b>원고가 있나요?</b>
                없다면 <strong>인터뷰 출판</strong>이 가장 빠릅니다. 있다면 다음 질문으로.
              </li>
              <li>
                <b>제작비를 직접 낼 수 있나요?</b>
                어렵다면 <strong>기획출판</strong> 투고부터 시작합니다. 낼 수 있다면 다음 질문으로.
              </li>
              <li>
                <b>제작 · 유통을 직접 해 보고 싶나요?</b>
                그렇다면 <strong>독립출판</strong>, 전문가에게 맡기고 싶다면 <strong>자비출판</strong>입니다.
                부담 없이 먼저 내 보고 싶다면 <strong>전자책</strong>으로 시작해도 좋습니다.
              </li>
            </ol>

            <aside className={s.brand} aria-label="드림위드에스 출판사 안내">
              <div className={s.eyebrow}>드림위드에스 출판사</div>
              <p className={s.brandTitle}>원고가 없어도, 인터뷰로 시작할 수 있습니다</p>
              <p className={s.brandSub}>10년 넘게, 누적 890권 이상의 책을 만들었습니다.</p>
              <ul className={s.facts}>
                <li>인터뷰로 책의 뼈대 완성</li>
                <li>작가 · 기획 · 디자인 · 교정 동시 진행</li>
                <li>표절 · 저작권 · 명예훼손 사전 검수</li>
                <li>전국 온 · 오프라인 서점 + 전자책 유통</li>
                <li>저자 이름으로 등록 · 저작권은 저자에게</li>
                <li>종이책 인세 45% · 전자책 20%</li>
              </ul>
              <div className={s.brandBtns}>
                <a className={s.btnGold} href={KAKAO_CHAT} target="_blank" rel="noopener noreferrer"
                   data-track="cta_click" data-category="guide" data-label="guide_kakao">
                  카카오톡으로 출판 상담 →
                </a>
                <Link className={s.btnLine} href="/about#pricing">출판 안내 보기</Link>
              </div>
            </aside>

            <div className={s.moreTitle}>함께 읽으면 좋은 글</div>
            <div className={s.cards}>
              {MORE.map(([href, tag, title]) => (
                <Link key={href} href={href} className={s.card}>
                  <span className={s.cardTag}>{tag}</span>
                  <span className={s.cardTitle}>{title}</span>
                </Link>
              ))}
            </div>

            <div className={s.tags}>
              {["책출판", "출판방법", "기획출판", "자비출판", "반기획출판", "독립출판", "전자책출판", "인터뷰출판"].map((t) => (
                <span key={t}>#{t}</span>
              ))}
            </div>
          </article>
        </div>
      </main>
    </>
  );
}
