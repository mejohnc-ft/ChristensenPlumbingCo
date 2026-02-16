/**
 * SEO Constants for Christensen Plumbing Co.
 *
 * This file contains all default SEO values, page-specific metadata,
 * and business information used throughout the site for consistent SEO.
 */

/**
 * Business address structure for Schema.org PostalAddress
 */
export interface Address {
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry: string;
}

/**
 * Geographic coordinates for local business schema
 */
export interface GeoCoordinates {
  latitude: number;
  longitude: number;
}

/**
 * Social media and review platform links
 */
export interface SocialLinks {
  facebook: string;
  google: string;
  yelp: string;
}

/**
 * Open Graph metadata defaults
 */
export interface OpenGraphDefaults {
  type: string;
  locale: string;
}

/**
 * Complete SEO defaults configuration
 */
export interface SEODefaults {
  siteName: string;
  titleTemplate: string;
  defaultTitle: string;
  defaultDescription: string;
  siteUrl: string;
  phone: string;
  phoneE164: string;
  email: string;
  address: Address;
  geo: GeoCoordinates;
  serviceArea: string;
  serviceAreaCities: string[];
  socialLinks: SocialLinks;
  openGraph: OpenGraphDefaults;
  priceRange: string;
  foundingYear: number;
  logoUrl: string;
  defaultOgImage: string;
}

/**
 * Page-specific SEO configuration
 */
export interface PageSEOConfig {
  title: string;
  description: string;
  keywords?: string[];
}

/**
 * Default SEO configuration for the entire site.
 * These values are used as fallbacks when page-specific values are not provided.
 */
export const SEO_DEFAULTS: SEODefaults = {
  siteName: 'Christensen Plumbing Co.',
  titleTemplate: '%s | Christensen Plumbing Co.',
  defaultTitle: 'San Diego Plumbing Services | Christensen Plumbing Co.',
  defaultDescription: 'Professional plumbing services in San Diego County. Licensed, insured, and available 24/7 for emergencies. Drain cleaning, water heaters, leak detection, and more.',
  siteUrl: 'https://christensenplumbing.com',
  phone: '(619) 433-2169',
  phoneE164: '+1-619-433-2169',
  email: 'info@christensenplumbing.com',
  address: {
    streetAddress: '123 Main Street',
    addressLocality: 'San Diego',
    addressRegion: 'CA',
    postalCode: '92101',
    addressCountry: 'US',
  },
  geo: {
    latitude: 32.7157,
    longitude: -117.1611,
  },
  serviceArea: 'San Diego County',
  serviceAreaCities: [
    'San Diego',
    'La Jolla',
    'Mission Valley',
    'Carlsbad',
    'Chula Vista',
    'Oceanside',
    'Escondido',
    'El Cajon',
    'National City',
    'Coronado',
    'Del Mar',
    'Encinitas',
    'Poway',
    'Santee',
    'La Mesa',
  ],
  socialLinks: {
    facebook: 'https://facebook.com/christensenplumbing',
    google: 'https://g.page/christensenplumbing',
    yelp: 'https://yelp.com/biz/christensen-plumbing-san-diego',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
  },
  priceRange: '$$',
  foundingYear: 2003,
  logoUrl: 'https://christensenplumbing.com/logo.png',
  defaultOgImage: 'https://christensenplumbing.com/og-image.jpg',
};

/**
 * Page-specific SEO configurations.
 * Each page should have optimized title and description for search engines.
 */
export const PAGE_SEO: Record<string, PageSEOConfig> = {
  home: {
    title: 'San Diego Plumbing Services',
    description: 'Your trusted San Diego plumber. 24/7 emergency service, drain cleaning, water heaters, leak detection, and more. Licensed & insured.',
    keywords: [
      'San Diego plumber',
      'plumbing services San Diego',
      'emergency plumber San Diego',
      'licensed plumber San Diego County',
    ],
  },
  reviews: {
    title: 'Customer Reviews & Testimonials',
    description: 'See what San Diego customers say about Christensen Plumbing. 4.9 star rating from 200+ reviews on Google, Yelp, and more.',
    keywords: [
      'Christensen Plumbing reviews',
      'San Diego plumber reviews',
      'best plumber San Diego',
      'plumbing testimonials',
    ],
  },
  portfolio: {
    title: 'Our Work - Plumbing Projects Gallery',
    description: 'Browse our portfolio of completed plumbing projects in San Diego. Before/after photos, case studies, and customer results.',
    keywords: [
      'plumbing projects San Diego',
      'plumbing portfolio',
      'bathroom renovation San Diego',
      'pipe replacement photos',
    ],
  },
  about: {
    title: 'About Us - San Diego Plumbers Since 2003',
    description: 'Family-owned San Diego plumbing company. Licensed, bonded, and insured. Meet Bill Christensen and learn about his commitment to quality.',
    keywords: [
      'about Christensen Plumbing',
      'San Diego plumbing company',
      'family owned plumber',
      'licensed plumber San Diego',
    ],
  },
  emergency: {
    title: 'Emergency Plumbing Services - 24/7',
    description: 'Plumbing emergency? Call now for immediate service. Burst pipes, flooding, sewer backups. San Diego emergency plumber available 24/7.',
    keywords: [
      '24/7 emergency plumber',
      'emergency plumbing San Diego',
      'burst pipe repair',
      'flooding plumber',
      'sewer backup emergency',
    ],
  },
  contact: {
    title: 'Contact Us - Free Estimates',
    description: 'Contact Christensen Plumbing for a free estimate. Serving all of San Diego County. Call (619) 433-2169 or submit a service request online.',
    keywords: [
      'contact plumber San Diego',
      'plumbing free estimate',
      'plumbing service request',
      'San Diego plumber phone',
    ],
  },
  services: {
    title: 'Professional Plumbing Services',
    description: 'Full-service plumbing solutions: drain cleaning, water heaters, pipe repair, leak detection, repiping, and bathroom renovations in San Diego.',
    keywords: [
      'drain cleaning San Diego',
      'water heater installation',
      'pipe repair San Diego',
      'leak detection service',
      'repiping service',
    ],
  },
};

