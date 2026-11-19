import { bt } from "@/lib/board-i18n";
import type { Member } from "@/lib/board";
import { LogoutButton } from "./BoardClient";
import s from "./board.module.css";

/** 출판사 게시판 공통 — 한국어 하나 · 로그인 상태 줄 · 돌아갈 주소 검사 (더웰니스앤 게시판과 같은 구조) */
export const SITE_URL = "https://www.bookpublishingwithess.com";
export const LANG = "ko";

/** 로그인 뒤 돌아갈 주소 — 이 사이트의 게시판 안쪽만 허용한다 (다른 사이트로 튀는 주소 막기) */
export function safeNext(next?: string | string[]): string {
  const n = Array.isArray(next) ? next[0] : next;
  return n && n.startsWith("/board") && !n.startsWith("//") ? n : "/board";
}

export function TopBar({ me, write = true }: { me: Member | null; write?: boolean }) {
  const toWrite = me ? "/board/write" : `/board/login?next=${encodeURIComponent("/board/write")}`;
  return (
    <div className={s.bar}>
      {me ? (
        <>
          <span className={s.me}>{bt(LANG, "hello", { name: me.username })}</span>
          <LogoutButton lang={LANG} />
        </>
      ) : (
        <>
          <a href="/board/login">{bt(LANG, "login")}</a>
          <a href="/board/signup">{bt(LANG, "signup")}</a>
        </>
      )}
      {write && <a className={s.primary} href={toWrite}>{bt(LANG, "write")}</a>}
    </div>
  );
}
