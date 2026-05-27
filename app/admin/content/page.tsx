import AdminShell from "../components/AdminShell";

export default function ContentPage() {
  return (
    <AdminShell>
      <div className="admin-header">
        <h1>콘텐츠 편집</h1>
        <p className="desc">
          사이트의 텍스트와 가격을 수정합니다. 저장 시 1~2분 내에 사이트에 반영됩니다.
        </p>
      </div>

      <div className="panel">
        <h2 className="panel-title">
          📌 Hero 섹션
          <span className="meta">첫 화면 텍스트</span>
        </h2>

        <div className="field">
          <label>상단 라벨 (Eyebrow)</label>
          <input type="text" placeholder="예: BOOK PUBLISHING · DREAM WITH ESS" />
          <div className="hint">대문자 + 자간 넓은 짧은 문구</div>
        </div>

        <div className="field">
          <label>메인 헤드라인 1</label>
          <input type="text" placeholder="예: 책 한 권으로 시작되는" />
        </div>

        <div className="field">
          <label>메인 헤드라인 2</label>
          <input type="text" placeholder="예: 인생의 다음 챕터" />
        </div>

        <div className="field">
          <label>서브 카피</label>
          <textarea placeholder="예: 누적 890권+ 출간 경험. 책 출판부터 마케팅·강연까지." rows={3} />
        </div>

        <button className="btn btn-primary" disabled>저장 (백엔드 연결 필요)</button>
      </div>

      <div className="panel">
        <h2 className="panel-title">
          💰 가격 패키지
          <span className="meta">4개 패키지</span>
        </h2>

        <table className="admin-table">
          <thead>
            <tr>
              <th>패키지명</th>
              <th>가격</th>
              <th>설명</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>전자책 / 종이책 인쇄</td>
              <td>2,000,000원</td>
              <td>표지·내지 디자인 + 유통</td>
              <td><button className="btn btn-secondary" style={{ padding: "6px 12px", fontSize: 12 }}>수정</button></td>
            </tr>
            <tr>
              <td>완성도 패키지</td>
              <td>6,000,000원</td>
              <td>목차 기획·교정·표지·500권 인쇄</td>
              <td><button className="btn btn-secondary" style={{ padding: "6px 12px", fontSize: 12 }}>수정</button></td>
            </tr>
            <tr>
              <td>책 출판 올인원</td>
              <td>9,000,000원</td>
              <td>인터뷰 기획·집필·전자책·유통</td>
              <td><button className="btn btn-secondary" style={{ padding: "6px 12px", fontSize: 12 }}>수정</button></td>
            </tr>
            <tr>
              <td>마케팅 풀패키지</td>
              <td>20,000,000원</td>
              <td>전과정 + PR + 강연회</td>
              <td><button className="btn btn-secondary" style={{ padding: "6px 12px", fontSize: 12 }}>수정</button></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="panel">
        <h2 className="panel-title">
          ❓ FAQ
          <span className="meta">20개 항목</span>
        </h2>
        <div className="empty">
          <div className="empty-ico">📝</div>
          <p>FAQ 편집기는 다음 업데이트에서 제공됩니다.</p>
          <p style={{ fontSize: 12, marginTop: 6, color: "#94a3b8" }}>
            현재 lib/i18n.ts에서 직접 편집 가능
          </p>
        </div>
      </div>

      <div className="panel" style={{ background: "#fef9c3", borderColor: "#fde047" }}>
        <h2 className="panel-title" style={{ color: "#713f12" }}>⚠️ 콘텐츠 편집 기능 안내</h2>
        <p style={{ color: "#713f12", fontSize: 14 }}>
          현재 화면은 <strong>UI 프로토타입</strong>입니다. 실제 저장을 위해서는 다음 작업이 필요합니다:
        </p>
        <ol style={{ color: "#713f12", fontSize: 13, marginTop: 12, paddingLeft: 20 }}>
          <li>Vercel KV 또는 Vercel Postgres 활성화</li>
          <li>콘텐츠를 lib/i18n.ts → DB로 마이그레이션</li>
          <li>실시간 저장 API 연결</li>
        </ol>
        <p style={{ color: "#713f12", fontSize: 13, marginTop: 8 }}>
          → 이 작업을 진행하시려면 별도로 요청해주세요. (1~2일 작업)
        </p>
      </div>
    </AdminShell>
  );
}
