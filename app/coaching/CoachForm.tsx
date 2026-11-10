"use client";

import { useEffect, useState } from "react";
import { KAKAO_CHAT, KAKAO_PATH } from "@/lib/links";
import { COACHING } from "@/lib/coaching";
import { copyText } from "../components/ConsultForm";
import h from "../home.module.css";
import p from "../professional/professional.module.css";

/**
 * 1:1 책출판 코칭 신청서 (2026-11-10) — 전문직 랜딩 신청서(ProForm)와 같은 모양 · 같은 저장(/api/lead)
 * 과정 · 지금 상태 · 통화 시간은 leads 표의 package · manuscript · contact_time 칸에 들어간다.
 */

const UNSURE = "아직 모르겠어요";
const STAGES = ["주제도 아직 없어요", "주제는 있는데 목차가 없어요", "목차 · 원고가 조금 있어요"];
const TIMES = ["오전 9시 이전", "오전", "오후", "오후 6시 이후"];

function formatPhone(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length < 4) return d;
  if (d.length < 8) return `${d.slice(0, 3)}-${d.slice(3)}`;
  return `${d.slice(0, 3)}-${d.slice(3, d.length - 4)}-${d.slice(-4)}`;
}

export default function CoachForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [program, setProgram] = useState("");
  const [stage, setStage] = useState("");
  const [time, setTime] = useState("");
  const [consent, setConsent] = useState(false);
  const [hp, setHp] = useState("");
  const [utm, setUtm] = useState<Record<string, string>>({});
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // 위쪽 과정 카드의 "이 과정으로 신청" 을 누르면 그 과정이 골라진 채로 내려온다
    const pick = (e: Event) => setProgram((e as CustomEvent<string>).detail);
    window.addEventListener("coach-pick", pick);
    const q = new URLSearchParams(window.location.search);
    const u: Record<string, string> = {};
    for (const k of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]) {
      const v = q.get(k);
      if (v) u[k] = v.slice(0, 200);
    }
    try {
      if (Object.keys(u).length) sessionStorage.setItem("witheass_utm", JSON.stringify(u));
      else Object.assign(u, JSON.parse(sessionStorage.getItem("witheass_utm") || "{}"));
    } catch { /* 이번 주소의 것만 */ }
    setUtm(u);
    return () => window.removeEventListener("coach-pick", pick);
  }, []);

  const programLabel = () => COACHING.find((c) => c.key === program)?.label ?? (program === UNSURE ? "코칭 · 과정 상담 희망" : "");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    setErr("");
    if (!name.trim()) return setErr("성함을 적어주세요.");
    if (phone.replace(/\D/g, "").length < 9) return setErr("휴대전화 번호를 정확히 적어주세요.");
    if (!program) return setErr("희망 과정을 골라주세요.");
    if (!consent) return setErr("개인정보 수집 · 이용에 동의해 주세요.");

    setBusy(true);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "coaching",
          name: name.trim(),
          phone,
          package: programLabel(),
          manuscript: stage,
          contactTime: time,
          consent: true,
          company_website: hp,
          ...utm,
          referrer: document.referrer || null,
          pageUrl: window.location.href.slice(0, 500),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        setErr(data.error || "접수하지 못했습니다. 전화(010-2068-0817)나 카카오톡으로 문의해주세요.");
        return;
      }
      (window as any).gtag?.("event", "generate_lead", { event_category: "coaching", event_label: program });
      setSent([
        "[1:1 책출판 코칭 신청]",
        `■ 성함: ${name.trim()}`,
        `■ 연락처: ${formatPhone(phone)}`,
        `■ 희망 과정: ${programLabel()}`,
        `■ 지금 상태: ${stage || "선택 안 함"}`,
        `■ 통화 편한 시간: ${time || "무관"}`,
      ].join("\n"));
    } catch {
      setErr("접수하지 못했습니다. 전화(010-2068-0817)나 카카오톡으로 문의해주세요.");
    } finally {
      setBusy(false);
    }
  }

  if (sent) {
    return (
      <div className={`${h.sheet} ${p.done}`} role="status">
        <p className={h.sheetEyebrow}>RECEIVED</p>
        <h3 className={p.doneTitle}>신청이 접수되었습니다</h3>
        <p className={p.doneBody}>{name.trim()}님, 남겨주신 시간에 맞춰 연락드리겠습니다.<br />먼저 이야기를 나누고 싶으시면 카카오톡으로 이어가셔도 됩니다.</p>
        <a className={h.btnKakao} href={KAKAO_CHAT} target="_blank" rel="noopener noreferrer"
           onClick={() => { void copyText(sent).then(setCopied); }}
           data-track="cta_click" data-category="consult" data-label="coaching_done_kakao">
          <svg className={h.kk} viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d={KAKAO_PATH} /></svg>
          신청 내용 복사하고 카카오톡 열기
        </a>
        {copied && <p className={p.doneNote}>복사했습니다. 채팅창에 붙여넣어 보내주세요.</p>}
      </div>
    );
  }

  return (
    <form className={h.sheet} onSubmit={submit} noValidate>
      <p className={h.sheetEyebrow}>1:1 COACHING</p>
      <h3 className={p.formTitle}>코칭 상담 신청</h3>

      <div className={h.row2}>
        <label className={h.field}>
          <span>성함 <em>(필수)</em></span>
          <input className={h.input} value={name} onChange={(e) => setName(e.target.value.slice(0, 40))} autoComplete="name" placeholder="홍길동" />
        </label>
        <label className={h.field}>
          <span>휴대전화 <em>(필수)</em></span>
          <input className={h.input} value={phone} onChange={(e) => setPhone(formatPhone(e.target.value))}
                 inputMode="tel" autoComplete="tel" placeholder="010-0000-0000" />
        </label>
      </div>

      <fieldset className={p.group}>
        <legend>희망 과정 <em>(필수)</em></legend>
        <div className={p.pills}>
          {[...COACHING.map((c) => ({ v: c.key, t: `${c.price} · ${c.name.replace("1:1 ", "")}` })), { v: UNSURE, t: UNSURE }].map((o) => (
            <label key={o.v} className={`${p.opt} ${program === o.v ? p.optOn : ""}`}>
              <input type="radio" name="program" checked={program === o.v} onChange={() => setProgram(o.v)} />{o.t}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className={p.group}>
        <legend>지금 어디까지 와 계신가요? <small>(선택)</small></legend>
        <div className={p.pills}>
          {STAGES.map((v) => (
            <label key={v} className={`${p.opt} ${stage === v ? p.optOn : ""}`}>
              <input type="radio" name="stage" checked={stage === v} onChange={() => setStage(v)} />{v}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className={p.group}>
        <legend>통화가 편한 시간 <small>(선택)</small></legend>
        <div className={p.pills}>
          {TIMES.map((v) => (
            <label key={v} className={`${p.opt} ${time === v ? p.optOn : ""}`}>
              <input type="radio" name="time" checked={time === v} onChange={() => setTime(v)} />{v}
            </label>
          ))}
        </div>
      </fieldset>

      <input className={h.hp} tabIndex={-1} autoComplete="off" aria-hidden="true"
             value={hp} onChange={(e) => setHp(e.target.value)} name="company_website" />

      <div className={p.consent}>
        <label className={`${h.chip} ${consent ? h.on : ""}`}>
          <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
          <span className={h.box} aria-hidden="true" />
          <span>개인정보 수집 · 이용에 동의합니다. <em className={h.req}>(필수)</em></span>
        </label>
        <p className={p.consentText}>
          수집 항목: 성함, 휴대전화, 희망 과정, 현재 상태, 통화 가능 시간 · 이용 목적: 코칭 · 출판 상담 및 안내 ·
          보유 기간: 수집일로부터 3개월 또는 상담 종료 시까지. 동의하지 않으실 수 있으며, 이 경우 신청이 어렵습니다.
        </p>
      </div>

      {err && <p className={h.err} role="alert">{err}</p>}
      <button type="submit" className={h.submit} disabled={busy}
              data-track="cta_click" data-category="consult" data-label="coaching_submit">
        {busy ? "접수하는 중…" : "코칭 상담 신청하기"}
      </button>
    </form>
  );
}
