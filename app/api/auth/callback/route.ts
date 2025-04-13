import { NextResponse, NextRequest } from "next/server";
import { handleGoogleCallback } from "@/libs/api/auth";
import config from "@/config";

export const dynamic = "force-dynamic";

// This route is called after the auth_service redirects from the Google OAuth callback
export async function GET(req: NextRequest) {
  const requestUrl = new URL(req.url);
  const code = requestUrl.searchParams.get("code");
  const error = requestUrl.searchParams.get("error");

  // Handle error from Google OAuth
  if (error) {
    console.error("Google OAuth error:", error);
    return NextResponse.redirect(requestUrl.origin + config.auth.loginUrl + "?error=google_auth_failed");
  }

  if (code) {
    try {
      // Exchange the code for a JWT token
      const result = await handleGoogleCallback(code);

      if (result.success) {
        // Successful authentication, redirect to the callback URL
        return NextResponse.redirect(requestUrl.origin + config.auth.callbackUrl);
      } else {
        // Authentication failed, redirect to login page with error
        const errorMessage = "google_auth_failed";
        return NextResponse.redirect(requestUrl.origin + config.auth.loginUrl + "?error=" + encodeURIComponent(errorMessage));
      }
    } catch (error: any) {
      console.error("Error handling Google callback:", error);
      return NextResponse.redirect(
        requestUrl.origin +
        config.auth.loginUrl +
        "?error=" +
        encodeURIComponent(error.message || "google_auth_failed")
      );
    }
  }

  // No code provided, redirect to login page
  return NextResponse.redirect(requestUrl.origin + config.auth.loginUrl);
}
