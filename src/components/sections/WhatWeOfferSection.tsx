'use client';

import { motion, useReducedMotion } from 'framer-motion';
import {
  CubeTransparentIcon,
  ArrowsPointingOutIcon,
  ScaleIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline';
import { CheckIcon } from '@heroicons/react/24/solid';

export default function WhatWeOfferSection() {
  const prefersReducedMotion = useReducedMotion();

  const animationProps = (delay = 0) => ({
    initial: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: prefersReducedMotion ? 0 : 0.5, delay: prefersReducedMotion ? 0 : delay },
  });
  
  const offerItems = [
    {
      text: "Our mission is to help you find the perfect contractor for any home renovation project. Using our boutique algorithm we are able to connect you with multiple contractors that will fit your project like a glove.",
      Icon: CubeTransparentIcon
    },
    {
      text: "Our Team of local experts have seen almost every single type of project with years of experience in Bay Area renovations, so no matter the size and scope of your project one of our matchmakers is always there for you.",
      Icon: ArrowsPointingOutIcon
    },
    {
      text: "Due to our extensive vetting process we are able develop a hands on experience with each of our contractors giving us the upper hand in negotiations allowing us to make sure you as the home owners always get the best deal.",
      Icon: ScaleIcon
    },
    {
      text: "A home renovation is a big investment, and having someone you trust makes all the difference. That's where we come in. Our matchmakers are available 24/7 to support you every step of the way.",
      Icon: CurrencyDollarIcon
    }
  ];

  return (
    <section id="what-we-offer-section" className="py-12 sm:py-16 md:py-20 bg-white overflow-hidden">
      <div className="container-custom px-4 sm:px-6">
        <motion.h2 
          {...animationProps(0)}
          className="text-2xl sm:text-3xl font-bold text-center mb-3 sm:mb-4"
        >
          What we offer
        </motion.h2>
        <motion.p 
          {...animationProps(0.1)}
          className="text-center text-gray max-w-3xl mx-auto mb-4 sm:mb-6 text-sm sm:text-base"
        >
          Our comprehensive matchmaking experience
        </motion.p>
        <motion.p 
          {...animationProps(0.2)}
          className="text-center text-gray max-w-3xl mx-auto mb-8 sm:mb-12 text-sm sm:text-base"
        >
          Here are just a few of the benefits you get using renovation bridge for your project
        </motion.p>
        
        <div className="relative mt-12 max-w-3xl mx-auto">
          {offerItems.map((item, index) => (
            <motion.div 
              key={index}
              {...animationProps(0.3 + index * 0.1)}
              className={`relative border-l-2 border-primary pl-12 sm:pl-16 ${index === offerItems.length - 1 ? 'pb-10' : 'pb-10'} ml-4 sm:ml-5`}
            >
              <div 
                className="absolute left-[-17px] sm:left-[-21px] top-0 bg-primary text-white w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center p-1 sm:p-1.5"
              >
                <item.Icon className="w-full h-full" />
              </div>
              <p className="text-gray text-sm sm:text-base">
                {item.text}
              </p>
            </motion.div>
          ))}

          <motion.div
            {...animationProps(0.3 + offerItems.length * 0.1)}
            className="relative pl-12 sm:pl-16 ml-4 sm:ml-5"
          >
            <div 
              className="absolute left-[-17px] sm:left-[-21px] top-0 bg-green-500 text-white w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center"
            >
              <CheckIcon className="w-5 h-5 sm:w-6 sm:w-6" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 