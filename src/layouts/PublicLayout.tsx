import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useUser, useClerk } from '@clerk/clerk-react';
import {
  Phone,
  Mail,
  MapPin,
  User,
  LogIn,
  Settings,
  LogOut,
  Menu,
  X,
  Clock,
  ArrowRight,
} from 'lucide-react';
import ThemeToggle from '../components/navigation/ThemeToggle';
import ErrorBoundary from '../components/ErrorBoundary';
import { MainSchemas } from '@/lib/seo';
import { trackPageView, trackPhoneClick, trackEmailClick } from '@/lib/analytics';

const PHONE_NUMBER = '(619) 433-2169';
const PHONE_LINK = 'tel:+16194332169';

export default function PublicLayout() {
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { isSignedIn, user } = useUser();
  const { signOut } = useClerk();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdown = document.getElementById('user-dropdown');
      const button = document.getElementById('user-dropdown-button');
      if (dropdown && button && !dropdown.contains(event.target as Node) && !button.contains(event.target as Node)) {
        setShowUserDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    trackPageView(location.pathname, document.title);
  }, [location.pathname]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add('body-scroll-lock');
    } else {
      document.body.classList.remove('body-scroll-lock');
    }
    return () => document.body.classList.remove('body-scroll-lock');
  }, [mobileMenuOpen]);

  const handleLogout = async () => {
    await signOut();
    setShowUserDropdown(false);
  };

  const navItems = [
    { to: '/', label: 'Home' },
    { to: '/services', label: 'Services' },
    { to: '/portfolio', label: 'Our Work' },
    { to: '/reviews', label: 'Reviews' },
    { to: '/about', label: 'About' },
    { to: '/blog', label: 'Blog' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  // Check if we're on the homepage (dark hero)
  const isHomepage = location.pathname === '/';

  return (
    <div className="min-h-screen bg-t-page flex flex-col">
      {/* Main Header - Editorial Style */}
      <header
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-500
          ${scrolled || !isHomepage
            ? 'bg-t-header border-b border-t-header-border'
            : 'bg-transparent'
          }
        `}
      >
        <div className="container-editorial">
          <div className="flex justify-between items-center py-5 lg:py-6">
            {/* Logo */}
            <Link to="/" className="group">
              <div className="flex items-center gap-3">
                {/* Logo Mark */}
                <div className={`
                  w-10 h-10 flex items-center justify-center transition-colors
                  ${scrolled || !isHomepage ? 'bg-navy-900' : 'bg-gold-500'}
                `}>
                  <span className="font-display text-xl text-white font-semibold">C</span>
                </div>
                {/* Logo Text */}
                <div className="hidden sm:block">
                  <h1 className={`
                    font-display text-lg font-semibold tracking-tight transition-colors
                    ${scrolled || !isHomepage ? 'text-t-text' : 'text-cream-100'}
                  `}>
                    Christensen Plumbing
                  </h1>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`
                    relative text-sm font-medium tracking-wide uppercase transition-colors
                    ${isActive(item.to)
                      ? scrolled || !isHomepage ? 'text-gold-500' : 'text-gold-400'
                      : scrolled || !isHomepage ? 'text-t-text-secondary hover:text-gold-500' : 'text-cream-300 hover:text-cream-100'
                    }
                  `}
                >
                  {item.label}
                  {isActive(item.to) && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gold-500" />
                  )}
                </Link>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-4 xl:gap-6">
              {/* Phone */}
              <a
                href={PHONE_LINK}
                onClick={() => trackPhoneClick('header')}
                className={`
                  flex items-center gap-2 font-medium transition-colors
                  ${scrolled || !isHomepage ? 'text-t-text hover:text-gold-500' : 'text-cream-100 hover:text-gold-400'}
                `}
              >
                <Phone className="w-4 h-4" />
                <span>{PHONE_NUMBER}</span>
              </a>

              {/* Emergency CTA */}
              <Link
                to="/emergency"
                className="btn-gold px-6 py-3 text-sm"
              >
                24/7 Emergency
              </Link>

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* User Menu */}
              <div className="relative">
                <button
                  id="user-dropdown-button"
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                  aria-label="Account menu"
                  aria-expanded={showUserDropdown}
                  className={`
                    p-2 transition-colors
                    ${scrolled || !isHomepage ? 'text-t-text-muted hover:text-t-text' : 'text-cream-400 hover:text-cream-100'}
                  `}
                >
                  <User className="w-5 h-5" />
                </button>

                {showUserDropdown && (
                  <div
                    id="user-dropdown"
                    className="absolute right-0 mt-2 w-56 bg-t-card border border-t-card-border py-2 z-50 animate-fade-in"
                  >
                    {isSignedIn ? (
                      <>
                        <div className="px-4 py-2 border-b border-t-card-border">
                          <p className="text-xs text-t-text-muted">Signed in as</p>
                          <p className="text-sm font-medium text-t-text truncate">{user?.primaryEmailAddress?.emailAddress}</p>
                        </div>
                        <Link
                          to="/admin"
                          onClick={() => setShowUserDropdown(false)}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-t-text-secondary hover:bg-t-page-alt"
                        >
                          <Settings className="w-4 h-4" />
                          Admin Dashboard
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-emergency-600 hover:bg-emergency-50"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </>
                    ) : (
                      <Link
                        to="/admin"
                        onClick={() => setShowUserDropdown(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-t-text-secondary hover:bg-t-page-alt"
                      >
                        <LogIn className="w-4 h-4" />
                        Admin Login
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center gap-4 lg:hidden">
              <a
                href={PHONE_LINK}
                onClick={() => trackPhoneClick('mobile-header')}
                className="btn-gold px-4 py-2 text-sm gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>Call</span>
              </a>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileMenuOpen}
                className={`
                  p-2 transition-colors
                  ${scrolled || !isHomepage ? 'text-t-text' : 'text-cream-100'}
                `}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-t-header border-t border-t-header-border animate-fade-in">
            <div className="container-editorial py-6 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`
                    block py-3 text-lg font-medium border-b border-t-card-border transition-colors
                    ${isActive(item.to)
                      ? 'text-gold-500'
                      : 'text-t-text hover:text-gold-500'
                    }
                  `}
                >
                  {item.label}
                </Link>
              ))}

              <div className="pt-4 space-y-3">
                {/* Mobile Theme Toggle */}
                <div className="flex items-center justify-between py-2">
                  <span className="text-t-text-secondary text-sm font-medium">Theme</span>
                  <ThemeToggle />
                </div>

                <Link
                  to="/emergency"
                  className="w-full btn-gold justify-center"
                >
                  24/7 Emergency Service
                </Link>

                {isSignedIn ? (
                  <>
                    <Link
                      to="/admin"
                      className="flex items-center gap-2 px-4 py-3 text-t-text-secondary border border-t-card-border"
                    >
                      <Settings className="w-5 h-5" />
                      Admin Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-3 text-emergency-600 border border-emergency-200"
                    >
                      <LogOut className="w-5 h-5" />
                      Sign Out
                    </button>
                  </>
                ) : (
                  <Link
                    to="/admin"
                    className="flex items-center gap-2 px-4 py-3 text-t-text-secondary border border-t-card-border"
                  >
                    <LogIn className="w-5 h-5" />
                    Admin Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Spacer for fixed header on non-homepage */}
      {!isHomepage && <div className="h-20" />}

      {/* Global Structured Data */}
      <MainSchemas rating={4.9} reviewCount={247} />

      {/* Main Content */}
      <main className="flex-1">
        <ErrorBoundary fallback={
          <div className="flex-1 flex items-center justify-center py-20">
            <div className="text-center max-w-md px-4">
              <h2 className="font-display text-2xl font-semibold text-t-text mb-4">Something went wrong</h2>
              <p className="text-t-text-secondary mb-6">We encountered an unexpected error loading this page.</p>
              <a href="/" className="btn-gold px-6 py-3">Return Home</a>
            </div>
          </div>
        }>
          <Outlet />
        </ErrorBoundary>
      </main>

      {/* Footer - Editorial Style */}
      <footer className="bg-t-footer text-t-text">
        {/* Main Footer */}
        <div className="container-editorial py-16 lg:py-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
            {/* Brand Column */}
            <div className="md:col-span-2 lg:col-span-5">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gold-500 flex items-center justify-center">
                  <span className="font-display text-2xl text-white font-semibold">C</span>
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold">Christensen Plumbing</h3>
                  <p className="text-t-text-muted text-sm">San Diego County</p>
                </div>
              </div>
              <p className="text-t-text-secondary mb-8 max-w-md leading-relaxed">
                Professional plumbing services with a commitment to excellence and customer
                satisfaction since 2003. Licensed, bonded, and insured.
              </p>
              <a
                href={PHONE_LINK}
                onClick={() => trackPhoneClick('footer')}
                className="inline-flex items-center gap-3 text-gold-400 hover:text-gold-300 transition-colors font-medium"
              >
                <Phone className="w-5 h-5" />
                <span className="text-xl">{PHONE_NUMBER}</span>
              </a>
            </div>

            {/* Links */}
            <div className="lg:col-span-2">
              <h4 className="text-sm uppercase tracking-wider text-t-text-muted mb-6">Services</h4>
              <div className="space-y-1">
                {[
                  { label: 'Emergency Repairs', to: '/services/emergency-plumbing' },
                  { label: 'Drain Cleaning', to: '/services/drain-cleaning' },
                  { label: 'Water Heaters', to: '/services/water-heaters' },
                  { label: 'Pipe Repair', to: '/services/pipe-repair' },
                  { label: 'Leak Detection', to: '/services/leak-detection' },
                ].map((service) => (
                  <Link
                    key={service.to}
                    to={service.to}
                    className="block py-1.5 text-t-text-secondary hover:text-gold-400 transition-colors"
                  >
                    {service.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Company */}
            <div className="lg:col-span-2">
              <h4 className="text-sm uppercase tracking-wider text-t-text-muted mb-6">Company</h4>
              <div className="space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="block py-1.5 text-t-text-secondary hover:text-gold-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className="lg:col-span-3">
              <h4 className="text-sm uppercase tracking-wider text-t-text-muted mb-6">Contact</h4>
              <div className="space-y-4">
                <a href="mailto:info@christensenplumbing.com" onClick={() => trackEmailClick('footer')} className="flex items-center gap-3 text-t-text-secondary hover:text-gold-400 transition-colors min-w-0">
                  <Mail className="w-5 h-5 text-gold-500 flex-shrink-0" />
                  <span className="truncate">info@christensenplumbing.com</span>
                </a>
                <div className="flex items-center gap-3 text-t-text-secondary">
                  <MapPin className="w-5 h-5 text-gold-500" />
                  <span>Serving All of San Diego</span>
                </div>
                <div className="flex items-center gap-3 text-t-text-secondary">
                  <Clock className="w-5 h-5 text-gold-500" />
                  <span>Mon-Fri 6AM-8PM</span>
                </div>
              </div>

              <div className="mt-8">
                <Link
                  to="/emergency"
                  className="inline-flex items-center gap-2 text-gold-400 hover:text-gold-300 font-medium transition-colors"
                >
                  <span>24/7 Emergency Service</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-t-footer-border">
          <div className="container-editorial py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-t-text-muted text-sm">
              <p>&copy; {new Date().getFullYear()} Christensen Plumbing Co. All rights reserved.</p>
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center">
                <p>Licensed & Insured</p>
                <span className="hidden sm:inline">&bull;</span>
                <div className="flex items-center gap-4">
                  <Link to="/privacy" className="hover:text-gold-400 transition-colors">Privacy</Link>
                  <Link to="/terms" className="hover:text-gold-400 transition-colors">Terms</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Sticky Mobile Call Bar */}
      <div className="fixed bottom-0 left-0 right-0 lg:hidden z-40 bg-t-footer border-t border-t-footer-border safe-area-pb">
        <div className="flex items-center justify-between p-4">
          <div className="text-t-text">
            <p className="text-xs text-t-text-muted">Need help?</p>
            <p className="font-display font-semibold">{PHONE_NUMBER}</p>
          </div>
          <a href={PHONE_LINK} onClick={() => trackPhoneClick('sticky-bar')} className="btn-gold px-6 py-3">
            <Phone className="w-5 h-5" />
            <span>Call Now</span>
          </a>
        </div>
      </div>

      {/* Bottom padding for mobile bar */}
      <div className="h-20 lg:h-0" />
    </div>
  );
}
