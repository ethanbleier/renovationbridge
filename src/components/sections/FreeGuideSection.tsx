"use client"

import GuideImageCarousel from '@/components/ui/GuideImageCarousel'
import GuideDownloadForm from '@/components/forms/GuideDownloadForm'

export default function FreeGuideSection() {
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
                    images={[
                      "/images/guide/ajar.png",
                      "/images/guide/double.png",
                      "/images/guide/open.png",
                    ]} 
                  />
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