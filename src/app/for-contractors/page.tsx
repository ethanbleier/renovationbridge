'use client'

import Image from 'next/image'
import ContractorForm from '@/components/forms/ContractorForm'
import { ClockIcon } from '@heroicons/react/24/outline'

export default function ForContractors() {
  // Function to handle scroll down on arrow click
  const handleScrollDown = () => {
    const applyFormSection = document.getElementById('apply-form');
    if (applyFormSection) {
      applyFormSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white pb-16">
      {/* Revamped Modern Hero Section - Full Screen */}
      <section className="relative bg-black text-white overflow-hidden min-h-[90vh] md:h-screen flex flex-col justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-40">
          <Image
            src="/images/blog/contractor.png" // Updated image path
            alt="Contractors working at sunset"
            fill
            className="object-cover object-center"
            priority // Load image faster
          />
        </div>
        {/* Subtle dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/30"></div>

        {/* Content */}
        <div className="container mx-auto px-4 py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 relative z-10 flex flex-col items-center justify-center flex-grow">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 leading-tight">
              Build the Future With Us.
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-6 sm:mb-8 max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto">
              Join Renovation Bridge and connect with homeowners ready for their next big project.
            </p>
            
            {/* Call to action button */}
            <a
              href="#apply-form"
              className="inline-block bg-primary text-white font-semibold py-2 px-6 sm:py-3 sm:px-8 rounded-lg transition-all duration-300 ease-in-out hover:bg-primary-dark hover:shadow-lg transform hover:-translate-y-1"
            >
              Start Now
            </a>
          </div>
        </div>

        {/* Bobbing down arrow */}
        <div className="absolute bottom-6 sm:bottom-8 md:bottom-12 left-0 right-0 flex justify-center animate-bounce z-20">
          <div 
            className="bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md cursor-pointer hover:bg-white/90 transition-all" 
            onClick={handleScrollDown}
            aria-label="Scroll down"
            role="button"
            tabIndex={0}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" // Changed stroke to white for better contrast on dark bg 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="text-primary sm:h-6 sm:w-6"
            >
              <path d="M12 5v14M19 12l-7 7-7-7"/>
            </svg>
          </div>
        </div>
      </section>
      
      {/* Value Proposition Section */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">
              The Renovation Bridge Advantage
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover how we empower contractors to achieve more with less effort.
            </p>
            <span className="block w-20 h-1 bg-primary mx-auto mt-4"></span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Benefit Card 1 */}
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center">
              <div className="p-3 bg-blue-100 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">30% Faster Close Rate</h3>
              <p className="text-gray-600">Pre-qualified homeowners ready to start immediately.</p>
            </div>

            {/* Benefit Card 2 */}
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center">
              <div className="p-3 bg-green-100 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Zero Marketing Costs</h3>
              <p className="text-gray-600">We handle all lead generation so you focus on what you do best.</p>
            </div>

            {/* Benefit Card 3 */}
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center">
              <div className="p-3 bg-indigo-100 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">4x Higher Quality Leads</h3>
              <p className="text-gray-600">Only matched with homeowners whose projects perfectly fit your expertise.</p>
            </div>

            {/* Benefit Card 4 */}
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center">
              <div className="p-3 bg-pink-100 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">60% Less Time Bidding</h3>
              <p className="text-gray-600">We pre-screen projects to match your specialties.</p>
            </div>

            {/* Benefit Card 5 */}
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center">
              <div className="p-3 bg-yellow-100 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 14c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1zm6 0c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">95% Client Match Success</h3>
              <p className="text-gray-600">We connect you with your ideal clients.</p>
            </div>

            {/* Benefit Card 6 */}
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center">
              <div className="p-3 bg-purple-100 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Reduce Admin by 40%</h3>
              <p className="text-gray-600">We handle scheduling, follow-ups, and more.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Form Section with ID for scrolling */}
          <div id="apply-form" className="lg:col-span-7 scroll-mt-20">
            <ContractorForm />
          </div>
          
          {/* Benefits Section with improved styling */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 mb-8 transition-all hover:shadow-2xl">
              <h3 className="text-xl font-bold text-secondary mb-6 border-b border-lavender pb-4">Why Join Renovation Bridge?</h3>
              
              <div className="space-y-6">
                {/* Benefits items with improved icons and spacing */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-lavender/50 flex items-center justify-center flex-shrink-0 border-2 border-lavender">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-secondary">High-Quality Appointments</h4>
                    <p className="text-gray-600 mt-1">Connect with pre-qualified homeowners who are ready to start their renovation projects.</p>
                  </div>
                </div>
                
                {/* Continue with similar styling for other benefits */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-lavender/50 flex items-center justify-center flex-shrink-0 border-2 border-lavender">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-secondary">Build Your Reputation</h4>
                    <p className="text-gray-600 mt-1">Benefit from our trusted platform to enhance your credibility and grow your business.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-lavender/50 flex items-center justify-center flex-shrink-0 border-2 border-lavender">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-secondary">Flexible Payment Terms</h4>
                    <p className="text-gray-600 mt-1">Take advantage of our contractor-friendly payment structure, designed to support your cash flow.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-lavender/50 flex items-center justify-center flex-shrink-0 border-2 border-lavender">
                    <ClockIcon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-secondary">Save Time</h4>
                    <p className="text-gray-600 mt-1">Focus on what you do best while we handle marketing, lead generation, and initial client communications.</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Image with enhanced styling */}
            <div className="relative h-80 rounded-2xl overflow-hidden shadow-xl border-4 border-white transition-all transform hover:scale-[1.02]">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent z-10"></div>
              <Image
                src="/images/blog/blueprint.png"
                alt="Contractor working on a renovation project"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
        
        {/* Testimonials with improved styling */}
        <section className="mt-20 mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 relative">
            What Contractors Say About Us
            <span className="block w-20 h-1 bg-primary mx-auto mt-4"></span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Enhanced testimonial cards */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 transition-all hover:shadow-2xl relative">
              <div className="absolute -top-5 left-8 w-10 h-10 bg-lavender rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
              </div>
              <div className="flex items-center mb-6 pt-4">
                <div className="w-14 h-14 rounded-full bg-lavender/50 flex items-center justify-center mr-4 border-2 border-lavender">
                  <span className="font-bold text-xl text-primary">J</span>
                </div>
                <div>
                  <h4 className="font-bold text-secondary">Mike Turner</h4>
                  <p className="text-sm text-gray-600">Turner Building and Contracting</p>
                </div>
              </div>
              <p className="italic text-gray-600 leading-relaxed">
                "Since joining Renovation Bridge, my business has grown by 30%. The leads are high-quality and the partnership has been valuable for our company growth."
              </p>
            </div>
            
            {/* Repeat similar styling for other testimonials */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 transition-all hover:shadow-2xl relative">
              <div className="absolute -top-5 left-8 w-10 h-10 bg-lavender rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
              </div>
              <div className="flex items-center mb-6 pt-4">
                <div className="w-14 h-14 rounded-full bg-lavender/50 flex items-center justify-center mr-4 border-2 border-lavender">
                  <span className="font-bold text-xl text-primary">M</span>
                </div>
                <div>
                  <h4 className="font-bold text-secondary">Maria G</h4>
                  <p className="text-sm text-gray-600">Garcia Home Renovations</p>
                </div>
              </div>
              <p className="italic text-gray-600 leading-relaxed">
                "I appreciate how Renovation Bridge vets homeowners before connecting us. It saves me time and ensures I'm working with serious clients who are ready to move forward."
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 transition-all hover:shadow-2xl relative">
              <div className="absolute -top-5 left-8 w-10 h-10 bg-lavender rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
              </div>
              <div className="flex items-center mb-6 pt-4">
                <div className="w-14 h-14 rounded-full bg-lavender/50 flex items-center justify-center mr-4 border-2 border-lavender">
                  <span className="font-bold text-xl text-primary">D</span>
                </div>
                <div>
                  <h4 className="font-bold text-secondary">David J</h4>
                  <p className="text-sm text-gray-600">Premier Kitchen & Bath</p>
                </div>
              </div>
              <p className="italic text-gray-600 leading-relaxed">
                "The support from the Renovation Bridge team has been exceptional. They understand our business needs and consistently connect us with the right clients."
              </p>
            </div>
          </div>
        </section>
        
        {/* FAQ Section with improved styling */}
        <section className="mt-20 mb-20 bg-lavender/20 py-16 px-4 rounded-3xl">
          <h2 className="text-3xl font-bold text-center mb-12 relative">
            Frequently Asked Questions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* FAQ Card 1 */}
            <div className="bg-white rounded-3xl p-10 shadow-md border border-gray-200 transition-all hover:shadow-xl flex flex-col">
              <h3 className="font-bold text-lg text-secondary mb-2">
                Is there a fee to join the network?
              </h3>
              <span className="block w-16 h-1 mb-4 bg-pink-500 rounded"></span>
              <p className="text-gray-600 leading-relaxed">
                There are no upfront costs or monthly fees to join our network. You are only charged when you choose to bid on specific projects. Our compensation is commission-based and is collected only upon the successful completion of a project.
              </p>
            </div>
            {/* FAQ Card 2 */}
            <div className="bg-white rounded-3xl p-10 shadow-md border border-gray-200 transition-all hover:shadow-xl flex flex-col">
              <h3 className="font-bold text-lg text-secondary mb-2">
                What types of contractors do you work with?
              </h3>
              <span className="block w-16 h-1 mb-4 bg-yellow-400 rounded"></span>
              <p className="text-gray-600 leading-relaxed">
                We work with licensed contractors across various specialties including general contractors, kitchen and bath specialists, and more.
              </p>
            </div>
            {/* FAQ Card 3 */}
            <div className="bg-white rounded-3xl p-10 shadow-md border border-gray-200 transition-all hover:shadow-xl flex flex-col">
              <h3 className="font-bold text-lg text-secondary mb-2">
                How does the vetting process work?
              </h3>
              <span className="block w-16 h-1 mb-4 bg-cyan-500 rounded"></span>
              <p className="text-gray-600 leading-relaxed">
                Our vetting process includes license verification, insurance checks, reference calls, and an interview with our team to ensure quality standards.
              </p>
            </div>
            {/* FAQ Card 4 */}
            <div className="bg-white rounded-3xl p-10 shadow-md border border-gray-200 transition-all hover:shadow-xl flex flex-col">
              <h3 className="font-bold text-lg text-secondary mb-2">
                How quickly will I start receiving projects?
              </h3>
              <span className="block w-16 h-1 mb-4 bg-violet-500 rounded"></span>
              <p className="text-gray-600 leading-relaxed">
                Once approved, you could start receiving leads within days, depending on the demand in your service area and your specific expertise.
              </p>
            </div>
          </div>
        </section>
        
        {/* CTA Section with enhanced styling */}
        <section className="mt-20 text-center">
          <div className="bg-gradient-to-r from-primary/90 to-primary rounded-3xl p-12 max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-pattern opacity-10"></div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-6 text-white">Ready to Grow Your Business?</h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
                Join our network of top-rated contractors and start connecting with qualified homeowners today.
              </p>
              <a 
                href="#apply-form" 
                className="inline-block bg-white text-primary font-medium py-4 px-8 rounded-lg transition-all transform hover:scale-105 hover:shadow-lg"
              >
                Apply Now
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
} 