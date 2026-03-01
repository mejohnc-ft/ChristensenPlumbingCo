import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout';
import ProtectedRoute from './ProtectedRoute';

// Lazy-loaded public pages
const HomePage = lazy(() => import('../pages/public/HomePage'));
const ReviewsPage = lazy(() => import('../pages/public/ReviewsPage'));
const PortfolioPage = lazy(() => import('../pages/public/PortfolioPage'));
const ProjectDetailPage = lazy(() => import('../pages/public/ProjectDetailPage'));
const AboutPage = lazy(() => import('../pages/public/AboutPage'));
const EmergencyPage = lazy(() => import('../pages/public/EmergencyPage'));
const ServicesPage = lazy(() => import('../pages/public/ServicesPage'));
const ServicePage = lazy(() => import('../pages/public/ServicePage'));
const AreasPage = lazy(() => import('../pages/public/AreasPage'));
const AreaPage = lazy(() => import('../pages/public/AreaPage'));
const FaqPage = lazy(() => import('../pages/public/FaqPage'));
const ContactPage = lazy(() => import('../pages/public/ContactPage'));
const PrivacyPolicyPage = lazy(() => import('../pages/public/PrivacyPolicyPage'));
const TermsOfServicePage = lazy(() => import('../pages/public/TermsOfServicePage'));
const BlogPage = lazy(() => import('../pages/public/BlogPage'));
const BlogPostPage = lazy(() => import('../pages/public/BlogPostPage'));
const PricingPage = lazy(() => import('../pages/public/PricingPage'));
const ComparisonPage = lazy(() => import('../pages/public/ComparisonPage'));
const GuidesPage = lazy(() => import('../pages/public/GuidesPage'));
const GuidePage = lazy(() => import('../pages/public/GuidePage'));

// Lazy-loaded admin pages
const AdminLayout = lazy(() => import('../layouts/AdminLayout'));
const DashboardPage = lazy(() => import('../pages/admin/DashboardPage'));
const SettingsPage = lazy(() => import('../pages/admin/SettingsPage'));
const PagesPage = lazy(() => import('../pages/admin/PagesPage'));
const ProjectsPage = lazy(() => import('../pages/admin/ProjectsPage'));
const PhotosPage = lazy(() => import('../pages/admin/PhotosPage'));
const ReviewsAdminPage = lazy(() => import('../pages/admin/ReviewsPage'));
const TeamPage = lazy(() => import('../pages/admin/TeamPage'));
const FaqsPage = lazy(() => import('../pages/admin/FaqsPage'));
const LeadsPage = lazy(() => import('../pages/admin/LeadsPage'));
const AuditPage = lazy(() => import('../pages/admin/AuditPage'));
const AdminBlogPage = lazy(() => import('../pages/admin/BlogPage'));
const BlogEditorPage = lazy(() => import('../pages/admin/BlogEditorPage'));

function PageLoader() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-gold-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function SuspenseWrapper({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<PageLoader />}>{children}</Suspense>;
}

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: '/', element: <SuspenseWrapper><HomePage /></SuspenseWrapper> },
      { path: '/reviews', element: <SuspenseWrapper><ReviewsPage /></SuspenseWrapper> },
      { path: '/portfolio', element: <SuspenseWrapper><PortfolioPage /></SuspenseWrapper> },
      { path: '/portfolio/:slug', element: <SuspenseWrapper><ProjectDetailPage /></SuspenseWrapper> },
      { path: '/about', element: <SuspenseWrapper><AboutPage /></SuspenseWrapper> },
      { path: '/emergency', element: <SuspenseWrapper><EmergencyPage /></SuspenseWrapper> },
      { path: '/services', element: <SuspenseWrapper><ServicesPage /></SuspenseWrapper> },
      { path: '/services/:slug', element: <SuspenseWrapper><ServicePage /></SuspenseWrapper> },
      { path: '/areas', element: <SuspenseWrapper><AreasPage /></SuspenseWrapper> },
      { path: '/areas/:slug', element: <SuspenseWrapper><AreaPage /></SuspenseWrapper> },
      { path: '/faq', element: <SuspenseWrapper><FaqPage /></SuspenseWrapper> },
      { path: '/contact', element: <SuspenseWrapper><ContactPage /></SuspenseWrapper> },
      { path: '/privacy', element: <SuspenseWrapper><PrivacyPolicyPage /></SuspenseWrapper> },
      { path: '/terms', element: <SuspenseWrapper><TermsOfServicePage /></SuspenseWrapper> },
      { path: '/blog', element: <SuspenseWrapper><BlogPage /></SuspenseWrapper> },
      { path: '/blog/:slug', element: <SuspenseWrapper><BlogPostPage /></SuspenseWrapper> },
      { path: '/pricing', element: <SuspenseWrapper><PricingPage /></SuspenseWrapper> },
      { path: '/compare/:slug', element: <SuspenseWrapper><ComparisonPage /></SuspenseWrapper> },
      { path: '/guides', element: <SuspenseWrapper><GuidesPage /></SuspenseWrapper> },
      { path: '/guides/:slug', element: <SuspenseWrapper><GuidePage /></SuspenseWrapper> },
    ],
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <SuspenseWrapper>
          <AdminLayout />
        </SuspenseWrapper>
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <SuspenseWrapper><DashboardPage /></SuspenseWrapper> },
      { path: 'settings', element: <SuspenseWrapper><SettingsPage /></SuspenseWrapper> },
      { path: 'pages', element: <SuspenseWrapper><PagesPage /></SuspenseWrapper> },
      { path: 'projects', element: <SuspenseWrapper><ProjectsPage /></SuspenseWrapper> },
      { path: 'photos', element: <SuspenseWrapper><PhotosPage /></SuspenseWrapper> },
      { path: 'reviews', element: <SuspenseWrapper><ReviewsAdminPage /></SuspenseWrapper> },
      { path: 'team', element: <SuspenseWrapper><TeamPage /></SuspenseWrapper> },
      { path: 'faqs', element: <SuspenseWrapper><FaqsPage /></SuspenseWrapper> },
      { path: 'leads', element: <SuspenseWrapper><LeadsPage /></SuspenseWrapper> },
      { path: 'audit', element: <SuspenseWrapper><AuditPage /></SuspenseWrapper> },
      { path: 'blog', element: <SuspenseWrapper><AdminBlogPage /></SuspenseWrapper> },
      { path: 'blog/new', element: <SuspenseWrapper><BlogEditorPage /></SuspenseWrapper> },
      { path: 'blog/:id/edit', element: <SuspenseWrapper><BlogEditorPage /></SuspenseWrapper> },
    ],
  },
]);
