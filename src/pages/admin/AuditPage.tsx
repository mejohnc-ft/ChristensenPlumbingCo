import {
  ClipboardList,
  User,
  Clock,
  Search,
  Download,
  FolderKanban,
  Image,
  Settings,
  LogIn,
} from 'lucide-react';

interface AuditLog {
  id: string;
  action: string;
  user: string;
  resource: string;
  resourceType: 'project' | 'photo' | 'settings' | 'auth' | 'review';
  timestamp: string;
  details: string;
}

export default function AuditPage() {
  const auditLogs: AuditLog[] = [
    {
      id: '1',
      action: 'Created',
      user: 'admin@christensenplumbing.com',
      resource: 'Modern Kitchen Renovation',
      resourceType: 'project',
      timestamp: '2024-01-15 10:30:45 AM',
      details: 'New project created with 0 photos',
    },
    {
      id: '2',
      action: 'Uploaded',
      user: 'admin@christensenplumbing.com',
      resource: 'kitchen-sink.jpg',
      resourceType: 'photo',
      timestamp: '2024-01-15 10:32:12 AM',
      details: 'Photo added to Modern Kitchen Renovation',
    },
    {
      id: '3',
      action: 'Updated',
      user: 'admin@christensenplumbing.com',
      resource: 'Business Information',
      resourceType: 'settings',
      timestamp: '2024-01-15 09:15:00 AM',
      details: 'Updated business phone number',
    },
    {
      id: '4',
      action: 'Login',
      user: 'admin@christensenplumbing.com',
      resource: 'Admin Panel',
      resourceType: 'auth',
      timestamp: '2024-01-15 08:00:00 AM',
      details: 'Successful login from 192.168.1.1',
    },
    {
      id: '5',
      action: 'Deleted',
      user: 'admin@christensenplumbing.com',
      resource: 'old-photo.jpg',
      resourceType: 'photo',
      timestamp: '2024-01-14 04:45:30 PM',
      details: 'Photo removed from Bathroom Remodel',
    },
    {
      id: '6',
      action: 'Created',
      user: 'admin@christensenplumbing.com',
      resource: 'New 5-star review',
      resourceType: 'review',
      timestamp: '2024-01-14 02:30:00 PM',
      details: 'Manual review added for Sarah Johnson',
    },
  ];

  const getResourceIcon = (type: AuditLog['resourceType']) => {
    switch (type) {
      case 'project':
        return <FolderKanban className="w-4 h-4" />;
      case 'photo':
        return <Image className="w-4 h-4" />;
      case 'settings':
        return <Settings className="w-4 h-4" />;
      case 'auth':
        return <LogIn className="w-4 h-4" />;
      case 'review':
        return <ClipboardList className="w-4 h-4" />;
    }
  };

  const getActionColor = (action: string) => {
    switch (action.toLowerCase()) {
      case 'created':
        return 'text-green-600 bg-green-50';
      case 'updated':
        return 'text-blue-600 bg-blue-50';
      case 'deleted':
        return 'text-red-600 bg-red-50';
      case 'uploaded':
        return 'text-purple-600 bg-purple-50';
      case 'login':
        return 'text-gray-600 bg-gray-50';
      case 'logout':
        return 'text-gray-600 bg-gray-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Audit Log</h1>
          <p className="text-gray-600">Track all changes and actions in your admin panel.</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
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
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="">All Actions</option>
            <option value="created">Created</option>
            <option value="updated">Updated</option>
            <option value="deleted">Deleted</option>
            <option value="uploaded">Uploaded</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="">All Types</option>
            <option value="project">Projects</option>
            <option value="photo">Photos</option>
            <option value="settings">Settings</option>
            <option value="auth">Auth</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="">Last 7 days</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="all">All Time</option>
          </select>
        </div>
      </div>

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
                  Details
                </th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-900">
                  Timestamp
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded ${getActionColor(
                        log.action
                      )}`}
                    >
                      {log.action}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-400">
                        {getResourceIcon(log.resourceType)}
                      </span>
                      <span className="font-medium text-gray-900">{log.resource}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{log.user}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-600 max-w-xs">{log.details}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>{log.timestamp}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">Showing 1-6 of 248 entries</p>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 disabled:opacity-50">
            Previous
          </button>
          <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">1</button>
          <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
            2
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
            3
          </button>
          <span className="text-gray-500">...</span>
          <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
            42
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>

      {/* Coming Soon Notice */}
      <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 text-center">
        <ClipboardList className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Advanced Audit Features Coming Soon
        </h3>
        <p className="text-gray-600 max-w-md mx-auto">
          Data retention policies, automated alerts, and detailed change diffs will be
          available soon.
        </p>
      </div>
    </div>
  );
}
