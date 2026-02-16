import { useParams, Link, Navigate } from 'react-router-dom';
import { Phone, MapPin, ArrowRight, CheckCircle2, Wrench } from 'lucide-react';
import { PageSEO, AreaPlumberSchema } from '@/lib/seo';
import { getAreaBySlug } from '@/data/areas';
import { SERVICES } from '@/data/services';

const PHONE_NUMBER = '(619) 433-2169';
const PHONE_LINK = 'tel:+16194332169';

export default function AreaPage() {
  const { slug } = useParams<{ slug: string }>();
  const area = slug ? getAreaBySlug(slug) : undefined;

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
              <Link to="/areas" className="text-gold-400 text-sm tracking-[0.2em] uppercase font-medium hover:text-gold-300 transition-colors">
                Service Areas
              </Link>
            </div>
            <h1 className="font-display text-4xl lg:text-6xl text-t-text tracking-tight mb-6">
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

      {/* Trust Signals */}
      <section className="py-16 bg-t-page">
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

      {/* CTA Section */}
      <section className="py-20 lg:py-24 bg-gold-600">
        <div className="container-editorial text-center">
          <h2 className="font-display text-3xl lg:text-4xl text-white mb-4">
            Need a Plumber in {area.name}?
          </h2>
          <p className="text-gold-100 text-lg mb-8 max-w-2xl mx-auto">
            Call Christensen Plumbing today for a free estimate. Licensed, insured, and serving {area.name} 24/7.
          </p>
          <a
            href={PHONE_LINK}
            className="inline-flex items-center justify-center gap-3 bg-navy-900 text-white px-10 py-5 text-xl font-medium hover:bg-navy-800 transition-colors"
          >
            <Phone className="w-6 h-6" />
            <span>{PHONE_NUMBER}</span>
          </a>
        </div>
      </section>
    </div>
  );
}
