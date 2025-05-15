"use client"

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useMemo } from 'react' // Import useState and useEffect
import useEmblaCarousel from 'embla-carousel-react' // Import Embla hook
import Autoplay from 'embla-carousel-autoplay' // Import Autoplay plugin
// Using Heroicons for a more modern feel
import { ShieldCheckIcon, ScaleIcon, UserGroupIcon, StarIcon, ArrowPathIcon, CheckBadgeIcon, BuildingOfficeIcon, MapPinIcon, BookOpenIcon, DocumentTextIcon, GiftIcon } from '@heroicons/react/24/outline'; // Added gift icon
import { motion } from 'framer-motion' // Import for animation
import React from 'react'

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

// Define animation variant for the image
const imageFadeIn = {
  hidden: { opacity: 0 }, // Remove x-axis movement which causes jank on mobile
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5, // Reduced from 0.8
      ease: "easeOut",
    },
  },
};

// Animation for the 'after' image fade-in/out cycle - simplified for better performance
const afterImageCycle = {
  animate: {
    opacity: [0, 1, 0], // Simplified opacity sequence
    transition: {
      duration: 5, // Reduced total duration
      ease: "easeInOut",
      times: [0, 0.5, 1], // Simplified timing points
      repeat: Infinity,
      repeatDelay: 1.5, // Reduced delay between cycles
    },
  },
};

// Add responsive animation settings
const useResponsiveAnimations = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Check if we're on client side
    if (typeof window !== 'undefined') {
      const checkIsMobile = () => {
        setIsMobile(window.innerWidth < 768);
      };
      
      // Initial check
      checkIsMobile();
      
      // Update on resize
      window.addEventListener('resize', checkIsMobile);
      
      // Cleanup
      return () => window.removeEventListener('resize', checkIsMobile);
    }
  }, []);
  
  return { isMobile };
};

