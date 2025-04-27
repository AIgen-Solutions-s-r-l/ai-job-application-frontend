import { NextResponse, type NextRequest } from 'next/server';
import { decodeToken } from '@/libs/api/auth'; // Assuming auth utils are here
import appConfig from '@/config'; // Assuming config is at root
import { isResumeExitsJWT } from '@/libs/api/resume';
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const appOrigin = process.env.SITE_URL;

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
        // Log raw response body before consuming it with .json()
        const rawBody = await response.clone().text();
        console.log('[Google Callback] Raw response body from auth_service:', rawBody);
        const data = await response.json(); // Now consume the original response body

        if (data.access_token) {
          // Set the JWT token as a cookie
          try {
            const { expirationDate } = await decodeToken(data.access_token);
            console.log('[Google Callback] Decoded token expiration:', expirationDate); // Log the expiration date

            // Validate expirationDate - if it's invalid/past, cookie might not set correctly
            if (!expirationDate || !(expirationDate instanceof Date) || expirationDate.getTime() < Date.now()) {
              console.warn('[Google Callback] Invalid or past expirationDate received from decodeToken. Cookie might not be set correctly or will be session-based.');
              // Optionally handle this case, e.g., by omitting expires for a session cookie or setting a default duration
            }

            // Check if the user already has resume
            const exists = await isResumeExitsJWT(data.access_token);

            let redirectUrl = ``;
            if (exists) {
              redirectUrl = `${appOrigin}/search`;
            } else {
              redirectUrl = `${appOrigin}/onboarding`;
            }

            // Create the redirect response *first*
            const response = NextResponse.redirect(redirectUrl);

            // Set the cookie on the response object
            const cookieOptions = {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'lax' as const, // Explicitly type 'lax'
              path: '/', // Ensure cookie is available for all paths
              expires: expirationDate instanceof Date ? expirationDate : undefined, // Use undefined for session cookie if date is invalid
            };
            console.log('[Google Callback] Attempting to set access token cookie with options:', cookieOptions);
            response.cookies.set('accessToken', data.access_token, cookieOptions);

            console.log(`[Google Callback] Final redirect URL: ${redirectUrl}. Cookie should be attached to this response.`);
            return response; // Return the response object with the cookie attached

          } catch (cookieError) {
            console.error('[Google Callback] Error during token decoding or cookie setting:', cookieError);
            // Redirect to login with a specific error for this phase
            return NextResponse.redirect(
              `${appOrigin}${appConfig.auth.loginUrl}?error=google_cookie_set_failed`
            );
          }
        } else {
          // Handle case where token is missing in response
          console.error('[Google Callback] Auth service response OK but no access_token found in data:', data);
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
      console.error('[Google Callback] General error in callback handler:', error);
      // Ensure error object is logged properly
      if (error instanceof Error) {
        console.error(`[Google Callback] Error details: ${error.message}`, error.stack);
      }
      return NextResponse.redirect(
        `${appOrigin}${appConfig.auth.loginUrl}?error=google_callback_handler_error`
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
