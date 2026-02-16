# Christensen Plumbing Co. - Implementation Plan

## Pre-Flight Checklist: What You Need to Provide

### 1. API Keys & Credentials (REQUIRED BEFORE IMPLEMENTATION)

| Service | Keys Needed | How to Get | Priority |
|---------|-------------|------------|----------|
| **Clerk** | `VITE_CLERK_PUBLISHABLE_KEY` | [clerk.com/dashboard](https://clerk.com) → Create app → API Keys | BLOCKING |
| **Clerk** | `CLERK_SECRET_KEY` | Same location (for backend/RLS) | BLOCKING |
| **Supabase** | `VITE_SUPABASE_URL` | Already have? Confirm current project URL | VERIFY |
| **Supabase** | `VITE_SUPABASE_ANON_KEY` | Already have? Confirm current anon key | VERIFY |
| **Supabase** | `SUPABASE_SERVICE_ROLE_KEY` | Supabase Dashboard → Settings → API (for RLS JWT verification) | BLOCKING |
| **Sentry** | `VITE_SENTRY_DSN` | [sentry.io](https://sentry.io) → Create project → DSN | CAN DEFER |
| **Google Maps** | `VITE_GOOGLE_MAPS_API_KEY` | Already embedded - needs moving to env | VERIFY |

### 2. Clerk Configuration Steps

After creating your Clerk app:

1. **Enable Email/Password sign-in** (Settings → User & Authentication → Email, Phone, Username)
2. **Create Admin Role:**
   - Go to Organizations or use Clerk Metadata
   - We'll use `publicMetadata.role = 'admin'` for RBAC
3. **Get JWT Template for Supabase:**
   - Go to JWT Templates → Create new
   - Name: `supabase`
   - Claims: Add `role` claim from metadata
   - Copy the JWKS endpoint URL

### 3. Supabase Configuration for Clerk Integration

You'll need to update Supabase to verify Clerk JWTs:

```sql
-- Run in Supabase SQL Editor after getting Clerk JWKS URL
ALTER DATABASE postgres SET "app.settings.jwt_secret" TO 'your-clerk-jwt-secret';
```

We'll provide the full RLS policies once you confirm the Clerk JWKS endpoint.

### 4. Environment File Template

Create `.env.local` with:

```env
# Clerk Authentication
VITE_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxx
CLERK_SECRET_KEY=sk_test_xxxxxxxx

# Supabase
VITE_SUPABASE_URL=https://xxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJxxxxxxxx
SUPABASE_SERVICE_ROLE_KEY=eyJxxxxxxxx

# Sentry (optional for now)
VITE_SENTRY_DSN=https://xxxxxxxx@sentry.io/xxxxxxxx

# Google Maps
VITE_GOOGLE_MAPS_API_KEY=AIzaxxxxxxxx
```

---

## CI/CD Pipeline Design

### GitHub Actions Workflow

We'll create `.github/workflows/ci.yml`:

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  lint-and-type-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npx tsc --noEmit

  build:
    needs: lint-and-type-check
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
        env:
          VITE_CLERK_PUBLISHABLE_KEY: ${{ secrets.VITE_CLERK_PUBLISHABLE_KEY }}
          VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
          VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}
          VITE_GOOGLE_MAPS_API_KEY: ${{ secrets.VITE_GOOGLE_MAPS_API_KEY }}
      - uses: actions/upload-artifact@v4
        with:
          name: build
          path: dist/

  # Optional: Deploy to Vercel/Netlify/Cloudflare
  # deploy:
  #   needs: build
  #   if: github.ref == 'refs/heads/main'
  #   ...
```

### Required GitHub Secrets

Set these in your repo → Settings → Secrets and variables → Actions:

- `VITE_CLERK_PUBLISHABLE_KEY`
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_GOOGLE_MAPS_API_KEY`
- `VITE_SENTRY_DSN` (optional)

---

## Implementation Phases (Concurrent Workstreams)

### Phase 1: Foundation (Parallel Agents)

| Workstream | Agent | Tasks |
|------------|-------|-------|
| **Infrastructure** | DevOps | CI/CD, env setup, build config |
| **Database Schema** | Backend Architect | New tables, RLS policies, migrations |
| **Auth Integration** | Backend Architect | Clerk + Supabase RLS bridge |
| **Routing Setup** | Frontend Dev | React Router, layouts, route guards |

### Phase 2: Core Features (Parallel Agents)

| Workstream | Agent | Tasks |
|------------|-------|-------|
| **Public Pages** | Frontend Dev | Home, Reviews, Portfolio, About |
| **Admin CMS** | Frontend Dev | Dashboard, CRUD interfaces |
| **Component Library** | Frontend Dev | Shared UI components, forms |
| **SEO Layer** | Frontend Dev | Meta tags, structured data, sitemap |

### Phase 3: Polish & Integration

| Workstream | Agent | Tasks |
|------------|-------|-------|
| **Migration** | Tech Lead | Move existing components to new arch |
| **Testing** | Test Writer | Unit, integration, E2E tests |
| **Performance** | Performance Agent | Lighthouse audit, optimizations |

---

## Database Schema Overview

### New Tables Required

```sql
-- Site-wide settings (NAP, hours, SEO defaults)
site_settings (id, key, value, type, updated_at, updated_by)

-- Page content management
pages (id, slug, title, meta_title, meta_description, is_published, created_at, updated_at)
page_sections (id, page_id, section_type, content, position, is_visible, created_at, updated_at)

-- Enhanced projects for portfolio
projects (existing + slug, problem_text, approach_text, result_text, metrics_json, is_published)

-- Reviews/Testimonials
reviews (id, source, author_name, rating, content, service_type, review_date, is_featured, is_published)
review_aggregates (id, source, total_count, average_rating, rating_1-5 counts, synced_at)

-- Team members
team_members (id, name, role, bio, photo_url, credentials, position, is_visible)

-- FAQs
faqs (id, question, answer, category, position, is_published)

-- Contact/Service requests
leads (id, name, email, phone, service_type, message, source_page, created_at, status)

-- Audit trail
audit_log (id, user_id, action, table_name, record_id, old_values, new_values, created_at)

-- Service areas
service_areas (id, name, polygon_coords, is_primary, created_at)

-- Service types
services (id, title, description, icon, features, position, is_visible)
```

---

## Immediate Action Items

### For You (Owner):

1. **Create Clerk Account** → Get publishable key and secret key
2. **Confirm Supabase Project** → Verify URL and keys still valid
3. **Create Sentry Project** (optional) → Get DSN
4. **Secure Google Maps Key** → Move from HTML to env variable

### Reply With:

```
CLERK_PUBLISHABLE_KEY: pk_test_...
CLERK_SECRET_KEY: sk_test_...
SUPABASE_URL: https://...supabase.co (confirm existing)
SUPABASE_ANON_KEY: eyJ... (confirm existing)
SUPABASE_SERVICE_ROLE_KEY: eyJ...
GOOGLE_MAPS_API_KEY: AIza... (confirm existing)
```

**DO NOT paste secrets in chat** - create `.env.local` file directly and confirm completion.

---

## Agent Team Assignment (Ready to Launch)

Once you confirm API keys are in `.env.local`:

| Agent | Responsibility | Blocking Dependencies |
|-------|----------------|----------------------|
| **tech-lead** | Architecture decisions, code review, integration | None |
| **backend-architect** | Supabase schema, RLS policies, Clerk integration | Clerk + Supabase keys |
| **devops-automator** | CI/CD pipeline, build configuration | None |
| **frontend-developer** | UI components, routing, pages | Clerk key (for auth UI) |
| **web-dev** | Admin CMS interface, forms | Schema complete |

---

## Questions Before Proceeding

1. **Hosting Platform**: Where will this deploy? (Vercel, Netlify, Cloudflare Pages, custom?)
2. **Domain**: Is `christensenplumbing.com` the production domain?
3. **Existing Data**: Keep existing projects/photos or start fresh?
4. **Admin Users**: Who needs admin access? Just you or multiple team members?
5. **Review Sources**: Which platforms do you use? (Google, Yelp, Angi, Facebook?)

---

## Ready When You Are

Reply with:
- Confirmation that `.env.local` is created with all keys
- Answers to the 5 questions above
- Any scope modifications

Then I'll spin up the concurrent agent team and begin implementation.
