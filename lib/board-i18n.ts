/** 더웰니스앤 게시판 문구 — 7개 언어 (2026-11-19). 없는 말은 영어로 */
import type { Lang } from "./i18n";

const KO = {
  board: "게시판",
  boardSub: "자유롭게 이야기를 나누는 곳이에요. 글은 로그인한 회원만 쓸 수 있어요.",
  write: "글쓰기",
  login: "로그인",
  signup: "회원가입",
  logout: "로그아웃",
  list: "목록",
  title: "제목",
  body: "내용",
  submit: "등록",
  delete: "삭제",
  deleteConfirm: "이 글을 삭제할까요?",
  username: "아이디",
  password: "비밀번호",
  password2: "비밀번호 확인",
  usernameHint: "영문 소문자 · 숫자 · _ 4~20자",
  passwordHint: "8자 이상",
  signupNote: "아이디와 비밀번호만 저장해요. 비밀번호는 암호화해 저장하고, 찾기 기능이 없으니 잊지 않게 적어 두세요.",
  noAccount: "아직 회원이 아니신가요?",
  haveAccount: "이미 회원이신가요?",
  empty: "아직 글이 없어요. 첫 글을 남겨 보세요.",
  author: "작성자",
  date: "날짜",
  notFound: "글을 찾을 수 없어요.",
  needLogin: "글을 쓰려면 로그인해 주세요.",
  hello: "{name}님",
  prev: "이전",
  next: "다음",
  notReady: "게시판을 준비하고 있어요. 잠시 뒤에 다시 와 주세요.",
  err_username: "아이디는 영문 소문자 · 숫자 · _ 4~20자로 정해 주세요.",
  err_reserved: "쓸 수 없는 아이디예요.",
  err_taken: "이미 쓰고 있는 아이디예요.",
  err_password: "비밀번호는 8자 이상으로 정해 주세요.",
  err_password2: "비밀번호 확인이 맞지 않아요.",
  err_login: "아이디 또는 비밀번호가 맞지 않아요.",
  err_locked: "로그인 실패가 많아 10분 동안 잠겼어요. 잠시 뒤에 다시 시도해 주세요.",
  err_title: "제목을 1~100자로 적어 주세요.",
  err_body: "내용을 1~5,000자로 적어 주세요.",
  err_rate: "잠시 뒤에 다시 시도해 주세요.",
  err_server: "문제가 생겼어요. 잠시 뒤에 다시 시도해 주세요.",
};
export type BoardKey = keyof typeof KO;

const EN: Record<BoardKey, string> = {
  board: "Board", boardSub: "A place to share and talk freely. Only signed-in members can post.",
  write: "Write", login: "Sign in", signup: "Sign up", logout: "Sign out", list: "List",
  title: "Title", body: "Content", submit: "Post", delete: "Delete", deleteConfirm: "Delete this post?",
  username: "Username", password: "Password", password2: "Confirm password",
  usernameHint: "4–20 lowercase letters, numbers or _", passwordHint: "At least 8 characters",
  signupNote: "We only store your username and password (encrypted). There is no password recovery, so please keep it safe.",
  noAccount: "Not a member yet?", haveAccount: "Already a member?",
  empty: "No posts yet. Be the first to write one.", author: "Author", date: "Date",
  notFound: "Post not found.", needLogin: "Please sign in to write a post.", hello: "{name}",
  prev: "Prev", next: "Next", notReady: "The board is being prepared. Please come back soon.",
  err_username: "Use 4–20 lowercase letters, numbers or _ for your username.", err_reserved: "This username is not available.",
  err_taken: "This username is already taken.", err_password: "Use at least 8 characters for your password.",
  err_password2: "Passwords do not match.", err_login: "Incorrect username or password.",
  err_locked: "Too many failed attempts. Please try again in 10 minutes.",
  err_title: "Title must be 1–100 characters.", err_body: "Content must be 1–5,000 characters.",
  err_rate: "Please try again in a moment.", err_server: "Something went wrong. Please try again shortly.",
};

