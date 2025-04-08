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
    <div className="py-12 md:py-16 w-full">
      <div className="max-w-[1400px] mx-auto relative px-4 xl:px-8">
        {/* Background decorative elements - expanded to use more screen real estate */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-lavender/20 rounded-full blur-3xl opacity-70 hidden md:block"></div>
        <div className="absolute top-1/3 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-60 hidden md:block"></div>
        <div className="absolute bottom-1/4 -left-40 w-80 h-80 bg-lavender/10 rounded-full blur-3xl opacity-50 hidden md:block"></div>
        
        {/* Form and Summer Deal Container - Using more horizontal space */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Summer Deal - Show above on mobile, to the side on desktop */}
          <div className="lg:col-span-3 lg:order-2 lg:sticky lg:top-4 animate-fadeIn">
            <div className="deal-card shadow-sm">
              <div className="deal-card-content">
                <div className="flex items-center mb-2">
                  <svg className="w-5 h-5 text-yellow-500 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 5V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 21V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M5 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M21 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <h3 className="text-lg font-bold text-secondary">Summer Special Offer</h3>
                </div>
                <div className="bg-white/80 p-3 rounded-lg mb-3 shadow-sm backdrop-blur-sm">
                  <p className="text-sm font-medium text-secondary">Complete your form now and receive:</p>
                  <ul className="mt-2 space-y-1">
                    <li className="flex items-start text-xs">
                      <svg className="w-4 h-4 text-green-500 mr-1 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>Free design consultation (valued at $399)</span>
                    </li>
                    <li className="flex items-start text-xs">
                      <svg className="w-4 h-4 text-green-500 mr-1 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>Free priority consultations with multiple vetted contractors</span>
                    </li>
                    <li className="flex items-start text-xs">
                      <svg className="w-4 h-4 text-green-500 mr-1 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>24/7 support from a dedicated RB Matchmaker</span>
                    </li>
                    <li className="flex items-start text-xs">
                      <svg className="w-4 h-4 text-green-500 mr-1 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>Contract negotiation and review</span>
                    </li>
                  </ul>
                </div>
                <div className="text-center">
                  <div className="text-xs font-semibold text-primary/90 bg-white/50 px-3 py-1 rounded-full inline-block backdrop-blur-sm">Limited time offer — expires soon!</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Form - Main focus, expanded to use more space */}
          <div 
            ref={formRef}
            className="lg:col-span-9 lg:order-1 transform transition duration-500 hover:shadow-xl"
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