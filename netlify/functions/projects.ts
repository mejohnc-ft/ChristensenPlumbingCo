import type { Context } from '@netlify/functions';
import { handleOptions } from './_shared/cors';
import { jsonResponse, errorResponse } from './_shared/response';
import { getSupabaseAdmin } from './_shared/supabase';
import { verifyAuth, requireAdmin } from './_shared/auth';

export default async function handler(request: Request, _context: Context) {
  if (request.method === 'OPTIONS') return handleOptions();

  const url = new URL(request.url);
  const pathParts = url.pathname.replace(/^\/api\/projects\/?/, '').split('/').filter(Boolean);
  const slugOrId = pathParts[0];
  const supabase = getSupabaseAdmin();

  if (request.method === 'GET') {
    if (slugOrId) {
      const { data, error } = await supabase
        .from('projects')
        .select('*, photos:portfolio_photos(*)')
        .or(`slug.eq.${slugOrId},id.eq.${slugOrId}`)
        .single();

      if (error || !data) return errorResponse('Project not found', 404);
      if (!data.is_published) {
        const auth = await verifyAuth(request);
        if (!requireAdmin(auth)) return errorResponse('Not found', 404);
      }
      return jsonResponse(data);
    }

    const page = parseInt(url.searchParams.get('page') || '1');
    const perPage = parseInt(url.searchParams.get('per_page') || '20');
    const category = url.searchParams.get('category');
    const featured = url.searchParams.get('featured');

    let query = supabase.from('projects').select('*, photos:portfolio_photos(*)', { count: 'exact' });

    const authHeader = request.headers.get('Authorization');
    if (authHeader) {
      const auth = await verifyAuth(request);
      if (!requireAdmin(auth)) query = query.eq('is_published', true);
    } else {
      query = query.eq('is_published', true);
    }

    if (category) query = query.eq('category', category);
    if (featured === 'true') query = query.eq('featured', true);

    query = query
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false })
      .range((page - 1) * perPage, page * perPage - 1);

    const { data, error, count } = await query;
    if (error) return errorResponse(error.message, 500);
    return jsonResponse({ data: data ?? [], total: count ?? 0, page, per_page: perPage, has_more: (count ?? 0) > page * perPage });
  }

  const auth = await verifyAuth(request);
  if (!requireAdmin(auth)) return auth instanceof Response ? auth : errorResponse('Forbidden', 403);

  if (request.method === 'POST') {
    const body = await request.json();
    const { data, error } = await supabase.from('projects').insert(body).select().single();
    if (error) return errorResponse(error.message, 500);
    await supabase.rpc('log_audit_event', { p_action: 'create', p_table_name: 'projects', p_record_id: data.id, p_old_values: null, p_new_values: body });
    return jsonResponse(data, 201);
  }

  if (request.method === 'PUT') {
    if (!slugOrId) return errorResponse('ID required', 400);
    const body = await request.json();
    const { data: old } = await supabase.from('projects').select('*').eq('id', slugOrId).single();
    const { data, error } = await supabase.from('projects').update(body).eq('id', slugOrId).select().single();
    if (error) return errorResponse(error.message, 500);
    await supabase.rpc('log_audit_event', { p_action: 'update', p_table_name: 'projects', p_record_id: slugOrId, p_old_values: old, p_new_values: body });
    return jsonResponse(data);
  }

  if (request.method === 'DELETE') {
    if (!slugOrId) return errorResponse('ID required', 400);
    const { data: old } = await supabase.from('projects').select('*').eq('id', slugOrId).single();
    const { error } = await supabase.from('projects').delete().eq('id', slugOrId);
    if (error) return errorResponse(error.message, 500);
    await supabase.rpc('log_audit_event', { p_action: 'delete', p_table_name: 'projects', p_record_id: slugOrId, p_old_values: old, p_new_values: null });
    return jsonResponse({ success: true });
  }

  return errorResponse('Method not allowed', 405);
}
