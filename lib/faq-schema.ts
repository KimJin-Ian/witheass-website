/**
 * 본문에서 FAQ를 뽑아 FAQPage 구조화 데이터로 만든다.
 *
 * 왜 필요한가:
 * 구글은 2026년 5월 FAQ 리치결과(검색결과에 아코디언으로 펼쳐지던 것)를 없앴다.
 * 그래서 FAQPage 스키마가 쓸모없어졌다고 오해하기 쉬운데, 반대다 —
 * ChatGPT·Perplexity·Claude·AI Overview 는 이 스키마를 질문-답 쌍으로 그대로 읽어
 * 답변에 인용한다. FAQPage 가 붙은 페이지의 AI 인용률이 평균 30% 높다.
 *
 * 우리 글에는 이미 "자주 묻는 질문" 섹션이 들어 있다.
 * 콘텐츠는 써놓고 그 효과만 못 받고 있던 셈이라, 뽑아서 내보내기만 하면 된다.
 */

export interface FaqItem {
  question: string;
  answer: string;
}

/** HTML 태그를 걷어내고 사람이 읽는 텍스트만 남긴다 */
function toText(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<\/(p|li|div)>/gi, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

/** 질문 앞의 "Q.", "Q1.", "질문:" 같은 머리표를 뗀다 */
function cleanQuestion(s: string): string {
  return toText(s).replace(/^\s*(?:Q\s*\d*\s*[.·:)]|질문\s*\d*\s*[.:)])\s*/i, "").trim();
}

/** 답변 앞의 "A." 를 뗀다 */
function cleanAnswer(s: string): string {
  return toText(s).replace(/^\s*(?:A\s*\d*\s*[.·:)]|답변?\s*\d*\s*[.:)])\s*/i, "").trim();
}

/**
 * 본문 HTML에서 FAQ 목록을 뽑는다.
 *
 * 글마다 마크업이 조금씩 다르다. 실제로 쓰이는 두 형태를 모두 받는다.
 *   형태 A  <h3>Q. 질문</h3><p>답변</p>
 *   형태 B  <p><strong>Q. 질문</strong></p><p>A. 답변</p>
 */
export function extractFaq(body: string): FaqItem[] {
  if (!body) return [];

  // "자주 묻는 질문" H2 부터 다음 H2 직전까지가 FAQ 구역이다
  const head = body.match(/<h2[^>]*>[^<]*(?:자주\s*묻는|자주묻는|FAQ|궁금한\s*점)[^<]*<\/h2>/i);
  if (!head) return [];

  const from = (head.index ?? 0) + head[0].length;
  const after = body.slice(from);
  const nextH2 = after.search(/<h2[\s>]/i);
  const section = nextH2 >= 0 ? after.slice(0, nextH2) : after;

  const items: FaqItem[] = [];

  // 형태 A — <h3>가 질문, 그 뒤 다음 <h3> 전까지가 답변
  const h3s = [...section.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/gi)];
  if (h3s.length) {
    for (let i = 0; i < h3s.length; i++) {
      const q = cleanQuestion(h3s[i][1]);
      const start = (h3s[i].index ?? 0) + h3s[i][0].length;
      const end = i + 1 < h3s.length ? h3s[i + 1].index ?? section.length : section.length;
      const a = cleanAnswer(section.slice(start, end));
      if (q && a) items.push({ question: q, answer: a });
    }
    return items.filter(valid);
  }

  // 형태 B — <strong>으로 강조한 질문 문단, 그 다음 문단이 답변
  const paras = [...section.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)].map((m) => m[1]);
  for (let i = 0; i < paras.length; i++) {
    const isQuestion =
      /<strong[^>]*>[\s\S]*<\/strong>/i.test(paras[i]) || /^\s*Q\s*\d*\s*[.·:)]/i.test(toText(paras[i]));
    if (!isQuestion) continue;

    const q = cleanQuestion(paras[i]);
    // 답변은 다음 문단부터, 다음 질문 직전까지 이어붙인다
    const chunks: string[] = [];
    for (let j = i + 1; j < paras.length; j++) {
      const nextIsQuestion =
        /<strong[^>]*>[\s\S]*<\/strong>/i.test(paras[j]) || /^\s*Q\s*\d*\s*[.·:)]/i.test(toText(paras[j]));
      if (nextIsQuestion) break;
      chunks.push(paras[j]);
    }
    const a = cleanAnswer(chunks.join(" "));
    if (q && a) items.push({ question: q, answer: a });
  }

  return items.filter(valid);
}

/**
 * 쓸 만한 항목만 남긴다.
 * 너무 짧으면 답이 아니고, 너무 길면 인용될 때 잘린다.
 */
function valid(f: FaqItem): boolean {
  return f.question.length >= 5 && f.question.length <= 200 && f.answer.length >= 20;
}

/** FAQPage JSON-LD. 항목이 없으면 null 을 돌려 아무것도 내보내지 않는다. */
export function faqJsonLd(body: string) {
  const items = extractFaq(body);
  if (items.length < 2) return null; // 1개짜리 FAQ는 스키마로 낼 가치가 없다

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        // 답이 너무 길면 인용 과정에서 잘리므로 앞부분만 싣는다
        text: f.answer.length > 1200 ? f.answer.slice(0, 1200).trim() + "…" : f.answer,
      },
    })),
  };
}
