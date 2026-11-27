/**
 * 블로그 글 → 대표 가이드 연결
 *
 * 블로그 글 아래에는 '다른 글'과 카카오톡 상담만 있어서, 같은 주제를 한 번에 정리한 가이드(/guide/…)나
 * 지금 패키지 비용으로 가는 길이 없었다. 글 제목 · 주소 · 태그에 들어 있는 낱말로 맞는 가이드를 골라
 * 글 끝에 이어 준다 (2026-11-27).
 *
 * 규칙은 위에서부터 읽고, 먼저 걸린 것이 앞에 온다. 좁은 주제(비용 · 자서전 · 직업)를 위에,
 * 넓은 주제(출판사 고르기)를 아래에 둔다.
 */
import { QUESTION_GUIDES } from "./question-guides";

const RULES: [RegExp, string[]][] = [
  [/비용|가격|견적|얼마|cost|price|quote/i, ["self-publishing-cost", "ghostwriting-cost"]],
  [/자서전|회고록|autobiograph|memoir/i, ["autobiography-publishing", "ghostwriting-cost"]],
  [/대필|집필 ?대행|ghostwrit|writing-agency/i, ["book-writing-agency", "ghostwriting-vs-interview-publishing"]],
  [/원고 ?없이|원고가 없|인터뷰|interview|without-manuscript/i, ["publish-without-manuscript", "ghostwriting-vs-interview-publishing"]],
  [/의사|병원|원장|doctor|clinic/i, ["doctor-book-publishing"]],
  [/변호사|세무사|회계사|전문직|lawyer|professional/i, ["lawyer-book-publishing"]],
  [/CEO|경영서|브랜드북|창업자|ceo-/i, ["ceo-book-publishing"]],
  [/강사|강의|강연|lectur|speaker/i, ["lecturer-book-publishing"]],
  [/퍼스널 ?브랜딩|branding/i, ["personal-branding-publishing"]],
  [/전자책|이북|epub|ebook/i, ["ebook-publishing"]],
  [/인세|정산|royalt/i, ["royalty-settlement"]],
  [/계약|contract/i, ["publishing-contract-check"]],
  [/기간|일정|얼마나 걸|timeline|schedule/i, ["publishing-timeline"]],
  [/마케팅|홍보|서평|marketing|promotion/i, ["book-marketing-after-publishing"]],
  [/자비출판|기획출판|self-publishing|traditional/i, ["self-vs-traditional-publishing", "self-publishing-cost"]],
  [/유통|서점|입점|bookstore|distribution/i, ["writing-to-bookstore-all-in-one"]],
  [/출판사|고르|선택|추천|choose|publisher/i, ["how-to-choose-publisher"]],
];

/** 어느 규칙에도 안 걸린 글에 보여 줄 기본 가이드 */
const FALLBACK = ["how-to-choose-publisher", "self-publishing-cost", "publish-without-manuscript"];

export type GuideLink = { href: string; title: string };

export function guidesForPost(
  post: { title?: string | null; slug?: string | null; tags?: unknown },
  max = 3
): GuideLink[] {
  const tags = Array.isArray(post.tags) ? post.tags.join(" ") : "";
  const hay = [post.title, post.slug, tags].filter(Boolean).join(" ");
  const picked: string[] = [];
  for (const [re, slugs] of RULES) {
    if (!re.test(hay)) continue;
    for (const s of slugs) if (!picked.includes(s)) picked.push(s);
  }
  for (const s of FALLBACK) if (picked.length < max && !picked.includes(s)) picked.push(s);

  const out: GuideLink[] = [];
  for (const slug of picked) {
    const guide = QUESTION_GUIDES.find((g) => g.slug === slug);
    if (guide) out.push({ href: `/guide/${guide.slug}`, title: guide.title });
    if (out.length >= max) break;
  }
  return out;
}
