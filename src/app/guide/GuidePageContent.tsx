"use client";

import Image from 'next/image';
import Link from 'next/link';
import GuideDownloadForm from '@/components/forms/GuideDownloadForm';
import { useState, useEffect } from 'react';

interface GuideTopic {
  id: string;
  title: string;
  description: string;
  icon: string;
}

interface GuidePageContentProps {
  guideTopics: GuideTopic[];
}

export default function GuidePageContent({ guideTopics }: GuidePageContentProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleScrollToForm = () => {
    const formSection = document.getElementById('download-guide');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="relative min-h-screen scroll-smooth">
      {/* New Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center pb-16">
        <Link href="/" className="absolute left-4 top-16 inline-flex items-center text-white hover:text-blue-100 transition-colors z-20 sm:top-20 md:top-24">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back
        </Link>
        
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/blog/guide.png" 
            alt="Renovation Guide Background" 
            fill 
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50 mix-blend-multiply" />
        </div>
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-12 sm:pt-16 md:pt-20 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">Renovation Guide</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto font-light">
            Your comprehensive resource for planning, executing, and enjoying your home renovation project.
          </p>
        </div>

        <div className="absolute bottom-12 left-0 right-0 flex justify-center animate-bounce z-20">
          <div 
            className="bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md cursor-pointer hover:bg-white/90 transition-all" 
            onClick={handleScrollToForm}
            aria-label="Scroll to download form"
            role="button"
            tabIndex={0}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor"
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="text-primary h-5 w-5 sm:h-6 sm:w-6"
            >
              <path d="M12 5v14M19 12l-7 7-7-7"/>
            </svg>
          </div>
        </div>
      </section>
      
      {/* Existing content moved below the new hero */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 scroll-mt-20">
        {/* Redesigned Premium Guide Download Section - Light Theme */}
        <section id="download-guide" className="mb-16 scroll-mt-20">
          <div className="bg-slate-50 shadow-2xl rounded-xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-0 items-stretch">
              {/* Content column */}
              <div className="md:col-span-7 bg-white p-8 md:p-12 lg:p-16 flex flex-col justify-center relative">
                <div className="relative z-10">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full tracking-wider">FREE DOWNLOAD</span>
                    <span className="bg-amber-100 text-amber-700 text-xs font-semibold px-3 py-1 rounded-full tracking-wider">PREMIUM CONTENT</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-5 tracking-tight leading-tight">
                    Unlock Your <span className="text-blue-600">Complete Renovation Guide</span>
                  </h2>
                  <p className="text-slate-700 mb-6 text-base md:text-lg leading-relaxed">
                    Get our comprehensive renovation guide packed with expert tips, checklists, and planning templates to ensure your project is a resounding success.
                  </p>
                  
                  <div className="space-y-3 mb-8">
                    {[
                      "Step-by-step planning framework",
                      "Budgeting templates & cost control",
                      "Contractor selection checklist",
                      "Timeline planning & management"
                    ].map((item, index) => (
                      <div key={index} className="flex items-center">
                        <svg className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-slate-600 text-sm md:text-base">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Form column - Overlapping effect */}
              <div className="md:col-span-5 bg-white p-6 md:p-8 relative md:-ml-8 lg:-ml-12 md:my-8 md:mr-8 rounded-xl shadow-2xl flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-5">
                  <div className="relative w-20 h-28 flex-shrink-0 border-2 border-slate-200 rounded-lg shadow-lg overflow-hidden">
                    <Image
                      src="/images/guide/guide-preview-2.png" // Ensure this image exists
                      alt="Guide Preview"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold py-0.5 px-2 rounded-bl-md">FREE</div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl text-slate-900">Get Instant Access</h3>
                    <p className="text-sm text-slate-500">Fill in your details below.</p>
                  </div>
                </div>
                <GuideDownloadForm 
                  guideTitle="Complete Home Renovation Guide" 
                  guideType="renovation-planner" 
                  downloadUrl="/pdfs/guide.pdf" // Ensure this PDF exists
                  buttonText="Download Your Free Guide"
                  successHeading="Your Guide is on its Way!"
                  successMessage="Thank you! Check your email for the download link."
                />
              </div>
            </div>
          </div>
        </section>
        
        <section className="mb-20 pt-6">
          <div className="bg-white shadow-xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-10 rounded-2xl border border-gray-100">
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-semibold mb-6 tracking-tight">Why This Guide?</h2>
              <p className="text-gray-700 mb-5 leading-relaxed">
                Renovation projects can be overwhelming, especially for first-timers. We've created this guide to help you navigate 
                every step of the renovation process with confidence.
              </p>
              <p className="text-gray-700 mb-8 leading-relaxed">
                Based on our extensive experience and customer feedback, we've compiled the most useful information 
                to ensure your renovation journey is as smooth as possible.
              </p>
              <Link href="#topics" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 transition-colors duration-200 shadow-sm">
                Explore Topics
              </Link>
            </div>
            <div className="md:w-1/2 relative h-64 md:h-96 w-full rounded-xl overflow-hidden shadow-2xl transform transition-transform hover:scale-[1.02] duration-300">
              <Image
                src="/images/guide/guide-preview-2.png"
                alt="Home renovation in progress"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>
        
        <section id="topics" className="mb-20 scroll-mt-20">
          <h2 className="text-3xl md:text-4xl font-semibold mb-10 text-center tracking-tight">Guide Topics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {guideTopics.map((topic) => (
              <div key={topic.id} className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 flex flex-col h-full transform hover:-translate-y-1">
                <div className="w-14 h-14 bg-lavender/20 rounded-full flex items-center justify-center mb-6">
                  <Image src={topic.icon} alt="" width={28} height={28} />
                </div>
                <h3 className="text-xl font-semibold mb-3">{topic.title}</h3>
                <p className="text-gray-600 mb-6 flex-grow leading-relaxed">{topic.description}</p>
                <a href="#download-guide" className="group text-blue-600 font-medium hover:text-blue-800 inline-flex items-center transition-colors">
                  Read more
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 transform transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </section>
        
        {/* Secondary CTA for Guide Download - Strategic placement after browsing topics */}
        <section className="mb-20">
          <div className="bg-gradient-to-r from-lavender/20 to-blue-50 shadow-lg p-8 rounded-xl text-center">
            <h3 className="text-2xl font-semibold mb-3">Want to take this guide with you?</h3>
            <p className="mb-5 text-gray-700 max-w-2xl mx-auto">
              Download our complete renovation guide PDF to reference offline and share with your family or contractor.
            </p>
            <a href="#download-guide" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Get Your Free Guide
            </a>
          </div>
        </section>
        
        <section className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-12 mb-10">
          <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-center tracking-tight">Need Personalized Help?</h2>
          <p className="text-center text-gray-700 max-w-2xl mx-auto mb-10 leading-relaxed">
            If you have specific questions or need personalized guidance for your renovation project, 
            our team of experts is ready to help.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/get-started" className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 shadow-md">
              Begin Your Renovation Journey
            </Link>
            <Link href="/how-it-works" className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200 shadow-sm">
              Learn More
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
} 