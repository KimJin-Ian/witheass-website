import { redirect } from "next/navigation";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import { currentMember } from "@/lib/board";
import { LANG, safeNext } from "./BoardParts";
import { AuthForm } from "./BoardClient";
import s from "./board.module.css";

/** 로그인 · 회원가입 화면 공통. 이미 로그인했으면 돌아갈 곳으로 바로 보낸다 */
export default async function AuthPage({ mode, next: rawNext }: { mode: "login" | "signup"; next?: string | string[] }) {
  const next = safeNext(rawNext);
  if (await currentMember()) redirect(next);
  return (
    <>
      <SiteHeader />
      <main id="main-content" className={s.wrap}>
        <div className="container">
          <div className={s.narrow} style={{ margin: "0 auto" }}>
            <AuthForm lang={LANG} mode={mode} next={next} />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
