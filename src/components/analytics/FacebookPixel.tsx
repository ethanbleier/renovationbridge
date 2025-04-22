'use client';

import { useEffect, useRef } from 'react';
import Script from 'next/script';

// Use environment variable for the Pixel ID
const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;

// Force logs to always show up in console
function forceConsoleLog(...args: any[]) {
  // Store the original console.log
  const originalConsoleLog = console.log;
  
  // Use setTimeout to break any potential interception chain
  setTimeout(() => {
    try {
      // Try direct output using the original console object
      originalConsoleLog.apply(console, ['🔴 FB PIXEL DIRECT LOG:', ...args]);
      
      // Also try console.error which is less likely to be filtered
      console.error('🔴 FB PIXEL ERROR LOG (for visibility):', ...args);
      
      // Try window.alert for last resort debugging
      if (process.env.NODE_ENV !== 'production') {
        // Create a debug element on the page instead of alert
        const debugDiv = document.getElementById('fb-debug-console');
        if (debugDiv) {
          const logItem = document.createElement('div');
          logItem.innerHTML = `<pre>${new Date().toISOString()}: ${JSON.stringify(args, null, 2)}</pre>`;
          debugDiv.appendChild(logItem);
        }
      }
    } catch (e) {
      // Last resort - try an inline script for console logging
      const script = document.createElement('script');
      script.textContent = `console.log("🔴 INLINE FB LOG: ${Array.from(args).join(', ')}");`;
      document.body.appendChild(script);
      document.body.removeChild(script);
    }
  }, 0);
}

// Create a global debug function that will be used regardless of any wrapping
function debugFbq(...args: any[]) {
  const eventType = args[0] || '';
  const eventName = args[1] || '';
  const eventData = args[2] || {};
  
  // Use our forced console log
  forceConsoleLog(`Call: ${eventType} | ${eventName}`, eventData);
  
  // Log to both console and as visible on the page
  try {
    if (typeof window !== 'undefined') {
      const debugDiv = document.getElementById('fb-debug-output');
      if (debugDiv) {
        const logItem = document.createElement('div');
        logItem.className = 'p-2 mb-1 bg-gray-100 text-xs';
        logItem.innerHTML = `
          <strong>${new Date().toISOString()}</strong>: 
          ${eventType} | ${eventName} | 
          ${JSON.stringify(eventData)}
        `;
        debugDiv.appendChild(logItem);
      }
    }
  } catch (e) {
    // Ignore DOM errors
  }
}

