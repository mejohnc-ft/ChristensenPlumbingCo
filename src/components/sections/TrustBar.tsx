import { Star, Shield, Clock, Users } from 'lucide-react';

interface TrustBarProps {
  googleRating?: number;
  reviewCount?: number;
  yearsInBusiness?: number;
  customerCount?: string;
  variant?: 'light' | 'dark' | 'glass';
  className?: string;
}

export default function TrustBar({
  googleRating = 4.9,
  reviewCount = 247,
  yearsInBusiness = 20,
  customerCount = '5,000+',
  variant = 'glass',
  className = '',
}: TrustBarProps) {
  const baseStyles = {
    light: 'bg-white/90 text-gray-800 border border-gray-200 shadow-lg',
    dark: 'bg-primary-900/90 text-white border border-primary-700',
    glass: 'glass text-white',
  };

  const iconBgStyles = {
    light: 'bg-cta-100 text-cta-600',
    dark: 'bg-white/10 text-cta-400',
    glass: 'bg-white/10 text-cta-400',
  };

  const trustItems = [
    {
      icon: <Star className="w-4 h-4" fill="currentColor" />,
      value: googleRating.toFixed(1),
      label: `${reviewCount} Reviews`,
      highlight: true,
    },
    {
      icon: <Clock className="w-4 h-4" />,
      value: `${yearsInBusiness}+`,
      label: 'Years Experience',
    },
    {
      icon: <Shield className="w-4 h-4" />,
      value: 'Licensed',
      label: '& Insured',
    },
    {
      icon: <Users className="w-4 h-4" />,
      value: customerCount,
      label: 'Happy Customers',
    },
  ];

  return (
    <div
      className={`
        rounded-2xl px-6 py-4
        ${baseStyles[variant]}
        ${className}
      `}
    >
      <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
        {trustItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Icon */}
            <div
              className={`
                p-2 rounded-lg
                ${iconBgStyles[variant]}
                ${item.highlight ? 'text-yellow-400' : ''}
              `}
            >
              {item.icon}
            </div>

            {/* Text */}
            <div className="flex flex-col">
              <span className="font-extrabold text-lg leading-tight">
                {item.value}
              </span>
              <span
                className={`
                  text-xs font-medium leading-tight
                  ${variant === 'light' ? 'text-gray-600' : 'text-white/70'}
                `}
              >
                {item.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Compact version for header
export function TrustBadge({
  text,
  icon,
  variant = 'glass',
}: {
  text: string;
  icon?: React.ReactNode;
  variant?: 'glass' | 'solid';
}) {
  return (
    <div
      className={`
        inline-flex items-center gap-2 px-4 py-2 rounded-full
        text-sm font-medium
        ${
          variant === 'glass'
            ? 'bg-white/10 backdrop-blur-sm border border-white/20 text-white'
            : 'bg-cta-500 text-white'
        }
      `}
    >
      {icon}
      <span>{text}</span>
    </div>
  );
}

export type { TrustBarProps };
