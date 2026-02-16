/**
 * App.tsx
 *
 * This file is kept for reference but is no longer the main entry point.
 * The application now uses React Router for navigation.
 *
 * Main entry point: src/main.tsx
 * Router configuration: src/routes/router.tsx
 *
 * The previous state-based navigation has been replaced with:
 * - PublicLayout: src/layouts/PublicLayout.tsx
 * - AdminLayout: src/layouts/AdminLayout.tsx
 * - Public pages: src/pages/public/
 * - Admin pages: src/pages/admin/
 *
 * Legacy components that have been migrated:
 * - EmergencyServices -> src/pages/public/EmergencyPage.tsx
 * - PhotoUpload -> Will be integrated into admin/PhotosPage.tsx
 *
 * Components that are still in use:
 * - GoogleMap.tsx
 * - GoogleReviews.tsx
 * - ProjectCarousel.tsx
 */

import { RouterProvider } from 'react-router-dom';
import { router } from './routes/router';

function App() {
  return <RouterProvider router={router} />;
}

export default App;
