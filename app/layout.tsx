import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.bookpublishingwithess.com"),
  title: "드림위드에스출판사 | 위드에스마케팅 — 책 한 권으로 인생을 바꾸는 구조",
  description:
    "드림위드에스 출판사 / 위드에스마케팅 — 책 한 권으로 인생을 바꾸는 구조. 누적 890권+ 출간, 베스트셀러 작가 출신 대표가 운영하는 올인원 출판·브랜딩·마케팅 회사.",
  keywords: [
    "드림위드에스",
    "위드에스마케팅",
    "더컬쳐앤",
    "자비출판",
    "자서전",
    "논문대필",
    "논문컨설팅",
    "책출판",
    "퍼스널브랜딩",
    "이서진",
  ],
  openGraph: {
    title: "드림위드에스출판사 | 책 한 권으로 인생을 바꾸는 구조",
    description: "기획부터 마케팅·강연·사업 확장까지. 누적 890권+ 출간.",
    type: "website",
    locale: "ko_KR",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
