"use client";

import React from 'react';
import Accordion, { AccordionItem } from '@/components/ui/Accordion';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRightIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

export default function FAQPage() {
  // Animation variants for consistent animations
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <div className="bg-neutral-50 min-h-screen">
      {/* Hero Section */}
      <section className="pt-20 pb-16 md:pt-28 md:pb-20 bg-gradient-to-br from-lavender via-blue-50 to-white">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={fadeIn.initial}
            animate={fadeIn.animate}
            transition={fadeIn.transition}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-5 tracking-tight">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Find answers to common questions about our services, contractors, and renovation projects.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Categories Navigation */}
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4"
        >
          {['About Our Service', 'About Contractors', 'About Projects', 'Using Renovation Bridge'].map((category) => (
            <a 
              key={category}
              href={`#${category.toLowerCase().replace(/\s+/g, '-')}`}
              className="px-5 py-2.5 bg-white rounded-full shadow-sm border border-gray-100 text-sm font-medium text-gray-700 hover:bg-primary hover:text-white hover:border-primary transition-all duration-200"
            >
              {category}
            </a>
          ))}
        </motion.div>
      </div>

      {/* FAQ Content Section */}
      <section className="py-10 md:py-16 bg-neutral-50">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="max-w-4xl mx-auto space-y-16"
          >
            {/* About Our Service */}
            <div id="about-our-service">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">About Our Service</h2>
                <div className="w-16 h-1 bg-primary rounded-full"></div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  <AccordionItem title="Why choose Renovation Bridge?">
                    <p className="text-gray-700 leading-relaxed p-2">
                      Renovation Bridge provides a personal matchmaker who deeply understands your project vision, budget, and timeline. We give you a competitive edge in contractor selection with our pre-vetted network of professionals. Our ongoing support throughout your project and for 36 months afterward ensures your renovation journey is smooth, stress-free, and successful.
                    </p>
                  </AccordionItem>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  <AccordionItem title="How does your service work?">
                    <p className="text-gray-700 leading-relaxed p-2">
                      Our process is simple: First, we learn about your project through a detailed consultation. Then, our expert matchmakers select the perfect contractors for your needs. We arrange convenient walkthroughs where contractors assess your space and provide competitive bids. You choose the best fit, and we provide support throughout your project and beyond with our 36-month post-project guarantee.
                    </p>
                  </AccordionItem>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  <AccordionItem title="How do you make money if your service is free?">
                    <p className="text-gray-700 leading-relaxed p-2">
                      Our service is 100% free for homeowners. We're paid by the contractors in our network once your project is successfully completed. This success-based model ensures we're motivated to make great matches that lead to successful projects. There are never any hidden fees or costs for homeowners.
                    </p>
                  </AccordionItem>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  <AccordionItem title="What areas do you currently serve?">
                    <p className="text-gray-700 leading-relaxed p-2">
                      We currently operate throughout the greater San Francisco Bay Area, including San Francisco, Oakland, San Jose, and surrounding communities. We're actively expanding to new regions - contact us to see if we've recently added service to your area.
                    </p>
                  </AccordionItem>
                </div>
              </div>
            </div>
            
            {/* About Contractors */}
            <div id="about-contractors">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">About Contractors</h2>
                <div className="w-16 h-1 bg-primary rounded-full"></div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  <AccordionItem title="How do you vet your contractors?">
                    <p className="text-gray-700 leading-relaxed p-2">
                      Our rigorous vetting process includes verification of licenses, insurance, and business credentials. We conduct comprehensive background checks, review past work portfolios, and interview previous clients. We only partner with contractors who demonstrate exceptional craftsmanship, professionalism, and reliability. Many of our contractors have been featured on HGTV and received industry recognition.
                    </p>
                  </AccordionItem>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  <AccordionItem title="How do you match contractors to my project?">
                    <p className="text-gray-700 leading-relaxed p-2">
                      We match contractors based on multiple factors: your project type and scope, your budget range, your design preferences, contractor specializations and experience, availability, and past performance with similar projects. We analyze these criteria to identify 3-4 contractors who represent the best possible matches for your specific renovation needs.
                    </p>
                  </AccordionItem>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  <AccordionItem title="What if I'm not satisfied with the contractors?">
                    <p className="text-gray-700 leading-relaxed p-2">
                      Your satisfaction is our priority. If you don't connect with any of the initially matched contractors, simply let us know and we'll find additional options. We want you to feel completely confident in your choice, so we'll continue working with you until you find the right match for your project.
                    </p>
                  </AccordionItem>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  <AccordionItem title="Do you guarantee the contractor's work?">
                    <p className="text-gray-700 leading-relaxed p-2">
                      While contractors provide their own warranties on workmanship, we offer 36 months of post-project support. If issues arise with your contractor, we'll help facilitate resolution. Our vetting process significantly reduces the risk of problems, but our team remains available to help mediate any concerns that may develop.
                    </p>
                  </AccordionItem>
                </div>
              </div>
            </div>
            
            {/* About Projects */}
            <div id="about-projects">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">About Projects</h2>
                <div className="w-16 h-1 bg-primary rounded-full"></div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  <AccordionItem title="What types of renovation projects do you support?">
                    <p className="text-gray-700 leading-relaxed p-2">
                      We support virtually all home renovation projects, including kitchen and bathroom remodels, whole-home renovations, room additions, ADUs (Accessory Dwelling Units), basement conversions, outdoor living spaces, and more. Whether you're planning a small update or a major transformation, our network includes contractors specializing in projects of all sizes and complexities.
                    </p>
                  </AccordionItem>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  <AccordionItem title="What determines the cost of my renovation?">
                    <p className="text-gray-700 leading-relaxed p-2">
                      Renovation costs are influenced by several factors: square footage, quality of materials, project complexity, structural changes, plumbing or electrical updates, local building codes, and labor costs in your area. Custom elements and high-end finishes will increase your budget. Our matchmaker can help you understand typical costs for projects like yours in your specific Bay Area location.
                    </p>
                  </AccordionItem>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  <AccordionItem title="Do I need permits for my renovation?">
                    <p className="text-gray-700 leading-relaxed p-2">
                      Most significant renovation projects require permits, especially those involving structural changes, electrical or plumbing work, or changes to your home's footprint. Your Renovation Bridge matchmaker will help clarify permit requirements for your specific project, and your matched contractors will typically handle the permitting process as part of their services.
                    </p>
                  </AccordionItem>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  <AccordionItem title="When is the best time to contact Renovation Bridge?">
                    <p className="text-gray-700 leading-relaxed p-2">
                      Contact us at any stage! Whether you're just exploring possibilities, have a concrete vision, or are ready with architectural plans in hand, we can help. Early engagement allows us to guide you through the entire process, helping with budgeting and planning. However, we can step in at any point to connect you with the right contractors for your situation.
                    </p>
                  </AccordionItem>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  <AccordionItem title="How long does a typical renovation take?">
                    <p className="text-gray-700 leading-relaxed p-2">
                      Project timelines vary widely depending on scope and complexity. Small bathroom remodels might take 2-3 weeks, while kitchen renovations typically take 4-8 weeks. Whole-home renovations or additions can extend to several months. Your contractor will provide a detailed timeline during the bidding process, accounting for permitting, materials procurement, and construction phases.
                    </p>
                  </AccordionItem>
                </div>
              </div>
            </div>
            
            {/* Using Renovation Bridge */}
            <div id="using-renovation-bridge">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Using Renovation Bridge</h2>
                <div className="w-16 h-1 bg-primary rounded-full"></div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  <AccordionItem title="Do I need to pay for your service?">
                    <p className="text-gray-700 leading-relaxed p-2">
                      No, our service is 100% free for homeowners. We're paid by the contractors in our network after your project is successfully matched and completed. You'll never receive an invoice or fee request from us at any stage of the process.
                    </p>
                  </AccordionItem>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  <AccordionItem title="What happens after I submit my project details?">
                    <p className="text-gray-700 leading-relaxed p-2">
                      After you submit your details, a personal renovation matchmaker will contact you within 24 hours to learn more about your project. They'll then select and introduce you to 3-4 highly qualified contractors who specialize in your type of renovation. These contractors will be scheduled for on-site walkthroughs based on your availability.
                    </p>
                  </AccordionItem>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  <AccordionItem title="How quickly can I start my renovation?">
                    <p className="text-gray-700 leading-relaxed p-2">
                      The timeline varies based on project complexity and contractor availability. For smaller projects, the process from initial consultation to project start might take 2-4 weeks. Larger renovations typically require 4-8 weeks of planning before work begins. Your matchmaker will provide a clear timeline during your consultation.
                    </p>
                  </AccordionItem>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  <AccordionItem title="Can I see examples of your contractors' previous work?">
                    <p className="text-gray-700 leading-relaxed p-2">
                      Absolutely! Your matchmaker will provide project portfolios for each recommended contractor, showing past renovations similar to yours. Additionally, our contractors can share references from previous clients and specific details about relevant projects they've completed.
                    </p>
                  </AccordionItem>
                </div>
              </div>
            </div>
            
            {/* Contact Section */}
            <div className="mt-16 text-center bg-white p-10 rounded-2xl shadow-sm border border-gray-100">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Still have questions?</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">Don't see your question answered? Our team is ready to help you with any inquiries.</p>
                <Link 
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=info@renovationbridge.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-primary text-white font-medium rounded-full hover:bg-primary-dark transition-colors shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  <EnvelopeIcon className="h-4 w-4 mr-2" />
                  Email our team
                  <ChevronRightIcon className="h-4 w-4 ml-1" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary-dark text-white">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Home?</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">Let us help you find the perfect contractor for your renovation project.</p>
            <Link 
              href="/get-started" 
              className="bg-white text-primary font-medium px-8 py-4 rounded-full hover:bg-gray-100 transition-colors inline-block shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Start Your Project
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 