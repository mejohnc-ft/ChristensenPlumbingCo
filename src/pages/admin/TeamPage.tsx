import { useState } from 'react';
import { Users, Plus, Edit, Trash2, Mail, Phone } from 'lucide-react';
import { useTeam } from '@/hooks/useTeam';
import LoadingState from '@/components/admin/LoadingState';
import ErrorState from '@/components/admin/ErrorState';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import FormModal from '@/components/admin/FormModal';
import type { TeamMember } from '@/types/admin';

interface FormState {
  name: string;
  role: string;
  bio: string;
  display_order: number;
  is_visible: boolean;
}

const EMPTY_FORM: FormState = {
  name: '',
  role: '',
  bio: '',
  display_order: 0,
  is_visible: true,
};

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('');
}

export default function TeamPage() {
  const { members, loading, error, refresh, create, update, remove } = useTeam();

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);

  function openCreate() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setShowForm(true);
  }

  function openEdit(member: TeamMember) {
    setEditingId(member.id);
    setForm({
      name: member.name,
      role: member.role,
      bio: member.bio ?? '',
      display_order: member.display_order,
      is_visible: member.is_visible,
    });
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditingId(null);
    setForm(EMPTY_FORM);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload: Partial<TeamMember> = {
      name: form.name,
      role: form.role,
      bio: form.bio || undefined,
      display_order: form.display_order,
      is_visible: form.is_visible,
    };
    if (editingId) {
      await update(editingId, payload);
    } else {
      await create(payload);
    }
    closeForm();
  }

  async function handleDelete() {
    if (!deleteId) return;
    await remove(deleteId);
    setDeleteId(null);
  }

  const deletingMember = members.find((m) => m.id === deleteId);

  if (loading) return <LoadingState message="Loading team members..." />;
  if (error) return <ErrorState message={error} onRetry={refresh} />;

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Team</h1>
          <p className="text-gray-600">Manage your team members and staff profiles.</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Team Member</span>
        </button>
      </div>

      {/* Empty State */}
      {members.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No team members yet</h3>
          <p className="text-gray-600 mb-6">Add your first team member to get started.</p>
          <button
            onClick={openCreate}
            className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Team Member</span>
          </button>
        </div>
      )}

      {/* Team Grid */}
      {members.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
            >
              {/* Avatar */}
              <div className="h-32 bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                {member.photo_url ? (
                  <img
                    src={member.photo_url}
                    alt={member.name}
                    className="w-20 h-20 rounded-full object-cover border-2 border-white"
                  />
                ) : (
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-2xl font-bold text-blue-600">
                    {getInitials(member.name)}
                  </div>
                )}
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-semibold text-gray-900 text-lg leading-tight">
                    {member.name}
                  </h3>
                  {!member.is_visible && (
                    <span className="ml-2 shrink-0 inline-block bg-gray-100 text-gray-500 text-xs px-2 py-0.5 rounded">
                      Hidden
                    </span>
                  )}
                </div>
                <p className="text-sm text-blue-600 font-medium mb-3">{member.role}</p>

                {member.bio && (
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">{member.bio}</p>
                )}

                {member.credentials && member.credentials.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {member.credentials.map((cred) => (
                      <span
                        key={cred}
                        className="inline-block bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded"
                      >
                        {cred}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-end space-x-2 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => openEdit(member)}
                    className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                    aria-label={`Edit ${member.name}`}
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeleteId(member.id)}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                    aria-label={`Delete ${member.name}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Form Modal */}
      <FormModal
        open={showForm}
        title={editingId ? 'Edit Team Member' : 'Add Team Member'}
        onClose={closeForm}
        onSubmit={handleSubmit}
        submitLabel={editingId ? 'Save Changes' : 'Add Member'}
      >
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="John Christensen"
          />
        </div>

        {/* Role */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Role <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={form.role}
            onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Owner / Master Plumber"
          />
        </div>

        {/* Bio */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
          <textarea
            rows={4}
            value={form.bio}
            onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            placeholder="Brief description of this team member..."
          />
        </div>

        {/* Display Order */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
          <input
            type="number"
            min={0}
            value={form.display_order}
            onChange={(e) =>
              setForm((f) => ({ ...f, display_order: parseInt(e.target.value, 10) || 0 }))
            }
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-gray-500 mt-1">Lower numbers appear first.</p>
        </div>

        {/* Visibility */}
        <div className="flex items-center space-x-3">
          <input
            id="is_visible"
            type="checkbox"
            checked={form.is_visible}
            onChange={(e) => setForm((f) => ({ ...f, is_visible: e.target.checked }))}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="is_visible" className="text-sm font-medium text-gray-700">
            Visible on public website
          </label>
        </div>
      </FormModal>

      {/* Delete Confirm Dialog */}
      <ConfirmDialog
        open={deleteId !== null}
        title="Delete Team Member"
        message={
          deletingMember
            ? `Are you sure you want to delete ${deletingMember.name}? This action cannot be undone.`
            : 'Are you sure you want to delete this team member? This action cannot be undone.'
        }
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
