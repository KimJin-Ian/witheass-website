import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import CoachForm from "./CoachForm";
import PickButton from "./PickButton";
import { COACHING, PRODUCTION } from "@/lib/coaching";
import { KAKAO_CHAT, KAKAO_PATH } from "@/lib/links";
import h from "../home.module.css";
import c from "./coaching.module.css";

/**
 * 드림위드에스 1:1 책출판 코칭 (2026-11-10 대표님 요청)
 *
 * 김진이 보낸 웨비나 랜딩의 '느낌' 만 빌렸다 — 어두운 바탕에 굵은 숫자 · 마음속 질문 카드 ·
 * "이런 분께 필요합니다" 줄 목록 · STEP 카드 · 큰 신청 버튼 · 휴대폰 하단 고정 버튼. 문구 · 사진은 쓰지 않았다.
 * 상품 내용은 lib/coaching.ts (대표님 정리 문서), 가격은 50만원 · 100만원.
 */

const SITE_URL = "https://www.bookpublishingwithess.com";
const PAGE_URL = `${SITE_URL}/coaching`;
const TITLE = "1:1 책출판 코칭: 목차 기획 50만원 · 책쓰기 정규과정 100만원";
const DESC =
  "책을 쓰고 싶지만 무엇부터 시작할지 모르겠다면, 누적 890권 이상 출간한 드림위드에스 출판사의 1:1 코칭으로 주제 · 목차 · 원고 첨삭 · 출판 전략까지 함께 잡으세요.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PAGE_URL },
  openGraph: { title: TITLE, description: DESC, url: PAGE_URL, type: "website", siteName: "드림위드에스 출판사" },
};

const VOICES = [
  ["쓰고 싶은 이야기는 많은데", "무엇부터 써야 할지 모르겠다"],
  ["주제는 있는데", "목차가 잡히지 않는다"],
  ["몇 장 쓰다 멈춘 원고가", "폴더에 그대로 있다"],
  ["내 이야기가", "책이 될 만한지 모르겠다"],
];

const FOR_WHOM: [string, string][] = [
  ["책을 쓰고 싶지만 ", "주제와 목차를 못 정한 분"],
  ["쓰고 있는 원고의 ", "방향을 확인받고 싶은 분"],
  ["책으로 브랜딩하려는 ", "전문직 · CEO · 강사 · 컨설턴트"],
  ["자비 · 기획 · 독립출판 중 ", "어떻게 낼지 고민인 분"],
];

const STEPS = [
  { t: "나를 분석합니다", d: "경력 · 경험 · 전문성 · 강점에서 책의 재료를 찾습니다.", b: "내 이야기의 핵심 키워드가 보입니다" },
  { t: "주제와 목차를 세웁니다", d: "독자 · 시장 · 경쟁 도서를 보고 제목 · 콘셉트 · 목차를 잡습니다.", b: "쓸 수 있는 책의 설계도가 생깁니다" },
  { t: "원고를 다듬습니다", d: "정규과정에서는 샘플 원고를 첨삭하고 문장 · 구성 · 흐름을 고칩니다.", b: "끝까지 쓸 수 있는 집필 로드맵이 생깁니다" },
  { t: "출판과 그다음을 설계합니다", d: "출판 방식 비교, 작가 프로필, 강연 · 교육 · 사업 확장 방향까지 봅니다.", b: "책이 다음 기회의 시작이 될 수 있습니다" },
];

const DIFFS = [
  "누적 890권 이상 출판 경험",
  "출판사가 직접 진행하는 실무 중심 코칭",
  "개인의 경험과 전문성을 책으로 자산화",
  "원고가 없어도 인터뷰로 출판 가능",
  "기획부터 편집 · 디자인 · 유통까지 연결",
  "출판 이후 강연 · 교육 · 컨설팅 · 사업 확장 방향 제시",
  "전문직 · CEO · 강사 · 컨설턴트 맞춤 퍼스널브랜딩",
];

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "드림위드에스 1:1 책출판 코칭",
      serviceType: "책쓰기 · 출판 코칭",
      url: PAGE_URL,
      description: DESC,
      provider: { "@type": "Organization", name: "드림위드에스 출판사", url: SITE_URL },
      offers: COACHING.map((x) => ({ "@type": "Offer", name: x.name, price: String(x.priceNum), priceCurrency: "KRW", url: PAGE_URL })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "홈", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "1:1 책출판 코칭", item: PAGE_URL },
      ],
    },
  ],
};

