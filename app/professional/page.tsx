import type { Metadata } from "next";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import BookRail from "../components/BookRail";
import ProForm from "./ProForm";
import { KAKAO_CHAT, KAKAO_PATH } from "@/lib/links";
import h from "../home.module.css";
import p from "./professional.module.css";

/**
 * 전문직 전문 패키지 1,500만원 랜딩 (2026-11-09 대표님 요청)
 *
 * 설득 순서: 한 줄 포지셔닝 · 문제 질문 → 책으로 보여주는 증거 → 짧은 신청서 → 망설임 해소
 *            → 사례 → 진행 순서 → 맞는 분 · 묻는 말 → 마지막 신청.
 * 다른 출판사 사이트의 순서만 참고했고, 문장 · 이미지 · 코드는 쓰지 않았다.
 *
 * 숫자 · 사례는 blog-pipeline/company-guide.md · case-library.md 의 것만 쓴다.
 *   - 변호사 사례의 순위 · 판매 부수 · 기간 · 매출 효과는 자료가 없으므로 쓰지 않는다.
 *   - 인터뷰 횟수는 쓰지 않는다 (11/10 대표님). 기간은 "약" 으로만 쓴다.
 *   - 패키지 포함 범위는 대표님 확정 전이다. 확정되면 PRICE_NOTE 와 FAQ 4번을 고친다.
 */

const SITE_URL = "https://www.bookpublishingwithess.com";
const PAGE_URL = `${SITE_URL}/professional`;
const TITLE = "전문직 책 출판 패키지: 의사·변호사·세무사·CEO 브랜딩 출판";
const DESC =
  "의사·변호사·세무사·회계사·컨설턴트·CEO를 위한 전문직 전문 출판 패키지입니다. 원고가 없어도 인터뷰로 시작해 전문 분야의 책으로 출간합니다. 5분 전화 진단을 신청해 보세요.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PAGE_URL },
  openGraph: { title: TITLE, description: DESC, url: PAGE_URL, type: "website", siteName: "드림위드에스 출판사" },
};

const PRICE_NOTE = "포함 범위와 인쇄 부수는 상담에서 확정해 안내드립니다.";

// /about 포트폴리오에 이미 공개된 표지 — 전문 분야 책 위주로 고르고, 글자로는 분야만 쓴다
const BOOKS = [
  { file: "anti-aging", cat: "의학 · 피부미용" },
  { file: "knee-life", cat: "건강 · 물리치료" },
  { file: "k-beauty", cat: "전문지식 · 뷰티" },
  { file: "esg-kim", cat: "전문지식 · ESG" },
  { file: "leader-talk", cat: "코칭 · 커뮤니케이션" },
  { file: "startup-exit", cat: "비즈니스 · 스타트업" },
  { file: "livecommerce", cat: "비즈니스 · 실용서" },
  { file: "culturen-4th", cat: "문화산업 · 전문서" },
];

const GETS = [
  { t: "책의 중심이 될 주제", d: "매일 하는 설명 중 어떤 이야기가 책이 되는지 짚어드립니다." },
  { t: "먼저 잡을 독자", d: "환자 · 의뢰인 · 고객 · 거래처 중 누구에게 먼저 읽힐지 정합니다." },
  { t: "지금 상태에 맞는 시작법", d: "원고 · 강의안 · 칼럼이 있는지에 따라 진행 순서를 안내합니다." },
];

const STOPS = [
  { q: "“이 정도로 책을 써도 되나” 싶어서 미뤘습니다", a: "지금 필요한 것은 완벽한 원고가 아니라 시작할 수 있는 구조입니다. 인터뷰로 저자님의 말을 먼저 꺼내고, 목차는 기획자가 함께 잡습니다." },
  { q: "진료와 상담이 먼저라 계속 밀립니다", a: "저희가 일정을 잡고 끌고 갑니다. 저자님이 내는 시간은 인터뷰와 원고 확인입니다." },
  { q: "글 쓸 시간도, 자신도 없습니다", a: "작가 · 기획자 · 디자이너 · 교정자가 동시에 움직입니다. 저자님은 평소 하시던 말씀을 들려주시면 됩니다." },
  { q: "잘못 썼다가 문제가 될까 걱정됩니다", a: "표절 · 저작권 · 초상권 · 명예훼손은 전담팀이 출간 전에 먼저 검수합니다. 전문 내용은 저자님이 직접 확인하고 확정합니다." },
];

// case-library.md 예시 — 카드에 '예시' 라고 붙인다
const EXAMPLES = [
  { who: "의사", say: "“환자한테 하는 설명은 많은데, 그게 책이 되나요?”", from: "진료 때마다 되풀이하는 설명", use: "진료 전에 읽고 오는 설명서 · 강연 교재" },
  { who: "세무사", say: "“상담 때 하는 말은 늘 똑같은데, 책으로 쓰면 누가 읽나요?”", from: "자영업자들이 해마다 똑같이 하는 실수", use: "신규 고객 상담 전 자료 · 세미나 교재" },
  { who: "CEO", say: "“직원들한테 매번 같은 얘기를 하는데, 그게 안 남아요.”", from: "회사가 흔들릴 때 내린 판단, 사람을 뽑는 기준", use: "신입 교육 · 승계 준비 · 거래처 선물" },
];

