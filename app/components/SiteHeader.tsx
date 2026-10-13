"use client";

import { useEffect, useState } from "react";
import { useLang } from "./LangContext";
import LangSwitcher from "./LangSwitcher";
import { supabase, SITE_KEY, isSupabaseConfigured } from "@/lib/supabase";
import { KAKAO_CHAT, siteHref } from "@/lib/links";

interface DbNavItem {
  id: string;
  label: string;
  url: string;
  is_external: boolean;
  is_cta: boolean;
  sort_order: number;
}

export default function SiteHeader() {
  const { t, lang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dbNav, setDbNav] = useState<DbNavItem[] | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) document.body.classList.add("nav-open");
    else document.body.classList.remove("nav-open");
    return () => document.body.classList.remove("nav-open");
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 900 && open) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [open]);

  // admin /site/nav에서 추가/편집한 메뉴 가져오기
  useEffect(() => {
    if (!isSupabaseConfigured) { setDbNav([]); return; }
    let alive = true;
    (async () => {
      try {
        const { data, error } = await supabase
          .from("nav_links")
          .select("id, label, url, is_external, is_cta, sort_order")
          .eq("site", SITE_KEY)
          .eq("lang", lang)
          .eq("is_published", true)
          .order("sort_order", { ascending: true });
        if (error || !alive) return;
        setDbNav((data as DbNavItem[]) || []);
      } catch {
        if (alive) setDbNav([]);
      }
    })();
    return () => { alive = false; };
  }, [lang]);

  const closeMenu = () => setOpen(false);
  const useDbNav = dbNav !== null && dbNav.length > 0;

  return (
    <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
      <div className="container header-inner">
        <a href="/" className="logo" onClick={closeMenu} aria-label="드림위드에스 출판사 홈으로">
          <img
            src="/logo.png"
            alt="드림위드에스 출판사 — 위드에스마케팅"
            width={200}
            height={50}
            style={{ height: "44px", width: "auto", display: "block" }}
          />
        </a>
        <nav
          className={`main-nav ${open ? "open" : ""}`}
          aria-hidden={!open}
        >
          {useDbNav ? (
            // DB 메뉴 사용 (admin /site/nav) — '전문 작가진'(/team)은 코드에서 항상 보강
            (() => {
              // DB 주소는 예전 메인 기준("/#pricing")이라 지금 구조로 옮겨 보낸다 — 상담 버튼은 카톡 (lib/links.ts)
              const items = dbNav!.map((item) => {
                const h = siteHref(item.url, { cta: item.is_cta });
                const ext = item.is_external || h.external;
                return (
                  <a
                    key={item.id}
                    href={h.href}
                    onClick={closeMenu}
                    target={ext ? "_blank" : undefined}
                    rel={ext ? "noopener noreferrer" : undefined}
                    style={item.is_cta ? { color: "var(--gold-600)" } : undefined}
                  >
                    {item.label}
                  </a>
                );
              });
              // DB에 /team 메뉴가 없으면 CTA 앞(없으면 맨 끝)에 끼워 넣는다
              if (!dbNav!.some((it) => it.url === "/team")) {
                const ctaIdx = dbNav!.findIndex((it) => it.is_cta);
                const at = ctaIdx === -1 ? items.length : ctaIdx;
                items.splice(
                  at,
                  0,
                  <a key="team-link" href="/team" onClick={closeMenu}>전문 작가진</a>
                );
              }
              return items;
            })()
          ) : (
            // 폴백: 기존 하드코딩 메뉴
            <>
              <a href="/about" onClick={closeMenu}>About us</a>
              <a href="/about#about" onClick={closeMenu}>{t("nav.about")}</a>
              <a href="/about#thesis" onClick={closeMenu}>{t("nav.thesis")}</a>
              <a href="/about#pricing" onClick={closeMenu}>{t("nav.pricing")}</a>
              <a href="/about#service" onClick={closeMenu}>{t("nav.brand")}</a>
              <a href="/about#portfolio" onClick={closeMenu}>{t("nav.portfolio")}</a>
              <a href="/team" onClick={closeMenu}>전문 작가진</a>
              <a href="/blog" onClick={closeMenu}>블로그</a>
              <a href="/about#faq" onClick={closeMenu}>{t("nav.faq")}</a>
              <a href={KAKAO_CHAT} target="_blank" rel="noopener noreferrer" onClick={closeMenu} style={{ color: "var(--gold-600)" }}>
                {t("nav.consult")} →
              </a>
            </>
          )}
        </nav>
        <div className="header-right desktop-only">
          <LangSwitcher />
          <a href={KAKAO_CHAT} target="_blank" rel="noopener noreferrer" className="cta-btn gold" onClick={closeMenu}
             data-track="cta_click" data-category="navigation" data-label="header_kakao">
            {t("nav.consult")} →
          </a>
        </div>
        <button
          className={`hamburger ${open ? "open" : ""}`}
          aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
  );
}
