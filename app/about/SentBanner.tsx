"use client";

import { useEffect, useState } from "react";
import { KAKAO_CHAT } from "@/lib/links";
import { SENT_KEY, copyText } from "../components/ConsultForm";

/**
 * 상담 신청서를 보낸 직후에만 뜨는 안내 — "카카오톡 채팅창에 붙여넣어 보내주세요"
 *
 * 카카오톡은 다른 사이트가 채팅창에 글을 넣어주는 걸 막아둔다. 그래서 신청서는 복사해 두고
 * 손님이 붙여넣는다. 붙여넣기를 놓친 분이 다시 복사하고 카톡을 다시 열 수 있게 여기 둔다.
 * 신청 내용은 이 브라우저 탭(sessionStorage)에만 잠깐 있고, 닫으면 사라진다.
 */
export default function SentBanner() {
  const [msg, setMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState<"" | "ok" | "fail">("");
  const [show, setShow] = useState(false);

  // 신청서에서 넘어온 순간(?sent=1)에만 띄운다 — 나중에 메뉴로 About us 를 다시 열 때는 안 뜬다
  useEffect(() => {
    if (!new URLSearchParams(window.location.search).has("sent")) return;
    try {
      const m = sessionStorage.getItem(SENT_KEY);
      if (m) setMsg(m);
    } catch { /* 저장소를 못 쓰면 안내도 없다 */ }
  }, []);

  if (!msg) return null;

  const close = () => {
    try { sessionStorage.removeItem(SENT_KEY); } catch { /* 무시 */ }
    setMsg(null);
  };

  return (
    <div role="status" style={{
      position: "fixed", left: 12, right: 12, bottom: 12, zIndex: 1000, maxWidth: 640, margin: "0 auto",
      background: "#eef8f1", border: "1px solid #b9dfc7", borderRadius: 16, padding: "16px 18px",
      boxShadow: "0 14px 40px rgba(10,18,40,.22)", color: "#134a2b", fontSize: 15, lineHeight: 1.6,
      wordBreak: "keep-all",
    }}>
      <button type="button" onClick={close} aria-label="안내 닫기" style={{
        position: "absolute", top: 8, right: 10, border: 0, background: "transparent", fontSize: 20, color: "#4b6b57", cursor: "pointer",
      }}>×</button>
      <p style={{ margin: "0 24px 10px 0" }}>
        <b style={{ color: "#1e7a46" }}>✓ 상담 신청서가 접수됐습니다.</b> 열린 카카오톡 채팅창에 <b>붙여넣기</b> → 보내기를 누르시면
        위드에스마케팅이 바로 이어서 안내드립니다.
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        <a href={KAKAO_CHAT} target="_blank" rel="noopener noreferrer"
           data-track="cta_click" data-category="consult" data-label="sent_kakao_reopen"
           style={{ background: "#fee500", color: "#191600", fontWeight: 800, padding: "9px 14px", borderRadius: 10, textDecoration: "none" }}>
          카카오톡 다시 열기
        </a>
        <button type="button" onClick={async () => setCopied((await copyText(msg)) ? "ok" : "fail")} style={{
          background: "#fff", color: "#1a2547", border: "1.5px solid #b9dfc7", fontWeight: 700, padding: "8px 14px", borderRadius: 10, cursor: "pointer", fontSize: 15,
        }}>
          {copied === "ok" ? "복사했습니다 ✓" : copied === "fail" ? "복사가 막혔어요 — 아래 내용을 길게 눌러 복사" : "다시 복사"}
        </button>
        <button type="button" onClick={() => setShow((v) => !v)} aria-expanded={show} style={{
          background: "#fff", color: "#1a2547", border: "1.5px solid #b9dfc7", fontWeight: 700, padding: "8px 14px", borderRadius: 10, cursor: "pointer", fontSize: 15,
        }}>
          {show ? "내용 접기" : "보낼 내용 보기"}
        </button>
      </div>
      {(show || copied === "fail") && (
        <pre style={{
          margin: "12px 0 0", whiteSpace: "pre-wrap", font: "inherit", fontSize: 14, background: "#fff",
          border: "1px solid #b9dfc7", borderRadius: 10, padding: "12px 14px", color: "#3a3f4b", maxHeight: 220, overflow: "auto",
          userSelect: "all",
        }}>{msg}</pre>
      )}
    </div>
  );
}
