import type { Context } from '@netlify/functions';
import { handleOptions } from './_shared/cors';
import { jsonResponse, errorResponse } from './_shared/response';
import { getSupabaseAdmin } from './_shared/supabase';
import { verifyAuth, requireAdmin } from './_shared/auth';

export default async function handler(request: Request, _context: Context) {
  if (request.method === 'OPTIONS') return handleOptions();

  const url = new URL(request.url);
  const pathParts = url.pathname.replace(/^\/api\/settings\/?/, '').split('/').filter(Boolean);
  const key = pathParts[0];
  const supabase = getSupabaseAdmin();

  if (request.method === 'GET') {
    if (key) {
      const { data, error } = await supabase.from('site_settings').select('*').eq('key', key).single();
      if (error) return errorResponse('Setting not found', 404);
      return jsonResponse(data);
    }

    const category = url.searchParams.get('category');
    let query = supabase.from('site_settings').select('*');
    if (category) query = query.eq('category', category);
    const { data, error } = await query;
    if (error) return errorResponse(error.message, 500);
    return jsonResponse(data ?? []);
  }

  const auth = await verifyAuth(request);
  if (!requireAdmin(auth)) return auth instanceof Response ? auth : errorResponse('Forbidden', 403);

  if (request.method === 'PUT') {
    const body = await request.json();

    if (Array.isArray(body)) {
      // Bulk update
      const results = [];
      for (const setting of body) {
        const { data: old } = await supabase.from('site_settings').select('*').eq('key', setting.key).single();
        const { data, error } = await supabase
          .from('site_settings')
          .upsert({ key: setting.key, value: setting.value, category: setting.category || 'general' }, { onConflict: 'key' })
          .select()
          .single();
        if (error) return errorResponse(error.message, 500);
        await supabase.rpc('log_audit_event', { p_action: 'update', p_table_name: 'site_settings', p_record_id: data.id, p_old_values: old, p_new_values: setting });
        results.push(data);
      }
      return jsonResponse(results);
    }

    // Single update
    if (!key) return errorResponse('Key required', 400);
    const { data: old } = await supabase.from('site_settings').select('*').eq('key', key).single();
    const { data, error } = await supabase
      .from('site_settings')
      .upsert({ key, value: body.value, category: body.category || 'general' }, { onConflict: 'key' })
      .select()
      .single();
    if (error) return errorResponse(error.message, 500);
    await supabase.rpc('log_audit_event', { p_action: 'update', p_table_name: 'site_settings', p_record_id: data.id, p_old_values: old, p_new_values: body });
    return jsonResponse(data);
  }

  return errorResponse('Method not allowed', 405);
}
