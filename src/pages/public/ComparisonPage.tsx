import { useParams, Link, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { Phone, CheckCircle2, XCircle, MinusCircle, ChevronDown } from 'lucide-react';
import { PageSEO, FAQSchema } from '@/lib/seo';
import { getComparisonBySlug } from '@/data/comparisons';
import LeadCaptureForm from '@/components/forms/LeadCaptureForm';

const PHONE_NUMBER = '(619) 433-2169';
const PHONE_LINK = 'tel:+16194332169';

export default function ComparisonPage() {
  const { slug } = useParams<{ slug: string }>();
  const comparison = slug ? getComparisonBySlug(slug) : undefined;
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  if (!comparison) {
    return <Navigate to="/services" replace />;
  }

  return (
    <div className="bg-t-page">
      <PageSEO
        title={comparison.metaTitle}
        description={comparison.metaDescription}
        path={`/compare/${slug}`}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Services', url: '/services' },
          { name: comparison.title, url: `/compare/${slug}` },
        ]}
      />
      <FAQSchema items={comparison.faqs} />

      {/* Hero */}
      <section className="bg-t-page-alt py-20 lg:py-28">
        <div className="container-editorial">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-12 bg-gold-500" />
              <Link to="/services" className="text-gold-600 text-sm tracking-[0.2em] uppercase font-medium hover:text-gold-500 transition-colors">
                Compare
              </Link>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-t-text tracking-tight mb-6">
              Christensen Plumbing{' '}
              <span className="text-gold-400">{comparison.title}</span>
            </h1>
            <p className="text-xl text-t-text-secondary leading-relaxed">
              {comparison.heroSubheading}
            </p>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-20 lg:py-28 bg-t-page">
        <div className="container-editorial">
          <div className="max-w-3xl mx-auto space-y-6 text-t-text-secondary leading-relaxed text-lg">
            {comparison.intro.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Grid */}
      <section className="py-20 lg:py-28 bg-t-page-alt">
        <div className="container-editorial">
          <h2 className="font-display text-3xl lg:text-4xl text-t-text tracking-tight mb-12 text-center">
            Side-by-Side <span className="text-gold-400">Comparison</span>
          </h2>

          <div className="max-w-4xl mx-auto space-y-4">
            {/* Header row (desktop) */}
            <div className="hidden md:grid grid-cols-[1fr,1fr,1fr] gap-4 text-center text-sm font-semibold text-t-text-muted uppercase tracking-wider pb-2">
              <div />
              <div className="text-gold-500">Christensen Plumbing</div>
              <div>Competitor</div>
            </div>

            {comparison.comparisonPoints.map((point, i) => (
              <div
                key={i}
                className="bg-t-card border border-t-card-border p-6"
              >
                <h3 className="font-semibold text-t-text mb-4 text-center">{point.category}</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className={`p-4 border ${
                    point.advantage === 'christensen'
                      ? 'border-gold-500/50 bg-gold-50/50'
                      : 'border-t-card-border'
                  }`}>
                    <div className="flex items-start gap-2">
                      {point.advantage === 'christensen' ? (
                        <CheckCircle2 className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" />
                      ) : point.advantage === 'neutral' ? (
                        <MinusCircle className="w-5 h-5 text-t-text-muted flex-shrink-0 mt-0.5" />
                      ) : (
                        <MinusCircle className="w-5 h-5 text-t-text-muted flex-shrink-0 mt-0.5" />
                      )}
                      <div>
                        <div className="text-xs font-medium text-gold-500 uppercase tracking-wider mb-1">Christensen</div>
                        <p className="text-t-text-secondary text-sm">{point.christensen}</p>
                      </div>
                    </div>
                  </div>
                  <div className={`p-4 border ${
                    point.advantage === 'competitor'
                      ? 'border-gold-500/50 bg-gold-50/50'
                      : 'border-t-card-border'
                  }`}>
                    <div className="flex items-start gap-2">
                      {point.advantage === 'competitor' ? (
                        <CheckCircle2 className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" />
                      ) : point.advantage === 'neutral' ? (
                        <MinusCircle className="w-5 h-5 text-t-text-muted flex-shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-5 h-5 text-emergency-500 flex-shrink-0 mt-0.5" />
                      )}
                      <div>
                        <div className="text-xs font-medium text-t-text-muted uppercase tracking-wider mb-1">Competitor</div>
                        <p className="text-t-text-secondary text-sm">{point.competitor}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Conclusion */}
      <section className="py-20 lg:py-28 bg-t-page">
        <div className="container-editorial">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-3xl lg:text-4xl text-t-text tracking-tight mb-8 text-center">
              The <span className="text-gold-400">Bottom Line</span>
            </h2>
            <div className="space-y-6 text-t-text-secondary leading-relaxed text-lg">
              {comparison.conclusion.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 lg:py-28 bg-t-page-alt">
        <div className="container-editorial">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-3xl lg:text-4xl text-t-text tracking-tight mb-12 text-center">
              Frequently Asked <span className="text-gold-400">Questions</span>
            </h2>
            <div className="space-y-3">
              {comparison.faqs.map((faq, index) => (
                <div key={index} className="bg-t-card border border-t-card-border">
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    aria-expanded={openFaq === index}
                    className="w-full flex items-center justify-between p-6 text-left"
                  >
                    <span className="font-semibold text-t-text pr-4">{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-gold-500 flex-shrink-0 transition-transform ${
                        openFaq === index ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-6">
                      <p className="text-t-text-secondary leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA with Lead Form */}
      <section className="py-20 lg:py-24 bg-navy-900">
        <div className="container-editorial">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="font-display text-3xl lg:text-4xl text-white mb-4">
                Ready to Experience the Difference?
              </h2>
              <p className="text-navy-200 text-lg mb-6">
                See why San Diego homeowners choose Christensen Plumbing. Get a free estimate today.
              </p>
              <a
                href={PHONE_LINK}
                className="inline-flex items-center gap-3 text-gold-400 text-xl font-semibold hover:text-gold-300 transition-colors"
              >
                <Phone className="w-6 h-6" />
                <span>{PHONE_NUMBER}</span>
              </a>
            </div>
            <LeadCaptureForm heading="Get a Free Estimate" />
          </div>
        </div>
      </section>
    </div>
  );
}
