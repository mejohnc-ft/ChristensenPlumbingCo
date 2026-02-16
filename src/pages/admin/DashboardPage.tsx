import {
  LayoutDashboard,
  FolderKanban,
  Image,
  Star,
  Users,
  MessageSquare,
  TrendingUp,
  Clock,
} from 'lucide-react';

interface StatCard {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  trend: 'up' | 'down' | 'neutral';
}

export default function DashboardPage() {
  const stats: StatCard[] = [
    {
      title: 'Total Projects',
      value: '24',
      change: '+3 this month',
      icon: <FolderKanban className="w-6 h-6" />,
      trend: 'up',
    },
    {
      title: 'Photos Uploaded',
      value: '156',
      change: '+12 this week',
      icon: <Image className="w-6 h-6" />,
      trend: 'up',
    },
    {
      title: 'Reviews',
      value: '4.9',
      change: '89 total reviews',
      icon: <Star className="w-6 h-6" />,
      trend: 'neutral',
    },
    {
      title: 'New Leads',
      value: '18',
      change: '+5 from yesterday',
      icon: <MessageSquare className="w-6 h-6" />,
      trend: 'up',
    },
  ];

  const recentActivity = [
    { action: 'New lead submitted', time: '2 minutes ago', type: 'lead' },
    { action: 'Photo uploaded to Kitchen Renovation project', time: '1 hour ago', type: 'photo' },
    { action: 'New 5-star review received', time: '3 hours ago', type: 'review' },
    { action: 'Project "Bathroom Remodel" created', time: '1 day ago', type: 'project' },
    { action: 'Team member profile updated', time: '2 days ago', type: 'team' },
  ];

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
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-50 rounded-lg text-blue-600">{stat.icon}</div>
              {stat.trend === 'up' && (
                <TrendingUp className="w-5 h-5 text-green-500" />
              )}
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
            <p className="text-sm text-gray-600">{stat.title}</p>
            <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((item, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0"
              >
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Clock className="w-4 h-4 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-900">{item.action}</p>
                  <p className="text-xs text-gray-500">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center space-x-2 p-4 bg-blue-50 rounded-lg text-blue-700 hover:bg-blue-100 transition-colors">
              <FolderKanban className="w-5 h-5" />
              <span className="font-medium">New Project</span>
            </button>
            <button className="flex items-center space-x-2 p-4 bg-green-50 rounded-lg text-green-700 hover:bg-green-100 transition-colors">
              <Image className="w-5 h-5" />
              <span className="font-medium">Upload Photos</span>
            </button>
            <button className="flex items-center space-x-2 p-4 bg-purple-50 rounded-lg text-purple-700 hover:bg-purple-100 transition-colors">
              <Users className="w-5 h-5" />
              <span className="font-medium">Add Team Member</span>
            </button>
            <button className="flex items-center space-x-2 p-4 bg-amber-50 rounded-lg text-amber-700 hover:bg-amber-100 transition-colors">
              <MessageSquare className="w-5 h-5" />
              <span className="font-medium">View Leads</span>
            </button>
          </div>
        </div>
      </div>

      {/* Coming Soon Notice */}
      <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 text-center">
        <LayoutDashboard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Full Dashboard Coming Soon
        </h3>
        <p className="text-gray-600 max-w-md mx-auto">
          We're working on adding more features to this dashboard including analytics,
          charts, and detailed reporting. Stay tuned!
        </p>
      </div>
    </div>
  );
}
