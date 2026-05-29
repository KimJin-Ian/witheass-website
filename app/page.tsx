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
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" data-edit-key="about">
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

          <div className="pricing-grid">
            <div className="price-card">
              <div className="cat">{t("pricing.p1.cat")}</div>
              <h3>{t("pricing.p1.title")}</h3>
              <div className="price">{t("pricing.p1.price")}<small>{t("pricing.p1.priceSuffix")}</small></div>
              <ul>
                <li>{t("pricing.p1.l1")}</li>
                <li>{t("pricing.p1.l2")}</li>
                <li>{t("pricing.p1.l3")}</li>
                <li>{t("pricing.p1.l4")}</li>
                <li>{t("pricing.p1.l5")}</li>
                <li>{t("pricing.p1.l6")}</li>
              </ul>
            </div>

            <div className="price-card">
              <div className="cat">{t("pricing.p2.cat")}</div>
              <h3>{t("pricing.p2.title")}</h3>
              <div className="price">{t("pricing.p2.price")}<small>{t("pricing.p2.priceSuffix")}</small></div>
              <ul>
                <li>{t("pricing.p2.l1")}</li>
                <li>{t("pricing.p2.l2")}</li>
                <li>{t("pricing.p2.l3")}</li>
                <li>{t("pricing.p2.l4")}</li>
                <li>{t("pricing.p2.l5")}</li>
                <li>{t("pricing.p2.l6")}</li>
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
                <li>{t("pricing.p3.l1")}</li>
                <li>{t("pricing.p3.l2")}</li>
                <li>{t("pricing.p3.l3")}</li>
                <li>{t("pricing.p3.l4")}</li>
                <li>{t("pricing.p3.l5")}</li>
                <li>{t("pricing.p3.l6")}</li>
                <li>{t("pricing.p3.l7")}</li>
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
                <li>{t("pricing.p4.l1")}</li>
                <li>{t("pricing.p4.l2")}</li>
                <li>{t("pricing.p4.l3")}</li>
                <li>{t("pricing.p4.l4")}</li>
                <li>{t("pricing.p4.l5")}</li>
                <li>{t("pricing.p4.l6")}</li>
                <li>{t("pricing.p4.l7")}</li>
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

          <div className="portfolio-grid">
            {[
              "lee-moonho.jpg",
              "ball-boy.jpg",
              "seocho-kim.jpg",
              "yoon-park.jpg",
              "park-service.jpg",
              "dream-everyday.jpg",
              "esg-kim.jpg",
              "k-beauty.jpg",
              "livecommerce.jpg",
              "startup-exit.jpg",
              "knee-life.jpg",
              "anti-aging.jpg",
              "leader-talk.jpg",
              "hope-evidence.jpg",
              "k-man-report.jpg",
              "culturen-4th.jpg",
            ].map((img, i) => {
              const n = i + 1;
              const cat = t(`portfolio.b${n}.cat`);
              const title = t(`portfolio.b${n}.title`);
              const desc = t(`portfolio.b${n}.desc`);
              return (
                <div key={i} className="portfolio-card">
                  <div className="cover">
                    <img
                      src={`/covers/${img}`}
                      alt={`드림위드에스 출판 사례 — ${title} (${cat})`}
                      title={title}
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
                    <div className="cat-tag">{cat}</div>
                    <h4>{title}</h4>
                    <p>{desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
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