const ZH: Partial<Record<BoardKey, string>> = {
  board: "留言板", boardSub: "自由交流的地方。只有登录会员才能发帖。", write: "发帖", login: "登录", signup: "注册", logout: "退出",
  list: "列表", title: "标题", body: "内容", submit: "发布", delete: "删除", deleteConfirm: "要删除这篇帖子吗？",
  username: "用户名", password: "密码", password2: "确认密码", usernameHint: "4–20位小写字母、数字或 _", passwordHint: "至少8位",
  signupNote: "我们只保存用户名和加密后的密码。没有找回密码功能，请妥善保管。", noAccount: "还不是会员？", haveAccount: "已经是会员？",
  empty: "还没有帖子，来发第一篇吧。", author: "作者", date: "日期", notFound: "找不到该帖子。", needLogin: "请登录后发帖。",
  prev: "上一页", next: "下一页", notReady: "留言板准备中，请稍后再来。",
  err_username: "用户名请使用4–20位小写字母、数字或 _。", err_reserved: "该用户名不可使用。", err_taken: "该用户名已被使用。",
  err_password: "密码至少8位。", err_password2: "两次密码不一致。", err_login: "用户名或密码错误。",
  err_locked: "失败次数过多，请10分钟后再试。", err_title: "标题请填写1–100字。", err_body: "内容请填写1–5,000字。",
  err_rate: "请稍后再试。", err_server: "出现问题，请稍后再试。",
};

const JA: Partial<Record<BoardKey, string>> = {
  board: "掲示板", boardSub: "自由に話せる場所です。投稿はログインした会員のみできます。", write: "投稿する", login: "ログイン", signup: "会員登録", logout: "ログアウト",
  list: "一覧", title: "タイトル", body: "本文", submit: "投稿", delete: "削除", deleteConfirm: "この投稿を削除しますか？",
  username: "ID", password: "パスワード", password2: "パスワード（確認）", usernameHint: "半角小文字・数字・_ 4〜20文字", passwordHint: "8文字以上",
  signupNote: "保存するのはIDと暗号化したパスワードだけです。パスワード再設定はできないので、忘れないようにしてください。", noAccount: "まだ会員ではありませんか？", haveAccount: "すでに会員ですか？",
  empty: "まだ投稿がありません。最初の投稿をどうぞ。", author: "投稿者", date: "日付", notFound: "投稿が見つかりません。", needLogin: "投稿するにはログインしてください。",
  prev: "前へ", next: "次へ", notReady: "掲示板を準備中です。しばらくしてからお越しください。",
  err_username: "IDは半角小文字・数字・_ の4〜20文字にしてください。", err_reserved: "このIDは使えません。", err_taken: "このIDはすでに使われています。",
  err_password: "パスワードは8文字以上にしてください。", err_password2: "確認用パスワードが一致しません。", err_login: "IDまたはパスワードが正しくありません。",
  err_locked: "ログイン失敗が多いため10分間ロックされました。", err_title: "タイトルは1〜100文字で入力してください。", err_body: "本文は1〜5,000文字で入力してください。",
  err_rate: "しばらくしてからもう一度お試しください。", err_server: "問題が発生しました。しばらくしてからお試しください。",
};

const TH: Partial<Record<BoardKey, string>> = {
  board: "กระดานสนทนา", boardSub: "พื้นที่พูดคุยอย่างอิสระ เฉพาะสมาชิกที่เข้าสู่ระบบเท่านั้นที่โพสต์ได้", write: "เขียนโพสต์", login: "เข้าสู่ระบบ", signup: "สมัครสมาชิก", logout: "ออกจากระบบ",
  list: "รายการ", title: "หัวข้อ", body: "เนื้อหา", submit: "โพสต์", delete: "ลบ", deleteConfirm: "ต้องการลบโพสต์นี้หรือไม่?",
  username: "ชื่อผู้ใช้", password: "รหัสผ่าน", password2: "ยืนยันรหัสผ่าน", usernameHint: "ตัวพิมพ์เล็ก ตัวเลข หรือ _ 4–20 ตัว", passwordHint: "อย่างน้อย 8 ตัว",
  noAccount: "ยังไม่เป็นสมาชิก?", haveAccount: "เป็นสมาชิกแล้ว?", empty: "ยังไม่มีโพสต์", author: "ผู้เขียน", date: "วันที่",
  notFound: "ไม่พบโพสต์", needLogin: "กรุณาเข้าสู่ระบบเพื่อเขียนโพสต์", prev: "ก่อนหน้า", next: "ถัดไป",
  err_login: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง", err_taken: "ชื่อผู้ใช้นี้ถูกใช้แล้ว", err_password2: "รหัสผ่านไม่ตรงกัน",
};

