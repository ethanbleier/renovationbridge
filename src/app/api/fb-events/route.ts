import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: Request) {
  try {
    const { event_name, event_time, user_data, custom_data } = await req.json();

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

    // Create the payload
    const payload = {
      data: [
        {
          event_name,
          event_time: event_time || Math.floor(Date.now() / 1000),
          action_source: 'website',
          user_data: {
            ...hashedUserData,
            client_ip_address: '{{_server_}}',
            client_user_agent: '{{_server_}}',
          },
          custom_data,
        },
      ],
    };

    // Send to Facebook
    const url = `https://graph.facebook.com/v18.0/${FB_PIXEL_ID}/events?access_token=${FB_ACCESS_TOKEN}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

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