import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';

// Routes to pre-render (used by vite-plugin-prerender when available)
export const PRERENDER_ROUTES = [
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

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        navigateFallback: '/index.html',
        navigateFallbackDenylist: [/^\/api\//],
        runtimeCaching: [
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|webp|avif)$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images',
              expiration: { maxEntries: 100, maxAgeSeconds: 30 * 24 * 60 * 60 },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'google-fonts',
              expiration: { maxEntries: 20, maxAgeSeconds: 365 * 24 * 60 * 60 },
            },
          },
        ],
      },
      manifest: {
        name: 'Christensen Plumbing Co.',
        short_name: 'Christensen',
        description: 'Professional plumbing services in San Diego County. 24/7 emergency repairs, drain cleaning, and water heater services.',
        theme_color: '#0B1D33',
        background_color: '#0B1D33',
        display: 'standalone',
        start_url: '/',
        icons: [
          { src: '/pwa-192x192.svg', sizes: '192x192', type: 'image/svg+xml' },
          { src: '/pwa-512x512.svg', sizes: '512x512', type: 'image/svg+xml' },
          { src: '/pwa-512x512.svg', sizes: '512x512', type: 'image/svg+xml', purpose: 'any maskable' },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['lucide-react', 'framer-motion'],
          clerk: ['@clerk/clerk-react'],
          markdown: ['react-markdown', 'remark-gfm'],
        },
      },
    },
  },
});
