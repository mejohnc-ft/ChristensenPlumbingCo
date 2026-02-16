import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, Calendar, CheckCircle2, AlertCircle } from 'lucide-react';
import { PageSEO, CONTACT_SEO } from '@/lib/seo';
import { trackFormSubmit, trackPhoneClick, trackEmailClick } from '@/lib/analytics';

const PHONE_NUMBER = '(619) 433-2169';
const PHONE_LINK = 'tel:+16194332169';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('submitting');

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          'form-name': 'contact',
          ...formData,
        }).toString(),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', service: '', message: '' });
        trackFormSubmit('contact');
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    }
  };

  return (
    <div className="bg-t-page">
      <PageSEO {...CONTACT_SEO} />

      {/* Hero Section */}
      <section className="bg-t-page-alt py-20 lg:py-28">
        <div className="container-editorial">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-12 bg-gold-500" />
              <span className="text-gold-600 text-sm tracking-[0.2em] uppercase font-medium">
                Get in Touch
              </span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-t-text tracking-tight mb-6">
              Contact <span className="text-gold-400">Us</span>
            </h1>
            <p className="text-xl text-t-text-secondary leading-relaxed">
              Ready to solve your plumbing issues? Contact us for a free estimate or call
              for immediate service.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 lg:py-28 bg-t-page">
        <div className="container-editorial">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20">
            {/* Contact Info */}
            <div>
              <h2 className="font-display text-3xl text-t-text tracking-tight mb-8">
                How to <span className="text-gold-500">Reach Us</span>
              </h2>

              <div className="space-y-8">
                <a href={PHONE_LINK} onClick={() => trackPhoneClick('contact-page')} className="flex items-center gap-5 group">
                  <div className="w-14 h-14 bg-gold-500 flex items-center justify-center text-white group-hover:bg-gold-600 transition-colors">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-t-text text-lg">{PHONE_NUMBER}</p>
                    <p className="text-t-text-secondary text-sm">Call or text anytime</p>
                  </div>
                </a>

                <a href="mailto:info@christensenplumbing.com" onClick={() => trackEmailClick('contact-page')} className="flex items-center gap-5 group">
                  <div className="w-14 h-14 bg-t-page-alt border border-t-card-border flex items-center justify-center text-gold-500 group-hover:bg-gold-500 group-hover:text-white transition-colors">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-t-text">info@christensenplumbing.com</p>
                    <p className="text-t-text-secondary text-sm">We respond within 2 hours</p>
                  </div>
                </a>

                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-t-page-alt border border-t-card-border flex items-center justify-center text-gold-500">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-t-text">San Diego County</p>
                    <p className="text-t-text-secondary text-sm">Serving from Oceanside to Chula Vista</p>
                  </div>
                </div>

                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-t-page-alt border border-t-card-border flex items-center justify-center text-gold-500">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-t-text">Mon-Fri 6AM-8PM</p>
                    <p className="text-t-text-secondary text-sm">Sat 8AM-2PM</p>
                  </div>
                </div>

                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-t-page-alt border border-t-card-border flex items-center justify-center text-gold-500">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-t-text">24/7 Emergency Service</p>
                    <p className="text-t-text-secondary text-sm">Available every day of the year</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-t-page-alt border border-t-card-border p-8 lg:p-10">
              <h3 className="font-display text-2xl text-t-text mb-8">Request a Free Estimate</h3>

              {submitStatus === 'success' ? (
                <div className="text-center py-12">
                  <CheckCircle2 className="w-16 h-16 text-patina-500 mx-auto mb-4" />
                  <h3 className="font-display text-2xl text-t-text mb-2">Request Received!</h3>
                  <p className="text-t-text-secondary mb-6">
                    We'll contact you within 2 hours during business hours.
                  </p>
                  <button
                    onClick={() => setSubmitStatus('idle')}
                    className="text-gold-600 font-medium hover:text-gold-700"
                  >
                    Send another request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" data-netlify="true" name="contact">
                  <input type="hidden" name="form-name" value="contact" />
                  <p className="hidden">
                    <label>Don't fill this out: <input name="bot-field" /></label>
                  </p>

                  {submitStatus === 'error' && (
                    <div className="flex items-center gap-3 bg-emergency-50 border border-emergency-200 text-emergency-700 p-4">
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                      <p className="text-sm">Something went wrong. Please try again or call us directly.</p>
                    </div>
                  )}

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
                      <option value="pipe">Pipe Repair / Repiping</option>
                      <option value="leak">Leak Detection</option>
                      <option value="bathroom">Bathroom Renovation</option>
                      <option value="kitchen">Kitchen Plumbing</option>
                      <option value="sewer">Sewer Services</option>
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

                  <button
                    type="submit"
                    disabled={submitStatus === 'submitting'}
                    className="w-full btn-gold gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitStatus === 'submitting' ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Request
                      </>
                    )}
                  </button>

                  <p className="text-center text-sm text-t-text-secondary">
                    Or call us now:{' '}
                    <a href={PHONE_LINK} className="text-gold-600 font-semibold hover:text-gold-700">
                      {PHONE_NUMBER}
                    </a>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
