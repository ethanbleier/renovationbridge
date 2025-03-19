'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

type FormValues = {
  name: string
  city: string
  email: string
  phone: string
  description: string
}

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const { 
    register, 
    handleSubmit,
    reset,
    formState: { errors } 
  } = useForm<FormValues>()
  
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true)
    setError(null)
    
    try {
      // Send data to our API route that connects to GoHighLevel
      const response = await fetch('/api/submit-to-ghl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit form');
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
    <div className="w-full rounded-lg bg-white p-4 md:p-6 shadow-md">
      <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Get Started Today</h3>
      
      {isSuccess ? (
        <div className="bg-green-50 text-green-800 p-3 md:p-4 rounded-md mb-4 md:mb-6">
          Thank you! We'll be in touch with you soon.
        </div>
      ) : null}
      
      {error ? (
        <div className="bg-red-50 text-red-800 p-3 md:p-4 rounded-md mb-4 md:mb-6">
          {error}
        </div>
      ) : null}
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <input
              type="text"
              placeholder="Name"
              className={`form-input ${errors.name ? 'border-red-500' : ''}`}
              {...register('name', { required: true })}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">Name is required</p>
            )}
          </div>
          
          <div>
            <input
              type="text"
              placeholder="City"
              className={`form-input ${errors.city ? 'border-red-500' : ''}`}
              {...register('city', { required: true })}
            />
            {errors.city && (
              <p className="mt-1 text-sm text-red-600">City is required</p>
            )}
          </div>
        </div>
        
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            className={`form-input ${errors.email ? 'border-red-500' : ''}`}
            {...register('email', { 
              required: true,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">
              {errors.email.message || 'Email is required'}
            </p>
          )}
        </div>
        
        <div className="mb-4">
          <input
            type="tel"
            placeholder="Phone Number"
            className={`form-input ${errors.phone ? 'border-red-500' : ''}`}
            {...register('phone', { 
              required: true,
              pattern: {
                value: /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
                message: 'Invalid phone number'
              }
            })}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">
              {errors.phone.message || 'Phone number is required'}
            </p>
          )}
        </div>
        
        <div className="mb-6">
          <textarea
            placeholder="Description of work"
            rows={4}
            className={`form-input resize-none ${errors.description ? 'border-red-500' : ''}`}
            {...register('description', { required: true })}
          ></textarea>
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">Description is required</p>
          )}
        </div>
        
        <button
          type="submit"
          className="w-full btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  )
}

export default ContactForm 