export default function SavePage() {
  const { isMobile } = useResponsiveAnimations();
  
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
  const [emblaRef] = useEmblaCarousel(
    { 
      loop: true,
      align: 'center',
      skipSnaps: false,
      dragFree: false,
      containScroll: 'trimSnaps'
    }, 
    [Autoplay({ delay: 3000, stopOnInteraction: false })]
  );

  // Animation variants for staggering
  const fadeInStagger = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1, // Stagger effect
        duration: 0.5,
      },
    }),
  };

  // Section scroll animation
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="bg-cream text-black font-sans min-h-screen relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24">
        {/* Hero Section - Enhanced Responsiveness */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center mb-16 sm:mb-20 md:mb-24">
          {/* Text Content Area - Improved Typography and Spacing */}
          <div className="text-center md:text-left space-y-6 overflow-hidden">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-black leading-tight"
            >
              Your Dream Renovation Done Right.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-lg sm:text-xl text-gray-600 max-w-xl mx-auto md:mx-0"
            >
              Renovating your home shouldn't mean overpaying or guessing. With Renovation Bridge, you'll get multiple competitive bids from trusted, vetted contractors—so you can compare prices, negotiate confidently, and <span className="font-medium">save thousands on your dream renovation</span>.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link href="/get-started" legacyBehavior>
                <a 
                  className="inline-block bg-primary text-white text-base sm:text-lg font-semibold px-6 sm:px-8 py-3 sm:py-3.5 rounded-md shadow-sm hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-cream transition-all duration-200 ease-in-out transform hover:-translate-y-0.5"
                  aria-label="Start your renovation journey"
                >
                  Start Your Dream Renovation
                </a>
              </Link>
            </motion.div>
          </div>

          {/* Image Area - Simplified with no hover effects */}
          <motion.div
            className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] rounded-lg overflow-hidden 
            shadow-[0_20px_50px_rgba(0,0,0,0.1)] bg-white md:order-last order-first"
            variants={imageFadeIn}
            initial="hidden"
            animate="visible"
            role="img"
            aria-label="Before and after renovation comparison"
          >
            {/* Base image with subtle texture overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-100/40 to-transparent mix-blend-overlay z-10" aria-hidden="true"></div>
            <Image
              src="/images/projects/progress.png"
              alt="Home renovation in progress"
              fill
              priority
              className="absolute inset-0 object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            
            {/* After image with simplified display */}
            {!isMobile ? (
              <motion.div
                className="absolute inset-0"
                variants={afterImageCycle}
                animate="animate"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent mix-blend-overlay z-10" aria-hidden="true"></div>
                <Image
                  src="/images/projects/after.png"
                  alt="Completed home renovation"
                  fill
                  priority
                  className="absolute inset-0 object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </motion.div>
            ) : (
              // Static display for mobile with no hover effects
              <div className="absolute inset-0 opacity-0">
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent mix-blend-overlay z-10" aria-hidden="true"></div>
                <Image
                  src="/images/projects/after.png"
                  alt="Completed home renovation"
                  fill
                  priority
                  className="absolute inset-0 object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            )}
          </motion.div>
        </div>

        {/* Trust Logos Section - Enhanced Carousel */}
        {trustLogos.length > 0 && (
          <div className="max-w-4xl mx-auto text-center py-8 sm:py-12">
            <p className="text-sm font-medium text-gray-500 mb-6">
              Featured and trusted by users on platforms like
            </p>
            <div className="overflow-hidden" ref={emblaRef} role="region" aria-label="Trusted platforms carousel">
              <div className="flex">
                {trustLogos.map((logo) => (
                  <div 
                    className="flex-[0_0_33.33%] sm:flex-[0_0_25%] md:flex-[0_0_20%] min-w-0 pl-4" 
                    key={logo.id}
                  >
                    <Image
                      src={logo.logo}
                      alt={`${logo.name} logo`}
                      width={180}
                      height={60}
                      className="object-contain opacity-90 mx-auto"
                      style={{ maxHeight: '60px', width: 'auto' }}
                      sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, 20vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* What We Offer Section - Enhanced Grid Layout */}
        <motion.div 
          className="py-16 sm:py-20 md:py-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
        >
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">Why Choose Renovation Bridge?</h2>
            <p className="text-lg text-gray-600">We streamline the renovation process, so you can focus on what matters most.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-primary/10 transition-all duration-300 group"
                custom={index}
                variants={fadeInStagger}
              >
                <div 
                  className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-lg mb-4 group-hover:bg-primary/20 transition-colors duration-300"
                  aria-hidden="true"
                >
                  <feature.icon className="h-6 w-6" aria-label={feature.ariaLabel} />
                </div>
                <h3 className="text-xl font-semibold text-black mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* How It Works Section - Enhanced Layout */}
        <motion.div 
          className="py-16 sm:py-20 md:py-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
        >
          <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
            <div className="max-w-3xl mx-auto text-center py-12 px-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">Simple 3-Step Process</h2>
              <p className="text-lg text-gray-600">Get your renovation started in minutes, not weeks.</p>
            </div>
            
            <div className="px-4 pb-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 lg:gap-12">
                {howItWorksSteps.map((step, index) => (
                  <motion.div 
                    key={index}
                    className="relative text-center px-4"
                    custom={index}
                    variants={fadeInStagger}
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
                  </motion.div>
                ))}
              </div>
              
              <div className="text-center mt-12">
                <Link href="/get-started" legacyBehavior>
                  <a 
                    className="inline-block bg-primary text-white text-base font-semibold px-6 py-3 rounded-md shadow-sm hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200 ease-in-out transform hover:-translate-y-0.5"
                    aria-label="Start your renovation process"
                  >
                    Start Today
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Promo Card - Revamped for Better Appeal & Clarity */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={sectionVariants} // Use the existing section animation
          className="max-w-4xl mx-auto mb-16 sm:mb-20 md:mb-24" // Increased margin bottom and max-width
        >
          <div
            className="bg-gradient-to-br from-primary via-indigo-600 to-purple-700 text-white p-8 rounded-xl shadow-lg border border-primary/30 flex flex-col sm:flex-row items-center" // New gradient, padding, border, flex layout
            role="complementary" // Changed role to complementary as it's related but separate content
            aria-labelledby="promo-heading" // Use labelledby for better context
          >
            <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
              <GiftIcon className="h-16 w-16 text-yellow-300 drop-shadow-md" aria-hidden="true" /> {/* Larger icon */}
            </div>
            <div>
              <h3 id="promo-heading" className="text-2xl font-semibold mb-1">Limited Time Offer!</h3> {/* Added heading */}
              <p className="text-lg text-white/90">Complete your form today and receive a <span className="font-bold text-yellow-300">free $399 design consultation</span>.</p> {/* Emphasized value */}
            </div>
          </div>
        </motion.div>

        {/* Testimonials Section - Enhanced Grid and Accessibility */}
        <motion.div 
          className="py-16 sm:py-20 md:py-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
        >
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">What Our Clients Say</h2>
            <p className="text-lg text-gray-600">Join hundreds of happy homeowners who found their perfect contractor match.</p>
          </div>
          
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
              {testimonials.map((testimonial) => (
                <motion.div 
                  key={testimonial.id}
                  className="relative"
                  custom={testimonial.id}
                  variants={fadeInStagger}
                  role="article"
                  aria-label={`Testimonial from ${testimonial.author}`}
                >
                  <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 h-full flex flex-col relative z-10">
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
                </motion.div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Link href="/blog" legacyBehavior>
                <a 
                  className="inline-flex items-center text-primary font-medium hover:text-primary/80 transition-colors group"
                  aria-label="Read more about our services"
                >
                  <span className="group-hover:underline">Read More About Us</span>
                  <svg 
                    className="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" 
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
        </motion.div>

        {/* Final CTA Section - Enhanced Accessibility */}
        <motion.div 
          className="py-16 sm:py-20 md:py-24 bg-primary text-white rounded-xl shadow-lg"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
        >
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to Transform Your Home?</h2>
            <p className="text-lg text-white/90 mb-10 max-w-2xl mx-auto">Join thousands of homeowners who found their perfect contractor match. Our service is 100% free with no obligations.</p>
            
            <Link href="/get-started" legacyBehavior>
              <a 
                className="inline-block bg-white text-primary text-lg font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-md shadow-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary transition-all duration-200 ease-in-out transform hover:-translate-y-0.5"
                aria-label="Start your renovation journey"
              >
                Start Your Renovation Journey
              </a>
            </Link>
            
            <p className="mt-6 text-white/70 text-sm">No commitment required. Free consultation.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
