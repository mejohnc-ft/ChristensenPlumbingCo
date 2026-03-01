/**
 * Pre-render Script
 *
 * Uses Puppeteer to pre-render SPA routes to static HTML.
 * Netlify CDN serves these as fast static pages before the SPA hydrates.
 *
 * Run: node scripts/prerender.js
 */

import { createServer } from 'http';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { resolve, dirname, join, extname } from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST_DIR = resolve(__dirname, '../dist');
const PORT = 4173;

// Import routes from vite config
const PRERENDER_ROUTES = [
  '/',
  '/reviews',
  '/portfolio',
  '/about',
  '/emergency',
  '/services',
  '/services/emergency-plumbing',
  '/services/drain-cleaning',
  '/services/water-heaters',
  '/services/pipe-repair',
  '/services/leak-detection',
  '/services/bathroom-renovation',
  '/services/kitchen-plumbing',
  '/services/sewer-services',
  '/areas',
  '/areas/san-diego',
  '/areas/la-jolla',
  '/areas/mission-valley',
  '/areas/carlsbad',
  '/areas/chula-vista',
  '/areas/oceanside',
  '/areas/escondido',
  '/areas/el-cajon',
  '/areas/national-city',
  '/areas/coronado',
  '/areas/del-mar',
  '/areas/encinitas',
  '/areas/poway',
  '/areas/santee',
  '/areas/la-mesa',
  '/faq',
  '/contact',
  '/pricing',
  '/compare/big-box-stores',
  '/compare/handyman-services',
  '/compare/diy-plumbing',
  '/guides',
  '/guides/plumbing-maintenance-checklist',
  '/guides/emergency-plumbing-guide',
  '/guides/water-heater-buying-guide',
];

// MIME types for static file serving
const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

function createStaticServer() {
  return new Promise((resolvePromise) => {
    const server = createServer((req, res) => {
      let filePath = join(DIST_DIR, req.url === '/' ? '/index.html' : req.url);

      // If no extension, serve index.html (SPA fallback)
      if (!extname(filePath)) {
        filePath = join(DIST_DIR, 'index.html');
      }

      try {
        if (existsSync(filePath)) {
          const ext = extname(filePath);
          const contentType = MIME_TYPES[ext] || 'application/octet-stream';
          const content = readFileSync(filePath);
          res.writeHead(200, { 'Content-Type': contentType });
          res.end(content);
        } else {
          // SPA fallback
          const content = readFileSync(join(DIST_DIR, 'index.html'));
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(content);
        }
      } catch {
        res.writeHead(500);
        res.end('Internal Server Error');
      }
    });

    server.listen(PORT, () => {
      console.log(`Static server running on http://localhost:${PORT}`);
      resolvePromise(server);
    });
  });
}

async function prerenderRoute(browser, route) {
  const page = await browser.newPage();

  try {
    const url = `http://localhost:${PORT}${route}`;
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });

    // Wait a bit for React to hydrate and render
    await page.waitForSelector('#root', { timeout: 10000 });

    // Small delay for any async effects
    await new Promise((r) => setTimeout(r, 500));

    const html = await page.content();

    // Determine output path
    const outputDir = route === '/'
      ? DIST_DIR
      : resolve(DIST_DIR, route.slice(1));

    if (!existsSync(outputDir)) {
      mkdirSync(outputDir, { recursive: true });
    }

    const outputPath = join(outputDir, 'index.html');
    writeFileSync(outputPath, html, 'utf-8');

    console.log(`  Pre-rendered: ${route}`);
  } catch (err) {
    console.error(`  Failed: ${route} - ${err.message}`);
  } finally {
    await page.close();
  }
}

async function main() {
  console.log('Starting pre-render process...\n');

  // Check dist exists
  if (!existsSync(DIST_DIR)) {
    console.error('Error: dist/ directory not found. Run `npm run build:only` first.');
    process.exit(1);
  }

  const server = await createStaticServer();

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    console.log(`Pre-rendering ${PRERENDER_ROUTES.length} routes...\n`);

    // Process routes in batches of 5 for performance
    const BATCH_SIZE = 5;
    for (let i = 0; i < PRERENDER_ROUTES.length; i += BATCH_SIZE) {
      const batch = PRERENDER_ROUTES.slice(i, i + BATCH_SIZE);
      await Promise.all(batch.map((route) => prerenderRoute(browser, route)));
    }

    console.log(`\nPre-rendering complete: ${PRERENDER_ROUTES.length} routes processed.`);
  } catch (err) {
    console.error('Pre-render error:', err);
    process.exit(1);
  } finally {
    if (browser) await browser.close();
    server.close();
  }
}

main();
