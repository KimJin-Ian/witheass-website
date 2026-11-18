"use client";

import { useMemo, useState } from "react";

export type EngineCell = {
  id: string;
  label: string;
  /** mentioned: 답변에 브랜드가 나옴 · cited: 답변엔 없지만 우리 사이트를 출처로 씀 · none: 안 나옴 · empty: 답변이 안 만들어짐 · pending: 아직 수집 전 */
  state: "mentioned" | "cited" | "none" | "empty" | "pending";
  text: string;
  partial: boolean;
  competitors: string[];
  sources: { title: string; url: string; domain: string; ours: boolean }[];
};

export type QuestionRow = {
  id: string;
  no: number;
  group: string;
  text: string;
  rank: number | null;
  rankChecked: boolean;
  topResults: { title: string; url: string; domain: string; ours: boolean }[];
  cells: EngineCell[];
};

const STATE_LABEL: Record<EngineCell["state"], string> = {
  mentioned: "브랜드 언급",
  cited: "출처로 인용",
  none: "언급 없음",
  empty: "답변 없음",
  pending: "수집 전",
};

const FILTERS = [
  { id: "all", label: "전체" },
  { id: "mentioned", label: "브랜드 언급" },
  { id: "cited", label: "출처로만 인용" },
  { id: "none", label: "언급 없음" },
  { id: "competitor", label: "경쟁사만 나옴" },
] as const;

type FilterId = (typeof FILTERS)[number]["id"];

function matches(row: QuestionRow, filter: FilterId) {
  const states = row.cells.map((c) => c.state);
  if (filter === "all") return true;
  if (filter === "mentioned") return states.includes("mentioned");
  if (filter === "cited") return !states.includes("mentioned") && states.includes("cited");
  if (filter === "none") return !states.includes("mentioned") && !states.includes("cited") && states.includes("none");
  return row.cells.some((c) => c.state !== "mentioned" && c.state !== "pending" && c.competitors.length > 0);
}

export default function MonitoringList({ rows }: { rows: QuestionRow[] }) {
  const [filter, setFilter] = useState<FilterId>("all");
  const counts = useMemo(() => {
    const out = {} as Record<FilterId, number>;
    for (const f of FILTERS) out[f.id] = rows.filter((r) => matches(r, f.id)).length;
    return out;
  }, [rows]);
  const shown = rows.filter((r) => matches(r, filter));

  return (
    <>
      <div className="mon-filters" role="tablist" aria-label="질문 걸러 보기">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            role="tab"
            aria-selected={filter === f.id}
            className={filter === f.id ? "on" : ""}
            onClick={() => setFilter(f.id)}
          >
            {f.label} <b>{counts[f.id]}</b>
          </button>
        ))}
      </div>

      {shown.length === 0 && <p className="mon-empty">해당하는 질문이 없습니다.</p>}

      <ol className="mon-qlist">
        {shown.map((row) => (
          <li key={row.id} className="mon-q">
            <details>
              <summary>
                <span className="mon-q-no">{String(row.no).padStart(2, "0")}</span>
                <span className="mon-q-main">
                  <span className="mon-q-group">{row.group}</span>
                  <span className="mon-q-text">{row.text}</span>
                </span>
                <span className="mon-q-badges">
                  {row.cells.map((c) => (
                    <span key={c.id} className={`mon-badge s-${c.state}`} title={`${c.label}: ${STATE_LABEL[c.state]}`}>
                      <i>{c.label}</i>
                      {STATE_LABEL[c.state]}
                    </span>
                  ))}
                  {row.rankChecked && (
                    <span className={`mon-badge ${row.rank ? "s-rank" : "s-norank"}`}>
                      <i>구글 검색</i>
                      {row.rank ? `${row.rank}위` : "1면 밖"}
                    </span>
                  )}
                </span>
                <span className="mon-q-open" aria-hidden="true">답변 펼치기</span>
              </summary>

              <div className="mon-q-body">
                {row.cells.map((c) => (
                  <section key={c.id} className="mon-answer">
                    <h4>
                      {c.label}
                      <span className={`mon-badge s-${c.state}`}>{STATE_LABEL[c.state]}</span>
                      {c.sources.length > 0 && <span className="mon-src-count">출처 {c.sources.length}개</span>}
                      {c.partial && <span className="mon-src-count">앞부분만 수집됨</span>}
                    </h4>
                    {c.state === "pending" ? (
                      <p className="mon-muted">API 키를 등록하면 다음 수집부터 답변이 쌓입니다.</p>
                    ) : c.state === "empty" ? (
                      <p className="mon-muted">이 질문에는 답변이 만들어지지 않았습니다.</p>
                    ) : (
                      <>
                        {c.competitors.length > 0 && (
                          <p className="mon-comp">
                            답변에 나온 다른 출판사
                            {c.competitors.map((n) => (
                              <span key={n}>{n}</span>
                            ))}
                          </p>
                        )}
                        <div className="mon-answer-text">{c.text}</div>
                        {c.sources.length > 0 && (
                          <ul className="mon-sources">
                            {c.sources.map((s) => (
                              <li key={s.url} className={s.ours ? "ours" : ""}>
                                <a href={s.url} target="_blank" rel="noopener noreferrer nofollow">
                                  <b>{s.domain}</b>
                                  <span>{s.title || s.url}</span>
                                </a>
                              </li>
                            ))}
                          </ul>
                        )}
                      </>
                    )}
                  </section>
                ))}

                {row.rankChecked && row.topResults.length > 0 && (
                  <section className="mon-answer">
                    <h4>
                      구글 검색 결과 순서
                      <span className={`mon-badge ${row.rank ? "s-rank" : "s-norank"}`}>
                        {row.rank ? `우리 사이트 ${row.rank}위` : "우리 사이트 1면 밖"}
                      </span>
                    </h4>
                    <ol className="mon-serp">
                      {row.topResults.map((s) => (
                        <li key={s.url} className={s.ours ? "ours" : ""}>
                          <a href={s.url} target="_blank" rel="noopener noreferrer nofollow">
                            <b>{s.domain}</b>
                            <span>{s.title}</span>
                          </a>
                        </li>
                      ))}
                    </ol>
                  </section>
                )}
              </div>
            </details>
          </li>
        ))}
      </ol>
    </>
  );
}
