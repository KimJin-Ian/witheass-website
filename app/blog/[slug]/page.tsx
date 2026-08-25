import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import { getPostBySlug, getPublishedPosts } from "@/lib/content";
import SiteHeader from "../../components/SiteHeader";
import BlogViewTracker from "../../components/BlogViewTracker";
import { faqJsonLd } from "@/lib/faq-schema";

const SITE_URL = "https://www.bookpublishingwithess.com";
const KAKAO_URL = "http://pf.kakao.com/_QkZhd";

export const revalidate = 60;

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug(params.slug, "ko");
  if (!post) {
    return { title: "글을 찾을 수 없습니다", robots: { index: false } };
  }

  const title = post.meta_title || post.title;
  const description = post.meta_description || post.excerpt || "";
  const url = `${SITE_URL}/blog/${post.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      publishedTime: post.published_at || undefined,
      modifiedTime: post.updated_at || undefined,
      authors: post.author_name ? [post.author_name] : ["드림위드에스 출판사"],
      images: post.cover_image_url
        ? [{ url: post.cover_image_url, alt: post.title }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: post.cover_image_url ? [post.cover_image_url] : undefined,
    },
  };
}

// 정적 경로 생성 (빌드 시 발행된 글 미리 생성)
export async function generateStaticParams() {
  try {
    const posts = await getPublishedPosts("ko", 100);
    return posts.map((p: any) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getPostBySlug(params.slug, "ko");
  if (!post) notFound();

  // 다른 글 (현재 글 제외, 최대 3개)
  const allPosts = await getPublishedPosts("ko", 10);
  const otherPosts = allPosts
    .filter((p: any) => p.id !== post.id)
    .slice(0, 3);

  const url = `${SITE_URL}/blog/${post.slug}`;
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.cover_image_url || `${SITE_URL}/og-image.png`,
    datePublished: post.published_at,
    dateModified: post.updated_at,
    // 저자를 Organization 이 아니라 Person 으로 밝힌다.
    // 2026년 3월 코어 업데이트 이후 "누가 직접 겪고 썼는가"의 비중이 크게 올랐다.
    // 회사 이름만 적힌 글과 사람 이름·경력이 붙은 글은 다르게 평가된다.
    author: {
      "@type": "Person",
      name: "이서진",
      jobTitle: "드림위드에스 출판사 대표",
      description: "출판사 운영 10년, 누적 890권 이상 출간",
      url: `${SITE_URL}/team`,
      worksFor: {
        "@type": "Organization",
        name: "드림위드에스 출판사",
        url: SITE_URL,
      },
    },
    publisher: {
      "@type": "Organization",
      name: "드림위드에스 출판사",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    keywords: post.tags?.join(", ") || "",
  };

  // FAQPage — 본문의 "자주 묻는 질문"을 질문-답 쌍으로 내보낸다.
  // 구글이 2026년 5월 FAQ 리치결과는 없앴지만, AI 검색은 이 스키마를 그대로 읽어
  // 답변에 인용한다. 글에 FAQ가 없으면 null 이라 아무것도 나가지 않는다.
  const faqLd = faqJsonLd(post.body || "");

  // BreadcrumbList — 검색 결과에 빵부스러기(/홈 > 블로그 > 글 제목) 표시
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "홈", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "블로그", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  return (
    <>
      {/* 조회수 +1 (클라이언트, 세션당 1회) */}
      <BlogViewTracker slug={post.slug} />

      <Script
        id="breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Script
        id="article-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {faqLd && (
        <Script
          id="faq-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      )}

      <SiteHeader />

      <main className="blog-page blog-post" id="main-content">
        <article className="blog-article">
          <div className="container container-narrow">
            {/* 헤더 */}
            <div className="blog-post-header">
              <Link href="/blog" className="blog-back-link">
                ← 블로그 목록
              </Link>
              {post.tags && post.tags.length > 0 && (
                <div className="blog-card-tags" style={{ marginBottom: 16 }}>
                  {post.tags.map((tag: string) => (
                    <span key={tag} className="blog-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <h1 className="blog-article-title">{post.title}</h1>
              {post.excerpt && (
                <p className="blog-article-excerpt">{post.excerpt}</p>
              )}
              <div className="blog-article-meta">
                <span>
                  {post.published_at
                    ? new Date(post.published_at).toLocaleDateString("ko-KR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : ""}
                </span>
                {post.reading_time > 0 && (
                  <span>· 약 {post.reading_time}분 읽기</span>
                )}
                {post.author_name && <span>· {post.author_name}</span>}
              </div>
            </div>

            {/* 커버 이미지 */}
            {post.cover_image_url && (
              <div className="blog-cover">
                <img
                  src={post.cover_image_url}
                  alt={post.cover_image_alt || post.title}
                  loading="eager"
                />
              </div>
            )}

            {/* 본문 (HTML) */}
            <div
              className="blog-article-body"
              dangerouslySetInnerHTML={{ __html: post.body }}
            />

            {/* CTA */}
            <div className="blog-cta">
              <h3>출판 상담이 필요하신가요?</h3>
              <p>드림위드에스 출판사는 누적 890권+ 출간 경험을 가지고 있습니다.</p>
              <a
                href={KAKAO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-btn gold"
                data-track="cta_click"
                data-category="contact"
                data-label="blog_kakao"
              >
                💬 카카오톡 상담
              </a>
            </div>
          </div>
        </article>

        {/* 다른 글 */}
        {otherPosts.length > 0 && (
          <section className="blog-list-section blog-related">
            <div className="container">
              <h2 className="blog-related-title">다른 글 보기</h2>
              <div className="blog-grid">
                {otherPosts.map((p: any) => (
                  <Link
                    key={p.id}
                    href={`/blog/${p.slug}`}
                    className="blog-card"
                  >
                    {p.cover_image_url ? (
                      <div className="blog-card-img">
                        <img
                          src={p.cover_image_url}
                          alt={p.title}
                          loading="lazy"
                        />
                      </div>
                    ) : (
                      <div className="blog-card-img blog-card-img-placeholder">
                        <span>📖</span>
                      </div>
                    )}
                    <div className="blog-card-body">
                      <h3 className="blog-card-title">{p.title}</h3>
                      {p.excerpt && (
                        <p className="blog-card-excerpt">{p.excerpt}</p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
}
