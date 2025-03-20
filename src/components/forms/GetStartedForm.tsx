'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

// Step components
const ProjectTypeStep = ({ onNext }: { onNext: (data: any) => void }) => {
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
      <h1 className="text-3xl font-bold text-secondary mb-4">What type of project are you planning?</h1>
      <p className="text-gray mb-6">Select one or more</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {projectTypes.map((type) => (
          <div 
            key={type.id}
            className={`border rounded-lg p-4 cursor-pointer transition-all ${
              selectedTypes.includes(type.id) 
                ? 'border-primary ring-2 ring-primary/20' 
                : 'border-gray/20 hover:border-gray/30'
            }`}
            onClick={() => toggleSelection(type.id)}
          >
            <div className="aspect-w-16 aspect-h-9 mb-4">
              <Image 
                src={type.image} 
                alt={type.label} 
                width={300} 
                height={200}
                className="rounded-md object-cover"
              />
            </div>
            <div className="text-center font-medium">{type.label}</div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-between mt-8">
        <div>
          <p className="text-sm text-gray">
            Don't see your project type? Chat with our team <a href="tel:+19256937590" className="text-primary underline">(925) 693-7590</a>
          </p>
        </div>
        <button
          onClick={() => onNext({ projectTypes: selectedTypes })}
          className="btn btn-primary"
        >
          Next <span className="ml-1">→</span>
        </button>
      </div>
    </div>
  )
}

const ProjectSizeStep = ({ onBack, onNext, formData }: { onBack: () => void, onNext: (data: any) => void, formData: any }) => {
  const [size, setSize] = useState(getDefaultSize(formData.projectTypes))
  
  // Determine if slider should be shown based on project type
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
      <h1 className="text-3xl font-bold text-secondary mb-4">What size are you looking to build?</h1>
      
      {showSlider ? (
        <>
          <p className="text-gray mb-6">
            {formData.projectTypes.includes('new-home') 
              ? 'Custom homes typically range from 1,000 to 5,000+ sq. ft. depending on your needs.'
              : 'ADUs and additions typically range from 115 to 1,200 sq. ft.'}
          </p>
          
          <div className="bg-lavender rounded-lg p-8 mb-8">
            <div className="text-center mb-8">
              <div className="inline-block bg-white py-4 px-12 rounded-lg shadow-sm">
                <div className="text-5xl font-bold text-secondary">{size}</div>
                <div className="text-primary">sq. ft.</div>
              </div>
            </div>
            
            <div className="relative mb-4">
              <input 
                type="range" 
                min={min} 
                max={max} 
                step={min < 200 ? 5 : 100} 
                value={size}
                onChange={(e) => setSize(parseInt(e.target.value))}
                className="w-full h-2 bg-gray/20 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray mt-2">
                <span>{min} sq. ft.</span>
                <span>{max}+ sq. ft.</span>
              </div>
              <div className="text-center text-sm text-gray mt-4">
                <span className="flex items-center justify-center gap-1">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Drag the slider
                </span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-lavender rounded-lg p-8 mb-8 text-center">
          <p className="mb-4 text-gray-700">
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
      
      <div className="flex justify-between mt-8">
        <button
          onClick={onBack}
          className="border border-gray/30 px-6 py-2 rounded-md hover:bg-gray/10 flex items-center"
        >
          <span className="mr-1">←</span> Back
        </button>
        <button
          onClick={() => onNext({ size: showSlider ? size : null })}
          className="btn btn-primary"
        >
          Next <span className="ml-1">→</span>
        </button>
      </div>
    </div>
  )
}

const ProjectProcessStep = ({ onBack, onNext }: { onBack: () => void, onNext: (data: any) => void }) => {
  const [processStage, setProcessStage] = useState<string | null>(null)

  return (
    <div>
      <h1 className="text-3xl font-bold text-secondary mb-4">Where are you in the process?</h1>
      <p className="text-gray mb-6">
        To provide accurate estimates, general contractors require complete
        architectural plans or designs.
      </p>
      
      <div className="space-y-4 mb-8">
        <div 
          className={`border rounded-lg p-4 flex items-center cursor-pointer ${
            processStage === 'need-plans' ? 'border-primary bg-lavender/50' : 'border-gray/20'
          }`}
          onClick={() => setProcessStage('need-plans')}
        >
          <div className="h-6 w-6 rounded-full border border-gray/30 mr-3 flex items-center justify-center">
            {processStage === 'need-plans' && (
              <div className="h-4 w-4 rounded-full bg-primary"></div>
            )}
          </div>
          <span className="font-medium">Getting started and need architectural plans or designs</span>
        </div>
        
        <div 
          className={`border rounded-lg p-4 flex items-center cursor-pointer ${
            processStage === 'have-plans' ? 'border-primary bg-lavender/50' : 'border-gray/20'
          }`}
          onClick={() => setProcessStage('have-plans')}
        >
          <div className="h-6 w-6 rounded-full border border-gray/30 mr-3 flex items-center justify-center">
            {processStage === 'have-plans' && (
              <div className="h-4 w-4 rounded-full bg-primary"></div>
            )}
          </div>
          <span className="font-medium">Already have architectural plans and need a general contractor</span>
        </div>
      </div>
      
      <div className="flex justify-between mt-8">
        <button
          onClick={onBack}
          className="border border-gray/30 px-6 py-2 rounded-md hover:bg-gray/10 flex items-center"
        >
          <span className="mr-1">←</span> Back
        </button>
        <button
          onClick={() => onNext({ processStage })}
          className="btn btn-primary flex items-center"
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
      <div className="w-full md:w-1/2 md:pr-8 mb-8 md:mb-0">
        {/* Success checkmark card */}
        <div className="mb-6 bg-green-50 rounded-lg p-6 shadow-sm border border-green-100">
          <div className="flex justify-center">
            <div className="bg-green-100 rounded-full p-4 mb-4">
              <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
          </div>
          <p className="text-center text-green-800 font-medium">Great! Your project is a perfect match for our services.</p>
        </div>
        
        <h1 className="text-3xl font-bold text-secondary mb-2">You're in the right place! Renovation Bridge finds the <span className="text-primary">best pros near you.</span></h1>
        
        <p className="text-gray mb-6">
          We've vetted thousands of pros and have onboarded only the <strong>top 5%</strong>.
        </p>
        
        <div className="flex justify-between mt-8">
          <button
            onClick={onBack}
            className="border border-gray/30 px-6 py-2 rounded-md hover:bg-gray/10 flex items-center"
          >
            <span className="mr-1">←</span> Back
          </button>
          <button
            onClick={onNext}
            className="btn btn-primary flex items-center"
          >
            Next <span className="ml-1">→</span>
          </button>
        </div>
      </div>
      
      <div className="w-full md:w-1/2 bg-lavender/50 rounded-lg p-6">
        <div className="text-center mb-8">
          <div className="bg-white p-4 rounded-lg shadow-sm inline-block">
            <div className="text-4xl font-bold text-primary mb-2">500+</div>
            <div className="text-secondary font-medium">Vetted Professionals</div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span className="text-lg text-gray-700">Interview</span>
          </div>
          
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span className="text-lg text-gray-700">Site Walk</span>
          </div>
          
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span className="text-lg text-gray-700">Reference Checks</span>
          </div>
          
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span className="text-lg text-gray-700">Bid Review</span>
          </div>
        </div>
        
        <div className="flex justify-center mt-8">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white p-3 rounded-lg shadow-sm text-center">
              <div className="text-2xl font-bold text-primary">96%</div>
              <div className="text-xs text-gray-700">Satisfaction Rate</div>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm text-center">
              <div className="text-2xl font-bold text-primary">5%</div>
              <div className="text-xs text-gray-700">Top Talent</div>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm text-center">
              <div className="text-2xl font-bold text-primary">10+</div>
              <div className="text-xs text-gray-700">Years Experience</div>
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
    zipCode: '',
    comments: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setContactData({
      ...contactData,
      [name]: value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onFinish()
  }

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
      <h1 className="text-3xl font-bold text-secondary mb-4">Almost there! Let's get your contact details</h1>
      <p className="text-gray mb-6">
        Please provide your contact information so we can connect you with our vetted professionals.
      </p>

      <div className="mb-6 p-4 bg-lavender/20 rounded-lg">
        <h3 className="font-semibold text-secondary mb-2">Your Project Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray">Project Type</p>
            <p className="font-medium">
              {formData.projectTypes.map((type: string) => projectTypeLabels[type]).join(', ')}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray">Project Size</p>
            <p className="font-medium">{formData.size} sq. ft.</p>
          </div>
          <div>
            <p className="text-sm text-gray">Process Stage</p>
            <p className="font-medium">{processStageLabels[formData.processStage]}</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={contactData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray/30 rounded-md"
              placeholder="Your full name"
              required
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={contactData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray/30 rounded-md"
              placeholder="you@example.com"
              required
            />
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={contactData.phone}
              onChange={handleChange}
              className="w-full p-3 border border-gray/30 rounded-md"
              placeholder="(123) 456-7890"
              required
            />
          </div>
          
          <div>
            <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
              Zip Code
            </label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              value={contactData.zipCode}
              onChange={handleChange}
              className="w-full p-3 border border-gray/30 rounded-md"
              placeholder="12345"
              required
            />
          </div>
          
          <div className="md:col-span-2">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Project Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={contactData.address}
              onChange={handleChange}
              className="w-full p-3 border border-gray/30 rounded-md"
              placeholder="123 Main St, City, State"
              required
            />
          </div>
          
          <div className="md:col-span-2">
            <label htmlFor="comments" className="block text-sm font-medium text-gray-700 mb-1">
              Additional Comments (Optional)
            </label>
            <textarea
              id="comments"
              name="comments"
              value={contactData.comments}
              onChange={handleChange}
              className="w-full p-3 border border-gray/30 rounded-md h-24"
              placeholder="Tell us more about your project..."
            />
          </div>
        </div>
        
        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={onBack}
            className="border border-gray/30 px-6 py-2 rounded-md hover:bg-gray/10 flex items-center"
          >
            <span className="mr-1">←</span> Back
          </button>
          <button
            type="submit"
            className="btn btn-primary"
          >
            Submit <span className="ml-1">→</span>
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
    <div className="bg-white shadow-sm rounded-lg p-6">
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="w-full bg-gray/20 h-1 mb-2 rounded-full overflow-hidden">
          <div 
            className="bg-primary h-full transition-all duration-300 ease-in-out" 
            style={{ width: `${(step / 5) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Form steps */}
      {step === 1 && <ProjectTypeStep onNext={handleNext} />}
      {step === 2 && <ProjectSizeStep onBack={handleBack} onNext={handleNext} formData={formData} />}
      {step === 3 && <ProjectProcessStep onBack={handleBack} onNext={handleNext} />}
      {step === 4 && <SuccessStep onBack={handleBack} onNext={() => setStep(step + 1)} />}
      {step === 5 && <ContactFormStep onBack={handleBack} onFinish={handleFinish} formData={formData} />}
    </div>
  )
} 