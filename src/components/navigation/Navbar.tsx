import React, { useState, useEffect } from 'react';
import { Menu, Phone, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import Button from '../ui/Button';

export interface NavLink {
  label: string;
  href: string;
}

export interface NavbarProps {
  logo: React.ReactNode;
  links: NavLink[];
  ctaText?: string;
  ctaHref?: string;
  phoneNumber?: string;
  onMobileMenuToggle?: (isOpen: boolean) => void;
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({
  logo,
  links,
  ctaText = 'Get a Quote',
  ctaHref = '/contact',
  phoneNumber,
  onMobileMenuToggle,
  className,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    // Set initial active link based on current pathname
    setActiveLink(window.location.pathname);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMobileMenuToggle = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);
    onMobileMenuToggle?.(newState);
  };

  const handleLinkClick = (href: string) => {
    setActiveLink(href);
    setIsMobileMenuOpen(false);
  };

  const isActive = (href: string) => {
    return activeLink === href || (href !== '/' && activeLink.startsWith(href));
  };

  return (
    <nav
      className={cn(
        'sticky top-0 z-40 w-full border-b bg-white transition-shadow duration-200',
        isScrolled && 'shadow-md',
        className
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between lg:h-20">
          {/* Logo */}
          <a
            href="/"
            className="flex items-center transition-opacity hover:opacity-80"
            onClick={() => handleLinkClick('/')}
          >
            {logo}
          </a>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 lg:flex">
            <ul className="flex items-center gap-6">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => handleLinkClick(link.href)}
                    className={cn(
                      'relative text-base font-medium transition-colors',
                      isActive(link.href)
                        ? 'text-blue-600'
                        : 'text-gray-700 hover:text-blue-600'
                    )}
                  >
                    {link.label}
                    {isActive(link.href) && (
                      <span className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-blue-600" />
                    )}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-4">
              {phoneNumber && (
                <a
                  href={`tel:${phoneNumber}`}
                  className="flex items-center gap-2 text-base font-medium text-gray-700 transition-colors hover:text-blue-600"
                >
                  <Phone className="h-5 w-5" />
                  <span className="hidden xl:inline">{phoneNumber}</span>
                </a>
              )}
              <Button
                as="a"
                href={ctaHref}
                variant="primary"
                size="md"
              >
                {ctaText}
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={handleMobileMenuToggle}
            className="rounded-lg p-2 text-gray-700 transition-colors hover:bg-gray-100 lg:hidden"
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="border-t border-gray-200 bg-white lg:hidden">
          <div className="container mx-auto px-4 py-4">
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => handleLinkClick(link.href)}
                    className={cn(
                      'block rounded-lg px-4 py-2 text-base font-medium transition-colors',
                      isActive(link.href)
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-100'
                    )}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-4 space-y-3 border-t border-gray-200 pt-4">
              {phoneNumber && (
                <a
                  href={`tel:${phoneNumber}`}
                  className="flex items-center gap-2 rounded-lg px-4 py-2 text-base font-medium text-gray-700 transition-colors hover:bg-gray-100"
                >
                  <Phone className="h-5 w-5" />
                  {phoneNumber}
                </a>
              )}
              <Button
                as="a"
                href={ctaHref}
                variant="primary"
                size="md"
                fullWidth
              >
                {ctaText}
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

Navbar.displayName = 'Navbar';

export default Navbar;
