import {
  Users,
  Award,
  Clock,
  Shield,
  Phone,
  Mail,
  MapPin,
  Calendar,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { PageSEO, ABOUT_SEO } from '@/lib/seo';

const PHONE_NUMBER = '(619) 433-2169';
const PHONE_LINK = 'tel:+16194332169';

export default function AboutPage() {
  const stats = [
    { value: '20+', label: 'Years Experience', icon: <Clock className="w-6 h-6" /> },
    { value: '1,000+', label: 'Satisfied Customers', icon: <Users className="w-6 h-6" /> },
    { value: '4.9', label: 'Star Rating', icon: <Award className="w-6 h-6" /> },
    { value: '100%', label: 'Licensed & Insured', icon: <Shield className="w-6 h-6" /> },
  ];

  const values = [
    {
      title: 'Integrity First',
      description: 'We believe in honest assessments and transparent pricing. No surprises, no hidden fees.',
    },
    {
      title: 'Master Craftsmanship',
      description: 'Every job is completed to the highest standards. We take pride in work that lasts.',
    },
    {
      title: 'Respect & Care',
      description: 'We treat your home like our own. Clean workspaces, protective coverings, always.',
    },
    {
      title: 'Reliability',
      description: 'When we say we\'ll be there, we\'re there. On time, every time, 24/7.',
    },
  ];

  return (
    <div className="bg-t-page">
      <PageSEO {...ABOUT_SEO} />

      {/* Hero Section */}
      <section className="bg-t-page-alt py-20 lg:py-32">
        <div className="container-editorial">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px w-12 bg-gold-500" />
                <span className="text-gold-400 text-sm tracking-[0.2em] uppercase font-medium">
                  Our Story
                </span>
              </div>
              <h1 className="font-display text-4xl lg:text-6xl text-t-text tracking-tight mb-6">
                Built on <span className="text-gold-400">Trust</span>,<br />
                Driven by <span className="text-gold-400">Excellence</span>
              </h1>
              <p className="text-xl text-t-text-secondary leading-relaxed mb-8">
                Since 2003, Christensen Plumbing has served San Diego County with unwavering commitment to quality, honesty, and exceptional service.
              </p>
              <a
                href={PHONE_LINK}
                className="btn-gold gap-3"
              >
                <Phone className="w-5 h-5" />
                <span>Call {PHONE_NUMBER}</span>
              </a>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-t-card border border-t-card-border p-6 lg:p-8"
                >
                  <div className="text-gold-500 mb-4">{stat.icon}</div>
                  <div className="font-display text-4xl lg:text-5xl text-t-text tracking-tight mb-2">
                    {stat.value}
                  </div>
                  <div className="text-t-text-muted text-sm uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 lg:py-28 bg-t-page">
        <div className="container-editorial">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px w-12 bg-gold-500" />
                <span className="text-gold-600 text-sm tracking-[0.2em] uppercase font-medium">
                  The Beginning
                </span>
              </div>
              <h2 className="font-display text-3xl lg:text-4xl text-t-text tracking-tight mb-8">
                One Plumber. <span className="text-gold-500">San Diego's Most Trusted.</span>
              </h2>
              <div className="space-y-6 text-t-text-secondary leading-relaxed">
                <p>
                  Bill Christensen founded Christensen Plumbing Co. in 2003 with a simple mission: provide San Diego County with honest, reliable plumbing services at fair prices.
                </p>
                <p>
                  Over 20 years and 1,000+ jobs later, Bill still personally handles every call and every repair. No hand-offs, no sub-contractors—just one experienced master plumber who stands behind his work.
                </p>
                <p>
                  That reputation has been built entirely through word of mouth—satisfied customers telling their friends, neighbors, and family about their experience.
                </p>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px w-12 bg-gold-500" />
                <span className="text-gold-600 text-sm tracking-[0.2em] uppercase font-medium">
                  Our Promise
                </span>
              </div>
              <h2 className="font-display text-3xl lg:text-4xl text-t-text tracking-tight mb-8">
                The Christensen <span className="text-gold-500">Difference</span>
              </h2>
              <div className="space-y-6">
                {[
                  'Licensed, bonded, and insured for your complete protection',
                  'Upfront pricing with no hidden fees or surprise charges',
                  '100% satisfaction guarantee on every job',
                  '24/7 emergency service with no extra night/weekend fees',
                  'Clean, respectful service — your home treated like his own',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-gold-500 flex-shrink-0 mt-0.5" />
                    <span className="text-t-text-secondary">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 lg:py-28 bg-t-page-alt">
        <div className="container-editorial">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-12 bg-gold-500" />
              <span className="text-gold-400 text-sm tracking-[0.2em] uppercase font-medium">
                What We Stand For
              </span>
              <div className="h-px w-12 bg-gold-500" />
            </div>
            <h2 className="font-display text-3xl lg:text-5xl text-t-text tracking-tight">
              Our Core <span className="text-gold-400">Values</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="border-l-2 border-gold-500 pl-6"
              >
                <h3 className="font-display text-xl text-t-text mb-3">{value.title}</h3>
                <p className="text-t-text-muted leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 lg:py-28 bg-t-page">
        <div className="container-editorial">
          <div className="bg-t-page-alt p-8 lg:p-16">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-display text-3xl lg:text-4xl text-t-text tracking-tight mb-6">
                  Ready to Work With <span className="text-gold-400">San Diego's Best</span>?
                </h2>
                <p className="text-t-text-secondary text-lg leading-relaxed">
                  Whether it's a plumbing emergency or a planned renovation, we're here to help. Contact us today for a free estimate.
                </p>
              </div>

              <div className="space-y-6">
                <a href={PHONE_LINK} className="flex items-center gap-4 group">
                  <div className="w-14 h-14 bg-gold-500 flex items-center justify-center text-white group-hover:bg-gold-600 transition-colors">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-t-text font-semibold text-lg">{PHONE_NUMBER}</p>
                    <p className="text-t-text-muted text-sm">Call or text anytime</p>
                  </div>
                </a>

                <a href="mailto:info@christensenplumbing.com" className="flex items-center gap-4 group">
                  <div className="w-14 h-14 bg-t-card border border-t-card-border flex items-center justify-center text-gold-500 group-hover:bg-t-card-border transition-colors">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-t-text font-semibold">info@christensenplumbing.com</p>
                    <p className="text-t-text-muted text-sm">We respond within 2 hours</p>
                  </div>
                </a>

                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-t-card border border-t-card-border flex items-center justify-center text-gold-500">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-t-text font-semibold">San Diego County</p>
                    <p className="text-t-text-muted text-sm">From Oceanside to Chula Vista</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-t-card border border-t-card-border flex items-center justify-center text-gold-500">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-t-text font-semibold">Mon-Fri 6AM-8PM</p>
                    <p className="text-t-text-muted text-sm">24/7 Emergency Available</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-24 bg-gold-600">
        <div className="container-editorial text-center">
          <h2 className="font-display text-3xl lg:text-4xl text-white mb-4">
            Experience the Christensen Difference
          </h2>
          <p className="text-gold-100 text-lg mb-8 max-w-2xl mx-auto">
            Join hundreds of satisfied San Diego homeowners. Your plumbing deserves the best.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={PHONE_LINK}
              className="inline-flex items-center justify-center gap-3 bg-navy-900 text-white px-10 py-5 text-xl font-medium hover:bg-navy-800 transition-colors"
            >
              <Phone className="w-6 h-6" />
              <span>Call Now</span>
            </a>
            <a
              href="/reviews"
              className="inline-flex items-center justify-center gap-2 bg-white text-navy-900 px-10 py-5 text-xl font-medium hover:bg-navy-50 transition-colors"
            >
              <span>Read Reviews</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
