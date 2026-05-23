import SiteHeader from "./components/SiteHeader";
import Faq from "./components/Faq";

export default function Home() {
  return (
    <>
      <SiteHeader />

      {/* HERO */}
      <section className="hero" id="top">
        <div className="container hero-inner">
          <div className="hero-eyebrow">COMPANY · 위드에스마케팅 · 더컬쳐앤</div>
          <h1>
            책 한 권으로<br />
            인생을 바꾸는 <em>구조</em>
          </h1>
          <div className="hero-rule"></div>
          <p className="hero-sub">
            출판부터 브랜딩·마케팅·강연·커뮤니티까지<br />
            저자의 인생을 단계별로 함께 설계하는 올인원 브랜드 빌딩 파트너
          </p>
          <div className="hero-cta">
            <a href="#contact" className="cta-btn gold">간편 문의하기 →</a>
            <a href="#pricing" className="cta-btn outline">패키지 보기</a>
          </div>
          <div className="hero-stats">
            <div className="hero-stat"><div className="num">10년+</div><div className="lbl">RUNNING</div></div>
            <div className="hero-stat"><div className="num">890권+</div><div className="lbl">PUBLISHED</div></div>
            <div className="hero-stat"><div className="num">45%</div><div className="lbl">ROYALTY</div></div>
            <div className="hero-stat"><div className="num">3개월</div><div className="lbl">TO PUBLISH</div></div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about">
        <div className="container">
          <div className="about-grid">
            <div className="about-text">
              <div className="section-eyebrow">FOUNDER&apos;S STORY</div>
              <h2 className="section-title">평범했던 한 사람이<br />책 한 권으로 만든 변화</h2>
              <div className="section-rule"></div>
              <div className="quote">
                저도 23살, 평범한 음대생이었습니다.<br />
                그때 낸 책 한 권이 제 인생을 바꿨습니다.
              </div>
              <p>
                그 책은 단순한 인세를 가져다 준 게 아니라{" "}
                <strong>웹툰·뮤지컬·독립영화·영문판·강연·사업 확장</strong>까지 이어졌습니다.
              </p>
              <p>
                그래서 저희는 압니다.{" "}
                <strong>책은 인세로 끝나는 상품이 아니라, 기회가 시작되는 자산입니다.</strong>
              </p>
              <p>
                누적 <strong>890권 이상</strong>의 출간 경험과 베스트셀러 배출 노하우로,
                저자 한 분 한 분의 가능성을 끝까지 책임지고 끌어드립니다.
              </p>
            </div>

            <div className="about-portrait">
              <div className="badge">CEO PROFILE</div>
              <h3>이서진 대표<br /><span style={{ color: "var(--gold-500)", fontSize: 14, letterSpacing: "0.2em" }}>LEE SEO-JIN</span></h3>
              <p style={{ fontSize: 14.5, lineHeight: 1.8, color: "rgba(255,255,255,0.85)" }}>
                베스트셀러 작가 출신. 『꿈을 찾는 음대생』 외 다수 저서. 10년간 매년 책을 집필.
              </p>
              <ul>
                <li><span>대표 저서</span><span>『꿈을 찾는 음대생』 등 4권 베스트셀러</span></li>
                <li><span>수상</span><span>문화발전진흥대상</span></li>
                <li><span>선정</span><span>스포츠서울 차세대리더상</span></li>
                <li><span>활동</span><span>퍼스널 브랜딩 강연</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* DIFFERENTIATORS */}
      <section id="brand" className="alt">
        <div className="container">
          <div className="section-eyebrow">WHAT MAKES US DIFFERENT</div>
          <h2 className="section-title">왜 드림위드에스인가</h2>
          <div className="section-rule"></div>
          <p className="section-lead">
            책을 만드는 곳은 많지만, <strong style={{ color: "var(--navy-900)" }}>읽히고·검색되고·기회로 연결되는 책</strong>을
            만드는 곳은 흔치 않습니다. 저희는 4가지 차별점으로 단순 출판을 넘어선{" "}
            <strong style={{ color: "var(--navy-900)" }}>브랜드 자산</strong>을 만들어 드립니다.
          </p>

          <div className="diff-grid">
            <div className="diff-card">
              <div className="num">01</div>
              <h3>현역 작가가 운영하는 출판사</h3>
              <p>타사는 운영자가, 우리는 베스트셀러 작가 출신 대표가 직접 운영합니다. 악플·완성도 불안 등 저자의 심리적 저항을 본인 경험으로 정확히 해소합니다.</p>
            </div>
            <div className="diff-card">
              <div className="num">02</div>
              <h3>인터뷰 기반 집필 시스템</h3>
              <p>글 한 줄 없어도 됩니다. 인터뷰 2회만으로 책의 뼈대가 잡힙니다. 프로필 + 책을 쓰는 이유만 있어도 시작 가능합니다.</p>
            </div>
            <div className="diff-card">
              <div className="num">03</div>
              <h3>병렬식 공정 시스템</h3>
              <p>다른 곳은 1명이 다 진행, 우리는 작가·기획자·디자이너·교정이 따로. 한 책에 여러 전문가가 동시에 투입되어 속도와 완성도를 동시에.</p>
            </div>
            <div className="diff-card">
              <div className="num">04</div>
              <h3>출판 → 마케팅 → 강연까지 원스톱</h3>
              <p>책 제작에서 끝나지 않습니다. 검색 자산화, 커뮤니티 홍보, 오프라인 행사, 강연·사업 연결까지 단일 회사 안에서 처리합니다.</p>
            </div>
          </div>
        </div>
      </section>

      {/* THESIS */}
      <section id="thesis">
        <div className="container">
          <div className="about-grid">
            <div className="about-text">
              <div className="section-eyebrow">THESIS CONSULTING</div>
              <h2 className="section-title">논문이 힘든 이유,<br />저희가 압니다</h2>
              <div className="section-rule"></div>
              <p style={{ fontSize: 16, lineHeight: 1.85 }}>
                어디서부터 어떻게 시작해야 할지 모르겠다? 시간이 부족하다?
                자신이 쓰려는 내용이 정리가 안 된다?
              </p>
              <p style={{ fontSize: 16, lineHeight: 1.85, marginBottom: 24 }}>
                저희는 <strong>기획·대필부터 표절 검수까지</strong> 한 번에 해결합니다.
                서울대·해외 박사급 컨설턴트가 직장인 1:1 맞춤 진행합니다.
              </p>
              <div className="diff-card" style={{ background: "var(--gold-50)", borderColor: "var(--gold-100)", padding: 24, marginTop: 8 }}>
                <h3 style={{ fontSize: 16 }}>📘 논문 → 책 전환 서비스 (Unique)</h3>
                <p>완성된 논문을 책으로 출간하는 국내 유일 서비스. 목차 재구성·독자 친화 재집필·전국 서점 유통까지.</p>
              </div>
            </div>

            <div style={{ display: "grid", gap: 16 }}>
              <div className="diff-card"><h3>✔ 비밀 보장</h3><p>NDA 기반 전 과정 비밀 유지</p></div>
              <div className="diff-card"><h3>✔ 모든 분야 가능</h3><p>경영·의학·교육·공학·법학·예술 등 분야 무제한</p></div>
              <div className="diff-card"><h3>✔ 1주일 내 진행 가능</h3><p>급한 마감도 가능. 원하시는 기간에 맞춰 진행</p></div>
              <div className="diff-card"><h3>✔ 표절 검수 전담팀</h3><p>카피·표절·저작권 사전 차단 전담팀 보유</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing">
        <div className="container">
          <div className="section-eyebrow">PRICING</div>
          <h2 className="section-title">출판 패키지</h2>
          <div className="section-rule"></div>
          <p className="section-lead">
            원고가 있는지, 어디까지 직접 진행하실지에 따라 패키지를 선택하시면 됩니다.
            가장 많이 선택하시는 패키지는 <strong style={{ color: "var(--navy-900)" }}>900만원 올인원</strong>입니다.
          </p>

          <div className="pricing-grid">
            <div className="price-card">
              <div className="cat">단순 제작</div>
              <h3>전자책 / 종이책 인쇄</h3>
              <div className="price">200<small>만원~</small></div>
              <ul>
                <li>전자책 단독 (200만)</li>
                <li>종이책 500권 (300만)</li>
                <li>종이책 1000권 (400만)</li>
                <li>표지·내지 디자인</li>
                <li>네이버 책 등록</li>
                <li>전국 서점 유통 + 인세 45%</li>
              </ul>
            </div>

            <div className="price-card">
              <div className="cat">기획·컨설팅</div>
              <h3>완성도 패키지</h3>
              <div className="price">600<small>만원</small></div>
              <ul>
                <li>저자가 1차 원고 작성</li>
                <li>목차 기획</li>
                <li>원고 교정·교열</li>
                <li>전체 구조 설계</li>
                <li>표지 카피라이팅</li>
                <li>500권 인쇄 + 유통</li>
              </ul>
            </div>

            <div className="price-card featured">
              <div className="tag">★ MOST POPULAR</div>
              <div className="cat">RECOMMENDED</div>
              <h3>올인원 패키지</h3>
              <div className="price">900<small>만원</small></div>
              <ul>
                <li>인터뷰 기반 기획 (글 없어도 OK)</li>
                <li>목차 설계 + 원고 집필</li>
                <li>교정·교열 + 표지·내지 디자인</li>
                <li>500권 인쇄 (200페이지 기준)</li>
                <li>전자책 + 밀리의서재 등록</li>
                <li>ISBN + 네이버 책 등록</li>
                <li>전국 서점 유통 + 인세 45%</li>
              </ul>
              <a href="#contact" className="cta-btn gold" style={{ marginTop: "auto" }}>상담 신청 →</a>
            </div>

            <div className="price-card">
              <div className="cat">브랜딩 확장</div>
              <h3>마케팅 풀패키지</h3>
              <div className="price">2,000<small>만원</small></div>
              <ul>
                <li>올인원 패키지 포함</li>
                <li>블로그·인스타·유튜브 마케팅</li>
                <li>언론 PR + 포털 검색 브랜딩</li>
                <li>리뷰단 + 바이럴</li>
                <li>웹툰형 콘텐츠 20장+</li>
                <li>강연·클래스 연결</li>
                <li>퍼스널 브랜딩 로드맵</li>
              </ul>
            </div>
          </div>

          <div className="pricing-note">
            <div style={{ fontSize: 22 }}>💡</div>
            <p>
              <strong>마케팅만 별도 진행도 가능합니다.</strong>{" "}
              300만원 (네이버 검색·블로그·인스타·언론기사) /
              1,000만원 (지하철 광고 포함) / 2,000만원 (풀패키지).
              교육·강의 패키지 (2시간 50만원), 사진 패키지 (300만원)도 별도 운영.
            </p>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="alt">
        <div className="container">
          <div className="section-eyebrow">PROCESS</div>
          <h2 className="section-title">진행 프로세스</h2>
          <div className="section-rule"></div>
          <p className="section-lead">
            문의부터 출간 후 마케팅까지 8단계로 진행됩니다.{" "}
            <strong style={{ color: "var(--navy-900)" }}>총 소요 기간 50~70일</strong> (원고 수령일 기준).
          </p>

          <div className="process-grid">
            <div className="process-step"><div className="step-num">STEP 01</div><h4>문의 / 견적</h4><p>예산·유입·목적 확인 후 분야별 사례 공유</p></div>
            <div className="process-step"><div className="step-num">STEP 02</div><h4>계약</h4><p>계약금 600만 원 입금 → 본격 진행 시작</p></div>
            <div className="process-step"><div className="step-num">STEP 03</div><h4>인터뷰</h4><p>글 없는 경우 2~5회, 회당 2시간 진행</p></div>
            <div className="process-step"><div className="step-num">STEP 04</div><h4>목차·원고</h4><p>1주 내 목차 → 피드백 2회 → 원고 집필</p></div>
            <div className="process-step"><div className="step-num">STEP 05</div><h4>교정 + 디자인</h4><p>병렬 진행으로 속도 단축. 표지 2개 시안</p></div>
            <div className="process-step"><div className="step-num">STEP 06</div><h4>인쇄·유통</h4><p>500권 인쇄 → 전국 서점 + ISBN·네이버 등록</p></div>
            <div className="process-step"><div className="step-num">STEP 07</div><h4>전자책 등록</h4><p>밀리의서재 + 교보·예스24·리디 전자책</p></div>
            <div className="process-step"><div className="step-num">STEP 08</div><h4>출간 후 마케팅</h4><p>강연·브랜딩·사업 확장 컨설팅 연결</p></div>
          </div>

          <h3 style={{ fontSize: 18, color: "var(--navy-900)", marginBottom: 20, textAlign: "center" }}>3가지 전문 트랙</h3>
          <div className="tracks-grid">
            <div className="track-card">
              <h4>📚 논문형 / 전문서적</h4>
              <ol><li>맞춤 리서치 기획</li><li>피드백 1~2회</li><li>원고 집필</li><li>인쇄·출간</li></ol>
            </div>
            <div className="track-card">
              <h4>📖 에세이 / 소설</h4>
              <ol><li>1차 목차 제안</li><li>목차 기반 원고 집필</li><li>1차 초안</li><li>피드백 → 최종 원고</li></ol>
            </div>
            <div className="track-card">
              <h4>📜 자서전 / 회고록</h4>
              <ol><li>심층 질문지 + 답변</li><li>인터뷰 (가족·지인 포함)</li><li>1차 초안 + 추가 질문</li><li>피드백 → 완성</li></ol>
            </div>
          </div>
        </div>
      </section>

      {/* CASE STUDY */}
      <section id="case">
        <div className="container">
          <div className="section-eyebrow">CASE STUDY</div>
          <h2 className="section-title">5~6년 정체된 책을<br />23주 만에 완성한 비결</h2>
          <div className="section-rule"></div>

          <div className="case-hero">
            <div>
              <div className="case-meta">CASE · 안세훈 변호사 『이기적 남자』</div>
              <h3>전문직이 책을 못 쓰는<br />진짜 이유 3가지</h3>
              <p style={{ marginTop: 32 }}>
                <strong style={{ color: "var(--gold-500)" }}>완벽주의에 의한 지연</strong><br />
                &ldquo;논문 수준으로 완벽해야 한다&rdquo;는 강박
              </p>
              <p>
                <strong style={{ color: "var(--gold-500)" }}>본업 우선순위</strong><br />
                출판이 &ldquo;해도 그만&rdquo;으로 밀려 무기한 연기
              </p>
              <p>
                <strong style={{ color: "var(--gold-500)" }}>집행력 부재</strong><br />
                외부 데드라인 없으면 진행이 안 됨
              </p>
            </div>

            <div className="case-result">
              <div className="label">RESULT</div>
              <div className="before-after">
                <div className="ba-item muted"><div className="val">5~6년</div><div className="desc">BEFORE<br />정체 상태</div></div>
                <div className="arrow">→</div>
                <div className="ba-item gold"><div className="val">23주</div><div className="desc">AFTER<br />출판 확정</div></div>
              </div>
              <blockquote>
                &ldquo;책을 써서 성공하는 것이 아니라,<br />
                성공하기 위해 책을 쓰는 것입니다.&rdquo;
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICE */}
      <section id="service" className="alt">
        <div className="container">
          <div className="section-eyebrow">FOR WHOM</div>
          <h2 className="section-title">이런 분들과 함께 작업해 왔습니다</h2>
          <div className="section-rule"></div>
          <p className="section-lead">누적 890권의 출간 경험으로 모든 분야·모든 단계의 저자를 지원합니다.</p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            <div className="diff-card"><h3>🏛 정치인 · 공직자</h3><p>출판기념회·선거·임기 일정에 맞춰 자서전 + 공신력 확보형 도서. 천안시장 자서전·서초구의원 자서전 등 사례.</p></div>
            <div className="diff-card"><h3>💼 CEO · 기업인</h3><p>퍼스널 브랜딩과 사업 확장을 위한 도서. 검색 신뢰도 확보 + 강연·컨설팅 연결까지.</p></div>
            <div className="diff-card"><h3>⚖️ 전문직 (의사·변호사·교수)</h3><p>전문성과 대중성을 동시에. 안세훈 변호사 『이기적 남자』 등 베스트셀러 사례.</p></div>
            <div className="diff-card"><h3>📚 강사 · 컨설턴트</h3><p>강연 콘텐츠 자산화. 책 1권으로 유튜브·블로그·강의 자료까지 멀티 활용.</p></div>
            <div className="diff-card"><h3>📖 개인 자서전 / 회고록</h3><p>인생을 책으로 남기고 싶은 분, 부모님 선물용, 가족 기록용. 인터뷰 기반으로 글솜씨 없어도 가능.</p></div>
            <div className="diff-card"><h3>🏢 기업 · 기관</h3><p>사례집·연간보고서·브랜드북. 대전신용보증재단 등 기관 도서 사례.</p></div>
          </div>
        </div>
      </section>

      {/* COMMUNITY */}
      <section className="dark">
        <div className="container">
          <div className="section-eyebrow">AFTER PUBLICATION</div>
          <h2 className="section-title">출판은 끝이 아닙니다<br />더컬쳐앤이 함께합니다</h2>
          <div className="section-rule"></div>
          <p className="section-lead">
            광고비로 외부 노출하는 것이 아니라, 실제 사람에게 닿는 자체 커뮤니티와 오프라인 네트워크를 보유하고 있습니다.
          </p>

          <div className="community-grid">
            <div className="community-list">
              <h4>자체 커뮤니티 9개</h4>
              <ul>
                <li>2030 여성 인플루언서</li>
                <li>강남 소셜 네트워크</li>
                <li>CEO·전문직 네트워크</li>
                <li>음악인 네트워크</li>
                <li>엄마 고객층</li>
                <li>병원·뷰티 관심층</li>
                <li>문화예술 커뮤니티</li>
                <li>책 출판 관심층</li>
                <li>강연·클래스 관심층</li>
              </ul>
            </div>
            <div className="community-list">
              <h4>오프라인 행사 라인업</h4>
              <ul>
                <li>북토크 / 출간 기념 강연회</li>
                <li>저자와의 만남</li>
                <li>살롱 토크콘서트 (&ldquo;보이는 라디오&rdquo;)</li>
                <li>전문직 네트워킹 행사</li>
                <li>브랜드 콜라보 행사</li>
                <li>병원·뷰티·문화 커뮤니티 행사</li>
                <li>더컬쳐앤라운지 공간 홍보</li>
                <li>VIP 초대 행사</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio">
        <div className="container">
          <div className="section-eyebrow">PORTFOLIO</div>
          <h2 className="section-title">출간 사례</h2>
          <div className="section-rule"></div>
          <p className="section-lead">
            카테고리별 대표 사례. 분야가 비슷한 예시를 원하시면 상담 시 더 많이 보여드립니다.{" "}
            <em style={{ color: "var(--text-500)" }}>※ 저작권 보호 대상이므로 열람 후 저장/배포는 삼가 주세요.</em>
          </p>

          <div className="portfolio-grid">
            {[
              { cover: "ESG", cat: "전문지식", title: "ESG 기반 도서", desc: "지속가능경영 분야" },
              { cover: "Smart", cat: "전문지식", title: "스마트시티 관련 도서", desc: "도시·기술 분야" },
              { cover: "대전신보", cat: "기관 브랜딩", title: "대전신용보증재단", desc: "표지·내지 디자인 일체" },
              { cover: "천안시장", cat: "자서전 · 공신력", title: "천안시장 자서전", desc: "인터뷰 기반" },
              { cover: "서초구", cat: "자서전 · 공신력", title: "서초구의원 자서전", desc: "정치인 출판기념회 패키지" },
              { cover: "재테크", cat: "금융 · 교재형", title: "주식·재테크 도서", desc: "내지 칼라 인쇄" },
              { cover: "CEO 자서전", cat: "퍼스널 자서전", title: "이문호 CEO 자서전", desc: "기업가 인생 기록" },
              { cover: "이기적 남자", cat: "전문직 브랜딩", title: "안세훈 변호사 『이기적 남자』", desc: "15년차 형사 전문 변호사 · 23주 완성" },
            ].map((p, i) => (
              <div key={i} className="portfolio-card">
                <div className="cover"><div className="cover-text">{p.cover}</div></div>
                <div className="info">
                  <div className="cat-tag">{p.cat}</div>
                  <h4>{p.title}</h4>
                  <p>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="alt">
        <div className="container">
          <div className="section-eyebrow">FAQ</div>
          <h2 className="section-title">자주 묻는 질문</h2>
          <div className="section-rule"></div>
          <Faq />
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-text">
              <div className="section-eyebrow">GET IN TOUCH</div>
              <h2 className="section-title">3개월 안에<br />책 한 권, 가능합니다</h2>
              <div className="section-rule"></div>
              <p>
                글솜씨가 부족해도, 시간이 없어도, 마음만 있으면 됩니다.<br />
                카톡으로 편하게 말씀해 주시면 정확한 견적과 일정을 안내드립니다.
              </p>
              <p style={{ marginTop: 24, color: "var(--gold-500)", fontSize: 14, letterSpacing: "0.1em" }}>
                ✦ 첫 상담은 무료 · 견적 받아보시고 결정하세요
              </p>
            </div>

            <div className="contact-channels">
              <a href="http://pf.kakao.com/_QkZhd" target="_blank" rel="noopener noreferrer" className="contact-ch">
                <div className="ch-label">KAKAOTALK</div>
                <div className="ch-val">위드에스마케팅 채널</div>
              </a>
              <a href="tel:01020680817" className="contact-ch">
                <div className="ch-label">PHONE</div>
                <div className="ch-val">010-2068-0817</div>
              </a>
              <a href="mailto:dreamwithessmarketing@gmail.com" className="contact-ch">
                <div className="ch-label">EMAIL</div>
                <div className="ch-val">dreamwithessmarketing<br />@gmail.com</div>
              </a>
              <a href="https://www.bookpublishingwithess.com/" target="_blank" rel="noopener noreferrer" className="contact-ch">
                <div className="ch-label">WEBSITE</div>
                <div className="ch-val">bookpublishingwithess<br />.com</div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="container">
          <div className="ft-grid">
            <div>
              <div className="ft-brand">드림위드에스 / 위드에스마케팅 / 더컬쳐앤</div>
              <p style={{ marginBottom: 8 }}>책 출판 · 자서전 출판 · 논문 대필 · 논문 컨설팅 · 자비출판</p>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>대표이사 이서진 | 사업자등록번호 859-24-00524</p>
            </div>
            <div>
              <h5>SITE MAP</h5>
              <ul>
                <li><a href="#about">위드에스마케팅 소개</a></li>
                <li><a href="#thesis">논문 컨설팅</a></li>
                <li><a href="#pricing">출판 안내</a></li>
                <li><a href="#process">진행 프로세스</a></li>
                <li><a href="#portfolio">포트폴리오</a></li>
                <li><a href="#faq">자주 묻는 질문</a></li>
              </ul>
            </div>
            <div>
              <h5>CONTACT</h5>
              <ul>
                <li>Tel · 010-2068-0817</li>
                <li>Email · dreamwithessmarketing@gmail.com</li>
                <li>KakaoTalk · 위드에스마케팅</li>
                <li>Web · bookpublishingwithess.com</li>
              </ul>
            </div>
          </div>
          <div className="copyright">© 2026 위드에스마케팅 (드림위드에스 / 더컬쳐앤). All rights reserved.</div>
        </div>
      </footer>

      {/* FLOATING CTA */}
      <div className="float-cta">
        <a href="http://pf.kakao.com/_QkZhd" target="_blank" rel="noopener noreferrer" className="kakao" title="카카오톡 문의">💬</a>
        <a href="tel:01020680817" title="전화 문의">📞</a>
      </div>
    </>
  );
}
