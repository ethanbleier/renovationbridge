import React from 'react';
import Image from 'next/image';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { CollapsibleTranscriptProps } from './types';

// Lazily render <video> client-side so it never blocks SSR
const Video = dynamic(() => import('./VideoPlayer'), { ssr: false });
const YouTubeEmbed = dynamic(() => import('./YouTubeEmbed'), { ssr: false });

// Client component for collapsible transcript
const CollapsibleTranscript = dynamic<CollapsibleTranscriptProps>(() => import('./CollapsibleTranscript'), { ssr: false });

export const metadata: Metadata = {
  title: 'About Us | Renovation Bridge',
  description: 'Learn about the founders of Renovation Bridge, their mission, and their commitment to making home renovations easier.'
};

export default function AboutUsPage() {
  return (
    <div className="relative bg-black text-white min-h-screen">
      {/* Main content area */}
      <div className="py-10 sm:py-16 px-5 sm:px-6 lg:px-12 xl:px-16">
        <div className="max-w-[1920px] mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold mb-10 sm:mb-16 text-center mt-8 sm:mt-12">ABOUT US</h1>
          
          {/* Introduction text */}
          <div className="mb-10 sm:mb-16 max-w-5xl mx-auto">
            <p className="text-base md:text-lg mb-4 leading-relaxed">
              Founded by Onn Matalon and Jacob Gabriel, Renovation Bridge exists to make home renovations simpler, faster, and more convenient. We know how overwhelming it can be to find, vet, and compare contractors—so we built a better way.
            </p>
            <p className="text-base md:text-lg mb-4 leading-relaxed">
              Our expert team guides you through every step, from initial planning and permits to project completion. We connect you with fully vetted, top-rated local contractors, deliver multiple bids under one roof, and handle the heavy lifting so you can focus on what matters most: creating the home of your dreams.
            </p>
          </div>
          
          {/* Founders section with side-by-side images */}
          <div className="mb-20 sm:mb-28">
            {/* Founders photos side-by-side */}
            <div className="flex flex-row justify-center gap-2 sm:gap-4 mb-12 sm:mb-16 px-2 sm:px-0">
              <div className="flex flex-col items-center w-1/2 sm:w-[400px] sm:h-[480px] lg:w-[400px] lg:h-[600px]">
                <div className="relative w-full h-[300px] sm:w-[400px] sm:h-[480px] lg:w-[400px] lg:h-[600px] overflow-hidden rounded-l-lg">
                  <Image 
                    src="/images/about-us/onn.jpeg" 
                    alt="Onn Matalon" 
                    fill 
                    className="object-contain" 
                    sizes="(max-width: 639px) 50vw, (max-width: 1023px) 400px, 400px"
                    quality={90}
                  />
                </div>
                <h3 className="text-xl font-semibold mt-3">Onn Matalon</h3>
                <p className="text-gray-400 text-sm">FOUNDER</p>
              </div>
              
              <div className="flex flex-col items-center w-1/2 sm:w-[400px] sm:h-[480px] lg:w-[400px] lg:h-[600px]">
                <div className="relative w-full h-[300px] sm:w-[400px] sm:h-[480px] lg:w-[400px] lg:h-[600px] overflow-hidden rounded-r-lg">
                  <Image 
                    src="/images/about-us/jacob.jpeg" 
                    alt="Jacob Gabriel" 
                    fill 
                    className="object-contain" 
                    sizes="(max-width: 639px) 50vw, (max-width: 1023px) 400px, 400px"
                    quality={90}
                  />
                </div>
                <h3 className="text-xl font-semibold mt-3">Jacob Gabriel</h3>
                <p className="text-gray-400 text-sm">CO-FOUNDER</p>
              </div>
            </div>
            
            {/* Founders bios in a two-column layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
              {/* Onn Matalon */}
              <div className="border-t border-gray-700 pt-8">
                <div className="flex flex-col h-full">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold uppercase mb-3 sm:mb-4">ONN MATALON</h2>
                    <div className="uppercase text-gray-400 mb-6 sm:mb-8">FOUNDER</div>
                    <div className="mt-6 mb-8 text-gray-300 text-sm sm:text-base">
                      <div className="font-semibold mb-1">Contact Onn:</div>
                      <div>
                        <a href="mailto:onn@renovationbridge.com" className="hover:underline">
                          onn@renovationbridge.com
                        </a>
                      </div>
                      <div>
                        <a href="tel:9253914419" className="hover:underline">
                          925&nbsp;391&nbsp;4419
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-gray-200 space-y-4 leading-relaxed">
                    <p className="text-sm sm:text-base">Hey, I'm Onn Matalon, founder of Renovation Bridge. I started this company with one simple goal: to make home renovations easier, better, and way less stressful for homeowners. </p>
                    <p className="text-sm sm:text-base">Our vision is to expand across the country and become the trusted platform homeowners turn to when they want to renovate with confidence.</p>
                    <p className="text-sm sm:text-base">Construction has been in my blood from day one. I grew up around job sites, tools, and blueprints. Coming from a family of contractors, it was pretty much my second language. At 18, I got my real estate license, and not long after, launched Renovation Bridge to bring together everything I love about construction and the personal touch that homeowners need when tackling big projects.</p>
                    <p className="text-sm sm:text-base">When I'm not working, you'll probably find me rock climbing, training jiu-jitsu, or snowboarding. I'm a big believer that pushing your limits physically makes you sharper in business and it's that same energy that drives everything we're building at Renovation Bridge.</p>
                    <p className="text-sm sm:text-base">And we're just getting started. With my co-founder Jacob by my side, we're ready to completely change the home improvement game and create a better experience for homeowners everywhere.</p>
                  </div>
                </div>
              </div>
              
              {/* Jacob Gabriel */}
              <div className="border-t border-gray-700 pt-8">
                <div className="flex flex-col h-full">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold uppercase mb-3 sm:mb-4">JACOB GABRIEL</h2>
                    <div className="uppercase text-gray-400 mb-6 sm:mb-8">CO-FOUNDER</div>
                    <div className="mt-6 mb-8 text-gray-300 text-sm sm:text-base">
                      <div className="font-semibold mb-1">Contact Jacob:</div>
                      <div>
                        <a href="mailto:jacob@renovationbridge.com" className="hover:underline">
                          jacob@renovationbridge.com
                        </a>
                      </div>
                      <div>
                        <a href="tel:9256834632" className="hover:underline">
                          925&nbsp;683&nbsp;4632
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-gray-200 space-y-4 leading-relaxed">
                    <p className="text-sm sm:text-base">Hi, I'm Jacob Gabriel, Co-founder of Renovation Bridge. I was born and raised in Danville, California, and from a young age, I've been passionate about business and helping people. After graduating from Monte Vista High School in 2022, I partnered up with my friend Onn Matalon to launch Renovation Bridge, driven by a shared mission to make home renovations simpler, safer, and more trustworthy for homeowners.</p>
                    <p className="text-sm sm:text-base">From the very beginning, my role has been to connect directly with homeowners — listening to their needs, building real relationships, and making sure they feel confident throughout their renovation journey. I believe that clear communication, trust, and attention to detail are what set a great experience apart from an average one.</p>
                    <p className="text-sm sm:text-base">When I'm not working on Renovation Bridge, I spend my time writing and creating music. I've released two full-length albums, channeling my passion for creativity into everything I do.</p>
                    <p className="text-sm sm:text-base">Hearing the personal stories from homeowners — about how Renovation Bridge helped make their renovation journey easier and more affordable — has truly touched me. It's the heart of why I do what I do. I'm passionate about continuing to grow Renovation Bridge into a name families can trust, and I'm committed to reaching and helping as many homeowners as possible.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* TV Features Section */}
          <div className="mt-24 sm:mt-32 mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold uppercase mb-8 text-center">Watch us on TV</h2>
            
            {/* First Feature */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 max-w-[1600px] mx-auto">
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <Video
                  src="/videos/about_us.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  captionsSrc="/captions/about_us.vtt"
                  aria-label="Renovation Bridge featured on local news"
                />
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="text-xl font-semibold mb-4">Renovation Bridge on Channel 7 with Spencer Christian </h3>
                <p className="text-gray-200 leading-relaxed">
                Renovation Bridge has been featured on multiple local news channels, showcasing our innovative approach to home renovations. Watch our latest feature on ABC Channel 7 to learn more about how we're transforming the home improvement industry.
                </p>
                
                {/* Collapsible Video Transcript */}
                <CollapsibleTranscript
                  title="Video Transcript"
                  className="mt-6"
                >
                  <div className="text-sm text-gray-300 space-y-2 max-h-[300px] overflow-y-auto sm:max-h-none sm:overflow-y-visible">
                    <p>Renovation Bridge: Making Home Renovations Easier</p>
                    <p>Founded by Onn Matalon and Jacob Gabriel, Renovation Bridge is transforming the home renovation industry. Our platform connects homeowners with fully vetted, top-rated local contractors.</p>
                    <p>We handle everything from initial planning to project completion, making your dream home a reality has never been easier. Featured on local news channels across the Bay Area, join thousands of satisfied homeowners who chose Renovation Bridge.</p>
                    <p>Visit renovationbridge.com to start your renovation journey today.</p>
                  </div>
                </CollapsibleTranscript>
              </div>
            </div>

            {/* Second Feature */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 mt-16 max-w-[1600px] mx-auto">
              <div className="flex flex-col justify-center order-2 lg:order-1">
                <h3 className="text-xl font-semibold mb-4">NBC Bay Area with Chris Chmura </h3>
                <p className="text-gray-200 leading-relaxed">
                Contractor horror stories are more common than you think — but they're also avoidable. NBC Bay Area's Chris Chmura spotlights how Renovation Bridge is helping homeowners protect themselves and renovate with confidence.
                </p>  
                
                {/* Collapsible YouTube Video Transcript */}
                <CollapsibleTranscript
                  title="Video Transcript"
                  className="mt-6"
                >
                  <div className="text-sm text-gray-300 space-y-2 max-h-[300px] overflow-y-auto sm:max-h-none sm:overflow-y-visible">
                    <p>To say that home contractors took big money, then blundered or bailed on them. Many of those jilted customers wish they'd done more digging into the contractor's past before picking them. Now, some innovators are aiming to help you avoid those mistakes.</p>
                    <p>The entrepreneurs you're about to meet saw the messes contractors leave behind and found a business opportunity. They say they'll vet a contractor's background for you before you break ground.</p>
                    <p>Kim Cafaro in Livermore says she dragged her feet beginning her kitchen renovation project because she dreaded picking a contractor. The state contractor board says it receives about 20,000 contractor complaints each year, then revokes 30 to 60 contractor licenses each month.</p>
                    <p>Onn Matalon and Jacob Gabriel started Renovation Bridge to help homeowners weed out crooked or incompetent contractors. "We know what questions to ask. We know the hard questions," says Matalon.</p>
                    <p>Renovation Bridge scrutinizes contractors before recommending them - visiting job sites, scanning court records for lawsuits, checking surety bonds and insurance, and verifying cash flow with subcontractors. This level of vetting convinced Kim she could finally invest in remodeling her home.</p>
                    <p>While homeowners don't pay directly for the service, contractors pay a finder's fee. The company sees you through from start to finish and helps tackle problems along the way.</p>
                  </div>
                </CollapsibleTranscript>
              </div>
              <div className="relative aspect-video rounded-lg overflow-hidden order-1 lg:order-2">
                <YouTubeEmbed 
                  videoId="956oI-dZcKQ" 
                  startTime={104}
                  aria-label="Renovation Bridge featured on Channel 7 News"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Shorter gradient transition to white footer */}
      <div className="h-48 sm:h-60 w-full bg-gradient-to-b from-black to-white"></div>
      <div className="w-full h-24 bg-white"></div>
    </div>
  );
}
