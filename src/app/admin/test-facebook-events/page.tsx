'use client';

import React, { useState } from 'react';
import { sendFacebookEvent } from '@/lib/fbEvents';

export default function TestFacebookEvents() {
  const [result, setResult] = useState<string>('');
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [testEventCode, setTestEventCode] = useState('TEST26583'); // Use the test code you provided
  const [useClientLib, setUseClientLib] = useState(false);
  
  const handleTestEvent = async (formType: string) => {
    setLoading(true);
    setResult('');
    setResponse(null);
    
    try {
      // Create test user data
      const userData = {
        email: 'test@example.com',
        phone: '5555555555',
        firstName: 'Test',
        lastName: 'User'
      };
      
      // Create test form data based on form type
      const formData: Record<string, any> = {
        location: window.location.pathname,
        timestamp: new Date().toISOString(),
      };
      
      if (formType === 'get_started') {
        formData.projectTypes = ['kitchen', 'bathroom'];
        formData.projectSize = '500';
        formData.projectStage = 'planning';
        formData.propertyAddress = '123 Test St';
        formData.propertyCity = 'Test City';
        formData.propertyState = 'CA';
        formData.projectDescription = 'Test project description';
      } else {
        formData.message = `Test message for ${formType} form`;
        formData.city = 'Test City';
      }
      
      if (useClientLib) {
        // Use the client-side library function
        const success = await sendFacebookEvent({
          event_name: 'Lead',
          user_data: userData,
          custom_data: {
            form_type: formType,
            ...formData,
          },
          test_event_code: testEventCode,
        });
        
        if (success) {
          setResult(`Successfully sent test event using client library for ${formType} form with test code ${testEventCode}`);
        } else {
          setResult(`Error sending test event using client library`);
        }
      } else {
        // Direct API call for better debugging
        const response = await fetch('/api/fb-events', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            event_name: 'Lead',
            event_time: Math.floor(Date.now() / 1000),
            user_data: userData,
            custom_data: {
              form_type: formType,
              ...formData,
            },
            test_event_code: testEventCode,
          }),
        });
        
        const responseData = await response.json();
        setResponse(responseData);
        
        if (response.ok) {
          setResult(`Successfully sent test event via direct API call for ${formType} form with test code ${testEventCode}`);
        } else {
          setResult(`Error sending test event: ${responseData.error || 'Unknown error'}`);
        }
      }
    } catch (error) {
      setResult(`Error sending test event: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Test Facebook Conversions API Events</h1>
      
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">
          Facebook Test Event Code
          <input
            type="text"
            value={testEventCode}
            onChange={(e) => setTestEventCode(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </label>
        <p className="text-sm text-gray-500 mt-1">
          This code should match the one shown in Facebook Events Manager Test Events tab.
        </p>
      </div>
      
      <div className="mb-4">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={useClientLib}
            onChange={(e) => setUseClientLib(e.target.checked)}
            className="mr-2"
          />
          <span className="text-sm">Use client-side library (like real forms do)</span>
        </label>
        <p className="text-xs text-gray-500 ml-5">
          When checked, uses the sendFacebookEvent() function that real forms use.
          When unchecked, makes a direct API call for debugging.
        </p>
      </div>
      
      <div className="flex flex-wrap gap-4 mb-8">
        <button
          onClick={() => handleTestEvent('contact')}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          Test Contact Form Event
        </button>
        
        <button
          onClick={() => handleTestEvent('footer_contact')}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          Test Footer Form Event
        </button>
        
        <button
          onClick={() => handleTestEvent('get_started')}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          Test Get Started Form Event
        </button>
      </div>
      
      {loading && (
        <div className="text-center py-4">
          <div className="inline-block animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-600"></div>
          <p className="mt-2">Sending test event...</p>
        </div>
      )}
      
      {result && (
        <div className={`p-4 rounded mb-4 ${result.includes('Error') ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
          {result}
        </div>
      )}
      
      {!useClientLib && response && (
        <div className="mb-6">
          <h3 className="font-semibold mb-2">API Response:</h3>
          <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-64 text-xs">
            {JSON.stringify(response, null, 2)}
          </pre>
        </div>
      )}
      
      <div className="mt-8 p-4 bg-gray-100 rounded">
        <h2 className="text-lg font-semibold mb-3">How to verify events in Facebook</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>Go to Facebook Business Manager</li>
          <li>Navigate to Events Manager</li>
          <li>Select your pixel</li>
          <li>Click on "Test Events" tab</li>
          <li>Make sure the test_event_code matches the one in Facebook's interface</li>
          <li>Click one of the test buttons above</li>
          <li>The event should appear in the Facebook Test Events list within a few seconds</li>
        </ol>
      </div>
      
      <div className="mt-4 p-4 bg-blue-50 rounded border border-blue-200">
        <h2 className="text-lg font-semibold mb-2">Debugging Tips</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Ensure your FB_ACCESS_TOKEN and FB_PIXEL_ID environment variables are set correctly</li>
          <li>Check that the test_event_code is current (they expire after a while)</li>
          <li>Verify that all required parameters (event_name, event_time, client_ip_address, client_user_agent) are included</li>
          <li>Make sure user data is properly hashed according to Facebook's requirements</li>
          <li>Try toggling between direct API calls and the client library to isolate issues</li>
        </ul>
      </div>
    </div>
  );
} 