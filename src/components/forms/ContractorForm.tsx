'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { isValidPhoneNumber } from 'libphonenumber-js'

type FormValues = {
  firstName: string
  lastName: string
  email: string
  phone: string
  licenseNumber: string
  website?: string
  location: string
  hearAboutUs?: string
}

const ContractorForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const { 
    register, 
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors } 
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
  
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true)
    setError(null)
    
    try {
      // Validate phone number using libphonenumber-js
      const phoneInput = data.phone.replace(/\D/g, '');
      const formattedPhone = `+1${phoneInput}`; // Assuming US phone numbers
      
      if (!isValidPhoneNumber(formattedPhone, 'US')) {
        throw new Error('Please enter a valid phone number');
      }

      // Validate email
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(data.email)) {
        throw new Error('Please enter a valid email address');
      }

      // Add contractor application details as projectDescription
      const formData = {
        ...data,
        message: `Contractor Application: Name: ${data.firstName} ${data.lastName}, Email: ${data.email}, Phone: ${data.phone}, Location: ${data.location}, License: ${data.licenseNumber}${data.website ? `, Website: ${data.website}` : ''}${data.hearAboutUs ? `, Heard About Us: ${data.hearAboutUs}` : ''}`
      };
      
      // Send data to our API route that connects to GoHighLevel
      const response = await fetch('/api/submit-contractor', {
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
      reset()
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000)
    } catch (err) {
      console.error('Error submitting form:', err);
      setError(err instanceof Error ? err.message : 'Failed to submit form');
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
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
      
      {error ? (
        <div className="bg-red-50 text-red-800 p-6 rounded-xl mb-6 border-l-4 border-red-500 flex items-start">
          <div className="mr-4 text-red-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2">Error submitting your application</h3>
            <p>{error}</p>
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
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            id="email"
            type="email"
            className={`w-full px-4 py-3 rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary ${errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
            {...register('email', { 
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
          />
          {errors.email && (
            <p className="mt-2 text-sm text-red-600 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              {errors.email.message}
            </p>
          )}
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
          <input
            id="phone"
            type="tel"
            className={`w-full px-4 py-3 rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary ${errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
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
            <p className="mt-2 text-sm text-red-600 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              {errors.phone.message || 'Phone number is required'}
            </p>
          )}
        </div>
        
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
  )
}

export default ContractorForm 