import type { Metadata } from "next";
import "./admin.css";

export const metadata: Metadata = {
  title: "Admin · 드림위드에스 출판사",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-root">
      {children}
    </div>
  );
}
