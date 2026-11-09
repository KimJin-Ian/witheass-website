"use client";

import { useRef } from "react";
import Link from "next/link";
import s from "../home.module.css";

/**
 * 출간 도서 · 베스트셀러 — 옆으로 넘기는 띠 (2026-11-09 대표님 메모)
 * 휴대폰은 손가락으로 넘기고, PC 는 좌우 버튼으로 넘긴다.
 *
 * file: /covers 의 펼침 표지(앞표지 + 날개) — 왼쪽(앞표지)만 보이게 자른다
 * src:  앞표지만 있는 그림 — 자르지 않는다 (베스트셀러, 11/10)
 */
export type RailBook = { file?: string; src?: string; cat: string; title?: string; badge?: string; href?: string };

export default function BookRail({ books, label = "드림위드에스 출간 도서" }: { books: RailBook[]; label?: string }) {
  const rail = useRef<HTMLDivElement>(null);
  const move = (dir: 1 | -1) => {
    const el = rail.current;
    if (!el) return;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: calm ? "auto" : "smooth" });
  };
  return (
    <div className={s.books}>
      <button type="button" className={`${s.bookBtn} ${s.bookPrev}`} onClick={() => move(-1)} aria-label="이전 도서 보기">‹</button>
      <div className={s.bookRail} ref={rail} tabIndex={0} role="group" aria-label={label}>
        {books.map((b) => {
          const src = b.src ?? `/covers/${b.file}.jpg`;
          const body = (
            <>
              <span className={s.coverBox}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={b.title ? `${b.title} 표지` : `드림위드에스 출간 도서 표지 — ${b.cat}`} loading="lazy"
                     width={150} height={222} className={b.src ? s.coverFull : undefined} />
                {b.badge && <span className={s.badge}>{b.badge}</span>}
              </span>
              <figcaption>
                {b.title && <b className={s.bookTitle}>{b.title}</b>}
                {b.cat}
              </figcaption>
            </>
          );
          return (
            <figure key={src} className={s.book}>
              {b.href ? <Link href={b.href} className={s.bookLink}>{body}</Link> : body}
            </figure>
          );
        })}
      </div>
      <button type="button" className={`${s.bookBtn} ${s.bookNext}`} onClick={() => move(1)} aria-label="다음 도서 보기">›</button>
    </div>
  );
}
