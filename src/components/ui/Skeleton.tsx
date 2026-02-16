import React from 'react';
import { cn } from '@/lib/utils';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
}

const Skeleton: React.FC<SkeletonProps> = ({
  className,
  variant = 'rectangular',
  width,
  height,
  style,
  ...props
}) => {
  const variants = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  };

  return (
    <div
      className={cn(
        'animate-pulse bg-gray-200',
        variants[variant],
        className
      )}
      style={{
        width: width ? (typeof width === 'number' ? `${width}px` : width) : undefined,
        height: height ? (typeof height === 'number' ? `${height}px` : height) : undefined,
        ...style,
      }}
      {...props}
    />
  );
};

Skeleton.displayName = 'Skeleton';

export const SkeletonCard: React.FC = () => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md">
      <Skeleton variant="rectangular" height={192} className="mb-4" />
      <Skeleton variant="text" className="mb-2" />
      <Skeleton variant="text" width="60%" />
    </div>
  );
};

export const SkeletonList: React.FC<{ count?: number }> = ({ count = 5 }) => {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="flex items-center gap-4">
          <Skeleton variant="circular" width={48} height={48} />
          <div className="flex-1 space-y-2">
            <Skeleton variant="text" />
            <Skeleton variant="text" width="80%" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Skeleton;
