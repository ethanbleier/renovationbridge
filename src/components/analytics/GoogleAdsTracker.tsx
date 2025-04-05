'use client';

import { useEffect } from 'react';

// Use the correct Google Ads ID
const GOOGLE_ADS_ID = 'AW-16912546121';

interface GoogleAdsTrackerProps {
  conversionLabel?: string;
  conversionValue?: number;
}

const GoogleAdsTracker = ({ 
  conversionLabel, 
  conversionValue 
}: GoogleAdsTrackerProps) => {
  useEffect(() => {
    // Only track if window and gtag are available
    if (typeof window !== 'undefined' && window.gtag) {
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
    } else if (!window.gtag) {
      console.warn('Google Ads tracking is disabled: gtag is not available');
    }
  }, [conversionLabel, conversionValue]);

  // This component doesn't render anything
  return null;
};

export default GoogleAdsTracker; 