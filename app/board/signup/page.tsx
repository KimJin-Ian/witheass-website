import type { Metadata } from "next";
import AuthPage from "../AuthPage";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "회원가입", robots: { index: false, follow: false } };

export default function SignupPage({ searchParams }: { searchParams: { next?: string } }) {
  return <AuthPage mode="signup" next={searchParams.next} />;
}
