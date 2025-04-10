import { NextResponse, type NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { getAppOrigin } from '@/libs/utils'; // Assuming utils is in libs
import { decodeToken } from '@/libs/api/auth'; // Assuming auth utils are here
import appConfig from '@/config'; // Assuming config is at root

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
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
          const cookieStore = cookies(); // Use cookies() from next/headers
          console.log('[Google Callback] Attempting to set access token cookie.'); // Added log

          cookieStore.set('accessToken', data.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/', // Ensure cookie is available for all paths
            expires: expirationDate
          });
          console.log('[Google Callback] Cookie setting function called.'); // Added log

          // Redirect to dashboard
          // Redirect to search page as requested
          const redirectUrl = `${appOrigin}/search`;
          console.log(`[Google Callback] Redirecting to: ${redirectUrl}`); // Added log
          return NextResponse.redirect(redirectUrl);
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
      console.error('Error in Google callback route handler:', error);
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