const STEPS = [
  { t: "5분 전화 진단", d: "주제와 원고 상태를 듣고 방향을 잡습니다." },
  { t: "기획 · 계약", d: "책의 방향과 패키지 범위를 확정합니다." },
  { t: "인터뷰", d: "평소 하시던 이야기를 들려주시면 됩니다. 글은 준비하지 않으셔도 됩니다." },
  { t: "1차 원고", d: "인터뷰를 마치고 약 4주 뒤 받아보십니다." },
  { t: "교정 · 디자인", d: "교정과 표지 작업을 동시에 진행해 기간을 줄입니다." },
  { t: "출간 · 유통", d: "전국 온 · 오프라인 서점과 전자책으로 유통합니다." },
];

const FAQ = [
  { q: "원고가 하나도 없어도 되나요?", a: "네, 인터뷰로 시작합니다. 강의안 · 칼럼 · 설명 자료가 있으면 함께 활용합니다." },
  { q: "제 책으로 인정되나요?", a: "책은 저자님 이름으로 서지정보에 등록되고, 저작권은 저자님께 귀속됩니다." },
  { q: "전문 내용의 정확성은 누가 확인하나요?", a: "전문 내용은 저자님이 직접 확인하고 확정합니다. 표절 · 저작권 · 초상권 · 명예훼손은 전담팀이 출간 전에 먼저 검수합니다." },
  { q: "1,500만원에는 무엇이 포함되나요?", a: "책의 목적과 분량에 맞춰 상담에서 범위를 확정해 안내드립니다. 완성된 원고가 있으면 더 낮은 패키지가 맞을 수도 있습니다." },
];

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "전문직 전문 패키지",
      serviceType: "전문직 브랜딩 출판",
      url: PAGE_URL,
      description: DESC,
      provider: { "@type": "Organization", name: "드림위드에스 출판사", url: SITE_URL },
      offers: { "@type": "Offer", price: "15000000", priceCurrency: "KRW", url: PAGE_URL },
    },
    // FAQPage 는 layout 에 이미 있다 — 한 페이지에 두 개면 서치 콘솔이 중복 오류를 낸다
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "홈", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "전문직 전문 패키지", item: PAGE_URL },
      ],
    },
  ],
};

