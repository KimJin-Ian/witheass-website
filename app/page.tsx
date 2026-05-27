"use client";

import SiteHeader from "./components/SiteHeader";
import Faq from "./components/Faq";
import { useLang } from "./components/LangContext";

export default function Home() {
  const { t } = useLang();
  return (
    <>
      <a href="#main-content" className="skip-link">본문 바로가기</a>
      <SiteHeader />

      <main id="main-content">
      {/* HERO */}
      <section className="hero" id="top">
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
        </div>
      </section>

      {/* ABOUT */}
      <section id="about">
        <div className="container">
          <div className="about-grid">
            <div className="about-text">
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

            <div className="about-portrait">
              <div className="badge">{t("about.promise.badge")}</div>
              <h3>{t("about.promise.title1")}<br /><span style={{ color: "var(--gold-500)", fontSize: 14, letterSpacing: "0.2em" }}>{t("about.promise.title2")}</span></h3>
              <p style={{ fontSize: 14.5, lineHeight: 1.8, color: "rgba(255,255,255,0.85)" }}>
                {t("about.promise.desc")}
              </p>
              <ul>
                <li><span>{t("hero.stat.running.lbl")}</span><span>{t("hero.stat.running.num")}</span></li>
                <li><span>{t("hero.stat.published.lbl")}</span><span>{t("hero.stat.published.num")}</span></li>
                <li><span>{t("hero.stat.royalty.lbl")}</span><span>{t("hero.stat.royalty.num")}</span></li>
                <li><span>{t("hero.stat.time.lbl")}</span><span>{t("hero.stat.time.num")}</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* DIFFERENTIATORS */}
      <section id="brand" className="alt">
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
              <p>{t("brand.c3.desc")}</p>
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
          </div>
        </div>
      </section>

      {/* THESIS */}
      <section id="thesis">
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
      <section id="pricing">
        <div className="container">
          <div className="section-eyebrow">{t("pricing.eyebrow")}</div>
          <h2 className="section-title">{t("pricing.title")}</h2>
          <div className="section-rule"></div>
          <p className="section-lead">{t("pricing.lead")}</p>

          <div className="pricing-grid">
            <div className="price-card">
              <div className="cat">{t("pricing.p1.cat")}</div>
              <h3>{t("pricing.p1.title")}</h3>
              <div className="price">{t("pricing.p1.price")}<small>{t("pricing.p1.priceSuffix")}</small></div>
              <ul>
                <li>전자책 단독 (200만)</li>
                <li>종이책 500권 (300만)</li>
                <li>종이책 1000권 (400만)</li>
                <li>표지·내지 디자인</li>
                <li>네이버 책 등록</li>
                <li>전국 서점 유통 + 인세 45%</li>
              </ul>
            </div>

            <div className="price-card">
              <div className="cat">{t("pricing.p2.cat")}</div>
              <h3>{t("pricing.p2.title")}</h3>
              <div className="price">{t("pricing.p2.price")}<small>{t("pricing.p2.priceSuffix")}</small></div>
              <ul>
                <li>저자가 1차 원고 작성</li>
                <li>목차 기획</li>
                <li>원고 교정·교열</li>
                <li>전체 구조 설계</li>
                <li>표지 카피라이팅</li>
                <li>500권 인쇄 + 유통</li>
              </ul>
            </div>

            <div className="price-card">
              <div className="cat">{t("pricing.p3.cat")}</div>
              <h3>{t("pricing.p3.title")}</h3>
              <div className="price">{t("pricing.p3.price")}<small>{t("pricing.p3.priceSuffix")}</small></div>
              <p style={{ fontSize: 12.5, color: "var(--text-500)", marginTop: -8, marginBottom: 12, lineHeight: 1.5 }}>
                {t("pricing.p3.note")}
              </p>
              <ul>
                <li>인터뷰 기반 기획 (글 없어도 OK)</li>
                <li>목차 설계 + 원고 집필</li>
                <li>교정·교열 + 표지·내지 디자인</li>
                <li>500권 인쇄 (200페이지 기준)</li>
                <li>전자책 + 밀리의서재 등록</li>
                <li>ISBN + 네이버 책 등록</li>
                <li>전국 서점 유통 + 인세 45%</li>
              </ul>
            </div>

            <div className="price-card featured">
              <div className="tag">{t("pricing.p4.tag")}</div>
              <div className="cat">{t("pricing.p4.cat")}</div>
              <h3>{t("pricing.p4.title1")}<br />{t("pricing.p4.title2")}</h3>
              <div className="price">{t("pricing.p4.price")}<small>{t("pricing.p4.priceSuffix")}</small></div>
              <p style={{ fontSize: 12.5, color: "rgba(255,255,255,0.75)", marginTop: -8, marginBottom: 12, lineHeight: 1.5 }}>
                {t("pricing.p4.note")}
              </p>
              <ul>
                <li><strong>책 출판 올인원 전과정 포함</strong> (위 900만원 패키지 전체)</li>
                <li>블로그·인스타·유튜브 마케팅</li>
                <li>언론 PR + 포털 검색 브랜딩</li>
                <li>리뷰단 + 바이럴</li>
                <li>웹툰형 콘텐츠 20장+</li>
                <li><strong>강연회 주최·운영</strong> (북토크·강의)</li>
                <li>강연·클래스 연결 + 퍼스널 브랜딩 로드맵</li>
              </ul>
              <a href="#contact" className="cta-btn gold" style={{ marginTop: "auto" }}>{t("pricing.p4.cta")}</a>
            </div>
          </div>

          <div className="pricing-note">
            <div style={{ fontSize: 22 }}>💡</div>
            <p>{t("pricing.note")}</p>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="alt">
        <div className="container">
          <div className="section-eyebrow">{t("process.eyebrow")}</div>
          <h2 className="section-title">{t("process.title")}</h2>
          <div className="section-rule"></div>
          <p className="section-lead">{t("process.lead")}</p>

          <div className="process-grid">
            <div className="process-step"><div className="step-num">STEP 01</div><h4>문의 / 견적</h4><p>예산·유입·목적 확인 후 분야별 사례 공유</p></div>
            <div className="process-step"><div className="step-num">STEP 02</div><h4>계약</h4><p>계약금 600만 원 입금 → 본격 진행 시작</p></div>
            <div className="process-step"><div className="step-num">STEP 03</div><h4>인터뷰</h4><p>글 없는 경우 2~5회, 회당 2시간 진행</p></div>
            <div className="process-step"><div className="step-num">STEP 04</div><h4>목차·원고</h4><p>1주 내 목차 → 피드백 2회 → 원고 집필</p></div>
            <div className="process-step"><div className="step-num">STEP 05</div><h4>교정 + 디자인</h4><p>병렬 진행으로 속도 단축. 표지 2개 시안</p></div>
            <div className="process-step"><div className="step-num">STEP 06</div><h4>인쇄·유통</h4><p>500권 인쇄 → 전국 서점 + ISBN·네이버 등록</p></div>
            <div className="process-step"><div className="step-num">STEP 07</div><h4>전자책 등록</h4><p>밀리의서재 + 교보·예스24·리디 전자책</p></div>
            <div className="process-step"><div className="step-num">STEP 08</div><h4>출간 후 마케팅</h4><p>강연·브랜딩·사업 확장 컨설팅 연결</p></div>
          </div>

          <h3 style={{ fontSize: 18, color: "var(--navy-900)", marginBottom: 20, textAlign: "center" }}>{t("process.tracks.title")}</h3>
          <div className="tracks-grid">
            <div className="track-card">
              <h4>{t("process.track1.title")}</h4>
              <ol><li>맞춤 리서치 기획</li><li>피드백 1~2회</li><li>원고 집필</li><li>인쇄·출간</li></ol>
            </div>
            <div className="track-card">
              <h4>{t("process.track2.title")}</h4>
              <ol><li>1차 목차 제안</li><li>목차 기반 원고 집필</li><li>1차 초안</li><li>피드백 → 최종 원고</li></ol>
            </div>
            <div className="track-card">
              <h4>{t("process.track3.title")}</h4>
              <ol><li>심층 질문지 + 답변</li><li>인터뷰 (가족·지인 포함)</li><li>1차 초안 + 추가 질문</li><li>피드백 → 완성</li></ol>
            </div>
          </div>
        </div>
      </section>

      {/* CASE STUDY */}
      <section id="case">
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

      {/* SERVICE */}
      <section id="service" className="alt">
        <div className="container">
          <div className="section-eyebrow">{t("service.eyebrow")}</div>
          <h2 className="section-title">{t("service.title")}</h2>
          <div className="section-rule"></div>
          <p className="section-lead">{t("service.lead")}</p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            <div className="diff-card"><h3>🏛 정치인 · 공직자</h3><p>출판기념회·선거·임기 일정에 맞춰 자서전 + 공신력 확보형 도서. 천안시장 자서전·서초구의원 자서전 등 사례.</p></div>
            <div className="diff-card"><h3>💼 CEO · 기업인</h3><p>퍼스널 브랜딩과 사업 확장을 위한 도서. 검색 신뢰도 확보 + 강연·컨설팅 연결까지.</p></div>
            <div className="diff-card"><h3>⚖️ 전문직 (의사·변호사·교수)</h3><p>전문성과 대중성을 동시에. 안세훈 변호사 『이기적 남자』 등 베스트셀러 사례.</p></div>
            <div className="diff-card"><h3>📚 강사 · 컨설턴트</h3><p>강연 콘텐츠 자산화. 책 1권으로 유튜브·블로그·강의 자료까지 멀티 활용.</p></div>
            <div className="diff-card"><h3>📖 개인 자서전 / 회고록</h3><p>인생을 책으로 남기고 싶은 분, 부모님 선물용, 가족 기록용. 인터뷰 기반으로 글솜씨 없어도 가능.</p></div>
            <div className="diff-card"><h3>🏢 기업 · 기관</h3><p>사례집·연간보고서·브랜드북. 대전신용보증재단 등 기관 도서 사례.</p></div>
          </div>
        </div>
      </section>

      {/* COMMUNITY */}
      <section className="dark">
        <div className="container">
          <div className="section-eyebrow">{t("community.eyebrow")}</div>
          <h2 className="section-title">{t("community.title1")}<br />{t("community.title2")}</h2>
          <div className="section-rule"></div>
          <p className="section-lead">{t("community.lead")}</p>

          <div className="community-grid">
            <div className="community-list">
              <h4>자체 커뮤니티 9개</h4>
              <ul>
                <li>2030 여성 인플루언서</li>
                <li>강남 소셜 네트워크</li>
                <li>CEO·전문직 네트워크</li>
                <li>음악인 네트워크</li>
                <li>엄마 고객층</li>
                <li>병원·뷰티 관심층</li>
                <li>문화예술 커뮤니티</li>
                <li>책 출판 관심층</li>
                <li>강연·클래스 관심층</li>
              </ul>
            </div>
            <div className="community-list">
              <h4>오프라인 행사 라인업</h4>
              <ul>
                <li>북토크 / 출간 기념 강연회</li>
                <li>저자와의 만남</li>
                <li>살롱 토크콘서트 (&ldquo;보이는 라디오&rdquo;)</li>
                <li>전문직 네트워킹 행사</li>
                <li>브랜드 콜라보 행사</li>
                <li>병원·뷰티·문화 커뮤니티 행사</li>
                <li>더컬쳐앤라운지 공간 홍보</li>
                <li>VIP 초대 행사</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio">
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

          <div className="portfolio-grid">
            {[
              { img: "lee-moonho.jpg", cat: "CEO · 자서전", title: "『영혼 있는 도전』 이문호", desc: "기업가 인생 기록" },
              { img: "ball-boy.jpg", cat: "CEO · 자서전", title: "『공 차던 소년, 세상을 경영하다』 고용필", desc: "경영자 인생 기록" },
              { img: "seocho-kim.jpg", cat: "정치인 · 자서전", title: "『서초사랑 나의 꿈』 김안숙", desc: "공직자 인생 기록" },
              { img: "yoon-park.jpg", cat: "정치 · 시사", title: "『윤석열, 대통령 된다』 박서영", desc: "베스트셀러" },
              { img: "park-service.jpg", cat: "자서전 · 봉사", title: "『나를 위한 봉사(奉仕)의 삶』 박종성", desc: "인생 회고록" },
              { img: "dream-everyday.jpg", cat: "자서전 · 인생기록", title: "『나는 오늘도 꿈을 꾼다』 이종담", desc: "펼침형 표지" },
              { img: "esg-kim.jpg", cat: "전문지식 · ESG", title: "『ESG 트렌드』 김상태", desc: "지속가능경영 분야" },
              { img: "k-beauty.jpg", cat: "전문지식 · 뷰티", title: "『왜 세계는 K-뷰티에 열광하는가』 김민디", desc: "K-콘텐츠 산업" },
              { img: "livecommerce.jpg", cat: "비즈니스 · 실용서", title: "『돈이 되는 라이브커머스』 외 2인", desc: "공저 3인" },
              { img: "startup-exit.jpg", cat: "비즈니스 · 스타트업", title: "『창업에서 Exit까지』 정형학", desc: "창업·투자·매각" },
              { img: "knee-life.jpg", cat: "의료 · 정형외과", title: "『사람을 멈추는건 나이가 아니라 관절이다』 안우찬", desc: "관절 건강서" },
              { img: "anti-aging.jpg", cat: "의료 · 안티에이징", title: "『안티에이징의 비밀이야기』 정재웅", desc: "뷰티·메디컬" },
              { img: "leader-talk.jpg", cat: "코칭 · 커뮤니케이션", title: "『리더의 대화과외』 김지엘", desc: "리더십 코칭" },
              { img: "hope-evidence.jpg", cat: "에세이 · 희망", title: "『약한 자들을 위한 희망의 증거』 이드보라", desc: "내지 칼라 인쇄" },
              { img: "k-man-report.jpg", cat: "사회 · 문화 비평", title: "『대한민국 남자 레포트』 김태훈", desc: "현대 사회 분석" },
              { img: "culturen-4th.jpg", cat: "문화산업 · 전문서", title: "『4차 산업혁명과 문화산업』 이서진", desc: "더컬쳐앤 이야기" },
            ].map((p, i) => (
              <div key={i} className="portfolio-card">
                <div className="cover">
                  <img
                    src={`/covers/${p.img}`}
                    alt={`드림위드에스 출판 사례 — ${p.title} (${p.cat})`}
                    title={p.title}
                    loading="lazy"
                    width={720}
                    height={960}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div className="info">
                  <div className="cat-tag">{p.cat}</div>
                  <h4>{p.title}</h4>
                  <p>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REAL VOICES — 유형별 출간 후 변화 */}
      <section id="voices">
        <div className="container">
          <div className="section-eyebrow">{t("voices.eyebrow")}</div>
          <h2 className="section-title">{t("voices.title1")}<br />{t("voices.title2")}</h2>
          <div className="section-rule"></div>
          <p className="section-lead">{t("voices.lead")}</p>

          <div className="voices-grid">
            <div className="voice-card">
              <div className="voice-tag">학원·교육 운영</div>
              <h4>&ldquo;학원 매출이 눈에 띄게 올랐어요.&rdquo;</h4>
              <p>&ldquo;원장 책이 있으니 학부모 상담 시 신뢰도가 다릅니다. 검색하면 책이 먼저 나오고, 등록률이 확연히 올라갔어요.&rdquo;</p>
            </div>
            <div className="voice-card">
              <div className="voice-tag">정치인 · 공직자</div>
              <h4>&ldquo;강연회 덕분에 지역에 제대로 알려졌습니다.&rdquo;</h4>
              <p>&ldquo;출판기념회·북토크 한 번에 수백 명이 모이고, 책 한 권이 명함 역할을 하니까 캠페인 효율이 완전히 달라졌어요.&rdquo;</p>
            </div>
            <div className="voice-card">
              <div className="voice-tag">전문직 (의사·변호사·교수)</div>
              <h4>&ldquo;나의 브랜딩, 나의 기록 자체가 좋아요.&rdquo;</h4>
              <p>&ldquo;환자·의뢰인이 검색했을 때 책이 보이는 게 다르더라고요. 본업의 신뢰도가 책으로 자연스럽게 연결됩니다.&rdquo;</p>
            </div>
            <div className="voice-card">
              <div className="voice-tag">CEO · 기업인</div>
              <h4>&ldquo;돈 벌 때보다 책 쓰고 강연 부수입이 더 행복하더라고요.&rdquo;</h4>
              <p>&ldquo;사업으로 만든 노하우가 책이 되니 강연 의뢰가 끊이질 않아요. 인생의 두 번째 챕터를 시작한 기분입니다.&rdquo;</p>
            </div>
            <div className="voice-card">
              <div className="voice-tag">강사 · 컨설턴트</div>
              <h4>&ldquo;강의료 단가가 올라갔어요.&rdquo;</h4>
              <p>&ldquo;책이 있는 강사와 없는 강사는 단가부터 다릅니다. 한 권의 책이 강사 커리어 전체를 한 단계 위로 올려줬어요.&rdquo;</p>
            </div>
            <div className="voice-card">
              <div className="voice-tag">자영업자 · 소상공인</div>
              <h4>&ldquo;검색하면 신뢰가 먼저 보입니다.&rdquo;</h4>
              <p>&ldquo;가게 이름 옆에 &lsquo;저자&rsquo; 타이틀 하나가 붙으니까 소개·납품·제휴 제안이 자연스럽게 들어와요.&rdquo;</p>
            </div>
            <div className="voice-card">
              <div className="voice-tag">자서전 · 회고록</div>
              <h4>&ldquo;가족이 더 자랑스러워해 줍니다.&rdquo;</h4>
              <p>&ldquo;돈으로 살 수 없는 기록을 남겼다는 만족감. 자녀·손주에게 남길 수 있어 인생에서 가장 잘한 일 같아요.&rdquo;</p>
            </div>
            <div className="voice-card">
              <div className="voice-tag">코치 · 트레이너</div>
              <h4>&ldquo;코칭 프로그램 전환율이 올라갔어요.&rdquo;</h4>
              <p>&ldquo;콘텐츠가 책으로 정리되니 고객이 미리 신뢰를 가지고 옵니다. 무료 상담 → 유료 프로그램 전환률이 확연히 늘었어요.&rdquo;</p>
            </div>
            <div className="voice-card">
              <div className="voice-tag">작가 · 콘텐츠 크리에이터</div>
              <h4>&ldquo;다음 작품·콜라보 제안이 자연스럽게 들어옵니다.&rdquo;</h4>
              <p>&ldquo;첫 책이 나오니 출판사·플랫폼에서 두 번째 책 제안이 옵니다. 인스타·블로그 팔로워도 한 번에 늘었어요.&rdquo;</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="alt">
        <div className="container">
          <div className="section-eyebrow">{t("faq.eyebrow")}</div>
          <h2 className="section-title">{t("faq.title")}</h2>
          <div className="section-rule"></div>
          <Faq />
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact">
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
      </main>

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="container">
          <div className="ft-grid">
            <div>
              <div className="ft-brand">{t("footer.brand")}</div>
              <p style={{ marginBottom: 8 }}>{t("footer.business")}</p>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>{t("footer.ceo")}</p>
            </div>
            <div>
              <h5>{t("footer.sitemap")}</h5>
              <ul>
                <li><a href="#about">{t("nav.about")}</a></li>
                <li><a href="#thesis">{t("nav.thesis")}</a></li>
                <li><a href="#pricing">{t("nav.pricing")}</a></li>
                <li><a href="#process">{t("nav.process")}</a></li>
                <li><a href="#portfolio">{t("nav.portfolio")}</a></li>
                <li><a href="#faq">{t("nav.faq")}</a></li>
              </ul>
            </div>
            <div>
              <h5>{t("footer.contact")}</h5>
              <ul>
                <li>Tel · 010-2068-0817</li>
                <li>Email · dreamwithessmarketing@gmail.com</li>
                <li>KakaoTalk · {t("contact.ch.kakao")}</li>
              </ul>
            </div>
          </div>
          <div className="copyright">{t("footer.copyright")}</div>
        </div>
      </footer>

      {/* FLOATING CTA */}
      <div className="float-cta">
        <a href="http://pf.kakao.com/_QkZhd" target="_blank" rel="noopener noreferrer" className="kakao" title="카카오톡 문의"
          data-track="cta_click" data-category="contact" data-label="float_kakao">💬</a>
        <a href="tel:01020680817" title="전화 문의"
          data-track="cta_click" data-category="contact" data-label="float_phone">📞</a>
      </div>
    </>
  );
}
