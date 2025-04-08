'use client';

import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';
import React from 'react';

export default function RealEstateReferral() {
  const [formData, setFormData] = useState({
    homeownersFullName: '',
    homeownersPhone: '',
    homeownersEmail: '',
    homeownersAddress: '',
    projectDescription: '',
    agentsFullName: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Prepare data for GHL submission
      const ghlData = {
        name: formData.homeownersFullName,
        email: formData.homeownersEmail,
        phone: formData.homeownersPhone,
        city: formData.homeownersAddress.split(',').slice(-2, -1)[0]?.trim() || '',
        description: `
          Real Estate Referral
          Homeowner Address: ${formData.homeownersAddress}
          Project Description: ${formData.projectDescription}
          Referring Agent: ${formData.agentsFullName}
        `.trim()
      };
      
      // Send data to our API route that connects to GoHighLevel
      const response = await fetch('/api/submit-referral', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ghlData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit form');
      }
      
      setIsSuccess(true);
      setFormData({
        homeownersFullName: '',
        homeownersPhone: '',
        homeownersEmail: '',
        homeownersAddress: '',
        projectDescription: '',
        agentsFullName: ''
      });
      
      // Reset success message after 15 seconds
      setTimeout(() => setIsSuccess(false), 15000);
    } catch (err) {
      console.error('Error submitting form:', err);
      setError(err instanceof Error ? err.message : 'Failed to submit form');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen relative">
      {/* Back Button */}
      <div className="container mx-auto px-4 absolute top-4 left-0 right-0 z-10">
        <Link href="/" className="inline-flex items-center text-white hover:text-blue-100 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back
        </Link>
      </div>

      {/* Hero Section with Gradient Overlay */}
      <div className="relative h-[500px] md:h-[600px]">
        <Image
          src="/images/projects/house-1.jpg"
          alt="Luxurious home exterior"
          fill
          className="object-cover brightness-75"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-transparent">
          <div className="container mx-auto px-4 py-24 md:py-32">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Real Estate Referral
            </h1>
            <h2 className="text-xl md:text-2xl text-white max-w-2xl">
              Have a client looking to renovate? Let us help!
            </h2>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <p className="text-lg mb-6">
              At Renovation Bridge, we come from a real estate background and understand how much you care about your clients. That's why we're here to provide them with the best possible renovation experience. We personally guide each homeowner through every step of the process—from finding the right contractor to negotiating the best deals—ensuring a smooth and stress-free renovation.
            </p>
            <p className="text-lg mb-6">
              Plus, as a token of appreciation, you'll receive a generous referral bonus for every project you bring our way!
            </p>
            <p className="text-lg font-semibold">
              Want to learn more? Give us a call today at (925) 693-7590.
            </p>
          </div>
          <div className="md:w-1/2 relative h-[400px] rounded-lg overflow-hidden shadow-2xl">
            <Image
              src="/images/projects/interior-1.jpg"
              alt="Stylish home interior"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Referral Form Section */}
      <section className="bg-slate-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Refer Now!</h2>
          <p className="text-center text-lg mb-12">Refer your client and we will reach out to them!</p>
          
          {/* Social Media Icons */}
          <div className="flex justify-center gap-6 mb-12">
            <Link href="https://x.com/RenovationBridg" className="text-gray-700 hover:text-gray-900">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
            </Link>
            <Link href="https://www.youtube.com/@RenovationBridge" className="text-gray-700 hover:text-gray-900">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
              </svg>
            </Link>
            <Link href="https://www.facebook.com/profile.php?id=100093963673999" className="text-gray-700 hover:text-gray-900">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
              </svg>
            </Link>
            <Link href="https://www.instagram.com/renovationbridge/" className="text-gray-700 hover:text-gray-900">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </Link>
          </div>
          
          <div className="max-w-xl mx-auto bg-white rounded-lg shadow-lg p-8">
            {isSuccess && (
              <div className="mb-6 bg-green-50 text-green-800 p-4 rounded-md border-l-4 border-green-500 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Thank you! The referral has been submitted successfully. We'll reach out to your client soon.
              </div>
            )}
            
            {error && (
              <div className="mb-6 bg-red-50 text-red-800 p-4 rounded-md border-l-4 border-red-500 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              {/* Homeowner Full Name */}
              <div className="mb-6">
                <label htmlFor="homeownersFullName" className="block text-gray-700 font-medium mb-2">
                  Homeowners Full name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  id="homeownersFullName"
                  name="homeownersFullName"
                  value={formData.homeownersFullName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Homeowner Phone Number */}
              <div className="mb-6">
                <label htmlFor="homeownersPhone" className="block text-gray-700 font-medium mb-2">
                  Homeowners Phone Number <span className="text-red-600">*</span>
                </label>
                <input
                  type="tel"
                  id="homeownersPhone"
                  name="homeownersPhone"
                  value={formData.homeownersPhone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Homeowner Email */}
              <div className="mb-6">
                <label htmlFor="homeownersEmail" className="block text-gray-700 font-medium mb-2">
                  Homeowners Email <span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  id="homeownersEmail"
                  name="homeownersEmail"
                  value={formData.homeownersEmail}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Homeowner Address */}
              <div className="mb-6">
                <label htmlFor="homeownersAddress" className="block text-gray-700 font-medium mb-2">
                  Homeowners Address <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  id="homeownersAddress"
                  name="homeownersAddress"
                  value={formData.homeownersAddress}
                  onChange={handleChange}
                  required
                  placeholder="Address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Project Description */}
              <div className="mb-6">
                <label htmlFor="projectDescription" className="block text-gray-700 font-medium mb-2">
                  Short Project Description
                </label>
                <textarea
                  id="projectDescription"
                  name="projectDescription"
                  value={formData.projectDescription}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Add answer here"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Agent Full Name */}
              <div className="mb-6">
                <label htmlFor="agentsFullName" className="block text-gray-700 font-medium mb-2">
                  Agents Full Name
                </label>
                <input
                  type="text"
                  id="agentsFullName"
                  name="agentsFullName"
                  value={formData.agentsFullName}
                  onChange={handleChange}
                  placeholder="Add answer here"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 px-6 text-white font-semibold bg-indigo-600 hover:bg-indigo-700 rounded-md transition duration-300"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </span>
                ) : 'Send'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
} 