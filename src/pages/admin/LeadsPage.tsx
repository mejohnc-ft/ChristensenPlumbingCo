import {
  MessageSquare,
  Phone,
  Mail,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  Filter,
} from 'lucide-react';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  status: 'new' | 'contacted' | 'scheduled' | 'completed';
  createdAt: string;
}

export default function LeadsPage() {
  const leads: Lead[] = [
    {
      id: '1',
      name: 'Jennifer Martinez',
      email: 'jennifer@email.com',
      phone: '(619) 555-0101',
      service: 'Emergency Repair',
      message: 'Water leak under kitchen sink, need urgent help!',
      status: 'new',
      createdAt: '2024-01-15 10:30 AM',
    },
    {
      id: '2',
      name: 'Robert Kim',
      email: 'robert.kim@email.com',
      phone: '(858) 555-0102',
      service: 'Installation',
      message: 'Looking to install a new water heater in my garage.',
      status: 'contacted',
      createdAt: '2024-01-15 09:15 AM',
    },
    {
      id: '3',
      name: 'Amanda Foster',
      email: 'amanda.f@email.com',
      phone: '(760) 555-0103',
      service: 'Maintenance',
      message: 'Annual plumbing inspection for my rental property.',
      status: 'scheduled',
      createdAt: '2024-01-14 03:45 PM',
    },
    {
      id: '4',
      name: 'David Chen',
      email: 'd.chen@email.com',
      phone: '(619) 555-0104',
      service: 'Other',
      message: 'Need a quote for bathroom remodel plumbing.',
      status: 'completed',
      createdAt: '2024-01-14 11:00 AM',
    },
  ];

  const getStatusIcon = (status: Lead['status']) => {
    switch (status) {
      case 'new':
        return <AlertCircle className="w-4 h-4 text-blue-500" />;
      case 'contacted':
        return <Phone className="w-4 h-4 text-yellow-500" />;
      case 'scheduled':
        return <Calendar className="w-4 h-4 text-purple-500" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
    }
  };

  const getStatusBadge = (status: Lead['status']) => {
    const styles = {
      new: 'bg-blue-100 text-blue-800',
      contacted: 'bg-yellow-100 text-yellow-800',
      scheduled: 'bg-purple-100 text-purple-800',
      completed: 'bg-green-100 text-green-800',
    };

    return (
      <span
        className={`inline-flex items-center space-x-1 px-2 py-1 text-xs font-medium rounded-full ${styles[status]}`}
      >
        {getStatusIcon(status)}
        <span className="capitalize">{status}</span>
      </span>
    );
  };

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
        <button className="flex items-center space-x-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
          <Filter className="w-4 h-4" />
          <span>Filter</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center space-x-2 text-blue-600 mb-2">
            <AlertCircle className="w-5 h-5" />
            <span className="font-semibold">New</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">8</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center space-x-2 text-yellow-600 mb-2">
            <Phone className="w-5 h-5" />
            <span className="font-semibold">Contacted</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">5</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center space-x-2 text-purple-600 mb-2">
            <Calendar className="w-5 h-5" />
            <span className="font-semibold">Scheduled</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">3</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center space-x-2 text-green-600 mb-2">
            <CheckCircle className="w-5 h-5" />
            <span className="font-semibold">Completed</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">42</p>
        </div>
      </div>

      {/* Leads List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
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
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50 cursor-pointer">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">{lead.name}</p>
                      <div className="flex items-center space-x-3 text-sm text-gray-500 mt-1">
                        <span className="flex items-center space-x-1">
                          <Mail className="w-3 h-3" />
                          <span>{lead.email}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Phone className="w-3 h-3" />
                          <span>{lead.phone}</span>
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-gray-100 text-gray-700 text-sm px-2 py-1 rounded">
                      {lead.service}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-600 max-w-xs truncate">
                      {lead.message}
                    </p>
                  </td>
                  <td className="px-6 py-4">{getStatusBadge(lead.status)}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>{lead.createdAt}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Coming Soon Notice */}
      <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 text-center">
        <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Lead Management Coming Soon
        </h3>
        <p className="text-gray-600 max-w-md mx-auto">
          Email notifications, automated follow-ups, and CRM integration will be
          available soon.
        </p>
      </div>
    </div>
  );
}
