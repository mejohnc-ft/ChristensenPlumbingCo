import { useState } from 'react';
import { Phone, ArrowRight, ArrowLeft, AlertTriangle } from 'lucide-react';
import { SERVICES } from '@/data/services';

const PHONE_LINK = 'tel:+16194332169';

type PropertyType = 'house' | 'condo' | 'commercial';
type Urgency = 'standard' | 'same-day' | 'emergency';

interface PriceRange {
  min: number;
  max: number;
}

// Static price ranges: [service-slug][propertyType][urgency]
const PRICE_TABLE: Record<string, Record<PropertyType, Record<Urgency, PriceRange>>> = {
  'emergency-plumbing': {
    house: { standard: { min: 150, max: 400 }, 'same-day': { min: 200, max: 500 }, emergency: { min: 250, max: 600 } },
    condo: { standard: { min: 125, max: 350 }, 'same-day': { min: 175, max: 450 }, emergency: { min: 225, max: 550 } },
    commercial: { standard: { min: 200, max: 600 }, 'same-day': { min: 275, max: 750 }, emergency: { min: 350, max: 900 } },
  },
  'drain-cleaning': {
    house: { standard: { min: 150, max: 350 }, 'same-day': { min: 200, max: 400 }, emergency: { min: 250, max: 500 } },
    condo: { standard: { min: 125, max: 300 }, 'same-day': { min: 175, max: 350 }, emergency: { min: 225, max: 450 } },
    commercial: { standard: { min: 200, max: 500 }, 'same-day': { min: 275, max: 600 }, emergency: { min: 350, max: 750 } },
  },
  'water-heaters': {
    house: { standard: { min: 1200, max: 3500 }, 'same-day': { min: 1400, max: 3800 }, emergency: { min: 1600, max: 4200 } },
    condo: { standard: { min: 1000, max: 2800 }, 'same-day': { min: 1200, max: 3200 }, emergency: { min: 1400, max: 3600 } },
    commercial: { standard: { min: 2000, max: 6000 }, 'same-day': { min: 2400, max: 6500 }, emergency: { min: 2800, max: 7500 } },
  },
  'pipe-repair': {
    house: { standard: { min: 200, max: 2000 }, 'same-day': { min: 250, max: 2200 }, emergency: { min: 300, max: 2500 } },
    condo: { standard: { min: 175, max: 1500 }, 'same-day': { min: 225, max: 1700 }, emergency: { min: 275, max: 2000 } },
    commercial: { standard: { min: 300, max: 3000 }, 'same-day': { min: 400, max: 3500 }, emergency: { min: 500, max: 4000 } },
  },
  'leak-detection': {
    house: { standard: { min: 150, max: 500 }, 'same-day': { min: 200, max: 600 }, emergency: { min: 250, max: 700 } },
    condo: { standard: { min: 125, max: 400 }, 'same-day': { min: 175, max: 500 }, emergency: { min: 225, max: 600 } },
    commercial: { standard: { min: 200, max: 750 }, 'same-day': { min: 275, max: 900 }, emergency: { min: 350, max: 1100 } },
  },
  'bathroom-renovation': {
    house: { standard: { min: 2000, max: 8000 }, 'same-day': { min: 2200, max: 8500 }, emergency: { min: 2500, max: 9000 } },
    condo: { standard: { min: 1500, max: 6000 }, 'same-day': { min: 1700, max: 6500 }, emergency: { min: 2000, max: 7000 } },
    commercial: { standard: { min: 3000, max: 12000 }, 'same-day': { min: 3500, max: 13000 }, emergency: { min: 4000, max: 15000 } },
  },
  'kitchen-plumbing': {
    house: { standard: { min: 150, max: 3000 }, 'same-day': { min: 200, max: 3300 }, emergency: { min: 250, max: 3600 } },
    condo: { standard: { min: 125, max: 2500 }, 'same-day': { min: 175, max: 2800 }, emergency: { min: 225, max: 3100 } },
    commercial: { standard: { min: 250, max: 5000 }, 'same-day': { min: 350, max: 5500 }, emergency: { min: 450, max: 6000 } },
  },
  'sewer-services': {
    house: { standard: { min: 200, max: 5000 }, 'same-day': { min: 275, max: 5500 }, emergency: { min: 350, max: 6000 } },
    condo: { standard: { min: 175, max: 3500 }, 'same-day': { min: 250, max: 4000 }, emergency: { min: 325, max: 4500 } },
    commercial: { standard: { min: 350, max: 8000 }, 'same-day': { min: 450, max: 9000 }, emergency: { min: 550, max: 10000 } },
  },
};

const PROPERTY_LABELS: Record<PropertyType, string> = {
  house: 'House',
  condo: 'Condo / Apartment',
  commercial: 'Commercial',
};

const URGENCY_LABELS: Record<Urgency, { label: string; desc: string }> = {
  standard: { label: 'Standard', desc: 'Scheduled within a few days' },
  'same-day': { label: 'Same-Day', desc: 'Service today if available' },
  emergency: { label: 'Emergency', desc: '24/7 immediate response' },
};

