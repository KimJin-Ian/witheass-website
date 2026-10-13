"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { KAKAO_CHAT, KAKAO_PATH } from "@/lib/links";
import s from "../home.module.css";

/**
 * 출판 상담 신청서 — 첫 화면(/)의 주인공
 *
 * "출판 상담 신청하기" 를 누르면 한 번에:
 *   ① 신청서를 /api/lead 로 저장한다 (admin "상담 신청 DB" 에 쌓인다) — 손님이 카톡에 안 보내도 신청은 남는다
 *   ② 답변을 한 덩어리 글로 복사한다
 *   ③ 위드에스마케팅 카카오톡 채팅방을 새 창으로 연다 → 손님은 붙여넣기 · 보내기만 하면 된다
 *   ④ 이 창은 About us(예전 메인)로 넘어가고, 거기서 "다시 복사 · 카톡 다시 열기" 안내가 뜬다
 *
 * 카톡 채팅창에 글을 자동으로 넣는 방법은 없다 — 카카오가 다른 사이트의 입력을 막아둔다.
 * 그래서 복사 → 붙여넣기다.
 *
 * ②③ 은 클릭 안에서 **기다리지 않고** 바로 한다. 저장 응답을 기다린 뒤 창을 열면
 * 아이폰 사파리가 팝업으로 보고 막는다. 저장은 keepalive 로 보내 페이지를 옮겨도 끝까지 간다.
 */

export const SENT_KEY = "witheass_consult_sent";

const REASONS = [
  "전문가로서 신뢰도와 브랜드를 높이고 싶어서",
  "사업·병원·회사를 홍보하고 싶어서",
  "강연·언론·새로운 사업 기회를 만들고 싶어서",
  "나의 경험과 인생을 기록하고 싶어서",
  "작가라는 꿈을 이루고 싶어서",
];
const WORRIES = [
  "글을 잘 쓰지 못해서",
  "책을 쓸 시간이 부족해서",
  "무엇부터 시작해야 할지 몰라서",
  "출판 비용이 부담되어서",
  "출간 후 판매와 홍보가 걱정되어서",
];
const PACKAGES = [
  { key: "300", price: "300만원", name: "기본 출판", for: "완성된 원고가 있는 분 (원고 작성 · 인터뷰 불포함)", inc: "편집 · 디자인 · 인쇄 500부 포함" },
  { key: "900", price: "900만원", name: "원고 작성부터 출판까지", for: "원고가 없어도 출판 가능, 인터뷰만 하면 올인원", inc: "책 기획 · 인터뷰 · 원고 작성 · 편집 · 디자인 · 인쇄 500부 포함" },
  { key: "2000", price: "2,000만원", name: "출판부터 마케팅까지", for: "책 출판과 저자 브랜딩을 한 번에", inc: "원고 작성 · 출판 · 검색 노출 · SNS 홍보 · 언론 기사 · 강연 등 마케팅 확장" },
  { key: "etc", price: "기타", name: "맞춤 견적 상담", for: "희망 예산 및 필요한 서비스 직접 입력", inc: "" },
];
const OTHER = "기타";

/** 010-1234-5678 모양으로 */
function formatPhone(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length < 4) return d;
  if (d.length < 8) return `${d.slice(0, 3)}-${d.slice(3)}`;
  return `${d.slice(0, 3)}-${d.slice(3, d.length - 4)}-${d.slice(-4)}`;
}

/**
 * 복사 — 클릭 안에서 **동기로** 먼저 시도한다 (카톡 창이 열리면 이 창이 포커스를 잃어 복사가 막힌다).
 * 막히면 클립보드 API 로 한 번 더. async 함수지만 첫 await 전까지는 클릭 안에서 바로 돈다.
 */
export async function copyText(text: string): Promise<boolean> {
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.cssText = "position:fixed;top:-1000px;opacity:0";
    document.body.appendChild(ta);
    ta.select();
    ta.setSelectionRange(0, text.length);
    const ok = document.execCommand("copy");
    ta.remove();
    if (ok) return true;
  } catch { /* 아래로 */ }
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

