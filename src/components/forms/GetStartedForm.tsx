'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { track } from '@vercel/analytics'
import ConversionTracker from '@/components/analytics/ConversionTracker'
import GoogleAdsTracker from '@/components/analytics/GoogleAdsTracker'
import { sendFormSubmissionEvent } from '@/lib/fbEvents'

// Step components
const ProjectTypeStep = ({ onNext }: { onNext: (formData: any) => void }) => {
  const projectTypes = [
    { id: 'adu', label: 'Accessory Dwelling Unit (ADU)', image: '/images/projects/adu-1.jpg' },
    { id: 'kitchen', label: 'Kitchen Renovation', image: '/images/projects/kitchen-1.jpg' },
    { id: 'bathroom', label: 'Bathroom Renovation', image: '/images/projects/bathroom-1.jpg' },
    { id: 'addition', label: 'Addition', image: '/images/projects/addition-1.jpg' },
    { id: 'full-home', label: 'Full Home Renovation', image: '/images/projects/full-home-1.jpg' },
    { id: 'new-home', label: 'New Custom Home', image: '/images/projects/new-home-1.jpg' },
  ]

  const [selectedTypes, setSelectedTypes] = useState<string[]>([])

  const toggleSelection = (id: string) => {
    if (selectedTypes.includes(id)) {
      setSelectedTypes(selectedTypes.filter(type => type !== id))
    } else {
      setSelectedTypes([...selectedTypes, id])
    }
  }

  return (
    <div className="animate-fadeIn">
      <div className="flex items-center mb-6">
        <div className="bg-lavender/30 p-3 rounded-full mr-4">
          <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 9.5L12 4L21 9.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M19 13V19.4C19 19.7314 18.7314 20 18.4 20H5.6C5.26863 20 5 19.7314 5 19.4V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-secondary">What type of project are you planning?</h1>
          <p className="text-sm text-gray-500">Select one or more</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-6">
        {projectTypes.map((type, index) => (
          <div 
            key={type.id}
            className={`border rounded-xl overflow-hidden cursor-pointer transition-all duration-300 transform hover:scale-[1.02] hover:shadow-md ${
              selectedTypes.includes(type.id) 
                ? 'border-primary ring-2 ring-primary/20 shadow-md' 
                : 'border-gray/20 hover:border-gray/30'
            }`}
            onClick={() => toggleSelection(type.id)}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="relative h-28 md:h-40 w-full">
              <Image 
                src={type.image} 
                alt={type.label} 
                fill={true}
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
              {selectedTypes.includes(type.id) && (
                <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-1 shadow-md animate-scaleIn">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
            </div>
            <div className="p-3 text-center">
              <div className="text-sm md:text-base font-medium">{type.label}</div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-between items-center">
        <div>
          <p className="text-xs md:text-sm text-gray-500">
            Need help? Call <a href="tel:+19256937590" className="text-primary font-semibold hover:underline">(925) 693-7590</a>
          </p>
        </div>
        <button
          onClick={() => onNext({ projectTypes: selectedTypes })}
          className={`btn btn-primary text-sm px-6 py-3 rounded-lg transform transition-all duration-300 flex items-center ${
            selectedTypes.length === 0 
              ? 'opacity-50 cursor-not-allowed' 
              : 'hover:scale-[1.03] hover:shadow-md'
          }`}
          disabled={selectedTypes.length === 0}
        >
          Next <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  )
}

const ProjectSizeStep = ({ onBack, onNext, formData }: { onBack: () => void, onNext: (formData: any) => void, formData: any }) => {
  const [size, setSize] = useState(getDefaultSize(formData.projectTypes))
  
  // Determine if slider should be shown based on project type
  // eslint-disable-next-line no-unused-vars
  const showSlider = formData.projectTypes.some((type: string) => 
    ['adu', 'addition', 'new-home'].includes(type)
  )
  
  // Get slider min/max values based on project types
  const getSliderConfig = () => {
    if (formData.projectTypes.includes('new-home')) {
      return { min: 500, max: 5000 }
    }
    if (formData.projectTypes.some((type: string) => ['adu', 'addition'].includes(type))) {
      return { min: 115, max: 1200 }
    }
    return { min: 1200, max: 3000 } // fallback
  }
  
  // Set appropriate default size
  function getDefaultSize(projectTypes: string[]) {
    if (projectTypes.includes('new-home')) {
      return 2000
    }
    if (projectTypes.some((type: string) => ['adu', 'addition'].includes(type))) {
      return 500
    }
    return 2000 // fallback
  }
  
  const { min, max } = getSliderConfig()

  return (
    <div className="animate-fadeIn">
      <div className="flex items-center mb-6">
        <div className="bg-lavender/30 p-3 rounded-full mr-4">
          <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 9H6V21H2V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10 3H14V21H10V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M18 12H22V21H18V12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-secondary">What size are you looking to build?</h1>
          <p className="text-sm text-gray-500">
            {showSlider ? (
              formData.projectTypes.includes('new-home') 
                ? 'Custom homes typically range from 1,000 to 5,000+ sq. ft.'
                : 'ADUs and additions typically range from 115 to 1,200 sq. ft.'
            ) : 'We\'ll get detailed requirements in the next steps'}
          </p>
        </div>
      </div>
      
      {showSlider ? (
        <div className="bg-gradient-to-br from-lavender/20 to-lavender/40 rounded-xl p-6 mb-6 shadow-sm">
          <div className="text-center mb-6 transition-all duration-500">
            <div className="inline-block bg-white py-4 px-10 rounded-xl shadow-md transform hover:scale-105 transition-transform duration-300">
              <div className="text-4xl md:text-5xl font-bold text-secondary">{size}</div>
              <div className="text-sm text-primary font-medium">square feet</div>
            </div>
          </div>
          
          <div className="relative mb-6">
            <input 
              type="range" 
              min={min} 
              max={max} 
              step={min < 200 ? 5 : 100} 
              value={size}
              onChange={(e) => setSize(parseInt(e.target.value))}
              className="w-full h-3 bg-white/70 rounded-lg appearance-none cursor-pointer"
              style={{
                backgroundImage: `linear-gradient(to right, #6366f1 0%, #6366f1 ${(size - min) / (max - min) * 100}%, transparent ${(size - min) / (max - min) * 100}%)`,
              }}
            />
            <div className="flex justify-between text-sm text-gray-600 mt-2 font-medium">
              <span>{min} sq. ft.</span>
              <span>{max}+ sq. ft.</span>
            </div>
            <div className="text-center text-sm text-gray-500 mt-3 flex items-center justify-center">
              <svg className="w-5 h-5 mr-1 text-primary animate-pulse" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 10H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 14H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Drag the slider to adjust size
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-br from-lavender/20 to-lavender/40 rounded-xl p-6 mb-6 text-center shadow-sm">
          <div className="flex items-center justify-center mb-3">
            <svg className="w-10 h-10 text-primary/70" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <p className="text-sm md:text-base text-gray-700">
            For {formData.projectTypes.map((type: string) => {
              const labels: Record<string, string> = {
                'kitchen': 'Kitchen Renovations',
                'bathroom': 'Bathroom Renovations',
                'full-home': 'Full Home Renovations'
              };
              return labels[type];
            }).join(', ')}, we'll get more detailed space requirements in the next steps.
          </p>
        </div>
      )}
      
      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="border border-gray/30 px-5 py-3 rounded-lg hover:bg-gray/10 flex items-center text-sm transition-colors duration-300"
        >
          <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back
        </button>
        <button
          onClick={() => onNext({ size: showSlider ? size : null })}
          className="btn btn-primary text-sm px-6 py-3 rounded-lg transform transition-all duration-300 flex items-center hover:scale-[1.03] hover:shadow-md"
        >
          Next 
          <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  )
}

const ProjectProcessStep = ({ onBack, onNext }: { onBack: () => void, onNext: (formData: any) => void }) => {
  const [processStage, setProcessStage] = useState<string | null>(null)

  return (
    <div className="animate-fadeIn">
      <div className="flex items-center mb-6">
        <div className="bg-lavender/30 p-3 rounded-full mr-4">
          <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-secondary">Where are you in the process?</h1>
          <p className="text-sm text-gray-500">
            To provide accurate estimates, contractors require architectural plans.
          </p>
        </div>
      </div>
      
      <div className="space-y-4 mb-8">
        <div 
          className={`border rounded-xl p-4 flex items-center cursor-pointer transition-all duration-300 transform ${
            processStage === 'need-plans' 
              ? 'border-primary bg-lavender/20 shadow-md translate-x-1' 
              : 'border-gray/20 hover:border-gray/40 hover:bg-gray-50'
          }`}
          onClick={() => setProcessStage('need-plans')}
        >
          <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center mr-3 transition-colors duration-300 ${
            processStage === 'need-plans' ? 'border-primary' : 'border-gray/30'
          }`}>
            {processStage === 'need-plans' && (
              <div className="h-3 w-3 rounded-full bg-primary animate-scaleIn"></div>
            )}
          </div>
          <div className="flex-1">
            <div className="font-medium">Getting started and need architectural plans</div>
            <p className="text-xs text-gray-500 mt-1">We'll connect you with architects and designers</p>
          </div>
          {processStage === 'need-plans' && (
            <svg className="w-5 h-5 text-primary ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </div>
        
        <div 
          className={`border rounded-xl p-4 flex items-center cursor-pointer transition-all duration-300 transform ${
            processStage === 'have-plans' 
              ? 'border-primary bg-lavender/20 shadow-md translate-x-1' 
              : 'border-gray/20 hover:border-gray/40 hover:bg-gray-50'
          }`}
          onClick={() => setProcessStage('have-plans')}
        >
          <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center mr-3 transition-colors duration-300 ${
            processStage === 'have-plans' ? 'border-primary' : 'border-gray/30'
          }`}>
            {processStage === 'have-plans' && (
              <div className="h-3 w-3 rounded-full bg-primary animate-scaleIn"></div>
            )}
          </div>
          <div className="flex-1">
            <div className="font-medium">Already have plans and need a contractor</div>
            <p className="text-xs text-gray-500 mt-1">We'll match you with the right contractor for your project</p>
          </div>
          {processStage === 'have-plans' && (
            <svg className="w-5 h-5 text-primary ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </div>
      </div>
      
      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="border border-gray/30 px-5 py-3 rounded-lg hover:bg-gray/10 flex items-center text-sm transition-colors duration-300"
        >
          <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back
        </button>
        <button
          onClick={() => onNext({ processStage })}
          className={`btn btn-primary text-sm px-6 py-3 rounded-lg flex items-center transition-all duration-300 ${
            !processStage 
              ? 'opacity-50 cursor-not-allowed' 
              : 'hover:scale-[1.03] hover:shadow-md'
          }`}
          disabled={!processStage}
        >
          Next 
          <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  )
}

const SuccessStep = ({ onBack, onNext }: { onBack: () => void, onNext: () => void }) => {
  return (
    <div className="flex flex-col md:flex-row animate-fadeIn">
      <div className="w-full md:w-1/2 md:pr-8 mb-6 md:mb-0">
        {/* Success message with enhanced animation */}
        <div className="mb-6 bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-4 shadow-sm transform transition-all duration-500 hover:scale-[1.02]">
          <div className="flex justify-center">
            <div className="bg-white rounded-full p-3 mb-3 shadow-md animate-bounce">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
          </div>
          <p className="text-center text-green-800 font-medium mb-1">Great! Your project is a perfect match.</p>
          <p className="text-center text-xs text-green-700">We're ready to connect you with top professionals</p>
        </div>
        
        <div className="bg-lavender/10 rounded-xl p-6 mb-6">
          <div className="flex items-center mb-3">
            <div className="bg-lavender/30 p-2 rounded-full mr-3">
              <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-secondary">You're in the right place!</h1>
          </div>
          
          <p className="text-sm text-gray-600 mb-4 ml-10">
            We've vetted thousands of pros and onboarded only the <span className="font-bold text-primary">top 5%</span>.
            Our matching process ensures you'll work with professionals who are perfect for your specific project.
          </p>
          
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center text-sm font-medium text-secondary">
              <svg className="w-5 h-5 text-primary mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Just one more step to complete your request!
            </div>
          </div>
        </div>
        
        <div className="flex justify-between mt-4">
          <button
            onClick={onBack}
            className="border border-gray/30 px-5 py-3 rounded-lg hover:bg-gray/10 flex items-center text-sm transition-colors duration-300"
          >
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back
          </button>
          <button
            onClick={onNext}
            className="btn btn-primary text-sm px-6 py-3 rounded-lg transform transition-all duration-300 flex items-center hover:scale-[1.03] hover:shadow-md"
          >
            Continue
            <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
      
      <div className="w-full md:w-1/2 bg-gradient-to-br from-lavender/30 to-lavender/10 rounded-xl p-5 md:p-6">
        <div className="text-center mb-6">
          <div className="bg-white p-4 rounded-xl shadow-md inline-block transform transition-all duration-500 hover:scale-105">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-1">500+</div>
            <div className="text-sm text-secondary font-medium">Vetted Professionals</div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3 text-sm mb-6">
          <div className="bg-white/80 p-3 rounded-lg flex items-center gap-2 shadow-sm transition-transform duration-300 hover:translate-x-1">
            <div className="bg-green-100 p-1 rounded-full">
              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <span className="text-gray-700 font-medium">Rigorous Interview</span>
          </div>
          
          <div className="bg-white/80 p-3 rounded-lg flex items-center gap-2 shadow-sm transition-transform duration-300 hover:translate-x-1">
            <div className="bg-green-100 p-1 rounded-full">
              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <span className="text-gray-700 font-medium">On-Site Evaluation</span>
          </div>
          
          <div className="bg-white/80 p-3 rounded-lg flex items-center gap-2 shadow-sm transition-transform duration-300 hover:translate-x-1">
            <div className="bg-green-100 p-1 rounded-full">
              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <span className="text-gray-700 font-medium">Reference Checks</span>
          </div>
          
          <div className="bg-white/80 p-3 rounded-lg flex items-center gap-2 shadow-sm transition-transform duration-300 hover:translate-x-1">
            <div className="bg-green-100 p-1 rounded-full">
              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <span className="text-gray-700 font-medium">Detailed Bid Review</span>
          </div>
        </div>
        
        <div className="flex justify-center mt-4">
          <div className="grid grid-cols-3 gap-3 w-full">
            <div className="bg-white p-3 rounded-xl shadow-sm text-center transform transition-all duration-300 hover:scale-105">
              <div className="text-2xl font-bold text-primary">60+</div>
              <div className="text-xs text-gray-700">Vetted Professionals</div>
            </div>
            <div className="bg-white p-3 rounded-xl shadow-sm text-center transform transition-all duration-300 hover:scale-105">
              <div className="text-2xl font-bold text-primary">200+</div>
              <div className="text-xs text-gray-700">Homeowners Helped</div>
            </div>
            <div className="bg-white p-3 rounded-xl shadow-sm text-center transform transition-all duration-300 hover:scale-105">
              <div className="text-2xl font-bold text-primary">100%</div>
              <div className="text-xs text-gray-700">Matchmaking Success</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const ContactFormStep = ({ onBack, onNext, formData }: { onBack: () => void, onNext: () => void, formData: any }) => {
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    comments: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [trackConversion, setTrackConversion] = useState(false)
  const [trackGoogleAdsConversion, setTrackGoogleAdsConversion] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    
    // Add special handling for phone number formatting
    if (name === 'phone') {
      // Strip all non-digit characters
      const digitsOnly = value.replace(/\D/g, '')
      
      // Format the phone number as user types
      let formattedPhone = ''
      if (digitsOnly.length === 0) {
        formattedPhone = ''
      } else if (digitsOnly.length <= 3) {
        formattedPhone = `(${digitsOnly}`
      } else if (digitsOnly.length <= 6) {
        formattedPhone = `(${digitsOnly.slice(0, 3)}) ${digitsOnly.slice(3)}`
      } else {
        formattedPhone = `(${digitsOnly.slice(0, 3)}) ${digitsOnly.slice(3, 6)}-${digitsOnly.slice(6, 10)}`
      }
      
      setContactData({
        ...contactData,
        [name]: formattedPhone
      })
    } else {
      setContactData({
        ...contactData,
        [name]: value
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    
    // Only proceed if the form is valid
    const form = e.target as HTMLFormElement
    if (form.checkValidity()) {
      setIsSubmitting(true)
      setError(null)
      
      try {
        // Map project types to their full labels
        const projectTypeLabels = formData.projectTypes.map((type: string) => {
          const labels: Record<string, string> = {
            'adu': 'Accessory Dwelling Unit (ADU)',
            'kitchen': 'Kitchen Renovation',
            'bathroom': 'Bathroom Renovation',
            'addition': 'Addition',
            'full-home': 'Full Home Renovation',
            'new-home': 'New Custom Home',
          };
          return labels[type] || type;
        }).join(', ');

        // Map process stage to its full label
        const processStageLabel = {
          'need-plans': 'Need architectural plans or designs',
          'have-plans': 'Have architectural plans, need contractor'
        }[formData.processStage as keyof typeof processStageLabels] || formData.processStage;

        // Create a project summary string
        const projectSummary = `Project Type: ${projectTypeLabels}
        Size: ${formData.size ? `${formData.size} sq ft` : 'N/A'}
        Stage: ${processStageLabel}`;

        // Prepare data for GHL submission - mapping fields to match validation schema
        const ghlData = {
          name: contactData.name,
          email: contactData.email,
          phone: contactData.phone,
          propertyAddress: contactData.address,
          propertyCity: contactData.city,
          propertyState: contactData.state,
          propertyZip: "00000", // skip zip code validation
          projectType: formData.projectTypes.join(', '),
          projectDescription: projectSummary,
          project_size: formData.size ? `${formData.size} sq ft` : 'N/A',
          project_stage: processStageLabel,
          project_types_full: projectTypeLabels,
          additional_comments: contactData.comments || 'None provided'
        }
        
        // Send data to our API route that connects to GoHighLevel
        const response = await fetch('/api/submit-get-started', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(ghlData),
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
        
        // Enable tracking and immediately move to success step
        setTrackConversion(true)
        setTrackGoogleAdsConversion(true)
        
        // Track form submission with Vercel Analytics
        track('GetStartedFormSubmission', {
          formType: 'get-started',
          projectTypes: formData.projectTypes,
          projectSize: formData.size,
          projectStage: formData.processStage,
          location: window.location.pathname
        });
        
        // Send event to Facebook Conversions API
        sendFormSubmissionEvent('get_started', {
          email: contactData.email,
          phone: contactData.phone,
          firstName: contactData.name.split(' ')[0],
          lastName: contactData.name.includes(' ') ? contactData.name.split(' ').slice(1).join(' ') : ''
        }, {
          location: window.location.pathname,
          projectTypes: formData.projectTypes,
          projectSize: formData.size,
          projectStage: formData.processStage,
          propertyAddress: contactData.address,
          propertyCity: contactData.city,
          propertyState: contactData.state,
          projectDescription: projectSummary
        });
        
        onNext()
      } catch (err) {
        console.error('Error submitting form:', err);
        
        // Track form error with Vercel Analytics
        track('GetStartedFormError', {
          formType: 'get-started',
          error: err instanceof Error ? err.message : 'Unknown error'
        });
        
        setError(err instanceof Error ? err.message : 'Failed to submit form');
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  // Determine if we should show validation errors
  const shouldShowError = (fieldName: string) => {
    if (!submitted) return false;
    
    const inputElem = document.getElementById(fieldName) as HTMLInputElement;
    return inputElem ? !inputElem.validity.valid : false;
  };

  const projectTypeLabels: Record<string, string> = {
    'adu': 'Accessory Dwelling Unit (ADU)',
    'kitchen': 'Kitchen Renovation',
    'bathroom': 'Bathroom Renovation',
    'addition': 'Addition',
    'full-home': 'Full Home Renovation',
    'new-home': 'New Custom Home',
  }

  const processStageLabels: Record<string, string> = {
    'need-plans': 'Need architectural plans or designs',
    'have-plans': 'Have architectural plans, need contractor'
  }

  return (
    <div className="animate-fadeIn">
      {trackConversion && <ConversionTracker conversionType="get_started_form" value={1.0} />}
      {trackGoogleAdsConversion && <GoogleAdsTracker conversionLabel="form_submission" conversionValue={1.0} />}
      
      <div className="flex items-center mb-6">
        <div className="bg-lavender/30 p-3 rounded-full mr-4">
          <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-secondary">Almost there!</h1>
          <p className="text-sm text-gray-500">
            Please provide your contact information to connect with our vetted professionals.
          </p>
        </div>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 text-red-800 p-4 rounded-xl border-l-4 border-red-500 flex items-center text-sm animate-fadeIn">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-red-600" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <div>
            <p className="font-medium">There was a problem with your submission</p>
            <p className="text-xs mt-1">{error}</p>
          </div>
        </div>
      )}

      <div className="mb-6 p-4 bg-gradient-to-br from-lavender/20 to-lavender/5 rounded-xl shadow-sm">
        <h3 className="font-semibold text-secondary mb-3 flex items-center">
          <svg className="w-4 h-4 mr-2 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 5H7C6.46957 5 5.96086 5.21071 5.58579 5.58579C5.21071 5.96086 5 6.46957 5 7V19C5 19.5304 5.21071 20.0391 5.58579 20.4142C5.96086 20.7893 6.46957 21 7 21H17C17.5304 21 18.0391 20.7893 18.4142 20.4142C18.7893 20.0391 19 19.5304 19 19V7C19 6.46957 18.7893 5.96086 18.4142 5.58579C18.0391 5.21071 17.5304 5 17 5H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 5C9 4.46957 9.21071 3.96086 9.58579 3.58579C9.96086 3.21071 10.4696 3 11 3H13C13.5304 3 14.0391 3.21071 14.4142 3.58579C14.7893 3.96086 15 4.46957 15 5C15 5.53043 14.7893 6.03914 14.4142 6.41421C14.0391 6.78929 13.5304 7 13 7H11C10.4696 7 9.96086 6.78929 9.58579 6.41421C9.21071 6.03914 9 5.53043 9 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Project Summary
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="bg-white/70 p-3 rounded-lg">
            <p className="text-xs text-gray-500 mb-1">Project Type</p>
            <p className="font-medium text-sm">
              {formData.projectTypes.map((type: string) => projectTypeLabels[type]).join(', ')}
            </p>
          </div>
          <div className="bg-white/70 p-3 rounded-lg">
            <p className="text-xs text-gray-500 mb-1">Project Size</p>
            <p className="font-medium text-sm">{formData.size ? `${formData.size} sq. ft.` : 'N/A'}</p>
          </div>
          <div className="bg-white/70 p-3 rounded-lg">
            <p className="text-xs text-gray-500 mb-1">Process Stage</p>
            <p className="font-medium text-sm">{processStageLabels[formData.processStage]}</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate className="transition-all duration-300">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="transition-all duration-300 transform hover:translate-y-[-2px]">
            <label htmlFor="name" className="block text-xs font-medium text-gray-700 mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <div className={`relative rounded-lg overflow-hidden transition-all duration-300 ${shouldShowError('name') ? 'ring-2 ring-red-500' : 'focus-within:ring-2 focus-within:ring-primary/30'}`}>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <input
                type="text"
                id="name"
                name="name"
                value={contactData.name}
                onChange={handleChange}
                className="w-full p-3 pl-10 text-sm border border-gray/30 rounded-lg focus:outline-none"
                placeholder="Your full name"
                required
              />
            </div>
            {shouldShowError('name') && (
              <p className="text-red-500 text-xs mt-1 animate-fadeIn">Please enter your name</p>
            )}
          </div>
          
          <div className="transition-all duration-300 transform hover:translate-y-[-2px]">
            <label htmlFor="email" className="block text-xs font-medium text-gray-700 mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <div className={`relative rounded-lg overflow-hidden transition-all duration-300 ${shouldShowError('email') ? 'ring-2 ring-red-500' : 'focus-within:ring-2 focus-within:ring-primary/30'}`}>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <input
                type="email"
                id="email"
                name="email"
                value={contactData.email}
                onChange={handleChange}
                className="w-full p-3 pl-10 text-sm border border-gray/30 rounded-lg focus:outline-none"
                placeholder="you@example.com"
                required
              />
            </div>
            {shouldShowError('email') && (
              <p className="text-red-500 text-xs mt-1 animate-fadeIn">Please enter a valid email address</p>
            )}
          </div>
          
          <div className="transition-all duration-300 transform hover:translate-y-[-2px]">
            <label htmlFor="phone" className="block text-xs font-medium text-gray-700 mb-1">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <div className={`relative rounded-lg overflow-hidden transition-all duration-300 ${shouldShowError('phone') ? 'ring-2 ring-red-500' : 'focus-within:ring-2 focus-within:ring-primary/30'}`}>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7294C21.7209 20.9845 21.5573 21.2136 21.3521 21.4019C21.1468 21.5901 20.9046 21.7335 20.6407 21.8227C20.3769 21.9119 20.0974 21.9451 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77383 17.3147 6.72534 15.2662 5.19 12.85C3.49998 10.2412 2.44824 7.271 2.12 4.18C2.09501 3.90347 2.12788 3.62476 2.21649 3.36162C2.30511 3.09849 2.44756 2.85669 2.63476 2.65162C2.82196 2.44655 3.0498 2.28271 3.30379 2.17052C3.55777 2.05833 3.83233 2.00026 4.11 2H7.11C7.59531 1.99522 8.06579 2.16708 8.43376 2.48353C8.80173 2.79999 9.04208 3.23945 9.11 3.72C9.23679 4.68007 9.47347 5.62273 9.81 6.53C9.94455 6.88792 9.97366 7.27691 9.8939 7.65088C9.81415 8.02485 9.62886 8.36811 9.36 8.64L8.09 9.91C9.51356 12.4135 11.5865 14.4864 14.09 15.91L15.36 14.64C15.6319 14.3711 15.9752 14.1858 16.3491 14.1061C16.7231 14.0263 17.1121 14.0554 17.47 14.19C18.3773 14.5265 19.3199 14.7632 20.28 14.89C20.7658 14.9585 21.2094 15.2032 21.5265 15.5775C21.8437 15.9518 22.0122 16.4296 22 16.92Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={contactData.phone}
                onChange={handleChange}
                className="w-full p-3 pl-10 text-sm border border-gray/30 rounded-lg focus:outline-none"
                placeholder="(123) 456-7890"
                required
              />
            </div>
            {shouldShowError('phone') && (
              <p className="text-red-500 text-xs mt-1 animate-fadeIn">Please enter a valid phone number</p>
            )}
          </div>
          
          <div className="md:col-span-2 transition-all duration-300 transform hover:translate-y-[-2px]">
            <label htmlFor="address" className="block text-xs font-medium text-gray-700 mb-1">
              Street Address <span className="text-red-500">*</span>
            </label>
            <div className={`relative rounded-lg overflow-hidden transition-all duration-300 ${shouldShowError('address') ? 'ring-2 ring-red-500' : 'focus-within:ring-2 focus-within:ring-primary/30'}`}>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <input
                type="text"
                id="address"
                name="address"
                value={contactData.address}
                onChange={handleChange}
                className="w-full p-3 pl-10 text-sm border border-gray/30 rounded-lg focus:outline-none"
                placeholder="Enter your street address"
                required
              />
            </div>
            {shouldShowError('address') && (
              <p className="text-red-500 text-xs mt-1 animate-fadeIn">Please enter your street address</p>
            )}
          </div>
          
          <div className="transition-all duration-300 transform hover:translate-y-[-2px]">
            <label htmlFor="city" className="block text-xs font-medium text-gray-700 mb-1">
              City <span className="text-red-500">*</span>
            </label>
            <div className={`relative rounded-lg overflow-hidden transition-all duration-300 ${shouldShowError('city') ? 'ring-2 ring-red-500' : 'focus-within:ring-2 focus-within:ring-primary/30'}`}>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <input
                type="text"
                id="city"
                name="city"
                value={contactData.city}
                onChange={handleChange}
                className="w-full p-3 pl-10 text-sm border border-gray/30 rounded-lg focus:outline-none"
                placeholder="San Francisco"
                required
              />
            </div>
            {shouldShowError('city') && (
              <p className="text-red-500 text-xs mt-1 animate-fadeIn">Please enter your city</p>
            )}
          </div>
          
          <div className="transition-all duration-300 transform hover:translate-y-[-2px]">
            <label htmlFor="state" className="block text-xs font-medium text-gray-700 mb-1">
              State <span className="text-red-500">*</span>
            </label>
            <div className={`relative rounded-lg overflow-hidden transition-all duration-300 ${shouldShowError('state') ? 'ring-2 ring-red-500' : 'focus-within:ring-2 focus-within:ring-primary/30'}`}>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <input
                type="text"
                id="state"
                name="state"
                value={contactData.state}
                onChange={handleChange}
                className="w-full p-3 pl-10 text-sm border border-gray/30 rounded-lg focus:outline-none"
                placeholder="CA"
                required
              />
            </div>
            {shouldShowError('state') && (
              <p className="text-red-500 text-xs mt-1 animate-fadeIn">Please enter your state</p>
            )}
          </div>

          <div className="md:col-span-2 transition-all duration-300 transform hover:translate-y-[-2px]">
            <label htmlFor="comments" className="block text-xs font-medium text-gray-700 mb-1">
              Additional Comments (Optional)
            </label>
            <div className="relative rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-primary/30">
              <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <textarea
                id="comments"
                name="comments"
                value={contactData.comments}
                onChange={handleChange}
                className="w-full p-3 pl-10 text-sm border border-gray/30 rounded-lg focus:outline-none h-16 md:h-24"
                placeholder="Tell us more about your project requirements..."
              />
            </div>
          </div>
        </div>
        
        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={onBack}
            className="border border-gray/30 px-5 py-3 rounded-lg hover:bg-gray/10 flex items-center text-sm transition-colors duration-300"
          >
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back
          </button>
          <button
            type="submit"
            className={`btn btn-primary text-sm px-6 py-3 rounded-lg transition-all duration-300 flex items-center ${
              !isSubmitting && 'hover:scale-[1.03] hover:shadow-md'
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </span>
            ) : (
              <>
                Submit
                <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default function GetStartedForm() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    projectTypes: [],
    size: null,
    processStage: null
  })

  const handleNext = (data: any) => {
    const updatedFormData = { ...formData, ...data }
    setFormData(updatedFormData)
    
    // If we're on step 1 (project type) and the selected types don't need size info, skip to step 3
    if (step === 1 && !needsSizeInfo(updatedFormData.projectTypes)) {
      setStep(3) // Skip to ProcessStep
    } else {
      setStep(step + 1)
    }
  }
  
  // Helper function to determine if size information is needed
  const needsSizeInfo = (projectTypes: string[]) => {
    return projectTypes.some(type => ['adu', 'addition', 'new-home'].includes(type))
  }

  const handleBack = () => {
    // If we're on step 3 and we skipped step 2, go back to step 1
    if (step === 3 && !needsSizeInfo(formData.projectTypes)) {
      setStep(1)
    } else {
      setStep(step - 1)
    }
  }

  const handleFinish = () => {
    router.push('/thank-you')
  }

  // Handle navigation to a specific step (only for completed steps)
  const handleStepClick = (clickedStep: number) => {
    // Only allow going back to completed steps
    if (clickedStep < step) {
      // Special case for skipped size step
      if (clickedStep === 2 && !needsSizeInfo(formData.projectTypes)) {
        setStep(1) // Go back to step 1 if size step was skipped
      } else {
        setStep(clickedStep)
      }
    }
  }

  // Step icons for the progress bar
  const stepIcons = [
    <svg key="1" className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 9.5L12 4L21 9.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M19 13V19.4C19 19.7314 18.7314 20 18.4 20H5.6C5.26863 20 5 19.7314 5 19.4V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>,
    <svg key="2" className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 7H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>,
    <svg key="3" className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>,
    <svg key="4" className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>,
    <svg key="5" className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ]

  return (
    <div className="bg-white shadow-lg rounded-xl p-5 md:p-8 border border-gray-100">
      {/* Progress indicator - enhanced with icons */}
      <div className="mb-6 md:mb-8">
        <div className="hidden md:flex justify-between mb-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div 
              key={i} 
              className={`flex flex-col items-center ${i <= step ? 'text-primary' : 'text-gray/40'}`}
            >
              <button
                onClick={() => handleStepClick(i)}
                disabled={i >= step}
                aria-label={`Go to step ${i}: ${i === 1 ? "Type" : i === 2 ? "Size" : i === 3 ? "Stage" : i === 4 ? "Contact" : "Success"}`}
                className={`h-10 w-10 rounded-full flex items-center justify-center mb-1 transition-all duration-300 ${
                  i < step 
                    ? 'bg-primary text-white hover:bg-primary/80 cursor-pointer' 
                    : i === step 
                      ? 'border-2 border-primary text-primary cursor-default' 
                      : 'border border-gray/30 cursor-default'
                }`}
              >
                {i < step ? (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  stepIcons[i-1]
                )}
              </button>
              <span className="text-xs font-medium hidden lg:block">
                {i === 1 ? "Type" : i === 2 ? "Size" : i === 3 ? "Stage" : i === 4 ? "Contact" : "Success"}
              </span>
            </div>
          ))}
        </div>
        <div className="w-full bg-gray/10 h-2 rounded-full overflow-hidden">
          <div 
            className="bg-primary h-full transition-all duration-500 ease-in-out"
            style={{ width: `${(step / 5) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Form steps - with animations */}
      <div className="flex flex-col">
        <div className={`transition-opacity duration-300 ${step === 1 ? 'opacity-100' : 'opacity-0 hidden'}`}>
          {step === 1 && <ProjectTypeStep onNext={handleNext} />}
        </div>
        <div className={`transition-opacity duration-300 ${step === 2 ? 'opacity-100' : 'opacity-0 hidden'}`}>
          {step === 2 && <ProjectSizeStep onBack={handleBack} onNext={handleNext} formData={formData} />}
        </div>
        <div className={`transition-opacity duration-300 ${step === 3 ? 'opacity-100' : 'opacity-0 hidden'}`}>
          {step === 3 && <ProjectProcessStep onBack={handleBack} onNext={handleNext} />}
        </div>
        <div className={`transition-opacity duration-300 ${step === 4 ? 'opacity-100' : 'opacity-0 hidden'}`}>
          {step === 4 && <ContactFormStep onBack={handleBack} onNext={() => setStep(5)} formData={formData} />}
        </div>
        <div className={`transition-opacity duration-300 ${step === 5 ? 'opacity-100' : 'opacity-0 hidden'}`}>
          {step === 5 && <SuccessStep onBack={handleBack} onNext={handleFinish} />}
        </div>
      </div>
    </div>
  )
} 