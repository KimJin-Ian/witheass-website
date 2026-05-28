"use client";

import { useEffect } from "react";

/**
 * 블로그 글 상세 페이지에 포함되어 마운트 시 1회 view_count를 증가시킴.
 * - sessionStorage로 동일 세션 중복 카운트 방지
 * - 실패해도 silent (UX 영향 없음)
 */
export default function BlogViewTracker({ slug }: { slug: string }) {
  useEffect(() => {
    if (!slug) return;
    const KEY = `viewed:${slug}`;
    try {
      if (sessionStorage.getItem(KEY)) return;
      sessionStorage.setItem(KEY, "1");
    } catch {
      /* sessionStorage 비활성화 환경 — 그대로 진행 */
    }
    fetch("/api/blog/track-view", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug }),
      keepalive: true,
    }).catch(() => {
      /* silent */
    });
  }, [slug]);

  return null;
}
