/**
 * 상담 신청 받기 — 첫 화면(/) 상담 신청서 (2026-10-13 개편 전에는 About us 폼)
 *
 * 새 신청서 칸: 책을 쓰는 이유 · 걱정되는 점(여러 개) · 희망 패키지 · 이메일 · 요청사항.
 * 이유 · 걱정은 answers(jsonb), 패키지 · 이메일은 칸을 따로 둔다 (witheass-admin/supabase/leads-form-v2.sql).
 * 그 SQL 을 돌리기 전에는 칸이 없어서 넣기가 실패한다 — 그때는 같은 내용을 요청사항(message)에
 * 글로 붙여 다시 넣는다. 신청이 사라지는 것보다 한 칸에 몰려 있는 편이 낫다.
 *
 * Supabase leads 표에 넣는다. 방문자 키(anon)로는 넣기만 되고 읽을 수 없다
 * (RLS — witheass-admin/supabase/leads-schema.sql). 관리자는 admin 의 "상담 신청 DB" 에서 본다.
 *
 * 걸러내는 것
 *   숨은 칸(company_website)이 차 있으면 로봇 — 성공한 척 하고 버린다
 *   같은 연락처 5분 안 · 같은 곳 10분에 5건 초과 — DB 가 막는다 (leads_guard)
 * IP 는 원문을 남기지 않고 해시만 남긴다.
 */

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createHash } from "node:crypto";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const SITE_KEY = "witheass" as const;
const cut = (v: unknown, n: number) => (typeof v === "string" && v.trim() ? v.trim().slice(0, n) : null);
const list = (v: unknown, n: number) =>
  (Array.isArray(v) ? v : []).map((x) => cut(x, 120)).filter((x): x is string => !!x).slice(0, n);
/** "칸이 없다" — 새 칸 SQL 을 아직 안 돌렸다 */
const missingColumn = (msg: string) => /column .* does not exist|Could not find the '.*' column/i.test(msg);

export async function POST(req: Request) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    return NextResponse.json({ error: "지금은 접수할 수 없습니다. 전화(010-2068-0817)나 카카오톡으로 문의해주세요." }, { status: 503 });
  }

  let b: any;
  try { b = await req.json(); } catch { return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 }); }

  // 로봇 — 조용히 성공한 척
  if (typeof b.company_website === "string" && b.company_website.trim()) {
    return NextResponse.json({ ok: true });
  }

  const name = cut(b.name, 40);
  const digits = String(b.phone ?? "").replace(/\D/g, "");
  if (!name) return NextResponse.json({ error: "성함을 적어주세요." }, { status: 400 });
  if (digits.length < 9 || digits.length > 11) return NextResponse.json({ error: "연락처를 정확히 적어주세요." }, { status: 400 });
  if (b.consent !== true) return NextResponse.json({ error: "개인정보 수집 및 이용에 동의해주세요." }, { status: 400 });
  const phone = digits.length === 11
    ? `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`
    : digits.length === 10 && digits.startsWith("02")
      ? `02-${digits.slice(2, 6)}-${digits.slice(6)}`
      : digits.length === 10
        ? `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`
        : digits;

  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || req.headers.get("x-real-ip") || "";
  const ip_hash = ip ? createHash("sha256").update(`${ip}|witheass-leads`).digest("hex").slice(0, 32) : null;

  const email = cut(b.email, 80);
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "이메일 주소를 확인해주세요." }, { status: 400 });
  }
  const reasons = list(b.reasons, 8);
  const worries = list(b.worries, 8);
  const pkg = cut(b.package, 120);

  const supabase = createClient(url, anonKey, { auth: { persistSession: false, autoRefreshToken: false } });
  const row: Record<string, unknown> = {
    site: SITE_KEY,
    source: cut(b.source, 40) ?? "about",
    name,
    field: cut(b.field, 60),
    phone,
    contact_time: cut(b.contactTime, 40),
    manuscript: cut(b.manuscript, 40),
    message: cut(b.message, 2000),
    consent: true,
    utm_source: cut(b.utm_source, 200),
    utm_medium: cut(b.utm_medium, 200),
    utm_campaign: cut(b.utm_campaign, 200),
    utm_content: cut(b.utm_content, 200),
    utm_term: cut(b.utm_term, 200),
    referrer: cut(b.referrer, 500),
    page_url: cut(b.pageUrl, 500),
    user_agent: cut(req.headers.get("user-agent"), 300),
    ip_hash,
  };
  const extra = {
    email,
    package: pkg,
    answers: reasons.length || worries.length ? { reasons, worries } : null,
  };

  // 넣기만 한다 — 방문자 키로는 읽을 수 없으니 넣은 행을 돌려받지 않는다
  let { error } = await supabase.from("leads").insert({ ...row, ...extra } as any);
  if (error && missingColumn(String(error.message ?? ""))) {
    // 새 칸이 아직 없다 — 같은 내용을 요청사항 앞에 글로 붙여 넣는다
    const folded = [
      reasons.length ? `[책을 쓰는 이유] ${reasons.join(", ")}` : "",
      worries.length ? `[걱정되는 점] ${worries.join(", ")}` : "",
      pkg ? `[희망 패키지] ${pkg}` : "",
      email ? `[이메일] ${email}` : "",
      row.message ? `[요청사항] ${row.message}` : "",
    ].filter(Boolean).join("\n");
    ({ error } = await supabase.from("leads").insert({ ...row, message: folded.slice(0, 2000) || null } as any));
  }

  if (error) {
    const msg = String(error.message ?? "");
    // 같은 번호로 방금 들어온 신청 — 두 번 누른 것이다. 접수된 것으로 본다
    if (msg.includes("duplicate_lead")) return NextResponse.json({ ok: true, duplicate: true });
    if (msg.includes("too_many_leads")) {
      return NextResponse.json({ error: "잠시 후 다시 시도해주세요. 급하시면 전화(010-2068-0817)로 연락주세요." }, { status: 429 });
    }
    console.error("[/api/lead] insert error:", error);
    return NextResponse.json({ error: "접수하지 못했습니다. 전화(010-2068-0817)나 카카오톡으로 문의해주세요." }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
