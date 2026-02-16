import { FileText, Edit, Eye, Plus } from 'lucide-react';

interface PageItem {
  id: string;
  title: string;
  slug: string;
  status: 'published' | 'draft';
  lastModified: string;
}

export default function PagesPage() {
  const pages: PageItem[] = [
    {
      id: '1',
      title: 'Home',
      slug: '/',
      status: 'published',
      lastModified: '2024-01-15',
    },
    {
      id: '2',
      title: 'Reviews',
      slug: '/reviews',
      status: 'published',
      lastModified: '2024-01-14',
    },
    {
      id: '3',
      title: 'Portfolio',
      slug: '/portfolio',
      status: 'published',
      lastModified: '2024-01-13',
    },
    {
      id: '4',
      title: 'About',
      slug: '/about',
      status: 'published',
      lastModified: '2024-01-12',
    },
    {
      id: '5',
      title: 'Emergency Services',
      slug: '/emergency',
      status: 'published',
      lastModified: '2024-01-11',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pages</h1>
          <p className="text-gray-600">Manage your website pages and content.</p>
        </div>
        <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" />
          <span>New Page</span>
        </button>
      </div>

      {/* Pages Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-6 py-3 text-sm font-semibold text-gray-900">
                Page Title
              </th>
              <th className="text-left px-6 py-3 text-sm font-semibold text-gray-900">
                URL
              </th>
              <th className="text-left px-6 py-3 text-sm font-semibold text-gray-900">
                Status
              </th>
              <th className="text-left px-6 py-3 text-sm font-semibold text-gray-900">
                Last Modified
              </th>
              <th className="text-right px-6 py-3 text-sm font-semibold text-gray-900">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {pages.map((page) => (
              <tr key={page.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-gray-400" />
                    <span className="font-medium text-gray-900">{page.title}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{page.slug}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      page.status === 'published'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {page.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{page.lastModified}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end space-x-2">
                    <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Coming Soon Notice */}
      <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 text-center">
        <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Page Editor Coming Soon
        </h3>
        <p className="text-gray-600 max-w-md mx-auto">
          A full page editor with drag-and-drop components will be available soon. You'll
          be able to customize all page content directly from this dashboard.
        </p>
      </div>
    </div>
  );
}
