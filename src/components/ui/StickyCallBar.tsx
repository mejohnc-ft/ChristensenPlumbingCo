import { useState, useEffect } from 'react';
import { Phone, Clock } from 'lucide-react';

interface StickyCallBarProps {
  phoneNumber?: string;
  showAfterScroll?: number;
  emergencyText?: string;
}

export default function StickyCallBar({
  phoneNumber = '(619) 433-2169',
  showAfterScroll = 100,
  emergencyText = '24/7 Emergency',
}: StickyCallBarProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > showAfterScroll);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial scroll position

    return () => window.removeEventListener('scroll', handleScroll);
  }, [showAfterScroll]);

  // Format phone number for tel: link
  const telLink = `tel:${phoneNumber.replace(/[^0-9+]/g, '')}`;

  return (
    <div
      className={`
        fixed bottom-0 left-0 right-0 z-50
        transform transition-transform duration-300 ease-out
        md:hidden
        ${isVisible ? 'translate-y-0' : 'translate-y-full'}
      `}
    >
      {/* Gradient shadow above bar */}
      <div className="h-4 bg-gradient-to-t from-black/20 to-transparent" />

      {/* Main bar */}
      <div className="bg-cta-gradient px-4 py-3 safe-area-bottom">
        <a
          href={telLink}
          className="flex items-center justify-center gap-3 touch-target"
        >
          {/* Pulsing phone icon */}
          <div className="relative">
            <div className="absolute inset-0 bg-white/30 rounded-full animate-pulse-ring" />
            <div className="relative bg-white/20 p-2.5 rounded-full">
              <Phone className="w-6 h-6 text-white" fill="currentColor" />
            </div>
          </div>

          {/* Phone number */}
          <div className="flex flex-col items-start">
            <span className="text-white/80 text-xs font-medium flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {emergencyText}
            </span>
            <span className="text-white text-xl font-extrabold tracking-tight">
              {phoneNumber}
            </span>
          </div>

          {/* Tap to call indicator */}
          <div className="ml-auto bg-white/20 px-3 py-1.5 rounded-full">
            <span className="text-white text-sm font-semibold">
              Tap to Call
            </span>
          </div>
        </a>
      </div>
    </div>
  );
}

export type { StickyCallBarProps };
