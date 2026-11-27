#!/usr/bin/env node
/**
 * AI 노출 모니터링 — 수집기
 *
 * data/ai-monitor/config.json 의 질문을 AI 서비스에 그대로 묻고, 답변에 우리 브랜드가 나오는지,
 * 어떤 경쟁사가 나오는지, 무엇을 출처로 인용했는지 기록한다. 결과는 data/ai-monitor/latest.json 과
 * history.json 에 쌓이고, 관리자 화면(/admin/monitoring)이 이 두 파일을 읽는다.
 *
 * 실행:  node scripts/ai-monitor.mjs
 *   키가 있는 서비스만 수집한다. 키가 하나도 없으면 아무것도 바꾸지 않고 끝난다.
 *     OPENAI_API_KEY    ChatGPT (웹 검색 포함)
 *     GEMINI_API_KEY    Gemini (구글 검색 포함)
 *     SERPAPI_KEY       Google AI 개요 + 구글 검색 순위 (선택)
 *     DEEPSEEK_API_KEY  DeepSeek (선택)
 *   모델을 바꾸려면 OPENAI_MODEL · GEMINI_MODEL · DEEPSEEK_MODEL 을 지정한다.
 *
 * 브라우저로 모은 구글 검색 원본을 넣을 때:
 *   node scripts/ai-monitor.mjs --import-google-browser data/ai-monitor/raw/파일.json --date 2026-11-18
 *
 * 키는 코드나 저장소 파일에 적지 않는다. GitHub 저장소의 Actions secrets 에만 둔다.
 */
import fs from "node:fs";
import path from "node:path";

const DIR = path.join(process.cwd(), "data", "ai-monitor");
const LATEST = path.join(DIR, "latest.json");
const HISTORY = path.join(DIR, "history.json");
const config = JSON.parse(fs.readFileSync(path.join(DIR, "config.json"), "utf8"));

const ENGINE_LABEL = {
  chatgpt: "ChatGPT",
  gemini: "Gemini",
  google_ai: "Google AI 개요",
  deepseek: "DeepSeek",
};
const ENGINE_ORDER = ["chatgpt", "gemini", "google_ai", "deepseek"];
const MAX_TEXT = 4000;
const MAX_SOURCES = 20;

// ───────────────────────── 공통 도구 ─────────────────────────

function readJson(file, fallback) {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch {
    return fallback;
  }
}

function domainOf(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    return "";
  }
}

function matchesDomain(domain, list) {
  return list.some((d) => domain === d || domain.endsWith("." + d));
}

function includesAny(text, aliases) {
  const lower = text.toLowerCase();
  return aliases.some((a) => a && lower.includes(a.toLowerCase()));
}

/** 답변 본문과 출처에서 우리 브랜드 · 경쟁사를 찾는다. */
function analyze(text, sources) {
  const domains = sources.map((s) => s.domain).filter(Boolean);
  const brand = includesAny(text, config.brand.aliases);
  const brandCited = domains.some((d) => matchesDomain(d, config.brand.domains));
  const competitors = [];
  const competitorsCited = [];
  for (const c of config.competitors) {
    if (includesAny(text, c.aliases)) competitors.push(c.name);
    if (c.domains.length && domains.some((d) => matchesDomain(d, c.domains))) competitorsCited.push(c.name);
  }
  return { brand, brandCited, competitors, competitorsCited };
}

function normalizeSources(list) {
  const seen = new Set();
  const out = [];
  for (const s of list) {
    const url = String(s.url || "").split("#:~:")[0];
    if (!url || seen.has(url)) continue;
    seen.add(url);
    let domain = domainOf(url);
    // Gemini 는 출처 주소를 구글 경유 주소로 주고, 제목에 실제 도메인을 적는 경우가 있다.
    const title = String(s.title || "").trim().slice(0, 140);
    if (/vertexaisearch\.cloud\.google\.com$/.test(domain) && /^[a-z0-9.-]+\.[a-z]{2,}$/i.test(title)) {
      domain = title.replace(/^www\./, "").toLowerCase();
    }
    out.push({ title, url, domain });
    if (out.length >= MAX_SOURCES) break;
  }
  return out;
}

function makeResult(qid, engine, via, collectedAt, text, rawSources, extra = {}) {
  const body = String(text || "").trim();
  const sources = normalizeSources(rawSources || []);
  const answered = body.length >= 40;
  return {
    qid,
    engine,
    via,
    collectedAt,
    answered,
    text: body.slice(0, MAX_TEXT),
    truncated: body.length > MAX_TEXT,
    ...analyze(answered ? body : "", sources),
    sources,
    ...extra,
  };
}

