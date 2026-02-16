/**
 * Component Library Examples
 *
 * This file demonstrates how to use the Christensen Plumbing Co. component library.
 * Copy and adapt these examples for your own use cases.
 */

import React, { useState } from 'react';
import {
  // UI Components
  Button,
  Checkbox,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardBody,
  CardFooter,
  CardImage,
  Modal,
  useToast,

  // Form Components
  FormField,

  // Data Display
  StarRating,
  RatingChart,
  StatCard,
  DataTable,

  // Navigation
  Navbar,

  // Sections
  Hero,
  ServiceCard,
  TestimonialCard,
  FaqAccordion,
} from '@/components';

import { Phone, Mail, Wrench, Users, DollarSign, CheckCircle } from 'lucide-react';

// Example 1: Button Variations
export function ButtonExamples() {
  return (
    <div className="space-y-4 p-8">
      <h2 className="text-2xl font-bold">Button Examples</h2>

      <div className="flex flex-wrap gap-4">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Danger</Button>
      </div>

      <div className="flex flex-wrap gap-4">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </div>

      <div className="flex flex-wrap gap-4">
        <Button leftIcon={<Phone />}>Call Now</Button>
        <Button rightIcon={<Mail />}>Email Us</Button>
        <Button isLoading>Loading...</Button>
      </div>
    </div>
  );
}

// Example 2: Form Components
export function FormExample() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: '',
    agree: false,
  });

  return (
    <div className="max-w-2xl p-8">
      <h2 className="mb-6 text-2xl font-bold">Form Example</h2>

      <div className="space-y-4">
        <FormField
          label="Full Name"
          type="text"
          placeholder="John Doe"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />

        <FormField
          label="Email"
          type="email"
          placeholder="john@example.com"
          leftIcon={<Mail className="h-5 w-5" />}
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />

        <FormField
          label="Service Needed"
          as="select"
          value={formData.service}
          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
          required
        >
          <option value="">Select a service...</option>
          <option value="emergency">Emergency Plumbing</option>
          <option value="repair">Repair Service</option>
          <option value="installation">Installation</option>
        </FormField>

        <FormField
          label="Message"
          as="textarea"
          placeholder="Describe your needs..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          required
        />

        <Checkbox
          label="I agree to the terms and conditions"
          checked={formData.agree}
          onChange={(e) => setFormData({ ...formData, agree: e.target.checked })}
        />

        <Button type="submit" variant="primary" fullWidth>
          Submit Request
        </Button>
      </div>
    </div>
  );
}

// Example 3: Cards
export function CardExamples() {
  return (
    <div className="grid gap-6 p-8 md:grid-cols-2 lg:grid-cols-3">
      <Card hoverable>
        <CardImage src="https://placehold.co/400x200" alt="Service" />
        <CardHeader>
          <CardTitle>Basic Card</CardTitle>
          <CardDescription>This is a simple card with an image</CardDescription>
        </CardHeader>
        <CardBody>
          <p>Card content goes here. This can include any text or components.</p>
        </CardBody>
        <CardFooter>
          <Button variant="outline" fullWidth>Learn More</Button>
        </CardFooter>
      </Card>

      <ServiceCard
        title="Emergency Plumbing"
        description="24/7 emergency service for urgent plumbing issues"
        icon={Wrench}
        features={[
          'Available 24/7',
          'Fast response time',
          'Licensed professionals',
          'Upfront pricing',
        ]}
        price="Starting at $150"
        href="/services/emergency"
        popular
      />

      <TestimonialCard
        name="Jane Smith"
        role="Homeowner"
        rating={5}
        text="Excellent service! They were prompt, professional, and fixed our leak quickly. Highly recommend!"
        date="1 week ago"
      />
    </div>
  );
}

// Example 4: Modal
export function ModalExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-8">
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Schedule Service"
        description="Fill out the form to schedule your plumbing service"
        size="md"
      >
        <div className="space-y-4">
          <FormField label="Name" type="text" placeholder="Your name" />
          <FormField label="Phone" type="tel" placeholder="(555) 123-4567" />
          <FormField label="Date" type="date" />
          <div className="flex gap-3 pt-4">
            <Button variant="primary" fullWidth>Confirm</Button>
            <Button variant="outline" fullWidth onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

