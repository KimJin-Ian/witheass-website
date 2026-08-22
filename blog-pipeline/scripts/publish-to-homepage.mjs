/**
 * 홈페이지 발행 — output/[키워드]/ 의 home.html + meta.json 을 Supabase blog_posts 에 넣는다.
 *
 * 사용법:
 *   node scripts/publish-to-homepage.mjs 책-출판사-추천            # SQL 파일 생성
 *   node scripts/publish-to-homepage.mjs 책-출판사-추천 --direct   # Supabase 직접 삽입
 *
 * --direct 는 환경변수가 있을 때만 동작:
 *   NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY (또는 ANON_KEY)
 *
 * 환경변수가 없으면 output/[키워드]/publish.sql 을 만든다.
 * → Supabase 대시보드 > SQL Editor 에 붙여넣고 Run 하면 발행된다.
 *
 * ⚠️ status 는 meta.json 값을 그대로 쓴다. 'published' 로 바꿔야 사이트에 노출된다.
 */
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const keyword = process.argv[2];
const direct = process.argv.includes("--direct");
const publishNow = process.argv.includes("--publish"); // status 를 published 로 강제

if (!keyword) {
  console.error("사용법: node scripts/publish-to-homepage.mjs [키워드] [--direct] [--publish]");
  process.exit(1);
}

const dir = path.join(ROOT, "output", keyword);
const body = await readFile(path.join(dir, "home.html"), "utf-8");
const meta = JSON.parse(await readFile(path.join(dir, "meta.json"), "utf-8"));

if (publishNow) meta.status = "published";

const row = {
  site: meta.site,
  lang: meta.lang,
  slug: meta.slug,
  title: meta.title,
  excerpt: meta.excerpt,
  body,
  meta_title: meta.meta_title,
  meta_description: meta.meta_description,
  cover_image_url: meta.cover_image_url ?? null,
  cover_image_alt: meta.cover_image_alt ?? null,
  tags: meta.tags,
  reading_time: meta.reading_time,
  author_name: meta.author_name,
  status: meta.status,
  published_at: meta.status === "published" ? new Date().toISOString() : null,
};

// ── SQL 이스케이프 ───────────────────────────────
const q = (v) => (v === null || v === undefined ? "NULL" : `'${String(v).replace(/'/g, "''")}'`);
const qArr = (a) => (a?.length ? `ARRAY[${a.map(q).join(", ")}]` : "ARRAY[]::text[]");

const cols = Object.keys(row).filter((k) => k !== "tags");
const vals = cols.map((k) => (typeof row[k] === "number" ? row[k] : q(row[k])));

const sql = `-- ${meta.title}
-- 생성: ${new Date().toISOString()}
-- 실행: Supabase 대시보드 > SQL Editor 에 붙여넣고 Run
-- ⚠️ 이미지가 배포되어 있어야 정상 표시됩니다 (public/blog-images/ git push 필요)

insert into blog_posts (${cols.join(", ")}, tags)
values (${vals.join(", ")}, ${qArr(row.tags)})
on conflict (site, lang, slug) do update set
  title            = excluded.title,
  excerpt          = excluded.excerpt,
  body             = excluded.body,
  meta_title       = excluded.meta_title,
  meta_description = excluded.meta_description,
  cover_image_url  = excluded.cover_image_url,
  cover_image_alt  = excluded.cover_image_alt,
  tags             = excluded.tags,
  reading_time     = excluded.reading_time,
  author_name      = excluded.author_name,
  status           = excluded.status,
  published_at     = coalesce(blog_posts.published_at, excluded.published_at),
  updated_at       = now();

-- 확인
select slug, title, status, published_at from blog_posts
where site = ${q(meta.site)} and slug = ${q(meta.slug)};
`;

if (direct) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    console.error("✗ --direct 사용에는 NEXT_PUBLIC_SUPABASE_URL + KEY 환경변수가 필요합니다.");
    process.exit(1);
  }
  const { createClient } = await import("@supabase/supabase-js");
  const supabase = createClient(url, key);
  const { error } = await supabase
    .from("blog_posts")
    .upsert({ ...row, tags: row.tags }, { onConflict: "site,lang,slug" });
  if (error) {
    console.error("✗ 삽입 실패:", error.message);
    console.error("  → RLS 정책 때문일 수 있습니다. SQL 파일 방식으로 진행하세요.");
    process.exit(1);
  }
  console.log(`✓ 발행 완료: /blog/${meta.slug} (status=${meta.status})`);
} else {
  const out = path.join(dir, "publish.sql");
  await writeFile(out, sql, "utf-8");
  console.log(`✓ SQL 생성: output/${keyword}/publish.sql`);
  console.log(`  slug   : ${meta.slug}`);
  console.log(`  status : ${meta.status}`);
  console.log(`  본문   : ${body.length.toLocaleString()}자`);
  console.log(`\n  → Supabase 대시보드 > SQL Editor 에 붙여넣고 Run 하세요.`);
}
