import { FolderKanban, Plus, Edit, Trash2, Image, Star } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  category: string;
  location: string;
  photoCount: number;
  featured: boolean;
  createdAt: string;
}

export default function ProjectsPage() {
  const projects: Project[] = [
    {
      id: '1',
      title: 'Modern Kitchen Renovation',
      category: 'Kitchen Plumbing',
      location: 'La Jolla',
      photoCount: 8,
      featured: true,
      createdAt: '2024-01-15',
    },
    {
      id: '2',
      title: 'Bathroom Remodel',
      category: 'Bathroom Work',
      location: 'Mission Valley',
      photoCount: 12,
      featured: true,
      createdAt: '2024-01-12',
    },
    {
      id: '3',
      title: 'Emergency Pipe Repair',
      category: 'Emergency Repairs',
      location: 'Carlsbad',
      photoCount: 4,
      featured: false,
      createdAt: '2024-01-10',
    },
    {
      id: '4',
      title: 'Water Heater Installation',
      category: 'Water Heaters',
      location: 'Chula Vista',
      photoCount: 6,
      featured: false,
      createdAt: '2024-01-08',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-600">Manage your portfolio projects and photos.</p>
        </div>
        <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
          >
            {/* Project Image Placeholder */}
            <div className="h-40 bg-gray-100 flex items-center justify-center">
              <FolderKanban className="w-12 h-12 text-gray-400" />
            </div>

            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-900">{project.title}</h3>
                {project.featured && (
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                )}
              </div>
              <p className="text-sm text-gray-600 mb-2">{project.category}</p>
              <p className="text-sm text-gray-500 mb-4">{project.location}</p>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <Image className="w-4 h-4" />
                  <span>{project.photoCount} photos</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Coming Soon Notice */}
      <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 text-center">
        <FolderKanban className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Full Project Management Coming Soon
        </h3>
        <p className="text-gray-600 max-w-md mx-auto">
          Enhanced project management features including drag-and-drop reordering, bulk
          photo uploads, and category filtering will be available soon.
        </p>
      </div>
    </div>
  );
}
