"use client"

import GuideImageCarousel from '@/components/ui/GuideImageCarousel'
import GuideDownloadForm from '@/components/forms/GuideDownloadForm'
import { useState } from 'react'

export default function FreeGuideSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const images = [
    "/images/guide/ajar.png",
    "/images/guide/double.png",
    "/images/guide/open.png",
    "/images/guide/guide.png",
  ]
  
  const handleTabClick = (index: number) => {
    setCurrentImageIndex(index)
  }
  
  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image with Animation */}
          <div className="relative">
            <div className="relative w-full max-w-md mx-auto">
              {/* Book Preview with Rotating Images */}
              <div className="relative hover:animate-none">
                <div className="transition-all duration-300 hover:translate-y-[-5px]">
                  <GuideImageCarousel 
                    images={images}
                    currentIndex={currentImageIndex}
                    setCurrentIndex={setCurrentImageIndex}
                  />
                  
                  {/* Horizontal image slider */}
                  <div className="mt-6 relative flex items-center justify-center">
                    {/* Left arrow */}
                    <button 
                      className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md z-10 hover:bg-white transition-colors"
                      onClick={() => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)}
                      aria-label="Previous image"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                    
                    {/* Thumbnails - now with fixed width container and centered content */}
                    <div className="flex justify-center mx-auto px-12">
                      <div className="flex space-x-4 py-2">
                        {images.map((src, index) => (
                          <div 
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`relative flex-shrink-0 w-16 h-16 rounded-md overflow-hidden cursor-pointer transition-all duration-300 ${
                              index === currentImageIndex 
                                ? 'ring-2 ring-amber-600 scale-105' 
                                : 'ring-1 ring-gray-200 opacity-70 hover:opacity-100'
                            }`}
                          >
                            <img
                              src={src}
                              alt={`Guide preview ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Right arrow */}
                    <button 
                      className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md z-10 hover:bg-white transition-colors"
                      onClick={() => setCurrentImageIndex((prev) => (prev + 1) % images.length)}
                      aria-label="Next image"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="space-y-6 md:max-w-lg">
            <div className="inline-flex items-center px-4 py-2 bg-lavender text-primary rounded-full text-sm font-semibold mb-2">
              Free Resource
            </div>
            <h2 className="text-3xl font-bold text-secondary">Complete Renovation Planning Guide</h2>
            <p className="text-gray text-lg">
              Download our comprehensive guide to planning your renovation project. This step-by-step resource will help you organize your ideas, set a realistic budget, and navigate the entire renovation process with confidence.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mt-1 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Step-by-step planning worksheets</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mt-1 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Budget planning templates</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mt-1 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Contractor interview questions</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mt-1 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Timeline & project management tools</span>
              </li>
            </ul>
            <div className="pt-2">
              <GuideDownloadForm 
                guideTitle="Complete Renovation Planning Guide"
                guideType="renovation"
                downloadUrl="/pdfs/guide.pdf"
                buttonText="Get Free Guide"
                successHeading="Thank you!"
                successMessage="Your guide is ready to download"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 