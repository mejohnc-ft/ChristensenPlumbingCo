import type { Context } from '@netlify/functions';
import { handleOptions } from './_shared/cors';
import { jsonResponse, errorResponse } from './_shared/response';
import { getSupabaseAdmin } from './_shared/supabase';
import { verifyAuth, requireAdmin } from './_shared/auth';

function sanitizeSearch(input: string): string {
  return input.replace(/[,.()"\\]/g, '').trim();
}

export default async function handler(request: Request, _context: Context) {
  if (request.method === 'OPTIONS') return handleOptions(request);

  const origin = request.headers.get('Origin');
  const url = new URL(request.url);
  const pathParts = url.pathname.replace(/^\/api\/blog-posts\/?/, '').split('/').filter(Boolean);
  const slugOrId = pathParts[0];
  const supabase = getSupabaseAdmin();

  // GET - public reads published, admin reads all
  if (request.method === 'GET') {
    // Single post by slug
    if (slugOrId) {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slugOrId)
        .single();

      if (error || !data) return errorResponse('Post not found', 404, origin);

      // If not published, require admin
      if (data.status !== 'published') {
        const auth = await verifyAuth(request);
        if (!requireAdmin(auth)) return errorResponse('Not found', 404, origin);
      }

      return jsonResponse(data, 200, origin);
    }

    // List posts
    const page = parseInt(url.searchParams.get('page') || '1');
    const perPage = parseInt(url.searchParams.get('per_page') || '12');
    const category = url.searchParams.get('category');
    const tag = url.searchParams.get('tag');
    const search = url.searchParams.get('search');
    const status = url.searchParams.get('status');

    let query = supabase.from('blog_posts').select('*', { count: 'exact' });

    // Admin can filter by status; public only sees published
    if (status) {
      const auth = await verifyAuth(request);
      if (requireAdmin(auth)) {
        query = query.eq('status', status);
      } else {
        query = query.eq('status', 'published');
      }
    } else {
      // Check if admin
      const authHeader = request.headers.get('Authorization');
      if (authHeader) {
        const auth = await verifyAuth(request);
        if (!requireAdmin(auth)) {
          query = query.eq('status', 'published');
        }
      } else {
        query = query.eq('status', 'published');
      }
    }

    if (category) query = query.eq('category', category);
    if (tag) query = query.contains('tags', [tag]);
    if (search) {
      const safe = sanitizeSearch(search);
      if (safe) query = query.or(`title.ilike.%${safe}%,content.ilike.%${safe}%`);
    }

    query = query
      .order('published_at', { ascending: false, nullsFirst: false })
      .range((page - 1) * perPage, page * perPage - 1);

    const { data, error, count } = await query;
    if (error) return errorResponse(error.message, 500, origin);

    return jsonResponse({
      data: data ?? [],
      total: count ?? 0,
      page,
      per_page: perPage,
      has_more: (count ?? 0) > page * perPage,
    }, 200, origin);
  }

  // POST/PUT/DELETE - admin only
  const auth = await verifyAuth(request);
  if (!requireAdmin(auth)) {
    return auth instanceof Response ? auth : errorResponse('Forbidden', 403, origin);
  }

  if (request.method === 'POST') {
    const body = await request.json();
    const { data, error } = await supabase.from('blog_posts').insert(body).select().single();
    if (error) return errorResponse(error.message, 500, origin);

    await supabase.rpc('log_audit_event', {
      p_action: 'create',
      p_table_name: 'blog_posts',
      p_record_id: data.id,
      p_old_values: null,
      p_new_values: body,
    });

    return jsonResponse(data, 201, origin);
  }

  if (request.method === 'PUT') {
    if (!slugOrId) return errorResponse('ID required', 400, origin);
    const body = await request.json();

    const { data: old } = await supabase.from('blog_posts').select('*').eq('id', slugOrId).single();
    const { data, error } = await supabase.from('blog_posts').update(body).eq('id', slugOrId).select().single();
    if (error) return errorResponse(error.message, 500, origin);

    await supabase.rpc('log_audit_event', {
      p_action: 'update',
      p_table_name: 'blog_posts',
      p_record_id: slugOrId,
      p_old_values: old,
      p_new_values: body,
    });

    return jsonResponse(data, 200, origin);
  }

  if (request.method === 'DELETE') {
    if (!slugOrId) return errorResponse('ID required', 400, origin);

    const { data: old } = await supabase.from('blog_posts').select('*').eq('id', slugOrId).single();
    const { error } = await supabase.from('blog_posts').delete().eq('id', slugOrId);
    if (error) return errorResponse(error.message, 500, origin);

    await supabase.rpc('log_audit_event', {
      p_action: 'delete',
      p_table_name: 'blog_posts',
      p_record_id: slugOrId,
      p_old_values: old,
      p_new_values: null,
    });

    return jsonResponse({ success: true }, 200, origin);
  }

  return errorResponse('Method not allowed', 405, origin);
}
