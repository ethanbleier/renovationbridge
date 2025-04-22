'use client';

import { useState, useEffect } from 'react';
import { sendFacebookEvent } from '@/lib/fbEvents';
import FacebookEventTracker from '@/components/analytics/FacebookEventTracker';

// Extend Window interface to include our custom functions
declare global {
  interface Window {
    trackFBEvent?: (eventName: string, params: any) => boolean;
    debugFbq?: (...args: any[]) => void;
    forceConsoleLog?: (...args: any[]) => void;
  }
}

export default function TestFacebookTrackingPage() {
  const [testResults, setTestResults] = useState<string[]>([]);
  const [showTracker, setShowTracker] = useState(false);
  const [fbqAvailable, setFbqAvailable] = useState(false);
  const [showConsole, setShowConsole] = useState(false);
  const [userData, setUserData] = useState({
    email: 'test@example.com',
    phone: '555-123-4567',
    firstName: 'Test',
    lastName: 'User'
  });

  useEffect(() => {
    // Show debug panel
    const debugDiv = document.getElementById('fb-debug-output');
    if (debugDiv) {
      debugDiv.style.display = 'block';
    }
    
    // Force a direct console log
    if (window.forceConsoleLog) {
      window.forceConsoleLog('Test page mounted - Direct log test');
    } else {
      console.error('🚨 forceConsoleLog not available - console may be intercepted');
    }
    
    // Check if fbq is available
    const checkFbq = () => {
      const available = typeof window !== 'undefined' && !!window.fbq;
      setFbqAvailable(available);
      addResult(`fbq ${available ? 'is' : 'is NOT'} available on page load`);
      
      if (available) {
        // Check if it's callable
        try {
          console.error('Testing fbq function type:', typeof window.fbq);
          addResult(`fbq function type: ${typeof window.fbq}`);
        } catch (error) {
          addResult(`Error checking fbq: ${error instanceof Error ? error.message : String(error)}`);
        }
      }
      
      // Check for our custom global tracking function
      if (window.trackFBEvent) {
        addResult('Custom tracking function is available');
      } else {
        addResult('Custom tracking function is NOT available');
      }
    };
    
    // Check immediately
    checkFbq();
    
    // Also check again after a delay to ensure scripts have loaded
    const timer = setTimeout(checkFbq, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const addResult = (message: string) => {
    // Log to console using error for visibility
    console.error(`Test result: ${message}`);
    
    // Also use forced logging if available
    if (window.forceConsoleLog) {
      window.forceConsoleLog(`Test result: ${message}`);
    }
    
    setTestResults(prev => [...prev, `${new Date().toISOString()}: ${message}`]);
  };

  const testServerEvent = async () => {
    addResult('Testing server-side event...');
    try {
      const result = await sendFacebookEvent({
        event_name: 'TestEvent',
        user_data: userData,
        custom_data: { source: 'test-page', test_type: 'server' }
      });
      
      addResult(`Server event result: ${result ? 'Success' : 'Failed'}`);
    } catch (error) {
      addResult(`Server event error: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  const testBrowserEvent = () => {
    addResult('Testing browser-side event...');
    
    // Check again if fbq is available
    if (typeof window === 'undefined') {
      addResult('Browser event failed: window is undefined (server rendering)');
      return;
    }
    
    // Try the custom tracking function first if available
    if (window.trackFBEvent) {
      addResult('Using custom tracking function');
      const result = window.trackFBEvent('TestEvent', { 
        source: 'test-page', 
        test_type: 'browser-custom'
      });
      addResult(`Custom tracking result: ${result ? 'Success' : 'Failed'}`);
      return;
    }
    
    if (!window.fbq) {
      addResult('Browser event failed: fbq is not available');
      return;
    }
    
    try {
      console.error('About to call fbq - before call');
      addResult(`fbq type: ${typeof window.fbq}`);
      
      // Directly try to log fbq to see its content
      try {
        console.error('fbq function:', window.fbq.toString().substring(0, 100) + '...');
        addResult('fbq function logged to console');
      } catch (e) {
        addResult(`Error logging fbq: ${e instanceof Error ? e.message : String(e)}`);
      }
      
      // Track event in a try-catch
      try {
        window.fbq('track', 'TestEvent', { source: 'test-page', test_type: 'browser' });
        console.error('fbq track called successfully');
        addResult('Browser event triggered via fbq');
      } catch (e) {
        addResult(`Error calling fbq track: ${e instanceof Error ? e.message : String(e)}`);
      }
      
    } catch (error) {
      addResult(`Browser event error: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  const testComponentEvent = () => {
    addResult('Testing component event...');
    setShowTracker(true);
    setTimeout(() => setShowTracker(false), 3000);
  };

  const forceTrackEvent = () => {
    try {
      addResult('Force tracking event with direct console.log...');
      console.error('DIRECT CONSOLE LOG TEST');
      
      // Use the most direct approach possible
      if (typeof window !== 'undefined') {
        // Create a temporary script element
        const script = document.createElement('script');
        script.textContent = `
          console.error('Executing inline script for FB tracking test');
          try {
            if (typeof fbq === 'function') {
              console.error('fbq exists, attempting call');
              fbq('track', 'ForceTrackedEvent', {test: 'forced'});
              console.error('fbq call complete');
            } else {
              console.error('fbq not found in inline script');
            }
          } catch(e) {
            console.error('Error in inline script:', e);
          }
        `;
        document.body.appendChild(script);
        document.body.removeChild(script);
        addResult('Inline script executed');
      }
    } catch (error) {
      addResult(`Force track error: ${error instanceof Error ? error.message : String(error)}`);
    }
  };
  
  const toggleConsoleDisplay = () => {
    const consoleDiv = document.getElementById('fb-debug-console');
    if (consoleDiv) {
      const newState = consoleDiv.style.display === 'none';
      consoleDiv.style.display = newState ? 'block' : 'none';
      setShowConsole(newState);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Facebook Tracking Test Page</h1>
      
      <div className="bg-blue-100 p-4 rounded mb-6">
        <h2 className="text-xl font-semibold mb-2">Status</h2>
        <p className="mb-2">
          Facebook Pixel Status: {fbqAvailable ? 
            <span className="text-green-600 font-bold">Available</span> : 
            <span className="text-red-600 font-bold">Not Available</span>}
        </p>
        <p className="text-sm text-gray-600 mb-2">
          Note: Browser events require the Facebook Pixel to be properly loaded.
        </p>
        <button 
          onClick={toggleConsoleDisplay}
          className="px-4 py-2 bg-blue-500 text-white text-sm rounded"
        >
          {showConsole ? 'Hide' : 'Show'} Console Output on Page
        </button>
      </div>
      
      <div className="space-y-4 mb-8">
        <h2 className="text-xl font-semibold">Test User Data:</h2>
        <pre className="bg-gray-100 p-4 rounded">
          {JSON.stringify(userData, null, 2)}
        </pre>
        
        <div className="flex flex-wrap gap-4">
          <button 
            onClick={testServerEvent}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Test Server Event
          </button>
          
          <button 
            onClick={testBrowserEvent}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Test Browser Event
          </button>
          
          <button 
            onClick={testComponentEvent}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Test Component Event
          </button>
          
          <button 
            onClick={forceTrackEvent}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Force Track Event
          </button>
        </div>
      </div>
      
      {/* On-page console output */}
      <div id="fb-debug-console" className="mb-8 bg-black text-green-400 p-4 rounded font-mono text-xs h-60 overflow-y-auto" style={{display: showConsole ? 'block' : 'none'}}>
        <h2 className="text-white font-semibold mb-2">Console Output:</h2>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Test Results:</h2>
        <div className="bg-gray-100 p-4 rounded h-64 overflow-y-auto">
          {testResults.length > 0 ? (
            <ul className="space-y-2">
              {testResults.map((result, index) => (
                <li key={index} className="border-b border-gray-200 pb-1">
                  {result}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No tests run yet</p>
          )}
        </div>
      </div>
      
      {/* Hidden component that will trigger an event when shown */}
      {showTracker && (
        <FacebookEventTracker 
          event="TestEvent" 
          userData={userData}
          customData={{ source: 'test-page', test_type: 'component' }}
          debug={true}
        />
      )}
    </div>
  );
} 