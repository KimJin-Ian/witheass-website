"use client";

/**
 * 동적 섹션 렌더러 (Client Component)
 *
 * admin /site/sections에서 만든 섹션들을 표시.
 * Supabase에서 직접 fetch (RLS로 공개 데이터만 읽힘).
 */

import { useEffect, useState } from "react";
import { supabase, SITE_KEY, isSupabaseConfigured } from "@/lib/supabase";

interface SectionProps {
  id: string;
  type: string;
  title: string | null;
  props: Record<string, any>;
}

interface Props {
  pageKey?: string;
  lang?: string;
}

export default function DynamicSections({ pageKey = "home", lang = "ko" }: Props) {
  const [sections, setSections] = useState<SectionProps[]>([]);

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    let alive = true;
    (async () => {
      try {
        const { data } = await supabase
          .from("page_sections")
          .select("*")
          .eq("site", SITE_KEY)
          .eq("page_key", pageKey)
          .eq("lang", lang)
          .eq("is_published", true)
          .is("deleted_at", null)
          .order("sort_order", { ascending: true });
        if (alive && data) setSections(data as any);
      } catch {
        // ignore
      }
    })();
    return () => { alive = false; };
  }, [pageKey, lang]);

  if (sections.length === 0) return null;

  return (
    <div className="dynamic-sections">
      {sections.map((s) => (
        <SectionRenderer key={s.id} section={s} />
      ))}
    </div>
  );
}

function SectionRenderer({ section }: { section: SectionProps }) {
  const props = section.props || {};
  switch (section.type) {
    case "rich_text":
      return (
        <section className="ds-rich-text" style={{ background: props.background || "transparent" }}>
          <div className="container">
            <div className="ds-rich-content" dangerouslySetInnerHTML={{ __html: props.html || "" }} />
          </div>
        </section>
      );
    case "banner":
      return (
        <section
          className="ds-banner"
          style={{
            background: props.image
              ? `linear-gradient(135deg, ${props.bg_color || "#0a1228"}cc 0%, ${props.bg_color || "#0a1228"}99 100%), url(${props.image}) center/cover`
              : props.bg_color || "#0a1228",
          }}
        >
          <div className="container">
            {props.title && <h2 className="ds-banner-title">{props.title}</h2>}
            {props.subtitle && <p className="ds-banner-subtitle">{props.subtitle}</p>}
            {props.cta_label && props.cta_url && (
              <a
                href={props.cta_url}
                className="cta-btn gold"
                target={props.cta_url.startsWith("http") ? "_blank" : undefined}
                rel={props.cta_url.startsWith("http") ? "noopener noreferrer" : undefined}
                data-track="cta_click"
                data-category="dynamic_banner"
                data-label={section.id}
              >
                {props.cta_label}
              </a>
            )}
          </div>
        </section>
      );
    case "gallery":
      const images: Array<{ url: string; alt?: string; caption?: string }> = props.images || [];
      if (images.length === 0) return null;
      return (
        <section className="ds-gallery">
          <div className="container">
            <div className="ds-gallery-grid">
              {images.map((img, i) =>
                img.url ? (
                  <figure key={i} className="ds-gallery-item">
                    <img src={img.url} alt={img.alt || ""} loading="lazy" />
                    {img.caption && <figcaption>{img.caption}</figcaption>}
                  </figure>
                ) : null
              )}
            </div>
          </div>
        </section>
      );
    case "cta":
      return (
        <section className="ds-cta">
          <div className="container">
            <div className="ds-cta-box">
              {props.title && <h3>{props.title}</h3>}
              {props.text && <p>{props.text}</p>}
              {props.button_label && props.button_url && (
                <a
                  href={props.button_url}
                  className="cta-btn gold"
                  target={props.button_url.startsWith("http") ? "_blank" : undefined}
                  rel={props.button_url.startsWith("http") ? "noopener noreferrer" : undefined}
                  data-track="cta_click"
                  data-category="dynamic_cta"
                  data-label={section.id}
                >
                  {props.button_label}
                </a>
              )}
            </div>
          </div>
        </section>
      );
    case "custom_html":
      return (
        <section className="ds-custom">
          <div className="container">
            <div dangerouslySetInnerHTML={{ __html: props.html || "" }} />
          </div>
        </section>
      );
    case "spacer":
      return <div style={{ height: props.size || 60 }} />;
    default:
      return null;
  }
}
