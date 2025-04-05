'use client';

import { useEffect } from 'react';

// Remove hardcoded fallback value
const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;

interface GoogleAdsTrackerProps {
  conversionLabel?: string;
  conversionValue?: number;
}

const GoogleAdsTracker = ({ 
  conversionLabel, 
  conversionValue 
}: GoogleAdsTrackerProps) => {
  useEffect(() => {
    // Only track if Google Ads ID is available
    if (typeof window !== 'undefined' && window.gtag && GOOGLE_ADS_ID) {
      // Track Google Ads conversion
      if (conversionLabel) {
        window.gtag('event', 'conversion', {
          'send_to': `${GOOGLE_ADS_ID}/${conversionLabel}`,
          ...(conversionValue !== undefined && { 'value': conversionValue }),
          'currency': 'USD'
        });
      } else {
        // Just send the page view to Google Ads
        window.gtag('config', GOOGLE_ADS_ID, {
          'send_page_view': false
        });
      }
    } else if (!GOOGLE_ADS_ID) {
      console.warn('Google Ads tracking is disabled: NEXT_PUBLIC_GOOGLE_ADS_ID is not set');
    }
  }, [conversionLabel, conversionValue]);

  // This component doesn't render anything
  return null;
};

export default GoogleAdsTracker; 