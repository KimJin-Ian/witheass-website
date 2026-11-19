"use client";

import { useState } from "react";
import { bt, type BoardKey } from "@/lib/board-i18n";
import s from "./board.module.css";

/** 게시판 화면의 손으로 누르는 부분 — 가입 · 로그인 폼, 글쓰기 폼, 삭제 · 로그아웃 단추 */

async function send(url: string, method: string, body?: any): Promise<{ ok?: boolean; error?: string; id?: number }> {
  try {
    const r = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: body ? JSON.stringify(body) : undefined });
    return await r.json().catch(() => ({ error: "err_server" }));
  } catch {
    return { error: "err_server" };
  }
}
const msg = (lang: string, e?: string) => (e ? bt(lang, e as BoardKey) : "");

export function AuthForm({ lang, mode, next }: { lang: string; mode: "login" | "signup"; next: string }) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const signup = mode === "signup";
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setBusy(true); setErr("");
    const r = await send(`/api/board/${mode}`, "POST", Object.fromEntries(f.entries()));
    setBusy(false);
    if (r.ok) { window.location.href = next; return; }
    setErr(msg(lang, r.error ?? "err_server"));
  };
  return (
    <form className={s.card} onSubmit={submit}>
      <h2 className={s.cardTitle}>{bt(lang, signup ? "signup" : "login")}</h2>
      <label className={s.field}>
        <span>{bt(lang, "username")}</span>
        <input name="username" autoComplete="username" required minLength={4} maxLength={20} pattern="[a-zA-Z0-9_]{4,20}"
               autoCapitalize="none" spellCheck={false} />
        {signup && <small>{bt(lang, "usernameHint")}</small>}
      </label>
      <label className={s.field}>
        <span>{bt(lang, "password")}</span>
        <input name="password" type="password" autoComplete={signup ? "new-password" : "current-password"} required minLength={signup ? 8 : 1} maxLength={72} />
        {signup && <small>{bt(lang, "passwordHint")}</small>}
      </label>
      {signup && (
        <label className={s.field}>
          <span>{bt(lang, "password2")}</span>
          <input name="password2" type="password" autoComplete="new-password" required minLength={8} maxLength={72} />
        </label>
      )}
      {/* 로봇만 채우는 칸 — 사람에게는 보이지 않는다 */}
      {signup && <input name="website" tabIndex={-1} autoComplete="off" className={s.hp} aria-hidden="true" />}
      {signup && <p className={s.note}>{bt(lang, "signupNote")}</p>}
      {err && <p className={s.err} role="alert">{err}</p>}
      <button className={s.primary} disabled={busy}>{busy ? "…" : bt(lang, signup ? "signup" : "login")}</button>
      <p className={s.switch}>
        {bt(lang, signup ? "haveAccount" : "noAccount")}{" "}
        <a href={`/board/${signup ? "login" : "signup"}?next=${encodeURIComponent(next)}`}>{bt(lang, signup ? "login" : "signup")}</a>
      </p>
    </form>
  );
}

export function WriteForm({ lang }: { lang: string }) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true); setErr("");
    const r = await send("/api/board/posts", "POST", { title, body });
    setBusy(false);
    if (r.ok && r.id) { window.location.href = `/board/${r.id}`; return; }
    if (r.error === "needLogin") { window.location.href = `/board/login?next=${encodeURIComponent(`/board/write`)}`; return; }
    setErr(msg(lang, r.error ?? "err_server"));
  };
  return (
    <form className={s.card} onSubmit={submit}>
      <label className={s.field}>
        <span>{bt(lang, "title")}</span>
        <input value={title} onChange={(e) => setTitle(e.target.value)} required maxLength={100} />
      </label>
      <label className={s.field}>
        <span>{bt(lang, "body")}</span>
        <textarea value={body} onChange={(e) => setBody(e.target.value)} required maxLength={5000} rows={12} />
        <small className={s.count}>{body.length.toLocaleString()} / 5,000</small>
      </label>
      {err && <p className={s.err} role="alert">{err}</p>}
      <div className={s.actions}>
        <a className={s.ghost} href={`/board`}>{bt(lang, "list")}</a>
        <button className={s.primary} disabled={busy}>{busy ? "…" : bt(lang, "submit")}</button>
      </div>
    </form>
  );
}

export function DeleteButton({ lang, id }: { lang: string; id: number }) {
  const [busy, setBusy] = useState(false);
  const del = async () => {
    if (!confirm(bt(lang, "deleteConfirm"))) return;
    setBusy(true);
    const r = await send(`/api/board/posts/${id}`, "DELETE");
    setBusy(false);
    if (r.ok) window.location.href = `/board`;
    else alert(msg(lang, r.error ?? "err_server"));
  };
  return <button className={s.danger} onClick={del} disabled={busy}>{bt(lang, "delete")}</button>;
}

export function LogoutButton({ lang }: { lang: string }) {
  return (
    <button className={s.link} onClick={async () => { await send("/api/board/logout", "POST"); window.location.href = `/board`; }}>
      {bt(lang, "logout")}
    </button>
  );
}
