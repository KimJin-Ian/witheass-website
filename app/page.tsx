import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";
import ConsultForm from "./components/ConsultForm";
import BookRail from "./components/BookRail";
import { KAKAO_CHAT, KAKAO_PATH } from "@/lib/links";
import s from "./home.module.css";

/**
 * 첫 화면 — 상담 신청 랜딩 (2026-10-13 개편, 대표님 요청)
 *
 *   한 줄 약속 → 상담 신청서(주인공) → 고민 해결 → 왜 우리인가 → 무엇이 다른가 → 출간 도서 → 사례 → 바로가기 → 회사 소개(About us)로 가는 칸
 *   (고민 해결 · 무엇이 다른가 · 출간 도서 · 바로가기 · 전화 버튼은 2026-11-09 대표님 메모로 보충)
 *   11/10 대표님: 인터뷰 횟수는 쓰지 않는다 · 전문직 패키지는 상단 메뉴로만 · 바로가기는 Q&A 모음집 하나 · 예시 안내문 삭제
 *
 * 예전 첫 화면(회사 소개 전체)은 /about 으로 옮겼다 (app/about/AboutClient.tsx).
 * 상담 · 문의 버튼은 전부 카카오톡 채팅으로 간다. 신청서는 저장 + 카톡으로 간다 (ConsultForm).
 *
 * 대표님이 뺀 것: 진행 과정 · 자주 묻는 질문 · 대표 실명 · 나이 · 책 제목 · 예시의 제목 후보.
 * 숫자 · 사례는 blog-pipeline/company-guide.md · case-library.md 에 있는 것만 쓴다.
 * 예시는 "예시" 라고 밝힌다.
 */

const SITE_URL = "https://www.bookpublishingwithess.com";

export const metadata: Metadata = {
  // 제목 · 설명은 layout 기본값(회사 대표 문구)을 그대로 쓴다. 표준 주소만 이 페이지 것으로
  alternates: { canonical: SITE_URL },
};

// 대표님 메모의 네 가지 고민 — 답은 company-guide.md 의 공개 사실만 쓴다
const WORRIES = [
  { q: "내 원고도 책이 될 수 있나요?", a: "원고가 있으면 그 원고로, 없으면 인터뷰로 시작합니다. 어느 쪽이든 기획 · 교정 · 디자인은 저희가 함께합니다." },
  { q: "바빠서 시작할 엄두가 안 납니다", a: "저자님이 내는 시간은 인터뷰와 원고 확인입니다. 인터뷰 후 약 4주면 1차 원고가 나오고, 일정은 저희가 끌고 갑니다." },
  { q: "출간하면 서점에는 어떻게 들어가나요?", a: "서점 입고와 유통은 출판사가 맡습니다. 전국 온 · 오프라인 서점과 밀리의서재 · 교보 · 예스24 · 리디 전자책까지 기본 2년간 유통합니다." },
  { q: "책을 내도 아무도 모르면 어떡하죠?", a: "검색 노출 · SNS · 언론 기사 · 강연까지 마케팅을 이어서 맡을 수 있습니다. 독자를 직접 만나는 자리는 저자님과 함께 움직입니다." },
];

// company-guide.md '함께 작업해 온 대상' 15가지 그대로 — "내가 해당될까?" 를 바로 찾게 한다
const AUTHORS = [
  "CEO", "기업인", "의사", "변호사", "교수", "공직자", "강사", "컨설턴트",
  "개인 자서전", "부모님 선물용 자서전", "은퇴 후 제2직업", "퍼스널 브랜딩 도서", "재테크 도서", "논문형 전문도서", "기관 브랜딩 도서",
];

// 다른 곳의 이름 · 금액은 쓰지 않는다. 일반적인 경우라고 아래에 밝힌다
const COMPARE: [string, string, string][] = [
  ["원고", "저자가 완성해서 보냅니다", "인터뷰로 작가가 함께 씁니다"],
  ["기획", "받은 원고를 책 모양으로 만듭니다", "기획자가 목차부터 책의 방향을 잡습니다"],
  ["출간 전 검수", "저자가 직접 확인합니다", "표절 · 저작권 · 초상권을 전담팀이 먼저 검수합니다"],
  ["출간 후", "인쇄와 납품에서 끝나는 경우가 많습니다", "마케팅 · 강연 · 사업 확장까지 이어갑니다"],
];

