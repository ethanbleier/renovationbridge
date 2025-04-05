'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

const platforms = [
  { name: 'ABC', logo: '/images/platforms/abc.png' },
  { name: 'Google', logo: '/images/platforms/google.jpeg' },
  { name: 'Houzz', logo: '/images/platforms/houzz.png' },
  { name: 'NBC', logo: '/images/platforms/nbc.png' },
  { name: 'Nextdoor', logo: '/images/platforms/nextdoor.png' },
  { name: 'Yelp', logo: '/images/platforms/yelp.webp' },
]

export default function PlatformSection() {
  // Duration of one full animation cycle (in seconds)
  const animationDuration = 30
  
  return (
    <section className="py-8 sm:py-10 md:py-12 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-10">Trusted By</h2>
        
        <div className="relative w-full max-w-5xl mx-auto overflow-hidden h-[70px] sm:h-[100px]">
          {/* Gradient fade on left edge */}
          <div className="absolute left-0 top-0 bottom-0 w-[50px] sm:w-[100px] z-10 bg-gradient-to-r from-white to-transparent"></div>
          
          <div className="w-full h-full flex items-center relative">
            {/* Create a continuous animation by duplicating the logos */}
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
              {/* First set of logos */}
              {platforms.map((platform) => (
                <div
                  key={platform.name}
                  className="inline-flex items-center justify-center w-[80px] sm:w-[120px] h-[50px] sm:h-[80px]"
                >
                  <Image
                    src={platform.logo}
                    alt={platform.name}
                    width={120}
                    height={80}
                    className="object-contain max-h-[50px] sm:max-h-[80px] max-w-[80px] sm:max-w-[120px]"
                  />
                </div>
              ))}
              
              {/* Duplicate set for continuous flow */}
              {platforms.map((platform) => (
                <div
                  key={`${platform.name}-duplicate`}
                  className="inline-flex items-center justify-center w-[80px] sm:w-[120px] h-[50px] sm:h-[80px]"
                >
                  <Image
                    src={platform.logo}
                    alt={platform.name}
                    width={120}
                    height={80}
                    className="object-contain max-h-[50px] sm:max-h-[80px] max-w-[80px] sm:max-w-[120px]"
                  />
                </div>
              ))}
            </motion.div>
          </div>
          
          {/* Gradient fade on right edge */}
          <div className="absolute right-0 top-0 bottom-0 w-[50px] sm:w-[100px] z-10 bg-gradient-to-l from-white to-transparent"></div>
        </div>
      </div>
    </section>
  )
}
