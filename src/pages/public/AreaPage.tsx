import { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Phone, MapPin, CheckCircle2, Wrench, ChevronDown, Star, Droplets, Building2 } from 'lucide-react';
import { PageSEO, AreaPlumberSchema, FAQSchema } from '@/lib/seo';
import { getAreaBySlug } from '@/data/areas';
import { SERVICES } from '@/data/services';
import LeadCaptureForm from '@/components/forms/LeadCaptureForm';

const PHONE_NUMBER = '(619) 433-2169';
const PHONE_LINK = 'tel:+16194332169';

export default function AreaPage() {
  const { slug } = useParams<{ slug: string }>();
  const area = slug ? getAreaBySlug(slug) : undefined;
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  if (!area) {
    return <Navigate to="/areas" replace />;
  }

  return (
    <div className="bg-t-page">
      <AreaPlumberSchema cityName={area.name} latitude={area.geo.latitude} longitude={area.geo.longitude} />
      <PageSEO
        title={`Plumber in ${area.name}, CA | San Diego County Plumbing Services`}
        description={`Professional plumbing services in ${area.name}, CA. 24/7 emergency plumber, drain cleaning, water heaters, pipe repair. Licensed & insured. Call (619) 433-2169.`}
        keywords={[
          `plumber ${area.name}`,
          `${area.name} plumbing services`,
          `emergency plumber ${area.name}`,
          `drain cleaning ${area.name}`,
          `water heater repair ${area.name}`,
        ]}
        path={`/areas/${slug}`}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Service Areas', url: '/areas' },
          { name: area.name, url: `/areas/${slug}` },
        ]}
      />

      {/* Hero Section */}
      <section className="bg-t-page-alt py-20 lg:py-28">
        <div className="container-editorial">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-12 bg-gold-500" />
              <Link to="/areas" className="text-gold-600 text-sm tracking-[0.2em] uppercase font-medium hover:text-gold-500 transition-colors">
                Service Areas
              </Link>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-t-text tracking-tight mb-6">
              Plumbing Services in <span className="text-gold-400">{area.name}</span>
            </h1>
            <p className="text-xl text-t-text-secondary leading-relaxed mb-4">
              {area.description[0]}
            </p>
            <div className="flex items-center gap-2 text-t-text-muted text-sm">
              <MapPin className="w-4 h-4 text-gold-500" />
              <span>Zip codes: {area.zipCodes.join(', ')}</span>
            </div>
            <div className="mt-8">
              <a
                href={PHONE_LINK}
                className="btn-gold gap-3"
              >
                <Phone className="w-5 h-5" />
                <span>Call {PHONE_NUMBER}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Description & Common Issues */}
      <section className="py-20 lg:py-28 bg-t-page">
        <div className="container-editorial">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            <div>
              <h2 className="font-display text-3xl text-t-text tracking-tight mb-8">
                Your Trusted <span className="text-gold-500">{area.name}</span> Plumber
              </h2>
              <div className="space-y-6 text-t-text-secondary leading-relaxed text-lg">
                {area.description.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-display text-2xl text-t-text mb-8">
                Common Plumbing Issues in {area.name}
              </h3>
              <div className="space-y-4">
                {area.commonIssues.map((issue, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" />
                    <span className="text-t-text-secondary">{issue}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-t-page-alt border border-t-card-border">
                <h4 className="font-display text-lg text-t-text mb-2">Serving {area.name} 24/7</h4>
                <p className="text-t-text-secondary text-sm mb-4">
                  Emergency plumbing service available around the clock in {area.name} and surrounding areas.
                </p>
                <a href={PHONE_LINK} className="text-gold-500 font-semibold hover:text-gold-400 transition-colors">
                  {PHONE_NUMBER}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section className="py-20 lg:py-28 bg-t-page-alt">
        <div className="container-editorial">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl lg:text-4xl text-t-text tracking-tight mb-4">
              Our Services in <span className="text-gold-400">{area.name}</span>
            </h2>
            <p className="text-t-text-secondary text-lg">
              Full-service plumbing solutions for {area.name} homes and businesses.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((service) => (
              <Link
                key={service.slug}
                to={`/services/${service.slug}`}
                className="group bg-t-card border border-t-card-border p-6 hover:border-gold-500/50 transition-colors"
              >
                <Wrench className="w-6 h-6 text-gold-500 mb-3" />
                <h3 className="font-display text-lg text-t-text group-hover:text-gold-500 transition-colors mb-2">
                  {service.name}
                </h3>
                <p className="text-t-text-secondary text-sm leading-relaxed">
                  {service.shortDescription.split('.')[0]}.
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Local Insights (if enriched data available) */}
      {area.neighborhoodInfo && (
        <section className="py-20 lg:py-28 bg-t-page">
          <div className="container-editorial">
            <h2 className="font-display text-3xl lg:text-4xl text-t-text tracking-tight mb-12 text-center">
              Local Plumbing Insights: <span className="text-gold-400">{area.name}</span>
            </h2>

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
              <div>
                <h3 className="font-display text-xl text-t-text mb-6">Neighborhood Highlights</h3>
                <ul className="space-y-3">
                  {area.neighborhoodInfo.highlights.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" />
                      <span className="text-t-text-secondary">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-8">
                <div className="p-6 bg-t-page-alt border border-t-card-border">
                  <div className="flex items-center gap-2 mb-3">
                    <Droplets className="w-5 h-5 text-gold-500" />
                    <h4 className="font-display text-lg text-t-text">Water Quality</h4>
                  </div>
                  <p className="text-t-text-secondary text-sm leading-relaxed">
                    {area.neighborhoodInfo.waterQualityNotes}
                  </p>
                </div>

                <div className="p-6 bg-t-page-alt border border-t-card-border">
                  <div className="flex items-center gap-2 mb-3">
                    <Building2 className="w-5 h-5 text-gold-500" />
                    <h4 className="font-display text-lg text-t-text">Plumbing Infrastructure</h4>
                  </div>
                  <p className="text-t-text-secondary text-sm leading-relaxed">
                    {area.neighborhoodInfo.infrastructureNotes}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Area Testimonial */}
      {area.testimonial && (
        <section className="py-16 lg:py-20 bg-t-page-alt">
          <div className="container-editorial">
            <div className="max-w-3xl mx-auto text-center">
              <div className="flex justify-center gap-1 mb-6">
                {Array.from({ length: area.testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-gold-400 fill-gold-400" />
                ))}
              </div>
              <blockquote className="font-display text-2xl lg:text-3xl text-t-text italic leading-relaxed mb-6">
                &ldquo;{area.testimonial.quote}&rdquo;
              </blockquote>
              <div className="text-t-text-secondary">
                <span className="font-semibold text-t-text">{area.testimonial.author}</span>
                {' '}&mdash; {area.testimonial.location}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Area FAQs */}
      {area.neighborhoodInfo?.faqs && area.neighborhoodInfo.faqs.length > 0 && (
        <>
          <FAQSchema items={area.neighborhoodInfo.faqs} />
          <section className="py-20 lg:py-28 bg-t-page">
            <div className="container-editorial">
              <div className="max-w-3xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="font-display text-3xl lg:text-4xl text-t-text tracking-tight mb-4">
                    Plumbing FAQs: <span className="text-gold-400">{area.name}</span>
                  </h2>
                </div>

                <div className="space-y-3">
                  {area.neighborhoodInfo.faqs.map((faq, index) => (
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
        </>
      )}

      {/* Trust Signals */}
      <section className="py-16 bg-t-page-alt">
        <div className="container-editorial">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="font-display text-4xl text-gold-400 mb-1">20+</div>
              <div className="text-t-text-muted text-sm uppercase tracking-wider">Years Experience</div>
            </div>
            <div>
              <div className="font-display text-4xl text-gold-400 mb-1">4.9</div>
              <div className="text-t-text-muted text-sm uppercase tracking-wider">Star Rating</div>
            </div>
            <div>
              <div className="font-display text-4xl text-gold-400 mb-1">247+</div>
              <div className="text-t-text-muted text-sm uppercase tracking-wider">Reviews</div>
            </div>
            <div>
              <div className="font-display text-4xl text-gold-400 mb-1">30</div>
              <div className="text-t-text-muted text-sm uppercase tracking-wider">Min Response</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section with Lead Form */}
      <section className="py-20 lg:py-24 bg-navy-900">
        <div className="container-editorial">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="font-display text-3xl lg:text-4xl text-white mb-4">
                Need a Plumber in {area.name}?
              </h2>
              <p className="text-navy-200 text-lg mb-6">
                Call Christensen Plumbing today for a free estimate. Licensed, insured, and serving {area.name} 24/7.
              </p>
              <a
                href={PHONE_LINK}
                className="inline-flex items-center gap-3 text-gold-400 text-xl font-semibold hover:text-gold-300 transition-colors"
              >
                <Phone className="w-6 h-6" />
                <span>{PHONE_NUMBER}</span>
              </a>
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-navy-200">
                  <CheckCircle2 className="w-5 h-5 text-gold-400 flex-shrink-0" />
                  <span className="text-sm">Free Estimates</span>
                </div>
                <div className="flex items-center gap-2 text-navy-200">
                  <CheckCircle2 className="w-5 h-5 text-gold-400 flex-shrink-0" />
                  <span className="text-sm">Licensed & Insured</span>
                </div>
                <div className="flex items-center gap-2 text-navy-200">
                  <CheckCircle2 className="w-5 h-5 text-gold-400 flex-shrink-0" />
                  <span className="text-sm">24/7 Emergency</span>
                </div>
                <div className="flex items-center gap-2 text-navy-200">
                  <CheckCircle2 className="w-5 h-5 text-gold-400 flex-shrink-0" />
                  <span className="text-sm">30-Min Response</span>
                </div>
              </div>
            </div>
            <LeadCaptureForm
              areaName={area.name}
              heading={`Get a Free Estimate in ${area.name}`}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