async function fetchJson(url, init = {}, timeoutMs = 150_000) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(url, { ...init, signal: ctrl.signal });
    const raw = await res.text();
    let json = null;
    try {
      json = JSON.parse(raw);
    } catch {
      /* JSON 이 아니면 아래에서 오류로 처리 */
    }
    if (!res.ok) {
      const msg = json?.error?.message || json?.error || raw.slice(0, 200);
      const err = new Error(`HTTP ${res.status}: ${typeof msg === "string" ? msg : JSON.stringify(msg).slice(0, 200)}`);
      err.status = res.status;
      throw err;
    }
    return json;
  } finally {
    clearTimeout(timer);
  }
}

async function withRetry(fn, tries = 2) {
  let lastErr;
  for (let i = 0; i < tries; i++) {
    try {
      return await fn();
    } catch (err) {
      lastErr = err;
      // 키 · 권한 문제는 다시 해도 같다.
      if (err.status === 401 || err.status === 403) break;
      await new Promise((r) => setTimeout(r, 3000 * (i + 1)));
    }
  }
  throw lastErr;
}

async function pool(items, size, worker) {
  const out = new Array(items.length);
  let next = 0;
  await Promise.all(
    Array.from({ length: Math.min(size, items.length) }, async () => {
      while (next < items.length) {
        const i = next++;
        out[i] = await worker(items[i], i);
      }
    })
  );
  return out;
}

// ───────────────────────── 서비스별 수집 ─────────────────────────

const ENGINES = {
  chatgpt: {
    key: () => process.env.OPENAI_API_KEY,
    model: () => process.env.OPENAI_MODEL || "gpt-6.2-astra",
    async ask(question) {
      const json = await fetchJson("https://api.openai.com/v1/responses", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${this.key()}` },
        body: JSON.stringify({
          model: this.model(),
          tools: [{ type: "web_search", user_location: { type: "approximate", country: "KR", timezone: "Asia/Seoul" } }],
          input: question,
        }),
      });
      let text = "";
      const sources = [];
      for (const item of json?.output || []) {
        if (item.type !== "message") continue;
        for (const part of item.content || []) {
          if (part.type !== "output_text") continue;
          text += (text ? "\n" : "") + (part.text || "");
          for (const a of part.annotations || []) {
            if (a.type === "url_citation") sources.push({ title: a.title, url: a.url });
          }
        }
      }
      if (!text && typeof json?.output_text === "string") text = json.output_text;
      return { text, sources };
    },
  },

  gemini: {
    key: () => process.env.GEMINI_API_KEY,
    model: () => process.env.GEMINI_MODEL || "gemini-3.8-flash",
    async ask(question) {
      const headers = { "Content-Type": "application/json", "x-goog-api-key": this.key() };
      if (process.env.GEMINI_API_REVISION) headers["Api-Revision"] = process.env.GEMINI_API_REVISION;
      const base = "https://generativelanguage.googleapis.com/v1beta";
      try {
        const json = await fetchJson(`${base}/interactions`, {
          method: "POST",
          headers,
          body: JSON.stringify({ model: this.model(), input: question, tools: [{ type: "google_search" }] }),
        });
        let text = "";
        const sources = [];
        for (const step of json?.steps || json?.outputs || []) {
          if (step.type !== "model_output" && step.type !== "text") continue;
          const parts = step.content || [step];
          for (const part of parts) {
            if (part.type !== "text") continue;
            text += (text ? "\n" : "") + (part.text || "");
            for (const a of part.annotations || []) {
              if (a.type === "url_citation") sources.push({ title: a.title, url: a.url });
            }
          }
        }
        if (text) return { text, sources };
        throw Object.assign(new Error("빈 응답"), { status: 0 });
      } catch (err) {
        if (err.status === 401 || err.status === 403) throw err;
        // 예전 방식(generateContent)으로 한 번 더 시도한다.
        const json = await fetchJson(`${base}/models/${this.model()}:generateContent`, {
          method: "POST",
          headers,
          body: JSON.stringify({ contents: [{ parts: [{ text: question }] }], tools: [{ google_search: {} }] }),
        });
        const cand = json?.candidates?.[0];
        const text = (cand?.content?.parts || []).map((p) => p.text || "").join("");
        const sources = (cand?.groundingMetadata?.groundingChunks || [])
          .map((c) => ({ title: c.web?.title, url: c.web?.uri }))
          .filter((s) => s.url);
        return { text, sources };
      }
    },
  },

  google_ai: {
    key: () => process.env.SERPAPI_KEY,
    model: () => "serpapi",
    async ask(question) {
      const params = new URLSearchParams({ engine: "google", q: question, hl: "ko", gl: "kr", api_key: this.key() });
      const json = await fetchJson(`https://serpapi.com/search.json?${params}`);
      let overview = json?.ai_overview;
      if (overview?.page_token && !overview.text_blocks) {
        const p2 = new URLSearchParams({ engine: "google_ai_overview", page_token: overview.page_token, api_key: this.key() });
        overview = (await fetchJson(`https://serpapi.com/search.json?${p2}`))?.ai_overview;
      }
      const lines = [];
      const walk = (blocks) => {
        for (const b of blocks || []) {
          if (b.snippet) lines.push(b.snippet);
          if (b.title && !b.snippet) lines.push(b.title);
          walk(b.list);
          walk(b.text_blocks);
        }
      };
      walk(overview?.text_blocks);
      const sources = (overview?.references || []).map((r) => ({ title: r.title || r.source, url: r.link }));
      const organic = (json?.organic_results || []).map((o) => ({ title: o.title, url: o.link }));
      return { text: lines.join("\n"), sources, organic };
    },
  },

  deepseek: {
    key: () => process.env.DEEPSEEK_API_KEY,
    model: () => process.env.DEEPSEEK_MODEL || "deepseek-chat",
    async ask(question) {
      const json = await fetchJson("https://api.deepseek.com/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${this.key()}` },
        body: JSON.stringify({ model: this.model(), messages: [{ role: "user", content: question }] }),
      });
      return { text: json?.choices?.[0]?.message?.content || "", sources: [] };
    },
  },
};

