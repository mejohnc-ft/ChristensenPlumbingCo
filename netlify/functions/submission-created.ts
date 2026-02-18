import { getSupabaseAdmin } from './_shared/supabase';

interface NetlifySubmissionEvent {
  body: string;
}

interface FormPayload {
  form_name: string;
  data: Record<string, string>;
}

// Netlify event-triggered background function
// Fires automatically when a Netlify Forms submission is created
export async function handler(event: NetlifySubmissionEvent) {
  try {
    const payload: FormPayload = JSON.parse(event.body);
    const { form_name, data } = payload;

    // Only process our contact forms
    if (form_name !== 'contact' && form_name !== 'homepage-contact') {
      return { statusCode: 200, body: 'Skipped: not a contact form' };
    }

    const supabase = getSupabaseAdmin();

    await supabase.from('leads').insert({
      name: data.name || 'Unknown',
      email: data.email || '',
      phone: data.phone || '',
      service_type: data.service || data.service_type || '',
      message: data.message || '',
      source_page: form_name === 'homepage-contact' ? '/' : '/contact',
      status: 'new',
      is_emergency: false,
    });

    return { statusCode: 200, body: 'Lead created' };
  } catch (error) {
    console.error('submission-created error:', error);
    // Always return 200 to prevent Netlify retries
    return { statusCode: 200, body: 'Error logged' };
  }
}
