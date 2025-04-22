// Type definitions for Google gtag.js
declare global {
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
}

export {}; 