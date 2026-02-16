import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'gold' | 'gold-outline' | 'navy' | 'navy-outline';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  as?: 'button' | 'a';
  href?: string;
}

const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled,
      children,
      as = 'button',
      href,
      ...props
    },
    ref
  ) => {
    const baseStyles = `
      inline-flex items-center justify-center gap-2 font-medium
      transition-all duration-300 ease-out
      focus:outline-none focus:ring-2 focus:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed
      no-underline
      active:scale-[0.98]
    `;

    const variants = {
      // Primary - Navy
      primary: 'bg-navy-900 text-cream-100 hover:bg-navy-800 focus:ring-navy-500',

      // Secondary - Lighter
      secondary: 'bg-navy-600 text-white hover:bg-navy-700 focus:ring-navy-500',

      // Outline - Navy outline
      outline: 'border-2 border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-cream-100 focus:ring-navy-500',

      // Ghost - Subtle
      ghost: 'text-navy-700 hover:bg-navy-100 focus:ring-navy-500',

      // Danger - Emergency red
      danger: 'bg-emergency-600 text-white hover:bg-emergency-700 focus:ring-emergency-500',

      // Gold - Main CTA
      gold: `
        bg-gold-500 text-white
        shadow-gold hover:shadow-gold-hover
        hover:bg-gold-600
        focus:ring-gold-500
      `,

      // Gold Outline
      'gold-outline': `
        border-2 border-gold-500 text-gold-500
        hover:bg-gold-500 hover:text-white
        focus:ring-gold-500
      `,

      // Navy - Dark alternative
      navy: `
        bg-navy-900 text-cream-100
        hover:bg-navy-800
        focus:ring-navy-500
      `,

      // Navy Outline
      'navy-outline': `
        border-2 border-navy-900 text-navy-900
        hover:bg-navy-900 hover:text-cream-100
        focus:ring-navy-500
      `,
    };

    const sizes = {
      sm: 'text-sm px-4 py-2 min-h-[36px]',
      md: 'text-base px-6 py-3 min-h-[44px]',
      lg: 'text-lg px-8 py-4 min-h-[52px]',
      xl: 'text-xl px-10 py-5 min-h-[60px]',
    };

    const classNames = cn(
      baseStyles,
      variants[variant],
      sizes[size],
      fullWidth && 'w-full',
      className
    );

    const content = (
      <>
        {isLoading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          leftIcon && <span className="flex-shrink-0">{leftIcon}</span>
        )}
        {children}
        {rightIcon && !isLoading && (
          <span className="flex-shrink-0">{rightIcon}</span>
        )}
      </>
    );

    if (as === 'a' && href) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={classNames}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </a>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classNames}
        disabled={disabled || isLoading}
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;

// Phone CTA Button - Pre-configured for phone calls
interface PhoneButtonProps extends Omit<ButtonProps, 'as' | 'href' | 'leftIcon'> {
  phoneNumber?: string;
  showIcon?: boolean;
}

export function PhoneButton({
  phoneNumber = '(619) 433-2169',
  showIcon = true,
  children,
  variant = 'gold',
  size = 'lg',
  ...props
}: PhoneButtonProps) {
  const telLink = `tel:${phoneNumber.replace(/[^0-9+]/g, '')}`;

  return (
    <Button
      as="a"
      href={telLink}
      variant={variant}
      size={size}
      leftIcon={
        showIcon ? (
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
          </svg>
        ) : undefined
      }
      {...props}
    >
      {children || phoneNumber}
    </Button>
  );
}
