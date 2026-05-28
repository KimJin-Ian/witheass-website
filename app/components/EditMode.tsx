"use client";

/**
 * 비주얼 에디터 모드 — iframe 내부 인라인 편집 패널
 *
 * 동작:
 *   1. URL에 ?edit=1 이 있을 때만 활성화 (일반 방문자 영향 X)
 *   2. data-edit-key="..." 요소에 호버 시 점선 + 우상단에 ✏️ 편집 버튼
 *   3. 버튼/섹션 클릭 시 우측에 인라인 편집 패널 등장
 *   4. 패널에서 그 섹션의 모든 키를 편집 → 저장 클릭
 *   5. 저장은 parent(admin)에게 postMessage로 위임 → admin이 인증된 API 호출
 *   6. 저장 성공 시 패널 닫고 페이지 새로고침 (새 내용 표시)
 */

import { useEffect, useState, useCallback } from "react";
import { supabase, SITE_KEY, isSupabaseConfigured } from "@/lib/supabase";
import { useLang } from "./LangContext";

type DbRow = {
  id: string;
  site: string;
  section: string;
  content_key: string;
  lang: string;
  value: string;
  value_type: string;
  description?: string | null;
};

export default function EditMode() {
  const { lang } = useLang();
  const [active, setActive] = useState(false);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [rows, setRows] = useState<DbRow[]>([]);
  const [edits, setEdits] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<string>("");

  // 활성화 (URL ?edit=1)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("edit") === "1") setActive(true);
  }, []);

  // 호버 + 클릭 핸들러 설치 (편집 모드일 때만)
  useEffect(() => {
    if (!active) return;

    // 스타일 주입
    const style = document.createElement("style");
    style.id = "edit-mode-styles";
    style.textContent = `
      [data-edit-key] {
        position: relative;
        transition: outline 0.15s, background-color 0.15s;
      }
      [data-edit-key]:hover {
        outline: 2px dashed #3b82f6 !important;
        outline-offset: 4px;
        background-color: rgba(59, 130, 246, 0.04) !important;
      }
      [data-edit-key].__edit-selected {
        outline: 2px solid #3b82f6 !important;
        outline-offset: 4px;
        background-color: rgba(59, 130, 246, 0.06) !important;
      }
      [data-edit-key]:hover::before,
      [data-edit-key].__edit-selected::before {
        content: "✏️ " attr(data-edit-key);
        position: absolute;
        top: -32px;
        right: 0;
        background: #3b82f6;
        color: #fff;
        font-size: 11px;
        font-weight: 600;
        padding: 4px 9px;
        border-radius: 4px;
        z-index: 9999;
        pointer-events: none;
        font-family: -apple-system, "Pretendard", sans-serif;
        white-space: nowrap;
      }
      [data-edit-key].__edit-selected::before {
        background: #16a34a;
      }
      .__edit-banner {
        position: fixed;
        top: 0; left: 0; right: 0;
        background: linear-gradient(90deg, #3b82f6, #6366f1);
        color: #fff;
        padding: 8px 16px;
        font-size: 13px;
        text-align: center;
        z-index: 999990;
        font-weight: 500;
        font-family: -apple-system, "Pretendard", sans-serif;
        box-shadow: 0 2px 8px rgba(0,0,0,0.15);
      }
    `;
    document.head.appendChild(style);

    const banner = document.createElement("div");
    banner.className = "__edit-banner";
    banner.textContent = "✏️ 편집 모드 — 섹션을 클릭하면 그 자리에서 편집 패널이 열립니다";
    document.body.appendChild(banner);

    const originalPaddingTop = document.body.style.paddingTop;
    document.body.style.paddingTop = `calc(${originalPaddingTop || "0px"} + 36px)`;

    function onClick(e: MouseEvent) {
      const target = (e.target as HTMLElement).closest("[data-edit-key]");
      if (!target) return;
      // 패널 내부 클릭은 무시
      if ((e.target as HTMLElement).closest(".__edit-panel")) return;
      e.preventDefault();
      e.stopPropagation();
      const key = target.getAttribute("data-edit-key") || "";
      if (!key) return;

      document
        .querySelectorAll("[data-edit-key].__edit-selected")
        .forEach((el) => el.classList.remove("__edit-selected"));
      target.classList.add("__edit-selected");

      setSelectedSection(key);
    }

    document.addEventListener("click", onClick, { capture: true });

    return () => {
      document.removeEventListener("click", onClick, { capture: true });
      style.remove();
      banner.remove();
      document.body.style.paddingTop = originalPaddingTop;
    };
  }, [active]);

  // 섹션 선택 시 그 섹션의 키들 fetch
  useEffect(() => {
    if (!selectedSection || !isSupabaseConfigured) {
      setRows([]);
      setEdits({});
      return;
    }
    let alive = true;
    setLoading(true);
    setEdits({});
    supabase
      .from("content")
      .select("id, site, section, content_key, lang, value, value_type, description")
      .eq("site", SITE_KEY)
      .eq("section", selectedSection)
      .eq("lang", lang)
      .order("content_key")
      .then(({ data, error }) => {
        if (!alive) return;
        if (error) {
          setStatus(`로딩 실패: ${error.message}`);
        } else {
          setRows((data as DbRow[]) || []);
        }
        setLoading(false);
      });
    return () => { alive = false; };
  }, [selectedSection, lang]);

  // parent로부터 저장 응답 수신
  useEffect(() => {
    function onMsg(e: MessageEvent) {
      const data = e.data;
      if (!data || data.type !== "visual-editor:save-result") return;
      if (data.ok) {
        setStatus(`✓ ${data.saved}건 저장됨 — 새로고침 중...`);
        setTimeout(() => {
          window.location.reload();
        }, 800);
      } else {
        setStatus(`⚠️ 저장 실패: ${data.error || "Unknown"}`);
        setSaving(false);
      }
    }
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, []);

  const close = useCallback(() => {
    setSelectedSection(null);
    setEdits({});
    setStatus("");
    document
      .querySelectorAll("[data-edit-key].__edit-selected")
      .forEach((el) => el.classList.remove("__edit-selected"));
  }, []);

  function updateEdit(rowId: string, value: string) {
    setEdits((p) => ({ ...p, [rowId]: value }));
  }

  async function handleSave() {
    if (Object.keys(edits).length === 0) {
      setStatus("변경된 내용이 없습니다");
      return;
    }
    setSaving(true);
    setStatus("저장 중...");

    const payload = Object.entries(edits)
      .map(([rowId, value]) => {
        const row = rows.find((r) => r.id === rowId);
        if (!row) return null;
        return {
          site: row.site,
          section: row.section,
          content_key: row.content_key,
          lang: row.lang,
          value,
          value_type: row.value_type || "text",
        };
      })
      .filter(Boolean);

    if (window.parent !== window) {
      window.parent.postMessage(
        { type: "visual-editor:save", payload },
        "*"
      );
    } else {
      setStatus("⚠️ admin iframe 안에서만 저장 가능합니다");
      setSaving(false);
    }
  }

  const hasChanges = Object.keys(edits).length > 0;

  if (!active) return null;

  // 인라인 편집 패널 (우측 fixed)
  return (
    <>
      {selectedSection && (
        <div
          className="__edit-panel"
          style={{
            position: "fixed",
            top: 48,
            right: 16,
            bottom: 16,
            width: 380,
            background: "#fff",
            border: "1px solid #d1d5db",
            borderRadius: 10,
            boxShadow: "0 12px 32px rgba(0,0,0,0.18)",
            zIndex: 999991,
            display: "flex",
            flexDirection: "column",
            fontFamily: '-apple-system, "Pretendard", sans-serif',
            color: "#1f2937",
            overflow: "hidden",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* 헤더 */}
          <div
            style={{
              padding: "14px 18px",
              background: "#f9fafb",
              borderBottom: "1px solid #e5e7eb",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <div style={{ fontSize: 15, fontWeight: 600, color: "#111827" }}>
                ✏️ {selectedSection}
              </div>
              <div style={{ fontSize: 11, color: "#6b7280", marginTop: 2 }}>
                {rows.length}개 필드 · 언어: {lang}
              </div>
            </div>
            <button
              type="button"
              onClick={close}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                fontSize: 22,
                color: "#9ca3af",
                lineHeight: 1,
                padding: 4,
              }}
              aria-label="닫기"
            >
              ✕
            </button>
          </div>

          {/* 본문 */}
          <div style={{ flex: 1, overflowY: "auto", padding: 0 }}>
            {loading && (
              <div style={{ padding: 30, textAlign: "center", color: "#9ca3af", fontSize: 13 }}>
                ⏳ 로딩 중...
              </div>
            )}
            {!loading && rows.length === 0 && (
              <div style={{ padding: 30, textAlign: "center", color: "#9ca3af", fontSize: 13 }}>
                이 섹션의 편집 가능한 필드가 없습니다.
              </div>
            )}
            {!loading && rows.map((row) => {
              const value = edits[row.id] !== undefined ? edits[row.id] : row.value;
              const isEdited = edits[row.id] !== undefined && edits[row.id] !== row.value;
              const isLong = (row.value || "").length > 60 || row.value_type === "html";
              return (
                <div key={row.id} style={{ padding: "10px 16px", borderBottom: "1px solid #f3f4f6" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: 11, color: "#6b7280" }}>
                      {row.description || row.content_key}
                    </span>
                    <code style={{ fontSize: 10, color: "#9ca3af", fontFamily: "monospace" }}>
                      {row.content_key}
                    </code>
                  </div>
                  {isLong ? (
                    <textarea
                      rows={3}
                      value={value || ""}
                      onChange={(e) => updateEdit(row.id, e.target.value)}
                      style={{
                        width: "100%",
                        border: `1px solid ${isEdited ? "#3b82f6" : "#d1d5db"}`,
                        borderRadius: 4,
                        padding: "7px 9px",
                        fontSize: 13,
                        fontFamily: "inherit",
                        background: "#fff",
                        color: "#111827",
                        boxShadow: isEdited ? "0 0 0 2px rgba(59,130,246,0.15)" : "none",
                        resize: "vertical",
                      }}
                    />
                  ) : (
                    <input
                      type="text"
                      value={value || ""}
                      onChange={(e) => updateEdit(row.id, e.target.value)}
                      style={{
                        width: "100%",
                        border: `1px solid ${isEdited ? "#3b82f6" : "#d1d5db"}`,
                        borderRadius: 4,
                        padding: "7px 9px",
                        fontSize: 13,
                        fontFamily: "inherit",
                        background: "#fff",
                        color: "#111827",
                        boxShadow: isEdited ? "0 0 0 2px rgba(59,130,246,0.15)" : "none",
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* 하단 액션 */}
          <div
            style={{
              padding: "12px 16px",
              background: "#f9fafb",
              borderTop: "1px solid #e5e7eb",
              display: "flex",
              gap: 8,
              alignItems: "center",
            }}
          >
            {status && (
              <span style={{
                fontSize: 11,
                color: status.startsWith("✓") ? "#16a34a" :
                       status.startsWith("⚠️") ? "#dc2626" : "#6b7280",
                flex: 1,
              }}>
                {status}
              </span>
            )}
            {!status && (
              <span style={{ fontSize: 11, color: hasChanges ? "#dc2626" : "#6b7280", flex: 1 }}>
                {hasChanges ? `${Object.keys(edits).length}건 변경` : "변경 없음"}
              </span>
            )}
            <button
              type="button"
              onClick={close}
              disabled={saving}
              style={{
                padding: "7px 12px",
                fontSize: 12.5,
                border: "1px solid #d1d5db",
                background: "#fff",
                color: "#374151",
                borderRadius: 5,
                cursor: saving ? "default" : "pointer",
              }}
            >
              취소
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={!hasChanges || saving}
              style={{
                padding: "7px 16px",
                fontSize: 12.5,
                border: "1px solid #16a34a",
                background: hasChanges && !saving ? "#16a34a" : "#9ca3af",
                color: "#fff",
                borderRadius: 5,
                cursor: hasChanges && !saving ? "pointer" : "default",
                fontWeight: 600,
              }}
            >
              {saving ? "저장 중..." : "💾 저장"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
