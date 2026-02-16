/**
 * Meta Tag Management for SEO
 *
 * This module provides components and hooks for managing document head meta tags
 * without external dependencies. It handles proper cleanup on unmount and
 * supports all essential meta tags for SEO and social sharing.
 */

import { useEffect, useRef, useCallback } from 'react';
import { SEO_DEFAULTS, formatTitle } from './constants';

/**
 * Article metadata for blog posts or project case studies
 */
export interface ArticleMeta {
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
}

/**
 * Props for the Meta component
 */
export interface MetaProps {
  /** Page title (will be formatted with site template) */
  title?: string;
  /** Meta description for search engines (max 160 chars recommended) */
  description?: string;
  /** Canonical URL for this page */
  canonical?: string;
  /** Open Graph image URL */
  ogImage?: string;
  /** Open Graph image alt text */
  ogImageAlt?: string;
  /** Set to true to prevent indexing */
  noIndex?: boolean;
  /** Set to true to prevent following links */
  noFollow?: boolean;
  /** Article-specific metadata */
  article?: ArticleMeta;
  /** Page type for Open Graph (default: website) */
  ogType?: 'website' | 'article' | 'profile' | 'product';
  /** Additional keywords (optional, less important for modern SEO) */
  keywords?: string[];
}

/**
 * Creates or updates a meta tag in the document head
 */
function setMetaTag(
  attribute: 'name' | 'property',
  attributeValue: string,
  content: string
): HTMLMetaElement {
  let element = document.querySelector<HTMLMetaElement>(
    `meta[${attribute}="${attributeValue}"]`
  );

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, attributeValue);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
  return element;
}

/**
 * Removes a meta tag from the document head
 */
function removeMetaTag(attribute: 'name' | 'property', attributeValue: string): void {
  const element = document.querySelector<HTMLMetaElement>(
    `meta[${attribute}="${attributeValue}"]`
  );
  if (element) {
    element.remove();
  }
}

/**
 * Creates or updates a link tag in the document head
 */
function setLinkTag(rel: string, href: string): HTMLLinkElement {
  let element = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);

  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }

  element.setAttribute('href', href);
  return element;
}

/**
 * Removes a link tag from the document head
 */
function removeLinkTag(rel: string): void {
  const element = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (element) {
    element.remove();
  }
}

/**
 * Tracks created tags for cleanup
 */
interface TagTracker {
  metaTags: Array<{ attribute: 'name' | 'property'; value: string }>;
  linkTags: string[];
}

/**
 * Hook for managing meta tags with automatic cleanup
 *
 * @example
 * ```tsx
 * function MyPage() {
 *   useMeta({
 *     title: 'About Us',
 *     description: 'Learn about our company and team',
 *     canonical: '/about',
 *   });
 *
 *   return <div>Page content</div>;
 * }
 * ```
 */
