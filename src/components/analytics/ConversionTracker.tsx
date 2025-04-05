'use client';

import { useEffect } from 'react';

// Remove hardcoded fallback value
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

interface ConversionTrackerProps {
  conversionType?: string;
  value?: number;
}

const ConversionTracker = ({ 
  conversionType = 'lead', 
  value = 1.0 
}: ConversionTrackerProps) => {
  useEffect(() => {
    // Only track if Google Analytics ID is available
    if (typeof window !== 'undefined' && window.gtag && GA_MEASUREMENT_ID) {
      // Track conversion
      window.gtag('event', 'conversion', {
        'send_to': GA_MEASUREMENT_ID,
        'value': value,
        'currency': 'USD',
        'event_category': 'conversion',
        'event_label': conversionType
      });
      
      // Also track as a regular event for more detailed Analytics
      window.gtag('event', `${conversionType}_conversion`, {
        'value': value,
        'currency': 'USD'
      });
    } else if (!GA_MEASUREMENT_ID) {
      console.warn('Google Analytics tracking is disabled: NEXT_PUBLIC_GA_MEASUREMENT_ID is not set');
    }
  }, [conversionType, value]);

  // This component doesn't render anything
  return null;
};

export default ConversionTracker; 