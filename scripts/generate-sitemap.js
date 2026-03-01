/**
 * Sitemap Generation Script
 *
 * Generates sitemap.xml during the build process.
 * Run: node scripts/generate-sitemap.js
 */

import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const SITE_URL = 'https://christensenplumbing.com';

// Static pages with priorities (only pages that actually exist and return 200)
const STATIC_PAGES = [
  { loc: '/', changefreq: 'weekly', priority: 1.0 },
  { loc: '/reviews', changefreq: 'weekly', priority: 0.8 },
  { loc: '/portfolio', changefreq: 'weekly', priority: 0.8 },
  { loc: '/about', changefreq: 'monthly', priority: 0.7 },
  { loc: '/emergency', changefreq: 'monthly', priority: 0.9 },
  { loc: '/services', changefreq: 'monthly', priority: 0.8 },
  { loc: '/faq', changefreq: 'monthly', priority: 0.6 },
  { loc: '/contact', changefreq: 'monthly', priority: 0.8 },
  { loc: '/privacy', changefreq: 'yearly', priority: 0.3 },
  { loc: '/terms', changefreq: 'yearly', priority: 0.3 },
  { loc: '/blog', changefreq: 'weekly', priority: 0.7 },
  { loc: '/pricing', changefreq: 'monthly', priority: 0.7 },
  { loc: '/guides', changefreq: 'monthly', priority: 0.6 },
];

// Service pages
const SERVICE_PAGES = [
  { loc: '/services/emergency-plumbing', changefreq: 'monthly', priority: 0.9 },
  { loc: '/services/drain-cleaning', changefreq: 'monthly', priority: 0.8 },
  { loc: '/services/water-heaters', changefreq: 'monthly', priority: 0.8 },
  { loc: '/services/pipe-repair', changefreq: 'monthly', priority: 0.8 },
  { loc: '/services/leak-detection', changefreq: 'monthly', priority: 0.8 },
  { loc: '/services/bathroom-renovation', changefreq: 'monthly', priority: 0.7 },
  { loc: '/services/kitchen-plumbing', changefreq: 'monthly', priority: 0.7 },
  { loc: '/services/sewer-services', changefreq: 'monthly', priority: 0.7 },
];

function escapeXml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function formatDate(date) {
  return date.toISOString().split('T')[0];
}

function generateSitemap(entries) {
  const today = formatDate(new Date());

  const urlElements = entries
    .map((entry) => {
      const lines = ['  <url>'];
      lines.push(`    <loc>${escapeXml(SITE_URL + entry.loc)}</loc>`);
      lines.push(`    <lastmod>${entry.lastmod || today}</lastmod>`);
      if (entry.changefreq) {
        lines.push(`    <changefreq>${entry.changefreq}</changefreq>`);
      }
      if (entry.priority !== undefined) {
        lines.push(`    <priority>${entry.priority.toFixed(1)}</priority>`);
      }
      lines.push('  </url>');
      return lines.join('\n');
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urlElements}
</urlset>`;
}

// Area pages
const AREA_PAGES = [
  { loc: '/areas', changefreq: 'monthly', priority: 0.7 },
  { loc: '/areas/san-diego', changefreq: 'monthly', priority: 0.9 },
  { loc: '/areas/la-jolla', changefreq: 'monthly', priority: 0.7 },
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

// Comparison pages
const COMPARISON_PAGES = [
  { loc: '/compare/big-box-stores', changefreq: 'monthly', priority: 0.6 },
  { loc: '/compare/handyman-services', changefreq: 'monthly', priority: 0.6 },
  { loc: '/compare/diy-plumbing', changefreq: 'monthly', priority: 0.6 },
];

// Guide pages
const GUIDE_PAGES = [
  { loc: '/guides/plumbing-maintenance-checklist', changefreq: 'monthly', priority: 0.6 },
  { loc: '/guides/emergency-plumbing-guide', changefreq: 'monthly', priority: 0.6 },
  { loc: '/guides/water-heater-buying-guide', changefreq: 'monthly', priority: 0.6 },
];

// Generate and write sitemap
const allPages = [...STATIC_PAGES, ...SERVICE_PAGES, ...AREA_PAGES, ...COMPARISON_PAGES, ...GUIDE_PAGES];
const sitemap = generateSitemap(allPages);

const outputPath = resolve(__dirname, '../dist/sitemap.xml');
writeFileSync(outputPath, sitemap, 'utf-8');

console.log(`Sitemap generated: ${outputPath}`);
console.log(`Total URLs: ${allPages.length}`);
