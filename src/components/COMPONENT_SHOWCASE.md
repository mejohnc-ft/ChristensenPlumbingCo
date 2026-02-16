# Component Library Visual Reference

Quick visual reference for all components in the Christensen Plumbing Co. library.

## UI Components

### Button
```
[Primary Button]  [Secondary Button]  [Outline Button]  [Ghost Button]  [Danger Button]
[Small]  [Medium]  [Large]
[📱 With Icon]  [Loading... ⟳]
```

### Form Inputs
```
┌─────────────────────────────────┐
│ Email Address *                 │
│ ┌─────────────────────────────┐ │
│ │ 📧 your@email.com           │ │
│ └─────────────────────────────┘ │
│ Helper text goes here           │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│ Message *                       │
│ ┌─────────────────────────────┐ │
│ │                             │ │
│ │ Type your message...        │ │
│ │                             │ │
│ └─────────────────────────────┘ │
└─────────────────────────────────┘

Service Needed *
┌─────────────────────────────────┐
│ Select a service...         ▼  │
└─────────────────────────────────┘

☑ I agree to terms and conditions
```

### Badge
```
[Default] [Success] [Warning] [Danger] [Info]
Small • Medium • Large
```

### Card
```
┌───────────────────────────────┐
│ ╔═══════════════════════════╗ │
│ ║      [Card Image]         ║ │
│ ╚═══════════════════════════╝ │
│                               │
│ Card Title                    │
│ Card description text         │
│ ────────────────────────      │
│ Card body content             │
│                               │
│ [Button]                      │
└───────────────────────────────┘
```

### Modal
```
╔═════════════════════════════════════╗
║ Modal Title                     [✕] ║
║ Modal description                   ║
╠═════════════════════════════════════╣
║                                     ║
║   Modal content goes here           ║
║                                     ║
║   [Primary Action] [Cancel]         ║
║                                     ║
╚═════════════════════════════════════╝
```

### Dropdown
```
[Menu ▼]
  ┌────────────────────┐
  │ 👤 Profile         │
  │ ⚙️  Settings       │
  │ 🚪 Logout          │
  └────────────────────┘
```

### Toast
```
┌─────────────────────────────────┐
│ ✓ Success!                  [✕] │
│ Your action was completed       │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│ ⚠️ Warning!                 [✕] │
│ Please review your info         │
└─────────────────────────────────┘
```

### Loading States
```
Skeleton:
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓

Spinner:
    ⟳ Loading...
```

## Form Components

### FormField
```
┌─────────────────────────────────┐
│ Field Label *                   │
│ ┌─────────────────────────────┐ │
│ │ Input value                 │ │
│ └─────────────────────────────┘ │
│ ✓ Helper text or error message  │
└─────────────────────────────────┘
```

### ContactForm
```
┌─────────────────────────────────┐
│ Full Name *                     │
│ [John Doe                    ]  │
│                                 │
│ Email Address *                 │
│ [📧 john@example.com         ]  │
│                                 │
│ Phone Number *                  │
│ [📞 (555) 123-4567           ]  │
│                                 │
│ Service Needed *                │
│ [Emergency Plumbing          ▼] │
│                                 │
│ Message *                       │
│ [                            ]  │
│ [                            ]  │
│ [                            ]  │
│                                 │
│ [📨 Request Service          ]  │
└─────────────────────────────────┘
```

## Data Display

### StarRating
```
★★★★☆ 4.5
★★★★★ 5.0
★★★☆☆ 3.0
```

### RatingChart
```
5 ★ ████████████████████████████ 50 (50%)
4 ★ ████████████████             30 (30%)
3 ★ ████████                     15 (15%)
2 ★ ██                            3 (3%)
1 ★ █                             2 (2%)
```

### StatCard
```
┌───────────────────────────────┐
│ Total Customers        [👥]   │
│                               │
│        1,234                  │
│                               │
│ +12% vs last period           │
└───────────────────────────────┘
```

### DataTable
```
┌──────────────────────────────────────────────┐
│ ☐ Name ↕     Email ↕     Status ↕           │
├──────────────────────────────────────────────┤
│ ☐ John Doe   john@...   [Active]            │
│ ☐ Jane Smith jane@...   [Active]            │
│ ☐ Bob Wilson bob@...    [Inactive]          │
└──────────────────────────────────────────────┘
```