export function useMeta(props: MetaProps): void {
  const {
    title,
    description,
    canonical,
    ogImage,
    ogImageAlt,
    noIndex = false,
    noFollow = false,
    article,
    ogType = 'website',
    keywords,
  } = props;

  // Track created tags for cleanup
  const createdTags = useRef<TagTracker>({ metaTags: [], linkTags: [] });
  const previousTitle = useRef<string | null>(null);

  // Memoized setter functions
  const addMetaTag = useCallback(
    (attribute: 'name' | 'property', value: string, content: string) => {
      setMetaTag(attribute, value, content);
      createdTags.current.metaTags.push({ attribute, value });
    },
    []
  );

  const addLinkTag = useCallback((rel: string, href: string) => {
    setLinkTag(rel, href);
    createdTags.current.linkTags.push(rel);
  }, []);

  useEffect(() => {
    // Store original title for restoration
    if (previousTitle.current === null) {
      previousTitle.current = document.title;
    }

    // Reset tracked tags
    createdTags.current = { metaTags: [], linkTags: [] };

    // Title
    const formattedTitle = title
      ? formatTitle(title)
      : SEO_DEFAULTS.defaultTitle;
    document.title = formattedTitle;

    // Description
    const metaDescription = description || SEO_DEFAULTS.defaultDescription;
    addMetaTag('name', 'description', metaDescription);

    // Keywords (optional)
    if (keywords && keywords.length > 0) {
      addMetaTag('name', 'keywords', keywords.join(', '));
    }

    // Robots
    const robotsDirectives: string[] = [];
    if (noIndex) robotsDirectives.push('noindex');
    if (noFollow) robotsDirectives.push('nofollow');
    if (robotsDirectives.length > 0) {
      addMetaTag('name', 'robots', robotsDirectives.join(', '));
    } else {
      addMetaTag('name', 'robots', 'index, follow');
    }

    // Canonical URL
    if (canonical) {
      const canonicalUrl = canonical.startsWith('http')
        ? canonical
        : `${SEO_DEFAULTS.siteUrl}${canonical.startsWith('/') ? '' : '/'}${canonical}`;
      addLinkTag('canonical', canonicalUrl);
    }

    // Open Graph tags
    addMetaTag('property', 'og:title', formattedTitle);
    addMetaTag('property', 'og:description', metaDescription);
    addMetaTag('property', 'og:type', ogType);
    addMetaTag('property', 'og:site_name', SEO_DEFAULTS.siteName);
    addMetaTag('property', 'og:locale', SEO_DEFAULTS.openGraph.locale);

    if (canonical) {
      const canonicalUrl = canonical.startsWith('http')
        ? canonical
        : `${SEO_DEFAULTS.siteUrl}${canonical.startsWith('/') ? '' : '/'}${canonical}`;
      addMetaTag('property', 'og:url', canonicalUrl);
    } else {
      addMetaTag('property', 'og:url', SEO_DEFAULTS.siteUrl);
    }

    // Open Graph Image
    const imageUrl = ogImage || SEO_DEFAULTS.defaultOgImage;
    addMetaTag('property', 'og:image', imageUrl);
    addMetaTag('property', 'og:image:width', '1200');
    addMetaTag('property', 'og:image:height', '630');
    if (ogImageAlt) {
      addMetaTag('property', 'og:image:alt', ogImageAlt);
    }

    // Twitter Card tags
    addMetaTag('name', 'twitter:card', 'summary_large_image');
    addMetaTag('name', 'twitter:title', formattedTitle);
    addMetaTag('name', 'twitter:description', metaDescription);
    addMetaTag('name', 'twitter:image', imageUrl);

    // Article-specific meta tags
    if (article && ogType === 'article') {
      if (article.publishedTime) {
        addMetaTag('property', 'article:published_time', article.publishedTime);
      }
      if (article.modifiedTime) {
        addMetaTag('property', 'article:modified_time', article.modifiedTime);
      }
      if (article.author) {
        addMetaTag('property', 'article:author', article.author);
      }
      if (article.section) {
        addMetaTag('property', 'article:section', article.section);
      }
      if (article.tags) {
        article.tags.forEach((tag) => {
          addMetaTag('property', 'article:tag', tag);
        });
      }
    }

    // Geo tags for local business
    addMetaTag('name', 'geo.region', `${SEO_DEFAULTS.address.addressCountry}-${SEO_DEFAULTS.address.addressRegion}`);
    addMetaTag('name', 'geo.placename', SEO_DEFAULTS.address.addressLocality);
    addMetaTag('name', 'geo.position', `${SEO_DEFAULTS.geo.latitude};${SEO_DEFAULTS.geo.longitude}`);
    addMetaTag('name', 'ICBM', `${SEO_DEFAULTS.geo.latitude}, ${SEO_DEFAULTS.geo.longitude}`);

    // Cleanup function
    return () => {
      // Remove all created meta tags
      createdTags.current.metaTags.forEach(({ attribute, value }) => {
        removeMetaTag(attribute, value);
      });

      // Remove all created link tags
      createdTags.current.linkTags.forEach((rel) => {
        removeLinkTag(rel);
      });

      // Restore original title if available
      if (previousTitle.current !== null) {
        document.title = previousTitle.current;
      }
    };
  }, [
    title,
    description,
    canonical,
    ogImage,
    ogImageAlt,
    noIndex,
    noFollow,
    article,
    ogType,
    keywords,
    addMetaTag,
    addLinkTag,
  ]);
}

/**
 * Component wrapper for useMeta hook
 *
 * @example
 * ```tsx
 * function MyPage() {
 *   return (
 *     <>
 *       <Meta
 *         title="About Us"
 *         description="Learn about our company"
 *         canonical="/about"
 *       />
 *       <div>Page content</div>
 *     </>
 *   );
 * }
 * ```
 */
export function Meta(props: MetaProps): null {
  useMeta(props);
  return null;
}

/**
 * Sets essential viewport and charset meta tags.
 * Should be called once at application startup.
 *
 * @example
 * ```tsx
 * // In your main.tsx or App.tsx
 * initializeBaseMeta();
 * ```
 */
export function initializeBaseMeta(): void {
  // Ensure charset is set
  if (!document.querySelector('meta[charset]')) {
    const charset = document.createElement('meta');
    charset.setAttribute('charset', 'utf-8');
    document.head.insertBefore(charset, document.head.firstChild);
  }

  // Ensure viewport is set for mobile
  if (!document.querySelector('meta[name="viewport"]')) {
    const viewport = document.createElement('meta');
    viewport.setAttribute('name', 'viewport');
    viewport.setAttribute(
      'content',
      'width=device-width, initial-scale=1, shrink-to-fit=no'
    );
    document.head.appendChild(viewport);
  }

  // Theme color for mobile browsers (navy-900, matches index.html)
  setMetaTag('name', 'theme-color', '#0B1D33');

  // Apple-specific meta tags
  setMetaTag('name', 'apple-mobile-web-app-capable', 'yes');
  setMetaTag('name', 'apple-mobile-web-app-status-bar-style', 'default');
  setMetaTag('name', 'apple-mobile-web-app-title', SEO_DEFAULTS.siteName);

  // Microsoft tile color
  setMetaTag('name', 'msapplication-TileColor', '#0B1D33');

  // Format detection (disable automatic phone number detection on iOS)
  setMetaTag('name', 'format-detection', 'telephone=no');
}

/**
 * Default export for convenient imports
 */
export default Meta;
