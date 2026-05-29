"use client";

/**
 * 인트로 영상 팝업
 *
 * 데스크탑:
 *   1. 진입 시 풀스크린 자동 재생 (음소거 — 브라우저 정책)
 *   2. 우상단 ✕ → 우하단 280px 플로팅
 *   3. 플로팅 ⛶ 또는 영상 탭 → 풀스크린 (이때 소리 켜짐)
 *
 * 모바일 (<768px):
 *   1. 진입 시 곧바로 180px 플로팅 (음소거)
 *   2. 영상 탭 → 풀스크린 (이때 소리 켜짐)
 *
 * 단일 비디오 element 사용 — 모드 전환 시 unmount되지 않아 작은박스 깜빡임 없음
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
const TAP_THRESHOLD_PX = 8;

export default function IntroVideoPopup() {
  const [mode, setMode] = useState<Mode>("hidden");
  const [isMobile, setIsMobile] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false); // 풀스크린 소리 켜기 가능 여부
  // 우하단 플로팅 CTA (카톡·전화 56px×2개 + bottom:24px) 위로 위치
  // y는 우하단 모서리로부터의 거리 (bottom)
  const [position, setPosition] = useState({ x: 16, y: 100 });
  const [dragging, setDragging] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const dragStart = useRef<{
    x: number; y: number; posX: number; posY: number; moved: number;
  } | null>(null);

  // 마운트 시 모바일 여부 + 초기 모드
  // SEO 최적화: 데스크탑/모바일 모두 플로팅으로 시작 (intrusive interstitial 방지)
  useEffect(() => {
    if (typeof window === "undefined") return;
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    try {
      const closed = sessionStorage.getItem(STORAGE_KEY);
      setMode(closed === "1" ? "hidden" : "floating");
    } catch {
      setMode("floating");
    }
  }, []);

  // 윈도우 리사이즈 (회전 등)
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

  // 음소거 제어 — 풀스크린 + 사용자 상호작용 후엔 소리 ON
  useEffect(() => {
    if (!videoRef.current) return;
    const shouldUnmute = mode === "fullscreen" && userInteracted;
    videoRef.current.muted = !shouldUnmute;
    if (shouldUnmute) {
      // 볼륨 적정 수준
      videoRef.current.volume = 0.8;
    }
  }, [mode, userInteracted]);

  // 자동 재생 시도
  useEffect(() => {
    if (mode === "hidden" || !videoRef.current) return;
    videoRef.current.play().catch(() => {});
  }, [mode]);

  // ─── 드래그 / 탭 ───
  function onPointerStart(clientX: number, clientY: number) {
    if (mode !== "floating") return;
    setDragging(true);
    dragStart.current = {
      x: clientX, y: clientY,
      posX: position.x, posY: position.y,
      moved: 0,
    };
  }
  function onPointerMove(clientX: number, clientY: number) {
    if (!dragging || !dragStart.current) return;
    const dx = clientX - dragStart.current.x;
    const dy = clientY - dragStart.current.y;
    dragStart.current.moved = Math.max(dragStart.current.moved, Math.abs(dx) + Math.abs(dy));
    setPosition({
      x: Math.max(8, dragStart.current.posX - dx),
      y: Math.max(8, dragStart.current.posY - dy),
    });
  }
  function onPointerEnd() {
    const moved = dragStart.current?.moved ?? 0;
    setDragging(false);
    if (moved < TAP_THRESHOLD_PX && mode === "floating") {
      // 탭으로 풀스크린 확대 (사용자 상호작용 → 처음부터 재생 + 소리 ON)
      expandToFullscreen();
    }
    dragStart.current = null;
  }
  useEffect(() => {
    if (!dragging) return;
    function mmove(e: globalThis.MouseEvent) { onPointerMove(e.clientX, e.clientY); }
    function tmove(e: globalThis.TouchEvent) {
      if (e.touches[0]) onPointerMove(e.touches[0].clientX, e.touches[0].clientY);
    }
    function up() { onPointerEnd(); }
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
    // 사용자가 풀스크린으로 확대할 때:
    //  1. 영상을 처음부터 재생
    //  2. 음소거 해제 + 적정 볼륨
    //  3. play() 즉시 호출
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.muted = false;
      videoRef.current.volume = 0.8;
      videoRef.current.play().catch(() => {});
    }
    setUserInteracted(true);
    setMode("fullscreen");
  }
  function closeCompletely() {
    setMode("hidden");
    try { sessionStorage.setItem(STORAGE_KEY, "1"); } catch {}
    if (videoRef.current) videoRef.current.pause();
  }

  if (mode === "hidden") return null;

  const isFs = mode === "fullscreen";
  const floatWidth = isMobile ? 180 : 280;

  // ─── 동적 컨테이너 스타일 (mode에 따라 변경, 같은 div 사용) ───
  const containerStyle: React.CSSProperties = isFs
    ? {
        position: "fixed",
        inset: 0,
        background: "rgba(0, 0, 0, 0.92)",
        zIndex: 999999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: isMobile ? 8 : 20,
      }
    : {
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
        touchAction: "none",
      };

  // ─── 비디오 스타일도 동적 (element는 unmount X) ───
  const videoStyle: React.CSSProperties = isFs
    ? {
        maxWidth: "100%",
        maxHeight: "100%",
        borderRadius: 12,
        boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
        display: "block",
      }
    : {
        width: "100%",
        display: "block",
        pointerEvents: "none",
        borderRadius: 0,
        boxShadow: "none",
      };

  return (
    <div
      style={containerStyle}
      onMouseDown={(e: ReactMouseEvent) => !isFs && onPointerStart(e.clientX, e.clientY)}
      onTouchStart={(e: ReactTouchEvent) => {
        if (!isFs && e.touches[0])
          onPointerStart(e.touches[0].clientX, e.touches[0].clientY);
      }}
    >
      {/* 단일 비디오 element — 모드 변경 시 unmount되지 않음 */}
      <video
        ref={videoRef}
        src="/intro-video.mp4"
        autoPlay
        loop
        playsInline
        controls={isFs}
        style={videoStyle}
      />

      {/* 풀스크린 모드 — ✕ 닫기 버튼 */}
      {isFs && (
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
      )}

      {/* 풀스크린 모드 — 안내 (데스크탑만) */}
      {isFs && !isMobile && (
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
            pointerEvents: "none",
          }}
        >
          작게 보기 →
        </div>
      )}

      {/* 플로팅 모드 — 상단 컨트롤 바 */}
      {!isFs && (
        <div
          style={{
            position: "absolute",
            top: 0, left: 0, right: 0,
            padding: "6px 8px",
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
          <div
            style={{
              color: "#fff",
              fontSize: 10,
              opacity: 0.8,
              fontFamily: '-apple-system, "Pretendard", sans-serif',
            }}
          >
            👆 탭 = 크게 {!isMobile && "· 🤚 드래그"}
          </div>
          <div style={{ display: "flex", gap: 4 }}>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); expandToFullscreen(); }}
              aria-label="크게 보기"
              style={{
                width: 26, height: 26, borderRadius: 5,
                background: "rgba(255,255,255,0.9)",
                border: "none", cursor: "pointer",
                fontSize: 13, color: "#1a1a2e",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              ⛶
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); closeCompletely(); }}
              aria-label="닫기"
              style={{
                width: 26, height: 26, borderRadius: 5,
                background: "rgba(255,255,255,0.9)",
                border: "none", cursor: "pointer",
                fontSize: 13, fontWeight: 300, color: "#1a1a2e",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
