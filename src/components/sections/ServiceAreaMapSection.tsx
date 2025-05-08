'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

// Define the service areas
const serviceAreas = [
  { id: 'sf', name: 'San Francisco' },
  { id: 'oak', name: 'Oakland' },
  { id: 'sj', name: 'San Jose' },
  { id: 'berk', name: 'Berkeley' },
  { id: 'pal', name: 'Palo Alto' },
  { id: 'marin', name: 'Marin County' },
  { id: 'saus', name: 'Sausalito' },
  { id: 'rich', name: 'Richmond' },
  { id: 'frem', name: 'Fremont' },
  { id: 'hay', name: 'Hayward' },
  { id: 'con', name: 'Concord' },
  { id: 'val', name: 'Vallejo' },
  { id: 'daly', name: 'Daly City' },
  { id: 'sb', name: 'South Bay' },
]

const ServiceAreaMapSection = () => {
  const [activeArea, setActiveArea] = useState<string | null>(null)
  
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-cream">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-black">Our Service Area</h2>
          <p className="text-gray-600 mt-3 text-base sm:text-lg">
            We proudly serve homeowners throughout the Bay Area
          </p>
          <div className="w-16 sm:w-20 h-1 bg-primary mx-auto rounded-full mt-3"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Column */}
          <div className="lg:col-span-2 relative">
            <div className="relative aspect-[4/3] w-full border-2 border-gray-200 rounded-lg shadow-lg overflow-hidden bg-white">
              <Image
                src="/images/maps/bay-area-map.png"
                alt="Bay Area Service Map"
                fill
                sizes="(min-width: 1024px) 66vw, 100vw"
                className="object-cover"
              />
            </div>
            
            {/* Service Area Pills - Below the map */}
            <div className="mt-6 flex flex-wrap gap-2 justify-center">
              {serviceAreas.map((area) => (
                <button
                  key={area.id}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 
                    ${activeArea === area.id 
                      ? 'bg-primary text-white shadow-md' 
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'}`}
                  onClick={() => setActiveArea(activeArea === area.id ? null : area.id)}
                >
                  {area.name}
                </button>
              ))}
            </div>
          </div>
          
          {/* Info Column */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 h-full shadow-md border border-gray-100">
              <h3 className="text-xl font-semibold mb-4 border-b pb-2 border-gray-200 text-primary">
                {activeArea ? serviceAreas.find(a => a.id === activeArea)?.name : 'Bay Area Coverage'}
              </h3>
              
              {activeArea ? (
                <div>
                  <p className="text-gray-700 mb-4">
                    Our team of vetted contractors provides top-quality renovation services in {serviceAreas.find(a => a.id === activeArea)?.name} and surrounding neighborhoods.
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-primary mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Kitchen Renovations
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-primary mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Bathroom Remodeling
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-primary mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Home Additions
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-primary mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Whole House Renovations
                    </li>
                  </ul>
                  <Link href="/get-started">
                    <button className="mt-5 bg-primary hover:bg-opacity-90 text-black px-4 py-2 rounded-md transition-colors w-full cta-btn">
                      Get Started in {serviceAreas.find(a => a.id === activeArea)?.name}
                    </button>
                  </Link>
                </div>
              ) : (
                <div>
                  <p className="text-gray-700 mb-4">
                    Renovation Bridge connects homeowners with trusted contractors throughout the San Francisco Bay Area, covering:
                  </p>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    {serviceAreas.map((area) => (
                      <button 
                        key={area.id}
                        className="text-left text-gray-700 hover:text-primary transition-colors"
                        onClick={() => setActiveArea(area.id)}
                      >
                        • {area.name}
                      </button>
                    ))}
                  </div>
                  <p className="mt-4 text-sm text-gray-600">
                    Don't see your area? Contact us to check if we service your location.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServiceAreaMapSection 