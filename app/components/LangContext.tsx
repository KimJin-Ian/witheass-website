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
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

type LangContextValue = {
  lang: Lang;
  setLang: (next: Lang) => void;
  t: (key: string) => string;
  langs: typeof LANGS;
};

const LangContext = createContext<LangContextValue | undefined>(undefined);

const STORAGE_KEY = "withess_lang";
const SITE_KEY = "witheass" as const;

/**
 * DB content를 i18n 키 형식으로 변환
 * content 테이블: { section: "hero", content_key: "title1", value: "..." }
 *   → { "hero.title1": "..." }
 */
function toI18nMap(rows: Array<{ section: string; content_key: string; value: string }>) {
  const map: Record<string, string> = {};
  for (const row of rows) {
    map[`${row.section}.${row.content_key}`] = row.value;
  }
  return map;
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ko");
  // DB에서 가져온 콘텐츠 (i18n 키 형식, 언어별)
  const [dbContent, setDbContent] = useState<Record<string, Record<string, string>>>({});

  // 첫 마운트 시 저장된 언어 또는 브라우저 언어 자동 감지
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Lang | null;
      if (saved && ["ko", "en", "zh", "ja"].includes(saved)) {
        setLangState(saved);
        document.documentElement.lang = saved;
        return;
      }
      const nav = (navigator.language || "ko").toLowerCase();
      if (nav.startsWith("en")) setLangState("en");
      else if (nav.startsWith("zh")) setLangState("zh");
      else if (nav.startsWith("ja")) setLangState("ja");
      else setLangState("ko");
    } catch {
      /* SSR / no localStorage */
    }
  }, []);

  // lang 변경 시 html lang 속성 동기화
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  // DB content fetch (현재 언어용) — admin에서 편집한 콘텐츠가 즉시 반영됨
  useEffect(() => {
    if (!isSupabaseConfigured) return;
    if (dbContent[lang] !== undefined) return; // 이미 fetch함

    let alive = true;
    (async () => {
      try {
        const { data, error } = await supabase
          .from("content")
          .select("section, content_key, value")
          .eq("site", SITE_KEY)
          .eq("lang", lang);

        if (error || !alive) return;
        const map = toI18nMap((data || []) as any);
        setDbContent((prev) => ({ ...prev, [lang]: map }));
      } catch {
        // ignore
      }
    })();

    return () => { alive = false; };
  }, [lang, dbContent]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  // t(): DB 값 우선, 없으면 i18n.ts 폴백
  const t = useCallback(
    (key: string) => {
      const dbVal = dbContent[lang]?.[key];
      if (dbVal !== undefined && dbVal !== null && dbVal !== "") {
        return dbVal;
      }
      return tFor(lang, key);
    },
    [lang, dbContent]
  );

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
