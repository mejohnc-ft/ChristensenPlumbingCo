/**
 * Analytics & Event Tracking
 *
 * Pushes events to GTM dataLayer. When GTM is configured with a GA4 tag,
 * these events will flow through to Google Analytics automatically.
 *
 * Setup: Replace GTM-XXXXXXX in index.html with your real GTM container ID.
 */

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

function pushEvent(event: Record<string, unknown>) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(event);
}

/** Track SPA virtual page views */
export function trackPageView(path: string, title: string) {
  pushEvent({
    event: 'page_view',
    page_path: path,
    page_title: title,
  });
}

/** Track phone number clicks */
export function trackPhoneClick(location: string) {
  pushEvent({
    event: 'phone_click',
    click_location: location,
    phone_number: '(619) 433-2169',
  });
}

/** Track email link clicks */
export function trackEmailClick(location: string) {
  pushEvent({
    event: 'email_click',
    click_location: location,
  });
}

/** Track form submissions */
export function trackFormSubmit(formName: string) {
  pushEvent({
    event: 'form_submit',
    form_name: formName,
  });
}

/** Track CTA button clicks */
export function trackCTAClick(ctaName: string, location: string) {
  pushEvent({
    event: 'cta_click',
    cta_name: ctaName,
    click_location: location,
  });
}
