"use client";

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function HowItWorksSection() {
  // Reference to the entire section
  const sectionRef = useRef(null);
  
  // Get scroll progress within this section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Create transforms for each card based on scroll position
  const card1Opacity = useTransform(scrollYProgress, [0, 0.2, 0.3], [0, 1, 1]);
  const card1Y = useTransform(scrollYProgress, [0, 0.2, 0.3], [100, 0, 0]);
  
  const card2Opacity = useTransform(scrollYProgress, [0.25, 0.45, 0.55], [0, 1, 1]);
  const card2Y = useTransform(scrollYProgress, [0.25, 0.45, 0.55], [100, 0, 0]);
  
  const card3Opacity = useTransform(scrollYProgress, [0.5, 0.7, 0.8], [0, 1, 1]);
  const card3Y = useTransform(scrollYProgress, [0.5, 0.7, 0.8], [100, 0, 0]);
  
  const buttonOpacity = useTransform(scrollYProgress, [0.25, 0.95], [0, 1]);
  const buttonScale = useTransform(scrollYProgress, [0.25, 0.95], [0.9, 1]);

  return (
    <section ref={sectionRef} className="py-20 bg-lavender">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-center mb-4">How It Works</h2>
          <p className="text-center text-gray max-w-3xl mx-auto">
            Our simple process connects you with the perfect contractor for your project
          </p>
        </motion.div>
        
        <div className="space-y-16 max-w-4xl mx-auto">
          {/* Step 1 */}
          <motion.div 
            style={{ opacity: card1Opacity, y: card1Y }}
            className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all hover:shadow-xl"
          >
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/4 bg-primary p-6 flex items-center justify-center">
                <div className="w-16 h-16 bg-white text-primary rounded-full flex items-center justify-center text-2xl font-bold">
                  1
                </div>
              </div>
              <div className="md:w-3/4 p-8">
                <h3 className="text-xl font-bold mb-3">Submit Your Project</h3>
                <p className="text-gray mb-4">
                  Fill out our simple form with details about your renovation project. We collect essential information to understand your vision, budget, and timeline requirements.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mt-1 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Describe your project scope and goals</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mt-1 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Set your budget expectations</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mt-1 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Indicate your preferred timeline</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
          
          {/* Step 2 */}
          <motion.div 
            style={{ opacity: card2Opacity, y: card2Y }}
            className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all hover:shadow-xl"
          >
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/4 bg-primary p-6 flex items-center justify-center">
                <div className="w-16 h-16 bg-white text-primary rounded-full flex items-center justify-center text-2xl font-bold">
                  2
                </div>
              </div>
              <div className="md:w-3/4 p-8">
                <h3 className="text-xl font-bold mb-3">Get Matched</h3>
                <p className="text-gray mb-4">
                  We'll match you with pre-vetted contractors who specialize in your project type. Our boutique algorithm finds professionals with proven experience in similar renovations.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mt-1 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Receive profiles of qualified contractors</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mt-1 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Review past work and client testimonials</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mt-1 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Compare quotes and project approaches</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
          
          {/* Step 3 */}
          <motion.div 
            style={{ opacity: card3Opacity, y: card3Y }}
            className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all hover:shadow-xl"
          >
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/4 bg-primary p-6 flex items-center justify-center">
                <div className="w-16 h-16 bg-white text-primary rounded-full flex items-center justify-center text-2xl font-bold">
                  3
                </div>
              </div>
              <div className="md:w-3/4 p-8">
                <h3 className="text-xl font-bold mb-3">Start Your Renovation</h3>
                <p className="text-gray mb-4">
                  Choose your preferred contractor and begin your renovation with confidence. We'll remain available throughout your project to ensure everything runs smoothly.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mt-1 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Finalize project details and contracts</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mt-1 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Receive ongoing support from our team</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mt-1 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Track progress and milestones</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          style={{ opacity: buttonOpacity, scale: buttonScale }}
          className="text-center mt-16"
        >
          <Link href="/how-it-works" className="btn btn-primary inline-flex items-center px-6 py-3">
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