# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Tooling and common commands

This is a Vite + React + TypeScript + Tailwind SPA managed with `npm` (see `package-lock.json`). Run all commands from the repository root.

### Install dependencies

- `npm install`

### Development server

- Start dev server: `npm run dev`
  - Vite serves the app (by default on `http://localhost:5173`).

### Build & preview

- Production build: `npm run build`
  - Uses Vite's default build pipeline.
- Preview built app locally: `npm run preview`
  - Serves the output from `dist/` using Vite's preview server.

### Linting

- Run ESLint across the project: `npm run lint`
  - Script is defined as `eslint .` in `package.json` and uses the TypeScript-aware config in this repo.

### Testing

- There is currently no test script configured in `package.json`. If you add a test runner (e.g. Vitest/Jest), also add the relevant `npm test`/`npm run test:...` scripts and update this file with how to run a single test.

### Environment variables and Supabase

- Supabase client configuration lives in `src/lib/supabase.ts` and expects Vite env variables:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`
- For local development, define these in a Vite-compatible env file (for example `.env.local`) so that `import.meta.env` exposes them at build/runtime.
- If either variable is missing, the app will throw at startup (`supabase.ts` explicitly checks and throws an error), so set them before running `npm run dev` or `npm run build`.

## High-level architecture

### Entry points and global layout

- **HTML shell**: `index.html`
  - Contains SEO meta tags, Open Graph tags, and JSON-LD `LocalBusiness` schema describing the plumbing business.
  - Loads the Google Maps JavaScript API via a `<script>` tag and bootstraps the React app via `<script type="module" src="/src/main.tsx"></script>`.
- **React entry**: `src/main.tsx`
  - Uses `createRoot` to mount `<App />` into the `root` div from `index.html`.
  - Imports global Tailwind styles from `src/index.css`.
- **Root component**: `src/App.tsx`
  - Acts as the main UI shell, top navigation, and router-like controller.
  - Manages top-level UI state for:
    - Active tab: `services`, `testimonials`, `contact`, `photos` (controls which main section is visible).
    - Full-page overlays: `EmergencyServices` and `PhotoUpload`, which temporarily replace the normal tabbed layout.
    - Authenticated user state (from Supabase) to drive the "Profile/Admin" dropdown.
  - Renders the fixed header (branding, CTA buttons, user/admin dropdown), tab navigation, main content for the current tab, and a global footer.

### Pages and navigation model

There is no React Router; navigation is implemented with local React state in `App.tsx`.

- **Tabs within the main site** (state: `activeTab`):
  - `services` (default): marketing homepage with hero, service cards, and the service-area map.
  - `testimonials`: customer review cards plus an embedded `GoogleReviews` widget.
  - `contact`: contact details and a service request form; submission currently shows an alert and resets local form state only.
  - `photos`: read-only public portfolio view showing `ProjectCarousel` components for each project fetched from Supabase.
- **Standalone full-screen pages** (boolean flags in `App.tsx`):
  - `src/pages/EmergencyServices.tsx`
    - Full-page emergency information page with structured sections describing emergency types and recommended steps.
    - Triggered from the header/footer "Emergency" buttons and returns to the main app via an `onBack` callback.
  - `src/pages/PhotoUpload.tsx`
    - Full-screen admin interface for managing projects and portfolio photos.
    - Can be opened from the header's user dropdown, both for guests (admin login flow) and authenticated users.

When either `showEmergencyPage` or `showPhotoUpload` is true, `App` short-circuits its normal render and returns only that page. This means any future "full-page" flows should follow this pattern or be refactored into a routing solution if navigation becomes more complex.

### Data layer: Supabase integration

- **Supabase client and types**: `src/lib/supabase.ts`
  - Creates a singleton Supabase client using `createClient` with `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` from `import.meta.env`.
  - Exposes TypeScript interfaces used throughout the app:
    - `PortfolioPhoto`: represents rows in the `portfolio_photos` table (id, title, description, `image_url`, `category`, optional `project_id`, timestamps).
    - `Project`: represents rows in the `projects` table (id, title, description, `category`, `location`, `completion_date`, `featured`, timestamps, and an optional `photos` array attached in higher-level code).

- **Public portfolio consumption** (within `App.tsx`):
  - When the `photos` tab is active, `fetchProjects`:
    - Queries `projects`, ordered by `featured` (descending) then `created_at` (descending).
    - Queries `portfolio_photos`, ordered by `created_at`.
    - Joins them in-memory into `projectsWithPhotos`, where each `project` gets a `photos` array of matching `PortfolioPhoto` objects.
  - Real-time updates:
    - Sets up Supabase Realtime channels on the `projects` and `portfolio_photos` tables.
    - Any `INSERT`/`UPDATE`/`DELETE` on those tables triggers a refresh via `fetchProjects`, keeping the public portfolio view in sync with admin changes.

- **Admin/project management and file uploads**: `src/pages/PhotoUpload.tsx`
  - Handles Supabase **auth**, **database**, and **storage** workflows for managing the portfolio:
    - Auth:
      - Uses `supabase.auth.getSession()` and `onAuthStateChange` to track current user.
      - Login form calls `supabase.auth.signInWithPassword` (email/password) and shows status notifications.
    - Projects (table: `projects`):
      - `fetchProjects` loads and caches all projects, defaulting the selected project.
      - `createProject` inserts a new row and selects the created project.
      - `updateProject` and `deleteProject` mutate project rows and then refresh the list.
      - Project ordering is currently handled client-side by reordering the local `projects` array (the code hints at adding an `order` column later).
      - `featured` flag is toggled via `toggleFeatured`/`updateProject`.
    - Photos (table: `portfolio_photos`, storage bucket: `photos`):
      - `uploadMultiplePhotos` validates image files (type and max 5 MB), then uploads each via `uploadPhoto`.
      - `uploadPhoto`:
        - Uploads file to Supabase Storage under a `portfolio/` prefix.
        - Obtains a public URL and inserts a row into `portfolio_photos` with metadata and the `project_id`.
        - Maintains per-file upload progress to drive progress bars in the UI.
      - `deletePhoto` removes both the database row and the corresponding storage object, then refreshes the photo list.
  - The component is effectively a small admin dashboard with embedded subcomponents (`NotificationContainer`, `PhotoManagerModal`) defined inline. When modifying or extending this area, keep in mind that:
    - All portfolio data flows through this file and `supabase.ts`.
    - Both list-level project management and per-project photo management are handled here.

### UI components and shared pieces

- **`src/components/GoogleMap.tsx`**
  - Thin wrapper around the Google Maps JS API.
  - On mount, reads `window.google.maps` (populated by the script in `index.html`) to:
    - Initialize a map centered on San Diego.
    - Draw a rectangular polygon representing the service area.
    - Place a custom SVG marker representing the business location.
  - Styling and sizing are controlled via Tailwind classes and inline `style` on the container.

- **`src/components/GoogleReviews.tsx`**
  - Presentational component that currently renders a **static** set of sample reviews and overall rating.
  - Includes a "Write a review" link and "View all Google reviews" link that should be wired to the business's real Google URLs.
  - If you later integrate the Google Places API, this is the logical place to replace hard-coded data with live reviews.

- **`src/components/ProjectCarousel.tsx`**
  - Displays a single `Project`'s `photos` as a carousel.
  - Features:
    - Auto-advancing slides every 4 seconds when `isAutoPlaying` is true.
    - Hover/interaction pauses autoplay for 10 seconds when manually navigating or jumping to a slide.
    - Previous/next arrow controls, slide indicators, and a slide counter.
    - Project metadata (title, description, location, completion date, featured badge).
  - Expects its `project` prop to already contain a `photos` array; this is populated in `App.tsx` when building `projectsWithPhotos`.

### Styling and configuration

- **Tailwind CSS**
  - `src/index.css` contains the standard Tailwind `@tailwind base/components/utilities` directives.
  - `tailwind.config.js` scans `index.html` and all files under `src/**/*.{js,ts,jsx,tsx}` for class names.
  - Components use Tailwind utility classes extensively for layout and design.

- **PostCSS & Vite**
  - `postcss.config.js` wires `tailwindcss` and `autoprefixer`.
  - `vite.config.ts` uses `@vitejs/plugin-react` and excludes `lucide-react` from dependency optimization to avoid known build-time issues with that library.
  - TypeScript configs (`tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`) separate app and tooling/Node settings and enable strict type checking for both app and Vite config.

### External APIs and globals

- **Google Maps**
  - `index.html` includes the Google Maps JavaScript API script and is responsible for attaching the `google` namespace to `window`.
  - `src/types/google-maps.d.ts` augments the global `Window` type with a minimal `google.maps` shape (Map, Marker, Polygon, Size) so TypeScript understands `window.google` in `GoogleMap.tsx`.
  - If you change how the Maps API is loaded or which Maps classes you use, update both `index.html` and `google-maps.d.ts` to keep runtime behavior and types aligned.

### Where to adjust business copy and contact details

Business-specific information is spread across a few key files:

- `index.html`: SEO meta tags, Open Graph tags, JSON-LD schema, and the primary page `<title>`.
- `src/App.tsx`:
  - Header/footer branding and contact info.
  - Service descriptions, testimonials, and contact form labels.
  - Emergency service CTAs and copy on the contact and footer sections.
- `src/pages/EmergencyServices.tsx`: content and layout of the dedicated emergency services page.

When updating branding, phone numbers, or marketing copy, prefer editing these centralized locations rather than scattering changes across new components.
