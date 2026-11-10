"use client";

/** 과정 카드의 "이 과정으로 신청하기" — 아래 신청서에서 그 과정을 골라 둔 채로 내려간다 */
export default function PickButton({ program, className, children }: { program: string; className?: string; children: React.ReactNode }) {
  return (
    <a href="#apply" className={className}
       onClick={() => window.dispatchEvent(new CustomEvent("coach-pick", { detail: program }))}
       data-track="cta_click" data-category="consult" data-label={`coaching_pick_${program}`}>
      {children}
    </a>
  );
}
