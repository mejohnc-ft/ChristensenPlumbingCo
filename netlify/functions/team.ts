import type { Context } from '@netlify/functions';
import { handleOptions } from './_shared/cors';
import { jsonResponse, errorResponse } from './_shared/response';
import { getSupabaseAdmin } from './_shared/supabase';
import { verifyAuth, requireAdmin } from './_shared/auth';

export default async function handler(request: Request, _context: Context) {
  if (request.method === 'OPTIONS') return handleOptions();

  const url = new URL(request.url);
  const pathParts = url.pathname.replace(/^\/api\/team\/?/, '').split('/').filter(Boolean);
  const id = pathParts[0];
  const supabase = getSupabaseAdmin();

  if (request.method === 'GET') {
    let query = supabase.from('team_members').select('*');

    const authHeader = request.headers.get('Authorization');
    if (authHeader) {
      const auth = await verifyAuth(request);
      if (!requireAdmin(auth)) query = query.eq('is_visible', true);
    } else {
      query = query.eq('is_visible', true);
    }

    query = query.order('display_order', { ascending: true });
    const { data, error } = await query;
    if (error) return errorResponse(error.message, 500);
    return jsonResponse(data ?? []);
  }

  const auth = await verifyAuth(request);
  if (!requireAdmin(auth)) return auth instanceof Response ? auth : errorResponse('Forbidden', 403);

  if (request.method === 'POST') {
    const body = await request.json();
    const { data, error } = await supabase.from('team_members').insert(body).select().single();
    if (error) return errorResponse(error.message, 500);
    await supabase.rpc('log_audit_event', { p_action: 'create', p_table_name: 'team_members', p_record_id: data.id, p_old_values: null, p_new_values: body });
    return jsonResponse(data, 201);
  }

  if (request.method === 'PUT') {
    if (!id) return errorResponse('ID required', 400);
    const body = await request.json();
    const { data: old } = await supabase.from('team_members').select('*').eq('id', id).single();
    const { data, error } = await supabase.from('team_members').update(body).eq('id', id).select().single();
    if (error) return errorResponse(error.message, 500);
    await supabase.rpc('log_audit_event', { p_action: 'update', p_table_name: 'team_members', p_record_id: id, p_old_values: old, p_new_values: body });
    return jsonResponse(data);
  }

  if (request.method === 'DELETE') {
    if (!id) return errorResponse('ID required', 400);
    const { data: old } = await supabase.from('team_members').select('*').eq('id', id).single();
    const { error } = await supabase.from('team_members').delete().eq('id', id);
    if (error) return errorResponse(error.message, 500);
    await supabase.rpc('log_audit_event', { p_action: 'delete', p_table_name: 'team_members', p_record_id: id, p_old_values: old, p_new_values: null });
    return jsonResponse({ success: true });
  }

  return errorResponse('Method not allowed', 405);
}
