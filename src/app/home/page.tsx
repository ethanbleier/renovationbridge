"use client"

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react' // Import useState and useEffect
import useEmblaCarousel from 'embla-carousel-react' // Import Embla hook
import Autoplay from 'embla-carousel-autoplay' // Import Autoplay plugin
// Using Heroicons for a more modern feel
import { ShieldCheckIcon, ScaleIcon, UserGroupIcon, StarIcon, ChevronUpIcon, ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/outline'; // Added icons
import { motion, AnimatePresence } from 'framer-motion' // Import for animation

// Define interfaces for structured data
interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
}

interface Testimonial {
  quote: string;
  author: string;
  location: string;
}

interface TrustLogo {
  name: string;
  logo: string;
}

// Define animation variant for the image
const imageFadeIn = {
  hidden: { opacity: 0, x: 50 }, // Start off-screen to the right
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      delay: 0.2 // Delay slightly after text animation
    },
  },
};

// Animation for the 'after' image fade-in/out cycle
const afterImageCycle = {
  animate: {
    opacity: [0, 1, 1, 0, 0], // Sequence: fade in, stay visible, fade out, stay hidden
    transition: {
      duration: 6, // Total duration for one cycle (e.g., 6 seconds)
      ease: "easeInOut",
      times: [0, 0.25, 0.75, 1, 1], // Timing points for opacity values (0 -> 1 at 25%, 1 -> 0 at 75%-100%)
      repeat: Infinity,
      repeatDelay: 2, // Pause for 2 seconds before repeating
    },
  },
};

