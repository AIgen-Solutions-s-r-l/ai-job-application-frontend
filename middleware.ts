import { NextResponse, type NextRequest } from "next/server";
import { cookies } from 'next/headers';
import { getAppOrigin } from './libs/utils';
import { decodeToken } from './libs/api/auth';
import appConfig from './config';

const isDev = process.env.NODE_ENV === 'development';

// Build CSP directives with whitelisted domains only
const buildCSP = () => {
  const directives = [
    // Default: only self
    "default-src 'self'",

    // Scripts: self + required third parties
    // Note: 'unsafe-inline' kept for Next.js Script components, 'unsafe-eval' only in dev
    `script-src 'self' 'unsafe-inline' ${isDev ? "'unsafe-eval'" : ""} https://www.googletagmanager.com https://www.google-analytics.com https://js.stripe.com https://client.crisp.chat`,

    // Styles: self + inline (required for CSS-in-JS) + Google Fonts
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://client.crisp.chat",

    // Images: self + data URIs + CDNs + Stripe + common image sources
    "img-src 'self' data: blob: https://*.stripe.com https://www.googletagmanager.com https://image.crisp.chat https://client.crisp.chat https://*.amazonaws.com",

    // Fonts: self + Google Fonts + Crisp
    "font-src 'self' https://fonts.gstatic.com https://client.crisp.chat",

    // Connect: self + APIs + analytics + Stripe + Crisp
    "connect-src 'self' https://www.google-analytics.com https://api.stripe.com https://wss.crisp.chat https://client.crisp.chat https://storage.crisp.chat",

    // Frames: Stripe checkout + Crisp
    "frame-src https://js.stripe.com https://hooks.stripe.com https://game.crisp.chat",

    // Media: self only
    "media-src 'self'",

    // Workers: self + blob (for some libraries)
    "worker-src 'self' blob:",

    // Object: none (no plugins)
    "object-src 'none'",

    // Base URI: self
    "base-uri 'self'",

    // Form actions: self
    "form-action 'self'",

    // Frame ancestors: none (prevent embedding)
    "frame-ancestors 'none'",
  ];

  return directives.join('; ');
};

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

  const response = NextResponse.next();

  // Content Security Policy - whitelisted domains only
  response.headers.set('Content-Security-Policy', buildCSP());
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  // Permissions Policy - disable unnecessary features
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  return response;
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

