import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../components/SiteHeader";
import s from "./guide.module.css";

/**
 * 출판 가이드 — 글 위주 칼럼 목록 (시안, 11/7 대표님 요청)
 * GNB "출판 가이드" 가 여기로 온다. 자동 블로그(/blog)는 짧은 점검 글, 여기는 주제 하나를 길게 정리한 글.
 */

const SITE_URL = "https://www.bookpublishingwithess.com";

export const metadata: Metadata = {
  title: "출판 가이드 · 처음 책을 내는 분을 위한 정리 글 | 드림위드에스",
  description: "책출판 방법 · 비용 · 기간 · 자서전 · 논문 출판까지, 처음 책을 내는 분이 알아야 할 것을 주제별로 길게 정리했습니다.",
  alternates: { canonical: `${SITE_URL}/guide` },
};

// 주제별 정리 글 — 블로그에 이미 있는 긴 안내 글을 모아 둔다 (새 가이드를 쓰면 여기로 옮긴다)
const NEXT: [string, string, string, string][] = [
  ["02", "/blog/self-publishing-complete-guide-order-and-criteria", "자비출판 총정리, 처음 준비하는 분이 알아야 할 순서와 선택 기준", "원고 상태에 따라 무엇부터 준비하고, 출판사를 어떤 기준으로 고르는지"],
  ["03", "/blog/memoir-publishing-complete-guide", "자서전 출판 완전 안내, 처음 준비하는 분을 위한 순서", "인터뷰 · 원고 · 사진 정리부터 출간까지, 부모님 자서전과 내 자서전 모두"],
  ["04", "/blog/ebook-publishing-complete-guide", "전자책 출판 완전 안내, 원고부터 유통까지 한 번에 정리", "파일 만들기 · 도서 정보 · 전자책 서점 등록까지"],
  ["05", "/blog/thesis-consulting-complete-guide", "논문컨설팅 방법 · 비용 · 과정: 상담 전 지원 범위와 준비사항", "어디까지 도움받을 수 있는지, 상담 전에 준비할 자료"],
];

const TOPICS: [string, string][] = [
  ["책 출판 비용", "/blog/publishing-cost-quote-check-3"],
  ["자비출판", "/blog/self-publishing-first-print-run-distribution-plan"],
  ["자서전 출판", "/blog/autobiography-interview-recording-segment-log"],
  ["전자책 출판", "/blog/ebook-publishing-method-cost-process-file-checks"],
  ["독립출판", "/blog/independent-publishing-dummy-page-turn-spread-checks"],
  ["ISBN", "/blog/isbn-agency-consultation-materials-cost-checks"],
  ["출판 저작권", "/blog/publishing-copyright-defamation-check"],
  ["논문 책 출판", "/blog/thesis-to-book-publishing-process"],
  ["블로그 전체 보기", "/blog"],
];

export default function GuideIndexPage() {
  return (
    <>
      <SiteHeader />
      <main className={s.page} id="main-content">
        <section className={s.hero}>
          <div className={s.heroInner}>
            <div className={s.eyebrow}>GUIDE · 출판 가이드</div>
            <h1 className={s.heroTitle}>
              처음 책을 내는 분을 위한<br />
              <em>출판 가이드</em>
            </h1>
            <p className={s.heroSub}>
              방법 · 비용 · 기간 · 계약 — 상담에서 가장 많이 받는 질문을 주제 하나씩 길게 정리합니다.
              890권을 만들며 알게 된 것을 그대로 적었습니다.
            </p>
          </div>
        </section>

        <div className={s.hub}>
          <Link href="/guide/book-publishing" className={s.featured}>
            <div className={s.featuredBody}>
              <span className={s.featuredNo}>01 · 가장 먼저 읽을 글</span>
              <span className={s.featuredTitle}>책출판 방법 총정리: 기획출판 · 자비출판 · 독립출판 · 인터뷰 출판, 나에게 맞는 방법은?</span>
              <p className={s.featuredText}>
                제작비를 누가 내는지, 원고를 누가 쓰는지 — 두 가지만 알면 여섯 가지 출판 방법이 한 번에 정리됩니다.
                방법마다 진행 순서 · 좋은 점 · 아쉬운 점과, 나에게 맞는 방법을 고르는 세 가지 질문.
              </p>
              <span className={s.featuredMeta}>드림위드에스 출판사 편집부 · 읽는 시간 약 8분</span>
            </div>
            <div className={s.featuredSide} aria-hidden="true">
              <div>기획출판 <span>출판사가 비용</span></div>
              <div>자비출판 <span>저자가 비용</span></div>
              <div>반기획출판 <span>나눠서</span></div>
              <div>독립출판 <span>직접 진행</span></div>
              <div>전자책 출판 <span>인쇄비 없음</span></div>
              <div>인터뷰 출판 <span>원고 없어도</span></div>
            </div>
          </Link>

          <h2 className={s.sectionTitle}>주제별 정리 글</h2>
          <p className={s.sectionSub}>궁금한 출판 방식이 정해졌다면 — 그 방식 하나를 처음부터 끝까지 정리한 글입니다.</p>
          <ul className={s.list}>
            {NEXT.map(([no, href, title, text]) => (
              <li key={no}>
                <Link href={href}>
                  <span className={s.listNo}>{no}</span>
                  <span className={s.listTitle}>{title}<span className={s.listText}>{text}</span></span>
                  <span className={s.listMeta}>읽기 →</span>
                </Link>
              </li>
            ))}
          </ul>

          <h2 className={s.sectionTitle}>주제별 짧은 글</h2>
          <p className={s.sectionSub}>한 가지 점검만 빠르게 보고 싶을 때 — 블로그에 매일 올라가는 글입니다.</p>
          <div className={s.topics}>
            {TOPICS.map(([label, href]) => (
              <Link key={label} href={href}>{label}</Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
