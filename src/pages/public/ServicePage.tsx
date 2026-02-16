import { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Phone, ArrowRight, ChevronDown, CheckCircle2, MapPin } from 'lucide-react';
import { PageSEO, FAQSchema, HowToSchema } from '@/lib/seo';
import { getServiceBySlug, SERVICES } from '@/data/services';
import { SEO_DEFAULTS } from '@/lib/seo';

const PHONE_NUMBER = '(619) 433-2169';
const PHONE_LINK = 'tel:+16194332169';

export default function ServicePage() {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? getServiceBySlug(slug) : undefined;
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const relatedServices = SERVICES.filter((s) =>
    service.relatedServices.includes(s.slug)
  );

  return (
    <div className="bg-t-page">
      <PageSEO
        service={slug}
        path={`/services/${slug}`}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Services', url: '/services' },
          { name: service.name, url: `/services/${slug}` },
        ]}
      />
      <FAQSchema items={service.faqs} />
      {service.howTo && (
        <HowToSchema
          name={service.howTo.name}
          description={service.howTo.description}
          steps={service.howTo.steps}
        />
      )}

      {/* Hero Section */}
      <section className="bg-t-page-alt py-20 lg:py-28">
        <div className="container-editorial">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-12 bg-gold-500" />
              <Link to="/services" className="text-gold-600 text-sm tracking-[0.2em] uppercase font-medium hover:text-gold-500 transition-colors">
                Services
              </Link>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-t-text tracking-tight mb-6">
              {service.heroTitle}
            </h1>
            <p className="text-xl text-t-text-secondary leading-relaxed mb-8">
              {service.shortDescription}
            </p>
            <a
              href={PHONE_LINK}
              className="btn-gold gap-3"
            >
              <Phone className="w-5 h-5" />
              <span>Call {PHONE_NUMBER}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="py-20 lg:py-28 bg-t-page">
        <div className="container-editorial">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            <div>
              <div className="space-y-6 text-t-text-secondary leading-relaxed text-lg">
                {service.description.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-display text-2xl text-t-text mb-8">What We Offer</h2>
              <div className="space-y-4">
                {service.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" />
                    <span className="text-t-text-secondary">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-20 lg:py-28 bg-t-page-alt">
        <div className="container-editorial">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl lg:text-4xl text-t-text tracking-tight mb-4">
                Frequently Asked <span className="text-gold-400">Questions</span>
              </h2>
              <p className="text-t-text-secondary text-lg">
                Common questions about our {service.name.toLowerCase()} services in San Diego.
              </p>
            </div>

            <div className="space-y-3">
              {service.faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-t-card border border-t-card-border"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    aria-expanded={openFaq === index}
                    aria-controls={`faq-answer-${index}`}
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
                    <div id={`faq-answer-${index}`} role="region" className="px-6 pb-6">
                      <p className="text-t-text-secondary leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-20 lg:py-28 bg-t-page">
        <div className="container-editorial">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl lg:text-4xl text-t-text tracking-tight mb-4">
              Areas We <span className="text-gold-400">Serve</span>
            </h2>
            <p className="text-t-text-secondary text-lg">
              {service.name} services available throughout San Diego County.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {SEO_DEFAULTS.serviceAreaCities.map((city) => (
              <Link
                key={city}
                to={`/areas/${city.toLowerCase().replace(/\s+/g, '-')}`}
                className="px-4 py-2 bg-t-card border border-t-card-border text-t-text-secondary hover:border-gold-500/50 hover:text-gold-500 transition-colors flex items-center gap-2"
              >
                <MapPin className="w-3 h-3" />
                {city}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <section className="py-20 lg:py-28 bg-t-page-alt">
          <div className="container-editorial">
            <h2 className="font-display text-3xl text-t-text tracking-tight mb-8 text-center">
              Related <span className="text-gold-400">Services</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedServices.map((related) => (
                <Link
                  key={related.slug}
                  to={`/services/${related.slug}`}
                  className="group bg-t-card border border-t-card-border p-6 hover:border-gold-500/50 transition-colors"
                >
                  <h3 className="font-display text-xl text-t-text mb-2 group-hover:text-gold-500 transition-colors">
                    {related.name}
                  </h3>
                  <p className="text-t-text-secondary text-sm leading-relaxed mb-4">
                    {related.shortDescription}
                  </p>
                  <span className="inline-flex items-center gap-1 text-gold-500 text-sm font-medium">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 lg:py-24 bg-gold-600">
        <div className="container-editorial text-center">
          <h2 className="font-display text-3xl lg:text-4xl text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-gold-100 text-lg mb-8 max-w-2xl mx-auto">
            Call today for a free estimate on {service.name.toLowerCase()} services in San Diego.
          </p>
          <a
            href={PHONE_LINK}
            className="inline-flex items-center justify-center gap-3 bg-navy-900 text-white px-6 py-4 text-base sm:px-10 sm:py-5 sm:text-xl font-medium hover:bg-navy-800 transition-colors"
          >
            <Phone className="w-6 h-6" />
            <span>{PHONE_NUMBER}</span>
          </a>
        </div>
      </section>
    </div>
  );
}
