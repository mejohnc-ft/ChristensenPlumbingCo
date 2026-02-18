/**
 * Schema.org Structured Data Components
 *
 * This module provides React components for generating JSON-LD structured data
 * that helps search engines understand your content better. These schemas are
 * critical for local SEO and rich search results.
 */

import React from 'react';
import {
  SEO_DEFAULTS,
  OPENING_HOURS,
  SERVICES_OFFERED,
  buildCanonicalUrl,
} from './constants';

/**
 * Helper function to safely serialize JSON for injection into script tags.
 * Escapes characters that could break out of the script context.
 */
function safeJsonStringify(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026');
}

/**
 * Base component for rendering JSON-LD script tags
 */
interface JsonLdProps {
  data: Record<string, unknown>;
}

function JsonLd({ data }: JsonLdProps): React.ReactElement {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJsonStringify(data) }}
    />
  );
}

/**
 * Local Business Schema for Plumber
 *
 * This is the most important schema for local SEO. It provides search engines
 * with detailed information about the business including location, hours,
 * contact info, and services.
 *
 * @example
 * ```tsx
 * // In your App.tsx or layout component
 * <LocalBusinessSchema />
 * ```
 */
export function LocalBusinessSchema(): React.ReactElement {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Plumber',
    '@id': `${SEO_DEFAULTS.siteUrl}/#organization`,
    name: SEO_DEFAULTS.siteName,
    alternateName: 'Christensen Plumbing',
    description: SEO_DEFAULTS.defaultDescription,
    url: SEO_DEFAULTS.siteUrl,
    telephone: SEO_DEFAULTS.phoneE164,
    email: SEO_DEFAULTS.email,
    image: SEO_DEFAULTS.logoUrl,
    logo: {
      '@type': 'ImageObject',
      url: SEO_DEFAULTS.logoUrl,
      width: 512,
      height: 512,
    },
    priceRange: SEO_DEFAULTS.priceRange,
    currenciesAccepted: 'USD',
    paymentAccepted: 'Cash, Credit Card, Check',
    foundingDate: SEO_DEFAULTS.foundingYear.toString(),
    address: {
      '@type': 'PostalAddress',
      streetAddress: SEO_DEFAULTS.address.streetAddress,
      addressLocality: SEO_DEFAULTS.address.addressLocality,
      addressRegion: SEO_DEFAULTS.address.addressRegion,
      postalCode: SEO_DEFAULTS.address.postalCode,
      addressCountry: SEO_DEFAULTS.address.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SEO_DEFAULTS.geo.latitude,
      longitude: SEO_DEFAULTS.geo.longitude,
    },
    openingHoursSpecification: OPENING_HOURS.map((hours) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: hours.dayOfWeek,
      opens: hours.opens,
      closes: hours.closes,
    })),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Plumbing Services',
      itemListElement: SERVICES_OFFERED.map((service, index) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.name,
          description: service.description,
        },
        position: index + 1,
      })),
    },
    areaServed: SEO_DEFAULTS.serviceAreaCities.map((city) => ({
      '@type': 'City',
      name: city,
      containedInPlace: {
        '@type': 'AdministrativeArea',
        name: 'San Diego County',
        containedInPlace: {
          '@type': 'State',
          name: 'California',
        },
      },
    })),
    serviceArea: {
      '@type': 'AdministrativeArea',
      name: 'San Diego County',
      containedInPlace: {
        '@type': 'State',
        name: 'California',
        containedInPlace: {
          '@type': 'Country',
          name: 'United States',
        },
      },
    },
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Contractor License',
      recognizedBy: {
        '@type': 'GovernmentOrganization',
        name: 'Contractors State License Board',
        url: 'https://www.cslb.ca.gov/',
      },
    },
    sameAs: [
      SEO_DEFAULTS.socialLinks.facebook,
      SEO_DEFAULTS.socialLinks.google,
      SEO_DEFAULTS.socialLinks.yelp,
    ],
    knowsAbout: [
      'Plumbing',
      'Drain Cleaning',
      'Water Heater Installation',
      'Pipe Repair',
      'Leak Detection',
      'Emergency Plumbing',
      'Bathroom Renovation',
      'Repiping',
    ],
    slogan: 'Your Trusted San Diego Plumber',
    isAcceptingNewCustomers: true,
  };

  return <JsonLd data={schema} />;
}

