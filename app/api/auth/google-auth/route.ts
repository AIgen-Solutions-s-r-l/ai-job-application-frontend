import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { redirect_uri } = body;

    if (!redirect_uri) {
      return NextResponse.json(
        { error: 'Redirect URI is required' },
        { status: 400 }
      );
    }

    // Log environment variables for debugging
    console.log('Google OAuth Environment Variables:');
    console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID);
    console.log('GOOGLE_REDIRECT_URI:', process.env.GOOGLE_REDIRECT_URI);
    console.log('AUTH_API_URL:', process.env.AUTH_API_URL);
    
    // Forward the request to the auth service
    const response = await axios.post(
      `${process.env.AUTH_API_URL}/auth/google-auth`,
      { redirect_uri },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    // Return the authorization URL from the auth service
    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error('Error in Google OAuth route:', error);
    
    return NextResponse.json(
      { error: error.message || 'Failed to get Google OAuth URL' },
      { status: 500 }
    );
  }
}