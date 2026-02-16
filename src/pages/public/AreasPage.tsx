import { Link } from 'react-router-dom';
import { Phone, MapPin } from 'lucide-react';
import { PageSEO } from '@/lib/seo';
import { AREAS } from '@/data/areas';

const PHONE_NUMBER = '(619) 433-2169';
const PHONE_LINK = 'tel:+16194332169';

export default function AreasPage() {
  return (
    <div className="bg-t-page">
      <PageSEO
        title="Service Areas | San Diego County Plumber"
        description="Christensen Plumbing serves all of San Diego County. Professional plumbing services in San Diego, La Jolla, Carlsbad, Chula Vista, Oceanside, Escondido, and more."
        path="/areas"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Service Areas', url: '/areas' },
        ]}
      />

      {/* Hero Section */}
      <section className="bg-t-page-alt py-20 lg:py-28">
        <div className="container-editorial">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-12 bg-gold-500" />
              <span className="text-gold-600 text-sm tracking-[0.2em] uppercase font-medium">
                San Diego County
              </span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-t-text tracking-tight mb-6">
              Areas We <span className="text-gold-400">Serve</span>
            </h1>
            <p className="text-xl text-t-text-secondary leading-relaxed">
              Christensen Plumbing provides professional plumbing services throughout San Diego County.
              From Oceanside to Chula Vista, we're your local plumbing experts.
            </p>
          </div>
        </div>
      </section>

      {/* Areas Grid */}
      <section className="py-20 lg:py-28 bg-t-page">
        <div className="container-editorial">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {AREAS.map((area) => (
              <Link
                key={area.slug}
                to={`/areas/${area.slug}`}
                className="group bg-t-card border border-t-card-border p-6 hover:border-gold-500/50 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-navy-900 text-cream-100 flex items-center justify-center flex-shrink-0 group-hover:bg-gold-500 group-hover:text-white transition-colors">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-display text-xl text-t-text group-hover:text-gold-500 transition-colors mb-1">
                      {area.name}, CA
                    </h2>
                    <p className="text-t-text-muted text-sm">
                      {area.zipCodes.slice(0, 3).join(', ')}{area.zipCodes.length > 3 ? ` +${area.zipCodes.length - 3} more` : ''}
                    </p>
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
            Need a Plumber in San Diego County?
          </h2>
          <p className="text-gold-100 text-lg mb-8 max-w-2xl mx-auto">
            No matter where you are in San Diego County, Christensen Plumbing is here to help. Call today.
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