/**
 * Props for AggregateRating schema
 */
export interface AggregateRatingSchemaProps {
  /** Average rating (e.g., 4.9) */
  rating: number;
  /** Total number of reviews */
  reviewCount: number;
  /** Best possible rating (default: 5) */
  bestRating?: number;
  /** Worst possible rating (default: 1) */
  worstRating?: number;
}

/**
 * Aggregate Rating Schema
 *
 * Displays star ratings in search results. Critical for building trust
 * and improving click-through rates.
 *
 * @example
 * ```tsx
 * <AggregateRatingSchema rating={4.9} reviewCount={247} />
 * ```
 */
export function AggregateRatingSchema({
  rating,
  reviewCount,
  bestRating = 5,
  worstRating = 1,
}: AggregateRatingSchemaProps): React.ReactElement {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Plumber',
    '@id': `${SEO_DEFAULTS.siteUrl}/#organization`,
    name: SEO_DEFAULTS.siteName,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: rating.toString(),
      reviewCount: reviewCount.toString(),
      bestRating: bestRating.toString(),
      worstRating: worstRating.toString(),
    },
  };

  return <JsonLd data={schema} />;
}

/**
 * Individual review structure
 */
export interface Review {
  /** Reviewer's name */
  author: string;
  /** Review text/body */
  reviewBody: string;
  /** Rating given (1-5) */
  rating: number;
  /** Date of the review (ISO format) */
  datePublished: string;
  /** Location of the reviewer (optional) */
  location?: string;
}

/**
 * Props for Review schema
 */
export interface ReviewSchemaProps {
  /** Array of reviews to display */
  reviews: Review[];
}

/**
 * Review Schema
 *
 * Provides individual review data for rich snippets.
 *
 * @example
 * ```tsx
 * <ReviewSchema reviews={[
 *   {
 *     author: 'John Smith',
 *     reviewBody: 'Excellent service!',
 *     rating: 5,
 *     datePublished: '2024-01-15',
 *   }
 * ]} />
 * ```
 */
export function ReviewSchema({ reviews }: ReviewSchemaProps): React.ReactElement {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Plumber',
    '@id': `${SEO_DEFAULTS.siteUrl}/#organization`,
    name: SEO_DEFAULTS.siteName,
    review: reviews.map((review) => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: review.author,
      },
      reviewBody: review.reviewBody,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: review.rating.toString(),
        bestRating: '5',
        worstRating: '1',
      },
      datePublished: review.datePublished,
    })),
  };

  return <JsonLd data={schema} />;
}

/**
 * Service structure for schema
 */
export interface Service {
  /** Service name */
  name: string;
  /** Service description */
  description: string;
  /** Service URL (optional) */
  url?: string;
  /** Service image URL (optional) */
  image?: string;
  /** Provider information (optional, defaults to business) */
  provider?: string;
  /** Service area covered (optional) */
  areaServed?: string;
}

/**
 * Props for Service schema
 */
export interface ServiceSchemaProps {
  /** Array of services offered */
  services: Service[];
}

/**
 * Service Schema
 *
 * Describes the services offered by the business. Helps search engines
 * understand what the business does and can improve visibility for
 * service-related queries.
 *
 * @example
 * ```tsx
 * <ServiceSchema services={[
 *   { name: 'Drain Cleaning', description: 'Professional drain cleaning services' },
 *   { name: 'Water Heater Repair', description: 'Expert water heater repair' },
 * ]} />
 * ```
 */
