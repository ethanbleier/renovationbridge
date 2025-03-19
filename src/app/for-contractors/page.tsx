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
    <div className="pt-24 pb-16 bg-cream">
      <section className="bg-lavender py-12 mb-12">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-secondary mb-4">Join Our Contractor Network</h1>
            <p className="text-lg md:text-xl text-gray max-w-3xl mx-auto">
              Partner with Renovation Bridge to grow your business and connect with qualified homeowners seeking quality renovation services.
            </p>
          </div>
        </div>
      </section>
      
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7">
            <div className="bg-white rounded-xl p-6 md:p-10 shadow-lg mb-8">
              <h2 className="text-2xl font-bold mb-6 text-secondary">Apply to Join Our Network</h2>
              
              {isSuccess ? (
                <div className="bg-green-50 text-green-800 p-4 rounded-md mb-6">
                  <h3 className="font-bold mb-2">Thank you for your application!</h3>
                  <p>We'll review your information and get back to you shortly about the next steps.</p>
                </div>
              ) : null}
              
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray mb-1">First Name</label>
                    <input
                      id="firstName"
                      type="text"
                      className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                      {...register('firstName', { required: true })}
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-600">First name is required</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray mb-1">Last Name</label>
                    <input
                      id="lastName"
                      type="text"
                      className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
                      {...register('lastName', { required: true })}
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-600">Last name is required</p>
                    )}
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray mb-1">Phone Number</label>
                  <input
                    id="phone"
                    type="tel"
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
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
                
                <div className="mb-4">
                  <label htmlFor="licenseNumber" className="block text-sm font-medium text-gray mb-1">License Number</label>
                  <input
                    id="licenseNumber"
                    type="text"
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${errors.licenseNumber ? 'border-red-500' : 'border-gray-300'}`}
                    {...register('licenseNumber', { required: true })}
                  />
                  {errors.licenseNumber && (
                    <p className="mt-1 text-sm text-red-600">License number is required</p>
                  )}
                </div>
                
                <div className="mb-4">
                  <label htmlFor="website" className="block text-sm font-medium text-gray mb-1">Website (Optional)</label>
                  <input
                    id="website"
                    type="url"
                    placeholder="https://yourcompany.com"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    {...register('website', { 
                      pattern: {
                        value: /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*$/,
                        message: 'Invalid website URL'
                      }
                    })}
                  />
                  {errors.website && (
                    <p className="mt-1 text-sm text-red-600">{errors.website.message}</p>
                  )}
                </div>
                
                <div className="mb-4">
                  <label htmlFor="location" className="block text-sm font-medium text-gray mb-1">Location</label>
                  <input
                    id="location"
                    type="text"
                    placeholder="City, State"
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${errors.location ? 'border-red-500' : 'border-gray-300'}`}
                    {...register('location', { required: true })}
                  />
                  {errors.location && (
                    <p className="mt-1 text-sm text-red-600">Location is required</p>
                  )}
                </div>
                
                <div className="mb-6">
                  <label htmlFor="hearAboutUs" className="block text-sm font-medium text-gray mb-1">How did you hear about us? (Optional)</label>
                  <select
                    id="hearAboutUs"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
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
                  className="w-full bg-primary text-white font-medium py-3 rounded-lg hover:bg-primary-dark transition-colors"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>
              </form>
            </div>
          </div>
          
          <div className="lg:col-span-5">
            <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg mb-8">
              <h3 className="text-xl font-bold text-secondary mb-4">Why Join Renovation Bridge?</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-lavender flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold">High-Quality Leads</h4>
                    <p className="text-gray">Connect with pre-qualified homeowners who are ready to start their renovation projects.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-lavender flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold">Build Your Reputation</h4>
                    <p className="text-gray">Benefit from our trusted platform to enhance your credibility and grow your business.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-lavender flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold">Flexible Payment Terms</h4>
                    <p className="text-gray">Take advantage of our contractor-friendly payment structure, designed to support your cash flow.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-lavender flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 10a8 8 0 1116 0 8 8 0 01-16 0z" />
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold">Save Time</h4>
                    <p className="text-gray">Focus on what you do best while we handle marketing, lead generation, and initial client communications.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative h-80 rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/images/contractor-working.jpg"
                alt="Contractor working on a renovation project"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
        
        {/* Testimonials */}
        <section className="mt-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">What Contractors Say About Us</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-lavender flex items-center justify-center mr-4">
                  <span className="font-bold text-primary">J</span>
                </div>
                <div>
                  <h4 className="font-bold">John Smith</h4>
                  <p className="text-sm text-gray">Smith Building & Contracting</p>
                </div>
              </div>
              <p className="italic text-gray">
                "Since joining Renovation Bridge, my business has grown by 30%. The leads are high-quality and the partnership has been valuable for our company growth."
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-lavender flex items-center justify-center mr-4">
                  <span className="font-bold text-primary">M</span>
                </div>
                <div>
                  <h4 className="font-bold">Maria Garcia</h4>
                  <p className="text-sm text-gray">Garcia Home Renovations</p>
                </div>
              </div>
              <p className="italic text-gray">
                "I appreciate how Renovation Bridge vets homeowners before connecting us. It saves me time and ensures I'm working with serious clients who are ready to move forward."
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-lavender flex items-center justify-center mr-4">
                  <span className="font-bold text-primary">D</span>
                </div>
                <div>
                  <h4 className="font-bold">David Johnson</h4>
                  <p className="text-sm text-gray">Premier Kitchen & Bath</p>
                </div>
              </div>
              <p className="italic text-gray">
                "The support from the Renovation Bridge team has been exceptional. They understand our business needs and consistently connect us with the right clients."
              </p>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="mt-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="font-bold text-lg mb-2">Is there a fee to join the network?</h3>
              <p className="text-gray">
                There is no upfront cost to join our contractor network. We work on a commission basis only when you get a project through our platform.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="font-bold text-lg mb-2">What types of contractors do you work with?</h3>
              <p className="text-gray">
                We work with licensed contractors across various specialties including general contractors, kitchen and bath specialists, and more.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="font-bold text-lg mb-2">How does the vetting process work?</h3>
              <p className="text-gray">
                Our vetting process includes license verification, insurance checks, reference calls, and an interview with our team to ensure quality standards.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="font-bold text-lg mb-2">How quickly will I start receiving leads?</h3>
              <p className="text-gray">
                Once approved, you could start receiving leads within days, depending on the demand in your service area and your specific expertise.
              </p>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="mt-16 text-center">
          <div className="bg-lavender rounded-xl p-8 md:p-12 max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Grow Your Business?</h2>
            <p className="text-lg mb-6 max-w-2xl mx-auto">
              Join our network of top-rated contractors and start connecting with qualified homeowners today.
            </p>
            <a href="#apply-form" className="btn btn-primary">
              Apply Now
            </a>
          </div>
        </section>
      </div>
    </div>
  )
} 