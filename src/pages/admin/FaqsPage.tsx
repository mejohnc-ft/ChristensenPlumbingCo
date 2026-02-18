import { useState } from 'react';
import { HelpCircle, Plus, Edit, Trash2, GripVertical } from 'lucide-react';
import { useFaqs } from '@/hooks/useFaqs';
import LoadingState from '@/components/admin/LoadingState';
import ErrorState from '@/components/admin/ErrorState';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import FormModal from '@/components/admin/FormModal';

interface FaqForm {
  question: string;
  answer: string;
  category: string;
  display_order: number;
  is_published: boolean;
}

const defaultForm: FaqForm = {
  question: '',
  answer: '',
  category: '',
  display_order: 0,
  is_published: true,
};

export default function FaqsPage() {
  const { faqs, loading, error, refresh, create, update, remove } = useFaqs();

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState<FaqForm>(defaultForm);

  const openCreate = () => {
    setForm(defaultForm);
    setEditingId(null);
    setShowForm(true);
  };

  const openEdit = (faq: (typeof faqs)[number]) => {
    setForm({
      question: faq.question,
      answer: faq.answer,
      category: faq.category,
      display_order: faq.display_order,
      is_published: faq.is_published,
    });
    setEditingId(faq.id);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(defaultForm);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await update(editingId, form);
    } else {
      await create(form);
    }
    closeForm();
  };

  const handleDelete = async () => {
    if (deleteId) {
      await remove(deleteId);
      setDeleteId(null);
    }
  };

  if (loading) return <LoadingState message="Loading FAQs..." />;
  if (error) return <ErrorState message={error} onRetry={refresh} />;

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">FAQs</h1>
          <p className="text-gray-600">
            Manage frequently asked questions for your website.
          </p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add FAQ</span>
        </button>
      </div>

      {/* FAQ List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
          <h2 className="font-semibold text-gray-900">All FAQs</h2>
          <span className="text-sm text-gray-500">
            {faqs.length} {faqs.length === 1 ? 'item' : 'items'}
          </span>
        </div>

        {faqs.length === 0 ? (
          <div className="p-12 text-center">
            <HelpCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No FAQs yet. Add your first one.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {faqs.map((faq) => (
              <div key={faq.id} className="p-4 hover:bg-gray-50 group">
                <div className="flex items-start space-x-4">
                  <div className="cursor-move text-gray-400 group-hover:text-gray-600 mt-1 flex-shrink-0">
                    <GripVertical className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {faq.question}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                          {faq.answer}
                        </p>
                        <div className="flex items-center gap-2 flex-wrap">
                          {faq.category && (
                            <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                              {faq.category}
                            </span>
                          )}
                          <span
                            className={`inline-block text-xs px-2 py-1 rounded font-medium ${
                              faq.is_published
                                ? 'bg-green-100 text-green-700'
                                : 'bg-yellow-100 text-yellow-700'
                            }`}
                          >
                            {faq.is_published ? 'Published' : 'Draft'}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 flex-shrink-0">
                        <button
                          onClick={() => openEdit(faq)}
                          className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                          aria-label="Edit FAQ"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteId(faq.id)}
                          className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                          aria-label="Delete FAQ"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Form Modal */}
      <FormModal
        open={showForm}
        title={editingId ? 'Edit FAQ' : 'Add FAQ'}
        onClose={closeForm}
        onSubmit={handleSubmit}
        submitLabel={editingId ? 'Save Changes' : 'Add FAQ'}
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Question <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={form.question}
            onChange={(e) => setForm((f) => ({ ...f, question: e.target.value }))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="What is your question?"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Answer <span className="text-red-500">*</span>
          </label>
          <textarea
            required
            rows={4}
            value={form.answer}
            onChange={(e) => setForm((f) => ({ ...f, answer: e.target.value }))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
            placeholder="Provide a clear, helpful answer..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <input
            type="text"
            value={form.category}
            onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. General, Billing, Emergency"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Display Order
          </label>
          <input
            type="number"
            min={0}
            value={form.display_order}
            onChange={(e) =>
              setForm((f) => ({ ...f, display_order: Number(e.target.value) }))
            }
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center space-x-3">
          <input
            id="is_published"
            type="checkbox"
            checked={form.is_published}
            onChange={(e) =>
              setForm((f) => ({ ...f, is_published: e.target.checked }))
            }
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="is_published" className="text-sm font-medium text-gray-700">
            Published (visible on website)
          </label>
        </div>
      </FormModal>

      {/* Delete Confirm Dialog */}
      <ConfirmDialog
        open={deleteId !== null}
        title="Delete FAQ"
        message="Are you sure you want to delete this FAQ? This action cannot be undone."
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
