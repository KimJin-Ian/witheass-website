"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { tFor, type Lang, LANGS } from "@/lib/i18n";

type LangContextValue = {
  lang: Lang;
  setLang: (next: Lang) => void;
  t: (key: string) => string;
  langs: typeof LANGS;
};

const LangContext = createContext<LangContextValue | undefined>(undefined);

const STORAGE_KEY = "withess_lang";

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ko");

  // 첫 마운트 시 저장된 언어 또는 브라우저 언어 자동 감지
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Lang | null;
      if (saved && ["ko", "en", "zh", "ja"].includes(saved)) {
        setLangState(saved);
        document.documentElement.lang = saved;
        return;
      }
      // 브라우저 언어 자동 매핑
      const nav = (navigator.language || "ko").toLowerCase();
      if (nav.startsWith("en")) setLangState("en");
      else if (nav.startsWith("zh")) setLangState("zh");
      else if (nav.startsWith("ja")) setLangState("ja");
      else setLangState("ko");
    } catch {
      /* SSR / no localStorage */
    }
  }, []);

  // lang 변경 시 html lang 속성 동기화 (SEO + 접근성)
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const t = useCallback((key: string) => tFor(lang, key), [lang]);

  const value = useMemo<LangContextValue>(
    () => ({ lang, setLang, t, langs: LANGS }),
    [lang, setLang, t]
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) {
    throw new Error("useLang must be used inside <LangProvider>");
  }
  return ctx;
}
