import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const token = searchParams.get('token');

  if (pathname === '/api/auth/reset-password' && token) {
    return NextResponse.redirect(new URL(`/update-password?token=${token}`, request.url));
  }

  if (pathname === '/api/auth/verify-email' && token) {
    return NextResponse.redirect(new URL(`/verify-email?token=${token}`, request.url));
  }

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
    '/api/auth/reset-password', 
    '/api/auth/verify-email',
  ],
};
