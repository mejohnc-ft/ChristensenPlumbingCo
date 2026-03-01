import { Link } from 'react-router-dom';
import { Phone, CheckCircle2, AlertTriangle } from 'lucide-react';
import { PageSEO } from '@/lib/seo';
import PricingCalculator from '@/components/sections/PricingCalculator';

const PHONE_NUMBER = '(619) 433-2169';
const PHONE_LINK = 'tel:+16194332169';

const PRICING_FACTORS = [
  {
    title: 'Scope of Work',
    description: 'A simple faucet replacement costs less than a whole-house repipe. We assess the full scope before quoting.',
  },
  {
    title: 'Material Costs',
    description: 'Different pipe materials (copper vs. PEX) and fixture quality levels affect the overall project cost.',
  },
  {
    title: 'Property Access',
    description: 'Accessibility of pipes and fixtures affects labor time. Slab access or multi-story work may add to the estimate.',
  },
  {
    title: 'Permits & Inspections',
    description: 'Some projects require city permits and inspections, which are included in our comprehensive quotes.',
  },
];

export default function PricingPage() {
  return (
    <div className="bg-t-page">
      <PageSEO
        title="Plumbing Pricing Estimator | Christensen Plumbing Co."
        description="Get an instant estimate for plumbing services in San Diego. Interactive pricing calculator for drain cleaning, water heaters, pipe repair, and more."
        keywords={['plumbing prices San Diego', 'plumber cost estimate', 'drain cleaning cost', 'water heater installation price']}
        path="/pricing"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Pricing', url: '/pricing' },
        ]}
      />

      {/* Hero */}
      <section className="bg-t-page-alt py-20 lg:py-28">
        <div className="container-editorial">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-12 bg-gold-500" />
              <span className="text-gold-600 text-sm tracking-[0.2em] uppercase font-medium">
                Pricing
              </span>
              <div className="h-px w-12 bg-gold-500" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-t-text tracking-tight mb-6">
              Plumbing Cost <span className="text-gold-400">Estimator</span>
            </h1>
            <p className="text-xl text-t-text-secondary leading-relaxed">
              Get an instant ballpark estimate for your plumbing project. We always provide exact, upfront pricing before starting any work.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-20 lg:py-28 bg-t-page">
        <div className="container-editorial">
          <div className="max-w-3xl mx-auto">
            <PricingCalculator />
          </div>
        </div>
      </section>

      {/* What Affects Pricing */}
      <section className="py-20 lg:py-28 bg-t-page-alt">
        <div className="container-editorial">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl lg:text-4xl text-t-text tracking-tight mb-4">
              What Affects <span className="text-gold-400">Pricing</span>
            </h2>
            <p className="text-t-text-secondary text-lg max-w-2xl mx-auto">
              Every plumbing job is unique. Here are the key factors that determine your final quote.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {PRICING_FACTORS.map((factor) => (
              <div key={factor.title} className="bg-t-card border border-t-card-border p-6">
                <h3 className="font-display text-lg text-t-text mb-2">{factor.title}</h3>
                <p className="text-t-text-secondary text-sm leading-relaxed">{factor.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Pricing Promise */}
      <section className="py-20 lg:py-28 bg-t-page">
        <div className="container-editorial">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-3xl lg:text-4xl text-t-text tracking-tight mb-8 text-center">
              Our Pricing <span className="text-gold-400">Promise</span>
            </h2>

            <div className="space-y-4">
              {[
                'Free estimates with no obligation',
                'Upfront, written pricing before any work begins',
                'No surprise charges — ever',
                'No extra fees for nights, weekends, or holidays',
                'Price match guarantee for comparable licensed plumbers',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" />
                  <span className="text-t-text-secondary text-lg">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-t-page-alt border border-t-card-border flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" />
              <p className="text-t-text-secondary text-sm">
                <strong className="text-t-text">Important:</strong> Online estimates are ballpark figures only. Actual pricing requires an on-site evaluation. We never begin work without your written approval of the exact price.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-24 bg-navy-900">
        <div className="container-editorial text-center">
          <h2 className="font-display text-3xl lg:text-4xl text-white mb-4">
            Ready for an Exact Quote?
          </h2>
          <p className="text-navy-200 text-lg mb-8 max-w-2xl mx-auto">
            Call us for a free, no-obligation estimate. Or{' '}
            <Link to="/contact" className="text-gold-400 hover:text-gold-300 underline">
              fill out our contact form
            </Link>{' '}
            and we&apos;ll call you back.
          </p>
          <a
            href={PHONE_LINK}
            className="btn-gold gap-3"
          >
            <Phone className="w-5 h-5" />
            <span>Call {PHONE_NUMBER}</span>
          </a>
        </div>
      </section>
    </div>
  );
}
