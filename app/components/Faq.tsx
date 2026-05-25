"use client";

import { useState, ReactNode } from "react";
import { useLang } from "./LangContext";

type FaqItem = {
  q: string;
  a: ReactNode;
};

// ─────────────────────────────────────────────────────────────
// KOREAN (base)
// ─────────────────────────────────────────────────────────────
const ITEMS_KO: FaqItem[] = [
  { q: "Q. 1차 원고는 언제까지 받을 수 있나요?",
    a: <p>인터뷰 완료 후 <strong>한 달 전후</strong>로 받으실 수 있습니다.</p> },
  { q: "Q. 1차 원고 수정은 몇 회까지 가능한가요?",
    a: <p><strong>2회까지</strong> 가능합니다. 1차 원고 → 1차 피드백 → 수정본 → 2차 피드백 → 최종 원고로 진행됩니다.</p> },
  { q: "Q. 제 말투·스타일·표현을 그대로 반영해 줄 수 있나요?",
    a: <p>네. 인터뷰 진행 시 요구사항을 모두 말씀해 주시면 그대로 반영합니다. 원하시는 항목을 번호화해서 문서로 주시면 정확도가 높아집니다.</p> },
  { q: "Q. 표지 디자인은 몇 개 시안이 제공되며, 수정은 몇 회 가능한가요?",
    a: <p><strong>2개 시안 제공, 2회 수정</strong> 가능합니다.</p> },
  { q: "Q. 본문에 사진·캡션·표·도표를 넣을 수 있나요?",
    a: <p>네. 모두 삽입 가능합니다. 이미지·자료의 정보는 저자가 직접 정리해 주셔야 합니다.</p> },
  { q: "Q. 2차 원고 단계에서 내용 수정도 가능한가요?",
    a: <p>2차 단계에서는 <strong>오탈자 검토와 의문사항 정리</strong>만 가능합니다. 내용 추가는 1차에서 마무리해 주세요.</p> },
  { q: "Q. 교정·교열은 어디까지 봐주시나요?",
    a: <p>오탈자뿐 아니라 문장 표현·흐름·맞춤법까지 2차 작가가 함께 봅니다.</p> },
  { q: "Q. ISBN과 저작권은 누구 명의로 등록되나요?",
    a: <p>모두 <strong>저자 본인 명의</strong>로 등록됩니다.</p> },
  { q: "Q. 인세 정산은 어떻게 진행되며 몇 %인가요?",
    a: <p>판매 발생 <strong>다음 달 중순~말</strong>에 지급. 종이책 <strong>45%</strong>, 전자책 <strong>20%</strong>.</p> },
  { q: "Q. 매달 판매 현황은 어떻게 확인하나요?",
    a: <p>전용 사이트의 <strong>아이디·비밀번호</strong>를 발급해 드립니다. 매달 판매 부수·정산을 직접 확인 가능합니다.</p> },
  { q: "Q. 출간 후 전자책·2쇄·해외판·강연자료 전환 권리는?",
    a: <p>모두 <strong>저자 본인 소유</strong>입니다.</p> },
  { q: "Q. 유통 기간은 얼마이며, 연장 가능한가요?",
    a: <p>기본 <strong>2년</strong>. 이후 <strong>연 100만원</strong>으로 연장 가능.</p> },
  { q: "Q. 유통·물류 창고 비용은 별도인가요?",
    a: <p>모든 패키지에 <strong>물류 창고비 포함</strong>, <strong>2년 무료 보관</strong>됩니다.</p> },
  { q: "Q. 전자책 제작 + 밀리의서재는 포함인가요?",
    a: <p>네. 올인원 패키지에 <strong>전자책 + 밀리의서재 등록</strong> 포함입니다.</p> },
  { q: "Q. 서점 입고·매대 진열은 어떻게 진행되나요?",
    a: <p>담당 MD 영업으로 부수를 입고시킵니다. 광화문·교보·강남 주요 매장은 출간 직후 1~2달 <strong>신간 매대</strong>에 진열되는 경우가 많습니다.</p> },
  { q: "Q. 초판 후 추가 제작 비용은? (200페이지 기준)",
    a: (
      <ul style={{ marginLeft: 20 }}>
        <li>500권 → 1,000권 변경: <strong>+100만원</strong></li>
        <li>500권 후 추가 500권 재인쇄: <strong>+300만원</strong></li>
        <li>500권 후 추가 1,000권: <strong>+400만원</strong></li>
        <li>초판 2,000부: <strong>+270만원</strong></li>
      </ul>
    ) },
  { q: "Q. 작가가 직접 책을 구매하거나 받고 싶을 때 비용은?",
    a: <p>책 소유권은 저자에게 있으므로 <strong>추가 비용 없이 택배비만</strong> 부담하시면 됩니다.</p> },
  { q: "Q. 출간 후 강연·컨설팅·기고로 어떻게 연결되나요?",
    a: <p>마케팅 대행(300만~2,000만원)과 강연자 추천으로 연결됩니다. 마케팅 활동이 추천 빈도와 강연료에 직접 영향을 줍니다.</p> },
  { q: "Q. 견적서·세부항목 정리본을 받을 수 있나요?",
    a: (
      <>
        <p>세 가지 기본 견적:</p>
        <ul style={{ marginLeft: 20, marginTop: 8 }}>
          <li><strong>600만원</strong>: 저자가 글 작성 + 이메일 교환</li>
          <li><strong>900만원</strong>: 인터뷰 포함 올인원 (200p·500권)</li>
          <li><strong>700만원</strong>: 원고 작성만 (인쇄 없이)</li>
        </ul>
      </>
    ) },
  { q: "Q. 계약서 양식을 미리 볼 수 있나요?",
    a: <p>네. 카톡 또는 이메일로 요청 주시면 표준 계약서를 공유드립니다.</p> },
];

