import type { Metadata } from "next";
import AuthPage from "../AuthPage";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "로그인", robots: { index: false, follow: false } };

export default function LoginPage({ searchParams }: { searchParams: { next?: string } }) {
  return <AuthPage mode="login" next={searchParams.next} />;
}