export function ServiceSchema({ services }: ServiceSchemaProps): React.ReactElement {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Plumbing Services',
    description: 'Professional plumbing services offered by Christensen Plumbing Co.',
    itemListElement: services.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        name: service.name,
        description: service.description,
        url: service.url || SEO_DEFAULTS.siteUrl,
        image: service.image || SEO_DEFAULTS.logoUrl,
        provider: {
          '@type': 'Plumber',
          name: service.provider || SEO_DEFAULTS.siteName,
          '@id': `${SEO_DEFAULTS.siteUrl}/#organization`,
        },
        areaServed: {
          '@type': 'City',
          name: service.areaServed || SEO_DEFAULTS.address.addressLocality,
        },
        serviceType: 'Plumbing',
      },
    })),
  };

  return <JsonLd data={schema} />;
}

/**
 * Breadcrumb item structure
 */
export interface BreadcrumbItem {
  /** Display name for the breadcrumb */
  name: string;
  /** URL path (can be relative or absolute) */
  url: string;
}

/**
 * Props for Breadcrumb schema
 */
export interface BreadcrumbSchemaProps {
  /** Array of breadcrumb items from root to current page */
  items: BreadcrumbItem[];
}

/**
 * Breadcrumb Schema
 *
 * Provides navigation context to search engines. Breadcrumbs may appear
 * in search results, making the site structure visible to users.
 *
 * @example
 * ```tsx
 * <BreadcrumbSchema items={[
 *   { name: 'Home', url: '/' },
 *   { name: 'Services', url: '/services' },
 *   { name: 'Drain Cleaning', url: '/services/drain-cleaning' },
 * ]} />
 * ```
 */
export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps): React.ReactElement {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : buildCanonicalUrl(item.url),
    })),
  };

  return <JsonLd data={schema} />;
}

/**
 * Project/portfolio item structure
 */
export interface Project {
  /** Project title */
  title: string;
  /** Project description */
  description: string;
  /** Main image URL */
  image: string;
  /** Additional images (optional) */
  images?: string[];
  /** Date completed (ISO format) */
  dateCompleted?: string;
  /** Project type/category */
  category?: string;
  /** Location where work was done */
  location?: string;
  /** URL to project detail page (optional) */
  url?: string;
}

/**
 * Props for Project schema
 */
export interface ProjectSchemaProps {
  /** Project data */
  project: Project;
}

/**
 * Project/Article Schema
 *
 * Used for portfolio case studies and project showcases. Helps content
 * appear in rich results and image search.
 *
 * @example
 * ```tsx
 * <ProjectSchema project={{
 *   title: 'Kitchen Repiping Project',
 *   description: 'Complete copper repiping for 3-bedroom home',
 *   image: '/images/projects/kitchen-repipe.jpg',
 *   dateCompleted: '2024-01-10',
 *   category: 'Repiping',
 *   location: 'La Jolla',
 * }} />
 * ```
 */
export function ProjectSchema({ project }: ProjectSchemaProps): React.ReactElement {
  const allImages = project.images
    ? [project.image, ...project.images]
    : [project.image];

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: project.title,
    description: project.description,
    image: allImages,
    datePublished: project.dateCompleted,
    dateModified: project.dateCompleted,
    author: {
      '@type': 'Organization',
      name: SEO_DEFAULTS.siteName,
      url: SEO_DEFAULTS.siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: SEO_DEFAULTS.siteName,
      logo: {
        '@type': 'ImageObject',
        url: SEO_DEFAULTS.logoUrl,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': project.url || SEO_DEFAULTS.siteUrl,
    },
    about: {
      '@type': 'Service',
      name: project.category || 'Plumbing Service',
      provider: {
        '@type': 'Plumber',
        name: SEO_DEFAULTS.siteName,
      },
    },
    contentLocation: {
      '@type': 'Place',
      name: project.location || SEO_DEFAULTS.address.addressLocality,
    },
  };

  return <JsonLd data={schema} />;
}

/**
 * FAQ item structure
 */
export interface FAQItem {
  /** The question */
  question: string;
  /** The answer */
  answer: string;
}

/**
 * Props for FAQ schema
 */
export interface FAQSchemaProps {
  /** Array of FAQ items */
  items: FAQItem[];
}

