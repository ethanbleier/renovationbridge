"use client"

import React, { useState } from 'react'

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
  buttonText = "Get Free Guide",
  successHeading = "Thank you!",
  successMessage = "Your guide is ready to download"
}: GuideDownloadFormProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [actualDownloadUrl, setActualDownloadUrl] = useState(downloadUrl)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    
    try {
      // Add guide title as projectDescription
      const formData = {
        name,
        email,
        phone,
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
    <div className="bg-amber-50 p-5 rounded-lg">
      <h3 className="text-lg font-medium mb-2">Get instant access</h3>
      <p className="text-gray-600 mb-4">Enter your details to download the free guide</p>
      
      {error && <p className="text-red-500 mb-2">{error}</p>}
      
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your full name" 
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address" 
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <input 
            type="tel" 
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Your phone number" 
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <button 
          type="submit"
          disabled={isLoading}
          className="btn btn-primary w-full flex justify-center items-center transition-all duration-300"
        >
          {isLoading ? 'Processing...' : buttonText}
        </button>
        <p className="text-xs text-gray-500 text-center">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </form>
    </div>
  )
} 