import React from 'react';
import { cn } from '@/lib/utils';
import Button from '../ui/Button';

export interface HeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  primaryCta?: {
    text: string;
    href: string;
    icon?: React.ReactNode;
  };
  secondaryCta?: {
    text: string;
    href: string;
    icon?: React.ReactNode;
  };
  backgroundImage?: string;
  overlay?: boolean;
  children?: React.ReactNode;
  className?: string;
}

const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  description,
  primaryCta,
  secondaryCta,
  backgroundImage,
  overlay = true,
  children,
  className,
}) => {
  return (
    <section
      className={cn('relative overflow-hidden', className)}
      style={
        backgroundImage
          ? {
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
          : undefined
      }
    >
      {/* Overlay */}
      {backgroundImage && overlay && (
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
      )}

      <div className="container relative mx-auto px-4 py-20 lg:py-32">
        <div className="max-w-3xl">
          {subtitle && (
            <p className={cn(
              'mb-4 text-sm font-semibold uppercase tracking-wide',
              backgroundImage ? 'text-blue-400' : 'text-blue-600'
            )}>
              {subtitle}
            </p>
          )}

          <h1 className={cn(
            'mb-6 text-4xl font-bold leading-tight lg:text-6xl',
            backgroundImage ? 'text-white' : 'text-gray-900'
          )}>
            {title}
          </h1>

          {description && (
            <p className={cn(
              'mb-8 text-lg leading-relaxed lg:text-xl',
              backgroundImage ? 'text-gray-200' : 'text-gray-600'
            )}>
              {description}
            </p>
          )}

          {(primaryCta || secondaryCta) && (
            <div className="flex flex-wrap gap-4">
              {primaryCta && (
                <Button
                  as="a"
                  href={primaryCta.href}
                  variant="primary"
                  size="lg"
                  leftIcon={primaryCta.icon}
                >
                  {primaryCta.text}
                </Button>
              )}

              {secondaryCta && (
                <Button
                  as="a"
                  href={secondaryCta.href}
                  variant={backgroundImage ? 'outline' : 'secondary'}
                  size="lg"
                  leftIcon={secondaryCta.icon}
                  className={backgroundImage ? 'border-white text-white hover:bg-white/10' : ''}
                >
                  {secondaryCta.text}
                </Button>
              )}
            </div>
          )}

          {children}
        </div>
      </div>
    </section>
  );
};

Hero.displayName = 'Hero';

export default Hero;
