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
        <nav className={`main-nav ${open ? "open" : ""}`}>
          <a href="#about" onClick={closeMenu}>위드에스마케팅</a>
          <a href="#thesis" onClick={closeMenu}>논문컨설팅</a>
          <a href="#pricing" onClick={closeMenu}>출판안내</a>
          <a href="#service" onClick={closeMenu}>서비스</a>
          <a href="#portfolio" onClick={closeMenu}>포트폴리오</a>
          <a href="#faq" onClick={closeMenu}>FAQ</a>
        </nav>
        <a href="#contact" className="cta-btn gold desktop-only" onClick={closeMenu}>
          간편 문의 →
        </a>
        <button
          className="hamburger"
          aria-label="메뉴"
          onClick={() => setOpen((v) => !v)}
        >
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
  );
}