/**
 * FAQ Schema
 *
 * Enables FAQ rich results in search. Very valuable for capturing
 * featured snippets and voice search results.
 *
 * @example
 * ```tsx
 * <FAQSchema items={[
 *   {
 *     question: 'Do you offer 24/7 emergency service?',
 *     answer: 'Yes, we offer 24/7 emergency plumbing services throughout San Diego County.',
 *   },
 *   {
 *     question: 'What areas do you serve?',
 *     answer: 'We serve all of San Diego County, from Oceanside to Chula Vista.',
 *   },
 * ]} />
 * ```
 */
export function FAQSchema({ items }: FAQSchemaProps): React.ReactElement {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return <JsonLd data={schema} />;
}

/**
 * Website Schema
 *
 * Provides information about the website itself, including search
 * functionality. Can enable sitelinks search box in results.
 *
 * @example
 * ```tsx
 * <WebsiteSchema />
 * ```
 */
export function WebsiteSchema(): React.ReactElement {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SEO_DEFAULTS.siteUrl}/#website`,
    url: SEO_DEFAULTS.siteUrl,
    name: SEO_DEFAULTS.siteName,
    description: SEO_DEFAULTS.defaultDescription,
    publisher: {
      '@id': `${SEO_DEFAULTS.siteUrl}/#organization`,
    },
    inLanguage: 'en-US',
  };

  return <JsonLd data={schema} />;
}

/**
 * Organization Schema
 *
 * Provides detailed organization information. Complements LocalBusiness
 * schema with additional organizational details.
 *
 * @example
 * ```tsx
 * <OrganizationSchema />
 * ```
 */
export function OrganizationSchema(): React.ReactElement {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SEO_DEFAULTS.siteUrl}/#organization`,
    name: SEO_DEFAULTS.siteName,
    url: SEO_DEFAULTS.siteUrl,
    logo: SEO_DEFAULTS.logoUrl,
    image: SEO_DEFAULTS.defaultOgImage,
    description: SEO_DEFAULTS.defaultDescription,
    email: SEO_DEFAULTS.email,
    telephone: SEO_DEFAULTS.phoneE164,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SEO_DEFAULTS.address.streetAddress,
      addressLocality: SEO_DEFAULTS.address.addressLocality,
      addressRegion: SEO_DEFAULTS.address.addressRegion,
      postalCode: SEO_DEFAULTS.address.postalCode,
      addressCountry: SEO_DEFAULTS.address.addressCountry,
    },
    sameAs: [
      SEO_DEFAULTS.socialLinks.facebook,
      SEO_DEFAULTS.socialLinks.google,
      SEO_DEFAULTS.socialLinks.yelp,
    ],
    foundingDate: SEO_DEFAULTS.foundingYear.toString(),
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      minValue: 1,
      maxValue: 1,
    },
    slogan: 'Your Trusted San Diego Plumber',
  };

  return <JsonLd data={schema} />;
}

/**
 * Combined schemas for the main page
 *
 * Renders all essential schemas together for convenience.
 *
 * @example
 * ```tsx
 * // In your App.tsx or layout
 * <MainSchemas rating={4.9} reviewCount={247} />
 * ```
 */
export interface MainSchemasProps {
  /** Average rating for the business */
  rating?: number;
  /** Total review count */
  reviewCount?: number;
}

export function MainSchemas({
  rating = 4.9,
  reviewCount = 200,
}: MainSchemasProps): React.ReactElement {
  return (
    <>
      <WebsiteSchema />
      <LocalBusinessSchema />
      <AggregateRatingSchema rating={rating} reviewCount={reviewCount} />
    </>
  );
}

/**
 * WebPage Schema Props
 */
export interface WebPageSchemaProps {
  /** Page name/title */
  name?: string;
  /** Page description */
  description?: string;
  /** Page URL */
  url?: string;
}

/**
 * WebPage Schema
 *
 * Basic schema for any web page. Helps search engines understand the page type.
 *
 * @example
 * ```tsx
 * <WebPageSchema name="About Us" description="Learn about our company" url="/about" />
 * ```
 */
