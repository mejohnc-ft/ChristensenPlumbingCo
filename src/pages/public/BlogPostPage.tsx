import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApiClient } from '@/lib/api';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { PageSEO } from '@/lib/seo';
import { SEO_DEFAULTS } from '@/lib/seo';
import { Clock, ArrowLeft, Tag, User, Calendar, Eye } from 'lucide-react';
import type { BlogPost } from '@/types/admin';

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function safeJsonStringify(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026');
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const api = useApiClient();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    let cancelled = false;
    setLoading(true);
    setError(null);

    api
      .get<BlogPost>(`/blog-posts/${slug}`)
      .then((result) => {
        if (!cancelled) {
          setPost(result);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load post.');
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [slug, api]);

  if (loading) {
    return (
      <div className="bg-t-page min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-gold-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-t-text-muted text-sm">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="bg-t-page min-h-screen">
        <section className="py-20">
          <div className="container-editorial text-center">
            <h1 className="font-display text-3xl text-t-text mb-4">Article Not Found</h1>
            <p className="text-t-text-secondary mb-8">
              {error ?? 'The article you are looking for does not exist or has been removed.'}
            </p>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-gold-500 hover:text-gold-400 transition-colors font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Blog</span>
            </Link>
          </div>
        </section>
      </div>
    );
  }

  const canonicalPath = `/blog/${post.slug}`;
  const seoTitle = post.meta_title || post.title;
  const seoDescription = post.meta_description || post.excerpt || '';
  const publishedAt = post.published_at || post.created_at;

  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: seoDescription,
    url: `${SEO_DEFAULTS.siteUrl}${canonicalPath}`,
    datePublished: publishedAt,
    dateModified: post.updated_at,
    author: {
      '@type': 'Person',
      name: post.author_name,
    },
    publisher: {
      '@type': 'Organization',
      name: SEO_DEFAULTS.siteName,
      logo: {
        '@type': 'ImageObject',
        url: SEO_DEFAULTS.logoUrl,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SEO_DEFAULTS.siteUrl}${canonicalPath}`,
    },
    ...(post.featured_image_url ? { image: post.featured_image_url } : {}),
    ...(post.tags?.length ? { keywords: post.tags.join(', ') } : {}),
  };

  return (
    <div className="bg-t-page">
      <PageSEO
        title={seoTitle}
        description={seoDescription}
        path={canonicalPath}
        ogImage={post.featured_image_url}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Blog', url: '/blog' },
          { name: post.title, url: canonicalPath },
        ]}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonStringify(blogPostingSchema) }}
      />

      {/* Article header */}
      <section className="bg-t-page-alt py-14 lg:py-20">
        <div className="container-editorial">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-gold-500 hover:text-gold-400 transition-colors text-sm font-medium mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Blog</span>
          </Link>

          {/* Category badge */}
          {post.category && (
            <div className="mb-4">
              <span className="inline-block text-xs uppercase tracking-[0.15em] font-medium text-gold-600 border border-gold-500/40 px-3 py-1">
                {post.category}
              </span>
            </div>
          )}

          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-t-text tracking-tight mb-6 max-w-3xl">
            {post.title}
          </h1>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-t-text-muted">
            {post.author_name && (
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-gold-500 flex-shrink-0" />
                <span>{post.author_name}</span>
              </div>
            )}
            {publishedAt && (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gold-500 flex-shrink-0" />
                <span>{formatDate(publishedAt)}</span>
              </div>
            )}
            {post.reading_time_minutes != null && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gold-500 flex-shrink-0" />
                <span>{post.reading_time_minutes} min read</span>
              </div>
            )}
            {post.view_count > 0 && (
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-gold-500 flex-shrink-0" />
                <span>{post.view_count.toLocaleString()} views</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Featured image */}
      {post.featured_image_url && (
        <div className="container-editorial py-8">
          <div className="aspect-video overflow-hidden bg-t-page-alt border border-t-card-border">
            <img
              src={post.featured_image_url}
              alt={post.title}
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>
        </div>
      )}

      {/* Article content */}
      <article className="py-10 lg:py-14">
        <div className="container-editorial">
          <div className="max-w-3xl">
            <div
              className="
                prose prose-lg max-w-none
                prose-headings:font-display prose-headings:text-t-text prose-headings:tracking-tight
                prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                prose-p:text-t-text-secondary prose-p:leading-relaxed
                prose-a:text-gold-500 prose-a:no-underline hover:prose-a:text-gold-400 hover:prose-a:underline
                prose-strong:text-t-text prose-strong:font-semibold
                prose-ul:text-t-text-secondary prose-ol:text-t-text-secondary
                prose-li:my-1
                prose-blockquote:border-l-4 prose-blockquote:border-gold-500
                prose-blockquote:text-t-text-muted prose-blockquote:italic prose-blockquote:pl-6
                prose-code:text-gold-600 prose-code:bg-t-page-alt prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
                prose-pre:bg-t-page-alt prose-pre:border prose-pre:border-t-card-border
                prose-img:border prose-img:border-t-card-border prose-img:rounded-none
                prose-hr:border-t-card-border
              "
            >
              <Markdown remarkPlugins={[remarkGfm]}>{post.content}</Markdown>
            </div>
          </div>
        </div>
      </article>

      {/* Tags */}
      {post.tags?.length > 0 && (
        <div className="pb-10 lg:pb-14">
          <div className="container-editorial">
            <div className="max-w-3xl">
              <div className="border-t border-t-card-border pt-8">
                <div className="flex flex-wrap items-center gap-3">
                  <Tag className="w-4 h-4 text-t-text-muted flex-shrink-0" />
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs uppercase tracking-wider text-t-text-muted border border-t-card-border px-3 py-1 hover:border-gold-500/50 hover:text-gold-600 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Back to blog CTA */}
      <section className="py-16 lg:py-20 bg-t-page-alt border-t border-t-card-border">
        <div className="container-editorial text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 bg-gold-500" />
            <span className="text-gold-600 text-sm tracking-[0.2em] uppercase font-medium">
              Continue Reading
            </span>
            <div className="h-px w-12 bg-gold-500" />
          </div>
          <h2 className="font-display text-2xl lg:text-3xl text-t-text mb-4">
            Explore More Articles
          </h2>
          <p className="text-t-text-secondary mb-8 max-w-md mx-auto">
            Plumbing tips, how-to guides, and expert advice from the Christensen Plumbing team.
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 bg-navy-900 text-white px-8 py-4 text-base font-medium hover:bg-navy-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Blog</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
