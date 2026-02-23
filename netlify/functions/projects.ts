import type { Context } from '@netlify/functions';
import { handleOptions } from './_shared/cors';
import { jsonResponse, errorResponse } from './_shared/response';
import { getSupabaseAdmin } from './_shared/supabase';
import { verifyAuth, requireAdmin } from './_shared/auth';

export default async function handler(request: Request, _context: Context) {
  if (request.method === 'OPTIONS') return handleOptions(request);

  const origin = request.headers.get('Origin');
  const url = new URL(request.url);
  const pathParts = url.pathname.replace(/^\/api\/projects\/?/, '').split('/').filter(Boolean);
  const slugOrId = pathParts[0];
  const supabase = getSupabaseAdmin();

  if (request.method === 'GET') {
    if (slugOrId) {
      // Try by slug first, then fall back to ID lookup
      let { data, error } = await supabase
        .from('projects')
        .select('*, photos:portfolio_photos(*)')
        .eq('slug', slugOrId)
        .maybeSingle();

      if (!data && !error) {
        ({ data, error } = await supabase
          .from('projects')
          .select('*, photos:portfolio_photos(*)')
          .eq('id', slugOrId)
          .maybeSingle());
      }

      if (error || !data) return errorResponse('Project not found', 404, origin);
      if (!data.is_published) {
        const auth = await verifyAuth(request);
        if (!requireAdmin(auth)) return errorResponse('Not found', 404, origin);
      }
      return jsonResponse(data, 200, origin);
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
    if (error) return errorResponse(error.message, 500, origin);
    return jsonResponse({ data: data ?? [], total: count ?? 0, page, per_page: perPage, has_more: (count ?? 0) > page * perPage }, 200, origin);
  }

  const auth = await verifyAuth(request);
  if (!requireAdmin(auth)) return auth instanceof Response ? auth : errorResponse('Forbidden', 403, origin);

  if (request.method === 'POST') {
    const body = await request.json();
    const { data, error } = await supabase.from('projects').insert(body).select().single();
    if (error) return errorResponse(error.message, 500, origin);
    await supabase.rpc('log_audit_event', { p_action: 'create', p_table_name: 'projects', p_record_id: data.id, p_old_values: null, p_new_values: body });
    return jsonResponse(data, 201, origin);
  }

  if (request.method === 'PUT') {
    if (!slugOrId) return errorResponse('ID required', 400, origin);
    const body = await request.json();
    const { data: old } = await supabase.from('projects').select('*').eq('id', slugOrId).single();
    const { data, error } = await supabase.from('projects').update(body).eq('id', slugOrId).select().single();
    if (error) return errorResponse(error.message, 500, origin);
    await supabase.rpc('log_audit_event', { p_action: 'update', p_table_name: 'projects', p_record_id: slugOrId, p_old_values: old, p_new_values: body });
    return jsonResponse(data, 200, origin);
  }

  if (request.method === 'DELETE') {
    if (!slugOrId) return errorResponse('ID required', 400, origin);
    const { data: old } = await supabase.from('projects').select('*').eq('id', slugOrId).single();
    const { error } = await supabase.from('projects').delete().eq('id', slugOrId);
    if (error) return errorResponse(error.message, 500, origin);
    await supabase.rpc('log_audit_event', { p_action: 'delete', p_table_name: 'projects', p_record_id: slugOrId, p_old_values: old, p_new_values: null });
    return jsonResponse({ success: true }, 200, origin);
  }

  return errorResponse('Method not allowed', 405, origin);
}
