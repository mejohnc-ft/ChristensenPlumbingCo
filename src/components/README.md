# Christensen Plumbing Co. Component Library

A comprehensive, accessible, and reusable UI component library built with React, TypeScript, and Tailwind CSS.

## Installation & Setup

All components are ready to use. Just import from `@/components`:

```tsx
import { Button, Card, Modal } from '@/components';
```

## Base UI Components (`ui/`)

### Button
Versatile button component with multiple variants and loading state.

```tsx
import { Button } from '@/components';

// Basic usage
<Button variant="primary" size="md">Click Me</Button>

// With icons
<Button leftIcon={<Phone />} variant="primary">Call Now</Button>

// Loading state
<Button isLoading variant="primary">Submitting...</Button>

// As a link
<Button as="a" href="/contact" variant="primary">Get Quote</Button>

// Full width
<Button fullWidth variant="primary">Submit</Button>
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
- `size`: 'sm' | 'md' | 'lg'
- `isLoading`: boolean
- `leftIcon`, `rightIcon`: React.ReactNode
- `fullWidth`: boolean
- `as`: 'button' | 'a'
- `href`: string (when as="a")

### Input
Styled input field with icon support and error states.

```tsx
import { Input } from '@/components';
import { Mail, Search } from 'lucide-react';

<Input
  type="email"
  placeholder="Enter email"
  leftIcon={<Mail />}
  error={hasError}
/>
```

### Textarea
Multi-line text input with error states.

```tsx
import { Textarea } from '@/components';

<Textarea
  placeholder="Enter your message"
  rows={5}
  error={hasError}
/>
```

### Select
Dropdown select with custom styling.

```tsx
import { Select } from '@/components';

<Select error={hasError}>
  <option value="">Select an option</option>
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
</Select>
```

### Checkbox
Checkbox with optional label and custom styling.

```tsx
import { Checkbox } from '@/components';

<Checkbox label="I agree to terms" />
```

### Badge
Small status indicator or label.

```tsx
import { Badge } from '@/components';

<Badge variant="success" size="md">Active</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="danger">Error</Badge>
```

**Variants:** 'default' | 'success' | 'warning' | 'danger' | 'info'

### Card
Flexible card component with header, body, and footer sections.

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardBody, CardFooter, CardImage } from '@/components';

<Card hoverable clickable>
  <CardImage src="/image.jpg" alt="Card image" />
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description text</CardDescription>
  </CardHeader>
  <CardBody>
    <p>Card content goes here</p>
  </CardBody>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

### Modal
Accessible modal dialog with portal rendering.

```tsx
import { Modal } from '@/components';
import { useState } from 'react';

const [isOpen, setIsOpen] = useState(false);

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Modal Title"
  description="Modal description"
  size="md"
  closeOnEscape
  closeOnClickOutside
>
  <p>Modal content</p>
</Modal>
```

**Props:**
- `size`: 'sm' | 'md' | 'lg' | 'xl' | 'full'
- `closeOnEscape`: boolean (default: true)
- `closeOnClickOutside`: boolean (default: true)
- `showCloseButton`: boolean (default: true)

### Dropdown
Dropdown menu with custom trigger and items.

```tsx
import { Dropdown } from '@/components';
import { Settings, User, LogOut } from 'lucide-react';

<Dropdown
  trigger={<button>Menu</button>}
  items={[
    { label: 'Profile', value: 'profile', icon: <User />, onClick: () => {} },
    { label: 'Settings', value: 'settings', icon: <Settings />, onClick: () => {} },
    { label: 'Logout', value: 'logout', icon: <LogOut />, onClick: () => {} },
  ]}
  align="right"
/>
```

### Toast (with Provider)
Toast notification system with context provider.

```tsx
// In your root App component
import { ToastProvider } from '@/components';

function App() {
  return (
    <ToastProvider position="top-right">
      <YourApp />
    </ToastProvider>
  );
}

// In any component
import { useToast } from '@/components';

const { showToast } = useToast();

showToast({
  type: 'success',
  title: 'Success!',
  message: 'Your action was completed',
  duration: 5000,
});
```

**Toast Types:** 'success' | 'error' | 'warning' | 'info'

### Skeleton
Loading placeholder with different variants.

```tsx
import { Skeleton, SkeletonCard, SkeletonList } from '@/components';

