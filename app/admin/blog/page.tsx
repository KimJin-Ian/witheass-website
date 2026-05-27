import AdminShell from "../components/AdminShell";

export default function BlogPage() {
  return (
    <AdminShell>
      <div className="admin-header">
        <h1>블로그 글 관리</h1>
        <p className="desc">
          글을 작성하면 사이트의 /blog 경로에 자동으로 발행됩니다.
          각 글은 별도 URL을 가져 검색엔진에 인덱싱됩니다.
        </p>
      </div>

      <div className="panel">
        <h2 className="panel-title">
          글 목록
          <button className="btn btn-primary" disabled>+ 새 글 작성</button>
        </h2>
        <div className="empty">
          <div className="empty-ico">📝</div>
          <p>아직 작성된 글이 없습니다.</p>
          <p style={{ fontSize: 12, marginTop: 6, color: "#94a3b8" }}>
            블로그 시스템 활성화 후 첫 글을 작성해보세요.
          </p>
        </div>
      </div>

      <div className="panel" style={{ background: "#dbeafe", borderColor: "#93c5fd" }}>
        <h2 className="panel-title" style={{ color: "#1e3a8a" }}>💡 블로그 시스템의 효과</h2>
        <ul style={{ color: "#1e3a8a", fontSize: 14, paddingLeft: 20, lineHeight: 1.8 }}>
          <li><strong>검색 노출 증가</strong>: 글 1개당 검색 결과 1줄 추가</li>
          <li><strong>키워드 다양화</strong>: 다양한 검색어로 사이트 유입</li>
          <li><strong>전환율 상승</strong>: 글 읽은 사용자가 카카오톡 문의로 이어짐</li>
          <li><strong>브랜드 신뢰도</strong>: 전문성 어필 + 콘텐츠 마케팅</li>
        </ul>
        <p style={{ color: "#1e3a8a", fontSize: 13, marginTop: 12 }}>
          예시 글: "자서전 출판 비용 정리", "논문 컨설팅 후기", "책 한 권으로 바뀐 인생"
        </p>
      </div>

      <div className="panel" style={{ background: "#fef9c3", borderColor: "#fde047" }}>
        <h2 className="panel-title" style={{ color: "#713f12" }}>⚠️ 블로그 시스템 안내</h2>
        <p style={{ color: "#713f12", fontSize: 14 }}>
          블로그 시스템은 별도 작업이 필요합니다 (예상 3~4일):
        </p>
        <ol style={{ color: "#713f12", fontSize: 13, marginTop: 12, paddingLeft: 20 }}>
          <li>/blog 라우트 + 글 목록 페이지</li>
          <li>/blog/[slug] 개별 글 페이지</li>
          <li>Tiptap 위지윅 에디터 (Notion 같은 편집기)</li>
          <li>Vercel Blob 이미지 업로드</li>
          <li>Vercel Postgres 글 저장</li>
          <li>각 글에 JSON-LD Article 스키마 자동 생성</li>
          <li>sitemap.xml 자동 갱신</li>
        </ol>
      </div>
    </AdminShell>
  );
}
