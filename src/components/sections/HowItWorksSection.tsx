"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRef } from 'react';

export default function HowItWorksSection() {
  const sectionRef = useRef(null);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section 
      ref={sectionRef} 
      className="py-16 sm:py-20 md:py-32 bg-white"
    >
      <div className="container max-w-7xl mx-auto px-4 sm:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="mb-12 sm:mb-16 md:mb-20"
        >
          <motion.div variants={itemVariants} className="flex flex-col items-center">
            <span className="text-primary/80 text-xs sm:text-sm font-medium tracking-widest uppercase mb-2 sm:mb-3">Simple Process</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-center mb-3 sm:mb-5">How It Works</h2>
            <div className="w-8 sm:w-12 h-0.5 bg-primary/30 rounded-full mb-5 sm:mb-8"></div>
            <p className="text-center text-gray-500 max-w-2xl mx-auto text-sm sm:text-base md:text-lg font-light leading-relaxed">
              Our streamlined process connects you with the perfect contractor for your dream renovation project
            </p>
          </motion.div>
        </motion.div>
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-12 max-w-6xl mx-auto"
        >
          {/* Step 1 */}
          <motion.div
            variants={itemVariants}
            className="bg-white border border-gray-100 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 flex flex-col relative overflow-hidden group transition-all duration-300 hover:shadow-[0_15px_35px_-5px_rgba(0,0,0,0.08)] hover:-translate-y-1"
          >
            <div className="mb-4 sm:mb-6">
              <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/5 text-primary font-normal text-lg sm:text-xl mb-3 sm:mb-5">1</div>
              <h3 className="text-lg sm:text-xl font-medium text-gray-800 mb-2 sm:mb-3">Submit Your Project</h3>
              <p className="text-gray-500 text-sm sm:text-base font-light leading-relaxed mb-4 sm:mb-6">
                Share your vision by completing our simple project form. We collect the essential details to understand your needs.
              </p>
            </div>
            
            <ul className="space-y-2 sm:space-y-4 mb-5 sm:mb-8 text-xs sm:text-sm">
              {[
                "Describe your renovation scope and goals",
                "Set your budget parameters",
                "Specify your desired timeline"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-primary mr-2 sm:mr-3 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 sm:h-4 sm:w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-gray-600 font-light">{item}</span>
                </li>
              ))}
            </ul>
            
            <div className="mt-auto">
              <Link href="/get-started" className="text-primary text-xs sm:text-sm font-medium group-hover:text-primary/80 transition-colors duration-200 inline-flex items-center">
                Get Started
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 sm:h-4 sm:w-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </motion.div>
          
          {/* Step 2 */}
          <motion.div
            variants={itemVariants}
            className="bg-white border border-gray-100 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 flex flex-col relative overflow-hidden group transition-all duration-300 hover:shadow-[0_15px_35px_-5px_rgba(0,0,0,0.08)] hover:-translate-y-1"
          >
            <div className="mb-4 sm:mb-6">
              <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/5 text-primary font-normal text-lg sm:text-xl mb-3 sm:mb-5">2</div>
              <h3 className="text-lg sm:text-xl font-medium text-gray-800 mb-2 sm:mb-3">Get Matched</h3>
              <p className="text-gray-500 text-sm sm:text-base font-light leading-relaxed mb-4 sm:mb-6">
                We'll connect you with pre-vetted contractors who specialize in your specific project type and requirements.
              </p>
            </div>
            
            <ul className="space-y-2 sm:space-y-4 mb-5 sm:mb-8 text-xs sm:text-sm">
              {[
                "Review profiles of qualified contractors",
                "Compare past work and client testimonials",
                "Evaluate quotes and project approaches"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-primary mr-2 sm:mr-3 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 sm:h-4 sm:w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-gray-600 font-light">{item}</span>
                </li>
              ))}
            </ul>
            
            <div className="mt-auto">
              <Link href="/how-it-works" className="text-primary text-xs sm:text-sm font-medium group-hover:text-primary/80 transition-colors duration-200 inline-flex items-center">
                How Matching Works
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 sm:h-4 sm:w-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </motion.div>
          
          {/* Step 3 */}
          <motion.div
            variants={itemVariants}
            className="bg-white border border-gray-100 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 flex flex-col relative overflow-hidden group transition-all duration-300 hover:shadow-[0_15px_35px_-5px_rgba(0,0,0,0.08)] hover:-translate-y-1"
          >
            <div className="mb-4 sm:mb-6">
              <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/5 text-primary font-normal text-lg sm:text-xl mb-3 sm:mb-5">3</div>
              <h3 className="text-lg sm:text-xl font-medium text-gray-800 mb-2 sm:mb-3">Start Renovation</h3>
              <p className="text-gray-500 text-sm sm:text-base font-light leading-relaxed mb-4 sm:mb-6">
                Choose your ideal contractor and begin your renovation journey with confidence and our continued support.
              </p>
            </div>
            
            <ul className="space-y-2 sm:space-y-4 mb-5 sm:mb-8 text-xs sm:text-sm">
              {[
                "Finalize project details and contracts",
                "Receive ongoing support from our team",
                "Track progress and project milestones"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-primary mr-2 sm:mr-3 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 sm:h-4 sm:w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-gray-600 font-light">{item}</span>
                </li>
              ))}
            </ul>
            
            <div className="mt-auto">
              <Link href="resources/faq/" className="text-primary text-xs sm:text-sm font-medium group-hover:text-primary/80 transition-colors duration-200 inline-flex items-center">
                Our Support Process
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 sm:h-4 sm:w-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </motion.div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12 sm:mt-16 md:mt-20"
        >
          <Link 
            href="/how-it-works" 
            className="inline-flex items-center justify-center px-6 sm:px-8 md:px-10 py-3 sm:py-4 text-sm sm:text-base font-normal rounded-full text-white bg-primary hover:bg-primary hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 transform hover:-translate-y-1"
          >
            Learn More About Our Process
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
} 