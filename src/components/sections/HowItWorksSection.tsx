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
      className="py-20 sm:py-24 md:py-32 bg-gradient-to-b from-lavender/40 to-lavender/60"
    >
      <div className="container-custom px-4 sm:px-6 max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="mb-16"
        >
          <motion.div variants={itemVariants} className="flex flex-col items-center">
            <span className="text-primary text-sm font-medium tracking-wider uppercase mb-3">Simple Process</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4">How It Works</h2>
            <div className="w-16 h-1 bg-primary rounded mb-6"></div>
            <p className="text-center text-gray-600 max-w-2xl mx-auto text-base sm:text-lg">
              Our streamlined process connects you with the perfect contractor for your dream renovation project
            </p>
          </motion.div>
        </motion.div>
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto"
        >
          {/* Step 1 */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-xl shadow-lg p-6 sm:p-8 transform transition-all hover:shadow-xl hover:scale-105 flex flex-col relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl mr-4">1</div>
              <h3 className="text-xl font-bold">Submit Your Project</h3>
            </div>
            <p className="text-gray-600 mb-5">
              Share your vision by completing our simple project form. We collect the essential details to understand your needs.
            </p>
            <ul className="space-y-3 mb-6 text-sm">
              {[
                "Describe your renovation scope and goals",
                "Set your budget parameters",
                "Specify your desired timeline"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="bg-primary/10 p-1 rounded mr-3 text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
            <div className="h-0.5 w-full bg-gray-100 mb-5"></div>
            <div className="mt-auto">
              <Link href="/get-started" className="text-primary text-sm font-medium group-hover:text-primary/80 transition-colors duration-200 inline-flex items-center">
                Get Started
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </motion.div>
          
          {/* Step 2 */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-xl shadow-lg p-6 sm:p-8 transform transition-all hover:shadow-xl hover:scale-105 flex flex-col relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl mr-4">2</div>
              <h3 className="text-xl font-bold">Get Matched</h3>
            </div>
            <p className="text-gray-600 mb-5">
              We'll connect you with pre-vetted contractors who specialize in your specific project type and requirements.
            </p>
            <ul className="space-y-3 mb-6 text-sm">
              {[
                "Review profiles of qualified contractors",
                "Compare past work and client testimonials",
                "Evaluate quotes and project approaches"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="bg-primary/10 p-1 rounded mr-3 text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
            <div className="h-0.5 w-full bg-gray-100 mb-5"></div>
            <div className="mt-auto">
              <Link href="/how-it-works" className="text-primary text-sm font-medium group-hover:text-primary/80 transition-colors duration-200 inline-flex items-center">
                How Matching Works
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </motion.div>
          
          {/* Step 3 */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-xl shadow-lg p-6 sm:p-8 transform transition-all hover:shadow-xl hover:scale-105 flex flex-col relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl mr-4">3</div>
              <h3 className="text-xl font-bold">Start Renovation</h3>
            </div>
            <p className="text-gray-600 mb-5">
              Choose your ideal contractor and begin your renovation journey with confidence and our continued support.
            </p>
            <ul className="space-y-3 mb-6 text-sm">
              {[
                "Finalize project details and contracts",
                "Receive ongoing support from our team",
                "Track progress and project milestones"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="bg-primary/10 p-1 rounded mr-3 text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
            <div className="h-0.5 w-full bg-gray-100 mb-5"></div>
            <div className="mt-auto">
              <Link href="resources/faq/" className="text-primary text-sm font-medium group-hover:text-primary/80 transition-colors duration-200 inline-flex items-center">
                Our Support Process
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
          className="text-center mt-16"
        >
          <Link 
            href="/how-it-works" 
            className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-full text-white bg-primary hover:bg-primary/90 transition-colors duration-300 shadow-md hover:shadow-lg"
          >
            Learn More About Our Process
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
} 