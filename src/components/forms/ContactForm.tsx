'use client'

import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { track } from '@vercel/analytics'
import ConversionTracker from '@/components/analytics/ConversionTracker'
import { sendFacebookEvent } from '@/lib/fbEvents'
import { isValidPhoneNumber } from 'libphonenumber-js'
  
type FormValues = {
  name: string
  city: string
  email: string
  phone: string
  message: string
  projectDescription: string
}

// JSON schema for validation
const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  city: z.string().min(1, { message: "City is required" }),
  email: z.string().min(1, { message: "Email is required" }).email({ message: "Invalid email address" }),
  phone: z.string().min(1, { message: "Phone number is required" }),
  message: z.string().min(1, { message: "Description of work is required" })
})

interface ContactFormProps {
  onSubmit?: (data: FormValues) => void;
}

const ContactForm = ({ onSubmit }: ContactFormProps = {}) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [trackConversion, setTrackConversion] = useState(false)
  
  const { 
    register, 
    handleSubmit,
    reset,
    setValue,
    watch,
    getValues,
    formState: { errors, isDirty } 
  } = useForm<FormValues>()
  
  // Watch phone field to apply formatting
  const phone = watch('phone')
  
  // Format phone number as user types
  const formatPhoneNumber = (value: string) => {
    // Strip all non-numeric characters
    const phoneNumber = value.replace(/\D/g, '')
    
    // Apply formatting based on the length of the number
    if (phoneNumber.length < 4) {
      return phoneNumber.length ? `(${phoneNumber}` : ''
    } else if (phoneNumber.length < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`
    } else {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`
    }
  }
  
  // Handle phone input changes
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhone = formatPhoneNumber(e.target.value)
    setValue('phone', formattedPhone, { shouldValidate: true })
  }

  // Load saved form data from localStorage on initial render
  useEffect(() => {
    const savedForm = localStorage.getItem('contactFormData')
    if (savedForm) {
      try {
        const formData = JSON.parse(savedForm)
        Object.entries(formData).forEach(([key, value]) => {
          setValue(key as keyof FormValues, value as string)
        })
      } catch (e) {
        console.error('Error loading saved form data', e)
        localStorage.removeItem('contactFormData')
      }
    }
  }, [setValue])

  // Save form data to localStorage when values change
  useEffect(() => {
    if (isDirty) {
      const currentValues = getValues()
      localStorage.setItem('contactFormData', JSON.stringify(currentValues))
    }
  }, [watch, isDirty, getValues])
  
  const onSubmitHandler = async (data: FormValues) => {
    setIsSubmitting(true)
    setError(null)
    
    try {
      // Validate phone number using libphonenumber-js
      const phoneInput = data.phone.replace(/\D/g, '');
      const formattedPhone = `+1${phoneInput}`; // Assuming US phone numbers
      
      if (!isValidPhoneNumber(formattedPhone, 'US')) {
        throw new Error('Please enter a valid phone number');
      }
      
      if (onSubmit) {
        onSubmit(data);
        setIsSuccess(true);
        setTrackConversion(true);
        // Track form submission with Vercel Analytics
        track('ContactFormSubmission', { 
          formType: 'contact',
          location: window.location.pathname 
        });
        
        reset();
        localStorage.removeItem('contactFormData');
        setTimeout(() => setIsSuccess(false), 15000);
        return;
      }
      
      // Let the message be part of the data object directly 
      // The formatGHLData function in the backend will handle proper formatting
      const formData = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        city: data.city,
        message: data.message || "Contact form submission - no description provided",
        projectDescription: data.message || "Contact form submission - no description provided",
        project_description: data.message || "Contact form submission - no description provided",
        description: data.message || "Contact form submission - no description provided",
        work_description: data.message || "Contact form submission - no description provided",
        project_details: data.message || "Contact form submission - no description provided"
      };
      
      // Send data to our API route that connects to GoHighLevel
      const response = await fetch('/api/submit-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Validation error details:', errorData);
        if (errorData.details) {
          throw new Error(`Validation failed: ${JSON.stringify(errorData.details)}`);
        } else {
          throw new Error(errorData.error || 'Failed to submit form');
        }
      }
      
      setIsSuccess(true)
      setTrackConversion(true)
      // Track form submission with Vercel Analytics
      track('ContactFormSubmission', { 
        formType: 'contact',
        location: window.location.pathname 
      });
      
      reset()
      // Clear saved form data after successful submission
      localStorage.removeItem('contactFormData')
      
      // Reset success message after 15 seconds
      setTimeout(() => setIsSuccess(false), 15000)
    } catch (err) {
      console.error('Error submitting form:', err);
      // Track form error with Vercel Analytics
      track('ContactFormError', { 
        formType: 'contact',
        error: err instanceof Error ? err.message : 'Unknown error'
      });
      // Check if the error response contains details
      if (err instanceof Error && err.message === 'Validation failed' && 'details' in (err as any)) {
        const details = JSON.stringify((err as any).details);
        setError(`Validation failed: ${details}`);
      } else {
        setError(err instanceof Error ? err.message : 'Failed to submit form');
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const clearForm = () => {
    reset()
    localStorage.removeItem('contactFormData')
  }
  
  return (
    <div className="w-full rounded-lg bg-white p-3 sm:p-5 md:p-6 shadow-lg transition-all hover:shadow-xl">
      {trackConversion && <ConversionTracker conversionType="contact_form" value={1.0} />}
      
      <h3 className="text-base sm:text-lg md:text-xl font-bold mb-1 sm:mb-2 md:mb-4 text-primary/90 tracking-tight text-left">
        Get Started Today
      </h3>
      {isSuccess ? (
        <div className="bg-green-50 text-green-800 p-2 sm:p-3 rounded-md mb-3 sm:mb-5 border-l-4 border-green-500 flex items-center animate-fadeIn text-xs sm:text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Thank you! Our team will reach out soon
        </div>
      ) : null}
      
      {error ? (
        <div className="bg-red-50 text-red-800 p-2 sm:p-3 rounded-md mb-3 sm:mb-5 border-l-4 border-red-500 flex items-center animate-fadeIn text-xs sm:text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </div>
      ) : null}
      
      {/* Only show the form if not successful */}
      {!isSuccess && (
        <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-2 sm:space-y-4" aria-label="Contact form">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-4">
            <div className="space-y-0.5 sm:space-y-1">
              <label htmlFor="name" className="block text-[11px] sm:text-xs font-medium text-gray-700">
                Name <span className="text-red-500"></span>
              </label>
              <div className="relative group">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2 group-focus-within:text-blue-500 transition-colors" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  autoFocus
                  className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 rounded-lg border text-xs sm:text-sm ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all`}
                  placeholder="Full Name"
                  aria-required="true"
                  aria-invalid={errors.name ? "true" : "false"}
                  {...register('name', { required: true })}
                />
              </div>
              {errors.name && (
                <p className="mt-0.5 sm:mt-1 text-[11px] sm:text-xs text-red-600 flex items-center" id="name-error">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Name is required
                </p>
              )}
            </div>
            
            <div className="space-y-0.5 sm:space-y-1">
              <label htmlFor="city" className="block text-[11px] sm:text-xs font-medium text-gray-700">
                City <span className="text-red-500"></span>
              </label>
              <div className="relative group">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2 group-focus-within:text-blue-500 transition-colors" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <input
                  id="city"
                  type="text"
                  autoComplete="address-level2"
                  className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 rounded-lg border text-xs sm:text-sm ${errors.city ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all`}
                  placeholder="City"
                  aria-required="true"
                  aria-invalid={errors.city ? "true" : "false"}
                  {...register('city', { required: true })}
                />
              </div>
              {errors.city && (
                <p className="mt-0.5 sm:mt-1 text-[11px] sm:text-xs text-red-600 flex items-center" id="city-error">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  City is required
                </p>
              )}
            </div>
          </div>
          
          <div className="space-y-0.5 sm:space-y-1">
            <label htmlFor="email" className="block text-[11px] sm:text-xs font-medium text-gray-700">
              Email <span className="text-red-500"></span>
            </label>
            <div className="relative group">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2 group-focus-within:text-blue-500 transition-colors" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <input
                id="email"
                type="email"
                autoComplete="email"
                className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 rounded-lg border text-xs sm:text-sm ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all`}
                placeholder="Email Address"
                aria-required="true"
                aria-invalid={errors.email ? "true" : "false"}
                {...register('email', { 
                  required: true,
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
              />
            </div>
            {errors.email && (
              <p className="mt-0.5 sm:mt-1 text-[11px] sm:text-xs text-red-600 flex items-center" id="email-error">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.email.message || 'Email is required'}
              </p>
            )}
          </div>
          
          <div className="space-y-0.5 sm:space-y-1">
            <label htmlFor="phone" className="block text-[11px] sm:text-xs font-medium text-gray-700">
              Phone Number <span className="text-red-500"></span>
            </label>
            <div className="relative group">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2 group-focus-within:text-blue-500 transition-colors" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <input
                id="phone"
                type="tel"
                autoComplete="tel"
                className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 rounded-lg border text-xs sm:text-sm ${errors.phone ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all`}
                placeholder="(123) 456-7890"
                aria-required="true"
                aria-invalid={errors.phone ? "true" : "false"}
                {...register('phone', { 
                  required: true,
                  pattern: {
                    value: /^\(\d{3}\)\s\d{3}-\d{4}$/,
                    message: 'Invalid phone number'
                  }
                })}
                onChange={handlePhoneChange}
                value={phone || ''}
              />
            </div>
            {errors.phone && (
              <p className="mt-0.5 sm:mt-1 text-[11px] sm:text-xs text-red-600 flex items-center" id="phone-error">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.phone.message || 'Phone number is required'}
              </p>
            )}
          </div>
          
          <div className="space-y-0.5 sm:space-y-1">
            <label htmlFor="message" className="block text-[11px] sm:text-xs font-medium text-gray-700">
              Project Details <span className="text-red-500"></span>
            </label>
            <div className="relative group">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 absolute left-3 top-3 sm:top-4 group-focus-within:text-blue-500 transition-colors" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
              <textarea
                id="message"
                placeholder="Tell us briefly what you need help with today"
                rows={3}
                className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 rounded-lg border text-xs sm:text-sm ${errors.message ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none`}
                aria-required="true"
                aria-invalid={errors.message ? "true" : "false"}
                {...register('message', { required: true })}
              ></textarea>
            </div>
            {errors.message && (
              <p className="mt-0.5 sm:mt-1 text-[11px] sm:text-xs text-red-600 flex items-center" id="message-error">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Description of work is required
              </p>
            )}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-1.5 sm:gap-2 pt-1 sm:pt-2">
            <button
              type="submit"
              className="flex-1 px-4 sm:px-6 py-3 sm:py-2.5 bg-primary hover:bg-opacity-90 text-white text-sm sm:text-sm font-medium rounded-lg shadow transition-all hover:shadow-lg transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:transform-none"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </span>
              ) : 'Submit'}
            </button>
            
            {isDirty && (
              <button
                type="button"
                onClick={clearForm}
                className="px-4 sm:px-6 py-2 sm:py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-800 text-xs sm:text-sm font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                Clear Form
              </button>
            )}
          </div>
        </form>
      )}
      {/* End conditional form rendering */}
      <p className="text-[10px] sm:text-xs text-gray-500 text-center mt-2 sm:mt-3">
        Your information is securely processed. We'll never share your details.
      </p>
    </div>
  )
}

export default ContactForm 