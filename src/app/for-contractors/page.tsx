'use client'

import Image from 'next/image'
import ContractorForm from '@/components/forms/ContractorForm'

export default function ForContractors() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      {/* Premium hero section with background pattern */}
      <section className="relative mb-12 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-primary/10 pattern-grid-lg opacity-30"></div>
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-lavender/30"></div>
        
        {/* Content */}
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-6">Join Our Contractor Network</h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Partner with Renovation Bridge to grow your business and connect with qualified homeowners seeking quality renovation services.
            </p>
            
            {/* Call to action button */}
            <a
              href="#apply-form"
              className="mt-8 inline-block bg-primary text-white font-medium py-3 px-8 rounded-lg transition-all hover:bg-primary-dark hover:shadow-lg"
            >
              Apply Today
            </a>
          </div>
        </div>
        
        {/* Decorative bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 48" fill="white" preserveAspectRatio="none">
            <path d="M0,0 C480,48 960,48 1440,0 L1440,48 L0,48 Z"></path>
          </svg>
        </div>
      </section>
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Form Section with improved styling */}
          <div className="lg:col-span-7">
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
                    <h4 className="font-semibold text-lg text-secondary">High-Quality Leads</h4>
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
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 10a8 8 0 1116 0 8 8 0 01-16 0z" />
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
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
                src="/images/blog/contractor-working.png"
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
                  <h4 className="font-bold text-secondary">John Smith</h4>
                  <p className="text-sm text-gray-600">Smith Building & Contracting</p>
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
                  <h4 className="font-bold text-secondary">Maria Garcia</h4>
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
                  <h4 className="font-bold text-secondary">David Johnson</h4>
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
            <span className="block w-20 h-1 bg-primary mx-auto mt-4"></span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Enhanced FAQ items */}
            <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100 transition-all hover:shadow-xl">
              <h3 className="font-bold text-lg text-secondary mb-3 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Is there a fee to join the network?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                There is no upfront cost to join our contractor network. We work on a commission basis only when you get a project through our platform.
              </p>
            </div>
            
            {/* Continue with similar styling for other FAQ items */}
            <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100 transition-all hover:shadow-xl">
              <h3 className="font-bold text-lg text-secondary mb-3 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                What types of contractors do you work with?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We work with licensed contractors across various specialties including general contractors, kitchen and bath specialists, and more.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100 transition-all hover:shadow-xl">
              <h3 className="font-bold text-lg text-secondary mb-3 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                How does the vetting process work?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Our vetting process includes license verification, insurance checks, reference calls, and an interview with our team to ensure quality standards.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100 transition-all hover:shadow-xl">
              <h3 className="font-bold text-lg text-secondary mb-3 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                How quickly will I start receiving leads?
              </h3>
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