// ─────────────────────────────────────────────────────────────
// ENGLISH
// ─────────────────────────────────────────────────────────────
const ITEMS_EN: FaqItem[] = [
  { q: "Q. When will I receive the first draft?",
    a: <p>About <strong>one month</strong> after interviews are complete.</p> },
  { q: "Q. How many revisions are allowed for the first draft?",
    a: <p>Up to <strong>2 rounds</strong> — 1st draft → 1st feedback → revised → 2nd feedback → final.</p> },
  { q: "Q. Can you reflect my tone, style, and expressions?",
    a: <p>Yes. Tell us all your requirements during the interview and we will reflect them. Number your items in a document for highest accuracy.</p> },
  { q: "Q. How many cover proposals and how many revisions?",
    a: <p><strong>2 proposals, 2 revisions</strong>.</p> },
  { q: "Q. Can photos, captions, tables, and diagrams be included?",
    a: <p>Yes. The author must provide source info for images and data.</p> },
  { q: "Q. Can content be edited at the second draft stage?",
    a: <p>Only <strong>typos and clarifications</strong>. Content additions must be finalized in the first stage.</p> },
  { q: "Q. How far does the editing & proofreading go?",
    a: <p>Typos, phrasing, flow, and grammar — handled by a second writer.</p> },
  { q: "Q. Whose name are the ISBN and copyright registered under?",
    a: <p><strong>The author's name only</strong>.</p> },
  { q: "Q. How are royalties paid and what is the rate?",
    a: <p>Paid <strong>mid to end of the following month</strong>. Paper book <strong>45%</strong>, e-book <strong>20%</strong>.</p> },
  { q: "Q. How do I check monthly sales?",
    a: <p>We provide an <strong>ID and password</strong> to a portal where you can see monthly sales and settlement.</p> },
  { q: "Q. What about e-book, 2nd printing, overseas, and lecture material rights?",
    a: <p>All <strong>owned by the author</strong>.</p> },
  { q: "Q. How long is the distribution period and is extension possible?",
    a: <p>Default <strong>2 years</strong>. Extension at <strong>₩1M per year</strong>.</p> },
  { q: "Q. Are warehouse and logistics fees separate?",
    a: <p>All packages include <strong>warehouse fees</strong> and <strong>2 years of free storage</strong>.</p> },
  { q: "Q. Is e-book production + Millie's Library included?",
    a: <p>Yes. The all-in-one package includes <strong>e-book production + Millie's Library registration</strong>.</p> },
  { q: "Q. How does bookstore stocking and shelf display work?",
    a: <p>We pitch to bookstore MDs and ship stock. Major stores (Kyobo / Yes24 / Gangnam) often feature new releases for the first 1~2 months.</p> },
  { q: "Q. What is the cost for additional printing after the first edition? (200 pages)",
    a: (
      <ul style={{ marginLeft: 20 }}>
        <li>500 → 1,000 copies upfront: <strong>+₩1M</strong></li>
        <li>Reprint 500 after initial 500: <strong>+₩3M</strong></li>
        <li>Reprint 1,000 after initial 500: <strong>+₩4M</strong></li>
        <li>Initial print 2,000: <strong>+₩2.7M</strong></li>
      </ul>
    ) },
  { q: "Q. What's the cost if the author wants to buy or receive copies directly?",
    a: <p>The author owns the books, so only <strong>shipping fees</strong> — no extra cost.</p> },
  { q: "Q. How does it lead to speaking, consulting, or columns after publication?",
    a: <p>Through marketing services (₩3M~₩20M) and speaker referrals. Marketing activity directly affects referral frequency and speaking fees.</p> },
  { q: "Q. Can I get a detailed quote?",
    a: (
      <>
        <p>Three base quotes:</p>
        <ul style={{ marginLeft: 20, marginTop: 8 }}>
          <li><strong>₩6M</strong>: Author writes + email exchange</li>
          <li><strong>₩9M</strong>: Interview-based all-in-one (200p, 500 copies)</li>
          <li><strong>₩7M</strong>: Writing only (no printing)</li>
        </ul>
      </>
    ) },
  { q: "Q. Can I see the contract template in advance?",
    a: <p>Yes. Request via KakaoTalk or email and we'll share the standard contract.</p> },
];

// ─────────────────────────────────────────────────────────────
// CHINESE (Simplified)
// ─────────────────────────────────────────────────────────────
const ITEMS_ZH: FaqItem[] = [
  { q: "Q. 何时能收到一稿?",
    a: <p>访谈完成后<strong>约一个月</strong>左右。</p> },
  { q: "Q. 一稿可以修改几次?",
    a: <p>最多<strong>2次</strong>。一稿 → 反馈 → 修改 → 二次反馈 → 终稿。</p> },
  { q: "Q. 可以反映我的语气·风格·表达吗?",
    a: <p>可以。访谈时告知所有要求,我们将完全反映。编号化文档提交准确度最高。</p> },
  { q: "Q. 封面提供几个方案,可改几次?",
    a: <p><strong>2个方案,2次修改</strong>。</p> },
  { q: "Q. 正文可以放照片·图表·标题吗?",
    a: <p>可以。图像与资料的信息需作者提供。</p> },
  { q: "Q. 二稿阶段可以修改内容吗?",
    a: <p>仅限<strong>错别字校对和疑问整理</strong>。内容增加需在一稿阶段完成。</p> },
  { q: "Q. 校对·校阅范围?",
    a: <p>错别字之外,文句·流畅度·语法也由二次作者一同检查。</p> },
  { q: "Q. ISBN和版权归谁?",
    a: <p>均以<strong>作者本人名义</strong>登记。</p> },
  { q: "Q. 版税如何结算,百分比多少?",
    a: <p>销售发生<strong>次月中旬至月末</strong>支付。纸书<strong>45%</strong>,电子书<strong>20%</strong>。</p> },
  { q: "Q. 如何查看月销售?",
    a: <p>提供专用网站的<strong>账号·密码</strong>。每月销售数·结算可直接查看。</p> },
  { q: "Q. 出版后电子书·二刷·海外版·演讲资料权利如何?",
    a: <p>均<strong>归作者所有</strong>。</p> },
  { q: "Q. 流通期间多久,能续约吗?",
    a: <p>基本<strong>2年</strong>。之后每年<strong>100万韩元</strong>可续。</p> },
  { q: "Q. 仓储费用另算吗?",
    a: <p>所有套餐包含<strong>仓储费</strong>,<strong>2年免费保管</strong>。</p> },
  { q: "Q. 电子书 + Millie's Library 包含吗?",
    a: <p>全套餐包含<strong>电子书制作 + Millie's Library 登记</strong>。</p> },
  { q: "Q. 书店入库·摆台如何?",
    a: <p>对MD营销后入库。主要门店(教保/Yes24/江南)出版后1~2个月常被放在新书架上。</p> },
  { q: "Q. 初版后追加印刷费用?(200页基准)",
    a: (
      <ul style={{ marginLeft: 20 }}>
        <li>500 → 1,000本: <strong>+100万韩元</strong></li>
        <li>初印500后加印500: <strong>+300万韩元</strong></li>
        <li>初印500后加印1,000: <strong>+400万韩元</strong></li>
        <li>初印2,000本: <strong>+270万韩元</strong></li>
      </ul>
    ) },
  { q: "Q. 作者直接购买/领取费用?",
    a: <p>书归作者,<strong>仅快递费</strong>,无额外费用。</p> },
  { q: "Q. 出版后如何连接演讲·咨询·寄稿?",
    a: <p>通过营销代理(300万~2,000万韩元)与讲师推荐。营销活动直接影响推荐频次和讲课费。</p> },
  { q: "Q. 能拿到详细报价吗?",
    a: (
      <>
        <p>三个基本报价:</p>
        <ul style={{ marginLeft: 20, marginTop: 8 }}>
          <li><strong>600万韩元</strong>: 作者写作 + 邮件交流</li>
          <li><strong>900万韩元</strong>: 含访谈的全套(200页·500本)</li>
          <li><strong>700万韩元</strong>: 仅写作(不含印刷)</li>
        </ul>
      </>
    ) },
  { q: "Q. 合同模板可以提前看吗?",
    a: <p>可以。通过KakaoTalk或邮件申请,我们会共享标准合同。</p> },
];

// ─────────────────────────────────────────────────────────────
// JAPANESE
// ─────────────────────────────────────────────────────────────
const ITEMS_JA: FaqItem[] = [
  { q: "Q. 初稿はいつ受け取れますか?",
    a: <p>インタビュー完了後<strong>約1ヶ月前後</strong>でお渡しします。</p> },
  { q: "Q. 初稿の修正は何回まで可能ですか?",
    a: <p><strong>2回まで</strong>可能。初稿 → フィードバック → 修正 → 二次フィードバック → 最終稿。</p> },
  { q: "Q. 私の口調・スタイル・表現を反映できますか?",
    a: <p>はい。インタビュー時にご要望をすべてお伝えください。番号化した文書でいただくと精度が上がります。</p> },
  { q: "Q. 表紙デザインは何案で、修正は何回ですか?",
    a: <p><strong>2案、修正2回</strong>です。</p> },
  { q: "Q. 本文に写真・キャプション・表・図を入れられますか?",
    a: <p>はい。画像・資料の情報は著者からご提供ください。</p> },
  { q: "Q. 二稿段階で内容修正は可能ですか?",
    a: <p><strong>誤字脱字と疑問点の整理</strong>のみ可能です。内容追加は初稿で完了させてください。</p> },
  { q: "Q. 校正・校閲はどこまでですか?",
    a: <p>誤字脱字、文章表現、流れ、文法まで二次作家がチェックします。</p> },
  { q: "Q. ISBNと著作権は誰の名義で登録されますか?",
    a: <p>すべて<strong>著者本人名義</strong>です。</p> },
  { q: "Q. 印税の精算と料率は?",
    a: <p>販売発生<strong>翌月中旬〜月末</strong>に支払い。紙書籍<strong>45%</strong>、電子書籍<strong>20%</strong>。</p> },
  { q: "Q. 毎月の販売状況は?",
    a: <p>専用サイトの<strong>ID・パスワード</strong>を発行。毎月の販売数・精算を直接確認できます。</p> },
  { q: "Q. 出版後の電子書籍・2刷・海外版・講演資料の権利は?",
    a: <p>すべて<strong>著者本人所有</strong>です。</p> },
  { q: "Q. 流通期間と延長は?",
    a: <p>基本<strong>2年</strong>。以降は<strong>年100万ウォン</strong>で延長可能。</p> },
  { q: "Q. 流通・倉庫費用は別ですか?",
    a: <p>すべてのパッケージに<strong>倉庫費用込み</strong>、<strong>2年間無料保管</strong>。</p> },
  { q: "Q. 電子書籍 + Millie's Library は含まれますか?",
    a: <p>はい。オールインワンに<strong>電子書籍制作 + Millie's Library 登録</strong>が含まれます。</p> },
  { q: "Q. 書店入庫・棚展示はどうなりますか?",
    a: <p>MD営業で部数を入庫。光化門・教保・江南の主要店舗は出版直後1〜2ヶ月、新刊コーナーに陳列されることが多いです。</p> },
  { q: "Q. 初版以降の追加印刷費用?(200ページ基準)",
    a: (
      <ul style={{ marginLeft: 20 }}>
        <li>500冊 → 1,000冊: <strong>+100万ウォン</strong></li>
        <li>500冊後に追加500冊: <strong>+300万ウォン</strong></li>
        <li>500冊後に追加1,000冊: <strong>+400万ウォン</strong></li>
        <li>初版2,000冊: <strong>+270万ウォン</strong></li>
      </ul>
    ) },
  { q: "Q. 著者が直接購入する場合の費用は?",
    a: <p>著者が所有しているので<strong>送料のみ</strong>で追加費用なしです。</p> },
  { q: "Q. 出版後の講演・コンサル・寄稿への繋がりは?",
    a: <p>マーケティング代行(300万〜2,000万ウォン)と講演者推薦で繋がります。マーケティング活動が推薦頻度と講演料に直接影響します。</p> },
  { q: "Q. 詳細見積もりをもらえますか?",
    a: (
      <>
        <p>3つの基本見積もり:</p>
        <ul style={{ marginLeft: 20, marginTop: 8 }}>
          <li><strong>600万ウォン</strong>: 著者執筆 + メール交換</li>
          <li><strong>900万ウォン</strong>: インタビュー込みオールインワン(200頁・500冊)</li>
          <li><strong>700万ウォン</strong>: 執筆のみ(印刷なし)</li>
        </ul>
      </>
    ) },
  { q: "Q. 契約書のフォーマットを事前に確認できますか?",
    a: <p>はい。KakaoTalkかメールでお申し付けください、標準契約書をお送りします。</p> },
];

const ITEMS_BY_LANG: Record<string, FaqItem[]> = {
  ko: ITEMS_KO,
  en: ITEMS_EN,
  zh: ITEMS_ZH,
  ja: ITEMS_JA,
};

export default function Faq() {
  const { lang } = useLang();
  const ITEMS = ITEMS_BY_LANG[lang] ?? ITEMS_KO;
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div className="faq-list">
      {ITEMS.map((it, i) => {
        const isOpen = openIdx === i;
        return (
          <div key={i} className={`faq-item ${isOpen ? "open" : ""}`}>
            <button
              className="faq-q"
              onClick={() => setOpenIdx(isOpen ? null : i)}
              aria-expanded={isOpen}
            >
              {it.q}
            </button>
            <div className="faq-a">{it.a}</div>
          </div>
        );
      })}
    </div>
  );
}
