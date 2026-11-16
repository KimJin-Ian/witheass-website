"use client";

import { useLang } from "./LangContext";
import { GLANCE } from "@/lib/i18n-extra";

/**
 * 「한눈에 보기」 — 글 대신 그림으로 보여 주는 요약 (2026-11-16)
 *
 * 긴 설명을 읽기 전에 그림만 보고도 알 수 있게 한다:
 *   1) 진행 흐름 — 인터뷰에서 서점 · 마케팅까지 일곱 단계 그림
 *   2) 숫자 그림 — 인세 도넛(45% · 20%) · 기간 막대 · 출간 권수 책장
 *   3) 패키지 계단 — 네 패키지에 무엇이 들어 있는지 아이콘으로
 *
 * 회사 소개(/about)와 영어 · 중국어 · 일본어 페이지(/en · /zh · /ja) 첫 화면 바로 아래에 들어간다.
 * 문구는 lib/i18n-extra.ts 의 GLANCE, 가격 · 기간 · 권수는 기존 번역 키를 그대로 읽는다.
 * 그림은 전부 이 파일 안의 SVG 라 이미지 파일이 따로 없다.
 */

type IconName =
  | "interview" | "writing" | "design" | "print" | "store" | "ebook"
  | "marketing" | "speaking" | "manuscript" | "edit" | "book" | "pro";

