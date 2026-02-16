import React, { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface RatingDistribution {
  5: number;
  4: number;
  3: number;
  2: number;
  1: number;
}

export interface RatingChartProps {
  distribution: RatingDistribution;
  totalReviews: number;
  animate?: boolean;
  className?: string;
}

const RatingChart: React.FC<RatingChartProps> = ({
  distribution,
  totalReviews,
  animate = true,
  className,
}) => {
  const [animatedWidths, setAnimatedWidths] = useState<Record<number, number>>({
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  });

  useEffect(() => {
    if (!animate) {
      setAnimatedWidths({
        5: (distribution[5] / totalReviews) * 100,
        4: (distribution[4] / totalReviews) * 100,
        3: (distribution[3] / totalReviews) * 100,
        2: (distribution[2] / totalReviews) * 100,
        1: (distribution[1] / totalReviews) * 100,
      });
      return;
    }

    const timeout = setTimeout(() => {
      setAnimatedWidths({
        5: (distribution[5] / totalReviews) * 100,
        4: (distribution[4] / totalReviews) * 100,
        3: (distribution[3] / totalReviews) * 100,
        2: (distribution[2] / totalReviews) * 100,
        1: (distribution[1] / totalReviews) * 100,
      });
    }, 100);

    return () => clearTimeout(timeout);
  }, [distribution, totalReviews, animate]);

  const ratings = [5, 4, 3, 2, 1] as const;

  return (
    <div className={cn('space-y-2', className)} role="group" aria-label="Rating distribution">
      {ratings.map((rating) => {
        const count = distribution[rating];
        const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;

        return (
          <div key={rating} className="flex items-center gap-3">
            <div className="flex items-center gap-1 w-12">
              <span className="text-sm font-medium text-gray-700">{rating}</span>
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            </div>

            <div className="flex-1">
              <div className="h-4 overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full rounded-full bg-blue-600 transition-all duration-1000 ease-out"
                  style={{ width: `${animatedWidths[rating]}%` }}
                  role="progressbar"
                  aria-valuenow={percentage}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${rating} stars: ${percentage.toFixed(0)}%`}
                />
              </div>
            </div>

            <div className="w-16 text-right">
              <span className="text-sm text-gray-600">
                {count} ({percentage.toFixed(0)}%)
              </span>
            </div>
          </div>
        );
      })}

      {/* Accessible table fallback */}
      <table className="sr-only">
        <caption>Rating Distribution</caption>
        <thead>
          <tr>
            <th>Rating</th>
            <th>Count</th>
            <th>Percentage</th>
          </tr>
        </thead>
        <tbody>
          {ratings.map((rating) => {
            const count = distribution[rating];
            const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
            return (
              <tr key={rating}>
                <td>{rating} stars</td>
                <td>{count}</td>
                <td>{percentage.toFixed(0)}%</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

RatingChart.displayName = 'RatingChart';

export default RatingChart;