export function WebPageSchema({
  name = SEO_DEFAULTS.defaultTitle,
  description = SEO_DEFAULTS.defaultDescription,
  url = SEO_DEFAULTS.siteUrl,
}: WebPageSchemaProps): React.ReactElement {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    description,
    url: url.startsWith('http') ? url : buildCanonicalUrl(url),
    isPartOf: {
      '@id': `${SEO_DEFAULTS.siteUrl}/#website`,
    },
    about: {
      '@id': `${SEO_DEFAULTS.siteUrl}/#organization`,
    },
    inLanguage: 'en-US',
  };

  return <JsonLd data={schema} />;
}

/**
 * Area-specific Plumber schema with GeoCoordinates
 */
export interface AreaPlumberSchemaProps {
  /** City name */
  cityName: string;
  /** Latitude */
  latitude: number;
  /** Longitude */
  longitude: number;
}

export function AreaPlumberSchema({ cityName, latitude, longitude }: AreaPlumberSchemaProps): React.ReactElement {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Plumber',
    '@id': `${SEO_DEFAULTS.siteUrl}/#organization`,
    name: SEO_DEFAULTS.siteName,
    url: SEO_DEFAULTS.siteUrl,
    telephone: SEO_DEFAULTS.phoneE164,
    areaServed: {
      '@type': 'City',
      name: cityName,
      containedInPlace: {
        '@type': 'State',
        name: 'California',
      },
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude,
      longitude,
    },
  };

  return <JsonLd data={schema} />;
}

/**
 * Single Service Schema Props
 */
export interface SingleServiceSchemaProps {
  /** Service name */
  name: string;
  /** Service description */
  description: string;
  /** Service URL (optional) */
  url?: string;
}

/**
 * Single Service Schema
 *
 * For individual service pages.
 */
/**
 * HowTo Schema Props
 */
export interface HowToStep {
  name: string;
  text: string;
}

export interface HowToSchemaProps {
  /** Title of the how-to guide */
  name: string;
  /** Description of what this how-to achieves */
  description: string;
  /** Steps to complete the task */
  steps: HowToStep[];
}

/**
 * HowTo Schema
 *
 * Enables how-to rich results and featured snippets.
 */
export function HowToSchema({ name, description, steps }: HowToSchemaProps): React.ReactElement {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };

  return <JsonLd data={schema} />;
}

/**
 * BlogPosting Schema Props
 */
export interface BlogPostingSchemaProps {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
  image?: string;
  tags?: string[];
}

/**
 * BlogPosting Schema
 *
 * For individual blog post pages. Enables article rich results.
 */
export function BlogPostingSchema({
  title,
  description,
  url,
  datePublished,
  dateModified,
  authorName = 'Christensen Plumbing',
  image,
  tags,
}: BlogPostingSchemaProps): React.ReactElement {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    url: url.startsWith('http') ? url : buildCanonicalUrl(url),
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Person',
      name: authorName,
    },
    publisher: {
      '@type': 'Organization',
      name: SEO_DEFAULTS.siteName,
      logo: {
        '@type': 'ImageObject',
        url: SEO_DEFAULTS.logoUrl,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url.startsWith('http') ? url : buildCanonicalUrl(url),
    },
  };

  if (image) schema.image = image;
  if (tags?.length) schema.keywords = tags.join(', ');

  return <JsonLd data={schema} />;
}

export function SingleServiceSchema({
  name,
  description,
  url,
}: SingleServiceSchemaProps): React.ReactElement {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url: url ? (url.startsWith('http') ? url : buildCanonicalUrl(url)) : SEO_DEFAULTS.siteUrl,
    provider: {
      '@type': 'Plumber',
      name: SEO_DEFAULTS.siteName,
      '@id': `${SEO_DEFAULTS.siteUrl}/#organization`,
    },
    areaServed: {
      '@type': 'City',
      name: SEO_DEFAULTS.address.addressLocality,
    },
    serviceType: 'Plumbing',
  };

  return <JsonLd data={schema} />;
}
