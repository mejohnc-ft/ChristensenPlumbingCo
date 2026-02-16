import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Breadcrumb {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps {
  items: Breadcrumb[];
  showHome?: boolean;
  className?: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  showHome = true,
  className,
}) => {
  const allItems = showHome ? [{ label: 'Home', href: '/' }, ...items] : items;

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn('flex items-center', className)}
    >
      <ol className="flex items-center gap-2">
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1;
          const isHome = showHome && index === 0;

          return (
            <li key={index} className="flex items-center gap-2">
              {index > 0 && (
                <ChevronRight className="h-4 w-4 text-gray-400" aria-hidden="true" />
              )}

              {isLast ? (
                <span className="text-sm font-medium text-gray-900" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <a
                  href={item.href}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-blue-600',
                    'text-gray-600'
                  )}
                >
                  {isHome ? (
                    <span className="flex items-center gap-1">
                      <Home className="h-4 w-4" />
                      <span className="sr-only">{item.label}</span>
                    </span>
                  ) : (
                    item.label
                  )}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

Breadcrumbs.displayName = 'Breadcrumbs';

export default Breadcrumbs;
