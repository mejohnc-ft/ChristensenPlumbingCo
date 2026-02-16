/**
 * Page SEO Component
 *
 * Combines Meta tags, Structured Data, and Breadcrumbs for complete page SEO.
 * Use this component at the top of each page for consistent SEO.
 */

import { useMeta, MetaProps } from './meta';
import { LocalBusinessSchema, BreadcrumbSchema, SingleServiceSchema, WebPageSchema } from './structured-data';
import { getPageSEO, SERVICE_SEO, buildCanonicalUrl } from './constants';

export interface PageSEOProps extends Omit<MetaProps, 'canonical'> {
  /** Page identifier for pre-configured SEO */
  page?: string;
  /** Service slug for service pages */
  service?: string;
  /** URL path for canonical (auto-built) */
  path: string;
  /** Breadcrumb items (name and url) */
  breadcrumbs?: Array<{
    name: string;
    url: string;
  }>;
  /** Include LocalBusiness schema */
  includeLocalBusiness?: boolean;
  /** Include WebPage schema */
  includeWebPage?: boolean;
}

/**
 * Complete SEO component for pages
 *
 * @example
 * ```tsx
 * // Home page
 * <PageSEO page="home" path="/" includeLocalBusiness />
 *
 * // Service page
 * <PageSEO
 *   service="emergency-plumbing"
 *   path="/services/emergency-plumbing"
 *   breadcrumbs={[
 *     { name: 'Home', path: '/' },
 *     { name: 'Services', path: '/services' },
 *     { name: 'Emergency Plumbing', path: '/services/emergency-plumbing' },
 *   ]}
 * />
 *
 * // Custom page
 * <PageSEO
 *   title="Custom Page Title"
 *   description="Custom description"
 *   path="/custom-page"
 * />
 * ```
 */
export function PageSEO({
  page,
  service,
  path,
  breadcrumbs,
  includeLocalBusiness = false,
  includeWebPage = true,
  title,
  description,
  keywords,
  ogImage,
  ...metaProps
}: PageSEOProps): JSX.Element {
  // Get pre-configured SEO if page or service specified
  let seoConfig: Partial<MetaProps> = {};

  if (page) {
    seoConfig = getPageSEO(page);
  } else if (service && SERVICE_SEO[service]) {
    seoConfig = SERVICE_SEO[service];
  }

  // Merge with custom props (custom props override pre-configured)
  const finalTitle = title || seoConfig.title;
  const finalDescription = description || seoConfig.description;
  const finalKeywords = keywords || seoConfig.keywords;
  const canonicalUrl = buildCanonicalUrl(path);

  // Use meta hook
  useMeta({
    title: finalTitle,
    description: finalDescription,
    keywords: finalKeywords,
    canonical: canonicalUrl,
    ogImage,
    ...metaProps,
  });

  return (
    <>
      {/* LocalBusiness Schema for home/main pages */}
      {includeLocalBusiness && <LocalBusinessSchema />}

      {/* WebPage Schema */}
      {includeWebPage && (
        <WebPageSchema
          name={finalTitle}
          description={finalDescription}
          url={canonicalUrl}
        />
      )}

      {/* Service Schema for service pages */}
      {service && SERVICE_SEO[service] && (
        <SingleServiceSchema
          name={SERVICE_SEO[service].title || service}
          description={SERVICE_SEO[service].description || ''}
          url={canonicalUrl}
        />
      )}

      {/* Breadcrumb Schema */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <BreadcrumbSchema items={breadcrumbs} />
      )}
    </>
  );
}

/**
 * Pre-built SEO configs for common pages
 */
export const HOME_SEO: PageSEOProps = {
  page: 'home',
  path: '/',
  includeLocalBusiness: true,
  includeWebPage: true,
};

export const REVIEWS_SEO: PageSEOProps = {
  page: 'reviews',
  path: '/reviews',
  breadcrumbs: [
    { name: 'Home', url: '/' },
    { name: 'Reviews', url: '/reviews' },
  ],
};

export const PORTFOLIO_SEO: PageSEOProps = {
  page: 'portfolio',
  path: '/portfolio',
  breadcrumbs: [
    { name: 'Home', url: '/' },
    { name: 'Our Work', url: '/portfolio' },
  ],
};

export const ABOUT_SEO: PageSEOProps = {
  page: 'about',
  path: '/about',
  breadcrumbs: [
    { name: 'Home', url: '/' },
    { name: 'About Us', url: '/about' },
  ],
};

export const EMERGENCY_SEO: PageSEOProps = {
  page: 'emergency',
  path: '/emergency',
  breadcrumbs: [
    { name: 'Home', url: '/' },
    { name: '24/7 Emergency', url: '/emergency' },
  ],
};

export const CONTACT_SEO: PageSEOProps = {
  page: 'contact',
  path: '/contact',
  breadcrumbs: [
    { name: 'Home', url: '/' },
    { name: 'Contact Us', url: '/contact' },
  ],
};

export default PageSEO;
