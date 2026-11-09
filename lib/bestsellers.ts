/**
 * 분야별 베스트셀러 · 대표 도서 (2026-11-10 — 대표님 매뉴얼 #5 §23)
 *
 * 순위 · 기록은 대표님이 매뉴얼에 적어 준 것만 쓴다. 서점 · 날짜가 확인 안 된 것은 글자로 쓰지 않는다.
 *   - 메디컬 빌딩 건물주 되기: 매뉴얼의 기록일 2025.06.19 는 교보문고 출간일(2026년)보다 앞서서 날짜를 뺐다 — 대표님 확인 필요
 *   - 이기적 남자: 98위의 서점 · 분야 · 날짜 확인 필요
 * 표지는 교보문고 상품 페이지의 표지(출판사 드림위드에스 확인)를 받아 public/bestsellers 에 두었다.
 * 순위 증빙 이미지 · 인스타 진열 사진을 받으면 proof 칸을 추가한다.
 * 새 책은 이 배열에 한 줄 추가하면 메인 슬라이드와 /bestsellers 에 같이 뜬다.
 */

export type Bestseller = {
  key: string;
  title: string;
  author?: string;
  group: string; // 분야 묶음 (/bestsellers 에서 묶어 보여준다)
  cat: string; // 짧은 분야 (메인 슬라이드 아래)
  record?: string; // 순위 · 기록 — 대표님이 준 것만
  intro: string;
  links: { naver: string; kyobo?: string; instagram?: string };
};

const naver = (q: string) => `https://search.naver.com/search.naver?query=${encodeURIComponent(q)}`;

export const BESTSELLERS: Bestseller[] = [
  {
    key: "medical-building",
    title: "메디컬 빌딩 건물주 되기",
    author: "이주환 · 김세환",
    group: "메디컬 · 의료 · 뷰티",
    cat: "경제 · 경영",
    record: "경제 · 경영 분야 41위",
    intro: "개원 전문가의 시선으로, 왜 지금 메디컬 빌딩인지와 무엇을 따져야 하는지 정리한 책입니다.",
    links: {
      naver: naver("메디컬 빌딩 건물주 되기"),
      kyobo: "https://product.kyobobook.co.kr/detail/S000220273057",
      instagram: "https://www.instagram.com/reel/DZwgNvgTXNu/",
    },
  },
  {
    key: "younger-tomorrow",
    title: "당신의 내일, 오늘보다 더 젊고 아름답게",
    author: "정재웅",
    group: "메디컬 · 의료 · 뷰티",
    cat: "의학 · 안티에이징",
    intro: "피부미용 의사가 진료실에서 쌓은 안티에이징 노하우를 담은 책입니다.",
    links: {
      naver: naver("당신의 내일 오늘보다 더 젊고 아름답게"),
      kyobo: "https://product.kyobobook.co.kr/detail/S000200277070",
    },
  },
  {
    key: "mat-stretching",
    title: "누구에게나 안전하고 효과적인 매트 스트레칭",
    author: "Anthony Lett · Kenyi Diaz",
    group: "건강 · 운동 · 피트니스",
    cat: "건강 · 운동",
    intro: "누구나 매트 위에서 안전하게 따라 할 수 있는 스트레칭을 정리한 책입니다.",
    links: {
      naver: naver("누구에게나 안전하고 효과적인 매트 스트레칭"),
      kyobo: "https://product.kyobobook.co.kr/detail/S000001987566",
      instagram: "https://www.instagram.com/p/CaPyHzpvUpc/",
    },
  },
  {
    key: "selfish-man",
    title: "이기적 남자",
    author: "안세훈",
    group: "자기계발 · 인간관계",
    cat: "자기계발",
    record: "베스트셀러 98위",
    intro: "15년간 이혼 · 형사 사건을 맡아 온 변호사가 법정에서 본 남자들의 이야기를 담은 책입니다.",
    links: {
      naver: naver("이기적 남자 안세훈"),
      kyobo: "https://product.kyobobook.co.kr/detail/S000220273646",
      instagram: "https://www.instagram.com/p/Da_yz9Ak_KG/",
    },
  },
  {
    key: "music-student",
    title: "꿈을 찾는 음대생",
    author: "이서진",
    group: "예술 · 음악 · 진로",
    cat: "진로 · 에세이",
    record: "베스트셀러",
    intro: "평범한 음대생이 인터뷰로 책 한 권을 내고 인생이 달라진 이야기입니다.",
    links: {
      naver: naver("꿈을 찾는 음대생 이서진"),
      kyobo: "https://product.kyobobook.co.kr/detail/S000219726863",
      instagram: "https://www.instagram.com/reel/DN530aZE5wa/",
    },
  },
  {
    key: "sea-lion-island",
    title: "큰바다사자들의 섬",
    author: "장이피",
    group: "문학 · 소설 · 청소년",
    cat: "소설 · 청소년",
    record: "출간 첫날 네이버 청소년 부문 147위",
    intro: "스스로 뛰어내려야 하는 순간을 마주한 이야기를 그린 소설입니다.",
    links: {
      naver: naver("큰바다사자들의 섬"),
      kyobo: "https://product.kyobobook.co.kr/detail/S000217204001",
      instagram: "https://www.instagram.com/p/DNLDh5XTmat/",
    },
  },
  {
    key: "phoenix",
    title: "피닉스에 갈 무렵이면",
    group: "문학 · 소설 · 청소년",
    cat: "여행 에세이",
    intro: "직접 차를 몰고 미국을 가로지른 여행을 기록한 책입니다.",
    links: {
      naver: naver("피닉스에 갈 무렵이면"),
      kyobo: "https://product.kyobobook.co.kr/detail/S000213720216",
      instagram: "https://www.instagram.com/p/C9ORir-yjyj/",
    },
  },
];
