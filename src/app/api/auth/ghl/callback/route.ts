import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { saveTokenData, TokenData, getStoredTokens } from '@/utils/ghlAuth';

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    // Get the authorization code from the URL
    const url = new URL(request.url);
    const code = url.searchParams.get('code');
    const locationId = url.searchParams.get('locationId') || process.env.GHL_LOCATION_ID;
    
    if (!code) {
      return NextResponse.redirect(new URL('/api/auth/ghl/error?error=missing_code', request.url));
    }
    
    // Get client ID and client secret from environment variables
    const clientId = process.env.GHL_CLIENT_ID;
    const clientSecret = process.env.GHL_CLIENT_SECRET;
    
    if (!clientId || !clientSecret) {
      return NextResponse.redirect(new URL('/api/auth/ghl/error?error=missing_credentials', request.url));
    }
    
    // Exchange the code for an access token
    const tokenResponse = await fetch('https://services.leadconnectorhq.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'authorization_code',
        code,
        locationId
      })
    });
    
    if (!tokenResponse.ok) {
      const error = await tokenResponse.json();
      console.error('Error exchanging code for token:', error);
      return NextResponse.redirect(new URL(`/api/auth/ghl/error?error=token_exchange&details=${encodeURIComponent(JSON.stringify(error))}`, request.url));
    }
    
    const tokenData = await tokenResponse.json();
    
    // Calculate token expiration (default to 24 hours if expires_in is not provided)
    const expiresAt = Date.now() + ((tokenData.expires_in || 86400) * 1000);
    
    // Save the token data to your storage solution
    const newTokenData: TokenData = {
      accessToken: tokenData.access_token,
      refreshToken: tokenData.refresh_token,
      expiresAt,
      locationId: locationId || undefined
    };
    
    const saveResult = await saveTokenData(newTokenData);
    
    if (!saveResult) {
      return NextResponse.redirect(new URL('/api/auth/ghl/error?error=save_token', request.url));
    }
    
    // Redirect to success page
    return NextResponse.redirect(new URL('/api/auth/ghl/success', request.url));
  } catch (error) {
    console.error('Error in GHL OAuth callback:', error);
    return NextResponse.redirect(new URL('/api/auth/ghl/error?error=unknown', request.url));
  }
} 