import type { Context } from '@netlify/functions';
import { handleOptions } from './_shared/cors';
import { jsonResponse, errorResponse } from './_shared/response';
import { getSupabaseAdmin } from './_shared/supabase';
import { verifyAuth, requireAdmin } from './_shared/auth';

export default async function handler(request: Request, _context: Context) {
  if (request.method === 'OPTIONS') return handleOptions();
  if (request.method !== 'GET') return errorResponse('Method not allowed', 405);

  const auth = await verifyAuth(request);
  if (!requireAdmin(auth)) return auth instanceof Response ? auth : errorResponse('Forbidden', 403);

  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get('page') || '1');
  const perPage = parseInt(url.searchParams.get('per_page') || '20');
  const action = url.searchParams.get('action');
  const tableName = url.searchParams.get('table_name');
  const startDate = url.searchParams.get('start_date');
  const endDate = url.searchParams.get('end_date');

  const supabase = getSupabaseAdmin();
  let query = supabase.from('audit_log').select('*', { count: 'exact' });

  if (action) query = query.eq('action', action);
  if (tableName) query = query.eq('table_name', tableName);
  if (startDate) query = query.gte('created_at', startDate);
  if (endDate) query = query.lte('created_at', endDate);

  query = query
    .order('created_at', { ascending: false })
    .range((page - 1) * perPage, page * perPage - 1);

  const { data, error, count } = await query;
  if (error) return errorResponse(error.message, 500);

  return jsonResponse({ data: data ?? [], total: count ?? 0, page, per_page: perPage, has_more: (count ?? 0) > page * perPage });
}