// Basic skeleton
<Skeleton width={200} height={20} />

// Pre-built patterns
<SkeletonCard />
<SkeletonList count={5} />
```

### Spinner
Loading spinner with size and color options.

```tsx
import { Spinner } from '@/components';

<Spinner size="md" color="primary" />
```

## Form Components (`forms/`)

### FormField
Complete form field with label, input, and error message.

```tsx
import { FormField } from '@/components';

<FormField
  label="Email Address"
  type="email"
  name="email"
  placeholder="your@email.com"
  error={errors.email}
  helperText="We'll never share your email"
  required
/>

// As textarea
<FormField
  label="Message"
  as="textarea"
  name="message"
  error={errors.message}
  required
/>

// As select
<FormField
  label="Service"
  as="select"
  name="service"
  error={errors.service}
  required
>
  <option value="">Select...</option>
  <option value="repair">Repair</option>
</FormField>
```

### ContactForm
Pre-built contact/service request form with validation.

```tsx
import { ContactForm } from '@/components';

<ContactForm
  onSubmit={async (data) => {
    // Handle form submission
    console.log(data);
  }}
/>
```

## Data Display Components (`data-display/`)

### StarRating
Display star ratings with partial star support.

```tsx
import { StarRating } from '@/components';

<StarRating rating={4.5} size="md" showNumber />
```

### RatingChart
Bar chart showing rating distribution.

```tsx
import { RatingChart } from '@/components';

<RatingChart
  distribution={{
    5: 50,
    4: 30,
    3: 15,
    2: 3,
    1: 2,
  }}
  totalReviews={100}
  animate
/>
```

### StatCard
Card displaying statistics with optional trend.

```tsx
import { StatCard } from '@/components';
import { Users } from 'lucide-react';

<StatCard
  label="Total Customers"
  value="1,234"
  icon={Users}
  trend={{ value: 12, isPositive: true }}
  description="Active this month"
  color="blue"
/>
```

### DataTable
Sortable, selectable data table with loading and empty states.

```tsx
import { DataTable } from '@/components';

const columns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  {
    key: 'status',
    label: 'Status',
    render: (value) => <Badge>{value}</Badge>
  },
];

<DataTable
  columns={columns}
  data={users}
  keyField="id"
  selectable
  onSelectionChange={(selected) => console.log(selected)}
  isLoading={isLoading}
  emptyMessage="No users found"
/>
```

## Navigation Components (`navigation/`)

### Navbar
Responsive navigation bar with mobile menu.

```tsx
import { Navbar } from '@/components';

<Navbar
  logo={<img src="/logo.svg" alt="Logo" />}
  links={[
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'About', href: '/about' },
  ]}
  ctaText="Get a Quote"
  ctaHref="/contact"
  phoneNumber="(555) 123-4567"
/>
```

### MobileMenu
Slide-in mobile menu panel.

```tsx
import { MobileMenu } from '@/components';
import { Home, Wrench, Phone } from 'lucide-react';

<MobileMenu
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  links={[
    { label: 'Home', href: '/', icon: <Home /> },
    { label: 'Services', href: '/services', icon: <Wrench /> },
    { label: 'Contact', href: '/contact', icon: <Phone /> },
  ]}
  footer={<Button fullWidth>Get Quote</Button>}
/>
```

### Breadcrumbs
Navigation breadcrumb trail.

```tsx
import { Breadcrumbs } from '@/components';

<Breadcrumbs
  items={[
    { label: 'Services', href: '/services' },
    { label: 'Plumbing', href: '/services/plumbing' },
    { label: 'Emergency Repair' },
  ]}
  showHome
/>
```

### Sidebar
Collapsible admin sidebar with nested items.

```tsx
import { Sidebar } from '@/components';
import { Home, Users, Settings } from 'lucide-react';

<Sidebar
  items={[
    {
      label: 'Dashboard',
      href: '/admin',
      icon: Home
    },
    {
      label: 'Users',
      href: '/admin/users',
      icon: Users,
      badge: 5,
      children: [
        { label: 'All Users', href: '/admin/users/all', icon: Users },
        { label: 'Add User', href: '/admin/users/add', icon: Users },
      ]
    },
  ]}
  collapsible
  logo={<img src="/logo.svg" alt="Logo" />}
