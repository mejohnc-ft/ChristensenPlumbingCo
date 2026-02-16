import { useState, useEffect, useRef } from 'react';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
  startOnView?: boolean;
}

export default function AnimatedCounter({
  end,
  duration = 2000,
  prefix = '',
  suffix = '',
  decimals = 0,
  className = '',
  startOnView = true,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(!startOnView);
  const elementRef = useRef<HTMLSpanElement>(null);

  // Intersection Observer to start animation when in view
  useEffect(() => {
    if (!startOnView) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasStarted) {
            setHasStarted(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [startOnView, hasStarted]);

  // Animate the count
  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Easing function (ease-out-expo)
      const eased = 1 - Math.pow(2, -10 * progress);
      const currentCount = eased * end;

      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [hasStarted, end, duration]);

  const formattedCount = decimals > 0 ? count.toFixed(decimals) : Math.round(count);

  return (
    <span ref={elementRef} className={className}>
      {prefix}
      {formattedCount.toLocaleString()}
      {suffix}
    </span>
  );
}

// Stat display component using AnimatedCounter
interface StatDisplayProps {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  icon?: React.ReactNode;
  className?: string;
}

export function StatDisplay({
  value,
  label,
  prefix = '',
  suffix = '',
  icon,
  className = '',
}: StatDisplayProps) {
  return (
    <div className={`text-center ${className}`}>
      {icon && (
        <div className="inline-flex items-center justify-center w-12 h-12 mb-3 rounded-xl bg-cta-500/10 text-cta-500">
          {icon}
        </div>
      )}
      <div className="text-4xl md:text-5xl font-extrabold text-primary-900">
        <AnimatedCounter end={value} prefix={prefix} suffix={suffix} />
      </div>
      <div className="text-sm font-medium text-gray-600 mt-1">{label}</div>
    </div>
  );
}

export type { AnimatedCounterProps, StatDisplayProps };
