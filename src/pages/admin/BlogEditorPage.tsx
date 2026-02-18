import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApiClient } from '@/lib/api';
import MDEditor from '@uiw/react-md-editor';
import LoadingState from '@/components/admin/LoadingState';
import { Save, ArrowLeft, Eye } from 'lucide-react';
import type { BlogPost, PaginatedResponse } from '@/types/admin';

interface BlogForm {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image_url: string;
  author_name: string;
  category: string;
  tags: string;
  status: 'draft' | 'published' | 'archived';
  meta_title: string;
  meta_description: string;
}

const defaultForm: BlogForm = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  featured_image_url: '',
  author_name: '',
  category: '',
  tags: '',
  status: 'draft',
  meta_title: '',
  meta_description: '',
};

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export default function BlogEditorPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const api = useApiClient();

  const [form, setForm] = useState<BlogForm>(defaultForm);
  const [loading, setLoading] = useState(!!id);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);

  useEffect(() => {
    if (!id) return;

    let cancelled = false;

    async function loadPost() {
      setLoading(true);
      setError(null);
      try {
        const result = await api.get<PaginatedResponse<BlogPost>>(
          '/blog-posts?per_page=100',
        );
        const post = result.data.find((p) => p.id === id);
        if (!post) {
          setError('Post not found.');
          return;
        }
        if (!cancelled) {
          setForm({
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt ?? '',
            content: post.content,
            featured_image_url: post.featured_image_url ?? '',
            author_name: post.author_name,
            category: post.category ?? '',
            tags: post.tags.join(', '),
            status: post.status,
            meta_title: post.meta_title ?? '',
            meta_description: post.meta_description ?? '',
          });
          setSlugManuallyEdited(true);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load post.');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadPost();
    return () => {
      cancelled = true;
    };
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleTitleChange = (value: string) => {
    setForm((f) => ({
      ...f,
      title: value,
      slug: slugManuallyEdited ? f.slug : generateSlug(value),
    }));
  };

  const handleSlugChange = (value: string) => {
    setSlugManuallyEdited(true);
    setForm((f) => ({ ...f, slug: value }));
  };

  const handleSave = async () => {
    if (!form.title.trim() || !form.slug.trim() || !form.content.trim()) {
      setError('Title, slug, and content are required.');
      return;
    }

    setSaving(true);
    setError(null);

    const payload = {
      title: form.title.trim(),
      slug: form.slug.trim(),
      excerpt: form.excerpt.trim() || undefined,
      content: form.content,
      featured_image_url: form.featured_image_url.trim() || undefined,
      author_name: form.author_name.trim(),
      category: form.category.trim() || undefined,
      tags: form.tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      status: form.status,
      meta_title: form.meta_title.trim() || undefined,
      meta_description: form.meta_description.trim() || undefined,
    };

    try {
      if (id) {
        await api.put<BlogPost>(`/blog-posts/${id}`, payload);
      } else {
        await api.post<BlogPost>('/blog-posts', payload);
      }
      navigate('/admin/blog');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save post.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingState message="Loading post..." />;

  const isNew = !id;
  const previewSlug = form.slug || generateSlug(form.title);

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/admin/blog')}
            className="p-2 text-gray-400 hover:text-gray-700 transition-colors rounded-lg hover:bg-gray-100"
            aria-label="Back to blog list"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {isNew ? 'New Post' : 'Edit Post'}
            </h1>
            <p className="text-sm text-gray-500">
              {isNew
                ? 'Create a new blog post.'
                : 'Make changes and save when ready.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!isNew && form.status === 'published' && previewSlug && (
            <a
              href={`/blog/${previewSlug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              <Eye className="w-4 h-4" />
              <span>Preview</span>
            </a>
          )}
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed text-sm font-medium"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Save Post'}</span>
          </button>
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Two-column layout */}
      <div className="flex gap-6 items-start">
        {/* Main column */}
        <div className="flex-1 min-w-0 space-y-5">
          {/* Title */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-base font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Post title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Slug <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400 whitespace-nowrap">/blog/</span>
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) => handleSlugChange(e.target.value)}
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="auto-generated-from-title"
                />
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Auto-generated from title. Edit to customise the URL.
              </p>
            </div>
          </div>

          {/* Markdown Editor */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-5 py-3 border-b border-gray-200 bg-gray-50">
              <span className="text-sm font-medium text-gray-700">
                Content <span className="text-red-500">*</span>
              </span>
            </div>
            <div data-color-mode="light">
              <MDEditor
                value={form.content}
                onChange={(val) => setForm((f) => ({ ...f, content: val ?? '' }))}
                height={500}
                preview="live"
              />
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-72 flex-shrink-0 space-y-5">
          {/* Publish Settings */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 space-y-4">
            <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
              Publish
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                value={form.status}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    status: e.target.value as BlogForm['status'],
                  }))
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Author Name
              </label>
              <input
                type="text"
                value={form.author_name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, author_name: e.target.value }))
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. Mike Christensen"
              />
            </div>
          </div>

          {/* Taxonomy */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 space-y-4">
            <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
              Taxonomy
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <input
                type="text"
                value={form.category}
                onChange={(e) =>
                  setForm((f) => ({ ...f, category: e.target.value }))
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. Tips, Emergency, How-To"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tags
              </label>
              <input
                type="text"
                value={form.tags}
                onChange={(e) =>
                  setForm((f) => ({ ...f, tags: e.target.value }))
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="plumbing, drain, tips"
              />
              <p className="text-xs text-gray-400 mt-1">
                Comma-separated list of tags.
              </p>
            </div>
          </div>

          {/* Excerpt & Image */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 space-y-4">
            <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
              Summary
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Excerpt
              </label>
              <textarea
                rows={3}
                value={form.excerpt}
                onChange={(e) =>
                  setForm((f) => ({ ...f, excerpt: e.target.value }))
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                placeholder="Short summary shown in post listings..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Featured Image URL
              </label>
              <input
                type="url"
                value={form.featured_image_url}
                onChange={(e) =>
                  setForm((f) => ({ ...f, featured_image_url: e.target.value }))
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://..."
              />
              {form.featured_image_url && (
                <img
                  src={form.featured_image_url}
                  alt="Featured preview"
                  className="mt-2 w-full h-24 object-cover rounded-md border border-gray-200"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = 'none';
                  }}
                />
              )}
            </div>
          </div>

          {/* SEO */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 space-y-4">
            <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
              SEO
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Meta Title
              </label>
              <input
                type="text"
                value={form.meta_title}
                onChange={(e) =>
                  setForm((f) => ({ ...f, meta_title: e.target.value }))
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Defaults to post title if blank"
              />
              <p className="text-xs text-gray-400 mt-1">
                {form.meta_title.length}/60 characters
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Meta Description
              </label>
              <textarea
                rows={3}
                value={form.meta_description}
                onChange={(e) =>
                  setForm((f) => ({ ...f, meta_description: e.target.value }))
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                placeholder="Brief description for search results (150-160 chars recommended)"
              />
              <p className="text-xs text-gray-400 mt-1">
                {form.meta_description.length}/160 characters
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
