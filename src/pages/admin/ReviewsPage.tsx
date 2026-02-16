import { Star, Plus, Edit, Trash2, ExternalLink } from 'lucide-react';

interface Review {
  id: string;
  customerName: string;
  location: string;
  rating: number;
  text: string;
  service: string;
  date: string;
  source: 'manual' | 'google';
}

export default function ReviewsAdminPage() {
  const reviews: Review[] = [
    {
      id: '1',
      customerName: 'Sarah Johnson',
      location: 'La Jolla',
      rating: 5,
      text: "Outstanding service! They fixed our emergency leak at 10 PM and didn't charge extra for the late hour.",
      service: 'Emergency Repair',
      date: '2024-01-15',
      source: 'manual',
    },
    {
      id: '2',
      customerName: 'Mike Rodriguez',
      location: 'Mission Valley',
      rating: 5,
      text: 'Christensen Plumbing transformed our outdated bathroom completely.',
      service: 'Bathroom Renovation',
      date: '2024-01-12',
      source: 'google',
    },
    {
      id: '3',
      customerName: 'Emily Chen',
      location: 'Carlsbad',
      rating: 5,
      text: 'Fast, reliable, and honest pricing. They diagnosed the issue quickly.',
      service: 'Diagnostic & Repair',
      date: '2024-01-10',
      source: 'manual',
    },
    {
      id: '4',
      customerName: 'David Thompson',
      location: 'Chula Vista',
      rating: 5,
      text: 'Incredible work on our whole-house repiping project.',
      service: 'Repiping',
      date: '2024-01-08',
      source: 'google',
    },
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-amber-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reviews</h1>
          <p className="text-gray-600">Manage customer reviews and testimonials.</p>
        </div>
        <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Add Review</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-2 mb-2">
            <Star className="w-6 h-6 text-amber-400 fill-current" />
            <span className="text-2xl font-bold text-gray-900">4.9</span>
          </div>
          <p className="text-gray-600">Average Rating</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="text-2xl font-bold text-gray-900 mb-2">89</div>
          <p className="text-gray-600">Total Reviews</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="text-2xl font-bold text-gray-900 mb-2">12</div>
          <p className="text-gray-600">This Month</p>
        </div>
      </div>

      {/* Reviews List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="font-semibold text-gray-900">All Reviews</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {reviews.map((review) => (
            <div key={review.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-semibold text-gray-900">{review.customerName}</h3>
                    <span className="text-sm text-gray-500">{review.location}</span>
                    {review.source === 'google' && (
                      <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                        <ExternalLink className="w-3 h-3 mr-1" />
                        Google
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-1 mb-2">
                    {renderStars(review.rating)}
                  </div>
                  <p className="text-gray-600 mb-2">"{review.text}"</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="bg-gray-100 px-2 py-1 rounded">{review.service}</span>
                    <span>{review.date}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-4">
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
      </div>

      {/* Coming Soon Notice */}
      <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 text-center">
        <Star className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Google Reviews Integration Coming Soon
        </h3>
        <p className="text-gray-600 max-w-md mx-auto">
          Automatic syncing with Google Business reviews and review request features will
          be available soon.
        </p>
      </div>
    </div>
  );
}
