import { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Phone, Clock, Printer, CheckCircle2 } from 'lucide-react';
import { PageSEO } from '@/lib/seo';
import { getGuideBySlug } from '@/data/guides';

const PHONE_NUMBER = '(619) 433-2169';
const PHONE_LINK = 'tel:+16194332169';

function PrintableForm({ position }: { position: 'top' | 'bottom' }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setSubmitting(true);
    try {
      const body = new URLSearchParams();
      body.append('form-name', 'guide-download');
      body.append('bot-field', '');
      body.append('name', name);
      body.append('email', email);
      body.append('guide', window.location.pathname);

      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });

      setSubmitted(true);
      window.print();
    } catch {
      // Still trigger print even on form error
      window.print();
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-t-page-alt border border-t-card-border p-6 text-center print:hidden">
        <CheckCircle2 className="w-8 h-8 text-patina-500 mx-auto mb-2" />
        <p className="text-t-text font-medium">Thanks! Your printable version is ready.</p>
        <button
          onClick={() => window.print()}
          className="mt-3 text-gold-500 font-medium hover:text-gold-400 inline-flex items-center gap-1"
        >
          <Printer className="w-4 h-4" />
          Print Again
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-t-page-alt border border-t-card-border p-6 print:hidden"
    >
      <p className="hidden">
        <label>
          Don&apos;t fill this out: <input name="bot-field" />
        </label>
      </p>
      <div className="flex items-center gap-2 mb-3">
        <Printer className="w-5 h-5 text-gold-500" />
        <h3 className="font-display text-lg text-t-text">Get Printable Version</h3>
      </div>
      <p className="text-t-text-secondary text-sm mb-4">
        Enter your details to unlock the print-friendly version of this guide.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input-editorial !py-3 text-sm"
          required
          aria-label={`Name for printable guide (${position})`}
        />
        <input
          type="email"
          name="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-editorial !py-3 text-sm"
          required
          aria-label={`Email for printable guide (${position})`}
        />
        <button
          type="submit"
          disabled={submitting}
          className="btn-gold !py-3 !px-6 text-sm whitespace-nowrap"
        >
          {submitting ? 'Sending...' : 'Print Guide'}
        </button>
      </div>
    </form>
  );
}

export default function GuidePage() {
  const { slug } = useParams<{ slug: string }>();
  const guide = slug ? getGuideBySlug(slug) : undefined;

  if (!guide) {
    return <Navigate to="/guides" replace />;
  }

  return (
    <div className="bg-t-page">
      <PageSEO
        title={guide.metaTitle}
        description={guide.metaDescription}
        path={`/guides/${slug}`}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Guides', url: '/guides' },
          { name: guide.title, url: `/guides/${slug}` },
        ]}
      />

      {/* Hero */}
      <section className="bg-t-page-alt py-20 lg:py-28 print:py-8">
        <div className="container-editorial">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-6 print:hidden">
              <div className="h-px w-12 bg-gold-500" />
              <Link to="/guides" className="text-gold-600 text-sm tracking-[0.2em] uppercase font-medium hover:text-gold-500 transition-colors">
                Guides
              </Link>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-t-text tracking-tight mb-4 print:text-3xl">
              {guide.heroHeading}
            </h1>
            <p className="text-xl text-t-text-secondary leading-relaxed mb-4 print:text-base">
              {guide.heroSubheading}
            </p>
            <div className="flex items-center gap-4 text-t-text-muted text-sm">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {guide.readTime}
              </span>
              <span>By Christensen Plumbing Co.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-24 bg-t-page print:py-4">
        <div className="container-editorial">
          <div className="max-w-3xl mx-auto">
            {/* Top printable form */}
            <div className="mb-12 print:hidden">
              <PrintableForm position="top" />
            </div>

            {/* Guide sections */}
            <div className="space-y-12 print:space-y-6">
              {guide.sections.map((section, i) => (
                <div key={i}>
                  <h2 className="font-display text-2xl lg:text-3xl text-t-text tracking-tight mb-4 print:text-xl">
                    {section.heading}
                  </h2>
                  {section.content.map((p, j) => (
                    <p key={j} className="text-t-text-secondary leading-relaxed text-lg mb-4 print:text-sm print:mb-2">
                      {p}
                    </p>
                  ))}
                  {section.items && (
                    <ul className="space-y-2 mt-4 print:mt-2">
                      {section.items.map((item, k) => (
                        <li key={k} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5 print:w-4 print:h-4" />
                          <span className="text-t-text-secondary print:text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            {/* CTA callout */}
            <div className="mt-12 p-6 bg-navy-900 text-white print:bg-gray-100 print:text-black">
              <p className="font-display text-lg mb-3">{guide.cta}</p>
              <a
                href={PHONE_LINK}
                className="inline-flex items-center gap-2 text-gold-400 font-semibold hover:text-gold-300 transition-colors print:text-black"
              >
                <Phone className="w-5 h-5" />
                {PHONE_NUMBER}
              </a>
            </div>

            {/* Bottom printable form */}
            <div className="mt-12 print:hidden">
              <PrintableForm position="bottom" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
