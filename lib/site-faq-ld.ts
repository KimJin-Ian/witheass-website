// 회사 소개(/about) 의 '자주 묻는 질문'(Faq.tsx · admin faqs) 과 같은 내용 — FAQ 가 보이는 /about 에만 붙인다 (11/14, 전에는 모든 페이지 layout 에 있었다)

// FAQPage JSON-LD — 홈페이지 <Faq /> 컴포넌트(20개)와 동일.
// admin DB 시드(012) 및 Faq.tsx 폴백과 같은 내용을 유지.
export const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "1차 원고는 언제까지 받을 수 있나요?", acceptedAnswer: { "@type": "Answer", text: "인터뷰 완료 후 한 달 전후로 받으실 수 있습니다." } },
    { "@type": "Question", name: "1차 원고 수정은 몇 회까지 가능한가요?", acceptedAnswer: { "@type": "Answer", text: "2회까지 가능합니다. 1차 원고 → 1차 피드백 → 수정본 → 2차 피드백 → 최종 원고로 진행됩니다." } },
    { "@type": "Question", name: "제 말투·스타일·표현을 그대로 반영해 줄 수 있나요?", acceptedAnswer: { "@type": "Answer", text: "네. 인터뷰 진행 시 요구사항을 모두 말씀해 주시면 그대로 반영합니다." } },
    { "@type": "Question", name: "표지 디자인은 몇 개 시안이 제공되며, 수정은 몇 회 가능한가요?", acceptedAnswer: { "@type": "Answer", text: "2개 시안 제공, 2회 수정 가능합니다." } },
    { "@type": "Question", name: "본문에 사진·캡션·표·도표를 넣을 수 있나요?", acceptedAnswer: { "@type": "Answer", text: "네. 모두 삽입 가능합니다. 이미지·자료의 정보는 저자가 직접 정리해 주셔야 합니다." } },
    { "@type": "Question", name: "2차 원고 단계에서 내용 수정도 가능한가요?", acceptedAnswer: { "@type": "Answer", text: "2차 단계에서는 오탈자 검토와 의문사항 정리만 가능합니다. 내용 추가는 1차에서 마무리해 주세요." } },
    { "@type": "Question", name: "교정·교열은 어디까지 봐주시나요?", acceptedAnswer: { "@type": "Answer", text: "오탈자뿐 아니라 문장 표현·흐름·맞춤법까지 2차 작가가 함께 봅니다." } },
    { "@type": "Question", name: "ISBN과 저작권은 누구 명의로 등록되나요?", acceptedAnswer: { "@type": "Answer", text: "모두 저자 본인 명의로 등록됩니다." } },
    { "@type": "Question", name: "인세 정산은 어떻게 진행되며 몇 %인가요?", acceptedAnswer: { "@type": "Answer", text: "판매 발생 다음 달 중순~말에 지급. 종이책 45%, 전자책 20%." } },
    { "@type": "Question", name: "매달 판매 현황은 어떻게 확인하나요?", acceptedAnswer: { "@type": "Answer", text: "전용 사이트의 아이디·비밀번호를 발급해 드립니다. 매달 판매 부수·정산을 직접 확인 가능합니다." } },
    { "@type": "Question", name: "출간 후 전자책·2쇄·해외판·강연자료 전환 권리는?", acceptedAnswer: { "@type": "Answer", text: "모두 저자 본인 소유입니다." } },
    { "@type": "Question", name: "유통 기간은 얼마이며, 연장 가능한가요?", acceptedAnswer: { "@type": "Answer", text: "기본 2년. 이후 연 100만원으로 연장 가능." } },
    { "@type": "Question", name: "유통·물류 창고 비용은 별도인가요?", acceptedAnswer: { "@type": "Answer", text: "모든 패키지에 물류 창고비 포함, 2년 무료 보관됩니다." } },
    { "@type": "Question", name: "전자책 제작 + 밀리의서재는 포함인가요?", acceptedAnswer: { "@type": "Answer", text: "네. 올인원 패키지에 전자책 + 밀리의서재 등록 포함입니다." } },
    { "@type": "Question", name: "서점 입고·매대 진열은 어떻게 진행되나요?", acceptedAnswer: { "@type": "Answer", text: "담당 MD 영업으로 부수를 입고시킵니다. 광화문·교보·강남 주요 매장은 출간 직후 1~2달 신간 매대에 진열되는 경우가 많습니다." } },
    { "@type": "Question", name: "초판 후 추가 제작 비용은? (200페이지 기준)", acceptedAnswer: { "@type": "Answer", text: "500권 → 1,000권 변경 +100만원, 500권 후 추가 500권 재인쇄 +300만원, 500권 후 추가 1,000권 +400만원, 초판 2,000부 +270만원." } },
    { "@type": "Question", name: "작가가 직접 책을 구매하거나 받고 싶을 때 비용은?", acceptedAnswer: { "@type": "Answer", text: "책 소유권은 저자에게 있으므로 추가 비용 없이 택배비만 부담하시면 됩니다." } },
    { "@type": "Question", name: "출간 후 강연·컨설팅·기고로 어떻게 연결되나요?", acceptedAnswer: { "@type": "Answer", text: "마케팅 대행(300만~2,000만원)과 강연자 추천으로 연결됩니다. 마케팅 활동이 추천 빈도와 강연료에 직접 영향을 줍니다." } },
    { "@type": "Question", name: "견적서·세부항목 정리본을 받을 수 있나요?", acceptedAnswer: { "@type": "Answer", text: "세 가지 기본 견적: 600만원(저자가 글 작성 + 이메일 교환), 900만원(인터뷰 포함 올인원 200p·500권), 700만원(원고 작성만, 인쇄 없이)." } },
    { "@type": "Question", name: "계약서 양식을 미리 볼 수 있나요?", acceptedAnswer: { "@type": "Answer", text: "네. 카톡 또는 이메일로 요청 주시면 표준 계약서를 공유드립니다." } }
  ],
};
