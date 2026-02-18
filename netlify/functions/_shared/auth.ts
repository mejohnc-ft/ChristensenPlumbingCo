import { createClerkClient } from '@clerk/backend';
import { errorResponse } from './response';

const clerk = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY!,
});

export interface AuthResult {
  userId: string;
  email: string;
  isAdmin: boolean;
}

export async function verifyAuth(request: Request): Promise<AuthResult | Response> {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return errorResponse('Missing or invalid Authorization header', 401);
  }

  const token = authHeader.slice(7);

  try {
    const payload = await clerk.verifyToken(token);
    const user = await clerk.users.getUser(payload.sub);
    const email = user.emailAddresses[0]?.emailAddress ?? '';
    const isAdmin = user.publicMetadata?.role === 'admin';

    return { userId: payload.sub, email, isAdmin };
  } catch {
    return errorResponse('Invalid or expired token', 401);
  }
}

export function requireAdmin(auth: AuthResult | Response): auth is AuthResult {
  if (auth instanceof Response) return false;
  return auth.isAdmin;
}
