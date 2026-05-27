"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 24px",
        background: "#0a1228",
        color: "#fff",
        fontFamily: "Pretendard, 'Noto Sans KR', sans-serif",
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: 13, letterSpacing: "0.25em", color: "#c4a661", marginBottom: 20 }}>
        DREAM WITH·ESS
      </div>
      <h1 style={{ fontSize: "clamp(28px, 5vw, 40px)", fontWeight: 400, letterSpacing: "-0.02em", margin: 0 }}>
        문제가 발생했습니다
      </h1>
      <div style={{ width: 60, height: 1, background: "#c4a661", margin: "20px 0" }} />
      <p style={{ fontSize: 16, color: "rgba(255,255,255,0.85)", maxWidth: 480, margin: 0 }}>
        일시적인 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.
      </p>
      <p style={{ fontSize: 14, marginTop: 6, color: "rgba(255,255,255,0.55)" }}>
        Something went wrong. Please try again.
      </p>
      <div style={{ display: "flex", gap: 12, marginTop: 36, flexWrap: "wrap", justifyContent: "center" }}>
        <button
          onClick={reset}
          style={{
            padding: "16px 32px",
            background: "#c4a661",
            color: "#0a1228",
            border: "none",
            borderRadius: 4,
            fontSize: 13,
            letterSpacing: "0.15em",
            fontWeight: 500,
            cursor: "pointer",
            fontFamily: "inherit",
            textTransform: "uppercase",
          }}
        >
          다시 시도
        </button>
        <a
          href="/"
          style={{
            padding: "16px 32px",
            background: "transparent",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.3)",
            borderRadius: 4,
            fontSize: 13,
            letterSpacing: "0.15em",
            fontWeight: 500,
            textDecoration: "none",
            textTransform: "uppercase",
          }}
        >
          홈으로
        </a>
      </div>
    </main>
  );
}
