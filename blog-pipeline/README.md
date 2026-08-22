# 블로그 자동발행 팀 — 사용법

## 지금 단계: 이 창에서 한 명씩 불러서 검증
아직 API 자동화는 안 만듦. 지금은 Claude Code(이 창)에서 팀원을 하나씩 직접 불러 결과물을 확인하고,
지침(`agents/*.md`, `company-guide.md`, `style-guide.md`, `seo-guide.md`)을 다듬는 단계다.
검증이 끝나면 이 파일 구조 그대로 API 자동발행 시스템으로 옮긴다 (나중에).

## 팀원 한 명 불러보는 법
그냥 채팅창에 이렇게 요청하면 된다:

```
blog-pipeline/agents/researcher.md 지침대로
"자비출판 비용" 키워드 리서치해줘
```

```
blog-pipeline/agents/strategist.md 지침대로
research/자비출판-비용.md 보고 전략 짜줘
```

한 단계씩 결과를 보면서 지침 파일을 고치면 된다. 예:
```
writer.md 지침대로 다시 써줘. style-guide.md 톤이 덜 반영됐어.
```

## 전체 파이프라인 한 번에 돌리기
```
blog-pipeline/CLAUDE.md 지침대로 큐에서 다음 키워드 하나 처리해줘
```
→ 리서치 → 전략 → 작성 → 이미지 → 조립까지 순서대로 진행되고,
`output/[키워드]/`에 최종 결과가 쌓인다. **자동 발행은 안 됨** — 검토 후 "발행해줘"라고 말해야 함.

## 폴더 구조
```
blog-pipeline/
  CLAUDE.md          ← 팀장 (오케스트레이션만, 직접 작업 안 함)
  company-guide.md    ← 전략가의 뇌 (회사 백서 기반 — 여기가 회사 지식의 실제 저장소)
  style-guide.md       ← 톤 가이드 (녹음 분석 기반)
  seo-guide.md          ← SEO·AEO·GEO 규칙 (2026.08 최신 리서치)
  image-guide.md         ← 이미지 스타일 (사이트 디자인 토큰)
  queue.md                ← 처리할 키워드 목록
  agents/
    researcher.md          ← ① 리서처
    strategist.md            ← ② 전략가
    writer.md                  ← ④ 작가 (③ 마케터 지식은 seo-guide.md로 흡수)
    image-maker.md              ← ⑤ 표·그래프
    assembler.md                  ← ⑥ 조립·최종검토
  research/    strategy/    drafts/    assets/    output/   ← 산출물 저장
  scripts/                                                    ← 나중에 publish 스크립트 추가
```

## "회사 지식"은 누가 가지고 있나
**전략가(strategist)** 가 회사 지식을 담당한다. 다만 실제 저장소는 사람이 아니라
`company-guide.md` 파일이다 — 서브에이전트는 매번 새로 호출되므로 기억이 없고, 호출될 때마다
이 파일을 처음부터 다시 읽는다. **"직원을 학습시킨다" = 이 파일을 더 채운다**와 같은 뜻이다.

현재 `company-guide.md`는 `_out/위드에스마케팅_회사_종합백서.md`(25p) 기반으로 채워져 있고,
`style-guide.md`는 `_out/녹음파일_분석_보고서.md`(상담 녹음 20건 분석) 기반으로 채워져 있다.
더 채우고 싶으면 두 파일에 내용을 추가하면 그대로 전략가·작가의 지식이 늘어난다.

## 나중에 API 자동화로 옮길 때
- 이 `.md` 파일들이 그대로 API 호출의 system prompt가 된다 (다시 쓸 필요 없음)
- `CLAUDE.md`의 오케스트레이션 순서가 그대로 서버 스크립트의 파이프라인 순서가 된다
- 트리거는 3일 주기 예약 실행(cron 등)으로 `queue.md`에서 다음 항목을 뽑아 처리
- 발행 승인 게이트는 반드시 유지한다 (자동 발행 금지 원칙은 그대로 옮겨감)
