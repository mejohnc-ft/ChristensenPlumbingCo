import React from 'react';
import { Star, ExternalLink } from 'lucide-react';

interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  avatar?: string;
}

const GoogleReviews: React.FC = () => {
  // In a real implementation, these would come from Google Places API
  const reviews: Review[] = [
    {
      id: '1',
      author: 'Jennifer Martinez',
      rating: 5,
      text: 'Exceptional service! They arrived within an hour of my call and fixed our water heater issue professionally. Fair pricing and excellent communication.',
      date: '2 weeks ago'
    },
    {
      id: '2',
      author: 'Robert Chen',
      rating: 5,
      text: 'Christensen Plumbing saved the day when our main line backed up. Professional, clean, and efficient work. Highly recommend for any plumbing needs.',
      date: '1 month ago'
    },
    {
      id: '3',
      author: 'Maria Rodriguez',
      rating: 5,
      text: 'Outstanding bathroom renovation work. They completed everything on time and within budget. The attention to detail was impressive.',
      date: '2 months ago'
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
            <span className="text-white font-bold text-sm">G</span>
          </div>
          <div>
            <h3 className="font-bold text-gray-900">Google Reviews</h3>
            <div className="flex items-center space-x-2">
              <div className="flex">{renderStars(5)}</div>
              <span className="text-sm text-gray-600">4.9 • 247 reviews</span>
            </div>
          </div>
        </div>
        <a
          href="https://g.page/r/YOUR_GOOGLE_BUSINESS_ID/review"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          <span>Write a review</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="border-b border-gray-100 pb-4 last:border-b-0">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-semibold text-sm">
                  {review.author.charAt(0)}
                </span>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-semibold text-gray-900">{review.author}</span>
                  <span className="text-gray-500 text-sm">{review.date}</span>
                </div>
                <div className="flex mb-2">{renderStars(review.rating)}</div>
                <p className="text-gray-700 text-sm leading-relaxed">{review.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100">
        <a
          href="https://www.google.com/maps/place/YOUR_BUSINESS_NAME"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
        >
          <span>View all Google reviews</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};

export default GoogleReviews;