import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { headers } from 'next/headers';

export async function POST(req: Request) {
  try {
    const { event_name, event_time, user_data, custom_data, test_event_code } = await req.json();
    
    // Get request headers for IP and user agent
    const headersList = headers();
    const userAgent = headersList.get('user-agent') || '';
    const clientIp = headersList.get('x-forwarded-for') || 
                    headersList.get('x-real-ip') || 
                    req.headers?.get('x-forwarded-for') ||
                    '127.0.0.1';
    
    // Get the request URL for event_source_url
    const referer = headersList.get('referer') || '';
    const origin = headersList.get('origin') || 'https://renovationbridge.com';
    const eventSourceUrl = custom_data?.location ? 
                          (origin + custom_data.location) : 
                          referer || origin;

    const FB_ACCESS_TOKEN = process.env.FB_ACCESS_TOKEN;
    const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;

    if (!FB_ACCESS_TOKEN || !FB_PIXEL_ID) {
      return NextResponse.json(
        { error: 'Facebook API credentials not configured' },
        { status: 500 }
      );
    }

    // Hash user data
    const hashedUserData: any = {};
    
    if (user_data.email) {
      hashedUserData.em = [hashData(user_data.email)];
    }
    
    if (user_data.phone) {
      hashedUserData.ph = [hashData(user_data.phone)];
    }
    
    if (user_data.firstName && user_data.lastName) {
      hashedUserData.fn = [hashData(user_data.firstName)];
      hashedUserData.ln = [hashData(user_data.lastName)];
    }
    
    // Add Facebook click ID (fbc) if provided
    if (user_data.fbc) {
      hashedUserData.fbc = user_data.fbc;
    }
    
    // Add Facebook browser ID (fbp) if provided
    if (user_data.fbp) {
      hashedUserData.fbp = user_data.fbp;
    }
    
    // Add external_id (used for matching)
    if (user_data.email) {
      hashedUserData.external_id = [hashData(user_data.email)];
    }

    // Create the payload with test_event_code at the top level
    const payload: any = {
      data: [
        {
          event_name,
          event_time: event_time || Math.floor(Date.now() / 1000),
          action_source: 'website',
          event_source_url: eventSourceUrl,
          user_data: {
            ...hashedUserData,
            client_ip_address: clientIp,
            client_user_agent: userAgent,
          },
          custom_data,
        },
      ],
    };

    // Add test_event_code if provided - at the top level
    if (test_event_code) {
      payload.test_event_code = test_event_code;
    }

    console.log('Sending Facebook event payload:', JSON.stringify(payload, null, 2));

    // Send to Facebook
    const url = `https://graph.facebook.com/v18.0/${FB_PIXEL_ID}/events?access_token=${FB_ACCESS_TOKEN}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    
    // Log full response for debugging
    console.log('Facebook API response:', JSON.stringify(data, null, 2));
    
    // Log success for test events
    if (test_event_code) {
      console.log(`Facebook test event sent with code: ${test_event_code}`);
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Facebook Conversions API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// Helper function to hash data according to Facebook requirements
function hashData(data: string): string {
  if (!data) return '';
  return crypto
    .createHash('sha256')
    .update(data.trim().toLowerCase())
    .digest('hex');
} 