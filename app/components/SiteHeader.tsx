"use client";

import { useEffect, useState } from "react";

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile nav is open
  useEffect(() => {
    if (open) document.body.classList.add("nav-open");
    else document.body.classList.remove("nav-open");
    return () => document.body.classList.remove("nav-open");
  }, [open]);

  // Close on ESC key
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Close when resizing to desktop
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
        <a href="#top" className="logo" onClick={closeMenu}>
          <div className="logo-mark">S</div>
          <div className="logo-text">
            드림위드에스
            <small>DREAM · WITH · S</small>
          </div>
        </a>
        <nav
          className={`main-nav ${open ? "open" : ""}`}
          aria-hidden={!open}
        >
          <a href="#about" onClick={closeMenu}>위드에스마케팅</a>
          <a href="#thesis" onClick={closeMenu}>논문컨설팅</a>
          <a href="#pricing" onClick={closeMenu}>출판안내</a>
          <a href="#service" onClick={closeMenu}>서비스</a>
          <a href="#portfolio" onClick={closeMenu}>포트폴리오</a>
          <a href="#faq" onClick={closeMenu}>FAQ</a>
          <a href="#contact" onClick={closeMenu} style={{ color: "var(--gold-600)" }}>
            간편 문의 →
          </a>
        </nav>
        <a href="#contact" className="cta-btn gold desktop-only" onClick={closeMenu}>
          간편 문의 →
        </a>
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
