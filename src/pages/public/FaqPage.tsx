import { useState } from 'react';
import { Phone, ChevronDown } from 'lucide-react';
import { PageSEO, FAQSchema } from '@/lib/seo';

const PHONE_NUMBER = '(619) 433-2169';
const PHONE_LINK = 'tel:+16194332169';

const FAQ_CATEGORIES = [
  {
    title: 'General',
    faqs: [
      {
        question: 'What areas do you serve?',
        answer: 'We serve all of San Diego County, from Oceanside in the north to Chula Vista in the south, and from the coast to the inland communities of Escondido, El Cajon, and Poway.',
      },
      {
        question: 'Are you licensed and insured?',
        answer: 'Yes. Christensen Plumbing is fully licensed, bonded, and insured in the state of California for all residential and commercial plumbing services.',
      },
      {
        question: 'Do you offer free estimates?',
        answer: 'Yes. We provide free estimates for all non-emergency work. Call us or submit a service request and we\'ll schedule a convenient time to assess your needs and provide upfront pricing.',
      },
      {
        question: 'What are your business hours?',
        answer: 'Our regular hours are Monday through Friday, 6 AM to 8 PM, and Saturday 8 AM to 2 PM. Emergency plumbing service is available 24/7, 365 days a year.',
      },
    ],
  },
  {
    title: 'Emergency Services',
    faqs: [
      {
        question: 'Do you charge extra for emergency calls at night or on weekends?',
        answer: 'No. We never charge extra for emergency calls at any hour, including nights, weekends, and holidays. You\'ll receive the same fair, upfront pricing no matter when you call.',
      },
      {
        question: 'How fast can you respond to a plumbing emergency?',
        answer: 'Our average response time is under 30 minutes across San Diego County. We prioritize emergencies and dispatch immediately when you call.',
      },
      {
        question: 'What should I do in a plumbing emergency before you arrive?',
        answer: 'For water emergencies, turn off the main water supply if possible. For gas leaks, evacuate immediately and call 911 first. Move valuables away from affected areas and take photos for insurance.',
      },
    ],
  },
  {
    title: 'Pricing & Payment',
    faqs: [
      {
        question: 'How does your pricing work?',
        answer: 'We provide upfront, transparent pricing before any work begins. You\'ll receive a detailed quote that includes parts and labor with no hidden fees or surprise charges.',
      },
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept cash, all major credit cards, checks, and digital payment methods. Payment is due upon completion of the work.',
      },
      {
        question: 'Do you offer financing?',
        answer: 'For larger projects like repiping or water heater installation, we can discuss payment options to help make the investment manageable. Ask us about available financing.',
      },
    ],
  },
  {
    title: 'Services',
    faqs: [
      {
        question: 'Do you work on commercial properties?',
        answer: 'Yes. While our primary focus is residential plumbing, we also serve small commercial properties throughout San Diego County.',
      },
      {
        question: 'Can you help with bathroom or kitchen remodels?',
        answer: 'Yes. We handle all plumbing aspects of bathroom and kitchen remodels, from rough-in to finish. We work with homeowners and general contractors to ensure everything is done right.',
      },
      {
        question: 'Do you handle permits and inspections?',
        answer: 'Yes. For work that requires permits (like water heater replacement or repiping), we handle the entire permitting process and schedule all required inspections.',
      },
    ],
  },
];

const allFaqs = FAQ_CATEGORIES.flatMap((cat) => cat.faqs);

export default function FaqPage() {
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  return (
    <div className="bg-t-page">
      <PageSEO
        title="Frequently Asked Questions"
        description="Common questions about Christensen Plumbing services in San Diego. Pricing, emergency service, areas served, and more. Call (619) 433-2169."
        path="/faq"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'FAQ', url: '/faq' },
        ]}
      />
      <FAQSchema items={allFaqs} />

      {/* Hero Section */}
      <section className="bg-t-page-alt py-20 lg:py-28">
        <div className="container-editorial">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-12 bg-gold-500" />
              <span className="text-gold-400 text-sm tracking-[0.2em] uppercase font-medium">
                FAQ
              </span>
            </div>
            <h1 className="font-display text-4xl lg:text-6xl text-t-text tracking-tight mb-6">
              Frequently Asked <span className="text-gold-400">Questions</span>
            </h1>
            <p className="text-xl text-t-text-secondary leading-relaxed">
              Find answers to common questions about our plumbing services, pricing, and service areas.
              Can't find what you're looking for? Call us at{' '}
              <a href={PHONE_LINK} className="text-gold-500 font-semibold hover:text-gold-400">
                {PHONE_NUMBER}
              </a>.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="py-20 lg:py-28 bg-t-page">
        <div className="container-editorial">
          <div className="max-w-3xl mx-auto space-y-12">
            {FAQ_CATEGORIES.map((category) => (
              <div key={category.title}>
                <h2 className="font-display text-2xl text-t-text mb-6">{category.title}</h2>
                <div className="space-y-3">
                  {category.faqs.map((faq, index) => {
                    const faqKey = `${category.title}-${index}`;
                    return (
                      <div
                        key={faqKey}
                        className="bg-t-card border border-t-card-border"
                      >
                        <button
                          onClick={() => setOpenFaq(openFaq === faqKey ? null : faqKey)}
                          className="w-full flex items-center justify-between p-6 text-left"
                        >
                          <span className="font-semibold text-t-text pr-4">{faq.question}</span>
                          <ChevronDown
                            className={`w-5 h-5 text-gold-500 flex-shrink-0 transition-transform ${
                              openFaq === faqKey ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        {openFaq === faqKey && (
                          <div className="px-6 pb-6">
                            <p className="text-t-text-secondary leading-relaxed">{faq.answer}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-24 bg-gold-600">
        <div className="container-editorial text-center">
          <h2 className="font-display text-3xl lg:text-4xl text-white mb-4">
            Still Have Questions?
          </h2>
          <p className="text-gold-100 text-lg mb-8 max-w-2xl mx-auto">
            We're happy to help. Call us for a free consultation about your plumbing needs.
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
