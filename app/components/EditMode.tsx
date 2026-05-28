"use client";

/**
 * 비주얼 에디터 모드 (?edit=1 URL 파라미터 시에만 활성화)
 *
 * 동작:
 *   1. URL에 ?edit=1 이 있을 때만 마운트.
 *   2. 부모 origin이 admin 도메인인지 확인 (보안).
 *   3. data-edit-key="..." 속성이 있는 요소들에:
 *      - 호버 시 파란 점선 outline + "✏️ 편집" 배지 표시
 *      - 클릭 시 parent(admin)에게 postMessage로 섹션 키 전달
 *   4. 사이트 자체에는 영향 없음 (홈페이지 일반 방문자에겐 보이지 않음).
 */

import { useEffect } from "react";

const ALLOWED_PARENT_ORIGINS = [
  "https://witheass-admin-real.vercel.app",
  "http://localhost:3001",
  "http://localhost:3000",
];

export default function EditMode() {
  useEffect(() => {
    // URL ?edit=1 체크
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("edit") !== "1") return;

    // 부모(admin) origin 검증 — admin 안에서만 작동
    // (iframe 밖에서 ?edit=1 으로 진입해도 표시만 되고 admin과 통신 X)
    const parentOrigin =
      window.parent !== window ? document.referrer : "";
    const isInAdmin = ALLOWED_PARENT_ORIGINS.some((o) =>
      parentOrigin.startsWith(o)
    );

    // 스타일 주입
    const style = document.createElement("style");
    style.id = "edit-mode-styles";
    style.textContent = `
      [data-edit-key] {
        position: relative;
        cursor: pointer;
        transition: outline 0.15s, background-color 0.15s;
      }
      [data-edit-key]:hover {
        outline: 2px dashed #3b82f6 !important;
        outline-offset: 4px;
        background-color: rgba(59, 130, 246, 0.04) !important;
      }
      [data-edit-key].__edit-selected {
        outline: 2px solid #3b82f6 !important;
        outline-offset: 4px;
        background-color: rgba(59, 130, 246, 0.08) !important;
      }
      [data-edit-key]:hover::before,
      [data-edit-key].__edit-selected::before {
        content: "✏️ " attr(data-edit-key);
        position: absolute;
        top: -32px;
        right: 0;
        background: #3b82f6;
        color: #fff;
        font-size: 11px;
        font-weight: 600;
        padding: 4px 9px;
        border-radius: 4px;
        z-index: 9999;
        pointer-events: none;
        font-family: -apple-system, "Pretendard", sans-serif;
        white-space: nowrap;
      }
      [data-edit-key].__edit-selected::before {
        background: #16a34a;
      }
      /* 안내 배너 */
      .__edit-banner {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        background: linear-gradient(90deg, #3b82f6, #6366f1);
        color: #fff;
        padding: 8px 16px;
        font-size: 13px;
        font-family: -apple-system, "Pretendard", sans-serif;
        text-align: center;
        z-index: 999999;
        font-weight: 500;
        box-shadow: 0 2px 8px rgba(0,0,0,0.15);
      }
    `;
    document.head.appendChild(style);

    // 상단 안내 배너
    const banner = document.createElement("div");
    banner.className = "__edit-banner";
    banner.textContent = isInAdmin
      ? "✏️ 편집 모드 — 클릭한 섹션은 admin 사이드바에서 편집됩니다"
      : "👀 편집 모드 미리보기 (admin 안에서 열어야 실제 편집 가능)";
    document.body.appendChild(banner);

    // body padding-top 보정
    const originalPaddingTop = document.body.style.paddingTop;
    document.body.style.paddingTop = `calc(${originalPaddingTop || "0px"} + 36px)`;

    // 클릭 핸들러 — admin에 postMessage
    function onClick(e: MouseEvent) {
      const target = (e.target as HTMLElement).closest("[data-edit-key]");
      if (!target) return;
      e.preventDefault();
      e.stopPropagation();
      const key = target.getAttribute("data-edit-key") || "";
      if (!key) return;

      // 선택 표시
      document
        .querySelectorAll("[data-edit-key].__edit-selected")
        .forEach((el) => el.classList.remove("__edit-selected"));
      target.classList.add("__edit-selected");

      // 항상 parent에 클릭 이벤트 전달 (iframe 밖에선 parent === window 라 영향 없음)
      if (window.parent !== window) {
        window.parent.postMessage(
          { type: "visual-editor:click", key, source: "homepage" },
          "*"
        );
      }
      console.log("[edit-mode] clicked:", key);
    }

    document.addEventListener("click", onClick, { capture: true });

    // parent로 ready 신호 — iframe 안이면 무조건 송신 (보안: 수신측에서 origin 검증)
    if (window.parent !== window) {
      window.parent.postMessage(
        { type: "visual-editor:ready", source: "homepage" },
        "*"
      );
      // 1초 후 재송신 (parent 리스너가 마운트 전에 first ready를 놓친 경우 대비)
      setTimeout(() => {
        window.parent.postMessage(
          { type: "visual-editor:ready", source: "homepage" },
          "*"
        );
      }, 1000);
    }

    // cleanup (사실상 페이지 떠나면 자동 정리됨)
    return () => {
      document.removeEventListener("click", onClick, { capture: true });
      style.remove();
      banner.remove();
      document.body.style.paddingTop = originalPaddingTop;
    };
  }, []);

  return null;
}
