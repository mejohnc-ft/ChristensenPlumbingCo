import { Users, Plus, Edit, Trash2, Mail, Phone } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  bio: string;
}

export default function TeamPage() {
  const teamMembers: TeamMember[] = [
    {
      id: '1',
      name: 'John Christensen',
      role: 'Owner / Master Plumber',
      email: 'john@christensenplumbing.com',
      phone: '(619) 433-2169',
      bio: '20+ years of plumbing experience in San Diego County.',
    },
    {
      id: '2',
      name: 'Mike Johnson',
      role: 'Senior Technician',
      email: 'mike@christensenplumbing.com',
      phone: '(619) 433-2170',
      bio: 'Specializes in emergency repairs and water heater installation.',
    },
    {
      id: '3',
      name: 'Sarah Williams',
      role: 'Office Manager',
      email: 'sarah@christensenplumbing.com',
      phone: '(619) 433-2171',
      bio: 'Manages scheduling and customer relations.',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Team</h1>
          <p className="text-gray-600">Manage your team members and staff profiles.</p>
        </div>
        <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Add Team Member</span>
        </button>
      </div>

      {/* Team Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
          >
            {/* Avatar Placeholder */}
            <div className="h-32 bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-2xl font-bold text-blue-600">
                {member.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-semibold text-gray-900 text-lg">{member.name}</h3>
              <p className="text-sm text-blue-600 font-medium mb-3">{member.role}</p>
              <p className="text-sm text-gray-600 mb-4">{member.bio}</p>

              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span>{member.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span>{member.phone}</span>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-4 border-t border-gray-100">
                <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Coming Soon Notice */}
      <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 text-center">
        <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Team Features Coming Soon
        </h3>
        <p className="text-gray-600 max-w-md mx-auto">
          Photo uploads, certifications display, and public team page will be available
          soon.
        </p>
      </div>
    </div>
  );
}
