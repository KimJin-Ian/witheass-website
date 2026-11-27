import AdminShell from "../components/AdminShell";
import MonitoringList, { type EngineCell, type QuestionRow } from "./MonitoringList";
import latestJson from "@/data/ai-monitor/latest.json";
import historyJson from "@/data/ai-monitor/history.json";
import configJson from "@/data/ai-monitor/config.json";

/**
 * AI 노출 모니터링 (/admin/monitoring)
 *
 * 질문 30개를 AI 서비스에 그대로 묻고, 답변에 드림위드에스가 나오는지 · 어떤 출판사가 대신 나오는지 ·
 * 무엇을 출처로 썼는지 보여 준다. 자료는 data/ai-monitor/ 의 JSON 이고, scripts/ai-monitor.mjs 가
 * 매일 새로 쓴다(.github/workflows/ai-monitor.yml). 자료가 바뀌면 사이트가 다시 빌드되어 이 화면에 반영된다.
 */

type Source = { title: string; url: string; domain: string };
type Result = {
  qid: string;
  engine: string;
  answered: boolean;
  text: string;
  brand: boolean;
  brandCited: boolean;
  competitors: string[];
  sources: Source[];
  partial?: boolean;
};
type EngineInfo = { label: string; status: string; via?: string | null; model?: string | null; collectedAt?: string | null; error?: string };
type Latest = {
  updatedAt: string | null;
  date: string | null;
  engines: Record<string, EngineInfo>;
  results: Result[];
  google: { qid: string; rank: number | null; top: Source[] }[];
  keywords?: KeywordRow[];
};
/** 짧은 검색어(예: 책출판) 한 건의 구글 결과 */
type KeywordRow = {
  id: string;
  keyword: string;
  collectedAt: string;
  rank: number | null;
  prevRank: number | null;
  prevCollectedAt: string | null;
  top: Source[];
  aiOverview: boolean;
  aiBrand: boolean;
  aiCited: boolean;
};
type HistoryRow = {
  date: string;
  engines: Record<string, { answered: number; mentioned: number; cited: number }>;
  google: { checked: number; top10: number; top3: number } | null;
};
type Config = {
  brand: { name: string; domains: string[] };
  groups: Record<string, string>;
  questions: { id: string; group: string; text: string }[];
};

const latest = latestJson as unknown as Latest;
const history = historyJson as unknown as HistoryRow[];
const config = configJson as unknown as Config;

const ENGINE_ORDER = ["chatgpt", "gemini", "google_ai", "deepseek"];
const ENGINE_LABEL: Record<string, string> = {
  chatgpt: "ChatGPT",
  gemini: "Gemini",
  google_ai: "Google AI 개요",
  deepseek: "DeepSeek",
};

function isOurs(domain: string) {
  return config.brand.domains.some((d) => domain === d || domain.endsWith("." + d));
}

