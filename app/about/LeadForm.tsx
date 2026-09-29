"use client";

import { useEffect, useState } from "react";
import s from "./about.module.css";

/**
 * 상담 신청 폼 — /api/lead 로 보낸다 (Supabase leads 표, 방문자는 쓰기만 된다)
 *
 * 광고로 들어온 사람이 어느 광고에서 왔는지 같이 남긴다 (utm_*).
 * 로봇이 채우는 숨은 칸(company_website)이 차 있으면 서버가 조용히 버린다.
 */

const TIMES = ["언제든 괜찮아요", "오전 (9~12시)", "오후 (12~18시)", "저녁 (18시 이후)"];
const MANUSCRIPT = ["아직 없어요", "조금 써둔 게 있어요", "거의 다 썼어요"];

/** 010-1234-5678 모양으로 */
function formatPhone(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length < 4) return d;
  if (d.length < 8) return `${d.slice(0, 3)}-${d.slice(3)}`;
  return `${d.slice(0, 3)}-${d.slice(3, d.length - 4)}-${d.slice(-4)}`;
}

export default function LeadForm() {
  const [f, setF] = useState({
    name: "", field: "", phone: "", contactTime: TIMES[0], manuscript: MANUSCRIPT[0], message: "",
    consent: false, company_website: "",
  });
  const [utm, setUtm] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const u: Record<string, string> = {};
    for (const k of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]) {
      const v = q.get(k);
      if (v) u[k] = v.slice(0, 200);
    }
    // 광고로 들어와 페이지를 옮겨 다녀도 잃지 않게 이번 방문 동안 기억한다
    try {
      if (Object.keys(u).length) sessionStorage.setItem("witheass_utm", JSON.stringify(u));
      else Object.assign(u, JSON.parse(sessionStorage.getItem("witheass_utm") || "{}"));
    } catch { /* 저장소를 못 쓰면 이번 주소의 것만 */ }
    setUtm(u);
  }, []);

  const set = (k: keyof typeof f, v: any) => setF((p) => ({ ...p, [k]: v }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    if (!f.name.trim()) return setErr("성함을 적어주세요.");
    if (f.phone.replace(/\D/g, "").length < 9) return setErr("연락처를 정확히 적어주세요.");
    if (!f.consent) return setErr("개인정보 수집 및 이용에 동의해주세요.");
    setBusy(true);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...f, ...utm,
          referrer: document.referrer || null,
          pageUrl: window.location.href.slice(0, 500),
          source: "about",
        }),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(j.error || "접수하지 못했습니다. 잠시 후 다시 시도해주세요.");
      setDone(true);
      // GA 가 있으면 전환으로 남긴다
      (window as any).gtag?.("event", "generate_lead", { event_category: "about", event_label: "about_lead" });
    } catch (e: any) {
      setErr(e.message);
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <div className={s.form} role="status">
        <p className={s.doneTitle}>상담 신청이 접수되었습니다</p>
        <p className={s.doneBody}>
          {f.name.trim()}님, 남겨주셔서 감사합니다.
          <br />
          {f.contactTime === TIMES[0] ? "빠른 시간 안에" : `${f.contactTime.split(" ")[0]}에`} {formatPhone(f.phone)} 로 연락드리겠습니다.
        </p>
        <a className={s.submit} href="http://pf.kakao.com/_QkZhd" target="_blank" rel="noopener noreferrer">
          카카오톡으로 먼저 이야기하기
        </a>
      </div>
    );
  }

  return (
    <form className={s.form} onSubmit={submit} noValidate>
      <div className={s.row2}>
        <label className={s.field}>
          <span>성함 <em>*</em></span>
          <input value={f.name} onChange={(e) => set("name", e.target.value.slice(0, 40))} autoComplete="name" placeholder="홍길동" required />
        </label>
        <label className={s.field}>
          <span>분야 · 직업</span>
          <input value={f.field} onChange={(e) => set("field", e.target.value.slice(0, 60))} placeholder="예) 변호사, 병원장, 회사 대표" />
        </label>
      </div>
      <label className={s.field}>
        <span>연락처 <em>*</em></span>
        <input value={f.phone} onChange={(e) => set("phone", formatPhone(e.target.value))}
               inputMode="tel" autoComplete="tel" placeholder="010-0000-0000" required />
      </label>
      <div className={s.row2}>
        <label className={s.field}>
          <span>연락 가능한 시간</span>
          <select value={f.contactTime} onChange={(e) => set("contactTime", e.target.value)}>
            {TIMES.map((t) => <option key={t}>{t}</option>)}
          </select>
        </label>
        <label className={s.field}>
          <span>원고</span>
          <select value={f.manuscript} onChange={(e) => set("manuscript", e.target.value)}>
            {MANUSCRIPT.map((t) => <option key={t}>{t}</option>)}
          </select>
        </label>
      </div>
      <label className={s.field}>
        <span>책으로 남기고 싶은 이야기 <small>(선택)</small></span>
        <textarea value={f.message} onChange={(e) => set("message", e.target.value.slice(0, 2000))} rows={3}
                  placeholder="예) 20년 동안 환자분들께 드린 설명을 책으로 남기고 싶어요" />
      </label>

      {/* 사람 눈에는 안 보이는 칸 — 로봇만 채운다 */}
      <input className={s.hp} tabIndex={-1} autoComplete="off" aria-hidden="true"
             value={f.company_website} onChange={(e) => set("company_website", e.target.value)} name="company_website" />

      <details className={s.consentBox}>
        <summary>개인정보 수집 및 이용 안내</summary>
        <p>입력해주신 정보는 출판 상담 외 다른 목적으로 사용되지 않습니다.</p>
        <p><b>■ 수집 항목</b> 성함, 분야 · 직업, 연락처, 연락 가능한 시간, 원고 상태, 문의 내용</p>
        <p><b>■ 수집 및 이용 목적</b> 출판 상담 및 서비스 안내</p>
        <p><b>■ 보유 및 이용 기간</b> 수집일로부터 3개월 또는 상담 종료 시까지 (이후 지체 없이 파기)</p>
        <p><b>■ 동의 거부 권리</b> 동의를 거부하실 수 있으며, 거부하시면 상담 신청이 제한됩니다.</p>
      </details>
      <label className={s.consent}>
        <input type="checkbox" checked={f.consent} onChange={(e) => set("consent", e.target.checked)} />
        개인정보 수집 및 이용에 동의합니다. <em>*</em>
      </label>

      {err && <p className={s.err} role="alert">{err}</p>}
      <button type="submit" className={s.submit} disabled={busy}
              data-track="cta_click" data-category="about" data-label="about_lead_submit">
        {busy ? "접수 중…" : "무료 상담 신청하기"}
      </button>
    </form>
  );
}