export default function HomePage() {
  const features: Feature[] = [
    { icon: ShieldCheckIcon, title: 'Verified Contractors', description: 'Only the best, rigorously vetted for quality and reliability.' },
    { icon: ScaleIcon, title: 'Fair Price Guarantee', description: "We negotiate competitive bids, ensuring you don't overpay." },
    { icon: UserGroupIcon, title: 'Dedicated Support', description: 'Your personal matchmaker guides you from start to finish.' },
  ];

  const testimonials: Testimonial[] = [
    { quote: "The easiest home renovation I've ever done. Found the perfect contractor without the headache.", author: "Alex R.", location: "San Francisco" },
    { quote: "Renovation Bridge handled everything, from vetting to negotiation. Saved me time and stress.", author: "Samantha B.", location: "Palo Alto" },
    { quote: "Having a dedicated expert made all the difference. Highly recommend their service!", author: "Michael T.", location: "Mountain View" },
  ];

  const trustLogos: TrustLogo[] = [
    { name: 'Google', logo: '/images/platforms/google.png' },
    { name: 'Houzz', logo: '/images/platforms/houzz.png' },
    { name: 'Nextdoor', logo: '/images/platforms/nextdoor-2.png' },
    { name: 'Yelp', logo: '/images/platforms/yelp.png' },
    { name: 'ABC', logo: '/images/platforms/abc.png' },
    { name: 'NBC', logo: '/images/platforms/nbc.png' },
  ];
  
  // Setup Embla carousel
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 3000, stopOnInteraction: false })])
  const [isOfferVisible, setIsOfferVisible] = useState(false); // Initialize as false
  const [isOfferCollapsed, setIsOfferCollapsed] = useState(false); // State for collapsed/expanded

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

  // Animation for the popup card
  const popupVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, y: 30, scale: 0.98, transition: { duration: 0.3, ease: "easeIn" } },
  };

  // Animation for the content within the card (fade in/out)
  const contentVariants = {
    collapsed: { opacity: 0, height: 0, marginTop: 0, transition: { duration: 0.3, ease: "easeInOut" } },
    expanded: { opacity: 1, height: "auto", marginTop: '1rem', transition: { duration: 0.3, ease: "easeInOut" } },
  };

  // Effect to show popup after delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOfferVisible(true);
    }, 7000); // Changed 3000 to 7000 milliseconds = 7 seconds

    // Cleanup function to clear the timeout if the component unmounts
    return () => clearTimeout(timer);
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <section className="bg-gray-50 text-gray-900 font-sans min-h-screen relative"> {/* Added relative positioning */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 md:py-32">

        {/* Hero Section - Revamped Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center mb-20 sm:mb-24 md:mb-32">
          {/* Text Content Area */}
          <div className="text-center md:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 mb-5 leading-tight"
            >
              Your Renovation, Simplified.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-lg sm:text-xl text-gray-600 mb-10 max-w-xl mx-auto md:mx-0" // Adjusted margins for alignment
            >
              Connect with trusted contractors, get fair prices, and expert support—effortlessly and <span className="font-medium">free</span>.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link href="/get-started" legacyBehavior>
                <a className="inline-block bg-blue-900 text-white text-base sm:text-lg font-semibold px-8 py-3.5 rounded-lg shadow-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-50 transition-colors duration-300">
                  Find Your Ideal Contractor
                </a>
              </Link>
            </motion.div>
          </div>

          {/* Image Area */}
          <motion.div
            className="relative h-64 md:h-auto md:min-h-[400px] rounded-lg overflow-hidden shadow-lg order-first md:order-last" // Added rounded corners, shadow, and adjusted height/order
            variants={imageFadeIn} // Keep initial container animation
            initial="hidden"
            animate="visible"
          >
            {/* Before Image (Progress) */}
            <Image
              src="/images/projects/progress.png"
              alt="Home renovation in progress"
              layout="fill" // Use fill to cover the container
              objectFit="cover" // Cover the area nicely
              priority // Load the hero image prioritized
              className="absolute inset-0" // Position absolutely
            />
            {/* After Image - Cycles in and out */}
            <motion.div
              className="absolute inset-0" // Position absolutely on top
              variants={afterImageCycle} // Use the cycling animation variant
              animate="animate" // Start the animation defined in variants
            >
              <Image
                src="/images/projects/after.png"
                alt="Completed home renovation"
                layout="fill"
                objectFit="cover"
                priority
              />
            </motion.div>
             {/* Optional: Add a subtle overlay if needed for text contrast over image */}
             {/* <div className="absolute inset-0 bg-black opacity-10"></div> */}
          </motion.div>
        </div>

        {/* Trust Logos Section */}
        {trustLogos.length > 0 && (
          <div className="max-w-4xl mx-auto text-center pt-8 pb-8 sm:pt-12 sm:pb-12">
            <p className="text-sm font-medium text-gray-500 mb-6">
              Featured and trusted by users on platforms like
            </p>
            {/* Embla Carousel Root */}
            <div className="overflow-hidden" ref={emblaRef}>
              {/* Embla Container */}
              <div className="flex"> {/* Items arranged horizontally */}
                {trustLogos.map((logo, index) => (
                  // Embla Slide
                  <div className="flex-[0_0_33.33%] sm:flex-[0_0_25%] md:flex-[0_0_20%] min-w-0 pl-4" key={index}> {/* Adjust flex-basis for number of visible logos; pl for spacing */}
                    <Image
                      src={logo.logo}
                      alt={`${logo.name} logo`}
                      width={90}
                      height={30}
                      className="object-contain opacity-90 mx-auto"
                      style={{ maxHeight: '30px' }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Summer Special Offer Popup */}
      <AnimatePresence>
        {isOfferVisible && (
          <motion.div
            className="fixed bottom-4 right-4 w-full max-w-sm z-50"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={popupVariants}
          >
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-5 rounded-lg shadow-xl relative overflow-hidden backdrop-blur-md">

              <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsOfferCollapsed(!isOfferCollapsed)}>
                <h4 className="text-lg font-semibold">☀️ Summer Special Offer</h4>
                <button
                  className="p-1 rounded-full text-blue-100 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-700 transition-colors"
                  aria-label={isOfferCollapsed ? "Expand offer" : "Collapse offer"}
                >
                  {isOfferCollapsed ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronDownIcon className="h-5 w-5" />}
                </button>
              </div>

              {/* Collapsible Content */}
              <AnimatePresence initial={false}>
                {!isOfferCollapsed && (
                  <motion.div
                    key="content"
                    initial="collapsed"
                    animate="expanded"
                    exit="collapsed"
                    variants={contentVariants}
                    className="text-sm mt-4" // Keep margin-top here for spacing when expanded
                  >
                    <p className="mb-3">Complete your form now and receive:</p>
                    <ul className="space-y-1.5 list-disc list-inside text-blue-50 marker:text-yellow-300">
                      <li>Free design consultation (valued at $399)</li>
                      <li>Free priority consultations with multiple vetted contractors</li>
                      <li>24/7 support from a dedicated RB Matchmaker</li>
                      <li>Contract negotiation and review</li>
                    </ul>
                     <Link href="/get-started" legacyBehavior>
                        <a className="mt-4 inline-block bg-yellow-400 text-blue-900 text-sm font-semibold px-4 py-2 rounded-md shadow hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-blue-700 transition-colors duration-300 w-full text-center">
                          Get Started Now
                        </a>
                      </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
