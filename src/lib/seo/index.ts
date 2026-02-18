/**
 * SEO Module - Christensen Plumbing Co.
 *
 * This module exports all SEO-related utilities, components, and constants
 * for managing search engine optimization across the website.
 *
 * @example
 * ```tsx
 * // Import everything you need from the seo module
 * import {
 *   Meta,
 *   useMeta,
 *   LocalBusinessSchema,
 *   AggregateRatingSchema,
 *   SEO_DEFAULTS,
 *   PAGE_SEO,
 *   generateSitemap,
 * } from '@/lib/seo';
 *
 * // Use in your components
 * function HomePage() {
 *   return (
 *     <>
 *       <Meta
 *         title={PAGE_SEO.home.title}
 *         description={PAGE_SEO.home.description}
 *         canonical="/"
 *       />
 *       <LocalBusinessSchema />
 *       <AggregateRatingSchema rating={4.9} reviewCount={247} />
 *       {/* Page content *\/}
 *     </>
 *   );
 * }
 * ```
 */

// Constants and configuration
export {
  SEO_DEFAULTS,
  PAGE_SEO,
  SERVICE_SEO,
  OPENING_HOURS,
  EMERGENCY_HOURS,
  SERVICES_OFFERED,
  formatTitle,
  getPageSEO,
  buildCanonicalUrl,
} from './constants';

export type {
  Address,
  GeoCoordinates,
  SocialLinks,
  OpenGraphDefaults,
  SEODefaults,
  PageSEOConfig,
} from './constants';

// Meta tag management
export {
  Meta,
  useMeta,
  initializeBaseMeta,
} from './meta';

export type {
  MetaProps,
  ArticleMeta,
} from './meta';

// Structured data (JSON-LD)
export {
  LocalBusinessSchema,
  AggregateRatingSchema,
  ReviewSchema,
  ServiceSchema,
  SingleServiceSchema,
  BreadcrumbSchema,
  ProjectSchema,
  FAQSchema,
  WebsiteSchema,
  WebPageSchema,
  OrganizationSchema,
  MainSchemas,
  AreaPlumberSchema,
  HowToSchema,
  BlogPostingSchema,
} from './structured-data';

export type {
  AggregateRatingSchemaProps,
  Review,
  ReviewSchemaProps,
  Service,
  ServiceSchemaProps,
  SingleServiceSchemaProps,
  BreadcrumbItem,
  BreadcrumbSchemaProps,
  Project,
  ProjectSchemaProps,
  FAQItem,
  FAQSchemaProps,
  WebPageSchemaProps,
  MainSchemasProps,
  AreaPlumberSchemaProps,
  HowToStep,
  HowToSchemaProps,
  BlogPostingSchemaProps,
} from './structured-data';

// Page SEO component (combines meta + schemas)
export {
  PageSEO,
  HOME_SEO,
  REVIEWS_SEO,
  PORTFOLIO_SEO,
  ABOUT_SEO,
  EMERGENCY_SEO,
  CONTACT_SEO,
} from './PageSEO';

export type { PageSEOProps } from './PageSEO';

// Sitemap generation
export {
  generateSitemap,
  generateImageSitemap,
  generateFullSitemap,
  generateSitemapIndex,
  generateProjectEntries,
  getCurrentDate,
  getStaticPagesWithDates,
  STATIC_PAGES,
  SERVICE_PAGES,
  AREA_PAGES,
} from './sitemap';

export type {
  ChangeFrequency,
  SitemapEntry,
  SitemapImage,
  SitemapEntryWithImages,
} from './sitemap';