function Icon({ name, size = 26 }: { name: IconName; size?: number }) {
  const p = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (name) {
    case "interview":
      return (<svg {...p}><path d="M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3z" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3M9 21h6" /></svg>);
    case "writing":
      return (<svg {...p}><path d="M4 20l1-4L16.5 4.5a2.1 2.1 0 0 1 3 3L8 19l-4 1z" /><path d="M14 7l3 3" /></svg>);
    case "design":
      return (<svg {...p}><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18M9 9v11" /></svg>);
    case "print":
      return (<svg {...p}><path d="M7 8V3h10v5" /><path d="M7 17H5a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" /><path d="M7 14h10v7H7z" /></svg>);
    case "store":
      return (<svg {...p}><path d="M3 9l1.5-5h15L21 9" /><path d="M4 9v11h16V9" /><path d="M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0" /><path d="M9 20v-6h6v6" /></svg>);
    case "ebook":
      return (<svg {...p}><rect x="6" y="2" width="12" height="20" rx="2" /><path d="M9 7h6M9 10h6M10.5 18h3" /></svg>);
    case "marketing":
      return (<svg {...p}><path d="M3 10v4h3l8 4V6L6 10H3z" /><path d="M17 9a4 4 0 0 1 0 6M7 14v5h3" /></svg>);
    case "speaking":
      return (<svg {...p}><circle cx="12" cy="6" r="3" /><path d="M6 21v-2a6 6 0 0 1 12 0v2M4 21h16" /></svg>);
    case "manuscript":
      return (<svg {...p}><path d="M6 3h9l4 4v14H6z" /><path d="M15 3v4h4M9 12h7M9 16h7" /></svg>);
    case "edit":
      return (<svg {...p}><path d="M9 11l3 3 8-8" /><path d="M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h9" /></svg>);
    case "book":
      return (<svg {...p}><path d="M5 4h12a2 2 0 0 1 2 2v14H7a2 2 0 0 1-2-2z" /><path d="M5 18a2 2 0 0 1 2-2h12M9 8h6" /></svg>);
    case "pro":
      return (<svg {...p}><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18" /></svg>);
  }
}

/** 도넛 그림 — 비율(%)만큼 금색으로 채운다 */
function Donut({ pct, size }: { pct: number; size: number }) {
  const r = 42;
  const c = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      <circle cx="50" cy="50" r={r} fill="none" stroke="var(--gold-100)" strokeWidth="12" />
      <circle
        cx="50" cy="50" r={r} fill="none" stroke="var(--gold-600)" strokeWidth="12" strokeLinecap="round"
        strokeDasharray={`${(c * pct) / 100} ${c}`} transform="rotate(-90 50 50)"
      />
      <text x="50" y="57" textAnchor="middle" fontSize="22" fontWeight="800" fill="var(--navy-900)">{pct}%</text>
    </svg>
  );
}

const FLOW: IconName[] = ["interview", "writing", "design", "print", "store", "ebook", "marketing"];

export default function VisualGlance() {
  const { t, lang } = useLang();
  const g = GLANCE[lang];

  // 패키지 계단 — 가격 · 이름은 가격표와 같은 키를 읽는다 (한곳을 고치면 같이 바뀐다)
  const ladder: { key: string; title: string; icons: [IconName, string][]; top?: boolean }[] = [
    {
      key: "p2",
      title: t("pricing.p2.title"),
      icons: [["manuscript", g.icon.manuscript], ["edit", g.icon.edit], ["book", g.icon.book], ["store", g.icon.store]],
    },
    {
      key: "p3",
      title: t("pricing.p3.title"),
      icons: [["interview", g.icon.interview], ["book", g.icon.book], ["store", g.icon.store], ["ebook", g.icon.ebook]],
    },
    {
      key: "p15",
      title: t("pricing.p15.title"),
      icons: [["pro", g.icon.pro]],
    },
    {
      key: "p4",
      title: `${t("pricing.p4.title1")} ${t("pricing.p4.title2")}`,
      icons: [
        ["interview", g.icon.interview], ["book", g.icon.book], ["store", g.icon.store],
        ["ebook", g.icon.ebook], ["marketing", g.icon.marketing], ["speaking", g.icon.speaking],
      ],
      top: true,
    },
  ];

  return (
    <section id="glance" className="vg">
      {/* 따옴표가 든 CSS 는 글자로 넣으면 서버 · 브라우저 결과가 달라져 오류가 난다 — HTML 로 그대로 넣는다 */}
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="container">
        <div className="section-eyebrow" style={{ textAlign: "center" }}>{g.eyebrow}</div>
        <h2 className="section-title" style={{ textAlign: "center" }}>{g.title}</h2>

        {/* 1) 진행 흐름 */}
        <ol className="vg-flow">
          {FLOW.map((name, i) => (
            <li key={name}>
              <span className="vg-dot"><Icon name={name} size={28} /></span>
              <span className="vg-step">{String(i + 1).padStart(2, "0")}</span>
              <span className="vg-label">{g.steps[i]}</span>
            </li>
          ))}
        </ol>

        {/* 2) 숫자 그림 */}
        <div className="vg-nums">
          <div className="vg-card vg-royalty">
            <div className="vg-donut">
              <Donut pct={45} size={132} />
              <span>{g.royaltyPrint}</span>
            </div>
            <div className="vg-donut">
              <Donut pct={20} size={132} />
              <span>{g.royaltyEbook}</span>
            </div>
          </div>

          <div className="vg-card">
            <div className="vg-big">{t("hero.stat.time.num")}</div>
            <div className="vg-track" aria-hidden="true">
              {(["interview", "writing", "design", "print", "store"] as IconName[]).map((n) => (
                <span key={n}><Icon name={n} size={18} /></span>
              ))}
            </div>
            <div className="vg-cap">{t("hero.stat.time.lbl")}</div>
          </div>

          <div className="vg-card">
            <div className="vg-big">{t("hero.stat.published.num")}</div>
            <div className="vg-shelf" aria-hidden="true">
              {[34, 46, 40, 52, 38, 48, 44, 54, 36, 50, 42, 46, 38, 52].map((h, i) => (
                <i key={i} style={{ height: h, opacity: 0.45 + (i % 4) * 0.18 }} />
              ))}
            </div>
            <div className="vg-cap">{t("hero.stat.published.lbl")}</div>
          </div>
        </div>

        {/* 3) 패키지 계단 */}
        <h3 className="vg-h3">{g.ladderTitle}</h3>
        <div className="vg-ladder">
          {ladder.map((s, i) => (
            <a key={s.key} href="#pricing" className={`vg-stair${s.top ? " top" : ""}`} style={{ ["--lift" as string]: `${(3 - i) * 26}px` }}>
              <div className="vg-price">
                {t(`pricing.${s.key}.price`)}<small>{t(`pricing.${s.key}.priceSuffix`)}</small>
              </div>
              <div className="vg-name">{s.title}</div>
              <ul>
                {s.icons.map(([name, label], k) => (
                  <li key={k}><Icon name={name} size={22} /><span>{label}</span></li>
                ))}
              </ul>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

const CSS = `
.vg { background: var(--white); padding: 84px 0; }
.vg .section-title { margin-bottom: 44px; }
.vg-flow { list-style: none; display: grid; grid-template-columns: repeat(7, 1fr); gap: 0; margin: 0 0 56px; padding: 0; position: relative; }
.vg-flow::before { content: ""; position: absolute; left: 7%; right: 7%; top: 36px; height: 2px; background: linear-gradient(90deg, var(--gold-100), var(--gold-600), var(--gold-100)); }
.vg-flow li { display: flex; flex-direction: column; align-items: center; gap: 6px; position: relative; text-align: center; padding: 0 4px; }
.vg-dot { width: 72px; height: 72px; border-radius: 50%; background: var(--navy-900); color: var(--gold-500); display: grid; place-items: center; box-shadow: 0 0 0 6px var(--white), var(--shadow-md); }
.vg-step { font-size: 11px; letter-spacing: 0.18em; color: var(--gold-600); font-weight: 700; margin-top: 8px; }
.vg-label { font-size: 15px; font-weight: 700; color: var(--navy-900); line-height: 1.3; }
.vg-nums { display: grid; grid-template-columns: 1.3fr 1fr 1fr; gap: 20px; margin-bottom: 64px; }
.vg-card { background: var(--gold-50); border: 1px solid var(--gold-100); border-radius: var(--radius-lg); padding: 28px 24px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px; text-align: center; }
.vg-royalty { flex-direction: row; gap: 28px; }
.vg-donut { display: flex; flex-direction: column; align-items: center; gap: 8px; }
.vg-donut span, .vg-cap { font-size: 12.5px; letter-spacing: 0.08em; color: var(--text-500); font-weight: 600; }
.vg-big { font-size: 40px; font-weight: 800; color: var(--navy-900); letter-spacing: -0.02em; line-height: 1.1; }
.vg-track { display: flex; align-items: center; width: 100%; max-width: 250px; justify-content: space-between; position: relative; }
.vg-track::before { content: ""; position: absolute; left: 12px; right: 12px; top: 50%; height: 6px; margin-top: -3px; border-radius: 3px; background: linear-gradient(90deg, var(--gold-100), var(--gold-600)); }
.vg-track span { width: 34px; height: 34px; border-radius: 50%; background: var(--white); border: 2px solid var(--gold-600); color: var(--navy-900); display: grid; place-items: center; position: relative; }
.vg-shelf { display: flex; align-items: flex-end; gap: 4px; height: 58px; border-bottom: 3px solid var(--navy-900); padding: 0 6px; }
.vg-shelf i { display: block; width: 10px; background: var(--gold-600); border-radius: 2px 2px 0 0; }
.vg-shelf i:nth-child(3n) { background: var(--navy-700); }
.vg-h3 { text-align: center; font-size: 22px; color: var(--navy-900); margin-bottom: 28px; }
.vg-ladder { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; align-items: stretch; }
.vg-stair { display: flex; flex-direction: column; gap: 10px; background: var(--white); border: 1px solid var(--line); border-top: 4px solid var(--gold-600); border-radius: var(--radius-md); padding: 22px 18px; margin-top: var(--lift, 0px); color: inherit; text-decoration: none; box-shadow: var(--shadow-sm); transition: transform 0.15s, box-shadow 0.15s; }
.vg-stair:hover { transform: translateY(-3px); box-shadow: var(--shadow-md); }
.vg-stair.top { background: var(--navy-900); border-color: var(--navy-900); border-top-color: var(--gold-500); }
.vg-price { font-size: 34px; font-weight: 800; color: var(--navy-900); line-height: 1; }
.vg-price small { font-size: 13px; font-weight: 600; color: var(--text-500); margin-left: 4px; }
.vg-name { font-size: 13.5px; font-weight: 700; color: var(--text-700); line-height: 1.35; min-height: 2.7em; }
.vg-stair ul { list-style: none; margin: 4px 0 0; padding: 0; display: grid; grid-template-columns: 1fr 1fr; gap: 10px 8px; }
.vg-stair li { display: flex; flex-direction: column; align-items: center; gap: 5px; text-align: center; font-size: 11.5px; color: var(--text-700); line-height: 1.25; background: var(--gold-50); border-radius: 10px; padding: 10px 4px; }
.vg-stair li:only-child { grid-column: 1 / -1; }
.vg-stair li svg { color: var(--gold-600); }
.vg-stair.top .vg-price, .vg-stair.top .vg-name { color: var(--white); }
.vg-stair.top .vg-price small { color: rgba(255,255,255,0.65); }
.vg-stair.top li { background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.88); }
.vg-stair.top li svg { color: var(--gold-500); }
@media (max-width: 900px) {
  .vg { padding: 56px 0; }
  .vg .section-title { margin-bottom: 30px; }
  .vg-flow { grid-template-columns: repeat(4, 1fr); row-gap: 22px; margin-bottom: 40px; }
  .vg-flow::before { display: none; }
  .vg-dot { width: 60px; height: 60px; box-shadow: var(--shadow-sm); }
  .vg-label { font-size: 12px; letter-spacing: -0.02em; }
  .vg-nums { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 12px; margin-bottom: 44px; }
  .vg-royalty { grid-column: 1 / -1; }
  .vg-card { padding: 22px 14px; }
  .vg-big { font-size: 28px; }
  .vg-track span { width: 28px; height: 28px; }
  .vg-track span svg { width: 15px; height: 15px; }
  .vg-shelf { gap: 3px; padding: 0 4px; max-width: 100%; overflow: hidden; }
  .vg-shelf i { width: 5px; }
  .vg-royalty { gap: 16px; }
  .vg-donut svg { width: 112px; height: 112px; }
  .vg-h3 { font-size: 18px; margin-bottom: 18px; }
  .vg-ladder { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 12px; align-items: stretch; }
  .vg-stair { margin-top: 0; padding: 18px 12px; }
  .vg-price { font-size: 28px; }
}
`;
