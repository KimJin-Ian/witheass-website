import type { Metadata } from "next";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import { PAGE_SIZE, currentMember, listPosts, type PostRow } from "@/lib/board";
import { bt, fmtDate } from "@/lib/board-i18n";
import { LANG, SITE_URL, TopBar } from "./BoardParts";
import s from "./board.module.css";

/** /board — 출판사 홈페이지 게시판 목록 (2026-11-19). 누구나 읽고, 글은 로그인한 회원만 쓴다 */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "게시판",
  description: bt(LANG, "boardSub"),
  alternates: { canonical: `${SITE_URL}/board` },
};

export default async function BoardPage({ searchParams }: { searchParams: { p?: string } }) {
  const page = Math.max(1, Math.min(1000, Math.floor(Number(searchParams.p) || 1)));
  const me = await currentMember();
  let rows: PostRow[] = [];
  let total = 0;
  let notReady = false;
  try {
    ({ rows, total } = await listPosts(page));
  } catch (e: any) {
    console.error("board list", e?.message ?? e);
    notReady = true;
  }
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <>
      <SiteHeader />
      <main id="main-content" className={s.wrap}>
        <div className="container">
          <div className={s.head}>
            <div>
              <h1 className={s.h1}>{bt(LANG, "board")}</h1>
              <p className={s.sub}>{bt(LANG, "boardSub")}</p>
            </div>
            <TopBar me={me} write={!notReady} />
          </div>

          {notReady ? (
            <p className={s.empty}>{bt(LANG, "notReady")}</p>
          ) : rows.length === 0 ? (
            <p className={s.empty}>{bt(LANG, "empty")}</p>
          ) : (
            <ul className={s.list}>
              {rows.map((r, i) => (
                <li key={r.id} className={s.row}>
                  <span className={s.no}>{total - (page - 1) * PAGE_SIZE - i}</span>
                  <a href={`/board/${r.id}`}>{r.title}</a>
                  <span className={s.who}>{r.username}</span>
                  <span className={s.when}>{fmtDate(r.created_at, LANG)}</span>
                </li>
              ))}
            </ul>
          )}

          {pages > 1 && (
            <nav className={s.pager} aria-label="쪽">
              {page > 1 ? <a href={`/board?p=${page - 1}`}>{bt(LANG, "prev")}</a> : <span>{bt(LANG, "prev")}</span>}
              <span style={{ opacity: 1, border: 0 }}>{page} / {pages}</span>
              {page < pages ? <a href={`/board?p=${page + 1}`}>{bt(LANG, "next")}</a> : <span>{bt(LANG, "next")}</span>}
            </nav>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
