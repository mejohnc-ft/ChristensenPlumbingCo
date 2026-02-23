const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || 'https://christensenplumbing.com').split(',');

export function getCorsHeaders(origin?: string | null): Record<string, string> {
  const allowedOrigin = ALLOWED_ORIGINS.includes(origin || '') ? origin! : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  };
}

export function handleOptions(request: Request): Response {
  return new Response(null, { status: 204, headers: getCorsHeaders(request.headers.get('Origin')) });
}
