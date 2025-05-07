"use client";

import React, { useState, ReactNode, useEffect } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { useMediaQuery } from 'react-responsive';

// Custom accordion component with smooth animations
interface AccordionItemProps {
  title: string;
  children: ReactNode;
  isOpen?: boolean;
  toggle?: () => void;
}

const AccordionItem = ({ title, children, isOpen, toggle }: AccordionItemProps) => {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        className="flex justify-between items-center w-full py-4 text-left font-medium focus:outline-none"
        onClick={toggle}
      >
        <span className="text-gray-800">{title}</span>
        <svg
          className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <motion.div
        initial={false}
        animate={{ 
          height: isOpen ? 'auto' : 0, 
          opacity: isOpen ? 1 : 0 
        }}
        transition={{ 
          duration: prefersReducedMotion ? 0 : 0.3 
        }}
        className="overflow-hidden"
      >
        <div className="pb-4 text-gray-600">
          {children}
        </div>
      </motion.div>
    </div>
  );
};

// Custom accordion wrapper
interface AccordionProps {
  children: ReactNode;
  title?: string;
}

const Accordion = ({ children, title }: AccordionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="mb-8">
      {title && <h3 className="text-xl font-semibold text-primary mb-3">{title}</h3>}
      <div className="rounded-lg bg-white">
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              isOpen: openIndex === index,
              toggle: () => setOpenIndex(openIndex === index ? null : index),
            } as Partial<AccordionItemProps>);
          }
          return child;
        })}
      </div>
    </div>
  );
};

// Process step component
interface ProcessStepProps {
  number: string;
  title: string;
  description: string;
  bulletPoints: string[];
}

const ProcessStep = ({ number, title, description, bulletPoints }: ProcessStepProps) => {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20, scale: prefersReducedMotion ? 1 : 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: prefersReducedMotion ? 0.3 : 0.6, ease: "easeOut" }}
      className="relative border-l-2 border-primary pl-8 pb-12 last:pb-0 ml-4 will-change-transform"
    >
      <motion.div 
        className="absolute left-[-17px] top-0 bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center font-bold"
        initial={{ scale: prefersReducedMotion ? 1 : 0.8 }}
        whileInView={{ scale: prefersReducedMotion ? 1 : [0.8, 1.2, 1] }}
        transition={{ duration: prefersReducedMotion ? 0.3 : 0.7, times: [0, 0.5, 1] }}
      >
        {number}
      </motion.div>
      <div>
        <motion.h3 
          className="text-2xl font-bold text-gray-800 mb-3"
          initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.2 : 0.5, delay: 0.1 }}
        >
          {title}
        </motion.h3>
        <motion.p 
          className="text-gray-600 mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: prefersReducedMotion ? 0.2 : 0.5, delay: 0.1 }}
        >
          {description}
        </motion.p>
        <motion.ul 
          className="space-y-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: prefersReducedMotion ? 0.2 : 0.5, delay: 0.1 }}
        >
          {bulletPoints.map((point, index) => (
            <li key={index} className="flex items-start">
              <span className="bg-primary/10 text-primary p-1 rounded-full mr-2 mt-1 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </span>
              <span>{point}</span>
            </li>
          ))}
        </motion.ul>
      </div>
    </motion.div>
  );
};

