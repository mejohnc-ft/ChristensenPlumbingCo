import { Star, Quote, Phone, ArrowRight } from 'lucide-react';
import { PageSEO, REVIEWS_SEO, AggregateRatingSchema, ReviewSchema } from '@/lib/seo';

interface Testimonial {
  name: string;
  location: string;
  text: string;
  rating: number;
  service: string;
  initials: string;
}

const PHONE_NUMBER = '(619) 433-2169';
const PHONE_LINK = 'tel:+16194332169';

export default function ReviewsPage() {
  const testimonials: Testimonial[] = [
    {
      name: 'Sarah Johnson',
      location: 'La Jolla',
      text: "Outstanding service! They fixed our emergency leak at 10 PM and didn't charge extra for the late hour. True professionals who care about their customers.",
      rating: 5,
      service: 'Emergency Repair',
      initials: 'SJ',
    },
    {
      name: 'Mike Rodriguez',
      location: 'Mission Valley',
      text: 'Christensen Plumbing transformed our outdated bathroom completely. The attention to detail and quality of work exceeded our expectations.',
      rating: 5,
      service: 'Bathroom Renovation',
      initials: 'MR',
    },
    {
      name: 'Emily Chen',
      location: 'Carlsbad',
      text: 'Fast, reliable, and honest pricing. They diagnosed the issue quickly and explained everything clearly. Will definitely use them again.',
      rating: 5,
      service: 'Diagnostic & Repair',
      initials: 'EC',
    },
    {
      name: 'David Thompson',
      location: 'Chula Vista',
      text: 'Incredible work on our whole-house repiping project. Clean, efficient, and completed ahead of schedule. Highly recommend!',
      rating: 5,
      service: 'Repiping',
      initials: 'DT',
    },
    {
      name: 'Jennifer Martinez',
      location: 'Del Mar',
      text: 'Called them for a clogged drain and they came within 30 minutes. Fixed it in no time and even gave tips on prevention. Great service!',
      rating: 5,
      service: 'Drain Cleaning',
      initials: 'JM',
    },
    {
      name: 'Robert Kim',
      location: 'Oceanside',
      text: 'Professional from start to finish. They replaced our water heater and the new one works perfectly. Fair pricing and excellent workmanship.',
      rating: 5,
      service: 'Water Heater',
      initials: 'RK',
    },
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < rating ? 'text-gold-500 fill-current' : 'text-t-text-muted'
        }`}
      />
    ));
  };

  return (
    <div className="bg-t-page">
      <PageSEO {...REVIEWS_SEO} />
      <AggregateRatingSchema rating={4.9} reviewCount={247} />
      <ReviewSchema
        reviews={testimonials.map((t, i) => ({
          author: t.name,
          reviewBody: t.text,
          rating: t.rating,
          datePublished: [
            '2025-11-08',
            '2025-09-22',
            '2025-07-14',
            '2025-05-03',
            '2025-03-17',
            '2025-01-29',
          ][i] || '2025-01-29',
          location: t.location,
        }))}
      />

      {/* Hero Section */}
      <section className="bg-t-page-alt py-20 lg:py-28">
        <div className="container-editorial">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-12 bg-gold-500" />
              <span className="text-gold-600 text-sm tracking-[0.2em] uppercase font-medium">
                Testimonials
              </span>
            </div>
            <h1 className="font-display text-4xl lg:text-6xl text-t-text tracking-tight mb-6">
              What Our <span className="text-gold-400">Clients Say</span>
            </h1>
            <p className="text-xl text-t-text-secondary leading-relaxed">
              Don't just take our word for it. See what San Diego homeowners have to say about their experience with Christensen Plumbing.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-12 pt-12 border-t border-t-card-border max-w-2xl">
            <div>
              <div className="font-display text-4xl lg:text-5xl text-gold-400">4.9</div>
              <div className="text-t-text-muted text-sm uppercase tracking-wider mt-1">Average Rating</div>
            </div>
            <div>
              <div className="font-display text-4xl lg:text-5xl text-gold-400">247+</div>
              <div className="text-t-text-muted text-sm uppercase tracking-wider mt-1">Reviews</div>
            </div>
            <div>
              <div className="font-display text-4xl lg:text-5xl text-gold-400">98%</div>
              <div className="text-t-text-muted text-sm uppercase tracking-wider mt-1">Would Recommend</div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="py-20 lg:py-28 bg-t-page">
        <div className="container-editorial">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-t-card border border-t-card-border p-8 hover:border-gold-500/50 transition-all duration-300 group"
              >
                {/* Stars */}
                <div className="flex items-center gap-1 mb-6">
                  {renderStars(testimonial.rating)}
                </div>

                {/* Quote */}
                <blockquote className="text-t-text-secondary mb-8 leading-relaxed">
                  "{testimonial.text}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4 pt-6 border-t border-t-card-border">
                  <div className="w-12 h-12 bg-navy-900 flex items-center justify-center text-white font-display font-semibold">
                    {testimonial.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-t-text">{testimonial.name}</p>
                    <p className="text-sm text-t-text-muted">{testimonial.location}</p>
                  </div>
                </div>

                {/* Service Tag */}
                <div className="mt-4">
                  <span className="text-xs uppercase tracking-wider text-gold-600 font-medium">
                    {testimonial.service}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Review */}
      <section className="py-20 lg:py-28 bg-t-page-alt">
        <div className="container-editorial">
          <div className="max-w-4xl mx-auto text-center">
            <Quote className="w-16 h-16 text-gold-500 mx-auto mb-8" />
            <blockquote className="font-display text-2xl lg:text-4xl text-t-text leading-snug mb-8 italic">
              "We've used Christensen Plumbing for everything from emergency repairs to a complete bathroom renovation. They're honest, skilled, and always go above and beyond. The only plumber we'll ever call."
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div className="w-16 h-16 bg-gold-500 flex items-center justify-center text-white font-display text-xl font-semibold">
                TW
              </div>
              <div className="text-left">
                <p className="font-semibold text-t-text text-lg">Thomas Wilson</p>
                <p className="text-t-text-muted">Homeowner, Point Loma</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-24 bg-gold-600">
        <div className="container-editorial text-center">
          <h2 className="font-display text-3xl lg:text-4xl text-white mb-4">
            Ready to Experience the Difference?
          </h2>
          <p className="text-gold-100 text-lg mb-8 max-w-2xl mx-auto">
            Join hundreds of satisfied San Diego homeowners. Call us today for a free estimate.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={PHONE_LINK}
              className="inline-flex items-center justify-center gap-3 bg-navy-900 text-white px-10 py-5 text-xl font-medium hover:bg-navy-800 transition-colors"
            >
              <Phone className="w-6 h-6" />
              <span>{PHONE_NUMBER}</span>
            </a>
            <a
              href="/portfolio"
              className="inline-flex items-center justify-center gap-2 bg-white text-navy-900 px-10 py-5 text-xl font-medium hover:bg-navy-50 transition-colors"
            >
              <span>View Our Work</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
