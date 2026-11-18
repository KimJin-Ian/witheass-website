import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "../../components/SiteHeader";
import { KAKAO_CHAT } from "@/lib/links";
import { QUESTION_GUIDES, type Block } from "@/lib/question-guides";
import s from "../guide.module.css";

/**
 * AI 질문형 상세 페이지 (2026-11-14) — 내용은 lib/question-guides.ts
 * /guide/book-publishing 과 같은 디자인. 구조화 데이터는 자바스크립트 없이 읽히도록 일반 <script> 로 넣는다.
 */

const SITE_URL = "https://www.bookpublishingwithess.com";
const UPDATED = "2026-11-14";

export const dynamicParams = false;
export function generateStaticParams() {
  return QUESTION_GUIDES.map((g) => ({ topic: g.slug }));
}

const find = (topic: string) => QUESTION_GUIDES.find((g) => g.slug === topic);

export function generateMetadata({ params }: { params: { topic: string } }): Metadata {
  const g = find(params.topic);
  if (!g) return {};
  const url = `${SITE_URL}/guide/${g.slug}`;
  return {
    title: g.title,
    description: g.description,
    alternates: { canonical: url },
    openGraph: { title: g.title, description: g.description, url, type: "article", siteName: "드림위드에스 출판사", images: [{ url: `${SITE_URL}/og-image.png?v=2`, width: 1200, height: 630 }] },
  };
}

function BlockView({ b }: { b: Block }) {
  if ("p" in b) return <p>{b.p}</p>;
  if ("note" in b) return <p className={s.note}>{b.note}</p>;
  if ("ul" in b) return <ul>{b.ul.map((x) => <li key={x}>{x}</li>)}</ul>;
  if ("steps" in b) {
    return (
      <ol className={s.steps}>
        {b.steps.map(([t, d]) => <li key={t}><b>{t}</b>{d}</li>)}
      </ol>
    );
  }
  return (
    <div className={s.tableWrap}>
      <table className={s.table}>
        <thead><tr>{b.table.head.map((h) => <th key={h}>{h}</th>)}</tr></thead>
        <tbody>
          {b.table.rows.map((r, i) => (
            <tr key={r[0]} className={b.table.ours === i ? s.rowOurs : undefined}>
              {r.map((c, j) => <td key={j}>{c}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function QuestionGuidePage({ params }: { params: { topic: string } }) {
  const g = find(params.topic);
  if (!g) notFound();
  const url = `${SITE_URL}/guide/${g.slug}`;
  const chars = [g.answer, ...g.sections.flatMap((x) => x.blocks.map((b) => JSON.stringify(b)))].join("").length;
  const minutes = Math.max(3, Math.round(chars / 600));

  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: g.title,
        description: g.description,
        inLanguage: "ko-KR",
        mainEntityOfPage: url,
        dateModified: g.updated ?? UPDATED,
        image: `${SITE_URL}/og-image.png`,
        author: { "@type": "Organization", name: "드림위드에스 출판사" },
        publisher: { "@type": "Organization", name: "드림위드에스 출판사", url: SITE_URL },
      },
      {
        "@type": "FAQPage",
        mainEntity: g.faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "홈", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "출판 가이드", item: `${SITE_URL}/guide` },
          { "@type": "ListItem", position: 3, name: `${g.question} ${g.em}`, item: url },
        ],
      },
    ],
  };

  const toc: [string, string][] = [["answer", "한 줄 답"], ...g.sections.map((x) => [x.id, x.h2] as [string, string]), ["fit", "맞는 분 · 맞지 않는 분"], ["faq", "자주 묻는 질문"]];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <SiteHeader />
      <main className={s.page} id="main-content">
        <section className={s.hero}>
          <div className={s.heroInner}>
            <div className={s.eyebrow}>출판 가이드 · {g.no}</div>
            <h1 className={s.heroTitle}>{g.question}<br /><em>{g.em}</em></h1>
            <p className={s.heroSub}>{g.description}</p>
            <div className={s.meta}>
              <span><b>드림위드에스 출판사 편집부</b></span>
              <span>읽는 시간 약 {minutes}분</span>
              <span>{(g.updated ?? UPDATED).replace(/-/g, ".")} 업데이트</span>
            </div>
          </div>
        </section>

        <div className={s.layout}>
          <nav className={s.toc} aria-label="목차">
            <div className={s.tocLabel}>목차</div>
            <ol>{toc.map(([id, label]) => <li key={id}><a href={`#${id}`}>{label}</a></li>)}</ol>
          </nav>

          <article className={s.article}>
            <div className={s.takeaway}>
              <div className={s.takeawayLabel}>이 글에서 알 수 있는 것</div>
              <ul>{g.takeaways.map((t) => <li key={t}>{t}</li>)}</ul>
            </div>

            <h2 id="answer">한 줄 답</h2>
            <p className={s.summary}><span>답</span>{g.answer}</p>

            {g.sections.map((sec) => (
              <div key={sec.id}>
                <h2 id={sec.id}>{sec.h2}</h2>
                {sec.blocks.map((b, i) => <BlockView key={i} b={b} />)}
              </div>
            ))}

            <h2 id="fit">맞는 분 · 맞지 않는 분</h2>
            <div className={s.proscons}>
              <div className={s.pro}><h3>이런 분께 맞습니다</h3><ul>{g.fitYes.map((x) => <li key={x}>{x}</li>)}</ul></div>
              <div className={s.con}><h3>이런 분께는 맞지 않습니다</h3><ul>{g.fitNo.map((x) => <li key={x}>{x}</li>)}</ul></div>
            </div>

            <h2 id="faq">자주 묻는 질문</h2>
            {g.faq.map(([q, a]) => (
              <div key={q}>
                <h3>{q}</h3>
                <p>{a}</p>
              </div>
            ))}

            <aside className={s.brand} aria-label="드림위드에스 출판사 안내">
              <div className={s.eyebrow}>드림위드에스 출판사</div>
              <p className={s.brandTitle}>원고가 없어도, 인터뷰로 시작할 수 있습니다</p>
              <p className={s.brandSub}>10년 넘게, 누적 890권 이상의 책을 만들었습니다.</p>
              <ul className={s.facts}>
                <li>인터뷰로 책의 뼈대 완성</li>
                <li>작가 · 기획 · 디자인 · 교정 동시 진행</li>
                <li>표절 · 저작권 · 명예훼손 사전 검수</li>
                <li>전국 온 · 오프라인 서점 + 전자책 유통</li>
                <li>저자 이름으로 등록 · 저작권은 저자에게</li>
                <li>종이책 인세 45% · 전자책 20%</li>
              </ul>
              <div className={s.brandBtns}>
                <a className={s.btnGold} href={KAKAO_CHAT} target="_blank" rel="noopener noreferrer"
                   data-track="cta_click" data-category="guide" data-label={`guide_${g.slug}_kakao`}>
                  카카오톡으로 출판 상담 →
                </a>
                <Link className={s.btnLine} href="/#apply" data-track="cta_click" data-category="guide" data-label={`guide_${g.slug}_apply`}>상담 신청서 작성하기</Link>
              </div>
            </aside>

            <div className={s.moreTitle}>함께 읽으면 좋은 글</div>
            <div className={s.cards}>
              {g.related.map(([href, tag, title]) => (
                <Link key={href} href={href} className={s.card}>
                  <span className={s.cardTag}>{tag}</span>
                  <span className={s.cardTitle}>{title}</span>
                </Link>
              ))}
            </div>

            <div className={s.tags}>{g.tags.map((t) => <span key={t}>#{t}</span>)}</div>
          </article>
        </div>
      </main>
    </>
  );
}
