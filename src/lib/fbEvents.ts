import { getFacebookTrackingParams } from './fbTracking';

type UserData = {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  fbc?: string;
  fbp?: string;
};

type EventData = {
  event_name: string;
  user_data: UserData;
  custom_data?: Record<string, any>;
  event_time?: number;
  test_event_code?: string;
};

// Define the payload type to match what we're sending to the API
type FacebookEventPayload = {
  event_name: string;
  event_time: number;
  user_data: UserData;
  custom_data: Record<string, any>;
  test_event_code?: string;
};

/**
 * Send an event to Facebook Conversions API
 * @param eventData The event data to send
 * @returns Promise that resolves when the event is sent
 */
export async function sendFacebookEvent(eventData: EventData): Promise<boolean> {
  try {
    console.log('Preparing to send Facebook event:', eventData.event_name);
    
    // Get Facebook tracking parameters
    const fbParams = getFacebookTrackingParams();
    
    // Add Facebook tracking parameters to user data if not already present
    const enrichedUserData = {
      ...eventData.user_data,
      fbc: eventData.user_data.fbc || fbParams.fbc || undefined,
      fbp: eventData.user_data.fbp || fbParams.fbp || undefined,
    };
    
    // Create timestamp if not provided
    const eventTime = eventData.event_time || Math.floor(Date.now() / 1000);
    
    const payload: FacebookEventPayload = {
      event_name: eventData.event_name,
      event_time: eventTime,
      user_data: enrichedUserData,
      custom_data: eventData.custom_data || {},
    };
    
    // Only add test_event_code if it's provided and valid (not "forced")
    if (eventData.test_event_code && eventData.test_event_code !== "forced") {
      payload.test_event_code = eventData.test_event_code;
    }
    
    // Send to API endpoint
    const response = await fetch('/api/fb-events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const responseData = await response.json();
    
    if (!response.ok) {
      console.error('Failed to send Facebook event:', responseData);
      return false;
    }

    console.log('Facebook event sent successfully:', responseData);
    return true;
  } catch (error) {
    console.error('Error sending Facebook event:', error);
    return false;
  }
} 