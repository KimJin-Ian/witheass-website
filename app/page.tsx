"use client";

import SiteHeader from "./components/SiteHeader";
import Faq from "./components/Faq";
import DynamicSections from "./components/DynamicSections";
import SiteFooter from "./components/SiteFooter";
import EditMode from "./components/EditMode";
import IntroVideoPopup from "./components/IntroVideoPopup";
import { useLang } from "./components/LangContext";

export default function Home() {
  const { t } = useLang();
  return (
    <>
      {/* 비주얼 에디터 모드 (?edit=1 시에만 활성화, 일반 방문자에겐 영향 없음) */}
      <EditMode />

      {/* 인트로 영상 팝업 (방문 시 풀스크린 → 작게 → 드래그 가능) */}
      <IntroVideoPopup />

      <a href="#main-content" className="skip-link">본문 바로가기</a>
      <SiteHeader />

      <main id="main-content">
      {/* HERO */}
      <section className="hero" id="top" data-edit-key="hero">
        <div className="container hero-inner">
          <div className="hero-eyebrow">{t("hero.eyebrow")}</div>
          <h1>
            {t("hero.title1")}<br />
            {t("hero.title2")} <em>{t("hero.titleEm")}</em>
          </h1>
          <div className="hero-rule"></div>
          <p className="hero-sub">
            {t("hero.sub1")}<br />
            {t("hero.sub2")}
          </p>
          <div className="hero-cta">
            <a href="#contact" className="cta-btn gold"
              data-track="cta_click" data-category="navigation" data-label="hero_contact">
              {t("hero.cta.contact")}
            </a>
            <a href="#pricing" className="cta-btn outline"
              data-track="cta_click" data-category="navigation" data-label="hero_pricing">
              {t("hero.cta.pricing")}
            </a>
          </div>
          <div className="hero-stats">
            <div className="hero-stat"><div className="num">{t("hero.stat.running.num")}</div><div className="lbl">{t("hero.stat.running.lbl")}</div></div>
            <div className="hero-stat"><div className="num">{t("hero.stat.published.num")}</div><div className="lbl">{t("hero.stat.published.lbl")}</div></div>
            <div className="hero-stat"><div className="num">{t("hero.stat.royalty.num")}</div><div className="lbl">{t("hero.stat.royalty.lbl")}</div></div>
            <div className="hero-stat"><div className="num">{t("hero.stat.time.num")}</div><div className="lbl">{t("hero.stat.time.lbl")}</div></div>
          </div>
          <div className="hero-extra">✓ {t("hero.extra")}</div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" data-edit-key="about">
        <div className="container">
          <div className="about-text" style={{ maxWidth: 820 }}>
            <div className="section-eyebrow">{t("about.eyebrow")}</div>
            <h2 className="section-title">{t("about.title1")}<br />{t("about.title2")}</h2>
            <div className="section-rule"></div>
            <div className="quote">
              {t("about.quote1")}<br />
              <strong>{t("about.quote2")}</strong>
            </div>
            <p>{t("about.p1")}</p>
            <p>{t("about.p2")}</p>
            <p>{t("about.p3")}</p>
          </div>
        </div>
      </section>

      {/* DIFFERENTIATORS */}
      <section id="brand" className="alt" data-edit-key="brand">
        <div className="container">
          <div className="section-eyebrow">{t("brand.eyebrow")}</div>
          <h2 className="section-title">{t("brand.title")}</h2>
          <div className="section-rule"></div>
          <p className="section-lead">{t("brand.lead")}</p>

          <div className="diff-grid">
            <div className="diff-card">
              <div className="num">01</div>
              <h3>{t("brand.c1.title")}</h3>
              <p>{t("brand.c1.desc")}</p>
            </div>
            <div className="diff-card">
              <div className="num">02</div>
              <h3>{t("brand.c2.title")}</h3>
              <p>{t("brand.c2.desc")}</p>
            </div>
            <div className="diff-card">
              <div className="num">03</div>
              <h3>{t("brand.c3.title")}</h3>
              <p style={{ color: "var(--navy-900)", fontWeight: 700 }}>{t("brand.c3.desc")}</p>
            </div>
            <div className="diff-card">
              <div className="num">04</div>
              <h3>{t("brand.c4.title")}</h3>
              <p>{t("brand.c4.desc")}</p>
            </div>
            <div className="diff-card">
              <div className="num">05</div>
              <h3>{t("brand.c5.title")}</h3>
              <p>{t("brand.c5.desc")}</p>
            </div>
            <div className="diff-card">
              <div className="num">06</div>
              <h3>{t("brand.c6.title")}</h3>
              <p>{t("brand.c6.desc")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* THESIS */}
      <section id="thesis" data-edit-key="thesis">
        <div className="container">
          <div className="about-grid">
            <div className="about-text">
              <div className="section-eyebrow">{t("thesis.eyebrow")}</div>
              <h2 className="section-title">{t("thesis.title1")}<br />{t("thesis.title2")}</h2>
              <div className="section-rule"></div>
              <p style={{ fontSize: 16, lineHeight: 1.85 }}>{t("thesis.p1")}</p>
              <p style={{ fontSize: 16, lineHeight: 1.85, marginBottom: 24 }}>{t("thesis.p2")}</p>
              <div className="diff-card" style={{ background: "var(--gold-50)", borderColor: "var(--gold-100)", padding: 24, marginTop: 8 }}>
                <h3 style={{ fontSize: 16 }}>{t("thesis.unique.title")}</h3>
                <p>{t("thesis.unique.desc")}</p>
              </div>
            </div>

            <div style={{ display: "grid", gap: 16 }}>
              <div className="diff-card"><h3>{t("thesis.f1.title")}</h3><p>{t("thesis.f1.desc")}</p></div>
              <div className="diff-card"><h3>{t("thesis.f2.title")}</h3><p>{t("thesis.f2.desc")}</p></div>
              <div className="diff-card"><h3>{t("thesis.f3.title")}</h3><p>{t("thesis.f3.desc")}</p></div>
              <div className="diff-card"><h3>{t("thesis.f4.title")}</h3><p>{t("thesis.f4.desc")}</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" data-edit-key="pricing">
        <div className="container">
          <div className="section-eyebrow">{t("pricing.eyebrow")}</div>
          <h2 className="section-title">{t("pricing.title")}</h2>
          <div className="section-rule"></div>
          <p className="section-lead">{t("pricing.lead")}</p>

          <div className="pricing-grid two">
            <div className="price-card featured">
              <div className="tag">{t("pricing.p4.tag")}</div>
              <div className="cat">{t("pricing.p4.cat")}</div>
              <h3>{t("pricing.p4.title1")}<br />{t("pricing.p4.title2")}</h3>
              <div className="price">{t("pricing.p4.price")}<small>{t("pricing.p4.priceSuffix")}</small></div>
              <p style={{ fontSize: 12.5, color: "rgba(255,255,255,0.75)", marginTop: -8, marginBottom: 12, lineHeight: 1.5 }}>
                {t("pricing.p4.note")}
              </p>
              <ul>
                <li>{t("pricing.p4.l1")}</li>
                <li>{t("pricing.p4.l2")}</li>
                <li>{t("pricing.p4.l3")}</li>
                <li>{t("pricing.p4.l4")}</li>
                <li>{t("pricing.p4.l5")}</li>
                <li>{t("pricing.p4.l6")}</li>
                <li>{t("pricing.p4.l7")}</li>
              </ul>
              <a href="#fullpkg" className="cta-btn gold" style={{ marginTop: "auto" }}>{t("pricing.p4.cta")}</a>
            </div>

            <div className="price-card">
              <div className="cat">{t("pricing.p3.cat")}</div>
              <h3>{t("pricing.p3.title")}</h3>
              <div className="price">{t("pricing.p3.price")}<small>{t("pricing.p3.priceSuffix")}</small></div>
              <p style={{ fontSize: 12.5, color: "var(--text-500)", marginTop: -8, marginBottom: 12, lineHeight: 1.5 }}>
                {t("pricing.p3.note")}
              </p>
              <ul>
                <li>{t("pricing.p3.l1")}</li>
                <li>{t("pricing.p3.l2")}</li>
                <li>{t("pricing.p3.l3")}</li>
                <li>{t("pricing.p3.l4")}</li>
                <li>{t("pricing.p3.l5")}</li>
                <li>{t("pricing.p3.l6")}</li>
                <li>{t("pricing.p3.l7")}</li>
              </ul>
            </div>
          </div>

          <div className="pricing-note">
            <div style={{ fontSize: 22 }}>💡</div>
            <p>{t("pricing.note")}</p>
          </div>
        </div>
      </section>

      {/* FULL 패키지 상세 — 전문직·CEO·정치인 전용 */}
      <section id="fullpkg" className="fullpkg" data-edit-key="fullpkg">
        <div className="container" style={{ textAlign: "center" }}>
          <span className="fullpkg-tag">전문직 · CEO · 정치인 전용</span>
          <h2 className="section-title">책출판 &amp; 퍼스널브랜딩 통합 마케팅</h2>
          <p className="fullpkg-lead">책을 내는 목적이 <strong>검색 시 나오는 공신력과 브랜드</strong>라면, 책만 내는 것으로는 의미가 없습니다. 출간 소식이 알려지면 지인·고객·거래처·동료가 한 번쯤 저자 이름을 검색합니다 — 바로 그 시점에 정보와 콘텐츠가 준비돼 있어야 전문성과 공신력이 형성됩니다.</p>
          <ul className="fullpkg-points">
            <li><b>검색의 순간이 핵심</b> — 출간 직후가 가장 관심이 집중되는 시기. “나중에 천천히”는 그 골든타임을 놓칩니다.</li>
            <li><b>단순 업로드가 아닌, 납득되는 리뷰</b> — 모든 플랫폼에 자연스러운 후기·콘텐츠가 검색되어야 합니다.</li>
            <li><b>통합으로 맡겨야 하는 이유</b> — 책은 저자 개인의 이미지·전문성과 직결됩니다. 처음부터 함께 기획해 이해도 높은 드림위드에스에 통합으로.</li>
            <li><b>평생 남는 이미지</b> — 금액보다 처음부터 제대로가 중요합니다.</li>
          </ul>
          <p className="fullpkg-quote">“단순 마케팅 대행이 아니라, 개인을 전문 브랜딩하고<br />책을 처음부터 함께 기획하는 통합 파트너.”</p>

          <details className="mk-acc">
            <summary>📦 통합 퍼스널 브랜딩 마케팅 패키지 — 전체 항목 보기</summary>
            <div className="mk-body">
              <div className="mk-sec">
                <h4>1. 저자 인터뷰 영상 콘텐츠 제작 및 배포</h4>
                <div className="mk-sub">인터뷰 제작</div>
                <ul><li>전문 사회자 진행 인터뷰 촬영</li><li>10분 이내 편집 영상 1편 + 쇼츠 2편 + 풀버전</li></ul>
                <div className="mk-sub">대형 채널 · 멀티 배포</div>
                <ul><li>월 1,000만 뷰+ 협업 유튜브 채널 업로드</li><li>유튜브·틱톡·인스타·페북·네이버TV·스레드 동시 배포</li><li>영상 내/설명란 도서 구매 링크 삽입 · 하루 2~3개 지속 업로드</li></ul>
              </div>
              <div className="mk-sec">
                <h4>2. 블로그 마케팅 및 검색 노출</h4>
                <ul><li>블로그 포스팅 10건 제작·배포</li><li>저자명·전문분야·도서 키워드 SEO 검색 노출</li><li>전문성·경험·사례 중심 후기형 콘텐츠 운영</li></ul>
              </div>
              <div className="mk-sec">
                <h4>3. SNS 콘텐츠 제작</h4>
                <ul><li>인스타 카드뉴스 10장 1세트</li><li>인플루언서 리뷰형 콘텐츠</li><li>유튜브 롱폼 1편 + 쇼츠 2편 (별도 촬영) · MC 단독 인터뷰</li></ul>
              </div>
              <div className="mk-sec">
                <h4>4. 언론홍보(PR)</h4>
                <ul><li>언론 기사 2건+ 배포 · 포털 검색 브랜딩</li><li>저자 소개/전문분야 인터뷰/출간 기사로 신뢰도 확보</li></ul>
              </div>
              <div className="mk-sec">
                <h4>5. 리뷰 및 바이럴 마케팅</h4>
                <ul><li>리뷰단 모집·운영</li><li>블로그·카페·SNS 후기 기반 바이럴</li><li>독자·경험·전문성 리뷰 등 다양한 콘텐츠 생성</li></ul>
              </div>
              <div className="mk-sec">
                <h4>6. 웹툰형 콘텐츠 제작</h4>
                <ul><li>10컷+ 웹툰형 콘텐츠 — 책 내용을 스토리텔링으로 전달</li></ul>
              </div>
              <div className="mk-sec">
                <h4>7. 강연·클래스·컨설팅 연계 전략</h4>
                <ul><li>강연·클래스 상품화 / 컨설팅 상품 연결 전략 설계</li><li>책 판매 이후 추가 수익 모델 구축</li></ul>
              </div>
              <div className="mk-sec">
                <h4>8. 퍼스널 브랜딩 로드맵 제공</h4>
                <ul><li>저자 포지셔닝·전문가 브랜드·검색/SNS 브랜딩 방향 설정</li><li>강연·클래스·컨설팅·전문가 활동으로 연결되는 장기 성장 로드맵</li></ul>
              </div>
              <div className="mk-extra"><b>추가 진행 가능(별도 비용)</b> — 대형 서점 광고 · 지하철 광고 · 오프라인 홍보물 제작/운영</div>
              <div className="mk-sub" style={{ textAlign: "center", marginTop: 22 }}>기대 효과</div>
              <div className="mk-effect">
                <span>도서 인지도 ↑</span><span>저자 브랜드 구축</span><span>검색 노출 확대</span><span>SNS 영향력 ↑</span><span>언론 노출 확보</span><span>후기·바이럴 확산</span><span>강연·클래스 기회</span><span>컨설팅·사업 확장</span>
              </div>
            </div>
          </details>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="alt" data-edit-key="process">
        <div className="container">
          <div className="section-eyebrow">{t("process.eyebrow")}</div>
          <h2 className="section-title">{t("process.title")}</h2>
          <div className="section-rule"></div>
          <p className="section-lead">{t("process.lead")}</p>

          <div className="process-grid">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <div key={n} className="process-step">
                <div className="step-num">STEP {String(n).padStart(2, "0")}</div>
                <h4>{t(`process.s${n}.title`)}</h4>
                <p>{t(`process.s${n}.desc`)}</p>
              </div>
            ))}
          </div>

          <h3 style={{ fontSize: 18, color: "var(--navy-900)", marginBottom: 20, textAlign: "center" }}>{t("process.tracks.title")}</h3>
          <div className="tracks-grid">
            {[1, 2, 3].map((n) => (
              <div key={n} className="track-card">
                <h4>{t(`process.t${n}.title`)}</h4>
                <ol>
                  <li>{t(`process.t${n}.l1`)}</li>
                  <li>{t(`process.t${n}.l2`)}</li>
                  <li>{t(`process.t${n}.l3`)}</li>
                  <li>{t(`process.t${n}.l4`)}</li>
                </ol>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CASE STUDY */}
      <section id="case" data-edit-key="case">
        <div className="container">
          <div className="section-eyebrow">{t("case.eyebrow")}</div>
          <h2 className="section-title">{t("case.title1")}<br />{t("case.title2")}</h2>
          <div className="section-rule"></div>

          <div className="case-hero">
            <div>
              <div className="case-meta">{t("case.meta")}</div>
              <h3>{t("case.heading1")}<br />{t("case.heading2")}</h3>
              <p style={{ marginTop: 32 }}>
                <strong style={{ color: "var(--gold-500)" }}>{t("case.r1.title")}</strong><br />
                {t("case.r1.desc")}
              </p>
              <p>
                <strong style={{ color: "var(--gold-500)" }}>{t("case.r2.title")}</strong><br />
                {t("case.r2.desc")}
              </p>
              <p>
                <strong style={{ color: "var(--gold-500)" }}>{t("case.r3.title")}</strong><br />
                {t("case.r3.desc")}
              </p>
            </div>

            <div className="case-result">
              <div className="label">RESULT</div>
              <div className="before-after">
                <div className="ba-item muted"><div className="val">{t("case.beforeVal")}</div><div className="desc">{t("case.before")}<br />{t("case.beforeDesc")}</div></div>
                <div className="arrow">→</div>
                <div className="ba-item gold"><div className="val">{t("case.afterVal")}</div><div className="desc">{t("case.after")}<br />{t("case.afterDesc")}</div></div>
              </div>
              <blockquote>{t("case.quote")}</blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* PROMO — 더컬쳐앤 무료 강연회 대행 프로모션 */}
      <section id="promo" className="promo-section" data-edit-key="promo">
        <div className="container">
          <div className="section-eyebrow">{t("promo.eyebrow")}</div>
          <h2 className="section-title">
            {t("promo.title1")}<br />
            {t("promo.title2")}<em>{t("promo.titleEm")}</em>{t("promo.title3")}
          </h2>
          <div className="section-rule"></div>
          <p className="section-lead">{t("promo.lead1")}<br />{t("promo.lead2")}</p>

          {/* 가격 배너 */}
          <div className="promo-banner">
            <div className="promo-banner-name">
              <span className="promo-free-pill">{t("promo.freePill")}</span>
              <h3>{t("promo.name1")}<br />{t("promo.name2")}</h3>
            </div>
            <div className="promo-banner-price">
              <span className="promo-was">{t("promo.was")}</span>
              <span className="promo-arrow">→</span>
              <span className="promo-now">{t("promo.now")}<small>{t("promo.nowUnit")}</small></span>
            </div>
          </div>

          {/* 포함 서비스 10가지 */}
          <ul className="promo-checks">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
              <li key={n}>{t(`promo.c${n}`)}</li>
            ))}
          </ul>

          {/* 오프라인 신뢰 / 온라인 확산 */}
          <div className="promo-duo">
            <div className="promo-value-card">
              <div className="promo-vc-label">{t("promo.off.label")}</div>
              <h4>{t("promo.off.title")}</h4>
              <p>{t("promo.off.desc")}</p>
            </div>
            <div className="promo-value-card">
              <div className="promo-vc-label">{t("promo.on.label")}</div>
              <h4>{t("promo.on.title")}</h4>
              <p>{t("promo.on.desc")}</p>
            </div>
          </div>

          {/* 기회 연결 체인 */}
          <div className="promo-chain">
            <p className="promo-chain-lead">{t("promo.chainLead")}</p>
            <div className="promo-pills">
              {[1, 2, 3, 4, 5].map((n) => (
                <span key={n}>{t(`promo.chain${n}`)}</span>
              ))}
            </div>
          </div>

          <p className="promo-quote">
            {t("promo.quote1")}<br />
            <strong>{t("promo.quote2")}</strong>{t("promo.quote3")}
          </p>

          <div className="promo-cta-row">
            <div className="promo-btns">
              <a href="#contact" className="cta-btn gold"
                data-track="cta_click" data-category="promotion" data-label="promo_contact">
                {t("promo.cta1")}
              </a>
              <a href="http://pf.kakao.com/_QkZhd" target="_blank" rel="noopener noreferrer"
                className="cta-btn promo-ghost"
                data-track="cta_click" data-category="promotion" data-label="promo_kakao">
                {t("promo.cta2")}
              </a>
            </div>
            <p className="promo-fine">{t("promo.fine")}</p>
          </div>
        </div>
      </section>

      {/* SERVICE */}
      <section id="service" className="alt" data-edit-key="service">
        <div className="container">
          <div className="section-eyebrow">{t("service.eyebrow")}</div>
          <h2 className="section-title">{t("service.title")}</h2>
          <div className="section-rule"></div>
          <p className="section-lead">{t("service.lead")}</p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="diff-card">
                <h3>{t(`service.s${n}.title`)}</h3>
                <p>{t(`service.s${n}.desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMMUNITY */}
      <section className="dark" id="community" data-edit-key="community">
        <div className="container">
          <div className="section-eyebrow">{t("community.eyebrow")}</div>
          <h2 className="section-title">{t("community.title1")}<br />{t("community.title2")}</h2>
          <div className="section-rule"></div>
          <p className="section-lead">{t("community.lead")}</p>

          <div className="community-grid">
            <div className="community-list">
              <h4>{t("community.list1.title")}</h4>
              <ul>
                <li>{t("community.list1.l1")}</li>
                <li>{t("community.list1.l2")}</li>
                <li>{t("community.list1.l3")}</li>
                <li>{t("community.list1.l4")}</li>
                <li>{t("community.list1.l5")}</li>
                <li>{t("community.list1.l6")}</li>
                <li>{t("community.list1.l7")}</li>
                <li>{t("community.list1.l8")}</li>
                <li>{t("community.list1.l9")}</li>
              </ul>
            </div>
            <div className="community-list">
              <h4>{t("community.list2.title")}</h4>
              <ul>
                <li>{t("community.list2.l1")}</li>
                <li>{t("community.list2.l2")}</li>
                <li>{t("community.list2.l3")}</li>
                <li>{t("community.list2.l4")}</li>
                <li>{t("community.list2.l5")}</li>
                <li>{t("community.list2.l6")}</li>
                <li>{t("community.list2.l7")}</li>
                <li>{t("community.list2.l8")}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" data-edit-key="portfolio">
        <div className="container">
          <div className="section-eyebrow">{t("portfolio.eyebrow")}</div>
          <h2 className="section-title">{t("portfolio.title")}</h2>
          <div className="section-rule"></div>
          <p className="section-lead">
            {t("portfolio.lead")}{" "}
            <em style={{ color: "var(--text-500)" }}>{t("portfolio.copyright")}</em>
          </p>
          <div
            style={{
              textAlign: "center",
              padding: "32px 28px",
              background: "linear-gradient(135deg, var(--gold-50) 0%, var(--white) 60%)",
              border: "2px solid var(--gold-600)",
              borderRadius: "16px",
              maxWidth: 860,
              margin: "0 auto 40px",
              boxShadow: "0 10px 30px rgba(196, 166, 97, 0.18)",
            }}
          >
            <p
              style={{
                fontSize: 18,
                color: "var(--navy-900)",
                marginBottom: 18,
                fontWeight: 600,
                lineHeight: 1.5,
              }}
            >
              {t("portfolio.naverHint")}
            </p>
            <a
              href="https://search.shopping.naver.com/book/search?bookTabType=ALL&pageSize=40&query=%EB%93%9C%EB%A6%BC%EC%9C%84%EB%93%9C%EC%97%90%EC%8A%A4&sort=REL"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-btn gold"
              style={{
                fontSize: 17,
                padding: "16px 38px",
                fontWeight: 700,
                letterSpacing: "0.02em",
              }}
            >
              {t("portfolio.naverCta")}
            </a>
          </div>

          <p className="belt-hint">누적 890명 · 끊임없이 출간 중</p>
          <div className="portfolio-belt">
            <div className="belt-track">
              {(() => {
                const covers = [
                  "lee-moonho.jpg", "ball-boy.jpg", "seocho-kim.jpg", "yoon-park.jpg",
                  "park-service.jpg", "dream-everyday.jpg", "esg-kim.jpg", "k-beauty.jpg",
                  "livecommerce.jpg", "startup-exit.jpg", "knee-life.jpg", "anti-aging.jpg",
                  "leader-talk.jpg", "hope-evidence.jpg", "k-man-report.jpg", "culturen-4th.jpg",
                ];
                return [...covers, ...covers].map((img, i) => {
                  const n = (i % covers.length) + 1;
                  const cat = t(`portfolio.b${n}.cat`);
                  const title = t(`portfolio.b${n}.title`);
                  return (
                    <div key={i} className="portfolio-card" aria-hidden={i >= covers.length || undefined}>
                      <div className="cover">
                        <img
                          src={`/covers/${img}`}
                          alt={`드림위드에스 출판 사례 — ${title} (${cat})`}
                          title={title}
                          loading="lazy"
                          width={720}
                          height={960}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      </div>
                      <div className="info">
                        <div className="cat-tag">{cat}</div>
                        <h4>{title}</h4>
                      </div>
                    </div>
                  );
                });
              })()}
            </div>
          </div>
        </div>
      </section>

      {/* TEAM — 출판팀 전문 작가진 (6명) */}
      <section id="team" data-edit-key="team" className="alt">
        <div className="container">
          <div className="section-eyebrow">{t("team.eyebrow")}</div>
          <h2 className="section-title">{t("team.title1")} <em>{t("team.titleEm")}</em></h2>
          <div className="section-rule"></div>
          <p className="section-lead">{t("team.lead")}</p>

          <div className="team-compact">
            <p style={{ fontSize: 15.5, color: "var(--text-700)" }}>저자가 혼자 책을 내는 것이 아닙니다. <strong>박사급 컨설턴트와 30+ 분야 전문 작가</strong>가 한 권 한 권에 직접 참여합니다.</p>
            <div className="roles">
              <span>출판부 팀장</span><span>출판 기획·컨설팅</span><span>논문 컨설팅</span><span>출판 실무·교육</span><span>기획 작가</span><span>출판 작가</span>
            </div>
            <a href="/team" className="cta-btn">작가진 이력 자세히 보기 →</a>
          </div>

          <div className="team-privacy-note">{t("team.privacy")}</div>
        </div>
      </section>

      {/* REAL VOICES — 유형별 출간 후 변화 */}
      <section id="voices" data-edit-key="voices">
        <div className="container">
          <div className="section-eyebrow">{t("voices.eyebrow")}</div>
          <h2 className="section-title">{t("voices.title1")}<br />{t("voices.title2")}</h2>
          <div className="section-rule"></div>
          <p className="section-lead">{t("voices.lead")}</p>

          <div className="voices-grid">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
              <div key={n} className="voice-card">
                <div className="voice-tag">{t(`voices.v${n}.tag`)}</div>
                <h4>{t(`voices.v${n}.title`)}</h4>
                <p>{t(`voices.v${n}.desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="alt" data-edit-key="faq">
        <div className="container">
          <div className="section-eyebrow">{t("faq.eyebrow")}</div>
          <h2 className="section-title">{t("faq.title")}</h2>
          <div className="section-rule"></div>
          <Faq />
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" data-edit-key="contact">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-text">
              <div className="section-eyebrow">{t("contact.eyebrow")}</div>
              <h2 className="section-title">{t("contact.title1")}<br />{t("contact.title2")}</h2>
              <div className="section-rule"></div>
              <p>
                {t("contact.p1")}<br />
                {t("contact.p2")}
              </p>
              <p style={{ marginTop: 24, color: "var(--gold-500)", fontSize: 14, letterSpacing: "0.1em" }}>
                {t("contact.note")}
              </p>
            </div>

            <div className="contact-channels">
              <a href="http://pf.kakao.com/_QkZhd" target="_blank" rel="noopener noreferrer" className="contact-ch"
                data-track="cta_click" data-category="contact" data-label="contact_kakao">
                <div className="ch-label">KAKAOTALK</div>
                <div className="ch-val">{t("contact.ch.kakao")}</div>
              </a>
              <a href="tel:01020680817" className="contact-ch"
                data-track="cta_click" data-category="contact" data-label="contact_phone">
                <div className="ch-label">PHONE</div>
                <div className="ch-val">{t("contact.ch.phone")}</div>
              </a>
              <a href="mailto:dreamwithessmarketing@gmail.com" className="contact-ch"
                data-track="cta_click" data-category="contact" data-label="contact_email">
                <div className="ch-label">EMAIL</div>
                <div className="ch-val">dreamwithessmarketing<br />@gmail.com</div>
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* 동적 섹션 (admin /site/sections에서 추가) */}
      <DynamicSections />
      </main>

      {/* FOOTER (DB 우선 + 폴백) */}
      <SiteFooter />

      {/* FLOATING CTA — premium pill style with inline SVG */}
      <div className="float-cta">
        <a
          href="http://pf.kakao.com/_QkZhd"
          target="_blank"
          rel="noopener noreferrer"
          className="float-cta-btn kakao"
          aria-label="카카오톡 상담"
          data-track="cta_click"
          data-category="contact"
          data-label="float_kakao"
        >
          <svg className="float-cta-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 3C6.477 3 2 6.55 2 10.93c0 2.79 1.86 5.24 4.65 6.59-.18.65-.72 2.65-.83 3.06-.13.51.19.51.4.37.16-.11 2.61-1.77 3.66-2.49.7.1 1.41.16 2.12.16 5.523 0 10-3.55 10-7.93C22 6.55 17.523 3 12 3z" />
          </svg>
          <span className="float-cta-text">카카오톡 상담</span>
        </a>
        <a
          href="tel:01020680817"
          className="float-cta-btn phone"
          aria-label="전화 상담"
          data-track="cta_click"
          data-category="contact"
          data-label="float_phone"
        >
          <svg className="float-cta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          <span className="float-cta-text">전화 상담</span>
        </a>
      </div>
    </>
  );
}
