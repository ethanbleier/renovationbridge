'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { motion, useViewportScroll, useTransform, stagger } from 'framer-motion'

// Define the service areas
const serviceAreas = [
  { id: 'sf', name: 'San Francisco' },
  { id: 'oak', name: 'Oakland' },
  { id: 'sj', name: 'San Jose' },
  { id: 'berk', name: 'Berkeley' },
  { id: 'pal', name: 'Palo Alto' },
  { id: 'marin', name: 'Marin County' },
  { id: 'saus', name: 'Sausalito' },
  { id: 'rich', name: 'Richmond' },
  { id: 'frem', name: 'Fremont' },
  { id: 'hay', name: 'Hayward' },
  { id: 'con', name: 'Concord' },
  { id: 'val', name: 'Vallejo' },
  { id: 'daly', name: 'Daly City' },
  { id: 'sb', name: 'South Bay' },
]

const ServiceAreaMapSection = () => {
  const [activeArea, setActiveArea] = useState<string | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const areaButtonsRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useViewportScroll()
  // Parallax effect: background moves slower than scroll, zooms, and blurs
  const [sectionTop, setSectionTop] = useState(0)
  const [sectionHeight, setSectionHeight] = useState(1)
  const [areaBtnsInView, setAreaBtnsInView] = useState(false)

  useEffect(() => {
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect()
      setSectionTop(rect.top + window.scrollY)
      setSectionHeight(rect.height)
    }
    const handleResize = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        setSectionTop(rect.top + window.scrollY)
        setSectionHeight(rect.height)
      }
    }
    window.addEventListener('resize', handleResize)
    
    // Check if area buttons are in view
    const observeAreaButtons = () => {
      if (!areaButtonsRef.current) return
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setAreaBtnsInView(true)
            } else {
              setAreaBtnsInView(false)
            }
          })
        },
        { threshold: 0.2 }
      )
      
      observer.observe(areaButtonsRef.current)
      return () => observer.disconnect()
    }
    
    const cleanup = observeAreaButtons()
    
    return () => {
      window.removeEventListener('resize', handleResize)
      if (cleanup) cleanup()
    }
  }, [])

  // Calculate scroll progress within the section (0 to 1)
  const scrollProgress = useTransform(
    scrollY,
    [sectionTop, sectionTop + sectionHeight],
    [0, 1]
  )
  // Parallax background transforms
  const bgY = useTransform(scrollProgress, [0, 1], ["0%", "60%"])
  const bgScale = useTransform(scrollProgress, [0, 1], [1, 1.18])
  // Optimized blur: bgBlurAmount provides a number, which is then used to construct the filter string
  const bgBlurAmount = useTransform(scrollProgress, [0, 1], [0, 16]) // Outputs numbers 0-16
  // Optimized overlay: animate opacity instead of RGBA background
  const overlayOpacity = useTransform(scrollProgress, [0, 1], [0.55, 0.7])

  // Animated text transforms
  const titleY = useTransform(scrollProgress, [0, 1], [0, -60])
  const titleOpacity = useTransform(scrollProgress, [0, 0.2, 0.8, 1], [1, 1, 0.7, 0.3])
  const subtitleY = useTransform(scrollProgress, [0, 1], [0, -30])
  const subtitleOpacity = useTransform(scrollProgress, [0, 0.2, 0.8, 1], [1, 1, 0.5, 0])

  // City buttons animation variants
  const cityButtonContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      }
    }
  }
  
  const cityButtonVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200
      }
    }
  }

  return (
    <section
      ref={sectionRef}
      className="relative pt-48 sm:pt-64 md:pt-80 pb-20 sm:pb-28 md:pb-36 min-h-[900px] sm:min-h-[1100px] md:min-h-[1300px] flex items-center justify-center overflow-hidden bg-cream"
      style={{}}
    >
      {/* Parallax Background Image */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 w-full h-full z-0"
        style={{
          backgroundImage: `url('/images/maps/bay-area-map.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          y: bgY,
          scale: bgScale,
          filter: useTransform(bgBlurAmount, value => `blur(${value}px)`), // Optimized blur application
          willChange: 'transform, filter', // Hint for browser optimization
        }}
      />
      {/* Overlay for readability, with color transition */}
      <motion.div
        className="absolute inset-0 z-0 bg-black" // Use a solid background color
        style={{ opacity: overlayOpacity, willChange: 'opacity' }} // Animate opacity
        aria-hidden="true"
      />
      {/* Content Overlay */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 flex flex-col items-center">
        <div className="text-center mb-8 sm:mb-12 select-none">
          <motion.h2
            className="text-4xl sm:text-5xl font-extrabold text-white drop-shadow-lg tracking-tight"
            style={{ y: titleY, opacity: titleOpacity, willChange: 'transform, opacity' }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 60, damping: 20 }}
          >
            Our Service Area
          </motion.h2>
          <motion.p
            className="text-white mt-4 text-lg sm:text-2xl font-medium drop-shadow-md"
            style={{ y: subtitleY, opacity: subtitleOpacity, willChange: 'transform, opacity' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 60, damping: 20 }}
          >
            We proudly serve homeowners throughout the Bay Area
          </motion.p>
          <motion.div
            className="w-16 sm:w-20 h-1 bg-primary mx-auto rounded-full mt-4"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.6, type: 'spring' }}
            style={{ originX: 0.5 }}
          />
        </div>
        {/* Service Area Pills */}
        <motion.div
          ref={areaButtonsRef}
          className="mt-2 flex flex-col items-center justify-center w-full"
          variants={cityButtonContainerVariants}
          initial="hidden"
          animate={areaBtnsInView ? "visible" : "hidden"}
        >
          {/* First row - 7 cities */}
          <div className="flex flex-wrap justify-center gap-2 mb-2 w-full">
            {serviceAreas.slice(0, 7).map((area, index) => (
              <motion.button
                key={area.id}
                variants={cityButtonVariants}
                custom={index}
                className={`px-3 py-1.5 rounded-3xl text-sm font-semibold shadow-lg transition-all duration-200 
                  ${activeArea === area.id 
                    ? 'bg-primary text-black ring-2 ring-primary/70 drop-shadow-glow border-transparent' 
                    : 'bg-gray-900/80 text-white hover:bg-primary/90 hover:text-white hover:border-transparent border border-gray-500/30'}
                  backdrop-blur-sm hover:drop-shadow-glow`}
                onClick={() => setActiveArea(activeArea === area.id ? null : area.id)}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 0 15px rgba(255, 215, 0, 0.5)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                {area.name}
              </motion.button>
            ))}
          </div>
          
          {/* Second row - 7 cities */}
          <div className="flex flex-wrap justify-center gap-2 w-full">
            {serviceAreas.slice(7).map((area, index) => (
              <motion.button
                key={area.id}
                variants={cityButtonVariants}
                custom={index + 7}
                className={`px-3 py-1.5 rounded-3xl text-sm font-semibold shadow-lg transition-all duration-200 
                  ${activeArea === area.id 
                    ? 'bg-primary text-black ring-2 ring-primary/70 drop-shadow-glow border-transparent' 
                    : 'bg-gray-900/80 text-white hover:bg-primary/90 hover:text-white hover:border-transparent border border-gray-500/30'}
                  backdrop-blur-sm hover:drop-shadow-glow`}
                onClick={() => setActiveArea(activeArea === area.id ? null : area.id)}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 0 15px rgba(255, 215, 0, 0.5)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                {area.name}
              </motion.button>
            ))}
          </div>
        </motion.div>
        {/* Info Card Overlay: Only show when a service area is selected */}
        {activeArea && (
          <motion.div
            className="mt-10 flex justify-center w-full"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <div className="bg-gray-900/90 rounded-lg p-6 shadow-2xl border border-gray-700/50 max-w-md w-full backdrop-blur-md text-white/90">
              <h3 className="text-xl font-semibold mb-4 border-b pb-2 border-gray-700/50 text-primary drop-shadow-md">
                {serviceAreas.find(a => a.id === activeArea)?.name}
              </h3>
              <div>
                <p className="text-gray-200 mb-4">
                  Our team of vetted contractors provides top-quality renovation services in {serviceAreas.find(a => a.id === activeArea)?.name} and surrounding neighborhoods.
                </p>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-primary mr-2 drop-shadow" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Kitchen Renovations
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-primary mr-2 drop-shadow" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Bathroom Remodeling
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-primary mr-2 drop-shadow" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Home Additions
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-primary mr-2 drop-shadow" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Whole House Renovations
                  </li>
                </ul>
                <Link href="/get-started">
                  <button className="mt-5 bg-primary hover:bg-opacity-90 text-black px-4 py-2 rounded-md transition-colors w-full cta-btn font-bold shadow-lg hover:shadow-primary/20 transform hover:-translate-y-0.5 active:translate-y-0 transition-all">
                    Get Started in {serviceAreas.find(a => a.id === activeArea)?.name}
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </div>
      
      {/* Add CSS for glow effect */}
      <style jsx global>{`
        .drop-shadow-glow {
          filter: drop-shadow(0 0 8px rgba(255, 215, 0, 0.4));
        }
        
        .cta-btn:hover {
          box-shadow: 0 10px 25px -5px rgba(255, 215, 0, 0.3);
        }
      `}</style>
    </section>
  )
}

export default ServiceAreaMapSection 