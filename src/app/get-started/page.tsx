"use client";

import GetStartedForm from '@/components/forms/GetStartedForm'
import { useEffect, useRef } from 'react'

export default function GetStartedPage() {
  const formRef = useRef<HTMLDivElement>(null);

  // Scroll to form on initial load
  useEffect(() => {
    if (formRef.current) {
      // Slight delay to ensure DOM is ready
      setTimeout(() => {
        const yOffset = -20; // Slightly above the form
        const formPosition = formRef.current?.getBoundingClientRect().top || 0;
        const offsetPosition = formPosition + window.pageYOffset + yOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'auto' // Use 'auto' instead of 'smooth' for initial positioning
        });
      }, 100);
    }
  }, []);

  return (
    <div className="py-8 px-4 md:py-12">
      <div className="container mx-auto max-w-4xl relative">
        {/* Background decorative elements */}
        <div className="absolute -top-10 -left-10 w-20 h-20 bg-lavender/20 rounded-full blur-2xl opacity-70 hidden md:block"></div>
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl opacity-60 hidden md:block"></div>
        
        {/* Header */}
        <div className="text-center mb-8 max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-secondary mb-3">Get Started with Renovation Bridge</h1>
          <p className="text-gray-600 text-sm md:text-base">Tell us about your project and we'll connect you with the perfect professionals.</p>
        </div>
        
        {/* Form */}
        <div 
          ref={formRef}
          className="transform transition duration-500 hover:shadow-xl"
        >
          <GetStartedForm />
        </div>
      </div>
    </div>
  )
} 