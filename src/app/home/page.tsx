"use client"

import Link from 'next/link'
import Image from 'next/image'
import { FaCheckCircle, FaHandshake, FaUserClock, FaAward } from 'react-icons/fa'; // Import necessary icons
import { Bs1CircleFill, Bs2CircleFill, Bs3CircleFill } from "react-icons/bs"; // Import Bootstrap numbered icons
import { motion } from 'framer-motion' // Import for animation

export default function HomePage() {
  const trustLogos = [
    { name: 'ABC', logo: '/images/platforms/abc.png' },
    { name: 'Google', logo: '/images/platforms/google.png' },
    { name: 'Houzz', logo: '/images/platforms/houzz.png' },
    { name: 'NBC', logo: '/images/platforms/nbc.png' },
    { name: 'Nextdoor', logo: '/images/platforms/nextdoor-2.png' },
    {name: 'Yelp', logo: '/images/platforms/yelp.png'}
  ];
  
  // Duration of one full animation cycle (in seconds)
  const animationDuration = 15;

  return (
    <section className="bg-cream py-6 sm:py-8 md:py-10 lg:py-12 px-4 sm:px-6 md:px-8 lg:px-10">
      <div className="container-custom relative flex flex-col items-center text-center mx-auto">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-secondary leading-tight mb-4 max-w-4xl">
          Find Your Perfect Renovation Contractor – Without the Stress.
        </h1>


        <div className="text-sm sm:text-base text-gray-700 space-y-1 mb-6 md:mb-8 max-w-3xl">
          <p>
            We match you with fully vetted contractors, negotiate on your behalf, and support you through your project- <span className="italic liquid-text"> for free.</span>
          </p>
        </div>
        <div className="mb-8 md:mb-10 w-full max-w-5xl">
          <h2 className="text-base sm:text-lg md:text-xl font-semibold text-primary mb-4">What is Renovation Bridge?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 lg:gap-8 text-xs sm:text-sm">
            <div className="flex flex-col items-center p-3 bg-white/60 rounded-lg shadow-md">
              <div className="flex items-center space-x-2 mb-2">
                <Bs1CircleFill className="text-lg text-primary flex-shrink-0" />
                <FaCheckCircle className="text-lg text-green-500 flex-shrink-0" />
              </div>
              <span className="font-medium text-center mb-1">Top Vetted Contractors</span>
              <span className="text-center">Submit your project details.</span>
            </div>
            <div className="flex flex-col items-center p-3 bg-white/60 rounded-lg shadow-md">
              <div className="flex items-center space-x-2 mb-2">
                <Bs2CircleFill className="text-lg text-primary flex-shrink-0" />
                <FaHandshake className="text-lg text-blue-500 flex-shrink-0" />
              </div>
              <span className="font-medium text-center mb-1">Expert Negotiation Support</span>
              <span className="text-center">Get matched with top contractors.</span>
            </div>
            <div className="flex flex-col items-center p-3 bg-white/60 rounded-lg shadow-md">
              <div className="flex items-center space-x-2 mb-2">
                <Bs3CircleFill className="text-lg text-primary flex-shrink-0" />
                <FaUserClock className="text-lg text-purple-500 flex-shrink-0" />
              </div>
              <span className="font-medium text-center mb-1">24/7 Personal Matchmaker</span>
              <span className="text-center">Renovate with support & confidence.</span>
            </div>
          </div>
        </div>

        <div className="mb-6 md:mb-8">
            <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 mb-3">Let's build your dream renovation together.</h3>
            <Link href="/get-started" legacyBehavior>
                <a className="cta-btn text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-4">
                    Get Free Contractor Matches
                </a>
            </Link>
        </div>

        {/* Fixed Positioned Testimonials Card - Center Left */}
        <div className="fixed top-1/2 left-4 -translate-y-1/2 w-40 xl:w-48 p-8 rounded-lg shadow-xl bg-white/80 backdrop-blur-sm hidden lg:flex flex-col space-y-4 z-10">
             <h4 className="text-sm font-semibold text-primary mb-1 text-center">What our clients say</h4>
             <blockquote className="border-l-4 border-secondary pl-3 text-xs italic text-gray-800 mb-4">
               <p className="mb-1">"I saved so much time - and money - thanks to Renovation Bridge!"</p>
               <cite className="font-medium not-italic text-xs text-gray-600">- Jason, San Mateo</cite>
             </blockquote>
             
             <blockquote className="border-l-4 border-secondary pl-3 text-xs italic text-gray-800">
               <p className="mb-1">"They made my renovation stress-free and found me the perfect contractor!"</p>
               <cite className="font-medium not-italic text-xs text-gray-600">- Kim, Livermore</cite>
             </blockquote>
        </div>

        {/* Fixed Positioned CTA Card */}
        <motion.div 
            className="fixed bottom-4 left-4 w-60 xl:w-72 p-4 rounded-lg shadow-xl bg-gradient-to-r from-primary to-secondary text-white hidden lg:flex flex-col items-center text-center space-y-2 z-50"
            whileHover={{ 
                scale: 1.03, 
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
            <FaAward className="text-3xl text-yellow-300 flex-shrink-0 mb-1" />
            <p className="text-sm font-semibold">
                Complete your form today and receive a FREE $399 Design Consultation!
            </p>
             <Link href="/get-started" legacyBehavior>
               <motion.a 
                 className="mt-2 inline-block bg-white text-primary text-xs font-semibold px-3 py-1.5 rounded transition-colors"
                 whileHover={{ 
                   scale: 1.05,
                   backgroundColor: "#f9fafb",
                   boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
                 }}
                 transition={{ type: "spring", stiffness: 400, damping: 15 }}
               >
                 Continue
               </motion.a>
             </Link>
        </motion.div>

        {/* Trusted By section moved to bottom */}
        {trustLogos.length > 0 && (
          <div className="mt-16 w-full max-w-5xl mb-24 lg:mb-32">
            <p className="text-xs text-gray-600 mb-2">Trusted By:</p>
            <div className="relative w-full overflow-hidden h-[50px] sm:h-[60px]">
              {/* Gradient fade on left edge */}
              <div className="absolute left-0 top-0 bottom-0 w-[50px] sm:w-[100px] z-10 bg-gradient-to-r from-cream to-transparent"></div>
              
              <div className="w-full h-full flex items-center relative">
                {/* Create a continuous animation by duplicating the logos */}
                <motion.div 
                  className="flex space-x-8 sm:space-x-16 absolute whitespace-nowrap pl-4 sm:pl-8"
                  animate={{
                    x: ["0%", "-10%"]
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
                  {/* First set of logos */}
                  {trustLogos.map((logo) => (
                    <Link
                      key={logo.name}
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-[80px] sm:w-[100px] h-[40px] sm:h-[50px] opacity-80 hover:opacity-100 transition-opacity duration-200"
                    >
                      <Image
                        src={logo.logo}
                        alt={`${logo.name} logo`}
                        width={100}
                        height={40}
                        className="object-contain max-h-[40px] sm:max-h-[50px]"
                      />
                    </Link>
                  ))}
                  
                  {/* Duplicate logos for continuous flow */}
                  {trustLogos.map((logo) => (
                    <Link
                      key={`${logo.name}-duplicate`}
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-[80px] sm:w-[100px] h-[40px] sm:h-[50px] opacity-80 hover:opacity-100 transition-opacity duration-200"
                    >
                      <Image
                        src={logo.logo}
                        alt={`${logo.name} logo`}
                        width={100}
                        height={40}
                        className="object-contain max-h-[40px] sm:max-h-[50px]"
                      />
                    </Link>
                  ))}
                </motion.div>
              </div>
              
              {/* Gradient fade on right edge */}
              <div className="absolute right-0 top-0 bottom-0 w-[50px] sm:w-[100px] z-10 bg-gradient-to-l from-cream to-transparent"></div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
