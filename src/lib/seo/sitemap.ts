/**
 * Sitemap Generation Utilities
 *
 * This module provides helpers for generating XML sitemaps that help
 * search engines discover and index all pages on the site.
 */

import { SEO_DEFAULTS } from './constants';

/**
 * Change frequency values as defined by the Sitemap protocol
 */
export type ChangeFrequency =
  | 'always'
  | 'hourly'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'yearly'
  | 'never';

/**
 * Single sitemap entry structure
 */
export interface SitemapEntry {
  /** URL path (can be relative or absolute) */
  loc: string;
  /** Last modification date (ISO 8601 format) */
  lastmod?: string;
  /** How frequently the page is likely to change */
  changefreq?: ChangeFrequency;
  /** Priority of this URL relative to others (0.0 to 1.0) */
  priority?: number;
}

/**
 * Image sitemap entry for enhanced image SEO
 */
export interface SitemapImage {
  /** Image URL */
  loc: string;
  /** Image caption */
  caption?: string;
  /** Geographic location */
  geoLocation?: string;
  /** Image title */
  title?: string;
  /** Image license URL */
  license?: string;
}

/**
 * Extended sitemap entry with image support
 */
export interface SitemapEntryWithImages extends SitemapEntry {
  /** Images on this page */
  images?: SitemapImage[];
}

/**
 * Escapes special XML characters in a string
 */
function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Normalizes a URL path to a full URL
 */
function normalizeUrl(path: string): string {
  if (path.startsWith('http')) {
    return path;
  }
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${SEO_DEFAULTS.siteUrl}${cleanPath}`;
}

/**
 * Formats a date for sitemap (W3C Datetime format)
 */
function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toISOString().split('T')[0];
}

/**
 * Generates an XML sitemap string from entries
 *
 * @example
 * ```typescript
 * const sitemap = generateSitemap([
 *   { loc: '/', changefreq: 'weekly', priority: 1.0 },
 *   { loc: '/services', changefreq: 'monthly', priority: 0.8 },
 * ]);
 * ```
 *
 * @param entries - Array of sitemap entries
 * @returns XML sitemap string
 */
export function generateSitemap(entries: SitemapEntry[]): string {
  const urlElements = entries
    .map((entry) => {
      const lines: string[] = ['  <url>'];

      // Location (required)
      lines.push(`    <loc>${escapeXml(normalizeUrl(entry.loc))}</loc>`);

      // Last modified (optional)
      if (entry.lastmod) {
        lines.push(`    <lastmod>${formatDate(entry.lastmod)}</lastmod>`);
      }

      // Change frequency (optional)
      if (entry.changefreq) {
        lines.push(`    <changefreq>${entry.changefreq}</changefreq>`);
      }

      // Priority (optional)
      if (entry.priority !== undefined) {
        lines.push(`    <priority>${entry.priority.toFixed(1)}</priority>`);
      }

      lines.push('  </url>');
      return lines.join('\n');
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlElements}
</urlset>`;
}

/**
 * Generates an XML sitemap with image extensions
 *
 * @example
 * ```typescript
 * const sitemap = generateImageSitemap([
 *   {
 *     loc: '/portfolio',
 *     images: [
 *       { loc: '/images/project1.jpg', title: 'Kitchen Repiping' },
 *       { loc: '/images/project2.jpg', title: 'Bathroom Renovation' },
 *     ],
 *   },
 * ]);
 * ```
 *
 * @param entries - Array of sitemap entries with images
 * @returns XML sitemap string with image namespace
 */
