/**
 * Facebook tracking utilities for improving conversion matching quality
 */

// Cookie names used by Facebook
const FBC_COOKIE_NAME = '_fbc';
const FBP_COOKIE_NAME = '_fbp';

/**
 * Get the Facebook Click ID (fbc) from URL or cookies
 * This is added when users click on Facebook ads
 */
export function getFacebookClickId(): string | null {
  if (typeof window === 'undefined') return null;
  
  // First check for fbc parameter in URL
  const params = new URLSearchParams(window.location.search);
  const fbclid = params.get('fbclid');
  
  if (fbclid) {
    // Format according to Facebook's requirements (fbc format: fb.1.{timestamp}.{fbclid})
    const fbc = `fb.1.${Date.now()}.${fbclid}`;
    
    // Set as cookie for future use (7 day expiry)
    setCookie(FBC_COOKIE_NAME, fbc, 7);
    
    return fbc;
  }
  
  // If not in URL, try to get from cookie
  return getCookie(FBC_COOKIE_NAME);
}

/**
 * Get the Facebook Browser ID (fbp) from cookies
 * This is set by the Facebook pixel
 */
export function getFacebookBrowserId(): string | null {
  if (typeof window === 'undefined') return null;
  
  // Try to get from cookie
  const fbp = getCookie(FBP_COOKIE_NAME);
  
  // If not found and we're in a browser, we could generate one, but
  // typically the Facebook pixel script sets this
  
  return fbp;
}

/**
 * Get both Facebook tracking parameters
 */
export function getFacebookTrackingParams(): { fbc: string | null; fbp: string | null } {
  return {
    fbc: getFacebookClickId(),
    fbp: getFacebookBrowserId()
  };
}

// Helper functions for cookie management
function setCookie(name: string, value: string, daysToExpire: number) {
  if (typeof window === 'undefined') return;
  
  const date = new Date();
  date.setTime(date.getTime() + daysToExpire * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/;SameSite=Lax`;
}

function getCookie(name: string): string | null {
  if (typeof window === 'undefined') return null;
  
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name + '=')) {
      return cookie.substring(name.length + 1);
    }
  }
  return null;
} 