"use client"

import ContactForm from '@/components/forms/ContactForm'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useMemo } from 'react'
import { TypeAnimation } from 'react-type-animation'

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [pillVisible, setPillVisible] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [isSpecialOfferVisible, setIsSpecialOfferVisible] = useState(true);
  
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

  // Site navigation sections
  const siteNavigation = useMemo(() => [
    { id: 'hero', label: 'Home', icon: 'home' },
    { id: 'platform-section', label: 'Partners', icon: 'building' },
    { id: 'what-we-offer-section', label: 'Services', icon: 'tool' },
    { id: 'testimonials-section', label: 'Reviews', icon: 'star' },
    { id: 'service-area-map-section', label: 'Areas', icon: 'map' },
    { id: 'how-it-works-section', label: 'Process', icon: 'workflow' },
    { id: 'free-guide-section', label: 'Guide', icon: 'file-text' },
    { id: 'as-seen-on-tv-section', label: 'Media', icon: 'tv' },
    { id: 'cta-section', label: 'Contact', icon: 'mail' }
  ], []);

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

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      const sections = siteNavigation.map(section => ({
        id: section.id,
        element: document.getElementById(section.id)
      })).filter(section => section.element !== null);
      
      // Find which section we're currently in
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (!section.element) continue;
        
        const rect = section.element.getBoundingClientRect();
        const offsetTop = rect.top + window.scrollY;
        const height = section.element.offsetHeight;
        
        // Check if we're within this section's bounds
        if (scrollPosition >= offsetTop && scrollPosition <= offsetTop + height) {
          setActiveSection(section.id);
          break;
        }
        
        // Special case for the hero section at the top
        if (i === 0 && scrollPosition < offsetTop) {
          setActiveSection(section.id);
          break;
        }
      }
    };
    
    // Initial call to set the active section on mount
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [siteNavigation]);

  // Function to handle scroll to section
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Function to handle scroll down on arrow click
  const handleScrollDown = () => {
    // Find the What We Offer section and scroll to it
    const whatWeOfferSection = document.getElementById('what-we-offer-section');
    if (whatWeOfferSection) {
      whatWeOfferSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Icon component to render different SVG icons
  const Icon = ({ name, className = "w-5 h-5" }: { name: string, className?: string }) => {
    switch (name) {
      case 'home':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
        );
      case 'building':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
            <line x1="9" y1="2" x2="9" y2="22"></line>
            <line x1="15" y1="2" x2="15" y2="22"></line>
            <line x1="4" y1="12" x2="9" y2="12"></line>
            <line x1="15" y1="12" x2="20" y2="12"></line>
          </svg>
        );
      case 'tool':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
          </svg>
        );
      case 'star':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
        );
      case 'map':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
            <line x1="8" y1="2" x2="8" y2="18"></line>
            <line x1="16" y1="6" x2="16" y2="22"></line>
          </svg>
        );
      case 'workflow':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="6" height="10" rx="1"></rect>
            <rect x="9" y="4" width="6" height="16" rx="1"></rect>
            <rect x="16" y="10" width="6" height="7" rx="1"></rect>
            <line x1="5" y1="17" x2="5" y2="17"></line>
            <line x1="12" y1="20" x2="12" y2="20"></line>
            <line x1="19" y1="17" x2="19" y2="17"></line>
          </svg>
        );
      case 'file-text':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
        );
      case 'tv':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect>
            <polyline points="17 2 12 7 7 2"></polyline>
          </svg>
        );
      case 'mail':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
        );
      default:
        return null;
    }
  };

  // Function to toggle navigation expansion
  const toggleNavExpansion = () => {
    setIsNavExpanded(!isNavExpanded);
  };

  // Function to close the special offer card
  const closeSpecialOffer = () => {
    setIsSpecialOfferVisible(false);
  };

  return (
    <section id="hero" className="relative min-h-[90vh] pt-20 sm:pt-24 md:pt-28 pb-16 md:min-h-screen md:pb-0">
      {/* Site Navigation Sidebar */}
      <div className={`fixed top-1/2 transform -translate-y-1/2 z-50 hidden md:block transition-all duration-500 ease-in-out ${
        isNavExpanded ? 'right-8 opacity-100' : 'right-0 opacity-0 pointer-events-none'
      }`}>
        <div className="flex flex-col gap-2 p-2 rounded-md">
          {/* Section indicator line */}
          <div className="absolute top-0 bottom-0 right-5 w-[1px] bg-gray-300/30"></div>
          
          {siteNavigation.map((item, index) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="group relative"
            >
              {/* Connector line to main vertical line */}
              <div className={`absolute right-0 top-1/2 h-[1px] w-4 bg-gray-300/60 transform -translate-y-1/2 ${
                activeSection === item.id ? 'bg-primary' : ''
              }`}></div>
              
              {/* Section number */}
              <div className="absolute right-6 top-1/2 transform -translate-y-1/2 text-[10px] font-mono text-gray-400 opacity-50">
                {(index + 1).toString().padStart(2, '0')}
              </div>
              
              {/* Icon and label container */}
              <div className={`flex items-center gap-2 pl-3 pr-10 py-1 rounded-md transition-all duration-300 ${
                activeSection === item.id 
                  ? 'bg-white/10 border border-primary/20 shadow-sm' 
                  : 'border border-transparent hover:border-gray-300/20'
              }`}>
                <div className={`flex items-center justify-center h-7 w-7 rounded-md border ${
                  activeSection === item.id 
                    ? 'border-primary text-primary' 
                    : 'border-gray-300/60 text-gray-500'
                }`}>
                  <Icon name={item.icon} className="w-3.5 h-3.5" />
                </div>
                
                <span className={`text-xs font-medium whitespace-nowrap transition-opacity duration-300 ${
                  activeSection === item.id 
                    ? 'text-primary' 
                    : 'text-gray-500'
                }`}>
                  {item.label}
                </span>
              </div>
            </button>
          ))}
        </div>
        
        {/* UX Enhancement Card */}
        <div className="absolute inset-0 -z-10 bg-secondary/20 backdrop-blur-sm rounded-xl shadow-lg border border-white/5 p-2"></div>
        
        {/* Keyboard shortcut hint */}
        <div className="absolute -bottom-12 right-0 text-xs text-gray-400/80 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-md border border-white/10 shadow-sm">
          <div className="flex items-center gap-1">
            <span className="text-[10px]">Pro tip:</span>
            <kbd className="px-1 py-0.5 bg-white/30 rounded text-[8px] font-mono">1-9</kbd>
            <span className="text-[10px]">to navigate</span>
          </div>
        </div>
      </div>
      
      {/* Toggle button - outside the nav */}
      <button 
        onClick={toggleNavExpansion}
        className={`fixed z-50 top-1/2 transform -translate-y-1/2 transition-all duration-500 ease-in-out
          h-10 w-10 bg-white/40 backdrop-blur-sm rounded-l-md flex items-center justify-center
          border-l border-t border-b border-white/20 shadow-sm hover:bg-white/60
          ${isNavExpanded ? 'right-[calc(11.67rem+1px)]' : 'right-1'}`}
        aria-label={isNavExpanded ? "Collapse navigation" : "Expand navigation"}
      >
        {/* Reversed icon: arrow now points right when expanded, left when collapsed */}
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          stroke="currentColor" 
          className={`w-4 h-4 text-gray-700 transition-transform duration-300 ${isNavExpanded ? 'rotate-180' : 'rotate-0'}`}
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
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
              <h1 className="min-h-[1.5em] h-[1.5em] w-full overflow-visible text-ellipsis text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-5xl 2xl:text-5xl">
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
              <div className="text-primary h-[1.5em] overflow-hidden text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-5xl 2xl:text-5xl">{titles[currentSlide].highlight}</div>
            </div>
            
            <p className="text-sm sm:text-base md:text-lg text-gray-700 max-w-xl font-medium backdrop-blur-sm bg-white/10 p-2 sm:p-3 rounded-lg">
            We connect you with top-rated, local, vetted contractors and provide you with multiple bids to ensure you get the best deal for your renovations, hassle-free.
            </p>
            
            <div className="flex flex-col sm:flex-row sm:justify-between gap-3 sm:gap-4 pt-4 max-w-xl">
              <Link
                href="/get-started"
                className="btn btn-primary btn-eclipse-glow shadow-lg shadow-primary/20 transition-all text-base sm:text-lg px-6 py-3 w-full sm:flex-grow
                  hover:bg-primary hover:text-white hover:shadow-md
                  hover:-translate-y-0.5 hover:scale-[1.03]
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40
                  active:scale-95"
              >
                Start Your Dream Renovation
              </Link>
              <Link
                href="/how-it-works"
                className="btn bg-white text-primary border border-primary/20 transition-all text-sm sm:text-base w-full sm:w-auto sm:whitespace-nowrap sm:min-w-[140px] flex justify-center items-center
                  hover:bg-lavender hover:shadow-md
                  hover:-translate-y-0.5 hover:scale-[1.03]
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40
                  active:scale-95"
              >
                How It Works
              </Link>
            </div>
            
            {/* Summer Special Offer */}
            {isSpecialOfferVisible && (
              <div className="hidden sm:block mt-6 sm:mt-8 rounded-lg bg-white/70 backdrop-blur-sm border border-primary/10 shadow-sm overflow-hidden relative">
                <button 
                  onClick={closeSpecialOffer}
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition-colors"
                  aria-label="Close summer special offer"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
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
                        <span>24/7 support from our dedicated matchmakers</span>
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
            )}
          </div>
          
          <div className="relative mt-6 sm:mt-8 lg:mt-0 rounded-lg shadow-lg">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
} 