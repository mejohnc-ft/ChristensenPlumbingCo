import type { Context } from '@netlify/functions';
import { handleOptions } from './_shared/cors';
import { jsonResponse, errorResponse } from './_shared/response';
import { getSupabaseAdmin } from './_shared/supabase';
import { verifyAuth, requireAdmin } from './_shared/auth';

export default async function handler(request: Request, _context: Context) {
  if (request.method === 'OPTIONS') return handleOptions();

  const url = new URL(request.url);
  const pathParts = url.pathname.replace(/^\/api\/photos\/?/, '').split('/').filter(Boolean);
  const id = pathParts[0];
  const supabase = getSupabaseAdmin();

  if (request.method === 'GET') {
    const projectId = url.searchParams.get('project_id');
    let query = supabase.from('portfolio_photos').select('*', { count: 'exact' });
    if (projectId) query = query.eq('project_id', projectId);
    query = query.order('display_order', { ascending: true }).order('created_at', { ascending: false });

    const { data, error, count } = await query;
    if (error) return errorResponse(error.message, 500);
    return jsonResponse({ data: data ?? [], total: count ?? 0 });
  }

  const auth = await verifyAuth(request);
  if (!requireAdmin(auth)) return auth instanceof Response ? auth : errorResponse('Forbidden', 403);

  if (request.method === 'POST') {
    const body = await request.json();
    const { data, error } = await supabase.from('portfolio_photos').insert(body).select().single();
    if (error) return errorResponse(error.message, 500);
    await supabase.rpc('log_audit_event', { p_action: 'create', p_table_name: 'portfolio_photos', p_record_id: data.id, p_old_values: null, p_new_values: body });
    return jsonResponse(data, 201);
  }

  if (request.method === 'PUT') {
    if (!id) return errorResponse('ID required', 400);
    const body = await request.json();
    const { data: old } = await supabase.from('portfolio_photos').select('*').eq('id', id).single();
    const { data, error } = await supabase.from('portfolio_photos').update(body).eq('id', id).select().single();
    if (error) return errorResponse(error.message, 500);
    await supabase.rpc('log_audit_event', { p_action: 'update', p_table_name: 'portfolio_photos', p_record_id: id, p_old_values: old, p_new_values: body });
    return jsonResponse(data);
  }

  if (request.method === 'DELETE') {
    if (!id) return errorResponse('ID required', 400);
    const { data: old } = await supabase.from('portfolio_photos').select('*').eq('id', id).single();
    const { error } = await supabase.from('portfolio_photos').delete().eq('id', id);
    if (error) return errorResponse(error.message, 500);
    await supabase.rpc('log_audit_event', { p_action: 'delete', p_table_name: 'portfolio_photos', p_record_id: id, p_old_values: old, p_new_values: null });
    return jsonResponse({ success: true });
  }

  return errorResponse('Method not allowed', 405);
}
