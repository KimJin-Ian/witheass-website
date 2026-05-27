import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found · 페이지를 찾을 수 없습니다",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 24px",
        background: "var(--navy-900, #0a1228)",
        color: "#fff",
        fontFamily: "Pretendard, 'Noto Sans KR', sans-serif",
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: 13, letterSpacing: "0.25em", color: "var(--gold-600, #c4a661)", marginBottom: 20 }}>
        DREAM WITH·ESS
      </div>
      <h1 style={{ fontSize: "clamp(56px, 12vw, 120px)", fontWeight: 200, letterSpacing: "-0.05em", margin: 0, lineHeight: 1 }}>
        404
      </h1>
      <div
        style={{
          width: 60,
          height: 1,
          background: "var(--gold-600, #c4a661)",
          margin: "24px 0 20px",
        }}
      />
      <p style={{ fontSize: 18, color: "rgba(255,255,255,0.85)", margin: 0 }}>
        요청하신 페이지를 찾을 수 없습니다.
      </p>
      <p style={{ fontSize: 14, marginTop: 6, color: "rgba(255,255,255,0.55)" }}>
        The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        style={{
          marginTop: 36,
          padding: "16px 32px",
          background: "var(--gold-600, #c4a661)",
          color: "var(--navy-900, #0a1228)",
          borderRadius: 4,
          fontSize: 13,
          letterSpacing: "0.15em",
          fontWeight: 500,
          textDecoration: "none",
          textTransform: "uppercase",
        }}
      >
        홈으로 돌아가기
      </Link>
    </main>
  );
}
