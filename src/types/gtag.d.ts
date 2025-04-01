// Type definitions for Google gtag.js
interface Window {
  gtag?: (
    command: string,
    action: string,
    config: {
      [key: string]: any;
    }
  ) => void;
  dataLayer?: any[];
} 