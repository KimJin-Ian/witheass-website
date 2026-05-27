import AdminShell from "../components/AdminShell";

export default function AnalyticsPage() {
  return (
    <AdminShell>
      <div className="admin-header">
        <h1>방문자 / 클릭률 분석</h1>
        <p className="desc">
          실시간 트래픽과 사용자 행동을 확인합니다.
          상세 데이터는 Vercel Analytics와 Google Analytics에서 조회 가능합니다.
        </p>
      </div>

      {/* 핵심 지표 */}
      <div className="stat-grid">
        <div className="stat-card">
          <div className="label">👥 오늘 방문자 (UV)</div>
          <div className="value">—</div>
          <div className="change">데이터 연동 대기</div>
        </div>
        <div className="stat-card">
          <div className="label">📄 페이지뷰 (PV)</div>
          <div className="value">—</div>
          <div className="change">데이터 연동 대기</div>
        </div>
        <div className="stat-card">
          <div className="label">⏱️ 평균 체류시간</div>
          <div className="value">—</div>
          <div className="change">데이터 연동 대기</div>
        </div>
        <div className="stat-card">
          <div className="label">📊 이탈률</div>
          <div className="value">—</div>
          <div className="change">데이터 연동 대기</div>
        </div>
      </div>

      {/* 클릭률 추적 결과 */}
      <div className="panel">
        <h2 className="panel-title">
          🎯 주요 CTA 클릭률
          <span className="meta">최근 7일</span>
        </h2>
        <table className="admin-table">
          <thead>
            <tr>
              <th>버튼</th>
              <th style={{ textAlign: "right" }}>노출수</th>
              <th style={{ textAlign: "right" }}>클릭수</th>
              <th style={{ textAlign: "right" }}>클릭률 (CTR)</th>
              <th>위치</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>📞 카카오톡 문의</td>
              <td style={{ textAlign: "right" }}>—</td>
              <td style={{ textAlign: "right" }}>—</td>
              <td style={{ textAlign: "right" }}><strong>—</strong></td>
              <td><span className="badge badge-neutral">Hero CTA</span></td>
            </tr>
            <tr>
              <td>📞 카카오톡 문의</td>
              <td style={{ textAlign: "right" }}>—</td>
              <td style={{ textAlign: "right" }}>—</td>
              <td style={{ textAlign: "right" }}><strong>—</strong></td>
              <td><span className="badge badge-neutral">Contact</span></td>
            </tr>
            <tr>
              <td>💬 플로팅 카카오톡</td>
              <td style={{ textAlign: "right" }}>—</td>
              <td style={{ textAlign: "right" }}>—</td>
              <td style={{ textAlign: "right" }}><strong>—</strong></td>
              <td><span className="badge badge-neutral">Floating</span></td>
            </tr>
            <tr>
              <td>📞 전화 클릭</td>
              <td style={{ textAlign: "right" }}>—</td>
              <td style={{ textAlign: "right" }}>—</td>
              <td style={{ textAlign: "right" }}><strong>—</strong></td>
              <td><span className="badge badge-neutral">All</span></td>
            </tr>
            <tr>
              <td>💰 가격 보기</td>
              <td style={{ textAlign: "right" }}>—</td>
              <td style={{ textAlign: "right" }}>—</td>
              <td style={{ textAlign: "right" }}><strong>—</strong></td>
              <td><span className="badge badge-neutral">Hero CTA</span></td>
            </tr>
          </tbody>
        </table>
        <p style={{ fontSize: 12, color: "#94a3b8", marginTop: 16 }}>
          💡 클릭률 데이터는 Vercel Analytics의 Custom Events 또는 GA4 이벤트에서 자동 수집됩니다.
          배포 후 환경변수 설정 시 실시간 표시됩니다.
        </p>
      </div>

      {/* 스크롤 깊이 */}
      <div className="panel">
        <h2 className="panel-title">
          📜 스크롤 깊이
          <span className="meta">사용자가 어디까지 봤는지</span>
        </h2>
        <table className="admin-table">
          <thead>
            <tr>
              <th>구간</th>
              <th style={{ textAlign: "right" }}>도달 사용자</th>
              <th style={{ textAlign: "right" }}>비율</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>0~25% (히어로~소개)</td><td style={{ textAlign: "right" }}>—</td><td style={{ textAlign: "right" }}>—</td></tr>
            <tr><td>25~50% (가격~프로세스)</td><td style={{ textAlign: "right" }}>—</td><td style={{ textAlign: "right" }}>—</td></tr>
            <tr><td>50~75% (포트폴리오~후기)</td><td style={{ textAlign: "right" }}>—</td><td style={{ textAlign: "right" }}>—</td></tr>
            <tr><td>75~100% (FAQ~Contact)</td><td style={{ textAlign: "right" }}>—</td><td style={{ textAlign: "right" }}>—</td></tr>
          </tbody>
        </table>
      </div>

      {/* 외부 대시보드 링크 */}
      <div className="panel">
        <h2 className="panel-title">상세 분석 (외부)</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
          <a href="https://vercel.com/dashboard" target="_blank" rel="noopener" className="btn btn-primary" style={{ padding: 16 }}>
            🚀 Vercel Analytics →
          </a>
          <a href="https://analytics.google.com" target="_blank" rel="noopener" className="btn btn-secondary" style={{ padding: 16 }}>
            📊 Google Analytics →
          </a>
          <a href="https://search.google.com/search-console" target="_blank" rel="noopener" className="btn btn-secondary" style={{ padding: 16 }}>
            🔍 검색 키워드 (Search Console) →
          </a>
        </div>
      </div>
    </AdminShell>
  );
}