function googleRankEntry(qid, via, collectedAt, organic) {
  const top = normalizeSources(organic).slice(0, 10);
  const idx = top.findIndex((o) => matchesDomain(o.domain, config.brand.domains));
  return { qid, via, collectedAt, rank: idx < 0 ? null : idx + 1, top };
}

/**
 * 짧은 검색어(예: 책출판) 한 건의 구글 결과 — 우리 사이트가 1면 몇 번째인지, AI 개요에 나오는지.
 * 직전 측정값(prev)이 있으면 순위 변화를 볼 수 있게 함께 남긴다.
 */
function keywordEntry(keyword, via, collectedAt, organic, aiText, aiSources, prev) {
  const top = normalizeSources(organic).slice(0, 10);
  const idx = top.findIndex((o) => matchesDomain(o.domain, config.brand.domains));
  const text = String(aiText || "").trim();
  const found = analyze(text, normalizeSources(aiSources || []));
  return {
    id: keyword.id,
    keyword: keyword.text,
    via,
    collectedAt,
    rank: idx < 0 ? null : idx + 1,
    prevRank: prev ? (prev.rank ?? null) : null,
    prevCollectedAt: prev ? prev.collectedAt : null,
    top: top.slice(0, 5),
    aiOverview: text.length >= 40,
    aiBrand: found.brand,
    aiCited: found.brandCited,
  };
}

// ───────────────────────── 브라우저 수집본 가져오기 ─────────────────────────

