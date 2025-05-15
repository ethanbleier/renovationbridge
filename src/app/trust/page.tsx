"use client"

import Link from 'next/link'
import Image from 'next/image'
import { useMemo, useState, useEffect } from 'react' // Import useMemo, useState, useEffect
// import useEmblaCarousel from 'embla-carousel-react' // Import Embla hook
// Using Heroicons for a more modern feel
import { ShieldCheckIcon, ScaleIcon, UserGroupIcon, StarIcon, ArrowPathIcon, CheckBadgeIcon, BuildingOfficeIcon, MapPinIcon, BookOpenIcon, DocumentTextIcon, GiftIcon } from '@heroicons/react/24/outline'; // Added gift icon
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'; // Import framer-motion

// Enhanced TypeScript interfaces with stricter typing
interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
  ariaLabel?: string;
}

interface Testimonial {
  quote: string;
  author: string;
  location: string;
  avatar?: string;
  rating?: number;
  id: string; // Added for better key management
}

interface TrustLogo {
  name: string;
  logo: string;
  id: string; // Added for better key management
}

interface Step {
  number: number;
  title: string;
  description: string;
  icon: React.ElementType;
  ariaLabel?: string;
}

export default function TrustPage() {
  const animationDuration = 30; // ADDED
  const heroImages = useMemo(() => [
    {
      id: "progress",
      src: "/images/projects/progress.png",
      alt: "Home renovation in progress",
      overlay: <div className="absolute inset-0 bg-gradient-to-b from-gray-100/40 to-transparent mix-blend-overlay z-10" aria-hidden="true" />
    },
    {
      id: "after",
      src: "/images/projects/after.png",
      alt: "Completed home renovation",
      overlay: <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent mix-blend-overlay z-10" aria-hidden="true" />
    },
  ], []);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % heroImages.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(timer); // Cleanup interval on component unmount
  }, [heroImages.length]);

  // Memoize static data to prevent unnecessary re-renders
  const features: Feature[] = useMemo(() => [
    { 
      icon: ShieldCheckIcon, 
      title: 'Top-Vetted Contractors', 
      description: 'Only the best, rigorously vetted for quality and reliability.',
      ariaLabel: 'Shield check icon representing vetted contractors'
    },
    { 
      icon: ScaleIcon, 
      title: 'Expert Negotiation Services', 
      description: "We negotiate competitive bids, ensuring you don't overpay.",
      ariaLabel: 'Scale icon representing negotiation services'
    },
    { 
      icon: UserGroupIcon, 
      title: '24/7 Personal Matchmaker', 
      description: 'Your personal matchmaker guides you from start to finish.',
      ariaLabel: 'User group icon representing personal matchmaker service'
    },
  ], []);

  const testimonials: Testimonial[] = useMemo(() => [
    { 
      id: 'testimonial-1',
      quote: "The easiest home renovation I've ever done. Found the perfect contractor without the headache.", 
      author: "Alex R.", 
      location: "San Francisco",
      avatar: "/images/testimonials/avatar1.jpg",
      rating: 5
    },
    { 
      id: 'testimonial-2',
      quote: "Renovation Bridge handled everything, from vetting to negotiation. Saved me time and stress.", 
      author: "Samantha B.", 
      location: "Palo Alto",
      avatar: "/images/testimonials/avatar2.jpg",
      rating: 5
    },
    { 
      id: 'testimonial-3',
      quote: "Having a dedicated expert made all the difference. Highly recommend their service!", 
      author: "Michael T.", 
      location: "Mountain View",
      avatar: "/images/testimonials/avatar3.jpg",
      rating: 5
    },
  ], []);

  const trustLogos: TrustLogo[] = useMemo(() => [
    { id: 'google', name: 'Google', logo: '/images/platforms/google.png' },
    { id: 'houzz', name: 'Houzz', logo: '/images/platforms/houzz.png' },
    { id: 'nextdoor', name: 'Nextdoor', logo: '/images/platforms/nextdoor-2.png' },
    { id: 'yelp', name: 'Yelp', logo: '/images/platforms/yelp.png' },
    { id: 'abc', name: 'ABC', logo: '/images/platforms/abc.png' },
    { id: 'nbc', name: 'NBC', logo: '/images/platforms/nbc.png' },
  ], []);

  const howItWorksSteps: Step[] = useMemo(() => [
    { 
      number: 1, 
      title: 'Tell us about your project', 
      description: 'Fill out a simple form about your renovation needs and preferences.',
      icon: DocumentTextIcon,
      ariaLabel: 'Step 1: Project information form'
    },
    { 
      number: 2, 
      title: 'Get matched with contractors', 
      description: 'We\'ll connect you with 3-5 pre-vetted local contractors perfect for your project.',
      icon: ArrowPathIcon,
      ariaLabel: 'Step 2: Contractor matching process'
    },
    { 
      number: 3, 
      title: 'Compare quotes and hire', 
      description: 'Review competitive bids with the help of your dedicated matchmaker and make your choice.',
      icon: CheckBadgeIcon,
      ariaLabel: 'Step 3: Quote comparison and hiring'
    },
  ], []);
  
  // Setup Embla carousel with improved options
  // const [emblaRef] = useEmblaCarousel(
  //   { 
  //     loop: true,
  //     align: 'center',
  //     skipSnaps: false,
  //     dragFree: false,
  //     containScroll: 'trimSnaps'
  //   }
  // );

  return (
    <section className="bg-cream text-black font-sans min-h-screen relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24">
        {/* Hero Section - Enhanced Responsiveness */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center mb-16 sm:mb-20 md:mb-24">
          {/* Text Content Area - Improved Typography and Spacing */}
          <div className="text-center md:text-left space-y-6">
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-black leading-tight"
            >
              Your Dream Renovation Done Right.
            </h1>
            <p
              className="text-lg sm:text-xl text-gray-600 max-w-xl mx-auto md:mx-0"
            >
              Don't gamble with your home. Get multiple competitive bids from trusted, vetted contractors—so you can choose <span className="font-medium">with confidence</span>.
            </p>
            <div>
              <Link href="/get-started" legacyBehavior>
                <a 
                  className="inline-block bg-primary text-white text-base sm:text-lg font-semibold px-6 sm:px-8 py-3 sm:py-3.5 rounded-md shadow-sm hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-cream"
                  aria-label="Start your renovation journey"
                >
                  Start Your Dream Renovation
                </a>
              </Link>
            </div>
          </div>

          {/* Image Area - Simplified with no hover effects */}
          <div
            className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] rounded-lg overflow-hidden 
            shadow-[0_20px_50px_rgba(0,0,0,0.1)] bg-white md:order-last order-first"
            role="img"
            aria-label="Before and after renovation comparison"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={heroImages[currentImageIndex].id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.0 }} // Fade duration 1 second
                className="absolute inset-0"
              >
                {heroImages[currentImageIndex].overlay}
                <Image
                  src={heroImages[currentImageIndex].src}
                  alt={heroImages[currentImageIndex].alt}
                  fill
                  priority={currentImageIndex === 0} // Priority for the first image in the sequence on initial load
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Platform Trust Section */}
        <div className="py-16 sm:py-20 md:py-24">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-10 text-black">Trusted By</h2>
          
          <div className="relative w-full max-w-5xl mx-auto overflow-hidden h-[70px] sm:h-[100px]">
            <div className="absolute left-0 top-0 bottom-0 w-[50px] sm:w-[100px] z-10 bg-gradient-to-r from-cream to-transparent"></div>
            
            <div className="w-full h-full flex items-center relative">
              <motion.div 
                className="flex space-x-8 sm:space-x-16 absolute whitespace-nowrap pl-4 sm:pl-8"
                animate={{
                  x: ["0%", "-50%"]
                }}
                transition={{
                  x: {
                    duration: animationDuration,
                    repeat: Infinity,
                    ease: "linear",
                    repeatType: "loop"
                  }
                }}
              >
                {trustLogos.map((logo) => (
                  <div
                    key={logo.id}
                    className="inline-flex items-center justify-center w-[80px] sm:w-[120px] h-[50px] sm:h-[80px]"
                  >
                    <Image
                      src={logo.logo}
                      alt={logo.name}
                      width={120}
                      height={80}
                      className="object-contain max-h-[50px] sm:max-h-[80px] max-w-[80px] sm:max-w-[120px]"
                    />
                  </div>
                ))}
                {trustLogos.map((logo) => (
                  <div
                    key={`${logo.id}-duplicate`}
                    className="inline-flex items-center justify-center w-[80px] sm:w-[120px] h-[50px] sm:h-[80px]"
                  >
                    <Image
                      src={logo.logo}
                      alt={logo.name}
                      width={120}
                      height={80}
                      className="object-contain max-h-[50px] sm:max-h-[80px] max-w-[80px] sm:max-w-[120px]"
                    />
                  </div>
                ))}
              </motion.div>
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-[50px] sm:w-[100px] z-10 bg-gradient-to-l from-cream to-transparent"></div>
          </div>
        </div>

        {/* What We Offer Section - Enhanced Grid Layout */}
        <div 
          className="py-16 sm:py-20 md:py-24"
        >
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">Why Choose Renovation Bridge?</h2>
            <p className="text-lg text-gray-600">We streamline the renovation process, so you can focus on what matters most.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 group"
              >
                <div 
                  className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-lg mb-4 group-hover:bg-primary/20"
                  aria-hidden="true"
                >
                  <feature.icon className="h-6 w-6" aria-label={feature.ariaLabel} />
                </div>
                <h3 className="text-xl font-semibold text-black mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works Section - Enhanced Layout */}
        <div 
          className="py-16 sm:py-20 md:py-24"
        >
          <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
            <div className="max-w-3xl mx-auto text-center py-12 px-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">Simple 3-Step Process</h2>
              <p className="text-lg text-gray-600">Get your renovation started in minutes, not weeks.</p>
            </div>
            
            <div className="px-4 pb-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 lg:gap-12">
                {howItWorksSteps.map((step, index) => (
                  <div 
                    key={index}
                    className="relative text-center px-4"
                    role="article"
                    aria-label={step.ariaLabel}
                  >
                    <div 
                      className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-white text-xl font-bold mb-5 relative z-10 shadow-md"
                      aria-hidden="true"
                    >
                      {step.number}
                    </div>
                    {index < howItWorksSteps.length - 1 && (
                      <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-[2px] bg-gray-200" aria-hidden="true"></div>
                    )}
                    <h3 className="text-xl font-bold mb-3 text-black">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-12">
                <Link href="/get-started" legacyBehavior>
                  <a 
                    className="inline-block bg-primary text-white text-base font-semibold px-6 py-3 rounded-md shadow-sm hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    aria-label="Start your renovation process"
                  >
                    Start Today
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Promo Card - Revamped for Better Appeal & Clarity */}
        <div
          className="max-w-4xl mx-auto mb-16 sm:mb-20 md:mb-24"
        >
          <div
            className="bg-gradient-to-br from-primary via-indigo-600 to-purple-700 text-white p-8 rounded-xl shadow-lg border border-primary/30 flex flex-col sm:flex-row items-center"
            role="complementary"
            aria-labelledby="promo-heading"
          >
            <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
              <GiftIcon className="h-16 w-16 text-yellow-300 drop-shadow-md" aria-hidden="true" />
            </div>
            <div>
              <h3 id="promo-heading" className="text-2xl font-semibold mb-1">Limited Time Offer!</h3>
              <p className="text-lg text-white/90">Complete your form today and receive a <span className="font-bold text-yellow-300">free $399 design consultation</span>.</p>
            </div>
          </div>
        </div>

        {/* Testimonials Section - Enhanced Grid and Accessibility */}
        <div 
          className="py-16 sm:py-20 md:py-24"
        >
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">What Our Clients Say</h2>
            <p className="text-lg text-gray-600">Join hundreds of happy homeowners who found their perfect contractor match.</p>
          </div>
          
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id}
                  className="relative"
                  role="article"
                  aria-label={`Testimonial from ${testimonial.author}`}
                >
                  <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md hover:shadow-lg border border-gray-100 h-full flex flex-col relative z-10">
                    <div className="flex items-center mb-4" role="img" aria-label={`${testimonial.rating} star rating`}>
                      {[...Array(testimonial.rating || 5)].map((_, i) => (
                        <StarIcon key={i} className="h-5 w-5 text-yellow-400 fill-current" aria-hidden="true" />
                      ))}
                    </div>
                    
                    <blockquote className="text-gray-700 mb-6 text-lg flex-grow">
                      <p>{testimonial.quote}</p>
                    </blockquote>
                    
                    <div className="flex items-center mt-auto pt-4 border-t border-gray-100">
                      <div>
                        <p className="font-semibold text-black">{testimonial.author}</p>
                        <div className="flex items-center text-gray-500 text-sm">
                          <MapPinIcon className="h-3 w-3 mr-1" aria-hidden="true" />
                          <span>{testimonial.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Link href="/blog" legacyBehavior>
                <a 
                  className="inline-flex items-center text-primary font-medium hover:text-primary/80 group"
                  aria-label="Read more about our services"
                >
                  <span className="group-hover:underline">Read More About Us</span>
                  <svg 
                    className="ml-2 w-4 h-4" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </Link>
            </div>
          </div>
        </div>

        {/* Final CTA Section - Enhanced Accessibility */}
        <div 
          className="py-16 sm:py-20 md:py-24 bg-primary text-white rounded-xl shadow-lg"
        >
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to Transform Your Home?</h2>
            <p className="text-lg text-white/90 mb-10 max-w-2xl mx-auto">Join thousands of homeowners who found their perfect contractor match. Our service is 100% free with no obligations.</p>
            
            <Link href="/get-started" legacyBehavior>
              <a 
                className="inline-block bg-white text-primary text-lg font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-md shadow-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary"
                aria-label="Start your renovation journey"
              >
                Start Your Renovation Journey
              </a>
            </Link>
            
            <p className="mt-6 text-white/70 text-sm">No commitment required. Free consultation.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
