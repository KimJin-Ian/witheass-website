/**
 * 번역 보충분 (2026-11-16)
 *
 * 영어 · 중국어 · 일본어 페이지(/en · /zh · /ja)를 따로 열면서, 그동안 번역이 비어
 * 한국어로 보이던 곳을 채웠다. lib/i18n.ts 가 이 파일을 읽어 기존 사전에 합친다.
 *   - 기존 사전(i18n.ts)에 같은 키가 있으면 기존 값이 이긴다 — 여기는 "빈 곳"만 채운다.
 *   - 한국어(ko)는 화면에 박혀 있던 문구를 키로 옮긴 것뿐이라 문구 자체는 그대로다.
 *
 * 책 제목 · 저자 이름의 외국어 표기는 공식 번역이 아니라 뜻을 옮긴 것이다.
 * 공식 표기가 따로 있으면 여기 값을 바꾸면 된다.
 */

type Dict = Record<string, string>;
type L = "ko" | "en" | "zh" | "ja";

// ─────────────────────────────────────────────────────────────
// 1) 한 줄짜리 문구
// ─────────────────────────────────────────────────────────────
export const EXTRA: Record<L, Dict> = {
  ko: {
    "a11y.lang": "언어 선택",
    "a11y.home": "드림위드에스 출판사 홈으로",
    "a11y.logo": "드림위드에스 출판사 — 위드에스마케팅",
    "a11y.menuOpen": "메뉴 열기",
    "a11y.menuClose": "메뉴 닫기",
    "a11y.skip": "본문 바로가기",
    "float.kakao": "카카오톡 상담",
    "float.phone": "전화 상담",
    "popup.small": "작게 보기",
    "popup.big": "크게 보기",
    "popup.close": "닫기",
    "popup.tap": "탭 = 크게",
    "popup.drag": "드래그",
    "portfolio.beltHint": "누적 890명 · 끊임없이 출간 중",
    "portfolio.altPrefix": "드림위드에스 출판 사례",
    "team.compact.a": "저자가 혼자 책을 내는 것이 아닙니다. ",
    "team.compact.b": "박사급 컨설턴트와 30+ 분야 전문 작가",
    "team.compact.c": "가 한 권 한 권에 직접 참여합니다.",
    "team.role1": "출판부 팀장",
    "team.role2": "출판 기획·컨설팅",
    "team.role3": "논문 컨설팅",
    "team.role4": "출판 실무·교육",
    "team.role5": "기획 작가",
    "team.role6": "출판 작가",
    "team.more": "작가진 이력 자세히 보기 →",
  },

  en: {
    "a11y.lang": "Select language",
    "a11y.home": "Dream With Ess — home",
    "a11y.logo": "Dream With Ess Publishing — With-Ess Marketing",
    "a11y.menuOpen": "Open menu",
    "a11y.menuClose": "Close menu",
    "a11y.skip": "Skip to main content",
    "float.kakao": "KakaoTalk chat",
    "float.phone": "Call us",
    "popup.small": "Minimize",
    "popup.big": "Expand",
    "popup.close": "Close",
    "popup.tap": "Tap = expand",
    "popup.drag": "Drag",
    "portfolio.beltHint": "890+ books to date · new titles keep coming",
    "portfolio.altPrefix": "Dream With Ess published work",
    "team.compact.a": "Authors don't publish alone. ",
    "team.compact.b": "PhD-level consultants and writers across 30+ fields",
    "team.compact.c": " work directly on every single book.",
    "team.role1": "Publishing Team Lead",
    "team.role2": "Publishing Planning · Consulting",
    "team.role3": "Thesis Consulting",
    "team.role4": "Publishing Operations · Training",
    "team.role5": "Planning Writer",
    "team.role6": "Publishing Writer",
    "team.more": "View writer profiles (in Korean) →",

    "hero.extra": "Nationwide bookstore distribution and in-store shelf display",
    "brand.c6.title": "Bestseller Planning Team",
    "brand.c6.desc":
      "Our bestseller planning team works with you from start to finish, so your book comes out as one that people want to read.",

    "pricing.p2.l1": "Author writes the first draft",
    "pricing.p2.l2": "Table of contents planning",
    "pricing.p2.l3": "Manuscript editing & proofreading",
    "pricing.p2.l4": "Overall structure design",
    "pricing.p2.l5": "Cover copywriting",
    "pricing.p2.l6": "500 prints + distribution",
    "pricing.p3.l1": "Interview-based planning (no writing required)",
    "pricing.p3.l2": "TOC design + manuscript writing",
    "pricing.p3.l3": "Editing + cover/interior design",
    "pricing.p3.l4": "500 prints (200 pages standard)",
    "pricing.p3.l5": "E-book + Millie's Library registration",
    "pricing.p3.l6": "ISBN + Naver Book registration",
    "pricing.p3.l7": "Nationwide bookstore distribution + 45% royalty",
    "pricing.p4.l1": "Full publishing process included (the entire ₩9M package above)",
    "pricing.p4.l2": "Blog · Instagram · YouTube marketing",
    "pricing.p4.l3": "Press PR + portal search branding",
    "pricing.p4.l4": "Reviewer group + word of mouth",
    "pricing.p4.l5": "Webtoon-style content, 20+ panels",
    "pricing.p4.l6": "Speaking event hosting and operation (book talk · lecture)",
    "pricing.p4.l7": "Speaking · class connections + personal branding roadmap",

    "portfolio.b1.cat": "CEO · Memoir",
    "portfolio.b1.title": "“A Challenge with Soul” · Lee Moon-ho",
    "portfolio.b2.cat": "CEO · Memoir",
    "portfolio.b2.title": "“The Boy Who Kicked a Ball Now Runs the World” · Ko Yong-pil",
    "portfolio.b3.cat": "Politician · Memoir",
    "portfolio.b3.title": "“Love for Seocho, My Dream” · Kim An-sook",
    "portfolio.b4.cat": "Politics · Current Affairs",
    "portfolio.b4.title": "“Yoon Suk-yeol Will Become President” · Park Seo-young",
    "portfolio.b5.cat": "Memoir · Service",
    "portfolio.b5.title": "“A Life of Service, for Myself” · Park Jong-sung",
    "portfolio.b6.cat": "Memoir · Life Story",
    "portfolio.b6.title": "“I Still Dream Today” · Lee Jong-dam",
    "portfolio.b7.cat": "Expertise · ESG",
    "portfolio.b7.title": "“ESG Trends” · Kim Sang-tae",
    "portfolio.b8.cat": "Expertise · Beauty",
    "portfolio.b8.title": "“Why the World Is Wild About K-Beauty” · Kim Mindy",
    "portfolio.b9.cat": "Business · Practical",
    "portfolio.b9.title": "“Live Commerce That Pays” · co-authored",
    "portfolio.b10.cat": "Business · Startup",
    "portfolio.b10.title": "“From Startup to Exit” · Jung Hyung-hak",
    "portfolio.b11.cat": "Medical · Orthopedics",
    "portfolio.b11.title": "“It's Not Age That Stops You — It's Your Joints” · Ahn Woo-chan",
    "portfolio.b12.cat": "Medical · Anti-Aging",
    "portfolio.b12.title": "“The Secret Story of Anti-Aging” · Jung Jae-woong",
    "portfolio.b13.cat": "Coaching · Communication",
    "portfolio.b13.title": "“Conversation Lessons for Leaders” · Kim Ji-el",
    "portfolio.b14.cat": "Essay · Hope",
    "portfolio.b14.title": "“Evidence of Hope for the Weak” · Lee Deborah",
    "portfolio.b15.cat": "Society · Cultural Criticism",
    "portfolio.b15.title": "“A Report on Korean Men” · Kim Tae-hoon",
    "portfolio.b16.cat": "Culture Industry · Professional",
    "portfolio.b16.title": "“The Fourth Industrial Revolution and the Culture Industry” · Lee Seo-jin",
  },

  zh: {
    "a11y.lang": "选择语言",
    "a11y.home": "Dream With Ess 首页",
    "a11y.logo": "Dream With Ess 出版社 — With-Ess Marketing",
    "a11y.menuOpen": "打开菜单",
    "a11y.menuClose": "关闭菜单",
    "a11y.skip": "跳至正文",
    "float.kakao": "KakaoTalk咨询",
    "float.phone": "电话咨询",
    "popup.small": "缩小",
    "popup.big": "放大",
    "popup.close": "关闭",
    "popup.tap": "点击 = 放大",
    "popup.drag": "拖动",
    "portfolio.beltHint": "累计890本 · 新书持续出版中",
    "portfolio.altPrefix": "Dream With Ess 出版案例",
    "team.compact.a": "作者并非独自出书。",
    "team.compact.b": "博士级顾问与30+领域专业作家",
    "team.compact.c": "直接参与每一本书。",
    "team.role1": "出版部组长",
    "team.role2": "出版策划·咨询",
    "team.role3": "论文咨询",
    "team.role4": "出版实务·培训",
    "team.role5": "策划作家",
    "team.role6": "出版作家",
    "team.more": "查看作家团队简历(韩语)→",

    "hero.extra": "全国书店流通及线下书架陈列",
    "brand.c6.title": "畅销书策划团队",
    "brand.c6.desc": "畅销书策划团队全程参与，从头到尾与您一起打造读者想读的书。",

    "pricing.p2.l1": "作者撰写一稿",
    "pricing.p2.l2": "目录策划",
    "pricing.p2.l3": "原稿校对·校阅",
    "pricing.p2.l4": "整体结构设计",
    "pricing.p2.l5": "封面文案",
    "pricing.p2.l6": "500本印刷+流通",
    "pricing.p3.l1": "基于访谈策划(无文字也可)",
    "pricing.p3.l2": "目录设计+原稿写作",
    "pricing.p3.l3": "校对+封面/内页设计",
    "pricing.p3.l4": "500本印刷(200页基准)",
    "pricing.p3.l5": "电子书+Millie图书馆登记",
    "pricing.p3.l6": "ISBN+Naver图书登记",
    "pricing.p3.l7": "全国书店流通+版税45%",
    "pricing.p4.l1": "包含图书出版全过程(上述900万韩元套餐全部)",
    "pricing.p4.l2": "博客·Instagram·YouTube营销",
    "pricing.p4.l3": "媒体PR+门户搜索品牌化",
    "pricing.p4.l4": "评价团+口碑营销",
    "pricing.p4.l5": "网漫式内容20张以上",
    "pricing.p4.l6": "演讲会主办·运营(图书分享会·讲座)",
    "pricing.p4.l7": "演讲·课程衔接+个人品牌路线图",

    "portfolio.b1.cat": "CEO · 自传",
    "portfolio.b1.title": "《有灵魂的挑战》Lee Moon-ho",
    "portfolio.b2.cat": "CEO · 自传",
    "portfolio.b2.title": "《踢球少年，经营世界》Ko Yong-pil",
    "portfolio.b3.cat": "政治人士 · 自传",
    "portfolio.b3.title": "《瑞草之爱，我的梦》Kim An-sook",
    "portfolio.b4.cat": "政治 · 时事",
    "portfolio.b4.title": "《尹锡悦，将成为总统》Park Seo-young",
    "portfolio.b5.cat": "自传 · 奉献",
    "portfolio.b5.title": "《为自己而奉献的人生》Park Jong-sung",
    "portfolio.b6.cat": "自传 · 人生记录",
    "portfolio.b6.title": "《今天我依然做梦》Lee Jong-dam",
    "portfolio.b7.cat": "专业知识 · ESG",
    "portfolio.b7.title": "《ESG趋势》Kim Sang-tae",
    "portfolio.b8.cat": "专业知识 · 美容",
    "portfolio.b8.title": "《世界为何为K-Beauty而狂热》Kim Mindy",
    "portfolio.b9.cat": "商业 · 实用书",
    "portfolio.b9.title": "《赚钱的直播电商》合著",
    "portfolio.b10.cat": "商业 · 创业",
    "portfolio.b10.title": "《从创业到Exit》Jung Hyung-hak",
    "portfolio.b11.cat": "医疗 · 骨科",
    "portfolio.b11.title": "《让人停下的不是年龄，而是关节》Ahn Woo-chan",
    "portfolio.b12.cat": "医疗 · 抗衰老",
    "portfolio.b12.title": "《抗衰老的秘密故事》Jung Jae-woong",
    "portfolio.b13.cat": "教练 · 沟通",
    "portfolio.b13.title": "《领导者的对话课》Kim Ji-el",
    "portfolio.b14.cat": "散文 · 希望",
    "portfolio.b14.title": "《给弱者的希望之证》Lee Deborah",
    "portfolio.b15.cat": "社会 · 文化评论",
    "portfolio.b15.title": "《大韩民国男人报告》Kim Tae-hoon",
    "portfolio.b16.cat": "文化产业 · 专业书",
    "portfolio.b16.title": "《第四次工业革命与文化产业》Lee Seo-jin",
  },

  ja: {
    "a11y.lang": "言語を選択",
    "a11y.home": "Dream With Ess ホームへ",
    "a11y.logo": "Dream With Ess 出版社 — With-Ess Marketing",
    "a11y.menuOpen": "メニューを開く",
    "a11y.menuClose": "メニューを閉じる",
    "a11y.skip": "本文へスキップ",
    "float.kakao": "カカオトーク相談",
    "float.phone": "電話相談",
    "popup.small": "小さく表示",
    "popup.big": "大きく表示",
    "popup.close": "閉じる",
    "popup.tap": "タップ = 拡大",
    "popup.drag": "ドラッグ",
    "portfolio.beltHint": "累計890冊 · 続々出版中",
    "portfolio.altPrefix": "Dream With Ess 出版事例",
    "team.compact.a": "著者が一人で本を出すのではありません。",
    "team.compact.b": "博士級コンサルタントと30以上の分野の専門ライター",
    "team.compact.c": "が一冊一冊に直接関わります。",
    "team.role1": "出版部チーム長",
    "team.role2": "出版企画・コンサルティング",
    "team.role3": "論文コンサルティング",
    "team.role4": "出版実務・教育",
    "team.role5": "企画ライター",
    "team.role6": "出版ライター",
    "team.more": "ライター陣の経歴を見る(韓国語)→",

    "hero.extra": "全国書店流通およびオフライン売り場での陳列",
    "brand.c6.title": "ベストセラー企画チーム",
    "brand.c6.desc":
      "ベストセラー企画チームが最初から最後までご一緒し、読者が読みたくなる本に仕上げます。",

    "pricing.p2.l1": "著者が第1稿を執筆",
    "pricing.p2.l2": "目次企画",
    "pricing.p2.l3": "原稿の校正・校閲",
    "pricing.p2.l4": "全体構成の設計",
    "pricing.p2.l5": "表紙コピーライティング",
    "pricing.p2.l6": "500部印刷 + 流通",
    "pricing.p3.l1": "インタビュー基盤の企画(原稿がなくてもOK)",
    "pricing.p3.l2": "目次設計 + 原稿執筆",
    "pricing.p3.l3": "校正・校閲 + 表紙・本文デザイン",
    "pricing.p3.l4": "500部印刷(200ページ基準)",
    "pricing.p3.l5": "電子書籍 + ミリの書斎登録",
    "pricing.p3.l6": "ISBN + Naverブック登録",
    "pricing.p3.l7": "全国書店流通 + 印税45%",
    "pricing.p4.l1": "出版オールインワンの全工程を含む(上記900万ウォンパッケージすべて)",
    "pricing.p4.l2": "ブログ・Instagram・YouTubeマーケティング",
    "pricing.p4.l3": "メディアPR + ポータル検索ブランディング",
    "pricing.p4.l4": "レビュー団 + バイラル",
    "pricing.p4.l5": "ウェブトゥーン型コンテンツ20枚以上",
    "pricing.p4.l6": "講演会の主催・運営(ブックトーク・講義)",
    "pricing.p4.l7": "講演・クラス連携 + パーソナルブランディングロードマップ",

    "process.s1.title": "お問い合わせ / お見積もり",
    "process.s1.desc": "予算・流入経路・目的を確認し、分野別の事例を共有",
    "process.s2.title": "契約",
    "process.s2.desc": "契約金600万ウォンのご入金 → 本格的に進行開始",
    "process.s3.title": "インタビュー",
    "process.s3.desc": "原稿がない場合は2〜5回、1回2時間",
    "process.s4.title": "目次・原稿",
    "process.s4.desc": "1週間以内に目次 → フィードバック2回 → 原稿執筆",
    "process.s5.title": "校正 + デザイン",
    "process.s5.desc": "並行進行でスピード短縮。表紙案2点",
    "process.s6.title": "印刷・流通",
    "process.s6.desc": "500部印刷 → 全国書店 + ISBN・Naver登録",
    "process.s7.title": "電子書籍登録",
    "process.s7.desc": "ミリの書斎 + 教保・Yes24・リディの電子書籍",
    "process.s8.title": "出版後マーケティング",
    "process.s8.desc": "講演・ブランディング・事業拡大コンサルティングへの連携",
    "process.t1.title": "📚 論文型 / 専門書",
    "process.t1.l1": "カスタムリサーチ企画",
    "process.t1.l2": "フィードバック1〜2回",
    "process.t1.l3": "原稿執筆",
    "process.t1.l4": "印刷・出版",
    "process.t2.title": "📖 エッセイ / 小説",
    "process.t2.l1": "第1次目次のご提案",
    "process.t2.l2": "目次に基づく原稿執筆",
    "process.t2.l3": "第1稿",
    "process.t2.l4": "フィードバック → 最終原稿",
    "process.t3.title": "📜 自伝 / 回顧録",
    "process.t3.l1": "詳細な質問票 + ご回答",
    "process.t3.l2": "インタビュー(ご家族・知人を含む)",
    "process.t3.l3": "第1稿 + 追加質問",
    "process.t3.l4": "フィードバック → 完成",

    "service.s1.title": "🏛 政治家・公職者",
    "service.s1.desc":
      "出版記念会・選挙・任期の日程に合わせた自伝 + 信頼性を高める書籍。天安市長の自伝・瑞草区議員の自伝などの事例。",
    "service.s2.title": "💼 CEO・経営者",
    "service.s2.desc":
      "パーソナルブランディングと事業拡大のための書籍。検索での信頼性確保 + 講演・コンサルティングへの連携まで。",
    "service.s3.title": "⚖️ 専門職(医師・弁護士・教授)",
    "service.s3.desc": "専門性と大衆性を同時に。アン・セフン弁護士『利己的な男』などベストセラー事例。",
    "service.s4.title": "📚 講師・コンサルタント",
    "service.s4.desc": "講演コンテンツの資産化。1冊の本をYouTube・ブログ・講義資料までマルチ活用。",
    "service.s5.title": "📖 個人の自伝 / 回顧録",
    "service.s5.desc":
      "人生を本に残したい方、ご両親への贈り物、家族の記録に。インタビュー基盤なので文章力がなくても可能です。",
    "service.s6.title": "🏢 企業・機関",
    "service.s6.desc": "事例集・年次報告書・ブランドブック。大田信用保証財団など機関書籍の事例。",

    "voices.v1.tag": "塾・教育運営",
    "voices.v1.title": "「塾の売上が目に見えて上がりました。」",
    "voices.v1.desc":
      "「院長の本があると、保護者面談での信頼度が違います。検索すると本が先に出てきて、入会率がはっきり上がりました。」",
    "voices.v2.tag": "政治家・公職者",
    "voices.v2.title": "「講演会のおかげで地域にしっかり知られました。」",
    "voices.v2.desc":
      "「出版記念会・ブックトーク1回で数百人が集まり、1冊の本が名刺の役割を果たすので、キャンペーンの効率がまったく変わりました。」",
    "voices.v3.tag": "専門職(医師・弁護士・教授)",
    "voices.v3.title": "「自分のブランディング、自分の記録そのものがうれしいです。」",
    "voices.v3.desc":
      "「患者さんや依頼人が検索したとき、本が見えるのは違いますね。本業の信頼が本を通じて自然につながります。」",
    "voices.v4.tag": "CEO・経営者",
    "voices.v4.title": "「稼いでいた頃より、本を書いて講演の副収入を得る今のほうが幸せです。」",
    "voices.v4.desc":
      "「事業で培ったノウハウが本になり、講演依頼が絶えません。人生の第二章を始めた気分です。」",
    "voices.v5.tag": "講師・コンサルタント",
    "voices.v5.title": "「講義料の単価が上がりました。」",
    "voices.v5.desc":
      "「本がある講師とない講師では、単価から違います。1冊の本が講師としてのキャリア全体を一段引き上げてくれました。」",
    "voices.v6.tag": "自営業者・小規模事業者",
    "voices.v6.title": "「検索すると、まず信頼が見えます。」",
    "voices.v6.desc":
      "「店名の横に『著者』という肩書きが一つ付くだけで、紹介・納品・提携の提案が自然に入ってきます。」",
    "voices.v7.tag": "自伝・回顧録",
    "voices.v7.title": "「家族がもっと誇りに思ってくれます。」",
    "voices.v7.desc":
      "「お金では買えない記録を残せたという満足感。子どもや孫に残せるので、人生で一番良いことをしたと思います。」",
    "voices.v8.tag": "コーチ・トレーナー",
    "voices.v8.title": "「コーチングプログラムの成約率が上がりました。」",
    "voices.v8.desc":
      "「コンテンツが本にまとまると、お客様があらかじめ信頼を持って来てくださいます。無料相談 → 有料プログラムへの転換率がはっきり伸びました。」",
    "voices.v9.tag": "作家・コンテンツクリエイター",
    "voices.v9.title": "「次の作品・コラボの提案が自然に入ってきます。」",
    "voices.v9.desc":
      "「最初の本が出ると、出版社やプラットフォームから2冊目の提案が来ます。Instagram・ブログのフォロワーも一気に増えました。」",

    "community.list1.title": "自社コミュニティ9つ",
    "community.list1.l1": "20〜30代女性インフルエンサー",
    "community.list1.l2": "江南ソーシャルネットワーク",
    "community.list1.l3": "CEO・専門職ネットワーク",
    "community.list1.l4": "音楽家ネットワーク",
    "community.list1.l5": "ママ層",
    "community.list1.l6": "病院・美容関心層",
    "community.list1.l7": "文化芸術コミュニティ",
    "community.list1.l8": "書籍出版関心層",
    "community.list1.l9": "講演・クラス関心層",
    "community.list2.title": "オフラインイベントラインナップ",
    "community.list2.l1": "ブックトーク / 出版記念講演会",
    "community.list2.l2": "著者との出会い",
    "community.list2.l3": "サロントークコンサート(「見えるラジオ」)",
    "community.list2.l4": "専門職ネットワーキングイベント",
    "community.list2.l5": "ブランドコラボイベント",
    "community.list2.l6": "病院・美容・文化コミュニティイベント",
    "community.list2.l7": "The Culturen Lounge スペースPR",
    "community.list2.l8": "VIP招待イベント",

    "portfolio.b1.cat": "CEO · 自伝",
    "portfolio.b1.title": "『魂のある挑戦』イ・ムンホ",
    "portfolio.b2.cat": "CEO · 自伝",
    "portfolio.b2.title": "『ボールを蹴っていた少年、世界を経営する』コ・ヨンピル",
    "portfolio.b3.cat": "政治家 · 自伝",
    "portfolio.b3.title": "『瑞草への愛、私の夢』キム・アンスク",
    "portfolio.b4.cat": "政治 · 時事",
    "portfolio.b4.title": "『ユン・ソンニョル、大統領になる』パク・ソヨン",
    "portfolio.b5.cat": "自伝 · 奉仕",
    "portfolio.b5.title": "『自分のための奉仕の人生』パク・ジョンソン",
    "portfolio.b6.cat": "自伝 · 人生記録",
    "portfolio.b6.title": "『私は今日も夢を見る』イ・ジョンダム",
    "portfolio.b7.cat": "専門知識 · ESG",
    "portfolio.b7.title": "『ESGトレンド』キム・サンテ",
    "portfolio.b8.cat": "専門知識 · ビューティー",
    "portfolio.b8.title": "『なぜ世界はKビューティーに熱狂するのか』キム・ミンディ",
    "portfolio.b9.cat": "ビジネス · 実用書",
    "portfolio.b9.title": "『稼げるライブコマース』共著",
    "portfolio.b10.cat": "ビジネス · スタートアップ",
    "portfolio.b10.title": "『起業からExitまで』チョン・ヒョンハク",
    "portfolio.b11.cat": "医療 · 整形外科",
    "portfolio.b11.title": "『人を止めるのは年齢ではなく関節だ』アン・ウチャン",
    "portfolio.b12.cat": "医療 · アンチエイジング",
    "portfolio.b12.title": "『アンチエイジングの秘密の話』チョン・ジェウン",
    "portfolio.b13.cat": "コーチング · コミュニケーション",
    "portfolio.b13.title": "『リーダーの対話レッスン』キム・ジエル",
    "portfolio.b14.cat": "エッセイ · 希望",
    "portfolio.b14.title": "『弱き者のための希望の証』イ・ドゥボラ",
    "portfolio.b15.cat": "社会 · 文化批評",
    "portfolio.b15.title": "『大韓民国 男性レポート』キム・テフン",
    "portfolio.b16.cat": "文化産業 · 専門書",
    "portfolio.b16.title": "『第4次産業革命と文化産業』イ・ソジン",
  },
};

