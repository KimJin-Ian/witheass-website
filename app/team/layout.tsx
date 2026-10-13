import type { Metadata } from "next";

/**
 * 작가진 페이지의 검색엔진용 제목 · 표준 주소
 *
 * page.tsx 가 클라이언트 컴포넌트라 metadata 를 못 내보내서 여기 둔다.
 * 예전에는 표준 주소가 없어 사이트 기본값(홈)을 물려받았고, 구글은 이 페이지를 홈의 복사본으로 봤다.
 */
export const metadata: Metadata = {
  title: "전문 작가진 — 드림위드에스 출판부 · 기획 · 편집",
  description:
    "드림위드에스 출판사의 전문 작가진 — 출판부 · 출판 기획 · 컨설팅 · 편집 담당 작가들의 학력과 주요 출간 · 컨설팅 이력. 인터뷰 기반 집필로 원고가 없어도 책을 만듭니다.",
  alternates: { canonical: "https://www.bookpublishingwithess.com/team" },
};

export default function TeamLayout({ children }: { children: React.ReactNode }) {
  return children;
}
