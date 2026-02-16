import { Link } from 'react-router-dom';
import { Phone, ArrowRight, Wrench, Droplets, Zap, ShieldCheck, Search, Home, AlertTriangle, Flame } from 'lucide-react';
import { PageSEO, ServiceSchema } from '@/lib/seo';
import { SERVICES } from '@/data/services';

const PHONE_NUMBER = '(619) 433-2169';
const PHONE_LINK = 'tel:+16194332169';

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  'emergency-plumbing': <Zap className="w-7 h-7" />,
  'drain-cleaning': <Droplets className="w-7 h-7" />,
  'water-heaters': <Flame className="w-7 h-7" />,
  'pipe-repair': <Wrench className="w-7 h-7" />,
  'leak-detection': <Search className="w-7 h-7" />,
  'bathroom-renovation': <Home className="w-7 h-7" />,
  'kitchen-plumbing': <ShieldCheck className="w-7 h-7" />,
  'sewer-services': <AlertTriangle className="w-7 h-7" />,
};

export default function ServicesPage() {
  return (
    <div className="bg-t-page">
      <PageSEO
        page="services"
        path="/services"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Services', url: '/services' },
        ]}
      />
      <ServiceSchema
        services={SERVICES.map((s) => ({
          name: s.name,
          description: s.shortDescription,
          url: `https://christensenplumbing.com/services/${s.slug}`,
        }))}
      />

      {/* Hero Section */}
      <section className="bg-t-page-alt py-20 lg:py-28">
        <div className="container-editorial">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-12 bg-gold-500" />
              <span className="text-gold-600 text-sm tracking-[0.2em] uppercase font-medium">
                Our Expertise
              </span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-t-text tracking-tight mb-6">
              Professional <span className="text-gold-400">Plumbing Services</span>
            </h1>
            <p className="text-xl text-t-text-secondary leading-relaxed">
              From emergency repairs to complete renovations, Christensen Plumbing delivers master-level
              craftsmanship across all plumbing services in San Diego County.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 lg:py-28 bg-t-page">
        <div className="container-editorial">
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {SERVICES.map((service) => (
              <Link
                key={service.slug}
                to={`/services/${service.slug}`}
                className="group bg-t-card border border-t-card-border p-8 lg:p-10 hover:border-gold-500/50 transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-navy-900 text-cream-100 flex items-center justify-center flex-shrink-0 group-hover:bg-gold-500 group-hover:text-white transition-colors">
                    {SERVICE_ICONS[service.slug] || <Wrench className="w-6 h-6 sm:w-7 sm:h-7" />}
                  </div>
                  <div className="flex-1">
                    <h2 className="font-display text-xl sm:text-2xl text-t-text mb-3 group-hover:text-gold-500 transition-colors">
                      {service.name}
                    </h2>
                    <p className="text-t-text-secondary leading-relaxed mb-4">
                      {service.shortDescription}
                    </p>
                    <span className="inline-flex items-center gap-2 text-gold-500 font-medium text-sm">
                      Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-24 bg-gold-600">
        <div className="container-editorial text-center">
          <h2 className="font-display text-3xl lg:text-4xl text-white mb-4">
            Need a Plumber in San Diego?
          </h2>
          <p className="text-gold-100 text-lg mb-8 max-w-2xl mx-auto">
            Call today for a free estimate. Licensed, insured, and available 24/7 for emergencies.
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