export default function HowItWorksPage() {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  // Function to handle scroll down on arrow click
  const handleScrollDown = () => {
    const processSection = document.getElementById('process-section');
    if (processSection) {
      processSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // Prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Skip animations during SSR or on mobile
  const animationProps = !isMounted || prefersReducedMotion ? { 
    initial: {}, 
    animate: {}, 
    transition: {} 
  } : {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7 }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section - Full Screen */}
      <section className="relative min-h-screen flex flex-col justify-center pb-16">
        <Link href="/" className="absolute left-4 top-16 inline-flex items-center text-white hover:text-blue-100 transition-colors z-20 sm:top-20 md:top-24">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back
        </Link>
        
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/projects/new-home-1.jpg" 
            alt="Background" 
            fill 
            priority
            sizes="100vw"
            quality={isMobile ? 70 : 85}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQIGAwAAAAAAAAAAAAABAgMABAUGERIhMUFRsf/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFREBAQAAAAAAAAAAAAAAAAAAABH/2gAMAwEAAhEDEQA/AJeT8dgbK40zOrMZY1WNVQELvOgI5IJ1J5rn1YwJ3FO9gSktaIi/v//Z"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40 mix-blend-multiply" />
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-12 sm:pt-16 md:pt-20">
          <motion.div
            {...animationProps}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">How We Work</h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-8">
              We make home renovations easy by connecting you with the perfect contractors for your project.
            </p>
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.9 }}
              animate={prefersReducedMotion ? {} : { opacity: 1, scale: 1 }}
              transition={prefersReducedMotion ? {} : { delay: 0.2, duration: 0.3 }}
            >
              <Link
                href="/get-started"
                className="inline-block bg-primary text-white font-medium px-8 py-3 rounded-lg shadow-md hover:shadow-lg hover:bg-primary-dark transition-all duration-300"
              >
                Continue
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Bobbing down arrow */}
        <div className="absolute bottom-12 left-0 right-0 flex justify-center animate-bounce z-20">
          <div 
            className="bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md cursor-pointer hover:bg-white/90 transition-all" 
            onClick={handleScrollDown}
            aria-label="Scroll down"
            role="button"
            tabIndex={0}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" // Ensured stroke is visible on dark bg
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="text-primary sm:h-6 sm:w-6"
            >
              <path d="M12 5v14M19 12l-7 7-7-7"/>
            </svg>
          </div>
        </div>
      </section>

      {/* Process Section - Added ID and scroll margin */}
      <section id="process-section" className="py-20 bg-white scroll-mt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Simple Process</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From vision to reality in five simple steps. We've designed our process to be straightforward and stress-free.
            </p>
          </motion.div>

          <div className="relative mt-12">
            <ProcessStep
              number="1"
              title="Tell Us Your Vision"
              description="It all starts with you. Whether you're imagining a sleek kitchen upgrade or a full-home transformation, we want to hear every detail. Share your project goals, style preferences, and must-haves."
              bulletPoints={[
                "Describe your dream space",
                "Set your budget expectations",
                "Share your timeline"
              ]}
            />
            
            <ProcessStep
              number="2"
              title="Expert Matchmaking with a Human Touch"
              description="We handpick top contractors who specialize in your project type and cover all your needs. These are experienced, vetted professionals ready to give you competitive bids."
              bulletPoints={[
                "Thoroughly vetted contractors",
                "Matched to your specific needs",
                "Specialized in your project type"
              ]}
            />
            
            <ProcessStep
              number="3"
              title="Free Walkthroughs, Real Bids"
              description="Your selected contractors will meet with you to take a detailed walkthrough of your space and provide a personalized bid for your project."
              bulletPoints={[
                "Convenient scheduling",
                "Detailed project assessment",
                "Competitive, transparent bids"
              ]}
            />
            
            <ProcessStep
              number="4"
              title="Confident Decisions"
              description="With multiple walkthroughs completed, you're equipped to make an informed choice. No pressure, no rush — just a clear path forward."
              bulletPoints={[
                "Compare multiple options",
                "Take your time deciding",
                "Choose with confidence"
              ]}
            />
            
            <ProcessStep
              number="5"
              title="We've Got Your Back"
              description="Even after you've chosen your contractor, we're still here for you. We offer 36 months of post-project support to ensure your satisfaction."
              bulletPoints={[
                "36 months of post-project support",
                "Help with communication issues",
                "Continuous guidance throughout your project"
              ]}
            />
          </div>
        </div>
      </section>

      {/* CTA Section - Cleaner, more focused */}
      <section className="py-16 bg-primary">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Transform Your Home?</h2>
            <p className="text-xl text-white/90 mb-8">Let us help you find the perfect contractor for your renovation project.</p>
            <Link
              href="/get-started"
              className="inline-block bg-white text-primary font-medium px-8 py-3 rounded-lg shadow-md hover:shadow-lg hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 active:translate-y-0 active:scale-100"
            >
              Unlock Home Potential
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
