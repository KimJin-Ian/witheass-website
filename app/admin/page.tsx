import AdminShell from "./components/AdminShell";
import Link from "next/link";

export default function AdminDashboard() {
  return (
    <AdminShell>
      <div className="admin-header">
        <h1>대시보드</h1>
        <p className="desc">드림위드에스 출판사 사이트 관리 콘솔에 오신 것을 환영합니다.</p>
      </div>

      {/* 빠른 통계 (실데이터 연동은 다음 Phase) */}
      <div className="stat-grid">
        <div className="stat-card">
          <div className="label">📅 오늘 방문자</div>
          <div className="value">—</div>
          <div className="change">데이터 수집 중</div>
        </div>
        <div className="stat-card">
          <div className="label">📈 어제 방문자</div>
          <div className="value">—</div>
          <div className="change">Vercel Analytics 활성화 필요</div>
        </div>
        <div className="stat-card">
          <div className="label">💬 카카오 클릭</div>
          <div className="value">—</div>
          <div className="change">전환 추적 준비 중</div>
        </div>
        <div className="stat-card">
          <div className="label">⚡ 페이지 속도</div>
          <div className="value">—</div>
          <div className="change">Speed Insights 활성화 필요</div>
        </div>
      </div>

      {/* 빠른 액션 */}
      <div className="panel">
        <h2 className="panel-title">
          빠른 액션
          <span className="meta">자주 쓰는 기능</span>
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
          <Link href="/admin/content" className="btn btn-secondary" style={{ justifyContent: "flex-start", padding: 16 }}>
            ✏️ 메인 텍스트 편집
          </Link>
          <Link href="/admin/blog" className="btn btn-secondary" style={{ justifyContent: "flex-start", padding: 16 }}>
            📝 새 블로그 글 쓰기
          </Link>
          <Link href="/admin/media" className="btn btn-secondary" style={{ justifyContent: "flex-start", padding: 16 }}>
            🖼️ 이미지 업로드
          </Link>
          <Link href="/admin/analytics" className="btn btn-secondary" style={{ justifyContent: "flex-start", padding: 16 }}>
            📈 트래픽 상세보기
          </Link>
        </div>
      </div>

      {/* 사이트 바로가기 */}
      <div className="panel">
        <h2 className="panel-title">
          외부 도구
          <span className="meta">새 창으로 열림</span>
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
          <a href="https://vercel.com/dashboard" target="_blank" rel="noopener" className="btn btn-secondary" style={{ justifyContent: "flex-start", padding: 14 }}>
            🚀 Vercel 대시보드 →
          </a>
          <a href="https://analytics.google.com" target="_blank" rel="noopener" className="btn btn-secondary" style={{ justifyContent: "flex-start", padding: 14 }}>
            📊 Google Analytics →
          </a>
          <a href="https://search.google.com/search-console" target="_blank" rel="noopener" className="btn btn-secondary" style={{ justifyContent: "flex-start", padding: 14 }}>
            🔍 구글 서치 콘솔 →
          </a>
          <a href="https://searchadvisor.naver.com" target="_blank" rel="noopener" className="btn btn-secondary" style={{ justifyContent: "flex-start", padding: 14 }}>
            🟢 네이버 서치어드바이저 →
          </a>
        </div>
      </div>

      {/* 시스템 정보 */}
      <div className="panel">
        <h2 className="panel-title">시스템 정보</h2>
        <table className="admin-table">
          <tbody>
            <tr>
              <td style={{ width: 160 }}><strong>도메인</strong></td>
              <td>bookpublishingwithess.com</td>
            </tr>
            <tr>
              <td><strong>호스팅</strong></td>
              <td>Vercel <span className="badge badge-success">활성</span></td>
            </tr>
            <tr>
              <td><strong>Analytics</strong></td>
              <td>
                Vercel Analytics + Google Analytics 4
                <span className="badge badge-neutral" style={{ marginLeft: 8 }}>설정 필요</span>
              </td>
            </tr>
            <tr>
              <td><strong>지원 언어</strong></td>
              <td>한국어, English, 中文, 日本語</td>
            </tr>
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