// ─────────────────────────────────────────────────────────────
// 2) 「책출판 & 퍼스널브랜딩 통합 마케팅」 구획 (About us 의 #fullpkg)
//    목록이 여러 겹이라 한 줄짜리 키 대신 묶음으로 둔다.
// ─────────────────────────────────────────────────────────────
export type FullPkg = {
  tag: string;
  title: string;
  /** [앞 문장, 굵게, 뒤 문장] */
  lead: [string, string, string];
  /** [굵은 제목, 설명] */
  points: [string, string][];
  /** 두 줄 인용 */
  quote: [string, string];
  summary: string;
  secs: { h: string; groups: { sub?: string; items: string[] }[] }[];
  /** [굵은 제목, 설명] */
  extra: [string, string];
  effectTitle: string;
  effects: string[];
};

export const FULLPKG: Record<L, FullPkg> = {
  ko: {
    tag: "전문직 · CEO · 정치인 전용",
    title: "책출판 & 퍼스널브랜딩 통합 마케팅",
    lead: [
      "책을 내는 목적이 ",
      "검색 시 나오는 공신력과 브랜드",
      "라면, 책만 내는 것으로는 의미가 없습니다. 출간 소식이 알려지면 지인·고객·거래처·동료가 한 번쯤 저자 이름을 검색합니다 — 바로 그 시점에 정보와 콘텐츠가 준비돼 있어야 전문성과 공신력이 형성됩니다.",
    ],
    points: [
      ["검색의 순간이 핵심", "출간 직후가 가장 관심이 집중되는 시기. “나중에 천천히”는 그 골든타임을 놓칩니다."],
      ["단순 업로드가 아닌, 납득되는 리뷰", "모든 플랫폼에 자연스러운 후기·콘텐츠가 검색되어야 합니다."],
      ["통합으로 맡겨야 하는 이유", "책은 저자 개인의 이미지·전문성과 직결됩니다. 처음부터 함께 기획해 이해도 높은 드림위드에스에 통합으로."],
      ["평생 남는 이미지", "금액보다 처음부터 제대로가 중요합니다."],
    ],
    quote: ["“단순 마케팅 대행이 아니라, 개인을 전문 브랜딩하고", "책을 처음부터 함께 기획하는 통합 파트너.”"],
    summary: "📦 통합 퍼스널 브랜딩 마케팅 패키지 — 전체 항목 보기",
    secs: [
      {
        h: "1. 저자 인터뷰 영상 콘텐츠 제작 및 배포",
        groups: [
          { sub: "인터뷰 제작", items: ["전문 사회자 진행 인터뷰 촬영", "10분 이내 편집 영상 1편 + 쇼츠 2편 + 풀버전"] },
          {
            sub: "대형 채널 · 멀티 배포",
            items: [
              "월 1,000만 뷰+ 협업 유튜브 채널 업로드",
              "유튜브·틱톡·인스타·페북·네이버TV·스레드 동시 배포",
              "영상 내/설명란 도서 구매 링크 삽입 · 하루 2~3개 지속 업로드",
            ],
          },
        ],
      },
      {
        h: "2. 블로그 마케팅 및 검색 노출",
        groups: [{ items: ["블로그 포스팅 10건 제작·배포", "저자명·전문분야·도서 키워드 SEO 검색 노출", "전문성·경험·사례 중심 후기형 콘텐츠 운영"] }],
      },
      {
        h: "3. SNS 콘텐츠 제작",
        groups: [{ items: ["인스타 카드뉴스 10장 1세트", "인플루언서 리뷰형 콘텐츠", "유튜브 롱폼 1편 + 쇼츠 2편 (별도 촬영) · MC 단독 인터뷰"] }],
      },
      {
        h: "4. 언론홍보(PR)",
        groups: [{ items: ["언론 기사 2건+ 배포 · 포털 검색 브랜딩", "저자 소개/전문분야 인터뷰/출간 기사로 신뢰도 확보"] }],
      },
      {
        h: "5. 리뷰 및 바이럴 마케팅",
        groups: [{ items: ["리뷰단 모집·운영", "블로그·카페·SNS 후기 기반 바이럴", "독자·경험·전문성 리뷰 등 다양한 콘텐츠 생성"] }],
      },
      {
        h: "6. 웹툰형 콘텐츠 제작",
        groups: [{ items: ["10컷+ 웹툰형 콘텐츠 — 책 내용을 스토리텔링으로 전달"] }],
      },
      {
        h: "7. 강연·클래스·컨설팅 연계 전략",
        groups: [{ items: ["강연·클래스 상품화 / 컨설팅 상품 연결 전략 설계", "책 판매 이후 추가 수익 모델 구축"] }],
      },
      {
        h: "8. 퍼스널 브랜딩 로드맵 제공",
        groups: [{ items: ["저자 포지셔닝·전문가 브랜드·검색/SNS 브랜딩 방향 설정", "강연·클래스·컨설팅·전문가 활동으로 연결되는 장기 성장 로드맵"] }],
      },
    ],
    extra: ["추가 진행 가능(별도 비용)", "대형 서점 광고 · 지하철 광고 · 오프라인 홍보물 제작/운영"],
    effectTitle: "기대 효과",
    effects: ["도서 인지도 ↑", "저자 브랜드 구축", "검색 노출 확대", "SNS 영향력 ↑", "언론 노출 확보", "후기·바이럴 확산", "강연·클래스 기회", "컨설팅·사업 확장"],
  },

  en: {
    tag: "For Professionals · CEOs · Politicians",
    title: "Book Publishing & Personal Branding — Integrated Marketing",
    lead: [
      "If the reason you are publishing is ",
      "the credibility and brand people find when they search for you",
      ", publishing the book alone is not enough. Once news of the book spreads, acquaintances, clients, partners and colleagues will search the author's name at least once — and your information and content have to be ready at that very moment for expertise and credibility to take shape.",
    ],
    points: [
      ["The moment of search is what matters", "Right after publication is when attention peaks. “We'll get to it later” misses that golden window."],
      ["Reviews that convince, not just uploads", "Natural reviews and content should come up on every platform people search."],
      ["Why it should be handled as one", "A book is tied directly to the author's image and expertise. Dream With Ess plans it with you from the start and knows it best — so we handle it as one."],
      ["An image that lasts a lifetime", "Getting it right from the beginning matters more than the price."],
    ],
    quote: ["“Not a simple marketing agency, but an integrated partner that brands you as an expert", "and plans your book with you from the very beginning.”"],
    summary: "📦 Integrated Personal Branding Marketing Package — see all items",
    secs: [
      {
        h: "1. Author interview video — production and distribution",
        groups: [
          { sub: "Interview production", items: ["Interview filmed with a professional host", "One edited video under 10 minutes + 2 Shorts + full version"] },
          {
            sub: "Major channels · multi-platform distribution",
            items: [
              "Upload to a partner YouTube channel with 10M+ monthly views",
              "Simultaneous distribution on YouTube, TikTok, Instagram, Facebook, Naver TV and Threads",
              "Book purchase link in the video and description · 2–3 uploads a day on an ongoing basis",
            ],
          },
        ],
      },
      {
        h: "2. Blog marketing and search visibility",
        groups: [{ items: ["10 blog posts produced and published", "SEO visibility for the author's name, specialty and book keywords", "Review-style content built around expertise, experience and cases"] }],
      },
      {
        h: "3. Social media content",
        groups: [{ items: ["One set of 10 Instagram card-news slides", "Influencer review-style content", "1 long-form YouTube video + 2 Shorts (filmed separately) · solo interview with an MC"] }],
      },
      {
        h: "4. Press & PR",
        groups: [{ items: ["2+ press articles distributed · portal search branding", "Author profile, specialty interview and publication articles to build trust"] }],
      },
      {
        h: "5. Reviews and word-of-mouth marketing",
        groups: [{ items: ["Recruiting and running a reviewer group", "Word of mouth built on blog, online community and social media reviews", "A range of content — reader, experience and expertise reviews"] }],
      },
      {
        h: "6. Webtoon-style content",
        groups: [{ items: ["10+ panel webtoon-style content — the book's message told as a story"] }],
      },
      {
        h: "7. Speaking · class · consulting strategy",
        groups: [{ items: ["Turning talks and classes into products / designing the link to consulting services", "Building additional revenue models beyond book sales"] }],
      },
      {
        h: "8. Personal branding roadmap",
        groups: [{ items: ["Author positioning, expert brand, and search / social media branding direction", "A long-term growth roadmap leading to speaking, classes, consulting and expert activities"] }],
      },
    ],
    extra: ["Available as add-ons (separate cost)", "Major bookstore advertising · subway advertising · offline promotional materials (production and operation)"],
    effectTitle: "Expected results",
    effects: ["Book awareness ↑", "Author brand built", "Wider search visibility", "Social media influence ↑", "Press exposure", "Reviews · word of mouth", "Speaking · class opportunities", "Consulting · business expansion"],
  },

  zh: {
    tag: "专业人士 · CEO · 政治人士专属",
    title: "图书出版 & 个人品牌整合营销",
    lead: [
      "如果出书的目的是",
      "被搜索时呈现的公信力与品牌",
      "，那么只出书是没有意义的。出版消息传开后，熟人、客户、合作方、同事都会搜索一次作者的名字 — 正是在那个时刻，信息与内容必须已经准备好，专业性与公信力才能形成。",
    ],
    points: [
      ["搜索的瞬间是关键", "刚出版时关注度最集中。“以后慢慢来”会错过这个黄金时机。"],
      ["不是单纯上传，而是令人信服的评价", "在所有平台上都应能搜索到自然的评价与内容。"],
      ["为什么要整体委托", "书与作者个人的形象和专业性直接相关。交给从一开始就共同策划、理解最深的 Dream With Ess 整体负责。"],
      ["留存一生的形象", "比起金额，从一开始就做对更重要。"],
    ],
    quote: ["“不是单纯的营销代理，而是为个人打造专业品牌、", "从一开始就共同策划图书的整合伙伴。”"],
    summary: "📦 整合个人品牌营销套餐 — 查看全部项目",
    secs: [
      {
        h: "1. 作者访谈视频内容制作与发布",
        groups: [
          { sub: "访谈制作", items: ["专业主持人主持的访谈拍摄", "10分钟以内剪辑视频1条 + 短视频2条 + 完整版"] },
          {
            sub: "大型频道 · 多平台发布",
            items: [
              "上传至月播放量1000万+的合作YouTube频道",
              "YouTube、TikTok、Instagram、Facebook、Naver TV、Threads同步发布",
              "视频内/简介栏插入购书链接 · 每天持续上传2~3条",
            ],
          },
        ],
      },
      {
        h: "2. 博客营销与搜索曝光",
        groups: [{ items: ["制作并发布10篇博客文章", "作者姓名·专业领域·图书关键词的SEO搜索曝光", "以专业性·经验·案例为中心的评价型内容运营"] }],
      },
      {
        h: "3. 社交媒体内容制作",
        groups: [{ items: ["Instagram图文卡片10张1套", "意见领袖评价型内容", "YouTube长视频1条 + 短视频2条(另行拍摄) · 主持人单独访谈"] }],
      },
      {
        h: "4. 媒体公关(PR)",
        groups: [{ items: ["发布2篇以上新闻报道 · 门户搜索品牌化", "通过作者介绍/专业领域访谈/出版报道建立信赖度"] }],
      },
      {
        h: "5. 评价与口碑营销",
        groups: [{ items: ["招募并运营评价团", "基于博客·论坛·社交媒体评价的口碑传播", "生成读者·体验·专业性评价等多样内容"] }],
      },
      {
        h: "6. 网漫式内容制作",
        groups: [{ items: ["10格以上网漫式内容 — 以故事形式传达书的内容"] }],
      },
      {
        h: "7. 演讲·课程·咨询衔接策略",
        groups: [{ items: ["演讲·课程产品化 / 设计与咨询产品的衔接策略", "构建售书之后的追加收益模式"] }],
      },
      {
        h: "8. 提供个人品牌路线图",
        groups: [{ items: ["设定作者定位·专家品牌·搜索/社交媒体品牌方向", "衔接演讲·课程·咨询·专家活动的长期成长路线图"] }],
      },
    ],
    extra: ["可追加进行(另行收费)", "大型书店广告 · 地铁广告 · 线下宣传物制作/运营"],
    effectTitle: "预期效果",
    effects: ["图书知名度 ↑", "建立作者品牌", "扩大搜索曝光", "社交媒体影响力 ↑", "获得媒体曝光", "评价·口碑扩散", "演讲·课程机会", "咨询·事业扩展"],
  },

  ja: {
    tag: "専門職・CEO・政治家専用",
    title: "書籍出版 & パーソナルブランディング統合マーケティング",
    lead: [
      "本を出す目的が",
      "検索したときに表示される信頼性とブランド",
      "であるなら、本を出すだけでは意味がありません。出版の知らせが広まると、知人・顧客・取引先・同僚が一度は著者の名前を検索します — まさにその時点で情報とコンテンツが準備されていてこそ、専門性と信頼性が形成されます。",
    ],
    points: [
      ["検索の瞬間が核心", "出版直後が最も関心が集まる時期。「あとでゆっくり」ではそのゴールデンタイムを逃します。"],
      ["単なるアップロードではなく、納得できるレビュー", "すべてのプラットフォームで自然なレビュー・コンテンツが検索されなければなりません。"],
      ["統合で任せるべき理由", "本は著者個人のイメージ・専門性に直結します。最初から一緒に企画し、理解度の高い Dream With Ess に統合で。"],
      ["一生残るイメージ", "金額よりも、最初からきちんと作ることが大切です。"],
    ],
    quote: ["「単なるマーケティング代行ではなく、個人を専門家としてブランディングし、", "本を最初から一緒に企画する統合パートナー。」"],
    summary: "📦 統合パーソナルブランディング・マーケティングパッケージ — 全項目を見る",
    secs: [
      {
        h: "1. 著者インタビュー映像コンテンツの制作・配信",
        groups: [
          { sub: "インタビュー制作", items: ["プロの司会者によるインタビュー撮影", "10分以内の編集映像1本 + ショート2本 + フルバージョン"] },
          {
            sub: "大型チャンネル・マルチ配信",
            items: [
              "月間1,000万再生以上の提携YouTubeチャンネルにアップロード",
              "YouTube・TikTok・Instagram・Facebook・Naver TV・Threadsに同時配信",
              "動画内/概要欄に書籍購入リンクを挿入 · 1日2〜3本を継続アップロード",
            ],
          },
        ],
      },
      {
        h: "2. ブログマーケティングと検索露出",
        groups: [{ items: ["ブログ記事10件の制作・配信", "著者名・専門分野・書籍キーワードのSEO検索露出", "専門性・経験・事例を中心としたレビュー型コンテンツの運営"] }],
      },
      {
        h: "3. SNSコンテンツ制作",
        groups: [{ items: ["Instagramカードニュース10枚1セット", "インフルエンサーによるレビュー型コンテンツ", "YouTube長尺1本 + ショート2本(別途撮影) · MC単独インタビュー"] }],
      },
      {
        h: "4. メディア広報(PR)",
        groups: [{ items: ["メディア記事2件以上の配信 · ポータル検索ブランディング", "著者紹介/専門分野インタビュー/出版記事で信頼度を確保"] }],
      },
      {
        h: "5. レビューおよびバイラルマーケティング",
        groups: [{ items: ["レビュー団の募集・運営", "ブログ・コミュニティ・SNSのレビューに基づくバイラル", "読者・体験・専門性レビューなど多様なコンテンツを生成"] }],
      },
      {
        h: "6. ウェブトゥーン型コンテンツ制作",
        groups: [{ items: ["10コマ以上のウェブトゥーン型コンテンツ — 本の内容をストーリーテリングで伝達"] }],
      },
      {
        h: "7. 講演・クラス・コンサルティング連携戦略",
        groups: [{ items: ["講演・クラスの商品化 / コンサルティング商品への連携戦略を設計", "書籍販売後の追加収益モデルを構築"] }],
      },
      {
        h: "8. パーソナルブランディング・ロードマップの提供",
        groups: [{ items: ["著者ポジショニング・専門家ブランド・検索/SNSブランディングの方向性を設定", "講演・クラス・コンサルティング・専門家活動につながる長期成長ロードマップ"] }],
      },
    ],
    extra: ["追加で対応可能(別途費用)", "大型書店広告 · 地下鉄広告 · オフライン販促物の制作/運営"],
    effectTitle: "期待効果",
    effects: ["書籍の認知度 ↑", "著者ブランドの構築", "検索露出の拡大", "SNS影響力 ↑", "メディア露出の確保", "レビュー・バイラルの拡散", "講演・クラスの機会", "コンサルティング・事業拡大"],
  },
};

