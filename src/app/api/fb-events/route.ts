import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { headers } from 'next/headers';

export async function POST(req: Request) {
  console.log('--- FB_EVENTS API ROUTE CALLED ---');
  console.log('Timestamp:', new Date().toISOString());
  
  try {
    // Log request headers for debugging
    const headersList = headers();
    console.log('Request headers:', {
      userAgent: headersList.get('user-agent'),
      referer: headersList.get('referer'),
      origin: headersList.get('origin'),
      contentType: headersList.get('content-type')
    });
    
    // Parse the request body
    let body;
    try {
      body = await req.json();
      console.log('Request body received (partial):', {
        event_name: body.event_name,
        has_user_data: !!body.user_data,
        has_custom_data: !!body.custom_data,
      });
    } catch (parseError) {
      console.error('Error parsing request body:', parseError);
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }
    
    const { event_name, event_time, user_data, custom_data, test_event_code } = body;
    
    // Validate required fields
    if (!event_name) {
      console.error('Missing event_name field');
      return NextResponse.json(
        { error: 'Missing required field: event_name' },
        { status: 400 }
      );
    }
    
    if (!user_data) {
      console.error('Missing user_data field');
      return NextResponse.json(
        { error: 'Missing required field: user_data' },
        { status: 400 }
      );
    }
    
    console.log('Event data:', {
      event_name, 
      has_email: !!user_data.email,
      has_phone: !!user_data.phone,
      has_name: !!(user_data.firstName || user_data.lastName),
      form_type: custom_data?.form_type
    });
    
    // Get request headers for IP and user agent
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

    // Check for Facebook API credentials
    const FB_ACCESS_TOKEN = process.env.FB_ACCESS_TOKEN;
    const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;
    const FB_APP_ID = process.env.FB_APP_ID;

    // Log the actual Pixel ID being used
    console.log('Using Facebook Pixel ID:', FB_PIXEL_ID);

    if (!FB_ACCESS_TOKEN || !FB_PIXEL_ID) {
      console.error('Facebook API credentials missing:', {
        hasAccessToken: !!FB_ACCESS_TOKEN,
        hasPixelId: !!FB_PIXEL_ID
      });
      return NextResponse.json(
        { error: 'Facebook API credentials not configured' },
        { status: 500 }
      );
    }

    console.log('Facebook credentials verified');

    // Hash user data
    try {
      const hashedUserData: any = {};
      
      if (user_data.email) {
        hashedUserData.em = [hashData(user_data.email)];
      }
      
      if (user_data.phone) {
        // Make sure phone is properly formatted (remove non-digits)
        const phone = typeof user_data.phone === 'string' 
          ? user_data.phone.replace(/\D/g, '')
          : '';
        if (phone) {
          hashedUserData.ph = [hashData(phone)];
        }
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

      // Create the payload with data, access_token, and app_id
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
            custom_data: custom_data || {},
          },
        ],
        access_token: FB_ACCESS_TOKEN,
        ...(FB_APP_ID && { app_id: FB_APP_ID })
      };

      // Add test_event_code if provided and not "forced"
      if (test_event_code && test_event_code !== "forced") {
        payload.test_event_code = test_event_code;
      }

      console.log('Prepared Facebook Conversions API payload (sample):', {
        event_source_url: payload.data[0].event_source_url,
        event_name: payload.data[0].event_name,
        event_time: payload.data[0].event_time,
        action_source: payload.data[0].action_source,
        has_user_data: !!payload.data[0].user_data,
        has_custom_data: !!payload.data[0].custom_data
      });

      // Send to Facebook - access token is now in the body
      const url = `https://graph.facebook.com/v18.0/${FB_PIXEL_ID}/events`;
      console.log('Sending request to Facebook API');
      
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      console.log('Facebook API response status:', response.status);
      
      let data;
      try {
        data = await response.json();
      } catch (jsonError) {
        console.error('Error parsing Facebook API response:', jsonError);
        return NextResponse.json(
          { error: 'Error parsing Facebook response' },
          { status: 500 }
        );
      }
      
      // Check for Facebook API errors
      if (data.error) {
        console.error('Facebook API error:', data.error);
        return NextResponse.json(
          { error: data.error.message || 'Facebook API error', details: data.error },
          { status: 400 }
        );
      }
      
      console.log('Facebook Conversions API success:', data);
      
      // Log success for test events
      if (test_event_code && test_event_code !== "forced") {
        console.log(`Facebook test event sent with code: ${test_event_code}`);
      }

      return NextResponse.json(data, { status: 200 });
    } catch (processingError) {
      console.error('Error processing Facebook event data:', processingError);
      return NextResponse.json(
        { error: processingError instanceof Error ? processingError.message : 'Error processing event data' },
        { status: 500 }
      );
    }
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
  try {
    return crypto
      .createHash('sha256')
      .update(data.trim().toLowerCase())
      .digest('hex');
  } catch (error) {
    console.error('Error hashing data:', error);
    return '';
  }
} 