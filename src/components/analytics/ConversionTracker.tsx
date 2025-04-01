'use client';

import { useEffect } from 'react';

interface ConversionTrackerProps {
  conversionType?: string;
  value?: number;
}

const ConversionTracker = ({ 
  conversionType = 'lead', 
  value = 1.0 
}: ConversionTrackerProps) => {
  useEffect(() => {
    // Check if gtag is available
    if (typeof window !== 'undefined' && window.gtag) {
      // Track conversion
      window.gtag('event', 'conversion', {
        'send_to': 'kr6ogvmJhcYJD-VHigfXAg',
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
    }
  }, [conversionType, value]);

  // This component doesn't render anything
  return null;
};

export default ConversionTracker; 