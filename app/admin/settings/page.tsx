import AdminShell from "../components/AdminShell";

export default function SettingsPage() {
  return (
    <AdminShell>
      <div className="admin-header">
        <h1>사이트 설정</h1>
        <p className="desc">사이트 메타 정보, SEO, 연락처 등 기본 설정을 관리합니다.</p>
      </div>

      <div className="panel">
        <h2 className="panel-title">기본 정보</h2>
        <div className="field">
          <label>사이트 이름</label>
          <input type="text" defaultValue="드림위드에스 출판사" />
        </div>
        <div className="field">
          <label>도메인</label>
          <input type="text" defaultValue="https://www.bookpublishingwithess.com" />
        </div>
        <div className="field">
          <label>대표 전화</label>
          <input type="text" defaultValue="010-2068-0817" />
        </div>
        <div className="field">
          <label>대표 이메일</label>
          <input type="email" defaultValue="dreamwithessmarketing@gmail.com" />
        </div>
        <div className="field">
          <label>카카오톡 채널 URL</label>
          <input type="url" defaultValue="http://pf.kakao.com/_QkZhd" />
        </div>
        <button className="btn btn-primary" disabled>저장 (백엔드 연결 필요)</button>
      </div>

      <div className="panel">
        <h2 className="panel-title">SEO 메타</h2>
        <div className="field">
          <label>페이지 제목 (Title)</label>
          <input type="text" defaultValue="드림위드에스 출판사 | 위드에스마케팅" />
        </div>
        <div className="field">
          <label>설명 (Description)</label>
          <textarea defaultValue="누적 890권+ 출간. 책 출판·자서전·자비출판·논문 컨설팅 전문." rows={3} />
        </div>
        <button className="btn btn-primary" disabled>저장 (백엔드 연결 필요)</button>
      </div>

      <div className="panel">
        <h2 className="panel-title">Analytics 환경변수 안내</h2>
        <p style={{ fontSize: 14, marginBottom: 12, color: "#475569" }}>
          아래 환경변수를 Vercel 대시보드에서 설정하세요.
        </p>
        <table className="admin-table">
          <thead>
            <tr><th>키</th><th>설명</th><th>설정처</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><code>ADMIN_PASSWORD</code></td>
              <td>이 관리자 페이지 비밀번호</td>
              <td>Vercel 환경변수</td>
            </tr>
            <tr>
              <td><code>JWT_SECRET</code></td>
              <td>세션 토큰 비밀키 (랜덤 문자열 32자+)</td>
              <td>Vercel 환경변수</td>
            </tr>
            <tr>
              <td><code>NEXT_PUBLIC_GA_ID</code></td>
              <td>Google Analytics 4 ID</td>
              <td>analytics.google.com</td>
            </tr>
            <tr>
              <td><code>NEXT_PUBLIC_GOOGLE_VERIFICATION</code></td>
              <td>구글 서치 콘솔 인증</td>
              <td>search.google.com/search-console</td>
            </tr>
            <tr>
              <td><code>NEXT_PUBLIC_NAVER_VERIFICATION</code></td>
              <td>네이버 서치어드바이저 인증</td>
              <td>searchadvisor.naver.com</td>
            </tr>
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
