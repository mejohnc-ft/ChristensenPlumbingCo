import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  showNumber?: boolean;
  className?: string;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxRating = 5,
  size = 'md',
  showNumber = false,
  className,
}) => {
  const clampedRating = Math.max(0, Math.min(rating, maxRating));

  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  const renderStars = () => {
    const stars = [];

    for (let i = 1; i <= maxRating; i++) {
      const fillPercentage = Math.max(0, Math.min(1, clampedRating - (i - 1)));

      stars.push(
        <div key={i} className="relative">
          {/* Background star (empty) */}
          <Star className={cn(sizes[size], 'text-gray-300')} />

          {/* Foreground star (filled) */}
          {fillPercentage > 0 && (
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${fillPercentage * 100}%` }}
            >
              <Star className={cn(sizes[size], 'fill-yellow-400 text-yellow-400')} />
            </div>
          )}
        </div>
      );
    }

    return stars;
  };

  return (
    <div className={cn('flex items-center gap-1', className)} role="img" aria-label={`${rating} out of ${maxRating} stars`}>
      {renderStars()}
      {showNumber && (
        <span className={cn('ml-1 font-medium text-gray-700', textSizes[size])}>
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
};

StarRating.displayName = 'StarRating';

export default StarRating;
