"use client";

import { useEffect, useState } from "react";
import AdminShell from "../components/AdminShell";

/** 관리자 — 게시판 글 관리 (2026-11-19). 광고 · 부적절한 글을 숨기고, 잘못 숨긴 글은 다시 보이게 한다 */
export default function AdminBoardPage() {
  const [data, setData] = useState<{ members: number; posts: any[] } | null>(null);
  const [err, setErr] = useState("");
  const [open, setOpen] = useState<number | null>(null);

  const load = async () => {
    const r = await fetch("/api/admin/board", { cache: "no-store" });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) { setErr(j.error || "불러오지 못했습니다"); return; }
    setErr(""); setData(j);
  };
  useEffect(() => { load(); }, []);

  const act = async (id: number, method: "DELETE" | "PATCH") => {
    if (method === "DELETE" && !confirm("이 글을 숨길까요? (게시판에서 보이지 않게 됩니다)")) return;
    const r = await fetch(`/api/admin/board?id=${id}`, { method });
    if (!r.ok) alert("처리하지 못했습니다");
    load();
  };
  const kst = (iso: string) => new Date(iso).toLocaleString("ko-KR", { timeZone: "Asia/Seoul", month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" });

  return (
    <AdminShell>
      <div className="admin-header">
        <h1>게시판 관리</h1>
        <p className="desc">홈페이지 게시판(/board)에 올라온 글입니다. 광고 · 부적절한 글은 숨길 수 있고, 숨긴 글은 다시 보이게 할 수 있습니다.</p>
      </div>
      {err && <div className="panel" style={{ background: "#fef2f2", borderColor: "#fecaca", color: "#991b1b" }}>{err}</div>}
      {data && (
        <div className="panel">
          <h2 className="panel-title">글 {data.posts.length}개 · 회원 {data.members}명</h2>
          {data.posts.length === 0 ? (
            <div className="empty"><div className="empty-ico">📝</div><p>아직 올라온 글이 없습니다.</p></div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                <thead>
                  <tr style={{ textAlign: "left", borderBottom: "2px solid #e5e7eb" }}>
                    <th style={{ padding: 8, width: 60 }}>번호</th><th style={{ padding: 8 }}>제목</th>
                    <th style={{ padding: 8, width: 120 }}>작성자</th><th style={{ padding: 8, width: 120 }}>시간</th><th style={{ padding: 8, width: 110 }}></th>
                  </tr>
                </thead>
                <tbody>
                  {data.posts.map((p) => (
                    <tr key={p.id} style={{ borderBottom: "1px solid #f1f5f9", opacity: p.deleted_at ? 0.5 : 1, verticalAlign: "top" }}>
                      <td style={{ padding: 8 }}>{p.id}</td>
                      <td style={{ padding: 8 }}>
                        <button onClick={() => setOpen(open === p.id ? null : p.id)} style={{ background: "none", border: 0, padding: 0, textAlign: "left", cursor: "pointer", font: "inherit", color: "#1d4ed8" }}>
                          {p.title}{p.deleted_at ? " (숨김)" : ""}
                        </button>
                        {open === p.id && <div style={{ whiteSpace: "pre-wrap", marginTop: 6, color: "#334155", fontSize: 13.5 }}>{p.body}</div>}
                      </td>
                      <td style={{ padding: 8 }}>{p.username}</td>
                      <td style={{ padding: 8 }}>{kst(p.created_at)}</td>
                      <td style={{ padding: 8 }}>
                        {p.deleted_at
                          ? <button className="btn" onClick={() => act(p.id, "PATCH")}>다시 보이기</button>
                          : <button className="btn" onClick={() => act(p.id, "DELETE")}>숨기기</button>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </AdminShell>
  );
}
