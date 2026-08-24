# 블로그 자동발행 팀

드림위드에스 출판사 블로그 글을 **3일에 1건 자동 생성 → 품질 검사 → 자동 발행**한다.

## 지금 구조

```
Vercel Cron (3일 주기)
   ↓
① 리서처 → ② 전략가 → ③ 작가 → ④ 조립 → ⑤ 품질 검사 6종
                                              ├ 통과 → 자동 발행
                                              └ 실패 → blocked + 알림
```

**사람 승인 단계가 없다.** 품질 검사가 유일한 관문이다.
관리·피드백은 admin의 `/site/blog-auto` 화면에서 한다.

## 폴더 구조
```
blog-pipeline/
  CLAUDE.md            ← 팀장 (오케스트레이션만)
  quality-gates.md      ← ⭐ 발행 관문 6종 — 자동 발행의 유일한 방어선
  company-guide.md       ← 회사 사실·가격 (여기 없는 숫자는 검사에서 걸림)
  style-guide.md          ← 톤 (상담 녹음 20건 분석 기반)
  seo-guide.md             ← 네이버 노출 + AEO + GEO 규칙
  queue.md                  ← 처리할 키워드 목록 (순서 = 발행 순서)
  agents/
    researcher.md            ← ① 키워드 발굴 + 상위 글 구조 분석
    strategist.md             ← ② 앵글 결정
    writer.md                  ← ③ 본문 작성 (표는 HTML, 이미지 없음)
    assembler.md                ← ④ 채널별 재구성 + 최종 검문
  research/  strategy/  drafts/  output/  qa-notes/   ← 산출물
  scripts/
    publish-to-homepage.mjs   ← Supabase 발행
    capture.mjs                ← (미사용 — 이미지 단계 제거됨)
```

## 지침 파일은 어디가 진실인가

| 위치 | 역할 |
|---|---|
| 이 저장소의 `.md` | **최초 시드용 원본** |
| Supabase `pipeline_guides` | **런타임 진실** — 에이전트가 매번 읽음 |
| admin `/site/blog-auto/guides` | 편집 화면 |

admin은 별도 저장소·별도 배포라 이 파일들을 디스크에서 읽을 수 없다.
그래서 최초 1회 시드 후에는 **DB가 기준**이고, 수정은 admin에서 한다.

## 이미지가 없는 이유
표를 PNG로 만들면 **AI 검색이 그 안의 글자를 읽지 못한다.** AEO 효과가 0이 된다.
그래서 표는 본문 안에 실제 `<table>` 로 넣는다.
부수 효과로 Playwright·Chromium 의존이 사라져 서버리스에서 안정적으로 돌고,
글당 비용도 약 330원 줄었다 (비전 토큰 5,500 절약).

## 손으로 한 번 돌려보려면
Claude Code 에서:
```
blog-pipeline/CLAUDE.md 지침대로 큐에서 다음 키워드 하나 처리해줘
```
단계별로 하나씩 부를 수도 있다:
```
blog-pipeline/agents/researcher.md 지침대로 "자비출판 비용" 리서치해줘
```

## 실전에서 잡힌 개선점 (지침에 반영됨)
1. 표 마커에 데이터를 안 적으면 근거 없는 숫자가 생성됨 → `writer.md`
2. `sitemap.ts` 에 revalidate 가 없어 새 글이 사이트맵에 영원히 미노출 → 수정됨
3. 커버 이미지로 본문 표를 재사용하면 맥락 없이 표부터 보임 → `assembler.md`
