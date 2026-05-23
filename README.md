# 위드에스마케팅 / 드림위드에스 출판사 — 홈페이지

> Next.js 14 (App Router) + TypeScript + Vanilla CSS
> 책 한 권으로 인생을 바꾸는 구조

## 🚀 빠른 시작

```bash
# 1. 의존성 설치
npm install

# 2. 개발 서버 실행
npm run dev
# → http://localhost:3000

# 3. 프로덕션 빌드
npm run build
npm run start
```

## 📁 프로젝트 구조

```
witheass-website/
├── app/
│   ├── layout.tsx              # 전역 레이아웃 + 메타데이터 + Pretendard 폰트
│   ├── page.tsx                # 메인 페이지 (전체 섹션)
│   ├── globals.css             # 전체 스타일 (Vanilla CSS)
│   └── components/
│       ├── SiteHeader.tsx      # 헤더 + 햄버거 메뉴 (client)
│       └── Faq.tsx             # FAQ 아코디언 (client)
├── public/                     # 정적 파일 (이미지 등)
├── next.config.mjs
├── tsconfig.json
├── package.json
└── .gitignore
```

## 🎨 디자인 시스템

| 항목 | 값 |
|---|---|
| Primary (Navy Dark) | `#0A1228` |
| Primary (Navy) | `#1A2547` |
| Accent (Gold) | `#C4A661` |
| Background (Cream) | `#FBF8F1` |
| Font | Pretendard (CDN) |
| Container max-width | 1200px |

CSS 변수는 모두 `app/globals.css` 상단의 `:root`에 정의되어 있어 색·간격 변경이 쉽습니다.

## 📑 페이지 섹션

1. **Hero** — 메인 헤드라인 + KPI 4개
2. **About** — 대표 본인 스토리 + 프로필
3. **Differentiators** — 4가지 차별점
4. **Thesis** — 논문 컨설팅
5. **Pricing** — 4개 패키지 가격표
6. **Process** — 8단계 진행 프로세스 + 3개 트랙
7. **Case Study** — 안세훈 변호사 케이스
8. **Service** — 진행 가능 분야 6종
9. **Community** — 더컬쳐앤 자체 커뮤니티 (다크)
10. **Portfolio** — 출간 사례 8건
11. **FAQ** — 16개 Q&A 아코디언
12. **Contact** — 4채널 문의 (다크)

---

## 📦 GitHub에 푸시하는 방법

### 옵션 A — GitHub CLI 사용 (가장 빠름)

```bash
# 1. GitHub CLI 인증 (한 번만)
gh auth login

# 2. 이 폴더에서 실행
cd "C:\Users\kimjin\Desktop\witheass-website"

# 3. 새 GitHub 저장소 생성 + 푸시 (한 번에)
gh repo create witheass-website --public --source=. --remote=origin --push
```

### 옵션 B — 수동 (gh CLI 없이)

1. https://github.com/new 에서 새 저장소 생성 (이름: `witheass-website`, public 추천)
2. 저장소 만들고 나서 표시되는 명령 중 두 번째 블록의 URL 복사 (예: `https://github.com/USERNAME/witheass-website.git`)
3. 터미널에서:

```bash
cd "C:\Users\kimjin\Desktop\witheass-website"
git remote add origin https://github.com/USERNAME/witheass-website.git
git branch -M main
git push -u origin main
```

> **참고:** 이 프로젝트는 이미 `git init` + 첫 커밋이 완료된 상태입니다.

---

## 🚀 Vercel 배포 (GitHub 연동 후)

GitHub에 푸시가 끝나면 Vercel은 **5분 안에** 배포 가능합니다.

### 1단계 — Vercel 가입 / 로그인

https://vercel.com → **Continue with GitHub** 선택 (Vercel ↔ GitHub 자동 연결)

### 2단계 — 프로젝트 임포트

1. Vercel 대시보드에서 **`+ New Project`** 클릭
2. **Import Git Repository** 섹션에 `witheass-website` 저장소가 보임 → **Import** 클릭
3. 설정 화면:
   - **Framework Preset**: `Next.js` (자동 감지됨)
   - **Root Directory**: `./` 그대로
   - **Build Command**: `next build` (자동)
   - **Output Directory**: 기본값
   - **Install Command**: `npm install` (자동)
4. **Deploy** 클릭

### 3단계 — 배포 완료

- 약 1~2분 후 `https://witheass-website.vercel.app` 같은 URL이 자동 생성됨
- GitHub `main` 브랜치에 푸시할 때마다 **자동 재배포**

### 4단계 — 커스텀 도메인 연결 (`bookpublishingwithess.com`)

1. Vercel 프로젝트 → **Settings → Domains**
2. `bookpublishingwithess.com` 입력 후 **Add**
3. 도메인 제공업체(가비아·후이즈 등)에 가서 Vercel이 안내하는 **DNS A 레코드** 또는 **CNAME** 설정
4. SSL 인증서는 Vercel이 자동 발급

> 도메인을 옮기지 않고 시안만 보여드리려면 Vercel 기본 도메인(`xxx.vercel.app`)으로 충분합니다.

---

## 🛠️ 수정 가이드

| 무엇을 바꾸려면 | 어디 |
|---|---|
| 회사 정보·전화번호·이메일 | `app/page.tsx` 하단 footer / contact |
| 가격 변경 | `app/page.tsx` PRICING 섹션 |
| FAQ 추가/수정 | `app/components/Faq.tsx` 의 `ITEMS` 배열 |
| 색상 / 폰트 | `app/globals.css` 상단 `:root` |
| 메뉴 항목 | `app/components/SiteHeader.tsx` |
| 메타데이터 (SEO) | `app/layout.tsx` |
| 포트폴리오 사례 | `app/page.tsx` PORTFOLIO 섹션의 배열 |

---

## 📝 라이선스

내부 사용. 외부 공개 시 별도 라이선스 명시.

## 📞 회사 정보

- 회사: 드림위드에스 / 위드에스마케팅 / 더컬쳐앤
- 대표: 이서진
- 사업자등록번호: 859-24-00524
- Tel: 010-2068-0817
- Email: dreamwithessmarketing@gmail.com
- KakaoTalk: http://pf.kakao.com/_QkZhd
