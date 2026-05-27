import AdminShell from "../components/AdminShell";

export default function MediaPage() {
  return (
    <AdminShell>
      <div className="admin-header">
        <h1>이미지 관리</h1>
        <p className="desc">사이트에서 사용하는 이미지를 업로드하고 관리합니다.</p>
      </div>

      <div className="panel">
        <h2 className="panel-title">
          이미지 라이브러리
          <button className="btn btn-primary" disabled>업로드</button>
        </h2>
        <div className="empty">
          <div className="empty-ico">🖼️</div>
          <p>Vercel Blob 활성화 후 이미지 업로드가 가능합니다.</p>
          <p style={{ fontSize: 12, marginTop: 6, color: "#94a3b8" }}>
            현재 이미지는 /public 폴더 직접 관리 중
          </p>
        </div>
      </div>
    </AdminShell>
  );
}