function Check() {
  return <svg className={c.check} viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="11" /><path d="M7 12.5l3.2 3.2L17 9" /></svg>;
}

export default function CoachingPage() {
  return (
    <>
      <a href="#apply" className="skip-link">신청서 바로가기</a>
      <SiteHeader />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      <main className={`${h.page} ${c.root}`} id="main-content">
        {/* ── 첫 칸 ─────────────────────────────────────── */}
        <section className={c.hero}>
          <div className={c.wrap}>
            <p className={c.kicker}><span>1:1 COACHING</span>누적 890권+ 출판사가 직접 합니다</p>
            <h1>나도 <em>작가</em>가<br />될 수 있을까?</h1>
            <p className={c.lead}>책을 쓰고 싶지만 무엇부터 시작해야 할지 모르겠다면, 주제 선정부터 목차 기획 · 원고 첨삭 · 출판 전략까지 1:1로 함께합니다.</p>
            <div className={c.prices}>
              {COACHING.map((x) => (
                <a key={x.key} href={`#${x.key}`} className={c.priceChip}>
                  <span>{x.name.replace("1:1 ", "")}</span>
                  <b>{x.price}</b>
                </a>
              ))}
            </div>
            <a className={c.bigCta} href="#apply" data-track="cta_click" data-category="consult" data-label="coaching_hero_apply">
              <Check />지금 바로 상담 신청하기
            </a>
            <p className={c.sideLinks}>
              <a href={KAKAO_CHAT} target="_blank" rel="noopener noreferrer" data-track="cta_click" data-category="consult" data-label="coaching_hero_kakao">카카오톡 상담</a>
              <span aria-hidden="true">·</span>
              <a href="tel:010-2068-0817" data-track="cta_click" data-category="consult" data-label="coaching_hero_tel">전화 010-2068-0817</a>
            </p>
          </div>
        </section>

        {/* ── 마음속 질문 ───────────────────────────────── */}
        <section className={c.dark}>
          <div className={c.narrow}>
            <p className={c.script}>책 쓰기, 혹시 아직도</p>
            <h2 className={c.darkH2}><em>생각만</em> 하고 계신가요?</h2>
            <ul className={c.voices}>
              {VOICES.map(([a, b]) => <li key={b}><span aria-hidden="true">“</span><p>{a}<br /><b>{b}</b></p></li>)}
            </ul>
            <p className={c.turn}>필요한 건 완벽한 원고가 아니라</p>
            <p className={c.boxLine}>시작할 수 있는 구조입니다</p>
          </div>
        </section>

        {/* ── 이런 분께 ─────────────────────────────────── */}
        <section className={c.light}>
          <div className={c.narrow}>
            <h2 className={c.h2}>이런 분께<br />필요합니다</h2>
            <ul className={c.whom}>
              {FOR_WHOM.map(([a, b]) => <li key={b}>{a}<b>{b}</b></li>)}
            </ul>
          </div>
        </section>

        {/* ── 과정 ─────────────────────────────────────── */}
        <section className={c.programsSec}>
          <div className={c.wrap}>
            <p className={c.eyebrow}>PROGRAMS</p>
            <h2 className={c.h2}>두 가지 1:1 과정</h2>
            <p className={c.sub}>입문은 목차 기획 코칭, 원고까지 함께 가려면 정규과정을 고르세요.</p>
            <div className={c.programs}>
              {COACHING.map((x, i) => (
                <article key={x.key} id={x.key} className={`${c.program} ${i === 1 ? c.programDeep : ""}`}>
                  <header>
                    <span className={c.level}>{i === 0 ? "입문" : "심화"}</span>
                    <h3>{x.name}</h3>
                    <p className={c.programSub}>{x.sub}</p>
                    <p className={c.programPrice}>{x.price.replace("만원", "")}<small>만원</small></p>
                    <p className={c.programFor}><b>대상</b>{x.for}</p>
                  </header>
                  <h4>주요 내용</h4>
                  <ol className={c.items}>{x.items.map((t) => <li key={t}>{t}</li>)}</ol>
                  <h4>제공 결과물</h4>
                  <ul className={c.outputs}>{x.outputs.map((t) => <li key={t}>{t}</li>)}</ul>
                  {x.note && <p className={c.programNote}>※ {x.note}</p>}
                  <PickButton program={x.key} className={c.pick}>이 과정으로 신청하기 →</PickButton>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── STEP ─────────────────────────────────────── */}
        <section className={c.dark}>
          <div className={c.narrow}>
            <p className={c.script}>막연한 생각이 한 권의 책이 되기까지</p>
            <h2 className={c.darkH2}>드림위드에스 <em>1:1 코칭</em>은<br />이렇게 진행됩니다</h2>
            <ol className={c.steps}>
              {STEPS.map((x, i) => (
                <li key={x.t}>
                  <span className={c.stepNo}><small>STEP</small>{String(i + 1).padStart(2, "0")}</span>
                  <div><b className={c.stepT}>{x.t}</b><p>{x.d}</p><strong>{x.b}</strong></div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── 신청서 ───────────────────────────────────── */}
        <section className={c.apply} id="apply">
          <div className={c.wrap}>
            <div className={c.applyGrid}>
              <div>
                <p className={c.eyebrow}>APPLY</p>
                <h2 className={c.h2}>지금 내 상황에 맞는<br />과정부터 안내드립니다</h2>
                <p className={c.sub}>어느 과정이 맞는지 몰라도 괜찮습니다. 남겨주시면 통화로 먼저 상황을 듣고 안내드립니다.</p>
                <ul className={c.applyPoints}>
                  <li><Check />첫 상담은 무료입니다</li>
                  <li><Check />출판사가 직접 1:1로 진행합니다</li>
                  <li><Check />코칭 뒤 실제 출판까지 이어갈 수 있습니다</li>
                </ul>
              </div>
              <CoachForm />
            </div>
          </div>
        </section>

        {/* ── 코칭 다음 — 실제 출판 ─────────────────────── */}
        <section className={c.light}>
          <div className={c.wrap}>
            <p className={c.eyebrow}>NEXT STEP</p>
            <h2 className={c.h2}>코칭 다음은 실제 출판입니다</h2>
            <p className={c.sub}>목차와 원고가 준비되면 드림위드에스 출판사가 편집 · 디자인 · 인쇄 · 서점 유통까지 이어갑니다.</p>
            <ul className={c.production}>
              {PRODUCTION.map((x) => <li key={x.price}><b>{x.price}</b><span>{x.name}</span></li>)}
            </ul>
            <p className={c.more}><Link href="/about#pricing">출판 패키지 자세히 보기 →</Link></p>
          </div>
        </section>

        {/* ── 차별화 ───────────────────────────────────── */}
        <section className={c.dark}>
          <div className={c.wrap}>
            <div className={c.diffGrid}>
              <div className={c.ring} aria-label="누적 출간 890권 이상">
                <span><small>누적 출간</small>890<i>권+</i></span>
              </div>
              <div>
                <h2 className={c.darkH2}>드림위드에스가<br /><em>다른 점</em></h2>
                <ul className={c.diffs}>{DIFFS.map((d) => <li key={d}><Check />{d}</li>)}</ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── 마지막 ───────────────────────────────────── */}
        <section className={c.last}>
          <div className={c.narrow}>
            <p className={c.script}>당신의 인생과 전문성을</p>
            <h2 className={c.darkH2}>한 권의 <em>책</em>으로 만들어 보세요</h2>
            <p className={c.lastSub}>책 한 권이 새로운 기회의 시작이 될 수 있습니다.</p>
            <a className={c.bigCta} href="#apply" data-track="cta_click" data-category="consult" data-label="coaching_last_apply">
              <Check />지금 바로 상담 신청하기
            </a>
          </div>
        </section>

        {/* 휴대폰 하단 고정 — 카톡 · 신청 */}
        <div className={c.sticky}>
          <a className={c.stickyKakao} href={KAKAO_CHAT} target="_blank" rel="noopener noreferrer" aria-label="카카오톡 상담"
             data-track="cta_click" data-category="consult" data-label="coaching_sticky_kakao">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d={KAKAO_PATH} /></svg>
          </a>
          <a className={c.stickyApply} href="#apply" data-track="cta_click" data-category="consult" data-label="coaching_sticky_apply">코칭 상담 신청하기</a>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
