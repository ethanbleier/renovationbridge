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
    
    const response = await fetch('/api/fb-events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event_name: eventData.event_name,
        event_time: eventData.event_time || Math.floor(Date.now() / 1000),
        user_data: enrichedUserData,
        custom_data: eventData.custom_data || {},
        test_event_code: eventData.test_event_code,
      }),
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

/**
 * Send a form submission event to Facebook
 * @param formType The type of form (e.g., 'contact', 'quote')
 * @param userData User data from the form
 * @param formData Additional form data
 * @param testEventCode Optional test event code for testing in Facebook Events Manager
 */
export async function sendFormSubmissionEvent(
  formType: string,
  userData: UserData,
  formData: Record<string, any> = {},
  testEventCode?: string
): Promise<boolean> {
  // Include current URL in form data if not already present
  if (!formData.location && typeof window !== 'undefined') {
    formData.location = window.location.pathname;
  }
  
  return await sendFacebookEvent({
    event_name: 'Lead',
    user_data: userData,
    custom_data: {
      form_type: formType,
      ...formData,
    },
    test_event_code: testEventCode,
  });
} 