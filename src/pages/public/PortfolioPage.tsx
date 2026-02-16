import { Link } from 'react-router-dom';
import { Phone, ArrowRight } from 'lucide-react';
import ProjectCarousel from '../../components/ProjectCarousel';
import { getProjects } from '../../data/projects';
import { PageSEO, PORTFOLIO_SEO } from '@/lib/seo';

const PHONE_NUMBER = '(619) 433-2169';
const PHONE_LINK = 'tel:+16194332169';

export default function PortfolioPage() {
  const projects = getProjects();

  return (
    <div className="bg-t-page">
      <PageSEO {...PORTFOLIO_SEO} />

      {/* Hero Section */}
      <section className="bg-t-page-alt py-20 lg:py-28">
        <div className="container-editorial">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-12 bg-gold-500" />
              <span className="text-gold-600 text-sm tracking-[0.2em] uppercase font-medium">
                Portfolio
              </span>
            </div>
            <h1 className="font-display text-4xl lg:text-6xl text-t-text tracking-tight mb-6">
              Our <span className="text-gold-400">Work</span>
            </h1>
            <p className="text-xl text-t-text-secondary leading-relaxed">
              Explore our completed projects across San Diego County. Each project showcases
              the quality craftsmanship and attention to detail that sets us apart.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 lg:py-28 bg-t-page">
        <div className="container-editorial">
          <div className="grid lg:grid-cols-2 gap-8">
            {projects.map((project) => (
              <ProjectCarousel key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-24 bg-gold-600">
        <div className="container-editorial text-center">
          <h2 className="font-display text-3xl lg:text-4xl text-white mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-gold-100 text-lg mb-8 max-w-2xl mx-auto">
            From emergency repairs to complete renovations, we deliver quality craftsmanship on every job.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={PHONE_LINK}
              className="inline-flex items-center justify-center gap-3 bg-navy-900 text-white px-10 py-5 text-xl font-medium hover:bg-navy-800 transition-colors"
            >
              <Phone className="w-6 h-6" />
              <span>{PHONE_NUMBER}</span>
            </a>
            <Link
              to="/reviews"
              className="inline-flex items-center justify-center gap-2 bg-white text-navy-900 px-10 py-5 text-xl font-medium hover:bg-navy-50 transition-colors"
            >
              <span>Read Reviews</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
