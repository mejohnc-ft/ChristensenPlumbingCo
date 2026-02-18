import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight, Tag, Search } from 'lucide-react';
import { PageSEO } from '@/lib/seo';
import { useBlogPosts } from '@/hooks/useBlogPosts';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  featured_image_url?: string;
  author_name: string;
  category?: string;
  tags: string[];
  status: string;
  published_at?: string;
  reading_time_minutes?: number;
  view_count: number;
  created_at: string;
}

const CATEGORIES = [
  'Maintenance Tips',
  'Emergency Advice',
  'Water Heaters',
  'Drain & Sewer',
  'Bathroom & Kitchen',
  'Company News',
];

function formatDate(dateString?: string): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

function SkeletonCard() {
  return (
    <div className="bg-t-card border border-t-card-border animate-pulse">
      <div className="aspect-[16/9] bg-navy-800/20" />
      <div className="p-6 space-y-4">
        <div className="h-4 w-24 bg-t-card-border rounded" />
        <div className="space-y-2">
          <div className="h-6 bg-t-card-border rounded w-full" />
          <div className="h-6 bg-t-card-border rounded w-4/5" />
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-t-card-border rounded w-full" />
          <div className="h-4 bg-t-card-border rounded w-full" />
          <div className="h-4 bg-t-card-border rounded w-3/4" />
        </div>
        <div className="flex items-center gap-4 pt-4 border-t border-t-card-border">
          <div className="h-4 w-28 bg-t-card-border rounded" />
          <div className="h-4 w-20 bg-t-card-border rounded" />
        </div>
      </div>
    </div>
  );
}

function BlogPostCard({ post }: { post: BlogPost }) {
  return (
    <article className="bg-t-card border border-t-card-border hover:border-gold-500/50 transition-all duration-300 group flex flex-col">
      {/* Featured Image */}
      <Link to={`/blog/${post.slug}`} className="block overflow-hidden aspect-[16/9] flex-shrink-0">
        {post.featured_image_url ? (
          <img
            src={post.featured_image_url}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-navy-900 flex items-center justify-center">
            <div className="text-center">
              <div className="h-px w-12 bg-gold-500 mx-auto mb-3" />
              <span className="text-gold-500/60 text-xs uppercase tracking-widest font-medium">
                Christensen Plumbing
              </span>
            </div>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        {/* Category Badge */}
        {post.category && (
          <div className="flex items-center gap-1.5 mb-3">
            <Tag className="w-3.5 h-3.5 text-gold-500" />
            <span className="text-gold-600 text-xs uppercase tracking-wider font-medium">
              {post.category}
            </span>
          </div>
        )}

        {/* Title */}
        <h2 className="font-display text-xl text-t-text tracking-tight mb-3 leading-snug group-hover:text-gold-500 transition-colors">
          <Link to={`/blog/${post.slug}`}>{post.title}</Link>
        </h2>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-t-text-secondary text-sm leading-relaxed line-clamp-3 mb-4 flex-1">
            {post.excerpt}
          </p>
        )}

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-4 border-t border-t-card-border mt-auto">
          <span className="text-t-text-muted text-sm">{post.author_name}</span>
          {post.reading_time_minutes && (
            <span className="flex items-center gap-1 text-t-text-muted text-sm">
              <Clock className="w-3.5 h-3.5" />
              {post.reading_time_minutes} min read
            </span>
          )}
          {post.published_at && (
            <span className="text-t-text-muted text-sm ml-auto">
              {formatDate(post.published_at)}
            </span>
          )}
        </div>

        {/* Read More */}
        <Link
          to={`/blog/${post.slug}`}
          className="inline-flex items-center gap-2 text-gold-500 text-sm font-medium mt-4 hover:text-gold-400 transition-colors group/link"
        >
          Read More
          <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  );
}

