import { Link } from 'react-router-dom';
import { BookOpen, Clock, ArrowRight } from 'lucide-react';
import { PageSEO } from '@/lib/seo';
import { GUIDES } from '@/data/guides';

export default function GuidesPage() {
  return (
    <div className="bg-t-page">
      <PageSEO
        title="Free Plumbing Guides | Christensen Plumbing Co."
        description="Free plumbing guides for San Diego homeowners. Maintenance checklists, emergency guides, and buying guides from your trusted local plumber."
        keywords={['plumbing guide', 'plumbing maintenance checklist', 'water heater buying guide', 'emergency plumbing guide']}
        path="/guides"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Guides', url: '/guides' },
        ]}
      />

      {/* Hero */}
      <section className="bg-t-page-alt py-20 lg:py-28">
        <div className="container-editorial">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-12 bg-gold-500" />
              <span className="text-gold-600 text-sm tracking-[0.2em] uppercase font-medium">
                Resources
              </span>
              <div className="h-px w-12 bg-gold-500" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-t-text tracking-tight mb-6">
              Free Plumbing <span className="text-gold-400">Guides</span>
            </h1>
            <p className="text-xl text-t-text-secondary leading-relaxed">
              Expert plumbing knowledge for San Diego homeowners. Printable guides you can reference anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Guide Cards */}
      <section className="py-20 lg:py-28 bg-t-page">
        <div className="container-editorial">
          <div className="grid md:grid-cols-3 gap-8">
            {GUIDES.map((guide) => (
              <Link
                key={guide.slug}
                to={`/guides/${guide.slug}`}
                className="group bg-t-card border border-t-card-border p-8 hover:border-gold-500/50 transition-colors"
              >
                <BookOpen className="w-8 h-8 text-gold-500 mb-4" />
                <h2 className="font-display text-xl text-t-text mb-3 group-hover:text-gold-500 transition-colors">
                  {guide.title}
                </h2>
                <p className="text-t-text-secondary text-sm leading-relaxed mb-4">
                  {guide.heroSubheading}
                </p>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-t-text-muted text-xs">
                    <Clock className="w-3 h-3" />
                    {guide.readTime}
                  </span>
                  <span className="inline-flex items-center gap-1 text-gold-500 text-sm font-medium">
                    Read Guide <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
