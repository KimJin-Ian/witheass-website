"use client";

import { useEffect, useState } from "react";
import { useLang } from "./LangContext";
import LangSwitcher from "./LangSwitcher";

export default function SiteHeader() {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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

  const closeMenu = () => setOpen(false);

  return (
    <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
      <div className="container header-inner">
        <a href="#top" className="logo" onClick={closeMenu} aria-label="드림위드에스 출판사 홈으로">
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
          <a href="#about" onClick={closeMenu}>{t("nav.about")}</a>
          <a href="#thesis" onClick={closeMenu}>{t("nav.thesis")}</a>
          <a href="#pricing" onClick={closeMenu}>{t("nav.pricing")}</a>
          <a href="#service" onClick={closeMenu}>{t("nav.brand")}</a>
          <a href="#portfolio" onClick={closeMenu}>{t("nav.portfolio")}</a>
          <a href="#faq" onClick={closeMenu}>{t("nav.faq")}</a>
          <a href="#contact" onClick={closeMenu} style={{ color: "var(--gold-600)" }}>
            {t("nav.consult")} →
          </a>
        </nav>
        <div className="header-right desktop-only">
          <LangSwitcher />
          <a href="#contact" className="cta-btn gold" onClick={closeMenu}>
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
