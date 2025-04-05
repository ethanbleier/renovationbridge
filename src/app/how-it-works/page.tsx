import React from 'react';
import Accordion, { AccordionItem } from '@/components/ui/Accordion';
import Image from 'next/image';
import Link from 'next/link';

export default function HowItWorksPage() {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="pt-16 pb-12 md:pt-24 md:pb-16 bg-gradient-to-r from-lavender to-blue-50">
        <div className="container-custom relative">
          <Link href="/" className="absolute left-0 top-0 inline-flex items-center text-blue-600 hover:text-blue-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back
          </Link>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">How We Work</h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8">
              We make home renovations easy by connecting you with the perfect contractors for your project.
            </p>
            <Link 
              href="/get-started" 
              className="btn btn-primary text-lg px-8 py-3 hover:bg-primary-dark hover:scale-105 hover:shadow-lg transition-all duration-300"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Simple Process</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">From vision to reality in five simple steps. We've designed our process to be straightforward and stress-free.</p>
          </div>

          {/* Step 1 */}
          <div className="flex flex-col md:flex-row items-center mb-20 md:mb-32">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12">
              <div className="relative">
                <div className="bg-lavender/20 rounded-lg overflow-hidden aspect-video">
                  <Image
                    src="/images/how-it-works/step-1.png" 
                    alt="Tell us your vision"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <div className="absolute -bottom-5 -right-5 bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold">1</div>
              </div>
            </div>
            <div className="md:w-1/2">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Tell Us Your Vision</h3>
              <p className="text-gray-600 mb-6">It all starts with you. Whether you're imagining a sleek kitchen upgrade or a full-home transformation, we want to hear every detail. Share your project goals, style preferences, and must-haves — the more specific, the better.</p>
              <ul className="space-y-2">
                <li className="flex items-center"><span className="bg-primary/10 text-primary p-1 rounded-full mr-2"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg></span> Describe your dream space</li>
                <li className="flex items-center"><span className="bg-primary/10 text-primary p-1 rounded-full mr-2"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg></span> Set your budget expectations</li>
                <li className="flex items-center"><span className="bg-primary/10 text-primary p-1 rounded-full mr-2"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg></span> Share your timeline</li>
              </ul>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col md:flex-row-reverse items-center mb-20 md:mb-32">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pl-12">
              <div className="relative">
                <div className="bg-lavender/20 rounded-lg overflow-hidden aspect-video">
                  <Image
                    src="/images/how-it-works/step-2.png" 
                    alt="Expert matchmaking"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <div className="absolute -bottom-5 -left-5 bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold">2</div>
              </div>
            </div>
            <div className="md:w-1/2">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Expert Matchmaking with a Human Touch</h3>
              <p className="text-gray-600 mb-6">We handpick a selection of top contractors who specialize in your type of project and cover all your needs. These are experienced, vetted professionals ready to give you real, competitive bids.</p>
              <ul className="space-y-2">
                <li className="flex items-center"><span className="bg-primary/10 text-primary p-1 rounded-full mr-2"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg></span> Thoroughly vetted contractors</li>
                <li className="flex items-center"><span className="bg-primary/10 text-primary p-1 rounded-full mr-2"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg></span> Matched to your specific needs</li>
                <li className="flex items-center"><span className="bg-primary/10 text-primary p-1 rounded-full mr-2"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg></span> Specialized in your project type</li>
              </ul>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col md:flex-row items-center mb-20 md:mb-32">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12">
              <div className="relative">
                <div className="bg-lavender/20 rounded-lg overflow-hidden aspect-video">
                  <Image
                    src="/images/how-it-works/step-3.png" 
                    alt="Contractor walkthroughs"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <div className="absolute -bottom-5 -right-5 bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold">3</div>
              </div>
            </div>
            <div className="md:w-1/2">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Free Walkthroughs, Real Bids</h3>
              <p className="text-gray-600 mb-6">Your selected contractors will be scheduled to meet with you all in one day or spread out over the week. They'll take a detailed walkthrough of your space and provide a personalized bid for your project.</p>
              <ul className="space-y-2">
                <li className="flex items-center"><span className="bg-primary/10 text-primary p-1 rounded-full mr-2"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg></span> Convenient scheduling</li>
                <li className="flex items-center"><span className="bg-primary/10 text-primary p-1 rounded-full mr-2"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg></span> Detailed project assessment</li>
                <li className="flex items-center"><span className="bg-primary/10 text-primary p-1 rounded-full mr-2"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg></span> Competitive, transparent bids</li>
              </ul>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex flex-col md:flex-row-reverse items-center mb-20 md:mb-32">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pl-12">
              <div className="relative">
                <div className="bg-lavender/20 rounded-lg overflow-hidden aspect-video">
                  <Image
                    src="/images/how-it-works/step-4.png" 
                    alt="Make confident decisions"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <div className="absolute -bottom-5 -left-5 bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold">4</div>
              </div>
            </div>
            <div className="md:w-1/2">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Confident Decisions</h3>
              <p className="text-gray-600 mb-6">With multiple walkthroughs completed, you're equipped to make an informed choice. No pressure, no rush — just a clear path forward to the renovation you envision.</p>
              <ul className="space-y-2">
                <li className="flex items-center"><span className="bg-primary/10 text-primary p-1 rounded-full mr-2"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg></span> Compare multiple options</li>
                <li className="flex items-center"><span className="bg-primary/10 text-primary p-1 rounded-full mr-2"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg></span> Take your time deciding</li>
                <li className="flex items-center"><span className="bg-primary/10 text-primary p-1 rounded-full mr-2"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg></span> Choose with confidence</li>
              </ul>
            </div>
          </div>

          {/* Step 5 */}
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12">
              <div className="relative">
                <div className="bg-lavender/20 rounded-lg overflow-hidden aspect-video">
                  <Image
                    src="/images/how-it-works/step-5.png" 
                    alt="Ongoing support"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <div className="absolute -bottom-5 -right-5 bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold">5</div>
              </div>
            </div>
            <div className="md:w-1/2">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">We've Got Your Back</h3>
              <p className="text-gray-600 mb-6">Even after you've chosen your contractor, we're still here for you. Whether you need help communicating, resolving issues, or just want a bit of extra guidance, we've got your back. Our commitment doesn't end when your project wraps up — we offer 36 months of post-project support to ensure your satisfaction.</p>
              <ul className="space-y-2">
                <li className="flex items-center"><span className="bg-primary/10 text-primary p-1 rounded-full mr-2"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg></span> 36 months of post-project support</li>
                <li className="flex items-center"><span className="bg-primary/10 text-primary p-1 rounded-full mr-2"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg></span> Help with communication issues</li>
                <li className="flex items-center"><span className="bg-primary/10 text-primary p-1 rounded-full mr-2"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg></span> Continuous guidance throughout your project</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-primary text-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Home?</h2>
            <p className="text-lg mb-8">Let us help you find the perfect contractor for your renovation project.</p>
            <Link 
              href="/get-started" 
              className="bg-white text-primary font-medium px-8 py-3 rounded-full hover:bg-gray-100 transition-colors inline-block"
            >
              Start Your Project
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-gray-600">Everything you need to know about our service and renovation process</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold text-primary mb-3">About Our Service</h3>
                <Accordion>
                  <AccordionItem title="Why choose Renovation Bridge?">
                    <p className="text-gray-700">
                      Renovation Bridge provides a personal matchmaker who deeply understands your project vision, budget, and timeline. We give you a competitive edge in contractor selection with our pre-vetted network of professionals. Our ongoing support throughout your project and for 36 months afterward ensures your renovation journey is smooth, stress-free, and successful.
                    </p>
                  </AccordionItem>
                  
                  <AccordionItem title="How does your service work?">
                    <p className="text-gray-700">
                      Our process is simple: First, we learn about your project through a detailed consultation. Then, our expert matchmakers select the perfect contractors for your needs. We arrange convenient walkthroughs where contractors assess your space and provide competitive bids. You choose the best fit, and we provide support throughout your project and beyond with our 36-month post-project guarantee.
                    </p>
                  </AccordionItem>
                  
                  <AccordionItem title="How do you make money if your service is free?">
                    <p className="text-gray-700">
                      Our service is 100% free for homeowners. We're paid by the contractors in our network once your project is successfully completed. This success-based model ensures we're motivated to make great matches that lead to successful projects. There are never any hidden fees or costs for homeowners.
                    </p>
                  </AccordionItem>
                  
                  <AccordionItem title="What areas do you currently serve?">
                    <p className="text-gray-700">
                      We currently operate throughout the greater San Francisco Bay Area, including San Francisco, Oakland, San Jose, and surrounding communities. We're actively expanding to new regions - contact us to see if we've recently added service to your area.
                    </p>
                  </AccordionItem>
                </Accordion>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold text-primary mb-3">About Contractors</h3>
                <Accordion>
                  <AccordionItem title="How do you vet your contractors?">
                    <p className="text-gray-700">
                      Our rigorous vetting process includes verification of licenses, insurance, and business credentials. We conduct comprehensive background checks, review past work portfolios, and interview previous clients. We only partner with contractors who demonstrate exceptional craftsmanship, professionalism, and reliability. Many of our contractors have been featured on HGTV and received industry recognition.
                    </p>
                  </AccordionItem>
                  
                  <AccordionItem title="How do you match contractors to my project?">
                    <p className="text-gray-700">
                      We match contractors based on multiple factors: your project type and scope, your budget range, your design preferences, contractor specializations and experience, availability, and past performance with similar projects. We analyze these criteria to identify 3-4 contractors who represent the best possible matches for your specific renovation needs.
                    </p>
                  </AccordionItem>
                  
                  <AccordionItem title="What if I'm not satisfied with the contractors?">
                    <p className="text-gray-700">
                      Your satisfaction is our priority. If you don't connect with any of the initially matched contractors, simply let us know and we'll find additional options. We want you to feel completely confident in your choice, so we'll continue working with you until you find the right match for your project.
                    </p>
                  </AccordionItem>
                  
                  <AccordionItem title="Do you guarantee the contractor's work?">
                    <p className="text-gray-700">
                      While contractors provide their own warranties on workmanship, we offer 36 months of post-project support. If issues arise with your contractor, we'll help facilitate resolution. Our vetting process significantly reduces the risk of problems, but our team remains available to help mediate any concerns that may develop.
                    </p>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold text-primary mb-3">About Projects</h3>
              <Accordion>
                <AccordionItem title="What types of renovation projects do you support?">
                  <p className="text-gray-700">
                    We support virtually all home renovation projects, including kitchen and bathroom remodels, whole-home renovations, room additions, ADUs (Accessory Dwelling Units), basement conversions, outdoor living spaces, and more. Whether you're planning a small update or a major transformation, our network includes contractors specializing in projects of all sizes and complexities.
                  </p>
                </AccordionItem>
                
                <AccordionItem title="What determines the cost of my renovation?">
                  <p className="text-gray-700">
                    Renovation costs are influenced by several factors: square footage, quality of materials, project complexity, structural changes, plumbing or electrical updates, local building codes, and labor costs in your area. Custom elements and high-end finishes will increase your budget. Our matchmaker can help you understand typical costs for projects like yours in your specific Bay Area location.
                  </p>
                </AccordionItem>
                
                <AccordionItem title="Do I need permits for my renovation?">
                  <p className="text-gray-700">
                    Most significant renovation projects require permits, especially those involving structural changes, electrical or plumbing work, or changes to your home's footprint. Your Renovation Bridge matchmaker will help clarify permit requirements for your specific project, and your matched contractors will typically handle the permitting process as part of their services.
                  </p>
                </AccordionItem>
                
                <AccordionItem title="When is the best time to contact Renovation Bridge?">
                  <p className="text-gray-700">
                    Contact us at any stage! Whether you're just exploring possibilities, have a concrete vision, or are ready with architectural plans in hand, we can help. Early engagement allows us to guide you through the entire process, helping with budgeting and planning. However, we can step in at any point to connect you with the right contractors for your situation.
                  </p>
                </AccordionItem>
                
                <AccordionItem title="How long does a typical renovation take?">
                  <p className="text-gray-700">
                    Project timelines vary widely depending on scope and complexity. Small bathroom remodels might take 2-3 weeks, while kitchen renovations typically take 4-8 weeks. Whole-home renovations or additions can extend to several months. Your contractor will provide a detailed timeline during the bidding process, accounting for permitting, materials procurement, and construction phases.
                  </p>
                </AccordionItem>
              </Accordion>
            </div>
            
            <div className="mt-12 text-center">
              <p className="text-gray-600 mb-6">Don't see your question answered? We're here to help!</p>
              <Link 
                href="https://mail.google.com/mail/?view=cm&fs=1&to=onn@renovationbridge.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-primary font-medium hover:underline"
              >
                Email our team 
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-lavender">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Ready to start your renovation journey?
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Let us connect you with the perfect contractors for your project.
            </p>
            <Link 
              href="/get-started" 
              className="btn btn-primary text-lg px-8 py-3"
            >
              Get Started Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
