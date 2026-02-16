import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, Calendar } from 'lucide-react';
import { PageSEO, CONTACT_SEO } from '@/lib/seo';

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
            <h1 className="font-display text-4xl lg:text-6xl text-t-text tracking-tight mb-6">
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
                <a href={PHONE_LINK} className="flex items-center gap-5 group">
                  <div className="w-14 h-14 bg-gold-500 flex items-center justify-center text-white group-hover:bg-gold-600 transition-colors">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-t-text text-lg">{PHONE_NUMBER}</p>
                    <p className="text-t-text-secondary text-sm">Call or text anytime</p>
                  </div>
                </a>

                <a href="mailto:info@christensenplumbing.com" className="flex items-center gap-5 group">
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
    </div>
  );
}
