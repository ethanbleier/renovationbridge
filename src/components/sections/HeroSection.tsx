"use client"

import ContactForm from '@/components/forms/ContactForm'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { TypeAnimation } from 'react-type-animation'

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    '/images/projects/adu-1.jpg',
    '/images/projects/kitchen-2.jpg',
    '/images/projects/bathroom-2.jpg',
    '/images/projects/backyard-1.jpg'
  ];
  
  const titles = [
    {
      prefix: "",
      keyword: "Build Your ADU",
      highlight: "with Confidence"
    },
    {
      prefix: "",
      keyword: "Renovate Your Kitchen",
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
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5500); // slide change in ms
    
    return () => clearInterval(interval);
  }, [slides.length]);

  // Function to handle scroll down on arrow click
  const handleScrollDown = () => {
    // Find the What We Offer section and scroll to it
    const whatWeOfferSection = document.getElementById('what-we-offer-section');
    if (whatWeOfferSection) {
      whatWeOfferSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-16 md:pt-24 pb-20 md:pb-32">
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
              sizes="100vw"
              className="object-cover"
              priority={index === 0}
            />
            {/* Overlay to ensure text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-lavender/65 to-white/50"></div>
          </div>
        ))}
      </div>
      
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="space-y-6 md:space-y-8">
            <div className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm backdrop-blur-sm">
              Welcome to Renovation Bridge
            </div>
            
            <div className="text-xl md:text-2xl lg:text-3xl font-bold text-secondary leading-tight space-y-2 lg:max-w-[650px]">
              {/* Main title with static prefix and animated keyword */}
              <h1 className="min-h-[1.5em] h-[1.5em] w-full overflow-visible text-ellipsis text-2xl md:text-3xl lg:text-4xl">
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
                  key={currentSlide} // Force re-render when slide changes
                />
              </h1>
              
              {/* "with Confidence" remains unchanged */}
              <div className="text-primary h-[1.5em] overflow-hidden text-2xl md:text-3xl lg:text-4xl">{titles[currentSlide].highlight}</div>
            </div>
            
            <p className="text-lg md:text-xl text-gray-700 max-w-xl font-medium backdrop-blur-sm bg-white/10 p-3 rounded-lg">
              Renovation Bridge connects homeowners with vetted contractors for a seamless renovation experience. Our rigorous vetting process ensures quality workmanship for your project.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/get-started" className="btn btn-primary shadow-lg shadow-primary/20 hover:translate-y-1 transition-all">
                Get Started
              </Link>
              <Link href="/how-it-works" className="btn bg-white text-primary border border-primary/20 hover:bg-lavender hover:shadow-md transition-all">
                How It Works
              </Link>
            </div>
            
            <div className="grid grid-cols-3 gap-6 md:gap-8 pt-8 md:pt-10">
              <div className="text-center p-4 rounded-lg bg-white/80 backdrop-blur-sm shadow-sm">
                <div className="text-3xl md:text-4xl font-bold text-primary">100+</div>
                <p className="text-sm md:text-base text-gray-600">Vetted Contractors</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-white/80 backdrop-blur-sm shadow-sm">
                <div className="text-3xl md:text-4xl font-bold text-primary">500+</div>
                <p className="text-sm md:text-base text-gray-600">Projects Completed</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-white/80 backdrop-blur-sm shadow-sm">
                <div className="text-3xl md:text-4xl font-bold text-primary">95%</div>
                <p className="text-sm md:text-base text-gray-600">Customer Satisfaction</p>
              </div>
            </div>
          </div>
          
          <div className="relative mt-8 lg:mt-0">
            <ContactForm />
          </div>
        </div>
      </div>
      
      {/* Bobbing down arrow */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce">
        <div 
          className="bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md cursor-pointer hover:bg-white/90 transition-all" 
          onClick={handleScrollDown}
          aria-label="Scroll down"
          role="button"
          tabIndex={0}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="text-primary"
          >
            <path d="M12 5v14M19 12l-7 7-7-7"/>
          </svg>
        </div>
      </div>
    </section>
  )
} 