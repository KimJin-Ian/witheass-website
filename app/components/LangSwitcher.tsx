"use client";

import { useState, useRef, useEffect } from "react";
import { useLang, LANG_HOME } from "./LangContext";

export default function LangSwitcher() {
  const { lang, setLang, langs, t } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // 외부 클릭 시 닫기
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, [open]);

  const current = langs.find((l) => l.code === lang) ?? langs[0];

  return (
    <div className="lang-switcher" ref={ref}>
      <button
        type="button"
        className="lang-current"
        onClick={() => setOpen((v) => !v)}
        aria-label={t("a11y.lang")}
        aria-expanded={open}
      >
        🌐 <span className="lang-short">{current.short}</span>
        <span className="lang-caret">▾</span>
      </button>
      {open && (
        <ul className="lang-menu">
          {langs.map((l) => (
            <li key={l.code}>
              {/* 언어마다 주소가 따로 있다 (/about · /en · /zh · /ja) — 검색엔진도 따라갈 수 있게 진짜 링크로 둔다 */}
              <a
                href={LANG_HOME[l.code]}
                hrefLang={l.code === "zh" ? "zh-Hans" : l.code}
                className={`lang-item ${l.code === lang ? "active" : ""}`}
                style={{ textDecoration: "none", boxSizing: "border-box" }}
                onClick={(e) => {
                  e.preventDefault();
                  setLang(l.code);
                  setOpen(false);
                }}
                aria-current={l.code === lang ? "true" : undefined}
              >
                <span className="lang-short">{l.short}</span>
                <span className="lang-label">{l.label}</span>
                {l.code === lang && <span className="lang-check">✓</span>}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