export default function BlogPage() {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');

  const { posts, total, loading, error } = useBlogPosts({
    page,
    perPage: 12,
    category: category || undefined,
    search: search || undefined,
  });

  const totalPages = Math.ceil(total / 12);

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSearch(searchInput);
    setPage(1);
  }

  function handleCategorySelect(cat: string) {
    setCategory(cat === category ? '' : cat);
    setPage(1);
  }

  return (
    <div className="bg-t-page">
      <PageSEO
        title="Blog | Christensen Plumbing Co."
        description="Plumbing tips, maintenance advice, and expert insights from the team at Christensen Plumbing Co. Serving San Diego County since 2003."
        path="/blog"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Blog', url: '/blog' },
        ]}
      />

      {/* Hero Section */}
      <section className="bg-navy-900 py-20 lg:py-28">
        <div className="container-editorial">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-12 bg-gold-500" />
              <span className="text-gold-400 text-sm tracking-[0.2em] uppercase font-medium">
                Insights & Advice
              </span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-white tracking-tight mb-6">
              Plumbing <span className="text-gold-400">Insights</span>
            </h1>
            <p className="text-xl text-navy-200 leading-relaxed">
              Expert tips, maintenance advice, and plumbing knowledge from the professionals at Christensen Plumbing. Helping San Diego homeowners stay informed.
            </p>
          </div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="bg-t-page-alt border-b border-t-card-border py-8 sticky top-0 z-10">
        <div className="container-editorial">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            {/* Search */}
            <form onSubmit={handleSearchSubmit} className="flex gap-2 w-full md:w-auto md:max-w-sm">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-t-text-muted pointer-events-none" />
                <input
                  type="search"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search articles..."
                  className="w-full pl-10 pr-4 py-2.5 bg-t-card border border-t-card-border text-t-text placeholder-t-text-muted text-sm focus:outline-none focus:border-gold-500 transition-colors"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2.5 bg-navy-900 text-white text-sm font-medium hover:bg-navy-800 transition-colors flex-shrink-0"
              >
                Search
              </button>
            </form>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleCategorySelect('')}
                className={`px-3 py-1.5 text-xs uppercase tracking-wider font-medium border transition-colors ${
                  category === ''
                    ? 'bg-navy-900 text-white border-navy-900'
                    : 'bg-transparent text-t-text-secondary border-t-card-border hover:border-gold-500 hover:text-gold-500'
                }`}
              >
                All
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategorySelect(cat)}
                  className={`px-3 py-1.5 text-xs uppercase tracking-wider font-medium border transition-colors ${
                    category === cat
                      ? 'bg-navy-900 text-white border-navy-900'
                      : 'bg-transparent text-t-text-secondary border-t-card-border hover:border-gold-500 hover:text-gold-500'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-16 lg:py-24 bg-t-page">
        <div className="container-editorial">
          {/* Active filters display */}
          {(search || category) && (
            <div className="flex items-center gap-3 mb-8 text-sm text-t-text-secondary">
              <span>Showing results</span>
              {category && (
                <span className="flex items-center gap-1 bg-t-card border border-t-card-border px-3 py-1">
                  <Tag className="w-3 h-3 text-gold-500" />
                  {category}
                  <button
                    onClick={() => { setCategory(''); setPage(1); }}
                    className="ml-1.5 text-t-text-muted hover:text-t-text"
                    aria-label="Remove category filter"
                  >
                    &times;
                  </button>
                </span>
              )}
              {search && (
                <span className="flex items-center gap-1 bg-t-card border border-t-card-border px-3 py-1">
                  <Search className="w-3 h-3 text-gold-500" />
                  "{search}"
                  <button
                    onClick={() => { setSearch(''); setSearchInput(''); setPage(1); }}
                    className="ml-1.5 text-t-text-muted hover:text-t-text"
                    aria-label="Clear search"
                  >
                    &times;
                  </button>
                </span>
              )}
              {total > 0 && (
                <span className="ml-auto text-t-text-muted">
                  {total} {total === 1 ? 'article' : 'articles'}
                </span>
              )}
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {Array.from({ length: 6 }, (_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="text-center py-20">
              <p className="text-t-text-secondary text-lg mb-4">
                Unable to load blog posts at this time.
              </p>
              <p className="text-t-text-muted text-sm">{error}</p>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && posts.length === 0 && (
            <div className="text-center py-20">
              <div className="h-px w-12 bg-gold-500 mx-auto mb-8" />
              <h2 className="font-display text-2xl text-t-text mb-3">No posts found</h2>
              <p className="text-t-text-secondary mb-6">
                {search || category
                  ? 'Try adjusting your search or removing the active filter.'
                  : 'Check back soon for plumbing tips and expert advice.'}
              </p>
              {(search || category) && (
                <button
                  onClick={() => {
                    setSearch('');
                    setSearchInput('');
                    setCategory('');
                    setPage(1);
                  }}
                  className="inline-flex items-center gap-2 text-gold-500 font-medium hover:text-gold-400 transition-colors"
                >
                  Clear all filters
                </button>
              )}
            </div>
          )}

          {/* Posts Grid */}
          {!loading && !error && posts.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {posts.map((post) => (
                <BlogPostCard key={post.id} post={post as BlogPost} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {!loading && !error && totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-16">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="inline-flex items-center gap-2 px-6 py-3 bg-t-card border border-t-card-border text-t-text text-sm font-medium hover:border-gold-500 hover:text-gold-500 transition-colors disabled:opacity-40 disabled:pointer-events-none"
              >
                Previous
              </button>

              <span className="text-t-text-muted text-sm">
                Page {page} of {totalPages}
              </span>

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="inline-flex items-center gap-2 px-6 py-3 bg-t-card border border-t-card-border text-t-text text-sm font-medium hover:border-gold-500 hover:text-gold-500 transition-colors disabled:opacity-40 disabled:pointer-events-none"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