## Navigation Components

### Navbar
```
┌────────────────────────────────────────────────────┐
│ [LOGO]  Home Services Projects About  📞 [Quote] │
└────────────────────────────────────────────────────┘
```

### Mobile Menu
```
│ Menu                                          [✕] │
├───────────────────────────────────────────────────┤
│ 🏠 Home                                           │
│ 🔧 Services                                       │
│ 📱 Contact                                        │
├───────────────────────────────────────────────────┤
│ [Get a Quote]                                     │
```

### Breadcrumbs
```
🏠 Home > Services > Plumbing > Emergency Repair
```

### Sidebar (Admin)
```
┌────────────────────┐
│ [LOGO]             │
├────────────────────┤
│ 📊 Dashboard       │
│ 👥 Users        5  │
│   └ All Users      │
│   └ Add User       │
│ ⚙️  Settings       │
│                    │
├────────────────────┤
│ [◀ Collapse]       │
└────────────────────┘
```

## Section Components

### Hero
```
╔══════════════════════════════════════════════════╗
║                                                  ║
║         24/7 EMERGENCY SERVICE                   ║
║                                                  ║
║      Professional Plumbing Services              ║
║         You Can Trust                            ║
║                                                  ║
║   Expert plumbing solutions for residential      ║
║   and commercial properties                      ║
║                                                  ║
║   [📞 Emergency Service] [View Services]         ║
║                                                  ║
╚══════════════════════════════════════════════════╝
```

### ServiceCard
```
┌───────────────────────────────┐
│        [Most Popular]         │
├───────────────────────────────┤
│   ╔═╗                         │
│   ║🔧║                        │
│   ╚═╝                         │
│   Emergency Plumbing          │
│   Starting at $150            │
│                               │
│   24/7 emergency service      │
│                               │
│   ✓ Available 24/7            │
│   ✓ Fast response time        │
│   ✓ Licensed professionals    │
│   ✓ Upfront pricing           │
│                               │
│   [Learn More →]              │
└───────────────────────────────┘
```

### TestimonialCard
```
┌───────────────────────────────┐
│ "                   ★★★★★     │
│                               │
│ Excellent service! They were  │
│ prompt and professional.      │
│                               │
│ ────────────────────────      │
│ [JD] John Doe                 │
│      Homeowner                │
│      2 weeks ago              │
└───────────────────────────────┘
```

### ProjectCard
```
┌───────────────────────────────┐
│ ╔═══════════════════════════╗ │
│ ║   [Project Photo]         ║ │
│ ║      [Residential]        ║ │
│ ╚═══════════════════════════╝ │
│                               │
│ Complete Kitchen Renovation   │
│ Full plumbing installation    │
│                               │
│ 📍 San Francisco, CA          │
│ 📅 January 2024               │
│                               │
│ [Installation] [Renovation]   │
└───────────────────────────────┘
```

### TeamMemberCard
```
┌───────────────────────────────┐
│ ╔═══════════════════════════╗ │
│ ║    [Team Member Photo]    ║ │
│ ╚═══════════════════════════╝ │
│                               │
│       Mike Johnson            │
│     Master Plumber            │
│                               │
│ 20+ years of experience       │
│                               │
│   [📧] [📞] [in]              │
└───────────────────────────────┘
```

### FaqAccordion
```
┌────────────────────────────────────────┐
│ Do you offer 24/7 emergency service? ▼ │
│ Yes, we provide round-the-clock...     │
├────────────────────────────────────────┤
│ What areas do you serve? ▶             │
├────────────────────────────────────────┤
│ Are you licensed and insured? ▶        │
└────────────────────────────────────────┘
```

## Component Combinations

