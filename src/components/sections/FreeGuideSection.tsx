"use client"

import GuideImageCarousel from '@/components/ui/GuideImageCarousel'
import GuideDownloadForm from '@/components/forms/GuideDownloadForm'
import { useState, useRef, useEffect } from 'react'
import type { MouseEvent } from 'react'
import Link from 'next/link';

export default function FreeGuideSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  const images = [
    "/images/guide/open.png",
    "/images/guide/ajar.png",
    "/images/guide/double.png",
    "/images/guide/guide.png",
  ]
  
  const MAX_ROTATION = 10;

  // Auto-rotate images every 5 seconds
  useEffect(() => {
    timeoutRef.current = setInterval(() => {
      if (!isHovering) {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }
    }, 5000);
    
    return () => {
      if (timeoutRef.current) {
        clearInterval(timeoutRef.current);
      }
    };
  }, [isHovering, images.length]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = ((x - centerX) / centerX) * MAX_ROTATION * -1;
    const rotateX = ((y - centerY) / centerY) * MAX_ROTATION;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <section id="free-guide-section" className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-slate-50 to-sky-100">
      <div className="container-custom px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Image with Animation */}
          <div className="relative order-2 lg:order-1">
            <div 
              className="relative w-full max-w-sm mx-auto" 
              style={{ perspective: '1000px' }} 
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {/* Main image display with 3D effect */}
              <div 
                className="relative"
                style={{
                  transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${isHovering ? 1.05 : 1})`,
                  transition: 'transform 0.1s ease-out',
                }}
              >
                <div className="relative rounded-xl overflow-hidden shadow-2xl">
                  <GuideImageCarousel 
                    images={images}
                    currentIndex={currentImageIndex}
                    setCurrentIndex={setCurrentImageIndex}
                  />
                  
                  {/* Overlaid navigation controls */}
                  <div className="absolute inset-0 flex items-center justify-between px-3 opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <button 
                      className="bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow-md transition-all duration-300 transform hover:scale-110"
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
                      }}
                      aria-label="Previous image"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    
                    <button 
                      className="bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow-md transition-all duration-300 transform hover:scale-110"
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex((prev) => (prev + 1) % images.length);
                      }}
                      aria-label="Next image"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                  
                  {/* Image indicator dots */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentImageIndex(index);
                        }}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentImageIndex 
                            ? 'bg-primary w-4' 
                            : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
                
                {/* Add a subtle reflection effect */}
                <div 
                  className="w-full h-5 mt-1 rounded-b-xl mx-auto"
                  style={{ 
                    background: 'linear-gradient(to bottom, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 100%)',
                    transform: 'scaleY(-1)',
                    opacity: 0.3,
                  }}
                />
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="space-y-4 sm:space-y-6 md:max-w-lg order-1 lg:order-2">
            <div className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-lavender/20 text-primary rounded-full text-xs sm:text-sm font-semibold mb-2">
              Free Resource
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-secondary">Complete Renovation Planning Guide</h2>
            <p className="text-gray text-base sm:text-lg">
              Download our comprehensive guide to planning your renovation project. This step-by-step resource will help you organize your ideas, set a realistic budget, and navigate the entire renovation process with confidence.
            </p>
            <ul className="space-y-2 sm:space-y-3">
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mt-1 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Step-by-step planning worksheets</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mt-1 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Budget planning templates</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mt-1 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Contractor interview questions</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mt-1 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Timeline & project management tools</span>
              </li>
            </ul>
            {/* Form Card Container */}
            <div className="mt-6 sm:mt-8">
              <GuideDownloadForm 
                guideTitle="Complete Renovation Planning Guide"
                guideType="renovation"
                downloadUrl="/pdfs/guide.pdf"
                buttonText="Download"
                successHeading="Thank you!"
                successMessage="Your guide is ready to download"
              />
            </div>
            
            {/* Learn More Button - Centered and Spaced */}
            <div className="mt-8 flex justify-center">
              <Link href="/guide" legacyBehavior>
                <a className="px-6 py-3 text-base font-medium text-primary bg-transparent border border-primary rounded-lg hover:bg-primary hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50">
                  Learn More
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 