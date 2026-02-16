import React from 'react';
import { ArrowRight, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardBody, CardHeader, CardTitle, CardDescription } from '../ui/Card';
import Button from '../ui/Button';

export interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  features?: string[];
  price?: string;
  href?: string;
  ctaText?: string;
  popular?: boolean;
  className?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  icon: Icon,
  features,
  price,
  href,
  ctaText = 'Learn More',
  popular = false,
  className,
}) => {
  return (
    <Card
      className={cn(
        'relative flex flex-col',
        popular && 'border-blue-600 shadow-lg',
        href && 'hover:shadow-xl transition-shadow cursor-pointer',
        className
      )}
      onClick={href ? () => window.location.href = href : undefined}
    >
      {popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="rounded-full bg-blue-600 px-4 py-1 text-sm font-semibold text-white">
            Most Popular
          </span>
        </div>
      )}

      <CardHeader>
        <div className="mb-4 inline-flex rounded-lg bg-blue-100 p-3 text-blue-600">
          <Icon className="h-8 w-8" />
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        {price && (
          <div className="mt-2">
            <span className="text-3xl font-bold text-gray-900">{price}</span>
          </div>
        )}
        <CardDescription className="mt-2">{description}</CardDescription>
      </CardHeader>

      <CardBody className="flex-1">
        {features && features.length > 0 && (
          <ul className="space-y-3">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <svg
                    className="h-3 w-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </span>
                <span className="text-sm text-gray-600">{feature}</span>
              </li>
            ))}
          </ul>
        )}
      </CardBody>

      {href && (
        <CardBody>
          <Button
            variant={popular ? 'primary' : 'outline'}
            fullWidth
            rightIcon={<ArrowRight className="h-4 w-4" />}
            onClick={(e) => {
              e.stopPropagation();
              window.location.href = href;
            }}
          >
            {ctaText}
          </Button>
        </CardBody>
      )}
    </Card>
  );
};

ServiceCard.displayName = 'ServiceCard';

export default ServiceCard;
