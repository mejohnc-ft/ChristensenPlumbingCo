import { useState } from 'react';
import {
  MessageSquare,
  AlertCircle,
  Phone,
  Calendar,
  CheckCircle,
  Trash2,
} from 'lucide-react';
import { useLeads } from '@/hooks/useLeads';
import LoadingState from '@/components/admin/LoadingState';
import ErrorState from '@/components/admin/ErrorState';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import type { Lead } from '@/types/admin';

type LeadStatus = Lead['status'];

const STATUS_OPTIONS: LeadStatus[] = ['new', 'contacted', 'scheduled', 'completed', 'archived'];

const STATUS_STYLES: Record<LeadStatus, string> = {
  new: 'bg-blue-100 text-blue-800',
  contacted: 'bg-yellow-100 text-yellow-800',
  scheduled: 'bg-purple-100 text-purple-800',
  completed: 'bg-green-100 text-green-800',
  archived: 'bg-gray-100 text-gray-600',
};

function getStatusIcon(status: LeadStatus) {
  switch (status) {
    case 'new':
      return <AlertCircle className="w-4 h-4 text-blue-500" />;
    case 'contacted':
      return <Phone className="w-4 h-4 text-yellow-500" />;
    case 'scheduled':
      return <Calendar className="w-4 h-4 text-purple-500" />;
    case 'completed':
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    case 'archived':
      return <MessageSquare className="w-4 h-4 text-gray-400" />;
  }
}

function StatusBadge({ status }: { status: LeadStatus }) {
  return (
    <span
      className={`inline-flex items-center space-x-1 px-2 py-1 text-xs font-medium rounded-full ${STATUS_STYLES[status]}`}
    >
      {getStatusIcon(status)}
      <span className="capitalize">{status}</span>
    </span>
  );
}

export default function LeadsPage() {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);

  const { leads, loading, error, refresh, update, remove } = useLeads(statusFilter);

  const countByStatus = (status: LeadStatus) =>
    leads.filter((l) => l.status === status).length;

  async function handleStatusChange(id: string, newStatus: LeadStatus) {
    await update(id, { status: newStatus });
  }

  async function handleDelete() {
    if (!deleteId) return;
    await remove(deleteId);
    setDeleteId(null);
  }

  const deleteLead = leads.find((l) => l.id === deleteId);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Leads</h1>
          <p className="text-gray-600">
            Manage incoming service requests and customer inquiries.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <label htmlFor="status-filter" className="text-sm text-gray-600 sr-only">
            Filter by status
          </label>
          <select
            id="status-filter"
            value={statusFilter ?? ''}
            onChange={(e) =>
              setStatusFilter(e.target.value === '' ? undefined : e.target.value)
            }
            className="bg-white border border-gray-300 text-gray-700 px-3 py-2 rounded-lg text-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Statuses</option>
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s} className="capitalize">
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid sm:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center space-x-2 text-blue-600 mb-2">
            <AlertCircle className="w-5 h-5" />
            <span className="font-semibold">New</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{countByStatus('new')}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center space-x-2 text-yellow-600 mb-2">
            <Phone className="w-5 h-5" />
            <span className="font-semibold">Contacted</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{countByStatus('contacted')}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center space-x-2 text-purple-600 mb-2">
            <Calendar className="w-5 h-5" />
            <span className="font-semibold">Scheduled</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{countByStatus('scheduled')}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center space-x-2 text-green-600 mb-2">
            <CheckCircle className="w-5 h-5" />
            <span className="font-semibold">Completed</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{countByStatus('completed')}</p>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <LoadingState message="Loading leads..." />
        ) : error ? (
          <ErrorState message={error} onRetry={refresh} />
        ) : leads.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <MessageSquare className="w-12 h-12 text-gray-300 mb-4" />
            <p className="text-gray-500 font-medium">No leads found</p>
            <p className="text-sm text-gray-400 mt-1">
              {statusFilter
                ? `No leads with status "${statusFilter}".`
                : 'Contact form submissions will appear here.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-6 py-3 text-sm font-semibold text-gray-900">
                    Customer
                  </th>
                  <th className="text-left px-6 py-3 text-sm font-semibold text-gray-900">
                    Service
                  </th>
                  <th className="text-left px-6 py-3 text-sm font-semibold text-gray-900">
                    Message
                  </th>
                  <th className="text-left px-6 py-3 text-sm font-semibold text-gray-900">
                    Status
                  </th>
                  <th className="text-left px-6 py-3 text-sm font-semibold text-gray-900">
                    Date
                  </th>
                  <th className="text-left px-6 py-3 text-sm font-semibold text-gray-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50">
                    {/* Customer */}
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{lead.name}</p>
                        <div className="flex flex-col gap-0.5 text-sm text-gray-500 mt-1">
                          <span>{lead.email}</span>
                          {lead.phone && (
                            <span className="flex items-center space-x-1">
                              <Phone className="w-3 h-3" />
                              <span>{lead.phone}</span>
                            </span>
                          )}
                        </div>
                        {lead.is_emergency && (
                          <span className="inline-flex items-center space-x-1 mt-1 px-2 py-0.5 text-xs font-medium bg-red-100 text-red-700 rounded-full">
                            <AlertCircle className="w-3 h-3" />
                            <span>Emergency</span>
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Service */}
                    <td className="px-6 py-4">
                      {lead.service_type ? (
                        <span className="bg-gray-100 text-gray-700 text-sm px-2 py-1 rounded">
                          {lead.service_type}
                        </span>
                      ) : (
                        <span className="text-gray-400 text-sm">—</span>
                      )}
                    </td>

                    {/* Message */}
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-600 max-w-xs truncate">{lead.message}</p>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-2">
                        <StatusBadge status={lead.status} />
                        <select
                          value={lead.status}
                          onChange={(e) =>
                            handleStatusChange(lead.id, e.target.value as LeadStatus)
                          }
                          className="text-xs border border-gray-300 rounded px-2 py-1 bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          aria-label={`Change status for ${lead.name}`}
                        >
                          {STATUS_OPTIONS.map((s) => (
                            <option key={s} value={s} className="capitalize">
                              {s.charAt(0).toUpperCase() + s.slice(1)}
                            </option>
                          ))}
                        </select>
                      </div>
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {new Date(lead.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setDeleteId(lead.id)}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors rounded"
                        aria-label={`Delete lead from ${lead.name}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
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
        title="Delete Lead"
        message={
          deleteLead
            ? `Are you sure you want to delete the lead from ${deleteLead.name}? This action cannot be undone.`
            : 'Are you sure you want to delete this lead? This action cannot be undone.'
        }
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
