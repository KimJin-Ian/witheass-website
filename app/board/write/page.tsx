import type { Metadata } from "next";
import { redirect } from "next/navigation";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import { currentMember } from "@/lib/board";
import { bt } from "@/lib/board-i18n";
import { LANG, TopBar } from "../BoardParts";
import { WriteForm } from "../BoardClient";
import s from "../board.module.css";

/** /board/write — 로그인한 회원만. 아니면 로그인으로 보냈다가 여기로 돌아온다 (미들웨어가 먼저 막는다) */
export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "글쓰기", robots: { index: false, follow: false } };

export default async function WritePage() {
  const me = await currentMember();
  if (!me) redirect(`/board/login?next=${encodeURIComponent("/board/write")}`);
  return (
    <>
      <SiteHeader />
      <main id="main-content" className={s.wrap}>
        <div className="container">
          <div className={s.head}>
            <h1 className={s.h1}>{bt(LANG, "write")}</h1>
            <TopBar me={me} write={false} />
          </div>
          <WriteForm lang={LANG} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
