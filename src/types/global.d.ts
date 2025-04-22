interface Window {
  fbq: any;
  _fbq: any;
  gtag: any;
  dataLayer: any[];
  trackFBEvent: (eventName: string, params: any) => boolean;
  debugFbq: (...args: any[]) => void;
}

declare global {
  interface Window {
    fbq: any;
    _fbq: any;
    gtag: any;
    dataLayer: any[];
    trackFBEvent: (eventName: string, params: any) => boolean;
    debugFbq: (...args: any[]) => void;
  }
}

export {}; 