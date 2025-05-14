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
        const offsetPosition = formPosition + window.scrollY + yOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'auto' // Use 'auto' instead of 'smooth' for initial positioning
        });
      }, 100);
    }
  }, []);

  return (
    <div className="py-12 md:py-16 w-full h-screen overflow-hidden">
      <div className="max-w-[1400px] mx-auto relative px-4 xl:px-8">
        {/* Background decorative elements - expanded to use more screen real estate */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-lavender/20 rounded-full blur-3xl opacity-70 hidden md:block"></div>
        <div className="absolute top-1/3 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-60 hidden md:block"></div>
        <div className="absolute bottom-1/4 -left-40 w-80 h-80 bg-lavender/10 rounded-full blur-3xl opacity-50 hidden md:block"></div>
        
        {/* Form and Summer Deal Container - Using more horizontal space */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Summer Deal - Show above on mobile, to the side on desktop */}
          {/* Removed Summer Special Offer - now in hero section */}
          
          {/* Form - Main focus, expanded to use more space */}
          <div 
            ref={formRef}
            className="lg:col-span-12 transform transition duration-500 hover:shadow-xl"
          >
            <GetStartedForm />
          </div>
        </div>
        
        {/* Spacer to keep footer at consistent position - reduced size */}
        <div className="min-h-[300px] md:min-h-[500px]"></div>
      </div>
    </div>
  )
} 