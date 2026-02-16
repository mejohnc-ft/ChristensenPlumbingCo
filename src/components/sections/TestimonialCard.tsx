import React from 'react';
import { Quote } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardBody } from '../ui/Card';
import StarRating from '../data-display/StarRating';

export interface TestimonialCardProps {
  name: string;
  role?: string;
  avatar?: string;
  rating: number;
  text: string;
  date?: string;
  className?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  role,
  avatar,
  rating,
  text,
  date,
  className,
}) => {
  return (
    <Card className={cn('flex flex-col', className)}>
      <CardBody className="flex flex-col gap-4">
        {/* Quote Icon */}
        <div className="flex items-start justify-between">
          <Quote className="h-8 w-8 text-blue-600" />
          <StarRating rating={rating} size="sm" />
        </div>

        {/* Testimonial Text */}
        <blockquote className="flex-1 text-gray-700">
          <p className="leading-relaxed">{text}</p>
        </blockquote>

        {/* Author Info */}
        <div className="flex items-center gap-3 border-t border-gray-200 pt-4">
          {avatar ? (
            <img
              src={avatar}
              alt={name}
              className="h-12 w-12 rounded-full object-cover"
              loading="lazy"
              width={48}
              height={48}
            />
          ) : (
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <span className="text-lg font-semibold">
                {name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          <div className="flex-1">
            <p className="font-semibold text-gray-900">{name}</p>
            {role && <p className="text-sm text-gray-600">{role}</p>}
            {date && <p className="text-xs text-gray-500">{date}</p>}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

TestimonialCard.displayName = 'TestimonialCard';

export default TestimonialCard;