/>
```

## Section Components (`sections/`)

### Hero
Hero section with background image support.

```tsx
import { Hero } from '@/components';
import { Phone, ArrowRight } from 'lucide-react';

<Hero
  title="Professional Plumbing Services"
  subtitle="24/7 Emergency Service"
  description="Expert plumbing solutions for residential and commercial properties"
  backgroundImage="/hero-bg.jpg"
  overlay
  primaryCta={{
    text: 'Get Emergency Service',
    href: '/emergency',
    icon: <Phone />,
  }}
  secondaryCta={{
    text: 'View Services',
    href: '/services',
    icon: <ArrowRight />,
  }}
/>
```

### ServiceCard
Service offering card with features list.

```tsx
import { ServiceCard } from '@/components';
import { Wrench } from 'lucide-react';

<ServiceCard
  title="Drain Cleaning"
  description="Professional drain cleaning and unclogging services"
  icon={Wrench}
  features={[
    'High-pressure water jetting',
    'Camera inspection',
    'Same-day service',
    '90-day guarantee',
  ]}
  price="Starting at $99"
  href="/services/drain-cleaning"
  popular
/>
```

### TestimonialCard
Customer testimonial card with rating.

```tsx
import { TestimonialCard } from '@/components';

<TestimonialCard
  name="John Smith"
  role="Homeowner"
  avatar="/avatars/john.jpg"
  rating={5}
  text="Excellent service! They fixed our emergency leak within an hour."
  date="2 weeks ago"
/>
```

### ProjectCard
Portfolio/project showcase card.

```tsx
import { ProjectCard } from '@/components';

<ProjectCard
  title="Complete Kitchen Renovation"
  description="Full plumbing installation for modern kitchen remodel"
  image="/projects/kitchen.jpg"
  category="Residential"
  location="San Francisco, CA"
  date="January 2024"
  tags={['Installation', 'Renovation', 'Commercial-grade']}
  href="/projects/kitchen-renovation"
/>
```

### TeamMemberCard
Team member profile card.

```tsx
import { TeamMemberCard } from '@/components';

<TeamMemberCard
  name="Mike Johnson"
  role="Master Plumber"
  image="/team/mike.jpg"
  bio="20+ years of experience in residential plumbing"
  email="mike@christensenplumbing.com"
  phone="(555) 123-4567"
  linkedin="https://linkedin.com/in/mikejohnson"
/>
```

### FaqAccordion
Expandable FAQ accordion.

```tsx
import { FaqAccordion } from '@/components';

<FaqAccordion
  items={[
    {
      question: 'Do you offer 24/7 emergency service?',
      answer: 'Yes, we provide round-the-clock emergency plumbing services.',
    },
    {
      question: 'What areas do you serve?',
      answer: 'We serve all of San Francisco Bay Area and surrounding counties.',
    },
  ]}
  allowMultiple={false}
  defaultExpanded={[0]}
/>
```

## Styling Guidelines

All components use Tailwind CSS with the following design tokens:

**Colors:**
- Primary: blue-600, blue-700
- Secondary: gray-600, gray-700
- Success: green-600
- Warning: yellow-600
- Danger: red-600
- Info: blue-600

**Spacing:**
- Standard: space-y-4, gap-4, p-4, p-6
- Compact: space-y-2, gap-2, p-2
- Generous: space-y-6, gap-6, p-8

**Borders:**
- Radius: rounded-lg (default), rounded-full (circular)
- Width: border, border-2

**Shadows:**
- Card: shadow-md
- Elevated: shadow-lg
- Hover: hover:shadow-xl

## Accessibility

All components follow WCAG 2.1 Level AA guidelines:

- Proper ARIA labels and roles
- Keyboard navigation support
- Focus visible indicators
- Screen reader compatibility
- Semantic HTML elements
- Color contrast ratios

## TypeScript

All components are fully typed with exported interfaces:

```tsx
import type { ButtonProps, ModalProps, CardProps } from '@/components';
```

## Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

## Contributing

When adding new components:

1. Follow the existing naming conventions
2. Include proper TypeScript types
3. Add accessibility features
4. Use the `cn()` utility for class names
5. Export from the appropriate index file
6. Document props and usage examples
