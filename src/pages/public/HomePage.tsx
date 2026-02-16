import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Phone,
  Droplets,
  Wrench,
  ShieldCheck,
  Zap,
  Clock,
  CheckCircle2,
  ArrowRight,
  Star,
  Award,
  Send,
  MapPin,
  Mail,
  Calendar,
  ArrowUpRight,
} from 'lucide-react';
import { PageSEO, HOME_SEO } from '@/lib/seo';

const PHONE_NUMBER = '(619) 433-2169';
const PHONE_LINK = 'tel:+16194332169';

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  isEmergency?: boolean;
}

export default function HomePage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  const services: Service[] = [
    {
      icon: <Droplets className="w-6 h-6" />,
      title: 'Emergency Plumbing',
      description: "Burst pipe at 2 AM? We're there. 24/7 emergency services with rapid response times.",
      features: ['30-Min Response', 'No Extra Fees', 'Available 24/7'],
      isEmergency: true,
    },
    {
      icon: <Wrench className="w-6 h-6" />,
      title: 'Pipe Repair & Installation',
      description: 'From minor leaks to complete repiping, Bill handles it all with 20+ years of hands-on expertise.',
      features: ['Leak Detection', 'Pipe Replacement', 'Repiping'],
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: 'Drain Cleaning',
      description: 'Advanced drain cleaning using hydro-jetting and camera inspection technology.',
      features: ['Hydro Jetting', 'Camera Inspection', 'Root Removal'],
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Water Heater Services',
      description: 'Installation, repair, and maintenance for all water heater types.',
      features: ['Installation', 'Repairs', 'Maintenance'],
    },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you! We\'ll contact you within 2 hours during business hours.');
    setFormData({ name: '', email: '', phone: '', service: '', message: '' });
  };

  return (
    <div className="bg-t-page">
      {/* SEO Meta Tags and Structured Data */}
      <PageSEO {...HOME_SEO} />

      {/* ============================================
          HERO SECTION - Editorial, Bold
          ============================================ */}
      <section className="relative min-h-screen bg-t-page-alt overflow-hidden">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(197,150,26,0.4) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(197,150,26,0.4) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />

        {/* Copper accent line - left */}
        <div className="absolute left-8 lg:left-16 top-0 bottom-0 w-px bg-gold-500/20" />

        {/* Content */}
        <div className="relative container-editorial min-h-screen flex flex-col justify-center py-20 lg:py-32">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content - 7 cols */}
            <div className="lg:col-span-7 space-y-8">
              {/* Kicker */}
              <div className="flex items-center gap-4">
                <div className="h-px w-12 bg-gold-500" />
                <span className="text-gold-400 text-sm tracking-[0.2em] uppercase font-medium">
                  San Diego's Premier Plumbing
                </span>
              </div>

              {/* Main Headline - Serif, Editorial */}
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-display-hero text-t-text leading-[0.95] tracking-tight">
                When Water<br />
                <span className="text-gold-400">Waits for</span><br />
                No One
              </h1>

              {/* Subhead */}
              <p className="text-xl lg:text-2xl text-t-text-secondary max-w-xl leading-relaxed font-light">
                24/7 emergency response. Master craftsman with 20+ years experience.
                Your home deserves better than average.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a
                  href={PHONE_LINK}
                  className="btn-gold text-lg gap-3"
                >
                  <Phone className="w-5 h-5" />
                  <span>Call {PHONE_NUMBER}</span>
                </a>

                <Link
                  to="/portfolio"
                  className="btn-gold-outline gap-2"
                >
                  <span>View Our Work</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>

              {/* Trust indicators - minimal */}
              <div className="flex flex-wrap gap-6 pt-8 text-t-text-muted text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-gold-500" />
                  <span>Licensed & Insured</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-gold-500" />
                  <span>1,000+ Jobs Completed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-gold-500" />
                  <span>4.9 Star Rating</span>
                </div>
              </div>
            </div>

            {/* Right - Stats Card */}
            <div className="lg:col-span-5">
              <div className="relative">
                {/* Main card */}
                <div className="bg-t-card border border-t-card-border p-8 lg:p-10">
                  <div className="space-y-8">
                    {/* Emergency badge */}
                    <div className="inline-flex items-center gap-2 bg-emergency-600/10 border border-emergency-500/30 text-emergency-400 px-4 py-2 text-sm">
                      <Clock className="w-4 h-4" />
                      <span className="font-medium">24/7 Emergency Service</span>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-8">
                      <div>
                        <div className="font-display text-5xl text-gold-400 tracking-tight">20+</div>
                        <div className="text-t-text-muted text-sm uppercase tracking-wider mt-1">Years</div>
                      </div>
                      <div>
                        <div className="font-display text-5xl text-gold-400 tracking-tight">30</div>
                        <div className="text-t-text-muted text-sm uppercase tracking-wider mt-1">Min Response</div>
                      </div>
                      <div>
                        <div className="font-display text-5xl text-gold-400 tracking-tight">4.9</div>
                        <div className="text-t-text-muted text-sm uppercase tracking-wider mt-1">Rating</div>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-t-card-border" />

                    {/* Quick call */}
                    <a
                      href={PHONE_LINK}
                      className="flex items-center justify-between group"
                    >
                      <div>
                        <p className="text-t-text-secondary text-sm">Emergency? Call now</p>
                        <p className="text-t-text text-xl font-display font-semibold">{PHONE_NUMBER}</p>
                      </div>
                      <div className="w-12 h-12 bg-gold-500 flex items-center justify-center group-hover:bg-gold-600 transition-colors">
                        <ArrowUpRight className="w-5 h-5 text-white" />
                      </div>
                    </a>
                  </div>
                </div>

                {/* Decorative frame */}
                <div className="absolute -inset-3 border border-gold-500/20 -z-10" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-t-text-muted">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-current to-transparent" />
        </div>
      </section>

      {/* ============================================
          SERVICES SECTION - Editorial Grid
          ============================================ */}
      <section className="py-24 lg:py-32 bg-t-page">
        <div className="container-editorial">
          {/* Section header */}
          <div className="max-w-3xl mb-16 lg:mb-20">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-12 bg-gold-500" />
              <span className="subheading-gold">Our Expertise</span>
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-t-text tracking-tight mb-6">
              Craftsmanship in <span className="text-gold-500">Every Detail</span>
            </h2>
            <p className="text-lg text-t-text-secondary leading-relaxed">
              From emergency repairs to complete system installations, we bring precision
              and care to every project. Your home's plumbing deserves a master craftsman.
            </p>
          </div>

          {/* Services grid */}
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className={`
                  group relative bg-t-card p-8 lg:p-10
                  border border-t-card-border
                  hover:border-gold-500/50
                  transition-all duration-500
                  ${service.isEmergency ? 'border-l-4 border-l-gold-500' : ''}
                `}
              >
                {service.isEmergency && (
                  <div className="absolute top-4 right-4">
                    <span className="text-xs uppercase tracking-wider text-gold-500 font-medium">
                      24/7 Available
                    </span>
                  </div>
                )}

                <div className="flex items-start gap-6">
                  {/* Icon */}
                  <div className={`
                    w-14 h-14 flex items-center justify-center flex-shrink-0
                    ${service.isEmergency
                      ? 'bg-gold-500 text-white'
                      : 'bg-navy-900 text-cream-100'
                    }
                  `}>
                    {service.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="font-display text-2xl text-t-text mb-3">
                      {service.title}
                    </h3>
                    <p className="text-t-text-secondary mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-3">
                      {service.features.map((feature, i) => (
                        <span
                          key={i}
                          className="text-sm text-t-text-secondary px-3 py-1 bg-t-page-alt border border-t-card-border"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Hover arrow */}
                <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="w-5 h-5 text-gold-500" />
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <a href={PHONE_LINK} className="btn-navy gap-3">
              <Phone className="w-5 h-5" />
              <span>Get a Free Quote</span>
            </a>
          </div>
        </div>
      </section>

      {/* ============================================
          WHY US SECTION - Dark, Asymmetric
          ============================================ */}
      <section className="py-24 lg:py-32 bg-t-page-alt">
        <div className="container-editorial">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            {/* Left - Content */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px w-12 bg-gold-500" />
                <span className="text-gold-400 text-sm tracking-[0.2em] uppercase font-medium">
                  The Difference
                </span>
              </div>

              <h2 className="font-display text-4xl lg:text-5xl text-t-text tracking-tight mb-8">
                Why San Diego <span className="text-gold-400">Trusts Us</span>
              </h2>

              <p className="text-xl text-t-text-secondary mb-12 leading-relaxed">
                When your pipes burst or drains back up, you need a plumber you can trust.
                Here's why San Diego homeowners call Bill first.
              </p>

              <div className="space-y-8">
                {[
                  {
                    title: 'Transparent Pricing',
                    desc: 'No surprises. Get a detailed quote before any work begins.',
                    icon: <CheckCircle2 className="w-5 h-5" />,
                  },
                  {
                    title: 'Satisfaction Guaranteed',
                    desc: "Not happy? We'll make it right or refund your money.",
                    icon: <Award className="w-5 h-5" />,
                  },
                  {
                    title: 'Licensed & Insured',
                    desc: 'Fully licensed, bonded, and insured for your protection.',
                    icon: <ShieldCheck className="w-5 h-5" />,
                  },
                  {
                    title: 'Respect Your Home',
                    desc: 'We treat your property like our own. Always.',
                    icon: <Star className="w-5 h-5" />,
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-5">
                    <div className="w-10 h-10 bg-gold-500/10 border border-gold-500/30 flex items-center justify-center flex-shrink-0 text-gold-400">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-t-text mb-1">{item.title}</h4>
                      <p className="text-t-text-muted">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Testimonial Card */}
            <div className="relative">
              <div className="bg-t-card border border-t-card-border p-8 lg:p-12">
                {/* Stars */}
                <div className="flex gap-1 text-gold-400 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5" fill="currentColor" />
                  ))}
                </div>

                <blockquote className="font-display text-2xl lg:text-3xl text-t-text leading-snug mb-8 italic">
                  "Called at 11 PM with a burst pipe. They arrived in 25 minutes and fixed
                  everything within an hour. Professional, fair, and genuinely caring."
                </blockquote>

                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gold-500 flex items-center justify-center font-display text-xl text-white">
                    JM
                  </div>
                  <div>
                    <p className="font-semibold text-t-text">Jennifer M.</p>
                    <p className="text-t-text-muted text-sm">La Jolla, CA</p>
                  </div>
                </div>

                <Link
                  to="/reviews"
                  className="inline-flex items-center gap-2 mt-8 text-gold-400 hover:text-gold-300 font-medium transition-colors"
                >
                  Read More Reviews
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Decorative frame */}
              <div className="absolute -inset-4 border border-gold-500/20 -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          CONTACT SECTION - Clean, Professional
          ============================================ */}
      <section className="py-24 lg:py-32 bg-t-page">
        <div className="container-editorial">
          {/* Emergency Banner */}
          <div className="bg-t-page-alt p-8 lg:p-12 mb-16 lg:mb-20 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <p className="text-gold-400 text-sm uppercase tracking-wider mb-2">Emergency Service</p>
              <h3 className="font-display text-3xl lg:text-4xl text-t-text">
                Plumbing Emergency?
              </h3>
              <p className="text-t-text-secondary mt-2">We're available 24/7. Call now for immediate response.</p>
            </div>
            <a
              href={PHONE_LINK}
              className="btn-gold text-xl px-10 py-5 whitespace-nowrap gap-3"
            >
              <Phone className="w-6 h-6" />
              {PHONE_NUMBER}
            </a>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20">
            {/* Contact Info */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px w-12 bg-gold-500" />
                <span className="subheading-gold">Contact</span>
              </div>

              <h2 className="font-display text-4xl lg:text-5xl text-t-text tracking-tight mb-6">
                Get in <span className="text-gold-500">Touch</span>
              </h2>

              <p className="text-lg text-t-text-secondary mb-12 leading-relaxed">
                Ready to solve your plumbing issues? Call us now or fill out the form for a free estimate.
              </p>

              <div className="space-y-8">
                <a href={PHONE_LINK} className="flex items-center gap-5 group">
                  <div className="w-14 h-14 bg-gold-50 border border-gold-200 flex items-center justify-center text-gold-600 group-hover:bg-gold-500 group-hover:text-white transition-colors">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-t-text text-lg">{PHONE_NUMBER}</p>
                    <p className="text-t-text-secondary text-sm">Call or text anytime</p>
                  </div>
                </a>

                <a href="mailto:info@christensenplumbing.com" className="flex items-center gap-5 group">
                  <div className="w-14 h-14 bg-t-page-alt border border-t-card-border flex items-center justify-center text-t-text-secondary group-hover:bg-navy-900 group-hover:text-cream-100 transition-colors">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-t-text text-lg">info@christensenplumbing.com</p>
                    <p className="text-t-text-secondary text-sm">We respond within 2 hours</p>
                  </div>
                </a>

                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-t-page-alt border border-t-card-border flex items-center justify-center text-t-text-secondary">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-t-text text-lg">San Diego County</p>
                    <p className="text-t-text-secondary text-sm">From Oceanside to Chula Vista</p>
                  </div>
                </div>

                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-t-page-alt border border-t-card-border flex items-center justify-center text-t-text-secondary">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-t-text text-lg">Mon-Fri 6AM-8PM</p>
                    <p className="text-t-text-secondary text-sm">24/7 Emergency Available</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-t-page-alt border border-t-card-border p-8 lg:p-10">
              <h3 className="font-display text-2xl text-t-text mb-8">Request Service</h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="label-editorial">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="input-editorial"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="label-editorial">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="input-editorial"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="label-editorial">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="input-editorial"
                  />
                </div>

                <div>
                  <label htmlFor="service" className="label-editorial">
                    Service Needed
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="input-editorial"
                  >
                    <option value="">Select a service</option>
                    <option value="emergency">Emergency Repair</option>
                    <option value="drain">Drain Cleaning</option>
                    <option value="water-heater">Water Heater</option>
                    <option value="pipe">Pipe Repair</option>
                    <option value="inspection">Inspection</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="label-editorial">
                    Describe Your Issue *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="input-editorial resize-none"
                    placeholder="Please describe your plumbing issue..."
                  />
                </div>

                <button type="submit" className="w-full btn-gold gap-2">
                  <Send className="w-5 h-5" />
                  Send Request
                </button>

                <p className="text-center text-sm text-t-text-secondary">
                  Or call us now:{' '}
                  <a href={PHONE_LINK} className="text-gold-600 font-semibold hover:text-gold-700">
                    {PHONE_NUMBER}
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          FOOTER CTA - Bold, Final
          ============================================ */}
      <section className="py-20 lg:py-24 bg-gold-500">
        <div className="container-editorial text-center">
          <h2 className="font-display text-3xl lg:text-4xl text-white mb-4">
            Ready to Experience the Difference?
          </h2>
          <p className="text-gold-100 text-lg mb-8 max-w-2xl mx-auto">
            Join hundreds of satisfied San Diego homeowners. Your plumbing deserves the best.
          </p>
          <a
            href={PHONE_LINK}
            className="inline-flex items-center justify-center gap-3 bg-navy-900 text-cream-100 px-10 py-5 text-xl font-medium hover:bg-navy-800 transition-colors"
          >
            <Phone className="w-6 h-6" />
            <span>Call {PHONE_NUMBER}</span>
          </a>
        </div>
      </section>
    </div>
  );
}
