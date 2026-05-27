"use client";

/**
 * 통합 Analytics 컴포넌트
 *
 * 활성화 방법:
 * 1. 프로젝트 루트에 .env.local 파일 생성
 * 2. 아래 키 추가:
 *    NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX        (Google Analytics 4)
 *    NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX        (Google Tag Manager, 선택)
 *
 * Vercel Analytics는 Vercel에 배포하면 대시보드에서 활성화만 하면 자동 작동.
 * (npm 패키지 설치 필요: npm i @vercel/analytics @vercel/speed-insights)
 */

import Script from "next/script";
import { useEffect } from "react";
import { track as vercelTrack } from "@vercel/analytics";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

// 전역 클릭 이벤트 자동 트래킹
// data-track="event_name" 속성이 붙은 모든 요소의 클릭을
// GA4 + Vercel Analytics 양쪽으로 전송
function useClickTracking() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handler = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest<HTMLElement>("[data-track]");
      if (!target) return;
      const eventName = target.dataset.track || "click";
      const label = target.dataset.label || target.textContent?.trim().slice(0, 80) || "";
      const category = target.dataset.category || "engagement";

      // GA4 전송
      if (GA_ID) {
        // @ts-ignore
        window.gtag?.("event", eventName, {
          event_category: category,
          event_label: label,
          page_location: window.location.href,
        });
      }

      // Vercel Analytics 전송 (Custom Event)
      try {
        vercelTrack(eventName, { category, label });
      } catch {
        // Vercel Analytics 미배포 환경에선 조용히 무시
      }

      // Supabase 자체 트래킹 (admin 실시간 분석용)
      try {
        fetch("/api/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            event_name: eventName,
            event_label: label,
            event_category: category,
            page_path: window.location.pathname,
          }),
          keepalive: true,
        }).catch(() => {});
      } catch {
        // 무시
      }
    };

    document.addEventListener("click", handler, { capture: true });
    return () => document.removeEventListener("click", handler, { capture: true });
  }, []);
}

// 페이지뷰 자동 추적 (Supabase로 전송)
function usePageViewTracking() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event_name: "page_view",
          event_label: window.location.pathname,
          event_category: "navigation",
          page_path: window.location.pathname,
        }),
        keepalive: true,
      }).catch(() => {});
    } catch {
      // 무시
    }
  }, []);
}

function useScrollDepthTracking() {
  useEffect(() => {
    if (typeof window === "undefined" || !GA_ID) return;

    const milestones = [25, 50, 75, 100];
    const fired = new Set<number>();

    const onScroll = () => {
      const scrolled = window.scrollY + window.innerHeight;
      const total = document.documentElement.scrollHeight;
      const percent = Math.min(100, Math.round((scrolled / total) * 100));

      milestones.forEach((m) => {
        if (percent >= m && !fired.has(m)) {
          fired.add(m);
          // @ts-ignore
          window.gtag?.("event", "scroll_depth", {
            event_category: "engagement",
            event_label: `${m}%`,
            value: m,
          });
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
}

export default function Analytics() {
  useClickTracking();
  useScrollDepthTracking();
  usePageViewTracking();

  return (
    <>
      {GTM_ID && (
        <>
          <Script id="gtm" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');`}
          </Script>
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        </>
      )}

      {GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', '${GA_ID}', {
              page_path: window.location.pathname,
              anonymize_ip: true,
            });`}
          </Script>
        </>
      )}
    </>
  );
}
