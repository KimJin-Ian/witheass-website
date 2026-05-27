"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const NAV = [
  { href: "/admin", label: "대시보드", ico: "📊" },
  { href: "/admin/analytics", label: "방문자 / 클릭률", ico: "📈" },
  { href: "/admin/content", label: "콘텐츠 편집", ico: "✏️" },
  { href: "/admin/blog", label: "블로그 글", ico: "📝" },
  { href: "/admin/media", label: "이미지 관리", ico: "🖼️" },
  { href: "/admin/settings", label: "사이트 설정", ico: "⚙️" },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <div className="admin-shell">
      {/* 모바일 상단 바 */}
      <div className="admin-mobile-bar">
        <button className="hamburger" onClick={() => setOpen(!open)} aria-label="메뉴">
          ☰
        </button>
        <div style={{ fontSize: 13, letterSpacing: "0.2em", color: "#c4a661" }}>
          DREAM WITH·ESS
        </div>
        <div style={{ width: 32 }} />
      </div>

      <aside className={`admin-sidebar ${open ? "open" : ""}`}>
        <div className="brand">DREAM WITH·ESS</div>
        <nav>
          {NAV.map((item) => {
            const active = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={active ? "active" : ""}
                onClick={() => setOpen(false)}
              >
                <span className="ico">{item.ico}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            로그아웃
          </button>
        </div>
      </aside>

      <main className="admin-main">{children}</main>
    </div>
  );
}
