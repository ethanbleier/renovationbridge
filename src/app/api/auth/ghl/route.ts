import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    // Get client ID from environment variables
    const clientId = process.env.GHL_CLIENT_ID;
    
    if (!clientId) {
      return NextResponse.json(
        { error: 'GoHighLevel client ID not configured' },
        { status: 500 }
      );
    }
    
    // Get the redirect URI
    const host = request.headers.get('host') || '';
    const protocol = host.includes('localhost') ? 'http' : 'https';
    const redirectUri = `${protocol}://${host}/api/auth/ghl/callback`;
    
    // Construct the OAuth URL
    const oauthUrl = new URL('https://marketplace.gohighlevel.com/oauth/chooselocation');
    oauthUrl.searchParams.append('response_type', 'code');
    oauthUrl.searchParams.append('client_id', clientId);
    oauthUrl.searchParams.append('redirect_uri', redirectUri);
    oauthUrl.searchParams.append('scope', 'contacts/readonly contacts/write');
    
    // Redirect to GoHighLevel OAuth page
    return NextResponse.redirect(oauthUrl);
  } catch (error) {
    console.error('Error initiating GHL OAuth flow:', error);
    return NextResponse.json(
      { error: 'Failed to initiate GoHighLevel OAuth flow' },
      { status: 500 }
    );
  }
} 