import type { Metadata } from "next";
import AboutClient from "./AboutClient";
import SentBanner from "./SentBanner";

/**
 * About us — 회사 소개 전체 (2026-10-13 까지의 첫 화면)
 *
 * 화면은 AboutClient(클라이언트)가 그린다. 여기는 검색엔진용 제목 · 표준 주소만 붙인다 —
 * 클라이언트 컴포넌트에서는 metadata 를 내보낼 수 없다.
 * 첫 화면의 상담 신청서를 보내면 이 페이지로 넘어오고, SentBanner 가 "카톡에 붙여넣기" 안내를 띄운다.
 */

const SITE_URL = "https://www.bookpublishingwithess.com";

export const metadata: Metadata = {
  title: "About us — 책 한 권으로 시작되는 인생의 다음 챕터",
  description:
    "드림위드에스 출판사 소개 — 자비출판 · 자서전출판 · 책출판 · 퍼스널브랜딩 · 논문 컨설팅. 누적 890권+ 출간, 인터뷰 기반 집필, 표절 검수 전담팀, 출판 → 마케팅 → 강연 · 사업 확장까지. 패키지 · 진행 과정 · 출간 사례 · 작가진 · 자주 묻는 질문.",
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    title: "About us | 드림위드에스 출판사",
    description: "누적 890권+ 출간 · 인터뷰 기반 집필 · 출판부터 마케팅 · 강연까지. 드림위드에스 출판사를 소개합니다.",
    url: `${SITE_URL}/about`,
    type: "website",
    locale: "ko_KR",
    siteName: "드림위드에스 출판사",
  },
};

export default function AboutPage() {
  return (
    <>
      <AboutClient />
      <SentBanner />
    </>
  );
}