### Complete Page Layout
```
┌──────────────────────────────────────────────────┐
│ Navbar                                           │
├──────────────────────────────────────────────────┤
│                                                  │
│ Hero Section                                     │
│                                                  │
├──────────────────────────────────────────────────┤
│ Breadcrumbs                                      │
├──────────────────────────────────────────────────┤
│                                                  │
│ [StatCard] [StatCard] [StatCard]                 │
│                                                  │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐         │
│ │ServiceCrd│ │ServiceCrd│ │ServiceCrd│         │
│ └──────────┘ └──────────┘ └──────────┘         │
│                                                  │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐         │
│ │Testimnial│ │Testimnial│ │Testimnial│         │
│ └──────────┘ └──────────┘ └──────────┘         │
│                                                  │
│ FAQ Accordion                                    │
│                                                  │
└──────────────────────────────────────────────────┘
```

### Admin Dashboard Layout
```
┌──┬─────────────────────────────────────────────┐
│S │ Breadcrumbs: Dashboard > Analytics          │
│i ├─────────────────────────────────────────────┤
│d │                                             │
│e │ [StatCard] [StatCard] [StatCard]            │
│b │                                             │
│a │ ┌─────────────────────────────────────────┐ │
│r │ │ DataTable                               │ │
│  │ │ ┌──────────────────────────────────┐   │ │
│  │ │ │ Name     Email      Status       │   │ │
│  │ │ │ ────────────────────────────────  │   │ │
│  │ │ │ John Doe john@... [Active]       │   │ │
│  │ │ └──────────────────────────────────┘   │ │
│  │ └─────────────────────────────────────────┘ │
└──┴─────────────────────────────────────────────┘
```

## Color Palette Reference

```
Primary Blue:    ■ bg-blue-600 (Default)
Primary Blue:    ■ bg-blue-700 (Hover)
Secondary Gray:  ■ bg-gray-600
Success Green:   ■ bg-green-600
Warning Yellow:  ■ bg-yellow-600
Danger Red:      ■ bg-red-600
Info Blue:       ■ bg-blue-500
```

## Size Reference

### Spacing
- Compact: 2 (8px)
- Standard: 4 (16px)
- Generous: 6 (24px)
- Large: 8 (32px)

### Text
- Small: text-sm (14px)
- Medium: text-base (16px)
- Large: text-lg (18px)
- XL: text-xl (20px)
- 2XL: text-2xl (24px)

### Borders
- Standard: rounded-lg (8px)
- Full: rounded-full (9999px)

## Quick Import Reference

```tsx
// Everything from one import
import {
  // UI
  Button, Input, Textarea, Select, Checkbox, Badge,
  Card, Modal, Dropdown, Toast, Skeleton, Spinner,

  // Forms
  FormField, ContactForm,

  // Data
  StarRating, RatingChart, StatCard, DataTable,

  // Navigation
  Navbar, MobileMenu, Breadcrumbs, Sidebar,

  // Sections
  Hero, ServiceCard, TestimonialCard, ProjectCard,
  TeamMemberCard, FaqAccordion,

  // Hooks
  useToast,

  // Providers
  ToastProvider,
} from '@/components';
```

## Component Decision Tree

**Need a button?** → Button
**Need form input?** → FormField (or Input/Textarea/Select directly)
**Need a full form?** → ContactForm
**Need to show ratings?** → StarRating or RatingChart
**Need to display stats?** → StatCard
**Need a data table?** → DataTable
**Need navigation?** → Navbar (public) or Sidebar (admin)
**Need a dialog?** → Modal
**Need notifications?** → Toast
**Need a content container?** → Card
**Need a page hero?** → Hero
**Need to showcase services?** → ServiceCard
**Need to show testimonials?** → TestimonialCard
**Need to display projects?** → ProjectCard
**Need FAQ section?** → FaqAccordion
**Need loading state?** → Skeleton or Spinner

## Accessibility Quick Reference

- All components are keyboard navigable (Tab, Enter, Escape, Arrows)
- All form elements have proper labels and ARIA attributes
- All interactive elements have focus indicators
- All images require alt text
- Color contrast meets WCAG AA standards
- Screen reader friendly with semantic HTML

## Browser Support

✓ Chrome (latest 2 versions)
✓ Firefox (latest 2 versions)
✓ Safari (latest 2 versions)
✓ Edge (latest 2 versions)
✓ Mobile browsers (iOS Safari, Chrome Mobile)
