"use client"

import ContactForm from '@/components/forms/ContactForm'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { TypeAnimation } from 'react-type-animation'

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [pillVisible, setPillVisible] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  
  const slides = [
    '/images/projects/kitchen-2.jpg',
    '/images/projects/adu-1.jpg',
    '/images/projects/bathroom-2.jpg',
    '/images/projects/backyard-1.jpg'
  ];
  
  const titles = [
    {
      prefix: "",
      keyword: "Renovate Your Kitchen",
      highlight: "with Confidence"
    },
    {
      prefix: "",
      keyword: "Build Your ADU",
      highlight: "with Confidence"
    },
    {
      prefix: "",
      keyword: "Renovate Your Bathroom",
      highlight: "with Confidence"
    },
    {
      prefix: "",
      keyword: "Renovate Your Home",
      highlight: "with Confidence"
    }
  ];

  // Control slide transitions
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        // When moving to next slide, set isInitialLoad to false
        if (isInitialLoad) setIsInitialLoad(false);
        return prev === slides.length - 1 ? 0 : prev + 1;
      });
    }, 5500); // slide change in ms
    
    return () => clearInterval(interval);
  }, [slides.length, isInitialLoad]);

  // Animation for welcome pill
  useEffect(() => {
    // Delay the appearance slightly for a better effect
    setTimeout(() => setPillVisible(true), 300);
  }, []);

  // Function to handle scroll down on arrow click
  const handleScrollDown = () => {
    // Find the What We Offer section and scroll to it
    const whatWeOfferSection = document.getElementById('what-we-offer-section');
    if (whatWeOfferSection) {
      whatWeOfferSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[90vh] pt-12 sm:pt-16 md:pt-24 pb-16 md:pb-32">
      {/* Image Carousel Background */}
      <div className="absolute inset-0 w-full h-full">
        {slides.map((slide, index) => (
          <div 
            key={slide}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image 
              src={slide}
              alt="Renovation project"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, 100vw"
              className="object-cover"
              priority={index === 0}
            />
            {/* Overlay to ensure text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-lavender/30 to-white/20 sm:from-lavender/25 sm:to-white/15"></div>
          </div>
        ))}
      </div>
      
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-16 items-start">
          <div className="space-y-4 sm:space-y-6 md:space-y-8">
              <div 
                className={`inline-block px-3 sm:px-4 py-1 rounded-full bg-primary/30 text-primary font-medium text-xs sm:text-sm backdrop-blur-sm transform transition-all duration-700 ease-out ${
                  pillVisible 
                    ? 'opacity-100 translate-y-0 scale-100' 
                    : 'opacity-0 -translate-y-4 scale-95'
                }`}
              >
                Welcome to Renovation Bridge
              </div>
            
            <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-secondary leading-tight space-y-2 lg:max-w-[650px]">
              {/* Main title with static prefix and animated keyword */}
              <h1 className="min-h-[1.5em] h-[1.5em] w-full overflow-visible text-ellipsis text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                <span>{titles[currentSlide].prefix} </span>
                <TypeAnimation
                  sequence={[
                    titles[currentSlide].keyword,
                    3000, // Wait 3s
                    '',   // Delete text
                    1000, // Wait 1s before next slide
                  ]}
                  wrapper="span"
                  speed={50}
                  deletionSpeed={40}
                  className="inline-block"
                  repeat={0}
                  cursor={true}
                  key={`${currentSlide}-${isInitialLoad}`} // Force re-render when slide changes or load state changes
                  preRenderFirstString={isInitialLoad} // Only pre-render on initial load
                />
              </h1>
              
              {/* "with Confidence" remains unchanged */}
              <div className="text-primary h-[1.5em] overflow-hidden text-xl sm:text-2xl md:text-3xl lg:text-4xl">{titles[currentSlide].highlight}</div>
            </div>
            
            <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-xl font-medium backdrop-blur-sm bg-white/10 p-2 sm:p-3 rounded-lg">
              Renovation Bridge connects homeowners with vetted contractors for a seamless renovation experience. Our rigorous vetting process ensures quality workmanship for your project.
            </p>
            
            <div className="flex flex-col xs:flex-row gap-3 sm:gap-4">
              <Link href="/get-started" className="btn btn-primary shadow-lg shadow-primary/20 hover:translate-y-1 transition-all text-sm sm:text-base w-full xs:w-auto">
                Explore Home Solutions
              </Link>
              <Link href="/how-it-works" className="btn bg-white text-primary border border-primary/20 hover:bg-lavender hover:shadow-md transition-all text-sm sm:text-base w-full xs:w-auto">
                How It Works
              </Link>
            </div>
            
            <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 lg:gap-8 pt-6 sm:pt-8 md:pt-10">
              <div className="text-center p-2 md:p-4 rounded-lg bg-white/80 backdrop-blur-sm shadow-sm">
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-primary">60+</div>
                <p className="text-xxs xs:text-xs sm:text-sm lg:text-base text-gray-600">Vetted Contractors</p>
              </div>
              <div className="text-center p-2 md:p-4 rounded-lg bg-white/80 backdrop-blur-sm shadow-sm">
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-primary">2,000+</div>
                <p className="text-xxs xs:text-xs sm:text-sm lg:text-base text-gray-600">Homeowners Helped</p>
              </div>
              <div className="text-center p-2 md:p-4 rounded-lg bg-white/80 backdrop-blur-sm shadow-sm">
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-primary">100%</div>
                <p className="text-xxs xs:text-xs sm:text-sm lg:text-base text-gray-600">Matchmaking Success</p>
              </div>
            </div>
            
            {/* Summer Special Offer */}
            <div className="mt-6 sm:mt-8 rounded-lg bg-white/70 backdrop-blur-sm border border-primary/10 shadow-sm overflow-hidden">
              <div className="p-3 sm:p-4">
                <div className="flex items-center mb-2">
                  <svg className="w-5 h-5 text-yellow-500 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 5V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 21V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M5 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M21 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <h3 className="text-lg font-bold text-secondary">Summer Special Offer</h3>
                </div>
                <div className="bg-white/80 p-3 rounded-lg mb-3 shadow-sm backdrop-blur-sm">
                  <p className="text-sm font-medium text-secondary">Complete your form now and receive:</p>
                  <ul className="mt-2 space-y-1">
                    <li className="flex items-start text-xs">
                      <svg className="w-4 h-4 text-green-500 mr-1 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>Free design consultation (valued at $399)</span>
                    </li>
                    <li className="flex items-start text-xs">
                      <svg className="w-4 h-4 text-green-500 mr-1 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>Free priority consultations with multiple vetted contractors</span>
                    </li>
                    <li className="flex items-start text-xs">
                      <svg className="w-4 h-4 text-green-500 mr-1 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>24/7 support from a dedicated RB Matchmaker</span>
                    </li>
                    <li className="flex items-start text-xs">
                      <svg className="w-4 h-4 text-green-500 mr-1 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>Contract negotiation and review</span>
                    </li>
                  </ul>
                </div>
                <div className="text-center">
                  <div className="text-xs font-semibold text-primary/90 bg-white/50 px-3 py-1 rounded-full inline-block backdrop-blur-sm">Limited time offer — expires soon!</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative mt-6 sm:mt-8 lg:mt-0 rounded-lg shadow-lg">
            <ContactForm />
          </div>
        </div>
      </div>
      
      {/* Bobbing down arrow - position adjusted for immediate visibility */}
      <div className="absolute bottom-12 sm:bottom-16 md:bottom-20 left-0 right-0 flex justify-center animate-bounce z-20">
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
            stroke="currentColor" 
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
  )
} 