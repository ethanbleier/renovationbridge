'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

// Step components
const ProjectTypeStep = ({ onNext }: { onNext: (data: any) => void }) => {
  const projectTypes = [
    { id: 'adu', label: 'Accessory Dwelling Unit (ADU)', image: '/images/projects/adu.jpg' },
    { id: 'kitchen', label: 'Kitchen Renovation', image: '/images/projects/kitchen.jpg' },
    { id: 'bathroom', label: 'Bathroom Renovation', image: '/images/projects/bathroom.jpg' },
    { id: 'addition', label: 'Addition', image: '/images/projects/addition.jpg' },
    { id: 'full-home', label: 'Full Home Renovation', image: '/images/projects/full-home.jpg' },
    { id: 'new-home', label: 'New Custom Home', image: '/images/projects/new-home.jpg' },
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
            Don't see your project type? <a href="#" className="text-primary underline">Book a call.</a>
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

const ProjectSizeStep = ({ onBack, onNext }: { onBack: () => void, onNext: (data: any) => void }) => {
  const [size, setSize] = useState(2000)

  return (
    <div>
      <h1 className="text-3xl font-bold text-secondary mb-4">What size are you looking to build?</h1>
      <p className="text-gray mb-6">
        2 bedrooms generally start at 1,000 sq. ft., 3 bedrooms at 1,400 sq. ft.
        and 4 bedrooms at 1,800 sq. ft.
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
            min="1200" 
            max="3000" 
            step="100" 
            value={size}
            onChange={(e) => setSize(parseInt(e.target.value))}
            className="w-full h-2 bg-gray/20 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray mt-2">
            <span>1,200 sq. ft.</span>
            <span>3,000+ sq. ft.</span>
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
      
      <div className="flex justify-between mt-8">
        <button
          onClick={onBack}
          className="border border-gray/30 px-6 py-2 rounded-md hover:bg-gray/10 flex items-center"
        >
          <span className="mr-1">←</span> Back
        </button>
        <button
          onClick={() => onNext({ size })}
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

const SuccessStep = ({ onBack, onFinish }: { onBack: () => void, onFinish: () => void }) => {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 md:pr-8 mb-8 md:mb-0">
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
            onClick={onFinish}
            className="btn btn-primary flex items-center"
          >
            Next <span className="ml-1">→</span>
          </button>
        </div>
      </div>
      
      <div className="w-full md:w-1/2 bg-lavender/50 rounded-lg p-6">
        <div className="flex justify-center mb-8">
          <div className="flex -space-x-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="w-12 h-12 rounded-full bg-gray/20 border-2 border-white overflow-hidden">
                {/* These would be real profile images */}
              </div>
            ))}
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
          <div className="flex -space-x-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="w-16 h-16 rounded-full bg-gray/20 border-2 border-white overflow-hidden">
                {/* These would be real contractor images */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function GetStartedForm() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    projectTypes: [],
    size: 2000,
    processStage: null
  })

  const handleNext = (data: any) => {
    setFormData({ ...formData, ...data })
    setStep(step + 1)
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  const handleFinish = () => {
    // No matter what the user inputs, we redirect to the same page
    router.push('/thank-you')
  }

  return (
    <div className="bg-white shadow-sm rounded-lg p-6">
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="w-full bg-gray/20 h-1 mb-2 rounded-full overflow-hidden">
          <div 
            className="bg-primary h-full transition-all duration-300 ease-in-out" 
            style={{ width: `${(step / 4) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Form steps */}
      {step === 1 && <ProjectTypeStep onNext={handleNext} />}
      {step === 2 && <ProjectSizeStep onBack={handleBack} onNext={handleNext} />}
      {step === 3 && <ProjectProcessStep onBack={handleBack} onNext={handleNext} />}
      {step === 4 && <SuccessStep onBack={handleBack} onFinish={handleFinish} />}
    </div>
  )
} 