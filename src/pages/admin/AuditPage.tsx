import { useState } from 'react';
import {
  ClipboardList,
  Search,
  Clock,
  User,
  FolderKanban,
  Image,
  Settings as SettingsIcon,
  Star,
} from 'lucide-react';
import { useAuditLog } from '@/hooks/useAuditLog';
import LoadingState from '@/components/admin/LoadingState';
import ErrorState from '@/components/admin/ErrorState';
import type { AuditLogEntry } from '@/types/admin';

const TABLE_OPTIONS = [
  'projects',
  'portfolio_photos',
  'reviews',
  'team_members',
  'faqs',
  'leads',
  'pages',
  'site_settings',
  'blog_posts',
];

function getResourceIcon(tableName: string) {
  switch (tableName) {
    case 'projects':
      return <FolderKanban className="w-4 h-4" />;
    case 'portfolio_photos':
      return <Image className="w-4 h-4" />;
    case 'reviews':
      return <Star className="w-4 h-4" />;
    case 'site_settings':
      return <SettingsIcon className="w-4 h-4" />;
    default:
      return <ClipboardList className="w-4 h-4" />;
  }
}

function getActionBadgeClass(action: AuditLogEntry['action']) {
  switch (action) {
    case 'create':
      return 'text-green-600 bg-green-50';
    case 'update':
      return 'text-blue-600 bg-blue-50';
    case 'delete':
      return 'text-red-600 bg-red-50';
    default:
      return 'text-gray-600 bg-gray-50';
  }
}

function formatTimestamp(iso: string) {
  try {
    return new Date(iso).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  } catch {
    return iso;
  }
}

export default function AuditPage() {
  const [actionFilter, setActionFilter] = useState('');
  const [tableFilter, setTableFilter] = useState('');

  const { entries, total, loading, error, refresh } = useAuditLog({
    action: actionFilter || undefined,
    table_name: tableFilter || undefined,
  });

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Audit Log</h1>
          <p className="text-gray-600">Track all changes and actions in your admin panel.</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search logs..."
                disabled
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          {/* Action filter */}
          <select
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Actions</option>
            <option value="create">Create</option>
            <option value="update">Update</option>
            <option value="delete">Delete</option>
          </select>

          {/* Resource Type filter */}
          <select
            value={tableFilter}
            onChange={(e) => setTableFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Resource Types</option>
            {TABLE_OPTIONS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Content Area */}
      {loading ? (
        <LoadingState message="Loading audit log..." />
      ) : error ? (
        <ErrorState message={error} onRetry={refresh} />
      ) : (
        <>
          {/* Audit Log Table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left px-6 py-3 text-sm font-semibold text-gray-900">
                      Action
                    </th>
                    <th className="text-left px-6 py-3 text-sm font-semibold text-gray-900">
                      Resource
                    </th>
                    <th className="text-left px-6 py-3 text-sm font-semibold text-gray-900">
                      User
                    </th>
                    <th className="text-left px-6 py-3 text-sm font-semibold text-gray-900">
                      Timestamp
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {entries.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center text-sm text-gray-500">
                        No audit log entries found.
                      </td>
                    </tr>
                  ) : (
                    entries.map((entry: AuditLogEntry) => (
                      <tr key={entry.id} className="hover:bg-gray-50">
                        {/* Action badge */}
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded capitalize ${getActionBadgeClass(entry.action)}`}
                          >
                            {entry.action}
                          </span>
                        </td>

                        {/* Resource: table_name + record_id */}
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <span className="text-gray-400">
                              {getResourceIcon(entry.table_name)}
                            </span>
                            <div>
                              <span className="font-medium text-gray-900">
                                {entry.table_name}
                              </span>
                              {entry.record_id && (
                                <span className="ml-1 text-xs text-gray-400">
                                  #{entry.record_id}
                                </span>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* User */}
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <User className="w-4 h-4 text-gray-400 shrink-0" />
                            <span className="text-sm text-gray-600">
                              {entry.user_email ?? entry.user_id ?? 'System'}
                            </span>
                          </div>
                        </td>

                        {/* Timestamp */}
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-1 text-sm text-gray-500">
                            <Clock className="w-4 h-4 shrink-0" />
                            <span>{formatTimestamp(entry.created_at)}</span>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination info */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing {entries.length} of {total} entries
            </p>
          </div>
        </>
      )}
    </div>
  );
}
