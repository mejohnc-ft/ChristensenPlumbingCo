import type { Context } from '@netlify/functions';
import { handleOptions } from './_shared/cors';
import { jsonResponse, errorResponse } from './_shared/response';
import { getSupabaseAdmin } from './_shared/supabase';
import { verifyAuth, requireAdmin } from './_shared/auth';

export default async function handler(request: Request, _context: Context) {
  if (request.method === 'OPTIONS') return handleOptions(request);

  const origin = request.headers.get('Origin');
  const url = new URL(request.url);
  const pathParts = url.pathname.replace(/^\/api\/leads\/?/, '').split('/').filter(Boolean);
  const id = pathParts[0];
  const supabase = getSupabaseAdmin();

  // All lead endpoints are admin-only
  const auth = await verifyAuth(request);
  if (!requireAdmin(auth)) return auth instanceof Response ? auth : errorResponse('Forbidden', 403, origin);

  if (request.method === 'GET') {
    const page = parseInt(url.searchParams.get('page') || '1');
    const perPage = parseInt(url.searchParams.get('per_page') || '20');
    const status = url.searchParams.get('status');

    let query = supabase.from('leads').select('*', { count: 'exact' });
    if (status) query = query.eq('status', status);

    query = query
      .order('created_at', { ascending: false })
      .range((page - 1) * perPage, page * perPage - 1);

    const { data, error, count } = await query;
    if (error) return errorResponse(error.message, 500, origin);
    return jsonResponse({ data: data ?? [], total: count ?? 0, page, per_page: perPage, has_more: (count ?? 0) > page * perPage }, 200, origin);
  }

  if (request.method === 'PUT') {
    if (!id) return errorResponse('ID required', 400, origin);
    const body = await request.json();
    const { data: old } = await supabase.from('leads').select('*').eq('id', id).single();
    const { data, error } = await supabase.from('leads').update(body).eq('id', id).select().single();
    if (error) return errorResponse(error.message, 500, origin);
    await supabase.rpc('log_audit_event', { p_action: 'update', p_table_name: 'leads', p_record_id: id, p_old_values: old, p_new_values: body });
    return jsonResponse(data, 200, origin);
  }

  if (request.method === 'DELETE') {
    if (!id) return errorResponse('ID required', 400, origin);
    const { data: old } = await supabase.from('leads').select('*').eq('id', id).single();
    const { error } = await supabase.from('leads').delete().eq('id', id);
    if (error) return errorResponse(error.message, 500, origin);
    await supabase.rpc('log_audit_event', { p_action: 'delete', p_table_name: 'leads', p_record_id: id, p_old_values: old, p_new_values: null });
    return jsonResponse({ success: true }, 200, origin);
  }

  return errorResponse('Method not allowed', 405, origin);
}
