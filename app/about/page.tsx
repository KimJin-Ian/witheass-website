import type { Metadata } from "next";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import LeadForm from "./LeadForm";
import s from "./about.module.css";

/**
 * About us — 상담 신청을 받는 소개 페이지
 *
 * 설득 순서는 잘 되는 전문직 마케팅 랜딩(성공그램)과 같다.
 *   약속(히어로 + 숫자 셋) → 왜 우리인가 → 진행 과정 → 사례 → 중간 행동 유도 → FAQ → 상담 폼
 * 문구는 그 페이지 것을 가져오지 않고 우리 회사 사실로 새로 썼다.
 *
 * 숫자 · 사례는 blog-pipeline/company-guide.md · case-library.md 에 있는 것만 쓴다.
 *   실제 사례   안세훈 변호사(저자 허락, 2026-09-21) · 이서진 대표 본인 첫 책
 *   예시 사례   "예시" 라고 밝힌다. 가상 인물의 숫자는 쓰지 않는다
 */

export const metadata: Metadata = {
  title: "About us — 원고가 없어도 책이 나오는 출판사",
  description:
    "드림위드에스 출판사 소개. 인터뷰 두 번으로 원고 없이 시작해 기획 · 집필 · 편집 · 디자인 · 출간 · 마케팅까지. 누적 890권 이상 · 10년 · 종이책 인세 45% · ISBN과 저작권은 저자 명의. 무료 출판 상담 신청.",
  alternates: { canonical: "/about" },
};

const KAKAO = "http://pf.kakao.com/_QkZhd";

const WHY = [
  {
    ico: "✓",
    title: "대표가 먼저 걸은 길",
    body: "이서진 대표는 23세 음대생 때 첫 책 『꿈을 찾는 음대생』을 냈고, 그 한 권을 웹툰 · 뮤지컬 · 독립영화 · 강연 · 사업으로 넓혔습니다. 책 다음에 무엇이 오는지 직접 겪었습니다.",
  },
  {
    ico: "✎",
    title: "원고 없이 인터뷰 두 번",
    body: "글솜씨가 없어도 됩니다. 두 번의 인터뷰로 책의 뼈대를 잡고, 작가 · 기획자 · 디자이너 · 교정자가 동시에 움직여 기간을 줄입니다.",
  },
  {
    ico: "©",
    title: "ISBN · 저작권은 저자 이름으로",
    body: "ISBN과 저작권을 전부 저자 본인 명의로 등록합니다. 종이책 인세는 정가의 45%, 전자책은 20%입니다.",
  },
  {
    ico: "↗",
    title: "출간에서 끝나지 않습니다",
    body: "출간 뒤 마케팅 · 강연 · 사업 확장까지 이어갑니다. 표절 · 저작권 · 초상권은 전담팀이 출간 전에 먼저 검수합니다.",
  },
];

const STEPS = [
  { title: "상담 신청", body: "아래 폼에 남겨주시면 연락드립니다. 무엇을 쓸지 정하지 않으셨어도 괜찮습니다.", tag: "첫 상담 무료" },
  { title: "사전 미팅 · 주제 설정", body: "매번 사람들에게 하시는 이야기가 무엇인지부터 여쭙니다. 막연한 생각을 목차로 구체화합니다.", tag: "목차 디벨롭" },
  { title: "인터뷰 2회", body: "원고를 쓰지 않으셔도 됩니다. 말씀하신 내용으로 책의 뼈대를 만듭니다.", tag: "원고 0장부터" },
  { title: "초고 · 저자 확인", body: "인터뷰 후 약 4주면 1차 원고가 나옵니다. 읽어보시고 두 번까지 고칩니다.", tag: "원고 수정 2회" },
  { title: "표지 · 편집 · 교정", body: "표지 시안 두 개를 드리고 두 번까지 고칩니다. 교정과 디자인은 동시에 진행합니다.", tag: "표지 시안 2개" },
  { title: "출간 · 유통 · 마케팅", body: "전국 온 · 오프라인 서점과 전자책(밀리의서재 · 교보 · 예스24 · 리디)에 올리고, 출간 뒤 마케팅까지 함께합니다.", tag: "유통 기본 2년" },
];

