"use client";

import { useRef } from "react";
import s from "../home.module.css";

/**
 * 출간 도서 — 옆으로 넘기는 띠 (2026-11-09 대표님 메모)
 * 휴대폰은 손가락으로 넘기고, PC 는 좌우 버튼으로 넘긴다.
 */
export default function BookRail({ books }: { books: { file: string; cat: string }[] }) {
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
      <div className={s.bookRail} ref={rail} tabIndex={0} role="group" aria-label="드림위드에스 출간 도서">
        {books.map((b) => (
          <figure key={b.file} className={s.book}>
            {/* 표지 파일은 앞표지 + 날개를 펼친 그림이라 왼쪽(앞표지)만 보이게 자른다 */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/covers/${b.file}.jpg`} alt={`드림위드에스 출간 도서 표지 — ${b.cat}`} loading="lazy" width={150} height={222} />
            <figcaption>{b.cat}</figcaption>
          </figure>
        ))}
      </div>
      <button type="button" className={`${s.bookBtn} ${s.bookNext}`} onClick={() => move(1)} aria-label="다음 도서 보기">›</button>
    </div>
  );
}
