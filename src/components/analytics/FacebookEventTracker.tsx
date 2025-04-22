'use client';

import { useEffect } from 'react';
import { sendFacebookEvent } from '@/lib/fbEvents';

interface FacebookEventTrackerProps {
  event: string;
  userData?: {
    email?: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
  };
  customData?: Record<string, any>;
  debug?: boolean;
}

/**
 * Component for tracking Facebook events using server-side Conversions API
 * Browser-side tracking has been disabled as it's not working reliably
 */
export default function FacebookEventTracker({
  event,
  userData,
  customData,
  debug = false
}: FacebookEventTrackerProps) {
  useEffect(() => {
    // Skip if no event is provided
    if (!event) return;

    // Use server-side events only since they're reliably working
    try {
      if (debug) {
        console.log('FacebookEventTracker - Server-side tracking only:', {
          event,
          userData,
          customData
        });
      }
      
      // Track with Conversions API (server-side)
      sendFacebookEvent({
        event_name: event,
        user_data: userData || {},
        custom_data: customData
      }).then((success) => {
        if (debug) {
          console.log('FacebookEventTracker - Server event result:', success ? 'success' : 'failed');
        }
      }).catch((error) => {
        console.error('FacebookEventTracker - Server event error:', error);
      });
    } catch (error) {
      console.error('FacebookEventTracker - Failed to track event:', error);
    }
  }, [event, userData, customData, debug]);

  // This component doesn't render anything
  return null;
} 