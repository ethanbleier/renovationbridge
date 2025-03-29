import { NextResponse } from 'next/server';

export async function GET(request: Request) {
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
    // This is a placeholder - implement your own secure storage
    const saveResult = await saveTokenData({
      accessToken: tokenData.access_token,
      refreshToken: tokenData.refresh_token,
      expiresAt,
      locationId: locationId || undefined
    });
    
    if (!saveResult) {
      return NextResponse.redirect(new URL('/api/auth/ghl/error?error=save_token', request.url));
    }
    
    // Update environment variables for immediate use
    // Note: This does not persist across restarts and is for development only
    process.env.GHL_ACCESS_TOKEN = tokenData.access_token;
    process.env.GHL_REFRESH_TOKEN = tokenData.refresh_token;
    process.env.GHL_TOKEN_EXPIRES_AT = expiresAt.toString();
    if (locationId) {
      process.env.GHL_LOCATION_ID = locationId;
    }
    
    // Redirect to success page
    return NextResponse.redirect(new URL('/api/auth/ghl/success', request.url));
  } catch (error) {
    console.error('Error in GHL OAuth callback:', error);
    return NextResponse.redirect(new URL('/api/auth/ghl/error?error=unknown', request.url));
  }
}

// Save token data to your storage solution
// This is a placeholder - implement your own secure storage
async function saveTokenData(tokenData: { 
  accessToken: string, 
  refreshToken: string, 
  expiresAt: number,
  locationId?: string 
}) {
  try {
    // For demonstration only - log token info
    console.log('Token data received:', {
      accessTokenPrefix: tokenData.accessToken.substring(0, 5) + '...',
      refreshTokenPrefix: tokenData.refreshToken.substring(0, 5) + '...',
      expiresAt: new Date(tokenData.expiresAt).toISOString(),
      locationId: tokenData.locationId || 'using default'
    });
    
    // In a real application, you would save this data to a secure database
    // or use a service like AWS Secrets Manager, Azure Key Vault, etc.
    
    // For development, you might want to save to .env.local
    if (process.env.NODE_ENV === 'development') {
      // This is not ideal for production, but works for development
      // You would need to implement file system operations here
      console.log('DEVELOPMENT MODE: Would save token data to .env.local');
      
      // Return true to indicate successful save for demo purposes
      return true;
    }
    
    // For production, implement your secure storage solution here
    
    return true;
  } catch (error) {
    console.error('Error saving token data:', error);
    return false;
  }
} 