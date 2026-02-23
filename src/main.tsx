import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import { router } from './routes/router';
import { ThemeProvider } from './contexts/ThemeContext';
import ErrorBoundary from './components/ErrorBoundary';
import { initializeBaseMeta } from './lib/seo';
import './index.css';

// Initialize base meta tags
initializeBaseMeta();

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY as string | undefined;

const globalFallback = (
  <div style={{ padding: '2rem', textAlign: 'center' }}>
    <h1>Something went wrong</h1>
    <p>Please refresh the page.</p>
  </div>
);

const app = (
  <StrictMode>
    <ErrorBoundary fallback={globalFallback}>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </ErrorBoundary>
  </StrictMode>
);

createRoot(document.getElementById('root')!).render(
  clerkPubKey ? (
    <ClerkProvider publishableKey={clerkPubKey}>
      {app}
    </ClerkProvider>
  ) : (
    app
  )
);

// Dispatch render-complete event for prerendering
// This tells the prerenderer when the page is ready to be captured
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    // Small delay to ensure React has finished rendering
    setTimeout(() => {
      document.dispatchEvent(new Event('render-complete'));
    }, 100);
  });
}
