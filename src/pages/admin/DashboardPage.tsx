import {
  FolderKanban,
  Image,
  Star,
  Users,
  MessageSquare,
  TrendingUp,
  Clock,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDashboardStats } from '@/hooks/useDashboardStats';
import { useAuditLog } from '@/hooks/useAuditLog';
import LoadingState from '@/components/admin/LoadingState';
import ErrorState from '@/components/admin/ErrorState';

export default function DashboardPage() {
  const {
    stats,
    loading: statsLoading,
    error: statsError,
    refresh: refreshStats,
  } = useDashboardStats();

  const {
    entries,
    loading: auditLoading,
    error: auditError,
    refresh: refreshAudit,
  } = useAuditLog({ limit: 5 });

  if (statsLoading) {
    return <LoadingState message="Loading dashboard..." />;
  }

  if (statsError) {
    return <ErrorState message={statsError} onRetry={refreshStats} />;
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">
          Welcome to the Christensen Plumbing Co. admin dashboard.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Projects */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
              <FolderKanban className="w-6 h-6" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">
            {stats?.total_projects ?? 0}
          </h3>
          <p className="text-sm text-gray-600">Total Projects</p>
        </div>

        {/* Photos Uploaded */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
              <Image className="w-6 h-6" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">
            {stats?.total_photos ?? 0}
          </h3>
          <p className="text-sm text-gray-600">Photos Uploaded</p>
        </div>

        {/* Reviews */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
              <Star className="w-6 h-6" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">
            {stats?.average_rating ?? 0}
          </h3>
          <p className="text-sm text-gray-600">Reviews</p>
          <p className="text-xs text-gray-500 mt-1">
            {stats?.total_reviews ?? 0} total reviews
          </p>
        </div>

        {/* New Leads */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
              <MessageSquare className="w-6 h-6" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">
            {stats?.new_leads ?? 0}
          </h3>
          <p className="text-sm text-gray-600">New Leads</p>
        </div>
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>

          {auditLoading && <LoadingState message="Loading activity..." />}

          {auditError && (
            <ErrorState message={auditError} onRetry={refreshAudit} />
          )}

          {!auditLoading && !auditError && (
            <div className="space-y-4">
              {entries.length === 0 ? (
                <p className="text-sm text-gray-500">No recent activity.</p>
              ) : (
                entries.map((entry) => (
                  <div
                    key={entry.id}
                    className="flex items-start space-x-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0"
                  >
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <Clock className="w-4 h-4 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-900">
                        {entry.action} on {entry.table_name}
                      </p>
                      <p className="text-xs text-gray-500">{entry.user_email}</p>
                      <p className="text-xs text-gray-400">
                        {new Date(entry.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link
              to="/admin/projects"
              className="flex items-center space-x-2 p-4 bg-blue-50 rounded-lg text-blue-700 hover:bg-blue-100 transition-colors"
            >
              <FolderKanban className="w-5 h-5" />
              <span className="font-medium">New Project</span>
            </Link>
            <Link
              to="/admin/photos"
              className="flex items-center space-x-2 p-4 bg-green-50 rounded-lg text-green-700 hover:bg-green-100 transition-colors"
            >
              <Image className="w-5 h-5" />
              <span className="font-medium">Upload Photos</span>
            </Link>
            <Link
              to="/admin/team"
              className="flex items-center space-x-2 p-4 bg-purple-50 rounded-lg text-purple-700 hover:bg-purple-100 transition-colors"
            >
              <Users className="w-5 h-5" />
              <span className="font-medium">Add Team Member</span>
            </Link>
            <Link
              to="/admin/leads"
              className="flex items-center space-x-2 p-4 bg-amber-50 rounded-lg text-amber-700 hover:bg-amber-100 transition-colors"
            >
              <MessageSquare className="w-5 h-5" />
              <span className="font-medium">View Leads</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