// ─────────────────────────────────────────────────────────────
// 3) 언어별 페이지(/en · /zh · /ja)의 검색엔진용 제목 · 설명
//    금액 · 기간은 한국어 페이지에 공개된 숫자만 쓴다.
// ─────────────────────────────────────────────────────────────
export type PageLang = "en" | "zh" | "ja";

export const LANG_PAGE_META: Record<
  PageLang,
  { title: string; description: string; keywords: string[]; ogLocale: string; hreflang: string; siteName: string }
> = {
  en: {
    title: "Book Publishing in Korea — Memoir · Self-Publishing · Personal Branding | Dream With Ess",
    description:
      "Dream With Ess is a Korean publisher for memoirs, self-funded books and expert branding books. Interview-based writing (no manuscript needed), nationwide bookstore distribution in Korea, e-book registration, 45% print royalty, and marketing through to speaking events. Packages from ₩6M to ₩20M (KRW).",
    keywords: ["book publishing in Korea", "publish a book in Korea", "Korean publisher", "memoir ghostwriting", "self-publishing Korea", "personal branding book", "Dream With Ess"],
    ogLocale: "en_US",
    hreflang: "en",
    siteName: "Dream With Ess Publishing",
  },
  zh: {
    title: "韩国图书出版 · 自传 · 自费出版 · 个人品牌 | Dream With Ess 出版社",
    description:
      "Dream With Ess 是韩国的出版社，提供自传、自费出版与专业人士品牌图书服务。以访谈为基础写作(无需原稿)、韩国全国书店流通、电子书登记、纸质书版税45%，并衔接营销与演讲活动。套餐600万~2000万韩元。",
    keywords: ["韩国出版社", "韩国出书", "自传代笔", "自费出版", "个人品牌图书", "Dream With Ess"],
    ogLocale: "zh_CN",
    hreflang: "zh-Hans",
    siteName: "Dream With Ess 出版社",
  },
  ja: {
    title: "韓国での書籍出版 · 自伝 · 自費出版 · パーソナルブランディング | Dream With Ess 出版社",
    description:
      "Dream With Ess は韓国の出版社です。自伝・自費出版・専門家ブランディング書籍に対応。インタビュー基盤の執筆(原稿不要)、韓国全国書店流通、電子書籍登録、紙書籍の印税45%、マーケティングから講演会まで。パッケージは600万〜2,000万ウォン。",
    keywords: ["韓国 出版社", "韓国 自費出版", "自伝 代筆", "パーソナルブランディング 書籍", "Dream With Ess"],
    ogLocale: "ja_JP",
    hreflang: "ja",
    siteName: "Dream With Ess 出版社",
  },
};

/** hreflang 묶음 — 한국어 소개(/about)와 세 언어 페이지가 서로를 가리킨다 */
export function langAlternates(siteUrl: string): Record<string, string> {
  return {
    ko: `${siteUrl}/about`,
    en: `${siteUrl}/en`,
    "zh-Hans": `${siteUrl}/zh`,
    ja: `${siteUrl}/ja`,
    "x-default": `${siteUrl}/about`,
  };
}
