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
  if (pathname === '/api/auth/google-callback') {
    const appOrigin = getAppOrigin();

    if (code) {
      // Create a direct API request to the auth service
      try {
        const response = await fetch(
          `${process.env.AUTH_API_URL}/auth/login-with-google`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              // Include API keys if needed, assuming they are required for this endpoint
              'apikey': process.env.API_KEY || '',
              'api-key': process.env.API_KEY2 || ''
            },
            body: JSON.stringify({
              code,
              redirect_uri: process.env.GOOGLE_REDIRECT_URI
            })
          }
        );

        if (response.ok) {
          const data = await response.json();

          if (data.access_token) {
            // Set the JWT token as a cookie
            const { expirationDate } = await decodeToken(data.access_token);
            const cookieStore = cookies();

            cookieStore.set('accessToken', data.access_token, {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'lax',
              path: '/', // Ensure cookie is available for all paths
              expires: expirationDate
            });

            // Redirect to dashboard
            return NextResponse.redirect(`${appOrigin}${appConfig.auth.callbackUrl}`);
          } else {
             // Handle case where token is missing in response
             console.error('Google callback successful but no access token received');
             return NextResponse.redirect(
               `${appOrigin}${appConfig.auth.loginUrl}?error=google_auth_failed_no_token`
             );
          }
        } else {
          // Auth failed, redirect to login page
          const errorData = await response.text(); // Get error details if possible
          console.error(`Google auth failed with status ${response.status}: ${errorData}`);
          return NextResponse.redirect(
            `${appOrigin}${appConfig.auth.loginUrl}?error=google_auth_failed`
          );
        }
      } catch (error) {
        console.error('Error in Google callback middleware:', error);
        return NextResponse.redirect(
          `${appOrigin}${appConfig.auth.loginUrl}?error=google_auth_failed`
        );
      }
    } else {
      // No code provided, redirect to login
      const error = searchParams.get('error');
      if (error) {
        console.error('Google OAuth error received:', error);
      }
      return NextResponse.redirect(`${appOrigin}${appConfig.auth.loginUrl}${error ? '?error=google_auth_error' : ''}`);
    }
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
    '/api/auth/password-reset', 
    '/api/auth/verify-email',
    '/api/auth/google-callback', // Add this line
  ],
};