const VI: Partial<Record<BoardKey, string>> = {
  board: "Diễn đàn", boardSub: "Nơi trò chuyện tự do. Chỉ thành viên đã đăng nhập mới có thể đăng bài.", write: "Viết bài", login: "Đăng nhập", signup: "Đăng ký", logout: "Đăng xuất",
  list: "Danh sách", title: "Tiêu đề", body: "Nội dung", submit: "Đăng", delete: "Xóa", deleteConfirm: "Xóa bài viết này?",
  username: "Tên đăng nhập", password: "Mật khẩu", password2: "Xác nhận mật khẩu", usernameHint: "4–20 chữ thường, số hoặc _", passwordHint: "Ít nhất 8 ký tự",
  noAccount: "Chưa là thành viên?", haveAccount: "Đã là thành viên?", empty: "Chưa có bài viết nào.", author: "Tác giả", date: "Ngày",
  notFound: "Không tìm thấy bài viết.", needLogin: "Vui lòng đăng nhập để viết bài.", prev: "Trước", next: "Sau",
  err_login: "Sai tên đăng nhập hoặc mật khẩu.", err_taken: "Tên đăng nhập đã được sử dụng.", err_password2: "Mật khẩu không khớp.",
};

const ID: Partial<Record<BoardKey, string>> = {
  board: "Forum", boardSub: "Tempat berbagi cerita dengan bebas. Hanya anggota yang masuk yang dapat menulis.", write: "Tulis", login: "Masuk", signup: "Daftar", logout: "Keluar",
  list: "Daftar", title: "Judul", body: "Isi", submit: "Kirim", delete: "Hapus", deleteConfirm: "Hapus tulisan ini?",
  username: "Nama pengguna", password: "Kata sandi", password2: "Konfirmasi kata sandi", usernameHint: "4–20 huruf kecil, angka atau _", passwordHint: "Minimal 8 karakter",
  noAccount: "Belum jadi anggota?", haveAccount: "Sudah jadi anggota?", empty: "Belum ada tulisan.", author: "Penulis", date: "Tanggal",
  notFound: "Tulisan tidak ditemukan.", needLogin: "Silakan masuk untuk menulis.", prev: "Sebelumnya", next: "Berikutnya",
  err_login: "Nama pengguna atau kata sandi salah.", err_taken: "Nama pengguna sudah dipakai.", err_password2: "Kata sandi tidak cocok.",
};

const ALL: Record<string, Partial<Record<BoardKey, string>>> = { ko: KO, en: EN, zh: ZH, ja: JA, th: TH, vi: VI, id: ID };

export function bt(lang: Lang | string, key: BoardKey, vars?: Record<string, string>): string {
  let s = ALL[lang]?.[key] ?? EN[key] ?? KO[key] ?? EN.err_server;
  for (const [k, v] of Object.entries(vars ?? {})) s = s.replace(`{${k}}`, v);
  return s;
}

export function fmtDate(iso: string, lang: string): string {
  const d = new Date(iso);
  const kst = new Date(d.getTime() + 9 * 3600e3);
  const y = kst.getUTCFullYear(), m = String(kst.getUTCMonth() + 1).padStart(2, "0"), day = String(kst.getUTCDate()).padStart(2, "0");
  const today = new Date(Date.now() + 9 * 3600e3).toISOString().slice(0, 10);
  if (`${y}-${m}-${day}` === today) return `${String(kst.getUTCHours()).padStart(2, "0")}:${String(kst.getUTCMinutes()).padStart(2, "0")}`;
  return lang === "ko" ? `${y}.${m}.${day}` : `${y}-${m}-${day}`;
}