export default function ConsultForm() {
  const router = useRouter();
  const [reasons, setReasons] = useState<string[]>([]);
  const [reasonOther, setReasonOther] = useState("");
  const [worries, setWorries] = useState<string[]>([]);
  const [worryOther, setWorryOther] = useState("");
  const [pkg, setPkg] = useState("");
  const [pkgOther, setPkgOther] = useState("");
  const [memo, setMemo] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [hp, setHp] = useState(""); // 로봇만 채우는 숨은 칸
  const [utm, setUtm] = useState<Record<string, string>>({});
  const [err, setErr] = useState("");

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

  const toggle = (list: string[], set: (v: string[]) => void, v: string) =>
    set(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

  const withOther = (list: string[], other: string) =>
    list.map((v) => (v === OTHER ? (other.trim() ? `기타(${other.trim()})` : "기타") : v));

  const pkgLabel = () => {
    const p = PACKAGES.find((x) => x.key === pkg);
    if (!p) return "";
    if (p.key === "etc") return `기타 · 맞춤 견적${pkgOther.trim() ? ` (${pkgOther.trim()})` : ""}`;
    return `${p.price} | ${p.name}`;
  };

  function compose() {
    return [
      "[드림위드에스 출판 상담 신청]",
      "",
      `■ 책을 쓰고 싶은 이유: ${withOther(reasons, reasonOther).join(", ") || "선택 안 함"}`,
      `■ 걱정되는 점: ${withOther(worries, worryOther).join(", ") || "선택 안 함"}`,
      `■ 희망 패키지: ${pkgLabel() || "선택 안 함"}`,
      `■ 요청사항: ${memo.trim() || "없음"}`,
      "",
      `■ 성함: ${name.trim()}`,
      `■ 전화번호: ${formatPhone(phone)}`,
      `■ 이메일: ${email.trim() || "없음"}`,
      "",
      "(개인정보 수집·이용에 동의했습니다)",
    ].join("\n");
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    if (!name.trim()) return setErr("성함을 적어주세요.");
    if (phone.replace(/\D/g, "").length < 9) return setErr("전화번호를 정확히 적어주세요.");
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return setErr("이메일 주소를 확인해주세요.");
    if (!consent) return setErr("개인정보 수집 · 이용에 동의해 주세요.");

    const msg = compose();
    void copyText(msg); // ② — 동기 부분이 여기서 바로 돈다

    try { sessionStorage.setItem(SENT_KEY, msg); } catch { /* 안내 띠만 못 띄운다 */ }

    // ① 저장 — 기다리지 않는다. keepalive 라 페이지를 옮겨도 끝까지 간다
    fetch("/api/lead", {
      method: "POST",
      keepalive: true,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source: "home",
        name: name.trim(),
        phone,
        email: email.trim(),
        reasons: withOther(reasons, reasonOther),
        worries: withOther(worries, worryOther),
        package: pkgLabel(),
        message: memo.trim(),
        consent: true,
        company_website: hp,
        ...utm,
        referrer: document.referrer || null,
        pageUrl: window.location.href.slice(0, 500),
      }),
    }).catch(() => { /* 카톡으로도 오므로 여기서 막지 않는다 */ });
    (window as any).gtag?.("event", "generate_lead", { event_category: "home", event_label: "home_consult" });

    // ③ 카톡 — 팝업이 막히면 이 창에서 연다 (인앱 브라우저 등)
    const w = window.open(KAKAO_CHAT, "_blank");
    if (!w) {
      window.location.href = KAKAO_CHAT;
      return;
    }
    try { w.opener = null; } catch { /* 무시 */ }

    // ④ 이 창은 About us 로
    router.push("/about?sent=1");
  }

  return (
    <form className={s.sheet} onSubmit={submit} noValidate>
      <p className={s.sheetEyebrow}>CONSULTATION</p>
      <h2 className={s.sheetTitle}>드림위드에스 출판 상담 신청서</h2>
      <p className={s.slogan}>당신의 이야기가 한 권의 책이 됩니다.</p>
      <p className={s.intro}>글을 직접 쓰지 못해도 괜찮습니다. 출판 목적과 예산에 맞는 가장 적합한 방법을 안내해 드립니다.</p>

      <fieldset>
        <legend><span className={s.q}><b>1</b>책을 쓰고 싶은 이유는 무엇인가요?</span><small>복수 선택 가능</small></legend>
        <div className={s.chips}>
          {[...REASONS, OTHER].map((v) => (
            <label key={v} className={`${s.chip} ${reasons.includes(v) ? s.on : ""}`}>
              <input type="checkbox" checked={reasons.includes(v)} onChange={() => toggle(reasons, setReasons, v)} />
              <span className={s.box} aria-hidden="true" />
              {v === OTHER ? "기타 (직접 입력)" : v.replace(/·/g, " · ")}
            </label>
          ))}
          {reasons.includes(OTHER) && (
            <input className={s.other} value={reasonOther} onChange={(e) => setReasonOther(e.target.value.slice(0, 100))}
                   placeholder="직접 적어주세요" aria-label="책을 쓰고 싶은 이유 — 기타" autoFocus />
          )}
        </div>
      </fieldset>

      <fieldset>
        <legend><span className={s.q}><b>2</b>출판에서 가장 걱정되는 점은 무엇인가요?</span><small>복수 선택 가능</small></legend>
        <div className={s.chips}>
          {[...WORRIES, OTHER].map((v) => (
            <label key={v} className={`${s.chip} ${worries.includes(v) ? s.on : ""}`}>
              <input type="checkbox" checked={worries.includes(v)} onChange={() => toggle(worries, setWorries, v)} />
              <span className={s.box} aria-hidden="true" />
              {v === OTHER ? "기타 (직접 입력)" : v}
            </label>
          ))}
          {worries.includes(OTHER) && (
            <input className={s.other} value={worryOther} onChange={(e) => setWorryOther(e.target.value.slice(0, 100))}
                   placeholder="직접 적어주세요" aria-label="걱정되는 점 — 기타" autoFocus />
          )}
        </div>
      </fieldset>

      <fieldset>
        <legend><span className={s.q}><b>3</b>희망하는 출판 패키지를 선택해 주세요.</span><small>1개 선택</small></legend>
        <div className={s.pkgs}>
          {PACKAGES.map((p) => (
            <label key={p.key} className={`${s.chip} ${s.pkg} ${pkg === p.key ? s.on : ""}`}>
              <input type="radio" name="pkg" checked={pkg === p.key} onChange={() => setPkg(p.key)} />
              <span className={`${s.box} ${s.radio}`} aria-hidden="true" />
              <span className={s.price}>{p.price}<small>{p.name}</small></span>
              <span className={s.for}>{p.for}</span>
              {p.inc && <span className={s.inc}>{p.inc}</span>}
              {p.key === "etc" && pkg === "etc" && (
                <input className={s.other} value={pkgOther} onChange={(e) => setPkgOther(e.target.value.slice(0, 120))}
                       placeholder="예) 예산 500만원, 전자책만" aria-label="맞춤 견적 — 희망 예산과 서비스" />
              )}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend><span className={s.q}><b>4</b>기타 요청사항</span><small>선택</small></legend>
        <p className={s.help}>희망 출간 시기, 보유 원고, 책 주제 등 자유롭게 작성해 주세요.</p>
        <textarea className={s.input} value={memo} onChange={(e) => setMemo(e.target.value.slice(0, 1500))} rows={4}
                  placeholder="예) 내년 봄 출간 희망 · 강의 자료가 조금 있습니다 · 20년 진료 경험을 담고 싶어요" aria-label="기타 요청사항" />
      </fieldset>

      <fieldset>
        <legend><span className={s.q}><b>5</b>연락처 정보</span></legend>
        <div className={s.row2}>
          <label className={s.field}>
            <span>성함 <em>(필수)</em></span>
            <input className={s.input} value={name} onChange={(e) => setName(e.target.value.slice(0, 40))} autoComplete="name" placeholder="홍길동" />
          </label>
          <label className={s.field}>
            <span>전화번호 <em>(필수)</em></span>
            <input className={s.input} value={phone} onChange={(e) => setPhone(formatPhone(e.target.value))}
                   inputMode="tel" autoComplete="tel" placeholder="010-0000-0000" />
          </label>
        </div>
        <label className={s.field}>
          <span>이메일 주소 <small>(선택)</small></span>
          <input className={s.input} type="email" value={email} onChange={(e) => setEmail(e.target.value.slice(0, 80))}
                 autoComplete="email" placeholder="name@example.com" />
        </label>
        <p className={s.useNote}>입력하신 연락처는 출판 상담 및 견적 안내 목적으로 사용됩니다.</p>
      </fieldset>

      {/* 사람 눈에는 안 보이는 칸 — 로봇만 채운다 */}
      <input className={s.hp} tabIndex={-1} autoComplete="off" aria-hidden="true"
             value={hp} onChange={(e) => setHp(e.target.value)} name="company_website" />

      <fieldset>
        <legend><span className={s.q}><b>6</b>개인정보 수집 · 이용 동의</span></legend>
        <dl className={s.privacy}>
          <div><dt>수집 항목</dt><dd>성함, 전화번호, 이메일 주소(입력 시), 상담 신청 내용</dd></div>
          <div><dt>이용 목적</dt><dd>출판 상담, 견적 안내 및 상담 관련 연락</dd></div>
          <div><dt>보유 기간</dt><dd>수집일로부터 3개월 또는 상담 종료 시까지 (이후 지체 없이 파기)</dd></div>
          <div><dt>거부 권리</dt><dd>동의하지 않으실 수 있으며, 이 경우 상담 신청이 어렵습니다</dd></div>
        </dl>
        <div className={s.chips}>
          <label className={`${s.chip} ${consent ? s.on : ""}`}>
            <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
            <span className={s.box} aria-hidden="true" />
            <span>개인정보 수집 · 이용에 동의합니다. <em className={s.req}>(필수)</em></span>
          </label>
        </div>
      </fieldset>

      {err && <p className={s.err} role="alert">{err}</p>}
      <button type="submit" className={s.submit}
              data-track="cta_click" data-category="consult" data-label="home_consult_submit">
        출판 상담 신청하기
      </button>
      <p className={s.submitNote}>
        <svg className={s.kk} viewBox="0 0 24 24" aria-hidden="true"><path fill="#3c1e1e" d={KAKAO_PATH} /></svg>
        <span>누르면 작성하신 내용이 복사되고 카카오톡 <b>위드에스마케팅</b> 채팅방이 열립니다. 채팅창에 <b>붙여넣기</b>만 하시면 접수됩니다.</span>
      </p>
    </form>
  );
}