/**
 * Service-specific SEO configurations for individual service pages
 */
export const SERVICE_SEO: Record<string, PageSEOConfig> = {
  'emergency-plumbing': {
    title: 'Emergency Plumbing Services - 24/7 San Diego',
    description: '24/7 emergency plumbing in San Diego. Fast response for burst pipes, flooding, sewer backups, and gas leaks. Licensed emergency plumbers.',
  },
  'drain-cleaning': {
    title: 'Drain Cleaning Services San Diego',
    description: 'Professional drain cleaning in San Diego. Hydro jetting, camera inspection, root removal, and preventive maintenance. Clear clogs fast.',
  },
  'water-heaters': {
    title: 'Water Heater Installation & Repair San Diego',
    description: 'Water heater services in San Diego. Installation, repair, and replacement. Tank and tankless options. Energy-efficient solutions.',
  },
  'pipe-repair': {
    title: 'Pipe Repair & Repiping Services San Diego',
    description: 'Expert pipe repair and repiping in San Diego. Leak detection, pipe replacement, and preventive maintenance. Licensed and insured.',
  },
  'leak-detection': {
    title: 'Leak Detection Services San Diego',
    description: 'Advanced leak detection in San Diego. Non-invasive technology to find hidden leaks. Protect your home from water damage.',
  },
  'bathroom-renovation': {
    title: 'Bathroom Plumbing Renovation San Diego',
    description: 'Bathroom renovation plumbing in San Diego. Fixture installation, repiping, and complete bathroom remodels. Quality craftsmanship.',
  },
  'kitchen-plumbing': {
    title: 'Kitchen Plumbing Services San Diego',
    description: 'Expert kitchen plumbing services in San Diego. Faucet installation, garbage disposals, dishwasher connections, and kitchen remodel plumbing.',
  },
  'sewer-services': {
    title: 'Sewer Line Services San Diego',
    description: 'Complete sewer line services in San Diego. Camera inspection, cleaning, repair, replacement, and trenchless sewer options. Licensed and insured.',
  },
};

/**
 * Opening hours specification for Schema.org
 */
export const OPENING_HOURS = [
  {
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '06:00',
    closes: '20:00',
  },
  {
    dayOfWeek: ['Saturday'],
    opens: '08:00',
    closes: '14:00',
  },
];

/**
 * Emergency service hours (24/7)
 */
export const EMERGENCY_HOURS = {
  dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  opens: '00:00',
  closes: '23:59',
  description: 'Emergency service available 24/7',
};

/**
 * Service offerings for Schema.org
 */
export const SERVICES_OFFERED = [
  {
    name: 'Emergency Plumbing',
    description: '24/7 emergency plumbing services for urgent issues like burst pipes, flooding, and sewer backups.',
  },
  {
    name: 'Drain Cleaning',
    description: 'Professional drain cleaning including hydro jetting, camera inspection, and root removal.',
  },
  {
    name: 'Water Heater Services',
    description: 'Water heater installation, repair, and maintenance for tank and tankless systems.',
  },
  {
    name: 'Pipe Repair & Repiping',
    description: 'Complete pipe services from minor repairs to whole-house repiping.',
  },
  {
    name: 'Leak Detection',
    description: 'Advanced leak detection technology to find and fix hidden leaks.',
  },
  {
    name: 'Bathroom Renovation',
    description: 'Full bathroom plumbing renovation and fixture installation.',
  },
];

/**
 * Helper function to format title with template
 */
export function formatTitle(title: string): string {
  if (title === SEO_DEFAULTS.defaultTitle) {
    return title;
  }
  return SEO_DEFAULTS.titleTemplate.replace('%s', title);
}

/**
 * Helper function to get page SEO config with fallbacks
 */
export function getPageSEO(pageKey: string): PageSEOConfig {
  return PAGE_SEO[pageKey] || {
    title: SEO_DEFAULTS.defaultTitle,
    description: SEO_DEFAULTS.defaultDescription,
  };
}

/**
 * Helper function to build canonical URL
 */
export function buildCanonicalUrl(path: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${SEO_DEFAULTS.siteUrl}${cleanPath}`;
}
