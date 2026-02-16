import { Phone, Clock, AlertTriangle, Wrench, Droplets, Zap, CheckCircle2 } from 'lucide-react';
import { PageSEO, EMERGENCY_SEO, FAQSchema } from '@/lib/seo';
import { trackPhoneClick } from '@/lib/analytics';

const PHONE_NUMBER = '(619) 433-2169';
const PHONE_LINK = 'tel:+16194332169';

interface EmergencyService {
  icon: React.ReactNode;
  title: string;
  description: string;
  response: string;
}

export default function EmergencyPage() {
  const emergencyServices: EmergencyService[] = [
    {
      icon: <Droplets className="w-7 h-7" />,
      title: 'Burst Pipes & Water Leaks',
      description: 'Immediate response to prevent water damage',
      response: '15-30 minutes',
    },
    {
      icon: <AlertTriangle className="w-7 h-7" />,
      title: 'Sewer Line Backups',
      description: 'Emergency drain clearing and sewer repairs',
      response: '20-45 minutes',
    },
    {
      icon: <Zap className="w-7 h-7" />,
      title: 'Water Heater Failures',
      description: 'Emergency water heater repair and replacement',
      response: '30-60 minutes',
    },
    {
      icon: <Wrench className="w-7 h-7" />,
      title: 'Gas Line Issues',
      description: 'Immediate gas leak detection and repair',
      response: '10-20 minutes',
    },
  ];

  const emergencyFAQs = [
    {
      question: 'Do you charge extra for nights, weekends, or holidays?',
      answer: 'No. Christensen Plumbing never charges extra for emergency calls at any hour, including nights, weekends, and holidays.',
    },
    {
      question: 'How fast can you respond to a plumbing emergency in San Diego?',
      answer: 'Our average response time is under 30 minutes across San Diego County. We serve areas from Oceanside to Chula Vista.',
    },
    {
      question: 'What should I do if I have a burst pipe?',
      answer: 'Turn off the main water supply immediately, then call us at (619) 433-2169. Move valuables away from the affected area and take photos for insurance.',
    },
    {
      question: 'What types of plumbing emergencies do you handle?',
      answer: 'We handle all plumbing emergencies including burst pipes, water leaks, sewer line backups, water heater failures, gas line issues, and flooding.',
    },
    {
      question: 'Are you licensed and insured for emergency plumbing work?',
      answer: 'Yes. Christensen Plumbing is fully licensed, bonded, and insured in the state of California for all residential and commercial plumbing services.',
    },
  ];

  return (
    <div className="bg-t-page">
      <PageSEO {...EMERGENCY_SEO} />
      <FAQSchema items={emergencyFAQs} />

      {/* Hero Section - Urgent */}
      <section className="bg-emergency-600 py-16 lg:py-24">
        <div className="container-editorial text-center">
          <div className="inline-flex items-center gap-3 bg-white/10 border border-white/20 px-6 py-3 mb-8">
            <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
            <span className="text-white font-medium uppercase tracking-wider text-sm">
              24/7 Emergency Response
            </span>
          </div>

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-white tracking-tight mb-6">
            Plumbing Emergency?
          </h1>
          <p className="text-xl text-emergency-100 mb-10 max-w-2xl mx-auto">
            Don't panic. Bill Christensen is on call 24/7 across San Diego County.
            Average response time under 30 minutes.
          </p>

          <a
            href={PHONE_LINK}
            onClick={() => trackPhoneClick('emergency-hero')}
            className="inline-flex items-center justify-center gap-3 sm:gap-4 bg-navy-900 text-white px-6 py-4 text-lg sm:px-12 sm:py-6 sm:text-2xl font-semibold hover:bg-navy-800 transition-all shadow-2xl"
          >
            <Phone className="w-6 h-6 sm:w-8 sm:h-8" />
            <span>CALL NOW: {PHONE_NUMBER}</span>
          </a>

          <p className="text-emergency-200 mt-6 text-sm">
            No extra charges for nights, weekends, or holidays
          </p>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="bg-t-page-alt py-12">
        <div className="container-editorial">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <Clock className="w-10 h-10 text-gold-500 mx-auto mb-3" />
              <h3 className="text-t-text font-display text-xl mb-1">24/7 Available</h3>
              <p className="text-t-text-muted">Every day of the year</p>
            </div>
            <div>
              <AlertTriangle className="w-10 h-10 text-gold-500 mx-auto mb-3" />
              <h3 className="text-t-text font-display text-xl mb-1">30 Min Response</h3>
              <p className="text-t-text-muted">Average arrival time</p>
            </div>
            <div>
              <Phone className="w-10 h-10 text-gold-500 mx-auto mb-3" />
              <h3 className="text-t-text font-display text-xl mb-1">Direct Dispatch</h3>
              <p className="text-t-text-muted">Talk directly to Bill</p>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Services */}
      <section className="py-20 lg:py-28 bg-t-page">
        <div className="container-editorial">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-12 bg-gold-500" />
              <span className="text-gold-600 text-sm tracking-[0.2em] uppercase font-medium">
                We Handle
              </span>
              <div className="h-px w-12 bg-gold-500" />
            </div>
            <h2 className="font-display text-3xl lg:text-4xl text-t-text tracking-tight">
              Emergency Services
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {emergencyServices.map((service, index) => (
              <div
                key={index}
                className="bg-t-card border-l-4 border-l-emergency-500 border border-t-card-border p-8"
              >
                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-emergency-600 flex items-center justify-center text-white flex-shrink-0">
                    {service.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-lg sm:text-xl text-t-text mb-2">
                      {service.title}
                    </h3>
                    <p className="text-t-text-secondary mb-4">{service.description}</p>
                    <div className="flex items-center gap-2 text-gold-600">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm font-semibold">
                        Response: {service.response}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What To Do */}
      <section className="py-20 lg:py-28 bg-t-page-alt">
        <div className="container-editorial">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl lg:text-4xl text-t-text tracking-tight mb-4">
              What To Do in an <span className="text-gold-400">Emergency</span>
            </h2>
            <p className="text-t-text-secondary text-lg max-w-2xl mx-auto">
              Stay calm and follow these steps while we're on our way.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Water Emergency */}
            <div className="bg-t-card border border-t-card-border p-8">
              <h3 className="font-display text-xl text-t-text mb-6 flex items-center gap-3">
                <Droplets className="w-6 h-6 text-gold-500" />
                For Water Emergencies
              </h3>
              <div className="space-y-4">
                {[
                  'Turn off the main water supply if possible',
                  'Call us immediately at (619) 433-2169',
                  'Move valuables away from affected areas',
                  'Take photos for insurance if safe to do so',
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-gold-500 flex items-center justify-center text-white font-semibold flex-shrink-0">
                      {i + 1}
                    </div>
                    <span className="text-t-text-secondary pt-1">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Gas Emergency */}
            <div className="bg-t-card border border-t-card-border p-8">
              <h3 className="font-display text-xl text-t-text mb-6 flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-emergency-500" />
                For Gas Leaks
              </h3>
              <div className="space-y-4">
                {[
                  'Evacuate the area immediately',
                  'Do not use electrical switches or phones inside',
                  'Call 911 and the gas company first',
                  'Call us from a safe location',
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-emergency-600 flex items-center justify-center text-white font-semibold flex-shrink-0">
                      {i + 1}
                    </div>
                    <span className="text-t-text-secondary pt-1">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 lg:py-28 bg-t-page">
        <div className="container-editorial">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px w-12 bg-gold-500" />
                <span className="text-gold-600 text-sm tracking-[0.2em] uppercase font-medium">
                  Why Choose Us
                </span>
              </div>
              <h2 className="font-display text-3xl lg:text-4xl text-t-text tracking-tight mb-6">
                San Diego's Most <span className="text-gold-500">Trusted</span> Emergency Plumber
              </h2>
              <p className="text-t-text-secondary text-lg mb-8">
                When disaster strikes, you need someone you can count on. Here's why
                San Diego homeowners trust Bill with their emergencies.
              </p>

              <div className="space-y-4">
                {[
                  'Licensed, bonded, and fully insured',
                  'No extra charges for nights or weekends',
                  'Upfront pricing before work begins',
                  'Personally accountable on every job',
                  '100% satisfaction guarantee',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-gold-500 flex-shrink-0" />
                    <span className="text-t-text-secondary">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Card */}
            <div className="bg-t-page-alt p-10 lg:p-12">
              <h3 className="font-display text-2xl text-t-text mb-4">
                Don't Wait — Call Now!
              </h3>
              <p className="text-t-text-secondary mb-8">
                Every minute counts in a plumbing emergency. Bill is ready to help — call now.
              </p>
              <a
                href={PHONE_LINK}
                onClick={() => trackPhoneClick('emergency-sidebar')}
                className="flex items-center justify-center gap-3 bg-gold-500 text-white w-full py-5 text-xl font-semibold hover:bg-gold-600 transition-colors mb-6"
              >
                <Phone className="w-6 h-6" />
                <span>{PHONE_NUMBER}</span>
              </a>
              <p className="text-t-text-muted text-sm text-center">
                Licensed &bull; Insured &bull; Available 24/7
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 lg:py-20 bg-emergency-600">
        <div className="container-editorial text-center">
          <h2 className="font-display text-3xl lg:text-4xl text-white mb-6">
            Emergency? We're Here for You.
          </h2>
          <a
            href={PHONE_LINK}
            onClick={() => trackPhoneClick('emergency-footer-cta')}
            className="inline-flex items-center justify-center gap-3 sm:gap-4 bg-navy-900 text-white px-6 py-4 text-lg sm:px-12 sm:py-6 sm:text-2xl font-semibold hover:bg-navy-800 transition-all"
          >
            <Phone className="w-6 h-6 sm:w-8 sm:h-8" />
            <span>{PHONE_NUMBER}</span>
          </a>
        </div>
      </section>
    </div>
  );
}