const EXAMPLES = [
  {
    who: "정형외과 원장",
    first: "“환자한테 하는 설명은 많은데, 그게 책이 되나요?”",
    toc: "왜 무릎은 50대에 아픈가 · 수술 전에 해볼 것 · 수술이 필요한 신호 · 수술 후 6개월",
    title: "《원장님, 저 수술해야 하나요?》",
    use: "진료 전에 읽고 오는 설명서 · 강연 교재",
  },
  {
    who: "20년차 제조업 대표",
    first: "“직원들한테 매번 같은 얘기를 하는데, 그게 안 남아요.”",
    toc: "망할 뻔한 순간들 · 사람을 뽑는 기준 · 거래처가 떠나지 않는 이유 · 다음 대표에게",
    title: "《대표가 매번 하던 말》",
    use: "신입 교육 · 승계 준비 · 거래처 선물",
  },
  {
    who: "부모님 자서전 (자녀가 의뢰)",
    first: "“아버지 이야기를 남기고 싶은데, 아버지가 글을 안 쓰세요.”",
    toc: "내가 자란 동네 · 첫 직장 · 가장 힘들었던 해 · 손주들에게",
    title: "《아버지가 걸어온 길》",
    use: "칠순 · 팔순 가족 선물, 대대로 남는 기록",
  },
];

