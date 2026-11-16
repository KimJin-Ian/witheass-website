"use client";

/**
 * 푸터 (DB 우선 + 하드코딩 폴백)
 *
 * admin /site/footer에서 추가/편집한 푸터 링크를
 * 사이트에 자동 반영. DB 비어있으면 기존 디자인 폴백.
 */

import { useEffect, useState } from "react";
import { useLang, LANG_HOME } from "./LangContext";
import { supabase, SITE_KEY, isSupabaseConfigured } from "@/lib/supabase";
import { siteHref, localHref } from "@/lib/links";

interface DbLink {
  id: string;
  column_label: string;
  column_order: number;
  label: string;
  url: string;
  is_external: boolean;
  sort_order: number;
}

export default function SiteFooter() {
  const { t, lang, langs } = useLang();
  const L = (href: string) => localHref(href, lang);
  const [dbLinks, setDbLinks] = useState<DbLink[] | null>(null);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setDbLinks([]);
      return;
    }
    let alive = true;
    (async () => {
      try {
        const { data, error } = await supabase
          .from("footer_links")
          .select("id, column_label, column_order, label, url, is_external, sort_order")
          .eq("site", SITE_KEY)
          .eq("lang", lang)
          .eq("is_published", true)
          .order("column_order", { ascending: true })
          .order("sort_order", { ascending: true });
        if (error || !alive) return;
        setDbLinks((data as DbLink[]) || []);
      } catch {
        if (alive) setDbLinks([]);
      }
    })();
    return () => { alive = false; };
  }, [lang]);

  // 컬럼별 그룹핑
  const useDb = dbLinks !== null && dbLinks.length > 0;
  const columns: Record<string, { order: number; items: DbLink[] }> = {};
  if (useDb) {
    for (const link of dbLinks!) {
      if (!columns[link.column_label]) {
        columns[link.column_label] = { order: link.column_order, items: [] };
      }
      columns[link.column_label].items.push(link);
    }
  }
  const sortedColumns = Object.keys(columns).sort((a, b) => columns[a].order - columns[b].order);

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="ft-grid">
          {/* 브랜드는 항상 표시 (디자인 일관성) */}
          <div>
            <div className="ft-brand">{t("footer.brand")}</div>
            <p style={{ marginBottom: 8 }}>{t("footer.business")}</p>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>{t("footer.ceo")}</p>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>{t("footer.inquiry")}</p>
          </div>

          {useDb ? (
            // DB에서 가져온 컬럼들
            sortedColumns.map((colName) => (
              <div key={colName}>
                <h5>{colName}</h5>
                <ul>
                  {columns[colName].items.map((link) => {
                    // DB 주소는 예전 메인 기준("/#pricing")이라 지금 구조로 옮겨 보낸다 (lib/links.ts)
                    const h = siteHref(link.url);
                    const ext = link.is_external || h.external;
                    return (
                      <li key={link.id}>
                        <a
                          href={L(h.href)}
                          target={ext ? "_blank" : undefined}
                          rel={ext ? "noopener noreferrer" : undefined}
                        >
                          {link.label}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))
          ) : (
            // 폴백: 기존 하드코딩 푸터
            <>
              <div>
                <h5>{t("footer.sitemap")}</h5>
                <ul>
                  <li><a href={L("/about#about")}>{t("nav.about")}</a></li>
                  <li><a href={L("/about#thesis")}>{t("nav.thesis")}</a></li>
                  <li><a href={L("/about#pricing")}>{t("nav.pricing")}</a></li>
                  <li><a href={L("/about#process")}>{t("nav.process")}</a></li>
                  <li><a href={L("/about#portfolio")}>{t("nav.portfolio")}</a></li>
                  {lang === "ko" && <li><a href="/blog">블로그</a></li>}
                  <li><a href={L("/about#faq")}>{t("nav.faq")}</a></li>
                </ul>
              </div>
              <div>
                <h5>{t("footer.contact")}</h5>
                <ul>
                  <li>Tel · 010-2068-0817</li>
                  <li>Email · dreamwithessmarketing@gmail.com</li>
                  <li>KakaoTalk · {t("contact.ch.kakao")}</li>
                </ul>
              </div>
            </>
          )}
        </div>
        {/* 언어별 페이지 — 모든 페이지 아래에 링크로 둔다 (방문자 · 검색엔진 모두 번역본을 찾을 수 있게) */}
        <nav
          aria-label="Language"
          style={{ display: "flex", flexWrap: "wrap", gap: "6px 18px", marginTop: 28, fontSize: 13 }}
        >
          {langs.map((l) => (
            <a
              key={l.code}
              href={LANG_HOME[l.code]}
              hrefLang={l.code === "zh" ? "zh-Hans" : l.code}
              lang={l.code === "zh" ? "zh-Hans" : l.code}
              aria-current={l.code === lang ? "true" : undefined}
              style={{
                color: l.code === lang ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.55)",
                fontWeight: l.code === lang ? 700 : 400,
                padding: "6px 0",
              }}
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="copyright" style={{ marginTop: 14 }}>{t("footer.copyright")}</div>
      </div>
    </footer>
  );
}
