"use client"

import React, { useState } from 'react'
import { isValidPhoneNumber } from 'libphonenumber-js'

interface GuideDownloadFormProps {
  guideTitle: string;
  guideType: string;
  downloadUrl: string;
  buttonText?: string;
  successHeading?: string;
  successMessage?: string;
}

export default function GuideDownloadForm({
  guideTitle,
  guideType,
  downloadUrl,
  buttonText = "Download Guide",
  successHeading = "Thank you!",
  successMessage = "Your guide is ready to download"
}: GuideDownloadFormProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [city, setCity] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [actualDownloadUrl, setActualDownloadUrl] = useState(downloadUrl)

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    // Strip all non-digit characters
    const digitsOnly = value.replace(/\D/g, '');
    
    // Format the phone number as user types
    let formattedPhone = '';
    if (digitsOnly.length === 0) {
      formattedPhone = '';
    } else if (digitsOnly.length <= 3) {
      formattedPhone = `(${digitsOnly}`;
    } else if (digitsOnly.length <= 6) {
      formattedPhone = `(${digitsOnly.slice(0, 3)}) ${digitsOnly.slice(3)}`;
    } else {
      formattedPhone = `(${digitsOnly.slice(0, 3)}) ${digitsOnly.slice(3, 6)}-${digitsOnly.slice(6, 10)}`;
    }
    setPhone(formattedPhone);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    
    try {
      // Validate phone number using libphonenumber-js
      const phoneInput = phone.replace(/\D/g, '');
      const formattedPhone = `+1${phoneInput}`; // Assuming US phone numbers
      
      if (!isValidPhoneNumber(formattedPhone, 'US')) {
        throw new Error('Please enter a valid phone number');
      }
      
      // Add guide title as projectDescription
      const formData = {
        name,
        email,
        phone,
        city: city,          // Standard city field
        location: city,      // Location field for GHL
        propertyCity: city,  // Additional field used in some places
        guideTitle,
        guideType,
        downloadUrl,
        projectDescription: `Guide Download Request: ${guideTitle || 'Ultimate 2023 Home Renovation Guide'}`
      };
      
      // Submit to our dedicated guide download API endpoint
      const response = await fetch('/api/guides/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      
      if (!response.ok) {
        console.error('Form validation error:', data);
        if (data.details) {
          throw new Error(`Validation failed: ${JSON.stringify(data.details)}`);
        } else {
          throw new Error(data.error || 'Failed to submit form')
        }
      }
      
      // Set the download URL from the response if available
      if (data.downloadUrl) {
        setActualDownloadUrl(data.downloadUrl)
      }
      
      // After successful submission
      setIsSubmitted(true)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      setError(errorMessage)
      console.error('Error submitting guide form:', err)
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="bg-green-50 p-5 rounded-lg border border-green-200">
        <div className="text-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-lg font-medium text-green-800 mt-2">{successHeading}</h3>
          <p className="text-green-600">{successMessage}</p>
        </div>
        <a 
          href={actualDownloadUrl} 
          download
          className="btn btn-primary w-full inline-flex justify-center items-center transition-all duration-300 hover:-translate-y-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download Guide Now
        </a>
      </div>
    )
  }

  return (
    <div className="bg-white p-8 rounded-xl shadow-xl">
      <h3 className="text-lg font-medium mb-4 text-secondary leading-normal">Download Your Free Guide</h3>
      <p className="text-gray-700 mb-6 leading-relaxed">Enter your details below to get instant access.</p>
      
      {error && <p className="text-red-500 mb-2">{error}</p>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="sr-only">Name</label>
          <input 
            type="text" 
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name" 
            required
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
          />
        </div>
        <div>
          <label htmlFor="email" className="sr-only">Email</label>
          <input 
            type="email" 
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address" 
            required
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
          />
        </div>
        <div>
          <label htmlFor="city" className="sr-only">City</label>
          <input 
            type="text" // Changed from city to text for broader input, but validation is key server-side
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City" 
            required
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
          />
        </div>
        <div>
          <label htmlFor="phone" className="sr-only">Phone Number</label>
          <input 
            type="tel" 
            id="phone"
            value={phone}
            onChange={handlePhoneChange}
            placeholder="Phone Number" 
            required
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
          />
        </div>
        <button 
          type="submit"
          disabled={isLoading}
          className="btn btn-primary w-full flex justify-center items-center transition-all duration-300 hover:-translate-y-1 py-2.5 text-base"
        >
          {isLoading ? (
            'Processing...'
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              {buttonText}
            </>
          )}
        </button>
        <p className="text-xs text-gray-500 text-center">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </form>
    </div>
  )
} 