// 회사 소개(/about) 포트폴리오에 이미 공개된 표지 — 실명 · 책 제목은 첫 화면 글자로 쓰지 않는다
const BOOKS = [
  { file: "leader-talk", cat: "코칭 · 커뮤니케이션" },
  { file: "k-beauty", cat: "전문지식 · 뷰티" },
  { file: "livecommerce", cat: "비즈니스 · 실용서" },
  { file: "esg-kim", cat: "전문지식 · ESG" },
  { file: "dream-everyday", cat: "자서전 · 인생기록" },
  { file: "culturen-4th", cat: "문화산업 · 전문서" },
  { file: "k-man-report", cat: "사회 · 문화 비평" },
  { file: "startup-exit", cat: "비즈니스 · 스타트업" },
];

// 네이버 도서에서 '드림위드에스' 로 찾은 목록 (11/10 대표님이 준 링크)
const BOOKS_MORE = `https://search.shopping.naver.com/book/search?bookTabType=ALL&query=${encodeURIComponent("드림위드에스")}&sort=REL`;

// 비용 · 과정 · 견적은 Q&A 모음집 하나로 합쳤다 (11/10 대표님)
const SHORTCUTS = [
  { href: "/qna", title: "Q&A 모음집", body: "출판 비용 · 책 내는 과정 · 견적까지, 자주 받는 질문을 한곳에 모았습니다", label: "qna" },
];

const WHY = [
  { ico: "✓", title: "대표가 먼저 걸어본 길", body: "이야기 하나를 웹툰 · 뮤지컬 · 독립영화 · 강연 · 사업으로 직접 넓혀 봤습니다. 출간 다음에 무엇이 오는지까지 함께 설계합니다." },
  { ico: "✎", title: "원고 없이 인터뷰만으로", body: "글솜씨가 없어도 됩니다. 인터뷰로 책의 뼈대를 잡고, 작가 · 기획자 · 디자이너 · 교정자가 동시에 움직여 기간을 줄입니다." },
  { ico: "©", title: "ISBN · 저작권은 저자 이름으로", body: "ISBN과 저작권을 전부 저자 본인 명의로 등록합니다. 종이책 인세는 정가의 45%, 전자책은 20%입니다." },
  { ico: "↗", title: "출간에서 끝나지 않습니다", body: "출간 뒤 마케팅 · 강연 · 사업 확장까지 이어갑니다. 표절 · 저작권 · 초상권은 전담팀이 출간 전에 먼저 검수합니다." },
];

const EXAMPLES = [
  {
    who: "의사",
    first: "“환자분께 매번 같은 설명을 하는데, 그게 책이 되나요?”",
    toc: "이 병은 왜 생기나 · 치료 전에 알아둘 것 · 수술이 필요한 신호 · 치료 뒤 관리",
    use: "진료 전에 읽고 오는 설명서 · 병원 신뢰 · 강연 교재",
  },
  {
    who: "CEO",
    first: "“직원들한테 매번 같은 얘기를 하는데, 그게 남지를 않아요.”",
    toc: "회사를 세운 이유 · 망할 뻔한 순간들 · 사람을 뽑는 기준 · 다음 리더에게",
    use: "신입 교육 · 거래처 신뢰 · 승계 준비 · 언론 · 강연",
  },
  {
    who: "정치인",
    first: "“지역에서 해온 일을 한 번에 보여드릴 방법이 없어요.”",
    toc: "이 지역에서 자란 이야기 · 현장에서 들은 목소리 · 바꿔온 것들 · 앞으로 할 일",
    use: "출판기념회 · 의정 활동 기록 · 주민과의 첫 대화",
  },
];

function KakaoIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d={KAKAO_PATH} />
    </svg>
  );
}

