/**
 * 슬라이드 HTML → PNG 캡처
 *
 * 사용법:
 *   node scripts/capture.mjs                    # assets/_html/*.html 전부 캡처
 *   node scripts/capture.mjs 책-출판사-추천     # 해당 키워드만 캡처
 *
 * 필요:
 *   npm i -D playwright && npx playwright install chromium
 *
 * 규격은 각 HTML의 <body data-w="1200" data-h="675"> 속성에서 읽는다.
 * (image-guide.md: 홈페이지용 16:9 1200×675 / 네이버·인스타 겸용 1:1 1080×1080)
 */
import { chromium } from "playwright";
import { readdir, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const HTML_DIR = path.join(ROOT, "assets", "_html");
const OUT_DIR = path.join(ROOT, "assets");

const filter = process.argv[2] || "";

if (!existsSync(HTML_DIR)) {
  console.error(`✗ ${HTML_DIR} 없음. 슬라이드 HTML을 먼저 만드세요.`);
  process.exit(1);
}

const files = (await readdir(HTML_DIR))
  .filter((f) => f.endsWith(".html"))
  .filter((f) => (filter ? f.includes(filter) : true));

if (files.length === 0) {
  console.error("✗ 캡처할 HTML이 없습니다.");
  process.exit(1);
}

await mkdir(OUT_DIR, { recursive: true });

const browser = await chromium.launch();
let ok = 0;

for (const file of files) {
  const src = path.join(HTML_DIR, file);
  const name = file.replace(/\.html$/, "");
  const out = path.join(OUT_DIR, `${name}.png`);

  const page = await browser.newPage();
  await page.goto("file://" + src.replace(/\\/g, "/"));

  // body의 data-w / data-h 로 규격 결정 (기본 1200×675)
  const dims = await page.evaluate(() => {
    const b = document.body;
    return {
      w: parseInt(b.dataset.w || "1200", 10),
      h: parseInt(b.dataset.h || "675", 10),
    };
  });

  await page.setViewportSize({ width: dims.w, height: dims.h });
  // 폰트·레이아웃 안정화 대기
  await page.evaluate(() => document.fonts?.ready);
  await page.waitForTimeout(150);

  await page.screenshot({ path: out, clip: { x: 0, y: 0, width: dims.w, height: dims.h } });
  await page.close();

  console.log(`  ✓ ${name}.png (${dims.w}×${dims.h})`);
  ok++;
}

await browser.close();
console.log(`\n완료: ${ok}장 캡처 → assets/`);
