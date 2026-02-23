import { getCorsHeaders } from './cors';

export function jsonResponse(data: unknown, status = 200, origin?: string | null): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...getCorsHeaders(origin), 'Content-Type': 'application/json' },
  });
}

export function errorResponse(message: string, status = 400, origin?: string | null): Response {
  return jsonResponse({ error: message }, status, origin);
}
