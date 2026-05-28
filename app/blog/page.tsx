import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { getPublishedPosts } from "@/lib/content";
import SiteHeader from "../components/SiteHeader";

const SITE_URL = "https://www.bookpublishingwithess.com";

export const metadata: Metadata = {
  title: "출판 블로그 · 자서전·자비출판·논문 컨설팅 노하우 | 드림위드에스",
  description:
    "드림위드에스 출판사가 누적 890권 출간 경험으로 공유하는 책 출판 노하우 — 자서전 대필·자비출판·논문 컨설팅·퍼스널 브랜딩·출판기념회·전국 서점 유통·전자책 등록·인세 45% 등 출판 전 과정의 실전 사례와 가이드를 정리한 블로그입니다.",
  keywords: [
    "출판 블로그",
    "자서전 출판",
    "자비출판",
    "책 출판 노하우",
    "논문 컨설팅",
    "베스트셀러 출판",
    "퍼스널 브랜딩",
    "드림위드에스",
  ],
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title: "출판 블로그 · 자서전·자비출판·논문 컨설팅 노하우",
    description:
      "누적 890권+ 출간 경험. 자서전·자비출판·논문 컨설팅·출판기념회·인세 45% — 책 출판 전과정의 실전 노하우를 공유합니다.",
    url: `${SITE_URL}/blog`,
    type: "website",
    locale: "ko_KR",
    siteName: "드림위드에스 출판사",
  },
  twitter: {
    card: "summary_large_image",
    title: "출판 블로그 | 드림위드에스 출판사",
    description:
      "누적 890권+ 출간 경험. 자서전·자비출판·논문 컨설팅 노하우 공유.",
  },
};

// 60초마다 재생성 (ISR)
export const revalidate = 60;

export default async function BlogIndexPage() {
  const posts = await getPublishedPosts("ko", 50);

  // 블로그 목록용 JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "드림위드에스 출판사 블로그",
    url: `${SITE_URL}/blog`,
    blogPost: posts.map((p: any) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: `${SITE_URL}/blog/${p.slug}`,
      datePublished: p.published_at,
      author: { "@type": "Organization", name: "드림위드에스 출판사" },
    })),
  };

  return (
    <>
      <Script
        id="blog-list-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader />

      <main className="blog-page" id="main-content">
        <section className="blog-hero">
          <div className="container">
            <div className="blog-eyebrow">BLOG · 출판 인사이트</div>
            <h1 className="blog-title">
              책 한 권으로<br />
              <em>달라지는 이야기</em>
            </h1>
            <p className="blog-sub">
              출판·자서전·논문 컨설팅 현장의 노하우와 사례
            </p>
          </div>
        </section>

        <section className="blog-list-section">
          <div className="container">
            {posts.length === 0 ? (
              <div className="blog-empty">
                <div className="empty-ico">📝</div>
                <h2>곧 첫 글이 발행됩니다</h2>
                <p>출판 노하우와 사례 글이 준비 중입니다.</p>
                <Link href="/" className="cta-btn outline">
                  메인으로 돌아가기
                </Link>
              </div>
            ) : (
              <div className="blog-grid">
                {posts.map((post: any) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="blog-card no-thumb"
                  >
                    <div className="blog-card-body">
                      {post.tags && post.tags.length > 0 && (
                        <div className="blog-card-tags">
                          {post.tags.slice(0, 3).map((tag: string) => (
                            <span key={tag} className="blog-tag">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      <h3 className="blog-card-title">{post.title}</h3>
                      {post.excerpt && (
                        <p className="blog-card-excerpt">{post.excerpt}</p>
                      )}
                      <div className="blog-card-meta">
                        <span>
                          {post.published_at
                            ? new Date(post.published_at).toLocaleDateString(
                                "ko-KR",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )
                            : ""}
                        </span>
                        {post.reading_time > 0 && (
                          <span>· {post.reading_time}분</span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
