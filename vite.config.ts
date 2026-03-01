import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
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
  plugins: [react()],
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
