import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface MobileMenuLink {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: MobileMenuLink[];
  footer?: React.ReactNode;
  className?: string;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  links,
  footer,
  className,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleLinkClick = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/50 lg:hidden"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu Panel */}
      <div
        className={cn(
          'fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white shadow-xl lg:hidden',
          'animate-in slide-in-from-right duration-300',
          className
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 p-4">
            <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Links */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              {links.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    onClick={handleLinkClick}
                    className="flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium text-gray-700 transition-colors hover:bg-gray-100"
                  >
                    {link.icon && (
                      <span className="flex-shrink-0 text-gray-400">
                        {link.icon}
                      </span>
                    )}
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer */}
          {footer && (
            <div className="border-t border-gray-200 p-4">
              {footer}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

MobileMenu.displayName = 'MobileMenu';

export default MobileMenu;
