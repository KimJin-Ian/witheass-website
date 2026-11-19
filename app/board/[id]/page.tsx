import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import { currentMember, getPost } from "@/lib/board";
import { bt, fmtDate } from "@/lib/board-i18n";
import { LANG, SITE_URL, TopBar } from "../BoardParts";
import { DeleteButton } from "../BoardClient";
import s from "../board.module.css";

/** /board/[id] — 글 읽기. 내 글이면 삭제 단추가 보인다. 본문은 글자로만 보여 준다 (HTML 로 해석하지 않음) */
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const post = await getPost(Number(params.id)).catch(() => null);
  if (!post) return { title: bt(LANG, "notFound"), robots: { index: false } };
  return {
    title: `${post.title} — 게시판`,
    description: String(post.body ?? "").replace(/\s+/g, " ").slice(0, 140),
    alternates: { canonical: `${SITE_URL}/board/${post.id}` },
  };
}

export default async function PostPage({ params }: { params: { id: string } }) {
  const post = await getPost(Number(params.id)).catch(() => null);
  if (!post) notFound();
  const me = await currentMember();
  const mine = !!me && me.id === post.member_id;

  return (
    <>
      <SiteHeader />
      <main id="main-content" className={s.wrap}>
        <div className="container">
          <div className={s.head}>
            <a href="/board" className={s.sub}>← {bt(LANG, "board")}</a>
            <TopBar me={me} />
          </div>
          <article className={s.article}>
            <h1 className={s.aTitle}>{post.title}</h1>
            <div className={s.meta}>{bt(LANG, "author")} {post.username} · {fmtDate(post.created_at, LANG)}</div>
            <div className={s.text}>{post.body}</div>
          </article>
          <div className={s.actions}>
            <a className={s.ghost} href="/board">{bt(LANG, "list")}</a>
            {mine && <DeleteButton lang={LANG} id={post.id} />}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
