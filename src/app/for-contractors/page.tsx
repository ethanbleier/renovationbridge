'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Image from 'next/image'

type FormValues = {
  firstName: string
  lastName: string
  phone: string
  licenseNumber: string
  website?: string
  location: string
  hearAboutUs?: string
}

export default function ForContractors() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  
  const { 
    register, 
    handleSubmit,
    reset,
    formState: { errors } 
  } = useForm<FormValues>()
  
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true)
    
    // Here you would normally send data to your API
    console.log(data)
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSubmitting(false)
    setIsSuccess(true)
    reset()
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSuccess(false), 5000)
  }
  
  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      {/* Premium hero section with background pattern */}
      <section className="relative mb-12 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-primary/10 pattern-grid-lg opacity-30"></div>
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-lavender/30"></div>
        
        {/* Content */}
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-6">Join Our Contractor Network</h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Partner with Renovation Bridge to grow your business and connect with qualified homeowners seeking quality renovation services.
            </p>
            
            {/* Call to action button */}
            <a
              href="#apply-form"
              className="mt-8 inline-block bg-primary text-white font-medium py-3 px-8 rounded-lg transition-all hover:bg-primary-dark hover:shadow-lg"
            >
              Apply Today
            </a>
          </div>
        </div>
        
        {/* Decorative bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 48" fill="white" preserveAspectRatio="none">
            <path d="M0,0 C480,48 960,48 1440,0 L1440,48 L0,48 Z"></path>
          </svg>
        </div>
      </section>
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Form Section with improved styling */}
          <div className="lg:col-span-7">
            <div id="apply-form" className="bg-white rounded-2xl p-8 md:p-10 shadow-xl border border-gray-100 mb-8 transition-all hover:shadow-2xl">
              <h2 className="text-2xl font-bold mb-8 text-secondary border-b border-lavender pb-4">Apply to Join Our Network</h2>
              
              {isSuccess ? (
                <div className="bg-green-50 text-green-800 p-6 rounded-xl mb-6 border-l-4 border-green-500 flex items-start">
                  <div className="mr-4 text-green-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Thank you for your application!</h3>
                    <p>We'll review your information and get back to you shortly about the next steps.</p>
                  </div>
                </div>
              ) : null}
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input
                      id="firstName"
                      type="text"
                      className={`w-full px-4 py-3 rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary ${errors.firstName ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                      {...register('firstName', { required: true })}
                    />
                    {errors.firstName && (
                      <p className="mt-2 text-sm text-red-600 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        First name is required
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input
                      id="lastName"
                      type="text"
                      className={`w-full px-4 py-3 rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary ${errors.lastName ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                      {...register('lastName', { required: true })}
                    />
                    {errors.lastName && (
                      <p className="mt-2 text-sm text-red-600 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        Last name is required
                      </p>
                    )}
                  </div>
                </div>
                
                {/* Phone, License, Website fields (enhanced with similar styling) */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    id="phone"
                    type="tel"
                    className={`w-full px-4 py-3 rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary ${errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                    {...register('phone', { 
                      required: true,
                      pattern: {
                        value: /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
                        message: 'Invalid phone number'
                      }
                    })}
                  />
                  {errors.phone && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      {errors.phone.message || 'Phone number is required'}
                    </p>
                  )}
                </div>
                
                {/* Continue with similar styling for remaining form fields */}
                <div>
                  <label htmlFor="licenseNumber" className="block text-sm font-medium text-gray-700 mb-2">License Number</label>
                  <input
                    id="licenseNumber"
                    type="text"
                    className={`w-full px-4 py-3 rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary ${errors.licenseNumber ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                    {...register('licenseNumber', { required: true })}
                  />
                  {errors.licenseNumber && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      License number is required
                    </p>
                  )}
                </div>
                
                {/* Website field - optional */}
                <div>
                  <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-2">
                    Website <span className="text-gray-500 font-normal">(Optional)</span>
                  </label>
                  <input
                    id="website"
                    type="url"
                    placeholder="https://yourcompany.com"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                    {...register('website', { 
                      pattern: {
                        value: /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*$/,
                        message: 'Invalid website URL'
                      }
                    })}
                  />
                  {errors.website && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      {errors.website.message}
                    </p>
                  )}
                </div>
                
                {/* Location field */}
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    id="location"
                    type="text"
                    placeholder="City, State"
                    className={`w-full px-4 py-3 rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary ${errors.location ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                    {...register('location', { required: true })}
                  />
                  {errors.location && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      Location is required
                    </p>
                  )}
                </div>
                
                {/* Hear about us */}
                <div>
                  <label htmlFor="hearAboutUs" className="block text-sm font-medium text-gray-700 mb-2">
                    How did you hear about us? <span className="text-gray-500 font-normal">(Optional)</span>
                  </label>
                  <select
                    id="hearAboutUs"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                    {...register('hearAboutUs')}
                  >
                    <option value="">Select an option</option>
                    <option value="google">Google</option>
                    <option value="social">Social Media</option>
                    <option value="friend">Friend/Colleague</option>
                    <option value="homeowner">Homeowner</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-3 px-6 rounded-lg transition-all transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-primary flex items-center justify-center"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    'Submit Application'
                  )}
                </button>
              </form>
            </div>
          </div>
          
          {/* Benefits Section with improved styling */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 mb-8 transition-all hover:shadow-2xl">
              <h3 className="text-xl font-bold text-secondary mb-6 border-b border-lavender pb-4">Why Join Renovation Bridge?</h3>
              
              <div className="space-y-6">
                {/* Benefits items with improved icons and spacing */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-lavender/50 flex items-center justify-center flex-shrink-0 border-2 border-lavender">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-secondary">High-Quality Leads</h4>
                    <p className="text-gray-600 mt-1">Connect with pre-qualified homeowners who are ready to start their renovation projects.</p>
                  </div>
                </div>
                
                {/* Continue with similar styling for other benefits */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-lavender/50 flex items-center justify-center flex-shrink-0 border-2 border-lavender">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-secondary">Build Your Reputation</h4>
                    <p className="text-gray-600 mt-1">Benefit from our trusted platform to enhance your credibility and grow your business.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-lavender/50 flex items-center justify-center flex-shrink-0 border-2 border-lavender">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-secondary">Flexible Payment Terms</h4>
                    <p className="text-gray-600 mt-1">Take advantage of our contractor-friendly payment structure, designed to support your cash flow.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-lavender/50 flex items-center justify-center flex-shrink-0 border-2 border-lavender">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 10a8 8 0 1116 0 8 8 0 01-16 0z" />
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-secondary">Save Time</h4>
                    <p className="text-gray-600 mt-1">Focus on what you do best while we handle marketing, lead generation, and initial client communications.</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Image with enhanced styling */}
            <div className="relative h-80 rounded-2xl overflow-hidden shadow-xl border-4 border-white transition-all transform hover:scale-[1.02]">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent z-10"></div>
              <Image
                src="/images/blog/contractor-working.png"
                alt="Contractor working on a renovation project"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
        
        {/* Testimonials with improved styling */}
        <section className="mt-20 mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 relative">
            What Contractors Say About Us
            <span className="block w-20 h-1 bg-primary mx-auto mt-4"></span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Enhanced testimonial cards */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 transition-all hover:shadow-2xl relative">
              <div className="absolute -top-5 left-8 w-10 h-10 bg-lavender rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
              </div>
              <div className="flex items-center mb-6 pt-4">
                <div className="w-14 h-14 rounded-full bg-lavender/50 flex items-center justify-center mr-4 border-2 border-lavender">
                  <span className="font-bold text-xl text-primary">J</span>
                </div>
                <div>
                  <h4 className="font-bold text-secondary">John Smith</h4>
                  <p className="text-sm text-gray-600">Smith Building & Contracting</p>
                </div>
              </div>
              <p className="italic text-gray-600 leading-relaxed">
                "Since joining Renovation Bridge, my business has grown by 30%. The leads are high-quality and the partnership has been valuable for our company growth."
              </p>
            </div>
            
            {/* Repeat similar styling for other testimonials */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 transition-all hover:shadow-2xl relative">
              <div className="absolute -top-5 left-8 w-10 h-10 bg-lavender rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
              </div>
              <div className="flex items-center mb-6 pt-4">
                <div className="w-14 h-14 rounded-full bg-lavender/50 flex items-center justify-center mr-4 border-2 border-lavender">
                  <span className="font-bold text-xl text-primary">M</span>
                </div>
                <div>
                  <h4 className="font-bold text-secondary">Maria Garcia</h4>
                  <p className="text-sm text-gray-600">Garcia Home Renovations</p>
                </div>
              </div>
              <p className="italic text-gray-600 leading-relaxed">
                "I appreciate how Renovation Bridge vets homeowners before connecting us. It saves me time and ensures I'm working with serious clients who are ready to move forward."
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 transition-all hover:shadow-2xl relative">
              <div className="absolute -top-5 left-8 w-10 h-10 bg-lavender rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
              </div>
              <div className="flex items-center mb-6 pt-4">
                <div className="w-14 h-14 rounded-full bg-lavender/50 flex items-center justify-center mr-4 border-2 border-lavender">
                  <span className="font-bold text-xl text-primary">D</span>
                </div>
                <div>
                  <h4 className="font-bold text-secondary">David Johnson</h4>
                  <p className="text-sm text-gray-600">Premier Kitchen & Bath</p>
                </div>
              </div>
              <p className="italic text-gray-600 leading-relaxed">
                "The support from the Renovation Bridge team has been exceptional. They understand our business needs and consistently connect us with the right clients."
              </p>
            </div>
          </div>
        </section>
        
        {/* FAQ Section with improved styling */}
        <section className="mt-20 mb-20 bg-lavender/20 py-16 px-4 rounded-3xl">
          <h2 className="text-3xl font-bold text-center mb-12 relative">
            Frequently Asked Questions
            <span className="block w-20 h-1 bg-primary mx-auto mt-4"></span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Enhanced FAQ items */}
            <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100 transition-all hover:shadow-xl">
              <h3 className="font-bold text-lg text-secondary mb-3 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Is there a fee to join the network?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                There is no upfront cost to join our contractor network. We work on a commission basis only when you get a project through our platform.
              </p>
            </div>
            
            {/* Continue with similar styling for other FAQ items */}
            <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100 transition-all hover:shadow-xl">
              <h3 className="font-bold text-lg text-secondary mb-3 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                What types of contractors do you work with?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We work with licensed contractors across various specialties including general contractors, kitchen and bath specialists, and more.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100 transition-all hover:shadow-xl">
              <h3 className="font-bold text-lg text-secondary mb-3 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                How does the vetting process work?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Our vetting process includes license verification, insurance checks, reference calls, and an interview with our team to ensure quality standards.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100 transition-all hover:shadow-xl">
              <h3 className="font-bold text-lg text-secondary mb-3 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                How quickly will I start receiving leads?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Once approved, you could start receiving leads within days, depending on the demand in your service area and your specific expertise.
              </p>
            </div>
          </div>
        </section>
        
        {/* CTA Section with enhanced styling */}
        <section className="mt-20 text-center">
          <div className="bg-gradient-to-r from-primary/90 to-primary rounded-3xl p-12 max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-pattern opacity-10"></div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-6 text-white">Ready to Grow Your Business?</h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
                Join our network of top-rated contractors and start connecting with qualified homeowners today.
              </p>
              <a 
                href="#apply-form" 
                className="inline-block bg-white text-primary font-medium py-4 px-8 rounded-lg transition-all transform hover:scale-105 hover:shadow-lg"
              >
                Apply Now
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
} 