/** 구글 검색 화면에서 그대로 복사한 AI 개요 글을 답변 본문만 남기도록 정리한다. */
function cleanGoogleAiText(raw, sources) {
  let text = String(raw || "")
    .replace(/[.#@][\w-]+[^{}\n]*\{[^{}]*\}/g, "")
    .replace(/ /g, " ");
  const end = text.search(/AI 대답에는 오류가 있을 수 있습니다|AI responses may include mistakes/);
  const complete = end >= 0;
  if (complete) text = text.slice(0, end);
  const chips = new Set();
  for (const s of sources) {
    for (const part of String(s.t || s.title || "").split("·")) {
      const p = part.trim();
      if (p && p.length <= 40) chips.add(p);
    }
  }
  const lines = text.split("\n").map((l) => l.trim());
  const kept = [];
  for (const line of lines) {
    if (!line || /^(AI 개요|AI Overview|모두 표시|더보기)$/.test(line)) continue;
    if (/^\+\d+$/.test(line)) continue;
    if (chips.has(line.replace(/^·\s*/, ""))) continue;
    kept.push(line);
  }
  return { text: kept.join("\n"), complete };
}

function importGoogleBrowser(file, date, previousKeywords = []) {
  const raw = readJson(file, null);
  if (!raw) throw new Error(`파일을 읽지 못했습니다: ${file}`);
  const results = [];
  const google = [];
  const keywords = [];
  for (const k of config.keywords || []) {
    const item = raw[k.id];
    if (!item) continue;
    const collectedAt = item.at || `${date}T00:00:00.000Z`;
    const cleaned = cleanGoogleAiText(item.ai?.text, item.ai?.sources || []);
    keywords.push(
      keywordEntry(
        k,
        "browser",
        collectedAt,
        (item.organic || []).map((o) => ({ title: o.t, url: o.u })),
        cleaned.text,
        (item.ai?.sources || []).map((s) => ({ title: s.t, url: s.u })),
        previousKeywords.find((p) => p.id === k.id)
      )
    );
  }
  for (const q of config.questions) {
    const item = raw[q.id];
    if (!item) continue;
    const collectedAt = item.at || `${date}T00:00:00.000Z`;
    const srcs = (item.ai?.sources || []).map((s) => ({ title: s.t, url: s.u }));
    const cleaned = cleanGoogleAiText(item.ai?.text, item.ai?.sources || []);
    results.push(
      makeResult(q.id, "google_ai", "browser", collectedAt, cleaned.text, srcs, cleaned.complete ? {} : { partial: true })
    );
    google.push(googleRankEntry(q.id, "browser", collectedAt, (item.organic || []).map((o) => ({ title: o.t, url: o.u }))));
  }
  return { results, google, keywords };
}

// ───────────────────────── 저장 ─────────────────────────

function kstDate(d = new Date()) {
  return new Date(d.getTime() + 9 * 3600 * 1000).toISOString().slice(0, 10);
}

function summarize(latest) {
  const engines = {};
  for (const id of ENGINE_ORDER) {
    const rows = latest.results.filter((r) => r.engine === id && r.answered);
    if (!rows.length) continue;
    engines[id] = {
      answered: rows.length,
      mentioned: rows.filter((r) => r.brand).length,
      cited: rows.filter((r) => r.brandCited).length,
    };
  }
  const g = latest.google || [];
  const k = latest.keywords || [];
  return {
    engines,
    google: g.length
      ? { checked: g.length, top10: g.filter((x) => x.rank).length, top3: g.filter((x) => x.rank && x.rank <= 3).length }
      : null,
    keywords: k.length
      ? { checked: k.length, top10: k.filter((x) => x.rank).length, top3: k.filter((x) => x.rank && x.rank <= 3).length }
      : null,
  };
}

function save(latest, date) {
  latest.version = 1;
  latest.updatedAt = new Date().toISOString();
  latest.date = date;
  latest.results.sort((a, b) => a.qid.localeCompare(b.qid) || ENGINE_ORDER.indexOf(a.engine) - ENGINE_ORDER.indexOf(b.engine));
  fs.writeFileSync(LATEST, JSON.stringify(latest, null, 1) + "\n");
  const history = readJson(HISTORY, []).filter((h) => h.date !== date);
  history.push({ date, ...summarize(latest) });
  history.sort((a, b) => a.date.localeCompare(b.date));
  fs.writeFileSync(HISTORY, JSON.stringify(history.slice(-180), null, 1) + "\n");
}

function emptyLatest() {
  return { version: 1, updatedAt: null, date: null, engines: {}, results: [], google: [], keywords: [] };
}

// ───────────────────────── 실행 ─────────────────────────

async function main() {
  const args = process.argv.slice(2);
  const argOf = (name) => {
    const i = args.indexOf(name);
    return i >= 0 ? args[i + 1] : null;
  };
  const latest = readJson(LATEST, emptyLatest());
  latest.engines ||= {};
  latest.results ||= [];
  latest.google ||= [];
  latest.keywords ||= [];

  const importFile = argOf("--import-google-browser");
  if (importFile) {
    const date = argOf("--date") || kstDate();
    const { results, google, keywords } = importGoogleBrowser(importFile, date, latest.keywords);
    // 질문만 든 파일 · 검색어만 든 파일을 따로 넣어도 서로 지우지 않는다.
    if (results.length) {
      latest.results = latest.results.filter((r) => r.engine !== "google_ai").concat(results);
      latest.google = google;
      latest.engines.google_ai = {
        label: ENGINE_LABEL.google_ai,
        status: "ok",
        via: "browser",
        model: null,
        collectedAt: results[0]?.collectedAt || null,
      };
    }
    if (keywords.length) {
      const ids = new Set(keywords.map((k) => k.id));
      latest.keywords = latest.keywords.filter((k) => !ids.has(k.id)).concat(keywords).sort((a, b) => a.id.localeCompare(b.id));
    }
    for (const id of ["chatgpt", "gemini"]) {
      latest.engines[id] ||= { label: ENGINE_LABEL[id], status: "no_key", via: "api", model: null, collectedAt: null };
    }
    save(latest, date);
    console.log(`구글 브라우저 수집본 — 질문 ${results.length}건 · 검색어 ${keywords.length}건을 반영했습니다.`);
    return;
  }

  const active = ENGINE_ORDER.filter((id) => ENGINES[id].key());
  for (const id of ["chatgpt", "gemini"]) {
    if (!active.includes(id) && !latest.engines[id]?.collectedAt) {
      latest.engines[id] = { label: ENGINE_LABEL[id], status: "no_key", via: "api", model: null, collectedAt: null };
    }
  }
  if (!active.length) {
    console.log("등록된 API 키가 없어 수집을 건너뜁니다. (OPENAI_API_KEY · GEMINI_API_KEY)");
    return;
  }

  const only = argOf("--only");
  const questions = only ? config.questions.filter((q) => only.split(",").includes(q.id)) : config.questions;
  const date = kstDate();

  for (const id of active) {
    const engine = ENGINES[id];
    console.log(`\n[${ENGINE_LABEL[id]}] 질문 ${questions.length}개 수집 시작 (${engine.model()})`);
    let fatal = null;
    const rows = await pool(questions, id === "google_ai" ? 2 : 3, async (q) => {
      if (fatal) return null;
      const collectedAt = new Date().toISOString();
      try {
        const res = await withRetry(() => engine.ask(q.text));
        const row = makeResult(q.id, id, "api", collectedAt, res.text, res.sources);
        console.log(`  ${q.id} ${row.answered ? (row.brand ? "브랜드 언급" : "언급 없음") : "답변 없음"} · 출처 ${row.sources.length}`);
        return { row, organic: res.organic, collectedAt };
      } catch (err) {
        if (err.status === 401 || err.status === 403) fatal = err;
        console.log(`  ${q.id} 실패: ${err.message}`);
        return { row: { qid: q.id, engine: id, via: "api", collectedAt, answered: false, text: "", brand: false, brandCited: false, competitors: [], competitorsCited: [], sources: [], error: String(err.message).slice(0, 160) } };
      }
    });
    const done = rows.filter(Boolean);
    const okCount = done.filter((d) => d.row.answered).length;
    if (!okCount) {
      // 한 건도 못 받았으면 어제 자료를 지우지 않는다.
      latest.engines[id] = { ...(latest.engines[id] || { label: ENGINE_LABEL[id] }), status: "error", error: String(fatal?.message || done[0]?.row.error || "수집 실패").slice(0, 160), lastTriedAt: new Date().toISOString() };
      continue;
    }
    const ids = new Set(done.map((d) => d.row.qid));
    latest.results = latest.results.filter((r) => !(r.engine === id && ids.has(r.qid))).concat(done.map((d) => d.row));
    latest.engines[id] = { label: ENGINE_LABEL[id], status: "ok", via: "api", model: engine.model(), collectedAt: new Date().toISOString() };
    if (id === "google_ai") {
      const ranks = done.filter((d) => d.organic?.length).map((d) => googleRankEntry(d.row.qid, "api", d.collectedAt, d.organic));
      const rankIds = new Set(ranks.map((r) => r.qid));
      latest.google = latest.google.filter((g) => !rankIds.has(g.qid)).concat(ranks).sort((a, b) => a.qid.localeCompare(b.qid));
    }
  }

  // 검색어 순위 — 검색 API 키가 있을 때만 (Google AI 개요와 같은 경로)
  if (active.includes("google_ai") && (config.keywords || []).length) {
    console.log(`\n[검색어 순위] ${config.keywords.length}개 수집 시작`);
    const rows = await pool(config.keywords, 2, async (k) => {
      const collectedAt = new Date().toISOString();
      try {
        const res = await withRetry(() => ENGINES.google_ai.ask(k.text));
        const prev = latest.keywords.find((p) => p.id === k.id);
        return keywordEntry(k, "api", collectedAt, res.organic || [], res.text, res.sources, prev);
      } catch (err) {
        console.log(`  ${k.id} 실패: ${err.message}`);
        return null;
      }
    });
    const ok = rows.filter(Boolean);
    if (ok.length) {
      const ids = new Set(ok.map((k) => k.id));
      latest.keywords = latest.keywords.filter((k) => !ids.has(k.id)).concat(ok).sort((a, b) => a.id.localeCompare(b.id));
    }
  }

  save(latest, date);
  const s = summarize(latest);
  console.log("\n요약:", JSON.stringify(s));
}

main().catch((err) => {
  console.error("수집기 오류:", err);
  process.exit(1);
});
