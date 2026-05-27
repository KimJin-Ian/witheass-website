export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="페이지를 불러오는 중"
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#0a1228",
        zIndex: 9999,
        fontFamily: "Pretendard, 'Noto Sans KR', sans-serif",
      }}
    >
      <div style={{ fontSize: 13, letterSpacing: "0.25em", color: "#c4a661", marginBottom: 24 }}>
        DREAM WITH·ESS
      </div>
      <div
        style={{
          width: 36,
          height: 36,
          border: "2px solid rgba(196,166,97,0.2)",
          borderTopColor: "#c4a661",
          borderRadius: "50%",
          animation: "we-spin 0.8s linear infinite",
        }}
      />
      <style>{`@keyframes we-spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}
