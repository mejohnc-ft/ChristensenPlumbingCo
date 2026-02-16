import { describe, it, expect } from 'vitest';
import {
  SEO_DEFAULTS,
  PAGE_SEO,
  SERVICE_SEO,
  formatTitle,
  getPageSEO,
  buildCanonicalUrl,
  OPENING_HOURS,
  SERVICES_OFFERED,
} from './constants';

describe('SEO Constants', () => {
  describe('SEO_DEFAULTS', () => {
    it('has required business information', () => {
      expect(SEO_DEFAULTS.siteName).toBe('Christensen Plumbing Co.');
      expect(SEO_DEFAULTS.phone).toBe('(619) 433-2169');
      expect(SEO_DEFAULTS.siteUrl).toBe('https://christensenplumbing.com');
    });

    it('has valid address structure', () => {
      expect(SEO_DEFAULTS.address.addressLocality).toBe('San Diego');
      expect(SEO_DEFAULTS.address.addressRegion).toBe('CA');
      expect(SEO_DEFAULTS.address.addressCountry).toBe('US');
    });

    it('has geo coordinates', () => {
      expect(SEO_DEFAULTS.geo.latitude).toBeCloseTo(32.7157, 2);
      expect(SEO_DEFAULTS.geo.longitude).toBeCloseTo(-117.1611, 2);
    });

    it('has service area cities', () => {
      expect(SEO_DEFAULTS.serviceAreaCities).toContain('San Diego');
      expect(SEO_DEFAULTS.serviceAreaCities).toContain('La Jolla');
      expect(SEO_DEFAULTS.serviceAreaCities.length).toBeGreaterThan(10);
    });

    it('has social links', () => {
      expect(SEO_DEFAULTS.socialLinks.facebook).toBeDefined();
      expect(SEO_DEFAULTS.socialLinks.google).toBeDefined();
      expect(SEO_DEFAULTS.socialLinks.yelp).toBeDefined();
    });
  });

  describe('PAGE_SEO', () => {
    it('has configuration for main pages', () => {
      expect(PAGE_SEO.home).toBeDefined();
      expect(PAGE_SEO.reviews).toBeDefined();
      expect(PAGE_SEO.portfolio).toBeDefined();
      expect(PAGE_SEO.about).toBeDefined();
      expect(PAGE_SEO.emergency).toBeDefined();
    });

    it('has title and description for each page', () => {
      Object.values(PAGE_SEO).forEach((config) => {
        expect(config.title).toBeDefined();
        expect(config.title.length).toBeGreaterThan(0);
        expect(config.description).toBeDefined();
        expect(config.description.length).toBeGreaterThan(0);
      });
    });

    it('has keywords for key pages', () => {
      expect(PAGE_SEO.home.keywords).toBeDefined();
      expect(PAGE_SEO.home.keywords!.length).toBeGreaterThan(0);
    });
  });

  describe('SERVICE_SEO', () => {
    it('has service-specific configurations', () => {
      expect(SERVICE_SEO['emergency-plumbing']).toBeDefined();
      expect(SERVICE_SEO['drain-cleaning']).toBeDefined();
      expect(SERVICE_SEO['water-heaters']).toBeDefined();
    });
  });

  describe('formatTitle', () => {
    it('formats title with template', () => {
      const result = formatTitle('About Us');
      expect(result).toBe('About Us | Christensen Plumbing Co.');
    });

    it('returns default title unchanged', () => {
      const result = formatTitle(SEO_DEFAULTS.defaultTitle);
      expect(result).toBe(SEO_DEFAULTS.defaultTitle);
    });
  });

  describe('getPageSEO', () => {
    it('returns page config for existing page', () => {
      const config = getPageSEO('home');
      expect(config.title).toBe(PAGE_SEO.home.title);
      expect(config.description).toBe(PAGE_SEO.home.description);
    });

    it('returns default config for non-existing page', () => {
      const config = getPageSEO('non-existing-page');
      expect(config.title).toBe(SEO_DEFAULTS.defaultTitle);
      expect(config.description).toBe(SEO_DEFAULTS.defaultDescription);
    });
  });

  describe('buildCanonicalUrl', () => {
    it('builds full URL from path', () => {
      expect(buildCanonicalUrl('/about')).toBe('https://christensenplumbing.com/about');
    });

    it('handles path without leading slash', () => {
      expect(buildCanonicalUrl('about')).toBe('https://christensenplumbing.com/about');
    });

    it('handles root path', () => {
      expect(buildCanonicalUrl('/')).toBe('https://christensenplumbing.com/');
    });
  });

  describe('OPENING_HOURS', () => {
    it('has weekday and weekend hours', () => {
      expect(OPENING_HOURS.length).toBe(2);

      const weekdayHours = OPENING_HOURS.find(h => h.dayOfWeek.includes('Monday'));
      expect(weekdayHours).toBeDefined();
      expect(weekdayHours!.opens).toBe('06:00');
      expect(weekdayHours!.closes).toBe('20:00');
    });
  });

  describe('SERVICES_OFFERED', () => {
    it('has required services', () => {
      const serviceNames = SERVICES_OFFERED.map(s => s.name);
      expect(serviceNames).toContain('Emergency Plumbing');
      expect(serviceNames).toContain('Drain Cleaning');
      expect(serviceNames).toContain('Water Heater Services');
    });

    it('each service has name and description', () => {
      SERVICES_OFFERED.forEach((service) => {
        expect(service.name).toBeDefined();
        expect(service.description).toBeDefined();
        expect(service.description.length).toBeGreaterThan(10);
      });
    });
  });
});
