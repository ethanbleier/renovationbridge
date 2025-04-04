'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import ConversionTracker from '@/components/analytics/ConversionTracker'
import GoogleAdsTracker from '@/components/analytics/GoogleAdsTracker'

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
    <div>
      <h1 className="text-2xl md:text-3xl font-bold text-secondary mb-2">What type of project are you planning?</h1>
      <p className="text-sm text-gray mb-3">Select one or more</p>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 mb-4">
        {projectTypes.map((type) => (
          <div 
            key={type.id}
            className={`border rounded-lg p-2 cursor-pointer transition-all ${
              selectedTypes.includes(type.id) 
                ? 'border-primary ring-1 ring-primary/20' 
                : 'border-gray/20 hover:border-gray/30'
            }`}
            onClick={() => toggleSelection(type.id)}
          >
            <div className="relative h-24 md:h-40 w-full mb-2">
              <Image 
                src={type.image} 
                alt={type.label} 
                fill={true}
                sizes="(max-width: 768px) 50vw, 33vw"
                className="rounded-md object-cover"
              />
            </div>
            <div className="text-center text-xs md:text-sm font-medium">{type.label}</div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-between items-center mt-4">
        <div>
          <p className="text-xs md:text-sm text-gray">
            <a href="tel:+19256937590" className="text-primary underline">(925) 693-7590</a>
          </p>
        </div>
        <button
          onClick={() => onNext({ projectTypes: selectedTypes })}
          className="btn btn-primary text-sm"
          disabled={selectedTypes.length === 0}
        >
          Next <span className="ml-1">→</span>
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
    <div>
      <h1 className="text-2xl md:text-3xl font-bold text-secondary mb-2">What size are you looking to build?</h1>
      
      {showSlider ? (
        <>
          <p className="text-xs md:text-sm text-gray mb-3">
            {formData.projectTypes.includes('new-home') 
              ? 'Custom homes typically range from 1,000 to 5,000+ sq. ft.'
              : 'ADUs and additions typically range from 115 to 1,200 sq. ft.'}
          </p>
          
          <div className="bg-lavender rounded-lg p-4 mb-4">
            <div className="text-center mb-4">
              <div className="inline-block bg-white py-2 px-6 md:py-4 md:px-12 rounded-lg shadow-sm">
                <div className="text-3xl md:text-5xl font-bold text-secondary">{size}</div>
                <div className="text-xs md:text-sm text-primary">sq. ft.</div>
              </div>
            </div>
            
            <div className="relative mb-2">
              <input 
                type="range" 
                min={min} 
                max={max} 
                step={min < 200 ? 5 : 100} 
                value={size}
                onChange={(e) => setSize(parseInt(e.target.value))}
                className="w-full h-2 bg-gray/20 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray mt-1">
                <span>{min} sq. ft.</span>
                <span>{max}+ sq. ft.</span>
              </div>
              <div className="text-center text-xs text-gray mt-2">
                <span className="flex items-center justify-center gap-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Drag the slider
                </span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-lavender rounded-lg p-4 mb-4 text-center">
          <p className="mb-2 text-xs md:text-sm text-gray-700">
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
      
      <div className="flex justify-between mt-4">
        <button
          onClick={onBack}
          className="border border-gray/30 px-4 py-2 rounded-md hover:bg-gray/10 flex items-center text-sm"
        >
          <span className="mr-1">←</span> Back
        </button>
        <button
          onClick={() => onNext({ size: showSlider ? size : null })}
          className="btn btn-primary text-sm"
        >
          Next <span className="ml-1">→</span>
        </button>
      </div>
    </div>
  )
}

const ProjectProcessStep = ({ onBack, onNext }: { onBack: () => void, onNext: (formData: any) => void }) => {
  const [processStage, setProcessStage] = useState<string | null>(null)

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold text-secondary mb-2">Where are you in the process?</h1>
      <p className="text-xs md:text-sm text-gray mb-3">
        To provide accurate estimates, contractors require architectural plans.
      </p>
      
      <div className="space-y-3 mb-4">
        <div 
          className={`border rounded-lg p-3 flex items-center cursor-pointer ${
            processStage === 'need-plans' ? 'border-primary bg-lavender/50' : 'border-gray/20'
          }`}
          onClick={() => setProcessStage('need-plans')}
        >
          <div className="h-5 w-5 rounded-full border border-gray/30 mr-2 flex items-center justify-center">
            {processStage === 'need-plans' && (
              <div className="h-3 w-3 rounded-full bg-primary"></div>
            )}
          </div>
          <span className="text-xs md:text-sm font-medium">Getting started and need architectural plans</span>
        </div>
        
        <div 
          className={`border rounded-lg p-3 flex items-center cursor-pointer ${
            processStage === 'have-plans' ? 'border-primary bg-lavender/50' : 'border-gray/20'
          }`}
          onClick={() => setProcessStage('have-plans')}
        >
          <div className="h-5 w-5 rounded-full border border-gray/30 mr-2 flex items-center justify-center">
            {processStage === 'have-plans' && (
              <div className="h-3 w-3 rounded-full bg-primary"></div>
            )}
          </div>
          <span className="text-xs md:text-sm font-medium">Already have plans and need a contractor</span>
        </div>
      </div>
      
      <div className="flex justify-between mt-4">
        <button
          onClick={onBack}
          className="border border-gray/30 px-4 py-2 rounded-md hover:bg-gray/10 flex items-center text-sm"
        >
          <span className="mr-1">←</span> Back
        </button>
        <button
          onClick={() => onNext({ processStage })}
          className="btn btn-primary text-sm flex items-center"
          disabled={!processStage}
        >
          Next <span className="ml-1">→</span>
        </button>
      </div>
    </div>
  )
}

const SuccessStep = ({ onBack, onNext }: { onBack: () => void, onNext: () => void }) => {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 md:pr-8 mb-4 md:mb-0">
        {/* Success checkmark card */}
        <div className="mb-3 bg-green-50 rounded-lg p-3 shadow-sm border border-green-100">
          <div className="flex justify-center">
            <div className="bg-green-100 rounded-full p-2 mb-2">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
          </div>
          <p className="text-center text-xs md:text-sm text-green-800 font-medium">Great! Your project is a perfect match.</p>
        </div>
        
        <h1 className="text-xl md:text-3xl font-bold text-secondary mb-2">You're in the right place!</h1>
        
        <p className="text-xs md:text-sm text-gray mb-3">
          We've vetted thousands of pros and onboarded only the <strong>top 5%</strong>.
        </p>
        
        <div className="flex justify-between mt-4">
          <button
            onClick={onBack}
            className="border border-gray/30 px-4 py-2 rounded-md hover:bg-gray/10 flex items-center text-sm"
          >
            <span className="mr-1">←</span> Back
          </button>
          <button
            onClick={onNext}
            className="btn btn-primary text-sm flex items-center"
          >
            Next <span className="ml-1">→</span>
          </button>
        </div>
      </div>
      
      <div className="w-full md:w-1/2 bg-lavender/50 rounded-lg p-3 md:p-6">
        <div className="text-center mb-4">
          <div className="bg-white p-2 md:p-4 rounded-lg shadow-sm inline-block">
            <div className="text-2xl md:text-4xl font-bold text-primary mb-1">500+</div>
            <div className="text-xs md:text-sm text-secondary font-medium">Vetted Professionals</div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-xs md:text-sm">
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span className="text-gray-700">Interview</span>
          </div>
          
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span className="text-gray-700">Site Walk</span>
          </div>
          
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span className="text-gray-700">Reference Checks</span>
          </div>
          
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span className="text-gray-700">Bid Review</span>
          </div>
        </div>
        
        <div className="flex justify-center mt-4">
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-white p-2 rounded-lg shadow-sm text-center">
              <div className="text-xl font-bold text-primary">96%</div>
              <div className="text-[10px] md:text-xs text-gray-700">Satisfaction</div>
            </div>
            <div className="bg-white p-2 rounded-lg shadow-sm text-center">
              <div className="text-xl font-bold text-primary">5%</div>
              <div className="text-[10px] md:text-xs text-gray-700">Top Talent</div>
            </div>
            <div className="bg-white p-2 rounded-lg shadow-sm text-center">
              <div className="text-xl font-bold text-primary">10+</div>
              <div className="text-[10px] md:text-xs text-gray-700">Years Exp</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const ContactFormStep = ({ onBack, onFinish, formData }: { onBack: () => void, onFinish: () => void, formData: any }) => {
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
  const [isSuccess, setIsSuccess] = useState(false)
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
        
        setIsSuccess(true)
        setTrackConversion(true)
        setTrackGoogleAdsConversion(true)
        onFinish()
      } catch (err) {
        console.error('Error submitting form:', err);
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
    <div>
      {trackConversion && <ConversionTracker conversionType="get_started_form" value={1.0} />}
      {trackGoogleAdsConversion && <GoogleAdsTracker conversionLabel="form_submission" conversionValue={1.0} />}
      
      <h1 className="text-xl md:text-3xl font-bold text-secondary mb-2 md:mb-4">Almost there!</h1>
      <p className="text-xs md:text-sm text-gray mb-3 md:mb-6">
        Please provide your contact information to connect with our vetted professionals.
      </p>

      {isSuccess && (
        <div className="mb-3 md:mb-6 bg-green-50 text-green-800 p-3 rounded-md border-l-4 border-green-500 flex items-center text-xs md:text-sm">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
          Thank you! We'll be in touch with you soon.
        </div>
      )}
      
      {error && (
        <div className="mb-3 md:mb-6 bg-red-50 text-red-800 p-3 rounded-md border-l-4 border-red-500 flex items-center text-xs md:text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </div>
      )}

      <div className="mb-3 md:mb-6 p-3 bg-lavender/20 rounded-lg">
        <h3 className="font-semibold text-secondary mb-2 text-sm">Project Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
          <div>
            <p className="text-xs text-gray">Project Type</p>
            <p className="font-medium text-xs md:text-sm">
              {formData.projectTypes.map((type: string) => projectTypeLabels[type]).join(', ')}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray">Project Size</p>
            <p className="font-medium text-xs md:text-sm">{formData.size} sq. ft.</p>
          </div>
          <div>
            <p className="text-xs text-gray">Process Stage</p>
            <p className="font-medium text-xs md:text-sm">{processStageLabels[formData.processStage]}</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-6">
          <div>
            <label htmlFor="name" className="block text-xs font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={contactData.name}
              onChange={handleChange}
              className={`w-full p-2 md:p-3 text-sm border ${shouldShowError('name') ? 'border-red-500' : 'border-gray/30'} rounded-md`}
              placeholder="Your full name"
              required
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-xs font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={contactData.email}
              onChange={handleChange}
              className={`w-full p-2 md:p-3 text-sm border ${shouldShowError('email') ? 'border-red-500' : 'border-gray/30'} rounded-md`}
              placeholder="you@example.com"
              required
            />
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-xs font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={contactData.phone}
              onChange={handleChange}
              className={`w-full p-2 md:p-3 text-sm border ${shouldShowError('phone') ? 'border-red-500' : 'border-gray/30'} rounded-md`}
              placeholder="(123) 456-7890"
              required
            />
            {shouldShowError('phone') && (
              <p className="text-red-500 text-xs mt-1">Please enter a valid phone number</p>
            )}
          </div>
          
          <div className="md:col-span-2">
            <label htmlFor="address" className="block text-xs font-medium text-gray-700 mb-1">
              Street Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={contactData.address}
              onChange={handleChange}
              className={`w-full p-2 md:p-3 text-sm border ${shouldShowError('address') ? 'border-red-500' : 'border-gray/30'} rounded-md`}
              placeholder="Enter your street address"
              required
            />
          </div>
          
          <div>
            <label htmlFor="city" className="block text-xs font-medium text-gray-700 mb-1">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={contactData.city}
              onChange={handleChange}
              className={`w-full p-2 md:p-3 text-sm border ${shouldShowError('city') ? 'border-red-500' : 'border-gray/30'} rounded-md`}
              placeholder="San Francisco"
              required
            />
          </div>
          
          <div>
            <label htmlFor="state" className="block text-xs font-medium text-gray-700 mb-1">
              State
            </label>
            <input
              type="text"
              id="state"
              name="state"
              value={contactData.state}
              onChange={handleChange}
              className={`w-full p-2 md:p-3 text-sm border ${shouldShowError('state') ? 'border-red-500' : 'border-gray/30'} rounded-md`}
              placeholder="CA"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="comments" className="block text-xs font-medium text-gray-700 mb-1">
              Additional Comments (Optional)
            </label>
            <textarea
              id="comments"
              name="comments"
              value={contactData.comments}
              onChange={handleChange}
              className={`w-full p-2 md:p-3 text-sm border ${shouldShowError('comments') ? 'border-red-500' : 'border-gray/30'} rounded-md h-16 md:h-24`}
              placeholder="Tell us more about your project requirements..."
            />
          </div>
        </div>
        
        <div className="flex justify-between mt-4 md:mt-8">
          <button
            type="button"
            onClick={onBack}
            className="border border-gray/30 px-4 py-2 rounded-md hover:bg-gray/10 flex items-center text-sm"
          >
            <span className="mr-1">←</span> Back
          </button>
          <button
            type="submit"
            className="btn btn-primary text-sm"
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
              <>Submit <span className="ml-1">→</span></>
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

  return (
    <div className="bg-white shadow-sm rounded-lg p-4 md:p-6 max-h-[calc(100vh-4rem)] overflow-y-auto">
      {/* Progress indicator */}
      <div className="mb-4 md:mb-8">
        <div className="w-full bg-gray/20 h-1 mb-1 md:mb-2 rounded-full overflow-hidden">
          <div 
            className="bg-primary h-full transition-all duration-300 ease-in-out" 
            style={{ width: `${(step / 5) * 100}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-[10px] md:text-xs text-gray">
          <span>Start</span>
          <span>Complete</span>
        </div>
      </div>

      {/* Form steps */}
      <div className="min-h-[50vh] md:min-h-[60vh] flex flex-col">
        {step === 1 && <ProjectTypeStep onNext={handleNext} />}
        {step === 2 && <ProjectSizeStep onBack={handleBack} onNext={handleNext} formData={formData} />}
        {step === 3 && <ProjectProcessStep onBack={handleBack} onNext={handleNext} />}
        {step === 4 && <SuccessStep onBack={handleBack} onNext={() => setStep(step + 1)} />}
        {step === 5 && <ContactFormStep onBack={handleBack} onFinish={handleFinish} formData={formData} />}
      </div>
    </div>
  )
} 