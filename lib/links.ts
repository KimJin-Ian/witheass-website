/**
 * 사이트 곳곳의 링크 규칙 — 한곳에서 정한다
 *
 * 2026-10-13 개편: 첫 화면(/)이 상담 신청서가 됐고, 예전 메인은 About us(/about)로 옮겼다.
 * 메뉴 · 푸터 링크는 admin(/site/nav · /site/footer)에서 DB 로 관리하는데, 그 안의 주소가
 * 전부 예전 메인 구획("/#pricing" 같은 것)을 가리킨다. DB 를 일일이 고치지 않고 여기서 옮겨 보낸다.
 *
 * 상담 · 문의 버튼은 전부 카카오톡 채팅으로 보낸다 (대표님 요청).
 */

/** 위드에스마케팅 카카오톡 채널 — 채팅창이 바로 열리는 주소 */
export const KAKAO_CHAT = "https://pf.kakao.com/_QkZhd/chat";

/** 카카오톡 말풍선 아이콘 (svg path) */
export const KAKAO_PATH =
  "M12 3C6.48 3 2 6.58 2 11c0 2.85 1.87 5.35 4.68 6.77-.2.75-.74 2.7-.85 3.12-.13.52.19.51.4.37.16-.11 2.6-1.77 3.66-2.49.69.1 1.39.15 2.11.15 5.52 0 10-3.58 10-8S17.52 3 12 3z";

/** 예전 메인의 구획 — 지금은 /about 에 있다 */
const OLD_MAIN_SECTIONS = new Set([
  "top", "about", "brand", "thesis", "pricing", "fullpkg", "process", "case", "promo",
  "service", "community", "portfolio", "team", "voices", "faq", "contact",
]);

/**
 * 메뉴 · 푸터 주소를 지금 구조에 맞게 바꾼다.
 *   "/#contact" · "#contact" · 상담 버튼   → 카카오톡 채팅
 *   "/#pricing" · "#pricing"              → "/about#pricing"
 *   나머지                                  → 그대로
 */
export function siteHref(url: string, opts: { cta?: boolean } = {}): { href: string; external: boolean } {
  const u = String(url ?? "").trim();
  const hash = u.match(/^\/?#([\w-]+)$/)?.[1];
  if (opts.cta || hash === "contact") return { href: KAKAO_CHAT, external: true };
  if (hash && OLD_MAIN_SECTIONS.has(hash)) return { href: `/about#${hash}`, external: false };
  return { href: u, external: /^https?:\/\//.test(u) };
}
