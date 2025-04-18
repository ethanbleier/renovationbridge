type UserData = {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
};

type EventData = {
  event_name: string;
  user_data: UserData;
  custom_data?: Record<string, any>;
  event_time?: number;
};

/**
 * Send an event to Facebook Conversions API
 * @param eventData The event data to send
 * @returns Promise that resolves when the event is sent
 */
export async function sendFacebookEvent(eventData: EventData): Promise<boolean> {
  try {
    const response = await fetch('/api/fb-events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event_name: eventData.event_name,
        event_time: eventData.event_time || Math.floor(Date.now() / 1000),
        user_data: eventData.user_data,
        custom_data: eventData.custom_data || {},
      }),
    });

    if (!response.ok) {
      console.error('Failed to send Facebook event:', await response.text());
      return false;
    }

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
 */
export async function sendFormSubmissionEvent(
  formType: string,
  userData: UserData,
  formData: Record<string, any> = {}
): Promise<void> {
  await sendFacebookEvent({
    event_name: 'FormSubmission',
    user_data: userData,
    custom_data: {
      form_type: formType,
      ...formData,
    },
  });
} 