export default function ProfessionalPage() {
  return (
    <>
      <a href="#apply" className="skip-link">신청서 바로가기</a>
      <SiteHeader />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      <main className={`${h.page} ${p.root}`} id="main-content">
        {/* ── 한 줄 포지셔닝 · 문제 질문 ─────────────────── */}
        <section className={p.hero}>
          <div className={p.wrap}>
            <div className={p.heroGrid}>
              <div>
                <span className={p.tag}>전문직 브랜딩 출판</span>
                <h1>매일 반복하는 전문가의 설명이<br /><em>한 권의 책</em>이 됩니다</h1>
                <p className={p.question}>경력은 쌓이는데, 이름을 검색하면 프로필 한 줄뿐인가요?</p>
                <p className={p.lead}>진료실 · 상담실 · 회의실에서 해 온 이야기를 인터뷰로 꺼내 전문 분야의 책으로 만듭니다. 글은 저희가 함께 씁니다.</p>
                <div className={p.actions}>
                  <a className={p.primary} href="#apply" data-track="cta_click" data-category="consult" data-label="professional_hero_apply">5분 전화 진단 신청</a>
                  <a className={p.ghost} href="tel:010-2068-0817" data-track="cta_click" data-category="consult" data-label="professional_hero_tel">전화 010-2068-0817</a>
                </div>
              </div>
              <aside className={p.price} aria-label="패키지 금액">
                <p className={p.priceName}>전문직 전문 패키지</p>
                <p className={p.priceNum}>1,500<small>만원</small></p>
                <p className={p.priceFor}>의사 · 변호사 · 세무사 · 회계사<br />컨설턴트 · CEO</p>
                <p className={p.priceNote}>{PRICE_NOTE}</p>
              </aside>
            </div>
            <dl className={p.stats}>
              <div><dt>890권+</dt><dd>누적 출간</dd></div>
              <div><dt>10년+</dt><dd>출판 운영</dd></div>
              <div><dt>45%</dt><dd>종이책 인세</dd></div>
            </dl>
          </div>
        </section>

        {/* ── 증거 ─────────────────────────────────────── */}
        <section className={p.section}>
          <div className={p.wrap}>
            <p className={p.eyebrow}>BOOKS</p>
            <h2 className={p.h2}>전문 분야의 지식이 서점에 놓이는 책이 됩니다</h2>
            <p className={p.sub}>드림위드에스가 만든 책의 일부입니다. 옆으로 넘겨 보세요.</p>
            <BookRail books={BOOKS} />
          </div>
        </section>

        {/* ── 신청서 ───────────────────────────────────── */}
        <section className={p.apply} id="apply">
          <div className={p.wrap}>
            <div className={p.applyGrid}>
              <div className={p.applyCopy}>
                <p className={p.eyebrow}>첫 상담 무료</p>
                <h2 className={p.h2}>내 전문 분야,<br />책이 될까요?</h2>
                <p className={p.sub}>간단히 남겨주시면 5분 통화로 먼저 방향을 잡아드립니다.</p>
                <ul className={p.gets}>
                  {GETS.map((g) => <li key={g.t}><b>{g.t}</b><span>{g.d}</span></li>)}
                </ul>
              </div>
              <ProForm />
            </div>
          </div>
        </section>

        {/* ── 망설임 해소 ──────────────────────────────── */}
        <section className={p.section}>
          <div className={p.wrap}>
            <p className={p.eyebrow}>WHY NOT YET</p>
            <h2 className={p.h2}>전문직 저자가 책 앞에서 멈추는 이유</h2>
            <div className={p.stops}>
              {STOPS.map((x) => <article className={p.stop} key={x.q}><h3>{x.q}</h3><p>{x.a}</p></article>)}
            </div>
          </div>
        </section>

        {/* ── 사례 ─────────────────────────────────────── */}
        <section className={`${p.section} ${p.tint}`}>
          <div className={p.wrap}>
            <p className={p.eyebrow}>CASES</p>
            <h2 className={p.h2}>평소 하던 이야기가 책이 됩니다</h2>
            <article className={p.case}>
              <span className={p.caseTag}>실제 사례 · 변호사</span>
              <h3>변호사가 쓴 책이 자기계발 베스트셀러가 됐습니다</h3>
              <p>법률서가 아니라, 변호사가 사람들에게 매번 하던 이야기를 책으로 옮겼습니다. 출간에서 끝내지 않고 베스트셀러 마케팅과 저자 브랜딩까지 함께했습니다.</p>
            </article>
            <div className={p.examples}>
              {EXAMPLES.map((e) => (
                <article className={p.example} key={e.who}>
                  <span className={p.who}>예시 · {e.who}</span>
                  <p className={p.say}>{e.say}</p>
                  <dl>
                    <div><dt>인터뷰에서 꺼내는 것</dt><dd>{e.from}</dd></div>
                    <div><dt>책이 하는 일</dt><dd>{e.use}</dd></div>
                  </dl>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── 진행 순서 ────────────────────────────────── */}
        <section className={p.section}>
          <div className={p.wrap}>
            <p className={p.eyebrow}>PROCESS</p>
            <h2 className={p.h2}>저자님이 하실 일은 말씀과 확인입니다</h2>
            <ol className={p.steps}>
              {STEPS.map((x) => <li key={x.t}><h3>{x.t}</h3><p>{x.d}</p></li>)}
            </ol>
            <p className={p.note}>※ 기간은 프로젝트마다 달라질 수 있습니다. 전체 제작은 원고를 받은 날부터 보통 50~70일 걸립니다.</p>
          </div>
        </section>

        {/* ── 맞는 분 · 묻는 말 ───────────────────────── */}
        <section className={`${p.section} ${p.tint}`}>
          <div className={p.wrap}>
            <p className={p.eyebrow}>CHECK</p>
            <h2 className={p.h2}>이 패키지가 맞는지 먼저 확인해 보세요</h2>
            <div className={p.fit}>
              <div>
                <h3>이런 분께 맞습니다</h3>
                <ul>
                  <li>전문 분야의 경험을 책으로 정리하고 싶은 분</li>
                  <li>본업이 바빠 글 쓸 시간이 없는 분</li>
                  <li>출간 뒤 강연 · 언론 · 사업으로 이어가고 싶은 분</li>
                </ul>
              </div>
              <div>
                <h3>이런 분께는 맞지 않습니다</h3>
                <ul>
                  <li>가장 낮은 인쇄비만 찾는 분</li>
                  <li>원고 완성도가 높아 기획출판을 먼저 시도해 볼 분</li>
                  <li>책 한 권으로 바로 매출이 늘기를 기대하는 분</li>
                </ul>
              </div>
            </div>
            <div className={p.faq}>
              {FAQ.map((f) => <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>)}
            </div>
          </div>
        </section>

        {/* ── 마지막 신청 ──────────────────────────────── */}
        <section className={p.last}>
          <div className={p.wrap}>
            <h2>오래 쌓은 전문성을 책으로 남기세요</h2>
            <p>5분 통화로 내 분야가 책이 되는지부터 확인해 보세요.</p>
            <div className={p.actions}>
              <a className={p.primary} href="#apply" data-track="cta_click" data-category="consult" data-label="professional_last_apply">5분 전화 진단 신청</a>
              <a className={p.ghost} href="tel:010-2068-0817" data-track="cta_click" data-category="consult" data-label="professional_last_tel">전화 010-2068-0817</a>
            </div>
          </div>
        </section>

        <a className={h.float} href={KAKAO_CHAT} target="_blank" rel="noopener noreferrer"
           data-track="cta_click" data-category="consult" data-label="professional_float_kakao">
          <svg className={h.kk} viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d={KAKAO_PATH} /></svg>카카오톡 상담
        </a>
      </main>
      <SiteFooter />
    </>
  );
}
