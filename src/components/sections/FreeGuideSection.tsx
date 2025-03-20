"use client"

import GuideImageCarousel from '@/components/ui/GuideImageCarousel'
import { useState } from 'react'

export default function FreeGuideSection() {
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    
    try {
      // Here you would typically send the email and phone to your backend
      // This is a simplified version that just simulates a delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // After successful submission
      setIsSubmitted(true)
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image with Animation */}
          <div className="relative">
            <div className="relative w-full max-w-md mx-auto">
              {/* Book Preview with Rotating Images */}
              <div className="relative hover:animate-none">
                <div className="transition-all duration-300 hover:translate-y-[-5px]">
                  <GuideImageCarousel 
                    images={[
                      "/images/guide/ajar.png",
                      "/images/guide/double.png",
                      "/images/guide/open.png",
                    ]} 
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="space-y-6 md:max-w-lg">
            <div className="inline-flex items-center px-4 py-2 bg-lavender text-primary rounded-full text-sm font-semibold mb-2">
              Free Resource
            </div>
            <h2 className="text-3xl font-bold text-secondary">Complete Renovation Planning Guide</h2>
            <p className="text-gray text-lg">
              Download our comprehensive guide to planning your renovation project. This step-by-step resource will help you organize your ideas, set a realistic budget, and navigate the entire renovation process with confidence.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mt-1 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Step-by-step planning worksheets</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mt-1 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Budget planning templates</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mt-1 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Contractor interview questions</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mt-1 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Timeline & project management tools</span>
              </li>
            </ul>
            <div className="pt-2">
              {!isSubmitted ? (
                <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-medium mb-2">Get instant access</h3>
                  <p className="text-gray-600 mb-4">Enter your email and phone to download the free guide</p>
                  
                  {error && <p className="text-red-500 mb-2">{error}</p>}
                  
                  <form onSubmit={handleSubmit} className="space-y-3">
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
                      {isLoading ? 'Processing...' : 'Get Free Guide'}
                    </button>
                    <p className="text-xs text-gray-500 text-center">
                      We respect your privacy. Unsubscribe at any time.
                    </p>
                  </form>
                </div>
              ) : (
                <div className="bg-green-50 p-5 rounded-lg border border-green-200">
                  <div className="text-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="text-lg font-medium text-green-800 mt-2">Thank you!</h3>
                    <p className="text-green-600">Your guide is ready to download</p>
                  </div>
                  <a 
                    href="/pdfs/guide.pdf" 
                    download
                    className="btn btn-primary w-full inline-flex justify-center items-center transition-all duration-300 hover:-translate-y-1"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download Guide Now
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 