export function generateImageSitemap(entries: SitemapEntryWithImages[]): string {
  const urlElements = entries
    .map((entry) => {
      const lines: string[] = ['  <url>'];

      // Location (required)
      lines.push(`    <loc>${escapeXml(normalizeUrl(entry.loc))}</loc>`);

      // Last modified (optional)
      if (entry.lastmod) {
        lines.push(`    <lastmod>${formatDate(entry.lastmod)}</lastmod>`);
      }

      // Change frequency (optional)
      if (entry.changefreq) {
        lines.push(`    <changefreq>${entry.changefreq}</changefreq>`);
      }

      // Priority (optional)
      if (entry.priority !== undefined) {
        lines.push(`    <priority>${entry.priority.toFixed(1)}</priority>`);
      }

      // Images
      if (entry.images && entry.images.length > 0) {
        entry.images.forEach((image) => {
          lines.push('    <image:image>');
          lines.push(`      <image:loc>${escapeXml(normalizeUrl(image.loc))}</image:loc>`);
          if (image.caption) {
            lines.push(`      <image:caption>${escapeXml(image.caption)}</image:caption>`);
          }
          if (image.title) {
            lines.push(`      <image:title>${escapeXml(image.title)}</image:title>`);
          }
          if (image.geoLocation) {
            lines.push(`      <image:geo_location>${escapeXml(image.geoLocation)}</image:geo_location>`);
          }
          if (image.license) {
            lines.push(`      <image:license>${escapeXml(image.license)}</image:license>`);
          }
          lines.push('    </image:image>');
        });
      }

      lines.push('  </url>');
      return lines.join('\n');
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urlElements}
</urlset>`;
}

/**
 * Static pages for the sitemap
 *
 * These are the core pages that should always be in the sitemap.
 */
export const STATIC_PAGES: SitemapEntry[] = [
  {
    loc: '/',
    changefreq: 'weekly',
    priority: 1.0,
  },
  {
    loc: '/reviews',
    changefreq: 'weekly',
    priority: 0.8,
  },
  {
    loc: '/portfolio',
    changefreq: 'weekly',
    priority: 0.8,
  },
  {
    loc: '/about',
    changefreq: 'monthly',
    priority: 0.7,
  },
  {
    loc: '/emergency',
    changefreq: 'monthly',
    priority: 0.9,
  },
  {
    loc: '/services',
    changefreq: 'monthly',
    priority: 0.8,
  },
  {
    loc: '/faq',
    changefreq: 'monthly',
    priority: 0.6,
  },
  {
    loc: '/contact',
    changefreq: 'monthly',
    priority: 0.8,
  },
];

/**
 * Service pages for the sitemap
 *
 * Individual service pages for better SEO targeting.
 */
export const SERVICE_PAGES: SitemapEntry[] = [
  { loc: '/services/emergency-plumbing', changefreq: 'monthly', priority: 0.9 },
  { loc: '/services/drain-cleaning', changefreq: 'monthly', priority: 0.8 },
  { loc: '/services/water-heaters', changefreq: 'monthly', priority: 0.8 },
  { loc: '/services/pipe-repair', changefreq: 'monthly', priority: 0.8 },
  { loc: '/services/leak-detection', changefreq: 'monthly', priority: 0.8 },
  { loc: '/services/bathroom-renovation', changefreq: 'monthly', priority: 0.7 },
  { loc: '/services/kitchen-plumbing', changefreq: 'monthly', priority: 0.7 },
  { loc: '/services/sewer-services', changefreq: 'monthly', priority: 0.7 },
];

/**
 * Area pages for the sitemap
 */
export const AREA_PAGES: SitemapEntry[] = [
  { loc: '/areas', changefreq: 'monthly', priority: 0.7 },
  { loc: '/areas/san-diego', changefreq: 'monthly', priority: 0.7 },
  { loc: '/areas/la-jolla', changefreq: 'monthly', priority: 0.6 },
  { loc: '/areas/mission-valley', changefreq: 'monthly', priority: 0.6 },
  { loc: '/areas/carlsbad', changefreq: 'monthly', priority: 0.6 },
  { loc: '/areas/chula-vista', changefreq: 'monthly', priority: 0.6 },
  { loc: '/areas/oceanside', changefreq: 'monthly', priority: 0.6 },
  { loc: '/areas/escondido', changefreq: 'monthly', priority: 0.6 },
  { loc: '/areas/el-cajon', changefreq: 'monthly', priority: 0.6 },
  { loc: '/areas/national-city', changefreq: 'monthly', priority: 0.6 },
  { loc: '/areas/coronado', changefreq: 'monthly', priority: 0.6 },
  { loc: '/areas/del-mar', changefreq: 'monthly', priority: 0.6 },
  { loc: '/areas/encinitas', changefreq: 'monthly', priority: 0.6 },
  { loc: '/areas/poway', changefreq: 'monthly', priority: 0.6 },
  { loc: '/areas/santee', changefreq: 'monthly', priority: 0.6 },
  { loc: '/areas/la-mesa', changefreq: 'monthly', priority: 0.6 },
];

/**
 * Generates sitemap entries for dynamic project/portfolio pages
 *
 * @example
 * ```typescript
 * const projectEntries = generateProjectEntries([
 *   { slug: 'kitchen-repipe-la-jolla', updatedAt: '2024-01-15' },
 *   { slug: 'bathroom-renovation-carlsbad', updatedAt: '2024-01-10' },
 * ]);
 * ```
 *
 * @param projects - Array of project data
 * @returns Array of sitemap entries for projects
 */
export function generateProjectEntries(
  projects: Array<{ slug: string; updatedAt?: string }>
): SitemapEntry[] {
  return projects.map((project) => ({
    loc: `/portfolio/${project.slug}`,
    lastmod: project.updatedAt,
    changefreq: 'monthly' as ChangeFrequency,
    priority: 0.6,
  }));
}

/**
 * Generates the complete sitemap with all pages
 *
 * @example
 * ```typescript
 * const projects = await fetchProjects();
 * const fullSitemap = generateFullSitemap(
 *   projects.map(p => ({ slug: p.slug, updatedAt: p.updated_at }))
 * );
 * ```
 *
 * @param dynamicProjects - Optional array of dynamic project data
 * @returns Complete XML sitemap string
 */
export function generateFullSitemap(
  dynamicProjects?: Array<{ slug: string; updatedAt?: string }>
): string {
  const allEntries: SitemapEntry[] = [
    ...STATIC_PAGES,
    ...SERVICE_PAGES,
    ...AREA_PAGES,
  ];

  if (dynamicProjects && dynamicProjects.length > 0) {
    allEntries.push(...generateProjectEntries(dynamicProjects));
  }

  return generateSitemap(allEntries);
}

/**
 * Generates a sitemap index for large sites with multiple sitemaps
 *
 * @example
 * ```typescript
 * const sitemapIndex = generateSitemapIndex([
 *   { loc: '/sitemap-pages.xml', lastmod: '2024-01-20' },
 *   { loc: '/sitemap-projects.xml', lastmod: '2024-01-15' },
 * ]);
 * ```
 *
 * @param sitemaps - Array of sitemap locations
 * @returns XML sitemap index string
 */
export function generateSitemapIndex(
  sitemaps: Array<{ loc: string; lastmod?: string }>
): string {
  const sitemapElements = sitemaps
    .map((sitemap) => {
      const lines: string[] = ['  <sitemap>'];
      lines.push(`    <loc>${escapeXml(normalizeUrl(sitemap.loc))}</loc>`);
      if (sitemap.lastmod) {
        lines.push(`    <lastmod>${formatDate(sitemap.lastmod)}</lastmod>`);
      }
      lines.push('  </sitemap>');
      return lines.join('\n');
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapElements}
</sitemapindex>`;
}

/**
 * Helper to get the current date in ISO format for lastmod
 */
export function getCurrentDate(): string {
  return new Date().toISOString().split('T')[0];
}

/**
 * Updates all static pages with current date as lastmod
 */
export function getStaticPagesWithDates(): SitemapEntry[] {
  const today = getCurrentDate();
  return STATIC_PAGES.map((page) => ({
    ...page,
    lastmod: page.lastmod || today,
  }));
}
