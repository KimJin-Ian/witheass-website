"use client";

import { useEffect, useState } from "react";
import { KAKAO_CHAT, KAKAO_PATH } from "@/lib/links";
import { copyText } from "../components/ConsultForm";
import h from "../home.module.css";
import p from "./professional.module.css";

/**
 * 전문직 전문 패키지 — 5분 전화 진단 신청서 (2026-11-09 대표님 요청)
 *
 * 첫 화면 신청서와 달리 짧다: 성함 · 연락처 · 이메일(선택) · 업종 · 원고 상태 · 통화 시간.
 * /api/lead 로 저장한다 (admin "상담 신청 DB"). 업종 · 원고 · 통화 시간은 leads 표에 이미 있는 칸을 쓴다.
 * 저장이 끝난 것을 확인한 뒤에만 "접수되었습니다" 를 띄운다. 실패하면 전화 · 카톡을 안내한다.
 */

const PACKAGE_LABEL = "1,500만원 | 전문직 전문 패키지";
const FIELDS = ["의사 · 병원", "변호사", "세무사 · 회계사", "컨설턴트", "CEO · 기업 대표"];
const MANUSCRIPTS = ["완성 원고가 있습니다", "강의안 · 칼럼 등 자료가 있습니다", "아직 아무것도 없습니다"];
const TIMES = ["오전 9시 이전", "오전", "오후", "오후 6시 이후"];
const OTHER = "기타";

/** 010-1234-5678 모양으로 */
function formatPhone(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length < 4) return d;
  if (d.length < 8) return `${d.slice(0, 3)}-${d.slice(3)}`;
  return `${d.slice(0, 3)}-${d.slice(3, d.length - 4)}-${d.slice(-4)}`;
}

function KakaoIcon() {
  return (
    <svg className={h.kk} viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d={KAKAO_PATH} />
    </svg>
  );
}

export default function ProForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [field, setField] = useState("");
  const [fieldOther, setFieldOther] = useState("");
  const [manuscript, setManuscript] = useState("");
  const [time, setTime] = useState("");
  const [consent, setConsent] = useState(false);
  const [hp, setHp] = useState(""); // 로봇만 채우는 숨은 칸
  const [utm, setUtm] = useState<Record<string, string>>({});
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const u: Record<string, string> = {};
    for (const k of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]) {
      const v = q.get(k);
      if (v) u[k] = v.slice(0, 200);
    }
    try {
      if (Object.keys(u).length) sessionStorage.setItem("witheass_utm", JSON.stringify(u));
      else Object.assign(u, JSON.parse(sessionStorage.getItem("witheass_utm") || "{}"));
    } catch { /* 저장소를 못 쓰면 이번 주소의 것만 */ }
    setUtm(u);
  }, []);

  const fieldLabel = () => (field === OTHER ? fieldOther.trim() || OTHER : field);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    setErr("");
    if (!name.trim()) return setErr("성함을 적어주세요.");
    if (phone.replace(/\D/g, "").length < 9) return setErr("휴대전화 번호를 정확히 적어주세요.");
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return setErr("이메일 주소를 확인해주세요.");
    if (!field) return setErr("업종을 골라주세요.");
    if (!manuscript) return setErr("원고 상태를 골라주세요.");
    if (!consent) return setErr("개인정보 수집 · 이용에 동의해 주세요.");

    setBusy(true);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "professional",
          name: name.trim(),
          phone,
          email: email.trim(),
          field: fieldLabel(),
          manuscript,
          contactTime: time,
          package: PACKAGE_LABEL,
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
      (window as any).gtag?.("event", "generate_lead", { event_category: "professional", event_label: "professional_consult" });
      setSent([
        "[전문직 전문 패키지 · 5분 전화 진단 신청]",
        `■ 성함: ${name.trim()}`,
        `■ 연락처: ${formatPhone(phone)}`,
        `■ 업종: ${fieldLabel()}`,
        `■ 원고 상태: ${manuscript}`,
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
        <p className={p.doneBody}>{name.trim()}님, 남겨주신 시간에 맞춰 전화드리겠습니다.<br />먼저 이야기를 나누고 싶으시면 카카오톡으로 이어가셔도 됩니다.</p>
        <a className={h.btnKakao} href={KAKAO_CHAT} target="_blank" rel="noopener noreferrer"
           onClick={() => { void copyText(sent).then(setCopied); }}
           data-track="cta_click" data-category="consult" data-label="professional_done_kakao">
          <KakaoIcon />신청 내용 복사하고 카카오톡 열기
        </a>
        {copied && <p className={p.doneNote}>복사했습니다. 채팅창에 붙여넣어 보내주세요.</p>}
      </div>
    );
  }

  return (
    <form className={h.sheet} onSubmit={submit} noValidate>
      <p className={h.sheetEyebrow}>5-MINUTE CALL</p>
      <h3 className={p.formTitle}>5분 전화 진단 신청</h3>

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
      <label className={h.field}>
        <span>이메일 <small>(선택)</small></span>
        <input className={h.input} type="email" value={email} onChange={(e) => setEmail(e.target.value.slice(0, 80))}
               autoComplete="email" placeholder="name@example.com" />
      </label>

      <fieldset className={p.group}>
        <legend>어떤 일을 하고 계신가요? <em>(필수)</em></legend>
        <div className={p.pills}>
          {[...FIELDS, OTHER].map((v) => (
            <label key={v} className={`${p.opt} ${field === v ? p.optOn : ""}`}>
              <input type="radio" name="field" checked={field === v} onChange={() => setField(v)} />{v}
            </label>
          ))}
        </div>
        {field === OTHER && (
          <input className={`${h.input} ${p.otherInput}`} value={fieldOther} onChange={(e) => setFieldOther(e.target.value.slice(0, 50))}
                 placeholder="업종을 적어주세요 (예: 약사, 건축사)" aria-label="업종 직접 입력" autoFocus />
        )}
      </fieldset>

      <fieldset className={p.group}>
        <legend>지금 원고는 어느 정도 있으신가요? <em>(필수)</em></legend>
        <div className={p.pills}>
          {MANUSCRIPTS.map((v) => (
            <label key={v} className={`${p.opt} ${manuscript === v ? p.optOn : ""}`}>
              <input type="radio" name="manuscript" checked={manuscript === v} onChange={() => setManuscript(v)} />{v}
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

      {/* 사람 눈에는 안 보이는 칸 — 로봇만 채운다 */}
      <input className={h.hp} tabIndex={-1} autoComplete="off" aria-hidden="true"
             value={hp} onChange={(e) => setHp(e.target.value)} name="company_website" />

      <div className={p.consent}>
        <label className={`${h.chip} ${consent ? h.on : ""}`}>
          <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
          <span className={h.box} aria-hidden="true" />
          <span>개인정보 수집 · 이용에 동의합니다. <em className={h.req}>(필수)</em></span>
        </label>
        <p className={p.consentText}>
          수집 항목: 성함, 휴대전화, 이메일(입력 시), 업종, 원고 상태, 통화 가능 시간 · 이용 목적: 출판 상담 및 견적 안내 ·
          보유 기간: 수집일로부터 3개월 또는 상담 종료 시까지. 동의하지 않으실 수 있으며, 이 경우 신청이 어렵습니다.
        </p>
      </div>

      {err && <p className={h.err} role="alert">{err}</p>}
      <button type="submit" className={h.submit} disabled={busy}
              data-track="cta_click" data-category="consult" data-label="professional_submit">
        {busy ? "접수하는 중…" : "5분 전화 진단 신청하기"}
      </button>
    </form>
  );
}
