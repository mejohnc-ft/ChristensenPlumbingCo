import { useState } from 'react';
import { Star, Plus, Edit, Trash2 } from 'lucide-react';
import { useReviews } from '@/hooks/useReviews';
import LoadingState from '@/components/admin/LoadingState';
import ErrorState from '@/components/admin/ErrorState';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import FormModal from '@/components/admin/FormModal';
import type { Review } from '@/types/admin';

interface FormFields {
  author_name: string;
  rating: number;
  content: string;
  service_type: string;
  source: 'manual' | 'google' | 'yelp' | 'angi' | 'facebook' | 'nextdoor';
  is_featured: boolean;
  is_published: boolean;
}

const defaultForm: FormFields = {
  author_name: '',
  rating: 5,
  content: '',
  service_type: '',
  source: 'manual',
  is_featured: false,
  is_published: true,
};

const SOURCE_LABELS: Record<string, string> = {
  google: 'Google',
  yelp: 'Yelp',
  angi: 'Angi',
  facebook: 'Facebook',
  nextdoor: 'Nextdoor',
  manual: 'Manual',
};

const SOURCE_COLORS: Record<string, string> = {
  google: 'bg-blue-100 text-blue-800',
  yelp: 'bg-red-100 text-red-800',
  angi: 'bg-orange-100 text-orange-800',
  facebook: 'bg-indigo-100 text-indigo-800',
  nextdoor: 'bg-green-100 text-green-800',
  manual: 'bg-gray-100 text-gray-700',
};

export default function ReviewsAdminPage() {
  const { reviews, total, loading, error, refresh, create, update, remove } = useReviews();

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [authorName, setAuthorName] = useState('');
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [source, setSource] = useState<FormFields['source']>('manual');
  const [isFeatured, setIsFeatured] = useState(false);
  const [isPublished, setIsPublished] = useState(true);

  const openCreateForm = () => {
    setEditingId(null);
    setAuthorName(defaultForm.author_name);
    setRating(defaultForm.rating);
    setContent(defaultForm.content);
    setServiceType(defaultForm.service_type);
    setSource(defaultForm.source);
    setIsFeatured(defaultForm.is_featured);
    setIsPublished(defaultForm.is_published);
    setShowForm(true);
  };

  const openEditForm = (review: Review) => {
    setEditingId(review.id);
    setAuthorName(review.author_name);
    setRating(review.rating);
    setContent(review.content);
    setServiceType(review.service_type ?? '');
    setSource((review.source as FormFields['source']) ?? 'manual');
    setIsFeatured(review.is_featured ?? false);
    setIsPublished(review.is_published ?? false);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData: Partial<Review> = {
      author_name: authorName,
      rating,
      content,
      service_type: serviceType || undefined,
      source,
      is_featured: isFeatured,
      is_published: isPublished,
    };
    if (editingId) {
      await update(editingId, formData);
    } else {
      await create(formData);
    }
    closeForm();
  };

  const handleDeleteConfirm = async () => {
    if (deleteId) {
      await remove(deleteId);
    }
    setDeleteId(null);
  };

  const renderStars = (value: number) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < value ? 'text-amber-400 fill-current' : 'text-gray-300'}`}
      />
    ));

  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : '—';

  const publishedCount = reviews.filter((r) => r.is_published).length;

  if (loading) {
    return <LoadingState message="Loading reviews..." />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={refresh} />;
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reviews</h1>
          <p className="text-gray-600">Manage customer reviews and testimonials.</p>
        </div>
        <button
          onClick={openCreateForm}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Review</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-2 mb-2">
            <Star className="w-6 h-6 text-amber-400 fill-current" />
            <span className="text-2xl font-bold text-gray-900">{averageRating}</span>
          </div>
          <p className="text-gray-600">Average Rating</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="text-2xl font-bold text-gray-900 mb-2">{total}</div>
          <p className="text-gray-600">Total Reviews</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="text-2xl font-bold text-gray-900 mb-2">{publishedCount}</div>
          <p className="text-gray-600">Published</p>
        </div>
      </div>

      {/* Reviews List */}
      {reviews.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <Star className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No reviews yet</h3>
          <p className="text-gray-600 mb-4">Add your first customer review to get started.</p>
          <button
            onClick={openCreateForm}
            className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Review</span>
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="font-semibold text-gray-900">All Reviews</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {reviews.map((review) => (
              <div key={review.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900">{review.author_name}</h3>
                      <span
                        className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full ${
                          SOURCE_COLORS[review.source] ?? SOURCE_COLORS.manual
                        }`}
                      >
                        {SOURCE_LABELS[review.source] ?? review.source}
                      </span>
                      {review.is_featured && (
                        <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-amber-100 text-amber-800 rounded-full">
                          Featured
                        </span>
                      )}
                      {!review.is_published && (
                        <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
                          Unpublished
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-1 mb-2">
                      {renderStars(review.rating)}
                    </div>
                    <p className="text-gray-600 mb-2 line-clamp-2">"{review.content}"</p>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                      {review.service_type && (
                        <span className="bg-gray-100 px-2 py-1 rounded">{review.service_type}</span>
                      )}
                      <span>
                        {review.review_date
                          ? new Date(review.review_date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })
                          : ''}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4 flex-shrink-0">
                    <button
                      onClick={() => openEditForm(review)}
                      className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                      aria-label="Edit review"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeleteId(review.id)}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                      aria-label="Delete review"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Form Modal */}
      <FormModal
        open={showForm}
        title={editingId ? 'Edit Review' : 'Add Review'}
        onClose={closeForm}
        onSubmit={handleSubmit}
        submitLabel={editingId ? 'Save Changes' : 'Add Review'}
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Author Name
          </label>
          <input
            type="text"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. Sarah Johnson"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Rating (1–5)
          </label>
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(Math.min(5, Math.max(1, Number(e.target.value))))}
            required
            min={1}
            max={5}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Review Content
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={4}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            placeholder="Customer review text..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Service Type
          </label>
          <input
            type="text"
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. Emergency Repair, Drain Cleaning"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Source
          </label>
          <select
            value={source}
            onChange={(e) => setSource(e.target.value as FormFields['source'])}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="manual">Manual</option>
            <option value="google">Google</option>
            <option value="yelp">Yelp</option>
            <option value="angi">Angi</option>
            <option value="facebook">Facebook</option>
            <option value="nextdoor">Nextdoor</option>
          </select>
        </div>

        <div className="flex items-center space-x-6">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Featured</span>
          </label>

          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Published</span>
          </label>
        </div>
      </FormModal>

      {/* Delete Confirm Dialog */}
      <ConfirmDialog
        open={deleteId !== null}
        title="Delete Review"
        message="Are you sure you want to delete this review? This action cannot be undone."
        confirmLabel="Delete"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