export default function HomePage() {
  return (
    <>
      <a href="#apply" className="skip-link">상담 신청서 바로가기</a>
      <SiteHeader />
      <main className={s.page} id="main-content">
        {/* ── 한 줄 약속 ───────────────────────────────── */}
        <section className={s.hero} id="top">
          <div className={s.wrap}>
            <span className={s.pill}><i aria-hidden="true" />원고가 없어도 책이 나오는 출판사</span>
            <p className={s.who}>대표님들, 전문직분들, 개인 자서전 쓰시려는 분들</p>
            <h1 className={s.title}><em>인터뷰만 하세요,</em><br />나머지는 저희가 다 해드립니다</h1>
            <p className={s.lead}>
              기획 · 인터뷰 · 원고 작성 · 편집 · 디자인 · 출간 · 마케팅까지, 드림위드에스 출판사가 한 번에 맡아
              서점에 깔리는 책으로 만들어드립니다.
            </p>
            <div className={s.cta}>
              <a className={s.btnKakao} href={KAKAO_CHAT} target="_blank" rel="noopener noreferrer"
                 data-track="cta_click" data-category="consult" data-label="home_hero_kakao">
                <KakaoIcon className={s.kk} />카카오톡으로 바로 상담
              </a>
              <a className={s.btnTel} href="tel:010-2068-0817"
                 data-track="cta_click" data-category="consult" data-label="home_hero_tel">
                전화 상담 010-2068-0817
              </a>
              <a className={s.toForm} href="#apply">또는 아래 신청서 작성하기 ↓</a>
            </div>
            <dl className={s.stats}>
              <div><dt>890권+</dt><dd>누적 출간</dd></div>
              <div><dt>10년+</dt><dd>출판 운영</dd></div>
              <div><dt>45%</dt><dd>종이책 인세</dd></div>
            </dl>
          </div>
        </section>

        {/* ── 상담 신청서 — 이 페이지의 주인공 ────────────── */}
        <section className={s.apply} id="apply">
          <div className={s.narrow}>
            <ConsultForm />
          </div>
        </section>

        {/* ── 고민 해결 ───────────────────────────────── */}
        <section className={s.section} id="worries">
          <div className={s.wrap}>
            <p className={s.eyebrow}>고민 해결</p>
            <h2 className={s.h2}>책을 내기 전, 가장 많이 망설이는 네 가지</h2>
            <div className={s.worries}>
              {WORRIES.map((w) => (
                <article key={w.q}>
                  <h3>{w.q}</h3>
                  <p>{w.a}</p>
                </article>
              ))}
            </div>
            <h3 className={s.authorsHead}>이런 분들과 책을 만들어 왔습니다</h3>
            <ul className={s.authors}>
              {AUTHORS.map((a) => <li key={a}>{a}</li>)}
            </ul>
          </div>
        </section>

        {/* ── 왜 우리인가 ─────────────────────────────── */}
        <section className={s.section} id="why">
          <div className={s.wrap}>
            <p className={s.eyebrow}>WHY 드림위드에스</p>
            <h2 className={s.h2}>드림위드에스는 뭐가 다른가요?</h2>
            <p className={s.sub}>원고가 없는 분도 끝까지 책임지고 서점까지 모셔갑니다.</p>
            <div className={s.why}>
              {WHY.map((w) => (
                <article key={w.title}>
                  <span className={s.ico} aria-hidden="true">{w.ico}</span>
                  <h3>{w.title}</h3>
                  <p>{w.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── 무엇이 다른가 ─────────────────────────────── */}
        <section className={`${s.section} ${s.tint}`} id="compare">
          <div className={s.wrap}>
            <p className={s.eyebrow}>COMPARE</p>
            <h2 className={s.h2}>같은 ‘출판’이어도 맡기는 일이 다릅니다</h2>
            <p className={s.sub}>인쇄비만 비교하면 놓치는 것들입니다.</p>
            <div className={s.cmpWrap}>
              <table className={s.cmpTable}>
                <thead>
                  <tr><th scope="col">구분</th><th scope="col">인쇄 중심 출판</th><th scope="col" className={s.cmpUs}>드림위드에스 인터뷰 출판</th></tr>
                </thead>
                <tbody>
                  {COMPARE.map(([k, a, b]) => (
                    <tr key={k}><th scope="row">{k}</th><td data-l="인쇄 중심 출판">{a}</td><td data-l="드림위드에스" className={s.cmpUs}>{b}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className={s.note}>※ 일반적인 경우를 비교한 것으로, 업체와 계약 조건에 따라 다를 수 있습니다.</p>
            <div className={s.fit}>
              <p><b>이런 분께 맞습니다</b>책을 전문성 · 사업 · 인생 기록에 제대로 쓰고 싶은 분, 글 쓸 시간이 없는 분</p>
              <p><b>이런 분께는 맞지 않습니다</b>가장 낮은 인쇄비만 찾는 분</p>
            </div>
          </div>
        </section>

        {/* ── 출간 도서 ───────────────────────────────── */}
        <section className={s.section} id="books">
          <div className={s.wrap}>
            <p className={s.eyebrow}>BOOKS</p>
            <h2 className={s.h2}>드림위드에스가 만든 책</h2>
            <p className={s.sub}>옆으로 넘겨 보세요. 누적 890권 이상을 출간했습니다.</p>
            <BookRail books={BOOKS} />
            <p className={s.moreBooks}>
              <a href={BOOKS_MORE} target="_blank" rel="noopener noreferrer"
                 data-track="cta_click" data-category="navigation" data-label="home_books_more">출간 도서 더 보기 →</a>
            </p>
          </div>
        </section>

        {/* ── 사례 — 실명 · 책 제목은 싣지 않는다 ─────────── */}
        <section className={`${s.section} ${s.tint}`} id="cases">
          <div className={s.wrap}>
            <p className={s.eyebrow}>CASES</p>
            <h2 className={s.h2}>책으로 증명된 사례</h2>
            <p className={s.sub}>실제 저자의 이야기와, 이런 분이 오시면 어떻게 진행되는지 보여드립니다.</p>
            <div className={s.real}>
              <article>
                <span className={s.tag}>실제 사례 · 변호사</span>
                <p className={s.big}>변호사가 쓴 책이<br /><em>자기계발 베스트셀러</em>가 됐습니다</p>
                <p>법률서가 아니라, 변호사가 사람들에게 매번 하던 이야기를 책으로 옮겼습니다. 출간부터 베스트셀러 마케팅 · 저자 브랜딩까지 함께했습니다.</p>
                <ul><li><b>분야</b>자기계발 베스트셀러</li><li><b>함께한 일</b>출간 · 마케팅 · 저자 브랜딩</li></ul>
              </article>
              <article>
                <span className={s.tag}>대표의 첫 책</span>
                <p className={s.big}>음대생 시절 낸 책 한 권이<br /><em>웹툰 · 뮤지컬 · 사업</em>이 됐습니다</p>
                <p>대표가 학생 때 낸 첫 책이 베스트셀러가 됐고, 그 한 권을 웹툰 · 뮤지컬 · 독립영화 · 영문판 · 강연 · 사업으로 직접 넓혔습니다.</p>
                <ul><li><b>첫 책</b>베스트셀러</li><li><b>이어진 일</b>웹툰 · 뮤지컬 · 강연 · 사업</li></ul>
              </article>
            </div>

            <h3 className={s.exHead}>이런 분이 오시면 — 처음 한 말에서 책까지</h3>
            <div className={s.ex}>
              {EXAMPLES.map((e) => (
                <article key={e.who}>
                  <span className={s.whoChip}>예시 · {e.who}</span>
                  <p className={s.first}>{e.first}</p>
                  <dl>
                    <div><dt>인터뷰 뒤 목차</dt><dd>{e.toc}</dd></div>
                    <div><dt>책이 하는 일</dt><dd>{e.use}</dd></div>
                  </dl>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── 회사 소개 전체(예전 첫 화면)로 ─────────────── */}
        <section className={s.section}>
          <div className={s.wrap}>
            <nav className={s.shortcuts} aria-label="더 알아보기">
              {SHORTCUTS.map((x) => (
                <Link key={x.title} href={x.href} data-track="cta_click" data-category="navigation" data-label={`home_shortcut_${x.label}`}>
                  <b>{x.title} →</b>
                  <span>{x.body}</span>
                </Link>
              ))}
            </nav>
            <Link className={s.aboutLink} href="/about" data-track="cta_click" data-category="navigation" data-label="home_about_link">
              <span>
                <p className={s.eyebrow}>ABOUT US</p>
                <h2>드림위드에스가 더 궁금하시다면</h2>
                <p>10년 · 890권의 출판 이야기, 패키지 · 작가진 · 출간 사례 · 저자들의 이야기를 한곳에 모았습니다.</p>
              </span>
              <span className={s.go}>회사 소개 보기 →</span>
            </Link>
          </div>
        </section>

        {/* 오른쪽 아래 고정 — 카톡 하나만 */}
        <a className={s.float} href={KAKAO_CHAT} target="_blank" rel="noopener noreferrer"
           data-track="cta_click" data-category="consult" data-label="home_float_kakao">
          <KakaoIcon className={s.kk} />카카오톡 상담
        </a>
      </main>
      <SiteFooter />
    </>
  );
}