function formatPrice(n: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
}

export default function PricingCalculator() {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [propertyType, setPropertyType] = useState<PropertyType | null>(null);
  const [urgency, setUrgency] = useState<Urgency | null>(null);

  const serviceName = selectedService
    ? SERVICES.find((s) => s.slug === selectedService)?.name
    : '';

  const priceRange =
    selectedService && propertyType && urgency
      ? PRICE_TABLE[selectedService]?.[propertyType]?.[urgency]
      : null;

  const reset = () => {
    setStep(1);
    setSelectedService(null);
    setPropertyType(null);
    setUrgency(null);
  };

  return (
    <div className="bg-t-card border border-t-card-border p-6 lg:p-10">
      {/* Step indicator */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                s <= step
                  ? 'bg-gold-500 text-white'
                  : 'bg-t-page-alt text-t-text-muted border border-t-card-border'
              }`}
            >
              {s}
            </div>
            {s < 3 && (
              <div
                className={`w-12 h-0.5 ${
                  s < step ? 'bg-gold-500' : 'bg-t-card-border'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Select Service */}
      {step === 1 && (
        <div>
          <h3 className="font-display text-2xl text-t-text text-center mb-2">
            What service do you need?
          </h3>
          <p className="text-t-text-secondary text-center mb-8">
            Select a service to see estimated pricing.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {SERVICES.map((service) => (
              <button
                key={service.slug}
                onClick={() => {
                  setSelectedService(service.slug);
                  setStep(2);
                }}
                className={`p-4 border text-left transition-colors hover:border-gold-500/50 ${
                  selectedService === service.slug
                    ? 'border-gold-500 bg-gold-50'
                    : 'border-t-card-border bg-t-page'
                }`}
              >
                <span className="font-medium text-t-text text-sm">{service.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Property Type */}
      {step === 2 && (
        <div>
          <h3 className="font-display text-2xl text-t-text text-center mb-2">
            What type of property?
          </h3>
          <p className="text-t-text-secondary text-center mb-8">
            Pricing varies by property type.
          </p>
          <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
            {(Object.keys(PROPERTY_LABELS) as PropertyType[]).map((type) => (
              <button
                key={type}
                onClick={() => {
                  setPropertyType(type);
                  setStep(3);
                }}
                className={`p-5 border text-center transition-colors hover:border-gold-500/50 ${
                  propertyType === type
                    ? 'border-gold-500 bg-gold-50'
                    : 'border-t-card-border bg-t-page'
                }`}
              >
                <span className="font-medium text-t-text text-sm">{PROPERTY_LABELS[type]}</span>
              </button>
            ))}
          </div>
          <div className="mt-6 text-center">
            <button onClick={() => setStep(1)} className="text-gold-500 text-sm font-medium hover:text-gold-400 inline-flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Urgency */}
      {step === 3 && !priceRange && (
        <div>
          <h3 className="font-display text-2xl text-t-text text-center mb-2">
            How soon do you need service?
          </h3>
          <p className="text-t-text-secondary text-center mb-8">
            Emergency service is available 24/7.
          </p>
          <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
            {(Object.keys(URGENCY_LABELS) as Urgency[]).map((u) => (
              <button
                key={u}
                onClick={() => setUrgency(u)}
                className="p-5 border border-t-card-border bg-t-page text-center transition-colors hover:border-gold-500/50"
              >
                <span className="font-medium text-t-text text-sm block">{URGENCY_LABELS[u].label}</span>
                <span className="text-t-text-muted text-xs mt-1 block">{URGENCY_LABELS[u].desc}</span>
              </button>
            ))}
          </div>
          <div className="mt-6 text-center">
            <button onClick={() => setStep(2)} className="text-gold-500 text-sm font-medium hover:text-gold-400 inline-flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
          </div>
        </div>
      )}

      {/* Result */}
      {priceRange && (
        <div className="text-center">
          <h3 className="font-display text-2xl text-t-text mb-2">
            Estimated Price Range
          </h3>
          <p className="text-t-text-secondary mb-6">
            {serviceName} &middot; {PROPERTY_LABELS[propertyType!]} &middot; {URGENCY_LABELS[urgency!].label}
          </p>

          <div className="bg-navy-900 text-white p-8 mb-6 inline-block">
            <div className="font-display text-4xl lg:text-5xl tracking-tight">
              {formatPrice(priceRange.min)} &ndash; {formatPrice(priceRange.max)}
            </div>
          </div>

          <div className="flex items-start gap-2 text-sm text-t-text-muted max-w-md mx-auto mb-8 text-left">
            <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <p>
              This is an estimate based on typical projects. Actual pricing depends on the specific scope of work. We always provide exact, upfront pricing before beginning any job.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={PHONE_LINK} className="btn-gold gap-2">
              <Phone className="w-5 h-5" />
              <span>Call for Exact Quote</span>
            </a>
            <button onClick={reset} className="btn-navy-outline gap-2">
              <ArrowRight className="w-4 h-4" />
              <span>Start Over</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
