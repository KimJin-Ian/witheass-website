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
import { usePathname } from "next/navigation";
import { tFor, DICTIONARIES, type Lang, LANGS } from "@/lib/i18n";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

type LangContextValue = {
  lang: Lang;
  setLang: (next: Lang) => void;
  t: (key: string) => string;
  langs: typeof LANGS;
};

const LangContext = createContext<LangContextValue | undefined>(undefined);

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

/** 주소가 정하는 언어 — /en · /zh · /ja 는 그 언어, 나머지는 전부 한국어 */
export const LANG_HOME: Record<Lang, string> = {
  ko: "/about",
  en: "/en",
  zh: "/zh",
  ja: "/ja",
};

function langFromPath(pathname: string | null): Lang {
  const first = (pathname || "").split("/")[1];
  return first === "en" || first === "zh" || first === "ja" ? first : "ko";
}

const HANGUL = /[가-힣]/;

/** <html lang> 에 넣는 값 (중국어는 간체) */
const HTML_LANG: Record<Lang, string> = { ko: "ko", en: "en", zh: "zh-Hans", ja: "ja" };

export function LangProvider({ children }: { children: ReactNode }) {
  // 언어는 주소로 정한다 (2026-11-16).
  //   /en · /zh · /ja  → 영어 · 중국어 · 일본어 (서버에서부터 그 언어로 그려서 검색엔진이 읽을 수 있다)
  //   그 밖의 주소      → 한국어
  // 예전에는 같은 주소(/about)에서 브라우저 저장값으로 언어를 바꿨는데, 그러면 번역본에 주소가 없어
  // 검색에 잡히지 않고 링크로 보내 줄 수도 없었다.
  const pathname = usePathname();
  const lang = langFromPath(pathname);
  // DB에서 가져온 콘텐츠 (i18n 키 형식, 언어별)
  const [dbContent, setDbContent] = useState<Record<string, Record<string, string>>>({});

  // html lang 속성 동기화
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = HTML_LANG[lang];
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

  // 언어 버튼 — 그 언어의 주소로 이동한다. 같은 구획(#pricing 등)을 보고 있었다면 그 자리로 간다.
  const setLang = useCallback(
    (next: Lang) => {
      if (next === lang) return;
      if (typeof window === "undefined") return;
      const onIntro = window.location.pathname === LANG_HOME[lang];
      window.location.href = LANG_HOME[next] + (onIntro ? window.location.hash : "");
    },
    [lang]
  );

  // t(): DB 값 우선, 없으면 i18n.ts 폴백
  // 단, 번역 페이지(en · zh · ja)에서 DB 값이 한국어이면 사전의 번역을 쓴다.
  // DB 의 외국어 칸에는 번역 전 한국어를 그대로 복사해 둔 자리가 많아서(가격표 항목 · 출간 사례 등),
  // 그대로 두면 번역 페이지에 한국어가 다시 덮인다. admin 에서 그 칸에 번역문을 넣으면 그 값이 쓰인다.
  const t = useCallback(
    (key: string) => {
      const dbVal = dbContent[lang]?.[key];
      if (dbVal !== undefined && dbVal !== null && dbVal !== "") {
        if (lang !== "ko" && HANGUL.test(dbVal)) {
          const own = DICTIONARIES[lang]?.[key];
          if (own) return own;
        }
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
