"use client";

import { useState, useRef, useEffect } from "react";
import { useLang } from "./LangContext";

export default function LangSwitcher() {
  const { lang, setLang, langs } = useLang();
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
        aria-label="언어 선택"
        aria-expanded={open}
      >
        🌐 <span className="lang-short">{current.short}</span>
        <span className="lang-caret">▾</span>
      </button>
      {open && (
        <ul className="lang-menu" role="listbox">
          {langs.map((l) => (
            <li key={l.code}>
              <button
                type="button"
                className={`lang-item ${l.code === lang ? "active" : ""}`}
                onClick={() => {
                  setLang(l.code);
                  setOpen(false);
                }}
                role="option"
                aria-selected={l.code === lang}
              >
                <span className="lang-short">{l.short}</span>
                <span className="lang-label">{l.label}</span>
                {l.code === lang && <span className="lang-check">✓</span>}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