const FAQ = [
  {
    q: "원고가 하나도 없는데 가능한가요?",
    a: "네. 대부분 원고 없이 시작하십니다. 두 번의 인터뷰로 책의 뼈대를 만들고, 작가가 말씀하신 내용을 원고로 옮깁니다. 글솜씨는 필요 없습니다.",
  },
  {
    q: "비용은 얼마인가요?",
    a: "단순 제작은 200만원부터, 원고가 있으시면 기획 · 교정 · 인쇄 · 유통을 포함한 완성도 패키지가 600만원, 인터뷰부터 집필 · 디자인 · 인쇄 · 유통까지 전 과정을 맡기시는 올인원 패키지가 900만원입니다. 강연회까지 포함한 마케팅 풀패키지는 2,000만원입니다. 정확한 견적은 상담에서 원고 상태를 보고 안내드립니다.",
  },
  {
    q: "기간은 얼마나 걸리나요?",
    a: "인터뷰가 끝나고 약 4주면 1차 원고가 나옵니다. 전체 제작은 원고를 받은 날로부터 50~70일 정도입니다. 교정과 표지 디자인을 동시에 진행해서 기간을 줄입니다.",
  },
  {
    q: "저작권과 ISBN은 누구 명의인가요?",
    a: "전부 저자 본인 명의입니다. ISBN은 국립중앙도서관 서지정보유통지원시스템에 저자 이름으로 등록되고, 저작권도 저자에게 있습니다. 종이책 인세는 정가의 45%, 전자책은 20%이며 판매 다음 달 중순~말에 정산합니다.",
  },
  {
    q: "우리와 맞지 않는 경우도 있나요?",
    a: "있습니다. 원고가 이미 완성돼 있고 완성도가 높다면 기획출판을 먼저 시도해보시는 편이 나을 수 있습니다. 지인 배포용으로 소량만 필요하시다면 교정과 표지만 따로 맡기는 편이 비용이 적게 듭니다. 상담에서 솔직하게 말씀드립니다.",
  },
];

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className={s.page}>
        {/* ── 히어로 — 약속 한 줄 + 숫자 셋 ───────────────────── */}
        <section className={s.hero}>
          <div className={s.wrap}>
            <span className={s.pill}><i aria-hidden="true" />원고가 없어도 책이 나오는 출판사</span>
            <h1 className={s.h1}>
              <span className={s.accent}>내 이름으로 된 책,</span>
              <br />
              인터뷰 두 번이면
              <br />
              시작됩니다
            </h1>
            <p className={s.lead}>
              전문직 · 대표 · 강사 · 은퇴를 앞둔 분들을 위한 책 출판.
              <br />
              기획 · 인터뷰 · 집필 · 편집 · 디자인 · 출간 · 마케팅까지
            </p>
            <p className={s.leadStrong}>
              <strong>드림위드에스 출판사가 한 번에 맡아,</strong>
              <br />
              <strong>검색되고 서점에 깔리는 책</strong>으로 만들어드립니다.
            </p>
            <div className={s.ctaRow}>
              <a href="#apply" className={s.btnPrimary} data-track="cta_click" data-category="about" data-label="about_hero_apply">
                무료 출판 상담 신청하기
              </a>
              <a href="#cases" className={s.btnGhost} data-track="cta_click" data-category="about" data-label="about_hero_cases">
                출간 사례 먼저 보기
              </a>
            </div>
            <dl className={s.stats}>
              <div><dt>890권+</dt><dd>누적 출간</dd></div>
              <div><dt>10년+</dt><dd>출판 운영</dd></div>
              <div><dt>45%</dt><dd>종이책 인세</dd></div>
            </dl>
          </div>
        </section>

        {/* ── 왜 우리인가 ─────────────────────────────────────── */}
        <section className={`${s.section} ${s.tinted}`} id="why">
          <div className={s.wrap}>
            <p className={s.eyebrow}>WHY 드림위드에스</p>
            <h2 className={s.h2}>드림위드에스는 뭐가 다른가요?</h2>
            <p className={s.sub}>책을 먼저 내본 사람이, 원고가 없는 분도 끝까지 책임지고 서점까지 모셔갑니다.</p>
            <div className={s.whyGrid}>
              {WHY.map((w) => (
                <article key={w.title} className={s.whyCard}>
                  <span className={s.whyIco} aria-hidden="true">{w.ico}</span>
                  <h3>{w.title}</h3>
                  <p>{w.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── 진행 과정 ───────────────────────────────────────── */}
        <section className={s.section} id="process">
          <div className={s.wrap}>
            <p className={s.eyebrow}>PROCESS</p>
            <h2 className={s.h2}>진행 과정</h2>
            <p className={s.sub}>원고 0장에서 서점까지, 여섯 단계로 갑니다.</p>
            <ol className={s.steps}>
              {STEPS.map((st, i) => (
                <li key={st.title} className={s.step}>
                  <span className={s.stepNo}>STEP {String(i + 1).padStart(2, "0")}</span>
                  <h3>{st.title}</h3>
                  <p>{st.body}</p>
                  <span className={s.tag}>{st.tag}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── 사례 ────────────────────────────────────────────── */}
        <section className={`${s.section} ${s.tinted}`} id="cases">
          <div className={s.wrap}>
            <p className={s.eyebrow}>CASES</p>
            <h2 className={s.h2}>책으로 증명된 사례</h2>
            <p className={s.sub}>실제 저자의 이야기와, 이런 분이 오시면 어떻게 진행되는지 보여드립니다.</p>

            <div className={s.realGrid}>
              <article className={s.realCard}>
                <span className={s.chip}>실제 사례 · 변호사</span>
                <p className={s.realBig}>
                  변호사가 쓴 책이
                  <br />
                  <em>자기계발 베스트셀러</em>가 됐습니다
                </p>
                <p className={s.realBody}>
                  《이기적 남자》 — 법률서가 아니라, 변호사가 사람들에게 매번 하던 이야기를 책으로 옮겼습니다.
                  출간부터 베스트셀러 마케팅 · 저자 브랜딩까지 함께했습니다.
                </p>
                <ul className={s.realFacts}>
                  <li><b>분야</b>자기계발 베스트셀러</li>
                  <li><b>함께한 일</b>출간 · 마케팅 · 저자 브랜딩</li>
                </ul>
              </article>
              <article className={s.realCard}>
                <span className={s.chip}>대표의 첫 책</span>
                <p className={s.realBig}>
                  23세 음대생의 책 한 권이
                  <br />
                  <em>웹툰 · 뮤지컬 · 사업</em>이 됐습니다
                </p>
                <p className={s.realBody}>
                  이서진 대표는 음대생 시절 『꿈을 찾는 음대생』을 냈고, 베스트셀러가 됐습니다.
                  그 한 권을 웹툰 · 뮤지컬 · 독립영화 · 영문판 · 강연 · 사업으로 직접 넓혔습니다.
                </p>
                <ul className={s.realFacts}>
                  <li><b>첫 책</b>『꿈을 찾는 음대생』</li>
                  <li><b>이어진 일</b>웹툰 · 뮤지컬 · 강연 · 사업</li>
                </ul>
              </article>
            </div>

            <h3 className={s.exHead}>이런 분이 오시면 — 처음 한 말에서 책까지</h3>
            <div className={s.exGrid}>
              {EXAMPLES.map((e) => (
                <article key={e.who} className={s.exCard}>
                  <span className={s.exChip}>예시 · {e.who}</span>
                  <p className={s.exFirst}>{e.first}</p>
                  <dl className={s.exFlow}>
                    <div><dt>인터뷰 두 번 뒤 목차</dt><dd>{e.toc}</dd></div>
                    <div><dt>제목 후보</dt><dd>{e.title}</dd></div>
                    <div><dt>책이 하는 일</dt><dd>{e.use}</dd></div>
                  </dl>
                </article>
              ))}
            </div>
            <p className={s.note}>※ 예시 사례는 저희가 실제로 일하는 순서를 보여드리려고 구성한 것입니다. 실제 고객이 아닙니다.</p>

            {/* 중간 행동 유도 */}
            <a href="#apply" className={s.midCta} data-track="cta_click" data-category="about" data-label="about_mid_apply">
              <span>
                <strong>다음 책은 대표님 차례입니다</strong>
                <span>무료 상담에서 내 분야로 어떤 책이 나올 수 있는지 함께 짚어드립니다.</span>
              </span>
              <span className={s.midBtn}>무료 상담 신청 →</span>
            </a>
          </div>
        </section>

        {/* ── FAQ ─────────────────────────────────────────────── */}
        <section className={s.section} id="faq">
          <div className={s.wrapNarrow}>
            <p className={s.eyebrow}>FAQ</p>
            <h2 className={s.h2}>자주 묻는 질문</h2>
            <div className={s.faqList}>
              {FAQ.map((f) => (
                <details key={f.q} className={s.faq}>
                  <summary>{f.q}<span aria-hidden="true">+</span></summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── 상담 신청 ───────────────────────────────────────── */}
        <section className={s.apply} id="apply">
          <div className={s.applyWrap}>
            <div className={s.applyText}>
              <h2>
                내 이름으로 된 책,
                <br />
                시작할 준비가 되셨나요?
              </h2>
              <p>
                첫 상담은 무료입니다. 원고가 없어도, 무엇을 쓸지 아직 정하지 않았어도 괜찮습니다.
                남겨주시면 편하신 시간에 연락드립니다.
              </p>
              <ul>
                <li>전화 <a href="tel:01020680817">010-2068-0817</a></li>
                <li>카카오톡 <a href={KAKAO} target="_blank" rel="noopener noreferrer">드림위드에스 채널</a></li>
              </ul>
            </div>
            <LeadForm />
          </div>
        </section>

      {/* 오른쪽 아래 고정 버튼 — main 안에 둔다 (색 변수가 .page 에 있다) */}
      <div className={s.float}>
        <a href="#apply" className={s.floatApply} data-track="cta_click" data-category="about" data-label="about_float_apply">
          상담신청 바로 남기기
        </a>
        <a href={KAKAO} target="_blank" rel="noopener noreferrer" className={s.floatKakao}
           data-track="cta_click" data-category="about" data-label="about_float_kakao">
          카카오톡 문의
        </a>
      </div>
      </main>
      <SiteFooter />
      {/* 휴대폰에서 고정 버튼이 푸터 끝을 가리지 않게 */}
      <div className={s.floatSpacer} aria-hidden="true" />
    </>
  );
}
