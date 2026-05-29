"use client";

/**
 * 인트로 영상 팝업
 *
 * 데스크탑 동작:
 *   1. 페이지 진입 시 전체화면으로 영상 자동 재생 (음소거)
 *   2. 우상단 ✕ → 우하단 플로팅 위젯
 *   3. 드래그로 이동 / ⛶ 확대 / ✕ 닫기
 *
 * 모바일 동작 (768px 미만):
 *   1. 페이지 진입 시 곧바로 플로팅 위젯 상태로 영상 재생
 *   2. 영상을 가볍게 탭하면 풀스크린으로 확대
 *   3. 풀스크린에서 ✕ → 플로팅으로 돌아감
 *   4. 드래그로 위치 이동 가능
 */

import {
  useEffect,
  useRef,
  useState,
  MouseEvent as ReactMouseEvent,
  TouchEvent as ReactTouchEvent,
} from "react";

type Mode = "fullscreen" | "floating" | "hidden";
const STORAGE_KEY = "withess_intro_closed";
const MOBILE_BREAKPOINT = 768;
const TAP_THRESHOLD_PX = 8; // 이 거리 이하 이동 = 탭(클릭)으로 간주

export default function IntroVideoPopup() {
  const [mode, setMode] = useState<Mode>("hidden");
  const [isMobile, setIsMobile] = useState(false);
  const [position, setPosition] = useState({ x: 16, y: 16 });
  const [dragging, setDragging] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef<{
    x: number;
    y: number;
    posX: number;
    posY: number;
    moved: number;
  } | null>(null);

  // 마운트 시 모바일 여부 + 초기 모드 결정
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mobile = window.innerWidth < MOBILE_BREAKPOINT;
    setIsMobile(mobile);
    try {
      const closed = sessionStorage.getItem(STORAGE_KEY);
      if (closed === "1") {
        setMode("hidden");
      } else {
        // 모바일은 플로팅, 데스크탑은 풀스크린으로 시작
        setMode(mobile ? "floating" : "fullscreen");
      }
    } catch {
      setMode(mobile ? "floating" : "fullscreen");
    }
  }, []);

  // 윈도우 크기 변경 시 모바일 여부 갱신 (자세 변경 대응)
  useEffect(() => {
    function onResize() {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // 풀스크린일 때 body 스크롤 잠금
  useEffect(() => {
    if (mode === "fullscreen") {
      const orig = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = orig;
      };
    }
  }, [mode]);

  // 영상 자동 재생 시도
  useEffect(() => {
    if (mode === "hidden" || !videoRef.current) return;
    videoRef.current.play().catch(() => {});
  }, [mode]);

  // 드래그 / 탭 핸들러
  function onPointerStart(clientX: number, clientY: number) {
    if (mode !== "floating") return;
    setDragging(true);
    dragStart.current = {
      x: clientX,
      y: clientY,
      posX: position.x,
      posY: position.y,
      moved: 0,
    };
  }

  function onPointerMove(clientX: number, clientY: number) {
    if (!dragging || !dragStart.current) return;
    const dx = clientX - dragStart.current.x;
    const dy = clientY - dragStart.current.y;
    dragStart.current.moved = Math.max(
      dragStart.current.moved,
      Math.abs(dx) + Math.abs(dy)
    );
    setPosition({
      x: Math.max(8, dragStart.current.posX - dx),
      y: Math.max(8, dragStart.current.posY - dy),
    });
  }

  function onPointerEnd() {
    const moved = dragStart.current?.moved ?? 0;
    setDragging(false);
    // 이동량이 임계치 미만이면 탭으로 간주 → 풀스크린 확대
    if (moved < TAP_THRESHOLD_PX && mode === "floating") {
      expandToFullscreen();
    }
    dragStart.current = null;
  }

  // 전역 마우스/터치 리스너
  useEffect(() => {
    if (!dragging) return;
    function mmove(e: globalThis.MouseEvent) {
      onPointerMove(e.clientX, e.clientY);
    }
    function tmove(e: globalThis.TouchEvent) {
      if (e.touches[0])
        onPointerMove(e.touches[0].clientX, e.touches[0].clientY);
    }
    function up() {
      onPointerEnd();
    }
    window.addEventListener("mousemove", mmove);
    window.addEventListener("mouseup", up);
    window.addEventListener("touchmove", tmove);
    window.addEventListener("touchend", up);
    return () => {
      window.removeEventListener("mousemove", mmove);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("touchmove", tmove);
      window.removeEventListener("touchend", up);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    if (videoRef.current) videoRef.current.pause();
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
          padding: isMobile ? 8 : 20,
        }}
      >
        <button
          type="button"
          onClick={minimizeToFloating}
          aria-label="작게 보기"
          style={{
            position: "absolute",
            top: isMobile ? 12 : 20,
            right: isMobile ? 12 : 20,
            width: isMobile ? 44 : 56,
            height: isMobile ? 44 : 56,
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.95)",
            border: "none",
            cursor: "pointer",
            fontSize: isMobile ? 22 : 28,
            fontWeight: 300,
            color: "#1a1a2e",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
            zIndex: 1000000,
          }}
        >
          ✕
        </button>

        {!isMobile && (
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
        )}

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
  const floatWidth = isMobile ? 180 : 280;

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        bottom: position.y,
        right: position.x,
        width: floatWidth,
        background: "#000",
        borderRadius: 12,
        boxShadow: "0 12px 40px rgba(0, 0, 0, 0.35)",
        zIndex: 999998,
        overflow: "hidden",
        userSelect: "none",
        cursor: dragging ? "grabbing" : "pointer",
        transition: dragging ? "none" : "box-shadow 0.2s",
        touchAction: "none",
      }}
      onMouseDown={(e: ReactMouseEvent) => onPointerStart(e.clientX, e.clientY)}
      onTouchStart={(e: ReactTouchEvent) => {
        if (e.touches[0])
          onPointerStart(e.touches[0].clientX, e.touches[0].clientY);
      }}
    >
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
          pointerEvents: "none",
        }}
      />

      {/* 상단 컨트롤 바 */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          padding: "6px 8px",
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 6,
          pointerEvents: "auto",
        }}
        onMouseDown={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
      >
        <div
          style={{
            color: "#fff",
            fontSize: 10,
            opacity: 0.8,
            fontFamily: '-apple-system, "Pretendard", sans-serif',
          }}
        >
          {isMobile ? "👆 탭 = 크게" : "🤚 드래그"}
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              expandToFullscreen();
            }}
            aria-label="크게 보기"
            style={{
              width: 26,
              height: 26,
              borderRadius: 5,
              background: "rgba(255,255,255,0.9)",
              border: "none",
              cursor: "pointer",
              fontSize: 13,
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
            onClick={(e) => {
              e.stopPropagation();
              closeCompletely();
            }}
            aria-label="닫기"
            style={{
              width: 26,
              height: 26,
              borderRadius: 5,
              background: "rgba(255,255,255,0.9)",
              border: "none",
              cursor: "pointer",
              fontSize: 13,
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
