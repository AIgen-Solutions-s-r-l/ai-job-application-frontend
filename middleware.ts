import { NextResponse, type NextRequest } from "next/server";
import { cookies } from 'next/headers';
import { getAppOrigin } from './libs/utils';
import { decodeToken } from './libs/api/auth';
import appConfig from './config';
export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const token = searchParams.get('token');
  const code = searchParams.get('code');
  if (pathname === '/api/auth/password-reset' && token) {
    return NextResponse.redirect(new URL(`/update-password?token=${token}`, request.url));
  }

  if (pathname === '/api/auth/verify-email' && token) {
    return NextResponse.redirect(new URL(`/verify-email?token=${token}`, request.url));
  }

  // Handle Google callback

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    '/api/auth/password-reset', 
    '/api/auth/verify-email',
  ],
};

