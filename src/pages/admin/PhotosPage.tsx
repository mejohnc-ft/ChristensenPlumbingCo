import { Image, Upload, Trash2, Grid, List } from 'lucide-react';
import { useState } from 'react';

interface Photo {
  id: string;
  title: string;
  projectName: string;
  category: string;
  uploadedAt: string;
  url: string;
}

export default function PhotosPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const photos: Photo[] = [
    {
      id: '1',
      title: 'Kitchen Sink Installation',
      projectName: 'Modern Kitchen Renovation',
      category: 'Kitchen Plumbing',
      uploadedAt: '2024-01-15',
      url: '',
    },
    {
      id: '2',
      title: 'Bathroom Vanity',
      projectName: 'Bathroom Remodel',
      category: 'Bathroom Work',
      uploadedAt: '2024-01-14',
      url: '',
    },
    {
      id: '3',
      title: 'Pipe Repair Before',
      projectName: 'Emergency Pipe Repair',
      category: 'Emergency Repairs',
      uploadedAt: '2024-01-13',
      url: '',
    },
    {
      id: '4',
      title: 'Water Heater Setup',
      projectName: 'Water Heater Installation',
      category: 'Water Heaters',
      uploadedAt: '2024-01-12',
      url: '',
    },
    {
      id: '5',
      title: 'Shower Installation',
      projectName: 'Bathroom Remodel',
      category: 'Bathroom Work',
      uploadedAt: '2024-01-11',
      url: '',
    },
    {
      id: '6',
      title: 'Faucet Replacement',
      projectName: 'Modern Kitchen Renovation',
      category: 'Kitchen Plumbing',
      uploadedAt: '2024-01-10',
      url: '',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Photos</h1>
          <p className="text-gray-600">Manage all your portfolio photos.</p>
        </div>
        <div className="flex items-center space-x-4">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${
                viewMode === 'grid' ? 'bg-white shadow-sm' : 'text-gray-600'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${
                viewMode === 'list' ? 'bg-white shadow-sm' : 'text-gray-600'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
          <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <Upload className="w-4 h-4" />
            <span>Upload Photos</span>
          </button>
        </div>
      </div>

      {/* Upload Zone */}
      <div className="bg-white rounded-lg shadow-sm border-2 border-dashed border-gray-300 p-8 text-center hover:border-blue-400 transition-colors cursor-pointer">
        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 mb-2">
          Drag and drop photos here, or click to browse
        </p>
        <p className="text-sm text-gray-500">PNG, JPG, GIF up to 5MB each</p>
      </div>

      {/* Photos Grid */}
      {viewMode === 'grid' ? (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden group"
            >
              {/* Photo Placeholder */}
              <div className="aspect-square bg-gray-100 flex items-center justify-center relative">
                <Image className="w-12 h-12 text-gray-400" />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <button className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="p-3">
                <h4 className="font-medium text-gray-900 text-sm truncate">
                  {photo.title}
                </h4>
                <p className="text-xs text-gray-500 truncate">{photo.projectName}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-900">
                  Photo
                </th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-900">
                  Project
                </th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-900">
                  Category
                </th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-900">
                  Uploaded
                </th>
                <th className="text-right px-6 py-3 text-sm font-semibold text-gray-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {photos.map((photo) => (
                <tr key={photo.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Image className="w-6 h-6 text-gray-400" />
                      </div>
                      <span className="font-medium text-gray-900">{photo.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{photo.projectName}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{photo.category}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{photo.uploadedAt}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end">
                      <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Coming Soon Notice */}
      <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 text-center">
        <Image className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Enhanced Photo Management Coming Soon
        </h3>
        <p className="text-gray-600 max-w-md mx-auto">
          Features like bulk editing, image optimization, and drag-and-drop reordering
          will be available soon.
        </p>
      </div>
    </div>
  );
}