export default function FacebookPixel() {
  // Track initialization to avoid duplicates
  const initialized = useRef(false);
  
  useEffect(() => {
    // Create the debug console div
    if (typeof window !== 'undefined' && !document.getElementById('fb-debug-console')) {
      const debugConsole = document.createElement('div');
      debugConsole.id = 'fb-debug-console';
      debugConsole.style.display = 'none'; // Hidden by default
      document.body.appendChild(debugConsole);
    }
    
    // Test console output
    forceConsoleLog('Facebook Pixel component mounted');
    
    // Initialize Facebook Pixel when the component mounts
    if (typeof window !== 'undefined' && FB_PIXEL_ID && !initialized.current) {
      forceConsoleLog('FB Pixel init - Starting initialization in useEffect');
      
      // Wrap in try/catch to capture any errors
      try {
        // Store original fbq if it exists
        const originalFbq = window.fbq;
        
        // Define fbq if it doesn't exist
        if (!window.fbq) {
          forceConsoleLog('FB Pixel init - Creating fbq function');
          window.fbq = function() {
            // Debug log every call
            const args = Array.from(arguments);
            debugFbq(...args);
            
            // Standard fbq implementation
            // @ts-ignore
            window.fbq.callMethod ? 
              window.fbq.callMethod.apply(window.fbq, arguments) : 
              window.fbq.queue.push(arguments);
          };
        } else {
          forceConsoleLog('FB Pixel init - fbq function already exists, wrapping it');
          
          // Wrap the existing function
          window.fbq = function() {
            // Debug log
            const args = Array.from(arguments);
            debugFbq(...args);
            
            // Call original
            if (originalFbq) {
              return originalFbq.apply(this, arguments);
            }
          };
        }
        
        // Initialize the fbq function
        if (!window._fbq) window._fbq = window.fbq;
        window.fbq.push = window.fbq;
        window.fbq.loaded = true;
        window.fbq.version = '2.0';
        window.fbq.queue = window.fbq.queue || [];
        
        // Create a global function to explicitly track events for testing
        window.trackFBEvent = function(eventName: string, params: any) {
          forceConsoleLog('Manual FB tracking called:', eventName, params);
          debugFbq('track', eventName, params);
          
          try {
            if (window.fbq) {
              window.fbq('track', eventName, params);
              forceConsoleLog('Manual tracking succeeded');
              return true;
            }
          } catch (e) {
            console.error('Manual tracking failed:', e);
          }
          return false;
        };
        
        forceConsoleLog('FB Pixel init - About to call init with ID:', FB_PIXEL_ID);
        window.fbq('init', FB_PIXEL_ID);
        window.fbq('track', 'PageView');
        
        forceConsoleLog('FB Pixel initialized with ID:', FB_PIXEL_ID);
        initialized.current = true;
      } catch (error) {
        console.error('FB Pixel initialization error:', error);
      }
    } else if (!FB_PIXEL_ID) {
      console.warn('Facebook Pixel ID not found in environment variables');
    }
  }, []);

  const handleScriptOnLoad = () => {
    forceConsoleLog('FB Pixel script loaded via Next.js Script component');
    
    // Wait a bit for the script to fully initialize
    setTimeout(() => {
      if (typeof window !== 'undefined' && window.fbq) {
        forceConsoleLog('Script loaded - fbq is available');
        
        // Test track after script load
        try {
          window.fbq('track', 'ScriptLoaded');
          forceConsoleLog('Test track after script load succeeded');
        } catch (e) {
          console.error('Test track after script load failed:', e);
        }
      } else {
        console.error('Script loaded but fbq is not available');
      }
    }, 500);
  };

  const handleScriptOnError = (error: Error) => {
    console.error('FB Pixel script failed to load:', error);
  };

  if (!FB_PIXEL_ID) return null;

  return (
    <>
      {/* Facebook Pixel Base Code - using only the Script approach for cleaner loading */}
      <Script
        id="facebook-pixel-script"
        strategy="afterInteractive"
        onLoad={handleScriptOnLoad}
        onError={handleScriptOnError}
        dangerouslySetInnerHTML={{
          __html: `
            // Force console log function
            window.forceConsoleLog = ${forceConsoleLog.toString()};
            
            // Debug helper function that will be available in the global scope
            window.debugFbq = ${debugFbq.toString()};
            
            // Test console output
            window.forceConsoleLog("FB Pixel script inline - Starting");
            
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){
              // Add debugging
              window.debugFbq.apply(null, arguments);
              
              n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            
            window.forceConsoleLog("FB Pixel script inline - About to initialize with ID: ${FB_PIXEL_ID}");
            fbq('init', '${FB_PIXEL_ID}');
            fbq('track', 'PageView');
            window.forceConsoleLog("FB Pixel script inline - PageView event sent");
          `,
        }}
      />
      
      {/* Visual debug output div */}
      <div id="fb-debug-output" className="fixed bottom-0 right-0 w-80 max-h-60 overflow-y-auto bg-white border border-gray-300 shadow-lg p-2 z-50 text-xs" style={{display: 'none'}}>
        <div className="flex justify-between items-center mb-2">
          <strong>FB Pixel Debug</strong>
          <button 
            onClick={() => {
              const div = document.getElementById('fb-debug-output');
              if (div) div.style.display = 'none';
              
              // Toggle console output visibility
              const consoleDiv = document.getElementById('fb-debug-console');
              if (consoleDiv) {
                consoleDiv.style.display = consoleDiv.style.display === 'none' ? 'block' : 'none';
              }
            }}
            className="text-xs px-2 py-1 bg-red-500 text-white rounded"
          >
            Toggle
          </button>
        </div>
      </div>
      
      {/* Fallback for browsers with JavaScript disabled */}
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
} 