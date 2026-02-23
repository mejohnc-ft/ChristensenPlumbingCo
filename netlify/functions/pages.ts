import type { Context } from '@netlify/functions';
import { handleOptions } from './_shared/cors';
import { jsonResponse, errorResponse } from './_shared/response';
import { getSupabaseAdmin } from './_shared/supabase';
import { verifyAuth, requireAdmin } from './_shared/auth';

export default async function handler(request: Request, _context: Context) {
  if (request.method === 'OPTIONS') return handleOptions(request);

  const origin = request.headers.get('Origin');
  const url = new URL(request.url);
  const pathParts = url.pathname.replace(/^\/api\/pages\/?/, '').split('/').filter(Boolean);
  const slugOrId = pathParts[0];
  const supabase = getSupabaseAdmin();

  if (request.method === 'GET') {
    if (slugOrId) {
      // Try by slug first, then fall back to ID lookup
      let { data, error } = await supabase
        .from('pages')
        .select('*, sections:page_sections(*)')
        .eq('slug', slugOrId)
        .maybeSingle();

      if (!data && !error) {
        ({ data, error } = await supabase
          .from('pages')
          .select('*, sections:page_sections(*)')
          .eq('id', slugOrId)
          .maybeSingle());
      }

      if (error || !data) return errorResponse('Page not found', 404, origin);
      if (!data.is_published) {
        const auth = await verifyAuth(request);
        if (!requireAdmin(auth)) return errorResponse('Not found', 404, origin);
      }
      return jsonResponse(data, 200, origin);
    }

    let query = supabase.from('pages').select('*, sections:page_sections(*)');

    const authHeader = request.headers.get('Authorization');
    if (authHeader) {
      const auth = await verifyAuth(request);
      if (!requireAdmin(auth)) query = query.eq('is_published', true);
    } else {
      query = query.eq('is_published', true);
    }

    const { data, error } = await query;
    if (error) return errorResponse(error.message, 500, origin);
    return jsonResponse(data ?? [], 200, origin);
  }

  const auth = await verifyAuth(request);
  if (!requireAdmin(auth)) return auth instanceof Response ? auth : errorResponse('Forbidden', 403, origin);

  if (request.method === 'POST') {
    const body = await request.json();
    const { sections, ...pageData } = body;
    const { data, error } = await supabase.from('pages').insert(pageData).select().single();
    if (error) return errorResponse(error.message, 500, origin);

    if (sections?.length) {
      const sectionsWithPageId = sections.map((s: Record<string, unknown>, i: number) => ({ ...s, page_id: data.id, position: s.position ?? i }));
      await supabase.from('page_sections').insert(sectionsWithPageId);
    }

    await supabase.rpc('log_audit_event', { p_action: 'create', p_table_name: 'pages', p_record_id: data.id, p_old_values: null, p_new_values: body });
    return jsonResponse(data, 201, origin);
  }

  if (request.method === 'PUT') {
    if (!slugOrId) return errorResponse('ID required', 400, origin);
    const body = await request.json();
    const { sections, ...pageData } = body;
    const { data: old } = await supabase.from('pages').select('*').eq('id', slugOrId).single();
    const { data, error } = await supabase.from('pages').update(pageData).eq('id', slugOrId).select().single();
    if (error) return errorResponse(error.message, 500, origin);

    if (sections) {
      await supabase.from('page_sections').delete().eq('page_id', slugOrId);
      if (sections.length) {
        const sectionsWithPageId = sections.map((s: Record<string, unknown>, i: number) => ({ ...s, page_id: slugOrId, position: s.position ?? i }));
        await supabase.from('page_sections').insert(sectionsWithPageId);
      }
    }

    await supabase.rpc('log_audit_event', { p_action: 'update', p_table_name: 'pages', p_record_id: slugOrId, p_old_values: old, p_new_values: body });
    return jsonResponse(data, 200, origin);
  }

  if (request.method === 'DELETE') {
    if (!slugOrId) return errorResponse('ID required', 400, origin);
    const { data: old } = await supabase.from('pages').select('*').eq('id', slugOrId).single();
    await supabase.from('page_sections').delete().eq('page_id', slugOrId);
    const { error } = await supabase.from('pages').delete().eq('id', slugOrId);
    if (error) return errorResponse(error.message, 500, origin);
    await supabase.rpc('log_audit_event', { p_action: 'delete', p_table_name: 'pages', p_record_id: slugOrId, p_old_values: old, p_new_values: null });
    return jsonResponse({ success: true }, 200, origin);
  }

  return errorResponse('Method not allowed', 405, origin);
}
