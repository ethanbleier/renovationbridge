'use client'

import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import ConversionTracker from '@/components/analytics/ConversionTracker'
import { sendFacebookEvent } from '@/lib/fbEvents'

type FormValues = {
  name: string
  email: string
  phone: string
  message: string
}

// JSON schema for validation
const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().min(1, { message: "Email is required" }).email({ message: "Invalid email address" }),
  phone: z.string().min(1, { message: "Phone number is required" }),
  message: z.string().optional()
})

interface FooterContactFormProps {
  onSubmit?: (data: FormValues) => void;
}

const FooterContactForm = ({ onSubmit }: FooterContactFormProps = {}) => {
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
    const savedForm = localStorage.getItem('footerContactFormData')
    if (savedForm) {
      try {
        const formData = JSON.parse(savedForm)
        Object.entries(formData).forEach(([key, value]) => {
          setValue(key as keyof FormValues, value as string)
        })
      } catch (e) {
        console.error('Error loading saved form data', e)
        localStorage.removeItem('footerContactFormData')
      }
    }
  }, [setValue])

  // Save form data to localStorage when values change
  useEffect(() => {
    if (isDirty) {
      const currentValues = getValues()
      localStorage.setItem('footerContactFormData', JSON.stringify(currentValues))
    }
  }, [watch, isDirty, getValues])
  
  const onSubmitHandler = async (data: FormValues) => {
    setIsSubmitting(true)
    setError(null)
    
    try {
      if (onSubmit) {
        onSubmit(data);
        setIsSuccess(true);
        setTrackConversion(true);
        
        // Send event to Facebook Conversions API
        sendFacebookEvent({
          event_name: 'Lead',
          user_data: {
            email: data.email,
            phone: data.phone,
            firstName: data.name.split(' ')[0],
            lastName: data.name.includes(' ') ? data.name.split(' ').slice(1).join(' ') : ''
          },
          custom_data: {
            form_type: 'footer_contact',
            location: window.location.pathname,
            message: data.message || "Footer form submission - no description provided",
          }
        });
        
        reset();
        localStorage.removeItem('footerContactFormData');
        setTimeout(() => setIsSuccess(false), 15000);
        return;
      }
      
      // Rename message to projectDescription for GHL
      const formData = {
        ...data,
        projectDescription: data.message,
        city: "Unknown" // Adding city with default value since it's not in the footer form
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
        if (errorData.details) {
          throw new Error(`Validation failed: ${JSON.stringify(errorData.details)}`);
        } else {
          throw new Error(errorData.error || 'Failed to submit form');
        }
      }
      
      setIsSuccess(true)
      setTrackConversion(true)
      
      // Send event to Facebook Conversions API
      sendFacebookEvent({
        event_name: 'Lead',
        user_data: {
          email: data.email,
          phone: data.phone,
          firstName: data.name.split(' ')[0],
          lastName: data.name.includes(' ') ? data.name.split(' ').slice(1).join(' ') : ''
        },
        custom_data: {
          form_type: 'footer_contact',
          location: window.location.pathname,
          message: data.message || "Footer form submission - no description provided",
        }
      });
      
      reset()
      // Clear saved form data after successful submission
      localStorage.removeItem('footerContactFormData')
      
      // Reset success message after 15 seconds
      setTimeout(() => setIsSuccess(false), 15000)
    } catch (err) {
      console.error('Error submitting form:', err);
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
    localStorage.removeItem('footerContactFormData')
  }
  
  return (
    <div className="w-full rounded-lg bg-white p-4 shadow-md transition-all hover:shadow-lg">
      {trackConversion && <ConversionTracker conversionType="footer_form" value={1.0} />}
      
      <h3 className="text-lg font-bold mb-3 text-gray-800 relative inline-block after:content-[''] after:absolute after:w-1/2 after:h-0.5 after:bg-primary after:left-0 after:-bottom-1">Get Started</h3>
      
      {isSuccess ? (
        <div className="bg-green-50 text-green-800 p-2 rounded-md mb-4 border-l-4 border-green-500 flex items-center animate-fadeIn text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Thank you! We'll be in touch soon.
        </div>
      ) : null}
      
      {error ? (
        <div className="bg-red-50 text-red-800 p-2 rounded-md mb-4 border-l-4 border-red-500 flex items-center animate-fadeIn text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </div>
      ) : null}
      
      <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-3" aria-label="Footer contact form">
        <div className="space-y-1">
          <input
            id="footer-name"
            type="text"
            autoComplete="name"
            className={`w-full px-3 py-2 text-sm rounded-md border ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-1 focus:ring-blue-200 outline-none transition-all`}
            placeholder="Your Name *"
            aria-required="true"
            aria-invalid={errors.name ? "true" : "false"}
            {...register('name', { required: true })}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-600" id="name-error">
              Name is required
            </p>
          )}
        </div>
        
        <div className="space-y-1">
          <input
            id="footer-email"
            type="email"
            autoComplete="email"
            className={`w-full px-3 py-2 text-sm rounded-md border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-1 focus:ring-blue-200 outline-none transition-all`}
            placeholder="Email Address *"
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
          {errors.email && (
            <p className="mt-1 text-xs text-red-600" id="email-error">
              {errors.email.message || 'Email is required'}
            </p>
          )}
        </div>
        
        <div className="space-y-1">
          <input
            id="footer-phone"
            type="tel"
            autoComplete="tel"
            className={`w-full px-3 py-2 text-sm rounded-md border ${errors.phone ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-1 focus:ring-blue-200 outline-none transition-all`}
            placeholder="Phone Number *"
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
          {errors.phone && (
            <p className="mt-1 text-xs text-red-600" id="phone-error">
              {errors.phone.message || 'Phone number is required'}
            </p>
          )}
        </div>
        
        <div className="space-y-1">
          <textarea
            id="footer-message"
            placeholder="Describe your project..."
            rows={2}
            className={`w-full px-3 py-2 text-sm rounded-md border ${errors.message ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-1 focus:ring-blue-200 outline-none transition-all resize-none`}
            aria-invalid={errors.message ? "true" : "false"}
            {...register('message')}
          ></textarea>
        </div>
        
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full px-4 py-2 bg-primary hover:bg-opacity-90 text-white text-sm font-medium rounded-md shadow transition-all hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </span>
            ) : 'Get Started'}
          </button>
        </div>
        
        <p className="text-xs text-gray-500 text-center">
          Your information is securely processed.
        </p>
      </form>
    </div>
  )
}

export default FooterContactForm 