function formatKst(iso: string | null | undefined) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleString("ko-KR", { timeZone: "Asia/Seoul", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" });
}

function pct(part: number, whole: number) {
  return whole > 0 ? Math.round((part / whole) * 100) : 0;
}

export default function MonitoringPage() {
  // 화면에 세울 AI: ChatGPT · Gemini · Google AI 개요는 늘, DeepSeek 은 자료가 있을 때만
  const engineIds = ENGINE_ORDER.filter((id) => id !== "deepseek" || latest.engines?.deepseek);
  const byKey = new Map(latest.results.map((r) => [`${r.qid}:${r.engine}`, r]));
  const rankByQ = new Map(latest.google.map((g) => [g.qid, g]));

  const rows: QuestionRow[] = config.questions.map((q, i) => {
    const g = rankByQ.get(q.id);
    const cells: EngineCell[] = engineIds.map((id) => {
      const r = byKey.get(`${q.id}:${id}`);
      const label = ENGINE_LABEL[id] || id;
      if (!r) return { id, label, state: "pending", text: "", partial: false, competitors: [], sources: [] };
      const state: EngineCell["state"] = !r.answered ? "empty" : r.brand ? "mentioned" : r.brandCited ? "cited" : "none";
      return {
        id,
        label,
        state,
        text: r.text,
        partial: Boolean(r.partial),
        competitors: r.competitors || [],
        sources: (r.sources || []).map((s) => ({ ...s, ours: isOurs(s.domain) })),
      };
    });
    return {
      id: q.id,
      no: i + 1,
      group: config.groups[q.group] || q.group,
      text: q.text,
      rank: g?.rank ?? null,
      rankChecked: Boolean(g),
      topResults: (g?.top || []).map((s) => ({ ...s, ours: isOurs(s.domain) })),
      cells,
    };
  });

  const answered = latest.results.filter((r) => r.answered);
  const mentioned = answered.filter((r) => r.brand);
  const citedOnly = answered.filter((r) => !r.brand && r.brandCited);
  const possible = config.questions.length * engineIds.length;
  const sourceCount = answered.reduce((n, r) => n + r.sources.length, 0);
  const rankTop10 = latest.google.filter((g) => g.rank).length;
  const rankTop3 = latest.google.filter((g) => g.rank && g.rank <= 3).length;

  const engineStats = engineIds.map((id) => {
    const info = latest.engines?.[id];
    const list = answered.filter((r) => r.engine === id);
    return {
      id,
      label: ENGINE_LABEL[id] || id,
      info,
      answered: list.length,
      mentioned: list.filter((r) => r.brand).length,
      cited: list.filter((r) => !r.brand && r.brandCited).length,
    };
  });

  // 인사이트 1 — 우리 브랜드는 안 나오고 경쟁사가 나온 답변
  const qText = new Map(config.questions.map((q) => [q.id, q.text]));
  const lost = answered
    .filter((r) => !r.brand && r.competitors.length > 0)
    .map((r) => ({ key: `${r.qid}:${r.engine}`, question: qText.get(r.qid) || r.qid, engine: ENGINE_LABEL[r.engine] || r.engine, competitors: r.competitors, cited: r.brandCited }));

  // 인사이트 2 — 답변에 이름이 나온 출판사 순위 (우리 포함)
  const nameCount = new Map<string, number>();
  for (const r of answered) for (const n of r.competitors) nameCount.set(n, (nameCount.get(n) || 0) + 1);
  const nameRank = [...nameCount.entries()].map(([name, count]) => ({ name, count, ours: false }));
  nameRank.push({ name: config.brand.name, count: mentioned.length, ours: true });
  nameRank.sort((a, b) => b.count - a.count || (a.ours ? -1 : 1));
  const nameMax = Math.max(1, ...nameRank.map((n) => n.count));

  // 인사이트 3 — AI 가 많이 인용한 출처
  const domainCount = new Map<string, number>();
  for (const r of answered) for (const s of r.sources) if (s.domain) domainCount.set(s.domain, (domainCount.get(s.domain) || 0) + 1);
  const domainRank = [...domainCount.entries()].map(([domain, count]) => ({ domain, count, ours: isOurs(domain) })).sort((a, b) => b.count - a.count).slice(0, 10);
  const domainMax = Math.max(1, ...domainRank.map((d) => d.count));

  // 인사이트 4 — 구글 1면에는 있는데 AI 답변에는 이름이 안 나오는 질문
  const chance = rows
    .filter((row) => row.rank && row.cells.some((c) => c.state === "none" || c.state === "cited") && !row.cells.some((c) => c.state === "mentioned"))
    .sort((a, b) => (a.rank || 99) - (b.rank || 99));

  const trend = history.slice(-14).map((h) => {
    const list = Object.values(h.engines || {});
    const a = list.reduce((n, e) => n + e.answered, 0);
    const m = list.reduce((n, e) => n + e.mentioned, 0);
    return { date: h.date, answered: a, mentioned: m, rate: pct(m, a), top10: h.google?.top10 ?? null };
  });

  // 검색어 순위 — 1면에 있는 것부터, 순위가 높은 순서로
  const keywords = [...(latest.keywords || [])].sort(
    (a, b) => (a.rank ?? 99) - (b.rank ?? 99) || a.id.localeCompare(b.id)
  );
  const keywordTop10 = keywords.filter((k) => k.rank).length;
  const keywordChange = (k: KeywordRow) => {
    if (!k.prevCollectedAt) return "첫 측정";
    if (k.rank && k.prevRank) {
      const diff = k.prevRank - k.rank;
      return diff === 0 ? "변동 없음" : diff > 0 ? `▲ ${diff}` : `▼ ${-diff}`;
    }
    if (k.rank && !k.prevRank) return "1면 진입";
    if (!k.rank && k.prevRank) return `1면에서 밀림 (전 ${k.prevRank}위)`;
    return "변동 없음";
  };

  const hasData = answered.length > 0;
  const waiting = engineStats.filter((e) => !e.answered);

  return (
    <AdminShell>
      <div className="admin-header">
        <h1>AI 노출 모니터링</h1>
        <p className="desc">
          고객이 AI에게 물을 만한 질문 {config.questions.length}개를 그대로 묻고, 답변에 {config.brand.name}가 나오는지 확인합니다.
          마지막 수집 {formatKst(latest.updatedAt)}
        </p>
      </div>

      <div className="mon-engines">
        {engineStats.map((e) => (
          <span key={e.id} className={`mon-engine ${e.answered ? "on" : "off"}`}>
            <b>{e.label}</b>
            {e.answered
              ? `${formatKst(e.info?.collectedAt)} 수집${e.info?.via === "browser" ? " · 브라우저" : ""}`
              : e.info?.status === "error"
                ? "수집 실패 — 키 · 모델 확인 필요"
                : "API 키 등록 후 자동 수집"}
          </span>
        ))}
      </div>

      {!hasData ? (
        <div className="panel">
          <p className="mon-empty">아직 수집된 답변이 없습니다. API 키를 등록하면 다음 날 아침부터 자료가 쌓입니다.</p>
        </div>
      ) : (
        <>
          <div className="stat-grid mon-stats">
            <div className="stat-card">
              <div className="label">수집한 답변</div>
              <div className="value">
                {answered.length}
                <small> / {possible}</small>
              </div>
              <div className="change">질문 {config.questions.length}개 × AI {engineIds.length}곳</div>
            </div>
            <div className="stat-card mon-hero">
              <div className="label">브랜드 언급</div>
              <div className="value">
                {mentioned.length}
                <small>건 · {pct(mentioned.length, answered.length)}%</small>
              </div>
              <div className="mon-bar">
                <i style={{ width: `${pct(mentioned.length, answered.length)}%` }} />
              </div>
              <div className="change">답변 본문에 {config.brand.name} 이름이 나온 경우</div>
            </div>
            <div className="stat-card">
              <div className="label">출처로만 인용</div>
              <div className="value">
                {citedOnly.length}
                <small>건</small>
              </div>
              <div className="change">이름은 없지만 우리 사이트를 근거로 쓴 답변</div>
            </div>
            <div className="stat-card">
              <div className="label">구글 검색 1면</div>
              <div className="value">
                {latest.google.length ? rankTop10 : "—"}
                {latest.google.length > 0 && <small> / {latest.google.length} · 3위 안 {rankTop3}</small>}
              </div>
              <div className="change">인용된 출처 링크 {sourceCount}개</div>
            </div>
          </div>

          <div className="mon-grid">
            <div className="panel">
              <h2 className="panel-title">
                AI별 언급률
                <span className="meta">답변 본문 기준</span>
              </h2>
              {engineStats.map((e) => (
                <div key={e.id} className="mon-row">
                  <span className="mon-row-name">{e.label}</span>
                  {e.answered ? (
                    <>
                      <span className="mon-track">
                        <i className="a" style={{ width: `${pct(e.mentioned, e.answered)}%` }} />
                        <i className="b" style={{ width: `${pct(e.cited, e.answered)}%` }} />
                      </span>
                      <span className="mon-row-num">
                        <b>{pct(e.mentioned, e.answered)}%</b> {e.mentioned}/{e.answered}
                      </span>
                    </>
                  ) : (
                    <span className="mon-muted">수집 전</span>
                  )}
                </div>
              ))}
              <p className="mon-legend">
                <i className="a" /> 브랜드 언급 <i className="b" /> 출처로만 인용
              </p>
            </div>

            <div className="panel">
              <h2 className="panel-title">
                답변에 이름이 나온 출판사
                <span className="meta">횟수</span>
              </h2>
              {nameRank.slice(0, 8).map((n) => (
                <div key={n.name} className={`mon-row ${n.ours ? "ours" : ""}`}>
                  <span className="mon-row-name">{n.name}</span>
                  <span className="mon-track">
                    <i className={n.ours ? "a" : "c"} style={{ width: `${Math.round((n.count / nameMax) * 100)}%` }} />
                  </span>
                  <span className="mon-row-num">
                    <b>{n.count}</b>
                  </span>
                </div>
              ))}
            </div>
          </div>

          <h2 className="mon-section">오늘의 인사이트</h2>
          <div className="mon-grid">
            <div className="panel mon-insight warn">
              <h2 className="panel-title">
                우리 브랜드는 안 나오고, 경쟁사가 나옵니다
                <span className="meta">{lost.length}건</span>
              </h2>
              {lost.length === 0 ? (
                <p className="mon-muted">해당하는 답변이 없습니다.</p>
              ) : (
                <ul className="mon-lost">
                  {lost.slice(0, 7).map((l) => (
                    <li key={l.key}>
                      <strong>{l.question}</strong>
                      <span>
                        <em>{l.engine}</em>
                        {l.competitors.map((n) => (
                          <i key={n}>{n}</i>
                        ))}
                        {l.cited && <u>우리 사이트는 출처로 인용됨</u>}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
              {lost.length > 7 && <p className="mon-muted">외 {lost.length - 7}건 — 아래 목록에서 ‘경쟁사만 나옴’으로 볼 수 있습니다.</p>}
            </div>

            <div className="panel mon-insight">
              <h2 className="panel-title">
                AI가 많이 인용한 출처
                <span className="meta">상위 10곳</span>
              </h2>
              {domainRank.map((d) => (
                <div key={d.domain} className={`mon-row ${d.ours ? "ours" : ""}`}>
                  <span className="mon-row-name">{d.domain}</span>
                  <span className="mon-track">
                    <i className={d.ours ? "a" : "c"} style={{ width: `${Math.round((d.count / domainMax) * 100)}%` }} />
                  </span>
                  <span className="mon-row-num">
                    <b>{d.count}</b>
                  </span>
                </div>
              ))}
            </div>
          </div>

          {chance.length > 0 && (
            <div className="panel mon-insight good">
              <h2 className="panel-title">
                구글 1면에는 있는데 AI 답변에는 이름이 없는 질문
                <span className="meta">{chance.length}개 · 먼저 손볼 곳</span>
              </h2>
              <ul className="mon-chance">
                {chance.map((row) => (
                  <li key={row.id}>
                    <b>{row.rank}위</b>
                    {row.text}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {keywords.length > 0 && (
            <div className="panel">
              <h2 className="panel-title">
                검색어별 구글 순위
                <span className="meta">
                  {keywords.length}개 중 {keywordTop10}개 1면 · {formatKst(keywords[0]?.collectedAt)} 측정
                </span>
              </h2>
              <div className="mon-table-wrap">
                <table className="admin-table mon-keywords">
                  <thead>
                    <tr>
                      <th>검색어</th>
                      <th>우리 순위</th>
                      <th>변화</th>
                      <th>AI 개요</th>
                      <th>지금 1~3위</th>
                    </tr>
                  </thead>
                  <tbody>
                    {keywords.map((k) => (
                      <tr key={k.id}>
                        <td>
                          <strong>{k.keyword}</strong>
                        </td>
                        <td>
                          <span className={`mon-badge ${k.rank ? "s-rank" : "s-norank"}`}>
                            {k.rank ? `${k.rank}위` : "1면 밖"}
                          </span>
                        </td>
                        <td className="mon-muted-cell">{keywordChange(k)}</td>
                        <td>
                          <span
                            className={`mon-badge s-${
                              !k.aiOverview ? "empty" : k.aiBrand ? "mentioned" : k.aiCited ? "cited" : "none"
                            }`}
                          >
                            {!k.aiOverview ? "없음" : k.aiBrand ? "브랜드 언급" : k.aiCited ? "출처로 인용" : "언급 없음"}
                          </span>
                        </td>
                        <td className="mon-muted-cell">
                          {k.top
                            .slice(0, 3)
                            .map((t) => t.domain)
                            .join(" · ")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mon-muted">
                광고를 뺀 구글 첫 화면 기준입니다. 2면 이후의 정확한 순위는 재지 않습니다. 검색어는
                data/ai-monitor/config.json 의 keywords 에서 바꿉니다.
              </p>
            </div>
          )}

          <div className="panel">
            <h2 className="panel-title">
              날짜별 추이
              <span className="meta">최근 14일</span>
            </h2>
            <div className="mon-trend">
              {trend.map((t) => (
                <div key={t.date} className="mon-trend-col" title={`${t.date} · 언급 ${t.mentioned}/${t.answered}`}>
                  <span className="num">{t.rate}%</span>
                  <span className="col">
                    <i style={{ height: `${Math.max(4, t.rate)}%` }} />
                  </span>
                  <span className="day">{t.date.slice(5).replace("-", "/")}</span>
                </div>
              ))}
            </div>
            {trend.length < 2 && <p className="mon-muted">오늘이 첫 측정입니다. 다음 수집부터 날짜별 변화가 여기에 쌓입니다.</p>}
          </div>

          <h2 className="mon-section">질문별 결과</h2>
          <MonitoringList rows={rows} />
        </>
      )}

      <div className="panel mon-notes">
        <h2 className="panel-title">읽을 때 알아둘 점</h2>
        <ul>
          <li>AI 답변은 물을 때마다 조금씩 달라집니다. 하루 값보다 여러 날의 흐름을 보세요.</li>
          <li>
            ChatGPT · Gemini 는 공식 API 로 수집합니다. 앱 화면의 답변과 완전히 같지는 않을 수 있습니다.
            {waiting.length > 0 && ` 지금은 ${waiting.map((w) => w.label).join(" · ")} 의 API 키가 없어 수집 전입니다.`}
          </li>
          <li>Google AI 개요와 검색 순위는 한국어 · 한국 기준 검색 화면에서 가져온 값이며, 보는 사람과 시간에 따라 달라질 수 있습니다.</li>
          <li>질문과 경쟁사 목록은 data/ai-monitor/config.json 에서 바꿉니다.</li>
        </ul>
      </div>
    </AdminShell>
  );
}