// Example 5: Toast Notifications
export function ToastExample() {
  const { showToast } = useToast();

  return (
    <div className="space-y-4 p-8">
      <h2 className="text-2xl font-bold">Toast Examples</h2>

      <div className="flex flex-wrap gap-4">
        <Button
          variant="primary"
          onClick={() =>
            showToast({
              type: 'success',
              title: 'Success!',
              message: 'Your request was completed successfully',
            })
          }
        >
          Show Success
        </Button>

        <Button
          variant="danger"
          onClick={() =>
            showToast({
              type: 'error',
              title: 'Error',
              message: 'Something went wrong. Please try again.',
            })
          }
        >
          Show Error
        </Button>

        <Button
          variant="secondary"
          onClick={() =>
            showToast({
              type: 'warning',
              title: 'Warning',
              message: 'Please review your information before proceeding',
            })
          }
        >
          Show Warning
        </Button>

        <Button
          variant="outline"
          onClick={() =>
            showToast({
              type: 'info',
              title: 'Information',
              message: 'Here is some helpful information',
            })
          }
        >
          Show Info
        </Button>
      </div>
    </div>
  );
}

// Example 6: Data Display
export function DataDisplayExamples() {
  const stats = [
    {
      label: 'Total Customers',
      value: '1,234',
      icon: Users,
      trend: { value: 12, isPositive: true },
      color: 'blue' as const,
    },
    {
      label: 'Revenue',
      value: '$45.2K',
      icon: DollarSign,
      trend: { value: 8, isPositive: true },
      color: 'green' as const,
    },
    {
      label: 'Jobs Completed',
      value: '856',
      icon: CheckCircle,
      trend: { value: 23, isPositive: true },
      color: 'blue' as const,
    },
  ];

  return (
    <div className="space-y-8 p-8">
      <div className="grid gap-6 md:grid-cols-3">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <h3 className="mb-4 text-lg font-semibold">Star Rating</h3>
          <StarRating rating={4.5} showNumber size="lg" />
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold">Rating Distribution</h3>
          <RatingChart
            distribution={{ 5: 50, 4: 30, 3: 15, 2: 3, 1: 2 }}
            totalReviews={100}
          />
        </div>
      </div>
    </div>
  );
}

// Example 7: DataTable
export function DataTableExample() {
  const columns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'phone', label: 'Phone', sortable: false },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (value: string) => (
        <Badge variant={value === 'active' ? 'success' : 'warning'}>
          {value}
        </Badge>
      ),
    },
  ];

  const data = [
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '555-1234', status: 'active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '555-5678', status: 'active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', phone: '555-9012', status: 'inactive' },
  ];

  return (
    <div className="p-8">
      <h2 className="mb-6 text-2xl font-bold">Data Table Example</h2>
      <DataTable
        columns={columns}
        data={data}
        keyField="id"
        selectable
        onSelectionChange={(selected) => console.log('Selected:', selected)}
      />
    </div>
  );
}

// Example 8: Hero Section
export function HeroExample() {
  return (
    <Hero
      subtitle="24/7 Emergency Service"
      title="Professional Plumbing Services You Can Trust"
      description="Expert plumbing solutions for residential and commercial properties throughout the Bay Area"
      primaryCta={{
        text: 'Get Emergency Service',
        href: '/emergency',
        icon: <Phone className="h-5 w-5" />,
      }}
      secondaryCta={{
        text: 'View All Services',
        href: '/services',
      }}
      backgroundImage="https://placehold.co/1920x1080"
      overlay
    />
  );
}

// Example 9: FAQ Accordion
export function FaqExample() {
  const faqs = [
    {
      question: 'Do you offer 24/7 emergency service?',
      answer: 'Yes, we provide round-the-clock emergency plumbing services. Call us anytime at (555) 123-4567.',
    },
    {
      question: 'What areas do you serve?',
      answer: 'We serve all of San Francisco Bay Area including San Francisco, Oakland, San Jose, and surrounding counties.',
    },
    {
      question: 'Are you licensed and insured?',
      answer: 'Yes, we are fully licensed, bonded, and insured. All our plumbers are certified professionals.',
    },
    {
      question: 'Do you provide free estimates?',
      answer: 'Yes, we provide free estimates for most services. Contact us to schedule an evaluation.',
    },
  ];

  return (
    <div className="mx-auto max-w-3xl p-8">
      <h2 className="mb-6 text-2xl font-bold">Frequently Asked Questions</h2>
      <FaqAccordion items={faqs} defaultExpanded={[0]} />
    </div>
  );
}

// Example 10: Complete Page Layout
export function CompletePageExample() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        logo={<span className="text-xl font-bold text-blue-600">Christensen Plumbing</span>}
        links={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Projects', href: '/projects' },
          { label: 'About', href: '/about' },
        ]}
        ctaText="Get a Quote"
        ctaHref="/contact"
        phoneNumber="(555) 123-4567"
      />

      <main>
        <HeroExample />

        <section className="container mx-auto py-16">
          <DataDisplayExamples />
        </section>

        <section className="bg-white py-16">
          <div className="container mx-auto">
            <h2 className="mb-8 text-center text-3xl font-bold">Our Services</h2>
            <CardExamples />
          </div>
        </section>

        <section className="container mx-auto py-16">
          <FaqExample />
        </section>
      </main>
    </div>
  );
}
