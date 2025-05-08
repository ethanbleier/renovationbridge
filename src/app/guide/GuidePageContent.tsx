"use client";

import Image from 'next/image';
import Link from 'next/link';
import GuideDownloadForm from '@/components/forms/GuideDownloadForm';
import { useState, useEffect, Fragment, useRef, useCallback } from 'react';

interface GuideTopic {
  id: string;
  title: string;
  description: string;
  icon: string;
}

interface GuidePageContentProps {
  guideTopics: GuideTopic[];
}

// Modern, accessible lightbox modal with carousel for guide previews
interface GuidePreviewLightboxProps {
  topic: GuideTopic;
  onClose: () => void;
  getImageFilenames: (id: string) => string[];
}

function GuidePreviewLightbox({ topic, onClose, getImageFilenames }: GuidePreviewLightboxProps) {
  const images = getImageFilenames(topic.id);
  const [current, setCurrent] = useState(0);
  const lightboxRef = useRef<HTMLDivElement>(null);

  // Focus trap for accessibility
  useEffect(() => {
    const focusable = lightboxRef.current?.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable?.[0];
    const last = focusable?.[focusable.length - 1];
    function handleTab(e: KeyboardEvent) {
      if (!focusable || focusable.length === 0) return;
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last?.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first?.focus();
          }
        }
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setCurrent((c) => (c + 1) % images.length);
      if (e.key === 'ArrowLeft') setCurrent((c) => (c - 1 + images.length) % images.length);
      handleTab(e);
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose, images.length]);

  // Move to next/prev image
  const goNext = useCallback(() => setCurrent((c) => (c + 1) % images.length), [images.length]);
  const goPrev = useCallback(() => setCurrent((c) => (c - 1 + images.length) % images.length), [images.length]);

  return (
    <div
      ref={lightboxRef}
      className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 p-6 flex flex-col items-center animate-fadeIn border-2 border-blue-100 focus:outline-none"
      tabIndex={0}
      aria-label={`Preview images for ${topic.title}`}
      role="document"
      style={{ fontFamily: 'Nunito, Open Sans, sans-serif' }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-full p-2"
        aria-label="Close preview"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 7L7 17M7 7l10 10" />
        </svg>
      </button>
      <h4 className="text-xl font-semibold mb-4 text-center font-inter text-blue-700">{topic.title} – Guide Preview</h4>
      <div className="relative w-full flex flex-col items-center">
        {/* Carousel controls */}
        <button
          onClick={goPrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-full p-2 shadow focus:outline-none focus:ring-2 focus:ring-blue-400 z-10"
          aria-label="Previous image"
          style={{ left: '-2.5rem' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="relative w-72 h-96 sm:w-80 sm:h-[28rem] bg-gray-100 rounded-lg overflow-hidden shadow-md border border-gray-200 flex items-center justify-center">
          <Image
            src={images[current]}
            alt={`${topic.title} preview page ${current + 1}`}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 80vw, 320px"
            priority
          />
        </div>
        <button
          onClick={goNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-full p-2 shadow focus:outline-none focus:ring-2 focus:ring-blue-400 z-10"
          aria-label="Next image"
          style={{ right: '-2.5rem' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      {/* Carousel indicators */}
      <div className="flex gap-2 mt-4 justify-center">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full border-2 ${idx === current ? 'bg-blue-600 border-blue-600' : 'bg-blue-100 border-blue-200'} focus:outline-none`}
            aria-label={`Go to image ${idx + 1}`}
          />
        ))}
      </div>
      <p className="mt-6 text-gray-600 text-center text-sm font-nunito">Preview pages from the guide topic. Download the full guide for more details.</p>
      <a
        href="#download-guide"
        className="mt-4 inline-flex items-center justify-center px-5 py-2 rounded-md bg-[#07049D] text-white font-medium shadow hover:bg-[#07049D]/90 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors text-sm font-nunito"
        onClick={onClose}
      >
        Get the Complete Guide
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
      </a>
    </div>
  );
}

export default function GuidePageContent({ guideTopics }: GuidePageContentProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [previewTopic, setPreviewTopic] = useState<GuideTopic | null>(null);

  useEffect(() => {
    setIsMounted(true);
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPreviewTopic(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Helper to get image filenames based on topic id
  // Map topic ids to image base names (must match guide-info PNGs)
  const getImageFilenames = (id: string) => {
    const map: Record<string, string> = {
      getting_started: 'getting-started',
      budget: 'budget',
      selecting: 'selecting',
      plan: 'plan',
      making: 'making',
      living: 'living',
    };
    const base = id;
    return [
      `/images/guide-info/${base}_1.png`,
      `/images/guide-info/${base}_2.png`,
    ];
  };

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
          <h2 className="text-3xl md:text-4xl font-semibold mb-10 text-center tracking-tight font-inter text-[#07049D]">Guide Topics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {guideTopics.map((topic) => (
              <div
                key={topic.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 flex flex-col h-full group border border-blue-100 focus-within:ring-2 focus-within:ring-blue-400"
                tabIndex={0}
                aria-label={`Preview images for ${topic.title}`}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setPreviewTopic(topic); }}
              >
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-5 border border-blue-100">
                  <Image src={topic.icon} alt={topic.title + ' icon'} width={32} height={32} />
                </div>
                <h3 className="text-lg font-semibold mb-2 font-inter text-slate-800">{topic.title}</h3>
                <p className="text-gray-600 mb-4 flex-grow font-nunito">{topic.description}</p>
                <button
                  type="button"
                  className="mt-auto inline-flex items-center justify-center px-4 py-2 rounded-md bg-[#07049D] text-white font-medium shadow hover:bg-[#07049D]/90 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors text-sm font-nunito"
                  onClick={() => setPreviewTopic(topic)}
                  aria-label={`Open preview for ${topic.title}`}
                >
                  Preview
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          {/* Modern Lightbox Modal for Previews */}
          {previewTopic && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm transition-all"
              role="dialog"
              aria-modal="true"
              aria-label={`Preview images for ${previewTopic.title}`}
              tabIndex={-1}
              onClick={e => { if (e.target === e.currentTarget) setPreviewTopic(null); }}
            >
              <GuidePreviewLightbox
                topic={previewTopic}
                onClose={() => setPreviewTopic(null)}
                getImageFilenames={getImageFilenames}
              />
            </div>
          )}
        </section>
        
        {/* Secondary CTA for Guide Download - Strategic placement after browsing topics */}
        <section className="mb-20">
          <div className="bg-gradient-to-r from-lavender/20 to-blue-50 shadow-lg p-8 rounded-xl text-center">
            <h3 className="text-2xl font-semibold mb-3 text-[#07049D]">Want to take this guide with you?</h3>
            <p className="mb-5 text-gray-700 max-w-2xl mx-auto">
              Download our complete renovation guide PDF to reference offline and share with your family or contractor.
            </p>
            <a href="#download-guide" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#07049D] hover:bg-[#07049D]/90 transition-colors duration-200 shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Get Your Free Guide
            </a>
          </div>
        </section>
        
        <section className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-12 mb-10">
          <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-center tracking-tight text-[#07049D]">Need Personalized Help?</h2>
          <p className="text-center text-gray-700 max-w-2xl mx-auto mb-10 leading-relaxed">
            If you have specific questions or need personalized guidance for your renovation project, 
            our team of experts is ready to help.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/get-started" className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#07049D] hover:bg-[#07049D]/90 transition-colors duration-200 shadow-md">
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