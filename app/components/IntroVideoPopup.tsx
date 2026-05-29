"use client";

/**
 * 인트로 영상 팝업
 *
 * 동작:
 *   1. 페이지 진입 시 전체화면으로 영상 자동 재생 (음소거 — 브라우저 정책)
 *   2. 우상단 ✕ 닫기 버튼 → 우하단 작은 플로팅 위젯으로 축소
 *   3. 플로팅 상태에서 드래그로 위치 이동 가능
 *   4. 플로팅 위젯의 ⛶ 버튼 → 다시 전체화면으로 확대
 *   5. 플로팅의 ✕ 버튼 → 완전히 닫기 (sessionStorage에 저장 → 같은 세션 내 재진입 시 안 뜸)
 */

import { useEffect, useRef, useState, MouseEvent as ReactMouseEvent, TouchEvent as ReactTouchEvent } from "react";

type Mode = "fullscreen" | "floating" | "hidden";
const STORAGE_KEY = "withess_intro_closed";

export default function IntroVideoPopup() {
  const [mode, setMode] = useState<Mode>("hidden");
  const [position, setPosition] = useState({ x: 24, y: 24 }); // 우하단 기준 offset
  const [dragging, setDragging] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef<{ x: number; y: number; posX: number; posY: number } | null>(null);

  // 마운트 시 모드 결정 (sessionStorage 확인)
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const closed = sessionStorage.getItem(STORAGE_KEY);
      if (closed === "1") {
        setMode("hidden");
      } else {
        setMode("fullscreen");
      }
    } catch {
      setMode("fullscreen");
    }
  }, []);

  // 풀스크린 모드일 때 body 스크롤 잠금
  useEffect(() => {
    if (mode === "fullscreen") {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [mode]);

  // 영상 자동 재생 시도 (모드 변경 시)
  useEffect(() => {
    if (mode === "hidden" || !videoRef.current) return;
    videoRef.current.play().catch(() => {
      // autoplay block은 무시 (사용자가 직접 재생 가능)
    });
  }, [mode]);

  // 드래그 핸들러
  function onDragStart(clientX: number, clientY: number) {
    if (mode !== "floating") return;
    setDragging(true);
    dragStart.current = {
      x: clientX,
      y: clientY,
      posX: position.x,
      posY: position.y,
    };
  }

  function onDragMove(clientX: number, clientY: number) {
    if (!dragging || !dragStart.current) return;
    const dx = clientX - dragStart.current.x;
    const dy = clientY - dragStart.current.y;
    // 우하단 기준 (x, y)는 우하단으로부터의 distance이므로 dx/dy 부호 반전
    setPosition({
      x: Math.max(8, dragStart.current.posX - dx),
      y: Math.max(8, dragStart.current.posY - dy),
    });
  }

  function onDragEnd() {
    setDragging(false);
    dragStart.current = null;
  }

  // 전역 마우스/터치 리스너
  useEffect(() => {
    if (!dragging) return;
    function move(e: globalThis.MouseEvent) {
      onDragMove(e.clientX, e.clientY);
    }
    function tmove(e: globalThis.TouchEvent) {
      if (e.touches[0]) onDragMove(e.touches[0].clientX, e.touches[0].clientY);
    }
    function up() {
      onDragEnd();
    }
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    window.addEventListener("touchmove", tmove);
    window.addEventListener("touchend", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("touchmove", tmove);
      window.removeEventListener("touchend", up);
    };
  }, [dragging]);

  function minimizeToFloating() {
    setMode("floating");
  }

  function expandToFullscreen() {
    setMode("fullscreen");
  }

  function closeCompletely() {
    setMode("hidden");
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {}
    if (videoRef.current) {
      videoRef.current.pause();
    }
  }

  if (mode === "hidden") return null;

  // ─── Fullscreen Mode ───
  if (mode === "fullscreen") {
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0, 0, 0, 0.92)",
          zIndex: 999999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 20,
        }}
      >
        {/* 우상단 X 큰 버튼 */}
        <button
          type="button"
          onClick={minimizeToFloating}
          aria-label="작게 보기"
          style={{
            position: "absolute",
            top: 20,
            right: 20,
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.95)",
            border: "none",
            cursor: "pointer",
            fontSize: 28,
            fontWeight: 300,
            color: "#1a1a2e",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
            transition: "transform 0.15s",
            zIndex: 1000000,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          ✕
        </button>

        {/* 우상단 작은 안내 */}
        <div
          style={{
            position: "absolute",
            top: 32,
            right: 90,
            color: "rgba(255,255,255,0.7)",
            fontSize: 12,
            background: "rgba(0,0,0,0.4)",
            padding: "6px 12px",
            borderRadius: 999,
            fontFamily: '-apple-system, "Pretendard", sans-serif',
          }}
        >
          작게 보기 →
        </div>

        {/* 영상 */}
        <video
          ref={videoRef}
          src="/intro-video.mp4"
          autoPlay
          muted
          loop
          playsInline
          controls
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            borderRadius: 12,
            boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
          }}
        />
      </div>
    );
  }

  // ─── Floating Mode ───
  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        bottom: position.y,
        right: position.x,
        width: 280,
        background: "#000",
        borderRadius: 12,
        boxShadow: "0 12px 40px rgba(0, 0, 0, 0.35)",
        zIndex: 999998,
        overflow: "hidden",
        userSelect: "none",
        cursor: dragging ? "grabbing" : "grab",
        transition: dragging ? "none" : "box-shadow 0.2s",
      }}
      onMouseDown={(e: ReactMouseEvent) => onDragStart(e.clientX, e.clientY)}
      onTouchStart={(e: ReactTouchEvent) => {
        if (e.touches[0]) onDragStart(e.touches[0].clientX, e.touches[0].clientY);
      }}
    >
      {/* 비디오 */}
      <video
        ref={videoRef}
        src="/intro-video.mp4"
        autoPlay
        muted
        loop
        playsInline
        style={{
          width: "100%",
          display: "block",
          pointerEvents: "none", // 드래그 우선
        }}
      />

      {/* 컨트롤 바 (상단 호버 시 표시) */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          padding: "8px 10px",
          background: "linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 6,
          pointerEvents: "auto",
        }}
        onMouseDown={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
      >
        <div style={{ color: "#fff", fontSize: 10, opacity: 0.8, fontFamily: '-apple-system, "Pretendard", sans-serif' }}>
          🤚 드래그
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); expandToFullscreen(); }}
            aria-label="크게 보기"
            style={{
              width: 28,
              height: 28,
              borderRadius: 6,
              background: "rgba(255,255,255,0.9)",
              border: "none",
              cursor: "pointer",
              fontSize: 14,
              color: "#1a1a2e",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ⛶
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); closeCompletely(); }}
            aria-label="닫기"
            style={{
              width: 28,
              height: 28,
              borderRadius: 6,
              background: "rgba(255,255,255,0.9)",
              border: "none",
              cursor: "pointer",
              fontSize: 14,
              fontWeight: 300,
              color: "#1a1a2e",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
