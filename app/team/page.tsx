"use client";

import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";

const MEMBERS = [
  {
    role: "출판부 팀장",
    name: "김00 작가",
    education: "이화여대 국어교육학 졸업",
    projectsLabel: "주요 출간",
    projects: [
      "『비만, 이럴거면 차라리 하지 마라』",
      "『MBA의 모든 것』",
      "『나만의 영어 비법』",
      "『주식 투자 성공기』",
    ],
    careerExtra: "기출의 품격·엘리트 모의고사 등 문제집 검토진·집필진. EBSi 푸리봇 학습 데이터 프로젝트 참여.",
  },
  {
    role: "출판 기획·컨설팅",
    name: "김00 작가",
    education: "서울대학교 소비자아동학부 (국제정치학 부전공)",
    projectsLabel: "주요 컨설팅",
    projects: [
      "삼성전자 — 중장기 IT 투자 계획 (보고서)",
      "SK매직 — 영업 Risk 관리 체계 개선",
      "(주)두산 — Digital Transformation S&OP",
      "보건복지부 — 복지전달체계 개선 방안",
    ],
    careerExtra: "Kearney·PwC 컨설턴트, 삼성전자·LG전자 전략기획 출신.",
  },
  {
    role: "논문 컨설팅",
    name: "전00 작가",
    education: "교육학 박사",
    projectsLabel: "저서·논문 분야",
    projects: [
      "『관광 경영학 개론』",
      "『ESG 경영학』",
      "『식당 경영학』",
      "평생교육 정책·경영학·관광호텔 등 다수 논문",
    ],
    careerExtra: "평생교육·경영학·관광 분야 컨설팅 전담.",
  },
  {
    role: "출판 실무·교육",
    name: "양00 작가",
    education: "연세대학교 교육대학원 교육학 석사",
    projectsLabel: "주요 활동",
    projects: [
      "기업 교육 컨설팅 1,000회+",
      "L기업 교육팀장 / S기업 전략기획팀장",
      "B대학 강의전담교수",
      "코칭·러닝지도사·평생교육사 등 약 30개 자격증",
    ],
    careerExtra: "현 교육컨설팅·강의·대필작가 N잡러.",
  },
  {
    role: "기획 작가",
    name: "조00 작가",
    education: "교육학 석사 · 일반대학원 아동학 박사",
    projectsLabel: "주요 출간",
    projects: [
      "『그 소년의 빛』",
      "『약한 자들을 향한 희망의 증거』",
      "『잡큐베이터』",
      "『8년 고시실패자 연봉1억맨되다』",
    ],
    careerExtra: "경기도여성가족개발원 위촉 강사. 창의·인성·습관교육 콘텐츠 개발.",
  },
  {
    role: "출판 작가",
    name: "이00 작가",
    education: "베스트셀러 다수 집필 · 정치/사회/경영 전문",
    projectsLabel: "주요 출간",
    projects: [
      "『윤석열, 대통령 된다』 (베스트셀러)",
      "『중국 스마트시티 도전과 혁신』",
      "『서초사랑 나의 꿈』 김안숙",
      "『나를 위한 봉사(奉仕)의 삶』 박종성",
    ],
    careerExtra: "요양시설·소방안전·물류 등 폭넓은 분야 논문 컨설팅.",
  },
];

export default function TeamPage() {
  return (
    <>
      <a href="#main-content" className="skip-link">본문 바로가기</a>
      <SiteHeader />
      <main id="main-content">
        <section className="alt" style={{ paddingTop: 64 }}>
          <div className="container">
            <a href="/" style={{ fontSize: 13, color: "var(--text-500)" }}>← 홈으로</a>
            <div className="section-eyebrow" style={{ marginTop: 24 }}>TEAM · 전문 작가진</div>
            <h2 className="section-title">드림위드에스의 전문 작가진</h2>
            <div className="section-rule"></div>
            <p className="section-lead">
              저자가 혼자 책을 내는 것이 아닙니다. 박사급 컨설턴트와 30+ 분야 전문 작가가 한 권 한 권에 직접 참여합니다.
            </p>

            <div className="team-grid">
              {MEMBERS.map((member, i) => (
                <div key={i} className="team-card">
                  <span className="team-role">{member.role}</span>
                  <h3 className="team-name">{member.name}</h3>
                  <div className="team-education">{member.education}</div>
                  <div className="team-section-label">{member.projectsLabel}</div>
                  <ul className="team-list">
                    {member.projects.map((p, j) => (
                      <li key={j}>{p}</li>
                    ))}
                  </ul>
                  {member.careerExtra && (
                    <div className="team-suffix">{member.careerExtra}</div>
                  )}
                </div>
              ))}
            </div>

            <div className="team-privacy-note">
              ※ 작가 개인정보 보호를 위해 이름 일부만 공개합니다. 자세한 매칭은 상담 시 안내드립니다.
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
