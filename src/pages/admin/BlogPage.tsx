import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Plus, Edit, Trash2, Eye, Clock } from 'lucide-react';
import { useBlogPosts } from '@/hooks/useBlogPosts';
import LoadingState from '@/components/admin/LoadingState';
import ErrorState from '@/components/admin/ErrorState';
import ConfirmDialog from '@/components/admin/ConfirmDialog';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  status: 'draft' | 'published' | 'archived';
  published_at?: string;
  reading_time_minutes?: number;
  category?: string;
  view_count: number;
  created_at: string;
}

type StatusFilter = '' | 'draft' | 'published' | 'archived';

const STATUS_TABS: { label: string; value: StatusFilter }[] = [
  { label: 'All', value: '' },
  { label: 'Draft', value: 'draft' },
  { label: 'Published', value: 'published' },
  { label: 'Archived', value: 'archived' },
];

const STATUS_BADGE: Record<BlogPost['status'], string> = {
  draft: 'bg-yellow-100 text-yellow-800',
  published: 'bg-green-100 text-green-800',
  archived: 'bg-gray-100 text-gray-600',
};

export default function BlogPage() {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('');

  const { posts, loading, error, refresh, remove } = useBlogPosts({
    status: statusFilter || undefined,
  });

  async function handleDeleteConfirm() {
    if (!deleteId) return;
    await remove(deleteId);
    setDeleteId(null);
  }

  const deletePost = (posts as BlogPost[]).find((p) => p.id === deleteId);

  if (loading) return <LoadingState message="Loading blog posts..." />;
  if (error) return <ErrorState message={error} onRetry={refresh} />;

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blog Posts</h1>
          <p className="text-gray-600">Manage published articles and drafts.</p>
        </div>
        <Link
          to="/admin/blog/new"
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New Post</span>
        </Link>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex items-center space-x-1 border-b border-gray-200">
        {STATUS_TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setStatusFilter(tab.value)}
            className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${
              statusFilter === tab.value
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Posts Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {(posts as BlogPost[]).length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <FileText className="w-12 h-12 text-gray-300 mb-4" />
            <p className="text-gray-500 font-medium">No blog posts found</p>
            <p className="text-sm text-gray-400 mt-1">
              {statusFilter
                ? `No ${statusFilter} posts exist yet.`
                : 'Create your first post to get started.'}
            </p>
            <Link
              to="/admin/blog/new"
              className="inline-flex items-center space-x-2 mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              <Plus className="w-4 h-4" />
              <span>New Post</span>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-6 py-3 text-sm font-semibold text-gray-900">
                    Title
                  </th>
                  <th className="text-left px-6 py-3 text-sm font-semibold text-gray-900">
                    Status
                  </th>
                  <th className="text-left px-6 py-3 text-sm font-semibold text-gray-900">
                    Category
                  </th>
                  <th className="text-left px-6 py-3 text-sm font-semibold text-gray-900">
                    Published Date
                  </th>
                  <th className="text-left px-6 py-3 text-sm font-semibold text-gray-900">
                    Views
                  </th>
                  <th className="text-left px-6 py-3 text-sm font-semibold text-gray-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {(posts as BlogPost[]).map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50">
                    {/* Title */}
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900 leading-snug">{post.title}</p>
                        {post.excerpt && (
                          <p className="text-sm text-gray-500 mt-0.5 line-clamp-1 max-w-sm">
                            {post.excerpt}
                          </p>
                        )}
                        {post.reading_time_minutes != null && (
                          <div className="flex items-center space-x-1 mt-1 text-xs text-gray-400">
                            <Clock className="w-3 h-3" />
                            <span>{post.reading_time_minutes} min read</span>
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full capitalize ${
                          STATUS_BADGE[post.status]
                        }`}
                      >
                        {post.status}
                      </span>
                    </td>

                    {/* Category */}
                    <td className="px-6 py-4">
                      {post.category ? (
                        <span className="bg-gray-100 text-gray-700 text-sm px-2 py-1 rounded">
                          {post.category}
                        </span>
                      ) : (
                        <span className="text-gray-400 text-sm">—</span>
                      )}
                    </td>

                    {/* Published Date */}
                    <td className="px-6 py-4">
                      {post.published_at ? (
                        <span className="text-sm text-gray-600">
                          {new Date(post.published_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                      ) : (
                        <span className="text-gray-400 text-sm">—</span>
                      )}
                    </td>

                    {/* Views */}
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">
                        {post.view_count.toLocaleString()}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-1">
                        <Link
                          to={`/admin/blog/${post.id}/edit`}
                          className="p-2 text-gray-400 hover:text-blue-600 transition-colors rounded"
                          aria-label={`Edit "${post.title}"`}
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <a
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-gray-400 hover:text-green-600 transition-colors rounded"
                          aria-label={`View "${post.title}" on site`}
                        >
                          <Eye className="w-4 h-4" />
                        </a>
                        <button
                          onClick={() => setDeleteId(post.id)}
                          className="p-2 text-gray-400 hover:text-red-600 transition-colors rounded"
                          aria-label={`Delete "${post.title}"`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={deleteId !== null}
        title="Delete Blog Post"
        message={
          deletePost
            ? `Are you sure you want to delete "${deletePost.title}"? This action cannot be undone.`
            : 'Are you sure you want to delete this post? This action cannot be undone.'
        }
        confirmLabel="Delete"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
