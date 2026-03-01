import { useState } from 'react';
import { Phone, CheckCircle2 } from 'lucide-react';
import { SERVICES } from '@/data/services';

const PHONE_NUMBER = '(619) 433-2169';
const PHONE_LINK = 'tel:+16194332169';

interface LeadCaptureFormProps {
  preselectedService?: string;
  areaName?: string;
  heading?: string;
}

interface FormData {
  name: string;
  phone: string;
  service: string;
  area: string;
  message: string;
}

export default function LeadCaptureForm({
  preselectedService,
  areaName,
  heading = 'Get a Free Estimate',
}: LeadCaptureFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    service: preselectedService || '',
    area: areaName || '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Enter a valid 10-digit phone number';
    }
    if (!formData.service) newErrors.service = 'Select a service';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');

    try {
      const body = new URLSearchParams();
      body.append('form-name', 'service-lead');
      body.append('bot-field', '');
      Object.entries(formData).forEach(([key, value]) => {
        body.append(key, value);
      });

      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });

      if (!response.ok) throw new Error('Submission failed');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-t-card border border-t-card-border p-8 text-center">
        <CheckCircle2 className="w-12 h-12 text-patina-500 mx-auto mb-4" />
        <h3 className="font-display text-2xl text-t-text mb-2">Thank You!</h3>
        <p className="text-t-text-secondary mb-4">
          We&apos;ll call you back shortly to discuss your project.
        </p>
        <a href={PHONE_LINK} className="text-gold-500 font-semibold hover:text-gold-400 transition-colors">
          Or call now: {PHONE_NUMBER}
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-t-card border border-t-card-border p-6 lg:p-8">
      {/* Honeypot */}
      <p className="hidden">
        <label>
          Don&apos;t fill this out: <input name="bot-field" />
        </label>
      </p>
      <input type="hidden" name="form-name" value="service-lead" />

      <h3 className="font-display text-xl lg:text-2xl text-t-text mb-6">{heading}</h3>

      <div className="space-y-4">
        <div>
          <label htmlFor="lead-name" className="label-editorial">Name *</label>
          <input
            id="lead-name"
            name="name"
            type="text"
            placeholder="Your full name"
            value={formData.name}
            onChange={handleChange}
            className="input-editorial"
            required
          />
          {errors.name && <p className="text-sm text-emergency-600 mt-1">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="lead-phone" className="label-editorial">Phone *</label>
          <input
            id="lead-phone"
            name="phone"
            type="tel"
            placeholder="(555) 123-4567"
            value={formData.phone}
            onChange={handleChange}
            className="input-editorial"
            required
          />
          {errors.phone && <p className="text-sm text-emergency-600 mt-1">{errors.phone}</p>}
        </div>

        <div>
          <label htmlFor="lead-service" className="label-editorial">Service Needed *</label>
          <select
            id="lead-service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="input-editorial"
            required
          >
            <option value="">Select a service...</option>
            {SERVICES.map((s) => (
              <option key={s.slug} value={s.name}>{s.name}</option>
            ))}
          </select>
          {errors.service && <p className="text-sm text-emergency-600 mt-1">{errors.service}</p>}
        </div>

        {areaName && <input type="hidden" name="area" value={areaName} />}

        <div>
          <label htmlFor="lead-message" className="label-editorial">
            Message <span className="text-t-text-muted">(optional)</span>
          </label>
          <textarea
            id="lead-message"
            name="message"
            rows={3}
            placeholder="Briefly describe your plumbing need..."
            value={formData.message}
            onChange={handleChange}
            className="input-editorial"
          />
        </div>

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="btn-gold w-full gap-2"
        >
          <Phone className="w-5 h-5" />
          <span>{status === 'submitting' ? 'Sending...' : 'Request Free Estimate'}</span>
        </button>

        {status === 'error' && (
          <p className="text-sm text-emergency-600 text-center">
            Something went wrong. Please call us at{' '}
            <a href={PHONE_LINK} className="underline">{PHONE_NUMBER}</a>.
          </p>
        )}

        <p className="text-xs text-t-text-muted text-center">
          We typically respond within 30 minutes during business hours.
        </p>
      </div>
    </form>
  );
}
