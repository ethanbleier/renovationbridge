import React from 'react';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Renovation Bridge',
  description: 'Learn about the founders of Renovation Bridge, their mission, and their commitment to making home renovations easier.'
};

export default function AboutUsPage() {
  return (
    <div className="relative bg-black text-white min-h-screen">
      {/* Main content area */}
      <div className="py-10 sm:py-16 px-5 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold mb-10 sm:mb-16 text-center mt-8 sm:mt-12">ABOUT US</h1>
          
          <div className="mb-6 sm:mb-8 max-w-4xl mx-auto">
            <p className="text-base md:text-lg mb-4 leading-relaxed">
              Founded by Onn Matalon<span className="hidden sm:inline"> (left)</span> and Jacob Gabriel<span className="hidden sm:inline"> (right)</span>, Renovation Bridge exists to make home renovations simpler, faster, and more convenient. We know how overwhelming it can be to find, vet, and compare contractors—so we built a better way.
            </p>
            <p className="text-base md:text-lg mb-4 leading-relaxed">
              Our expert team guides you through every step, from initial planning and permits to project completion. We connect you with fully vetted, top-rated local contractors, deliver multiple bids under one roof, and handle the heavy lifting so you can focus on what matters most: creating the home of your dreams.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-24 sm:mb-32">
            {/* Onn Matalon */}
            <div className="border-t border-gray-700 pt-8">
              <div className="relative flex flex-col">
                <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 md:gap-10 sm:h-[450px]">
                  <div className="flex-shrink-0 mx-auto sm:mx-0">
                    <div className="relative w-[180px] h-[240px] sm:w-[250px] sm:h-[350px] md:w-[300px] md:h-[400px]">
                      <Image 
                        src="/images/about-us/onn.jpg" 
                        alt="Onn Matalon" 
                        fill 
                        className="object-cover" 
                        sizes="(max-width: 640px) 180px, (max-width: 768px) 250px, 300px"
                      />
                    </div>
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <h2 className="text-2xl sm:text-3xl font-bold uppercase mb-3 sm:mb-4 text-center sm:text-left">ONN MATALON</h2>
                    <div className="uppercase text-gray-400 mb-6 sm:mb-8 text-center sm:text-left">FOUNDER</div>
                    <div className="text-gray-200 leading-relaxed">
                      <p className="text-sm sm:text-base">Hey, I'm Onn Matalon, founder of Renovation Bridge. I started this company with one simple goal: to make home renovations easier, better, and way less stressful for homeowners. </p>
                      <br></br>
                      <p className="text-sm sm:text-base">Our vision is to expand across the country and become the trusted platform homeowners turn to when they want to renovate with confidence.</p>
                    </div>
                  </div>
                </div>
                
                <div className="text-gray-200 space-y-4 leading-relaxed mt-8 sm:mt-16">
                  <p className="text-sm sm:text-base">Construction has been in my blood from day one. I grew up around job sites, tools, and blueprints. Coming from a family of contractors, it was pretty much my second language. At 18, I got my real estate license, and not long after, launched Renovation Bridge to bring together everything I love about construction and the personal touch that homeowners need when tackling big projects.</p>
                  <p className="text-sm sm:text-base">When I'm not working, you'll probably find me rock climbing, training jiu-jitsu, or snowboarding. I'm a big believer that pushing your limits physically makes you sharper in business and it's that same energy that drives everything we're building at Renovation Bridge.</p>
                  <p className="text-sm sm:text-base">And we're just getting started. With my co-founder Jacob by my side, we're ready to completely change the home improvement game and create a better experience for homeowners everywhere.</p>
                </div>
              </div>
            </div>
            
            {/* Jacob Gabriel */}
            <div className="border-t border-gray-700 pt-8">
              <div className="relative flex flex-col">
                <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 md:gap-10 sm:h-[450px]">
                  <div className="flex-shrink-0 mx-auto sm:mx-0">
                    <div className="relative w-[180px] h-[240px] sm:w-[250px] sm:h-[350px] md:w-[300px] md:h-[400px]">
                      <Image 
                        src="/images/about-us/jacob.png" 
                        alt="Jacob Gabriel" 
                        fill 
                        className="object-cover" 
                        sizes="(max-width: 640px) 180px, (max-width: 768px) 250px, 300px"
                      />
                    </div>
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <h2 className="text-2xl sm:text-3xl font-bold uppercase mb-3 sm:mb-4 text-center sm:text-left">JACOB GABRIEL</h2>
                    <div className="uppercase text-gray-400 mb-6 sm:mb-8 text-center sm:text-left">CO-FOUNDER</div>
                    <div className="text-gray-200 leading-relaxed">
                      <p className="text-sm sm:text-base">Hi, I'm Jacob Gabriel, Co-founder of Renovation Bridge. I was born and raised in Danville, California, and from a young age, I've been passionate about business and helping people. After graduating from Monte Vista High School in 2022, I partnered up with my friend Onn Matalon to launch Renovation Bridge, driven by a shared mission to make home renovations simpler, safer, and more trustworthy for homeowners.</p>
                    </div>
                  </div>
                </div>
                
                <div className="text-gray-200 space-y-4 leading-relaxed mt-8 sm:mt-16">
                  <p className="text-sm sm:text-base">From the very beginning, my role has been to connect directly with homeowners — listening to their needs, building real relationships, and making sure they feel confident throughout their renovation journey. I believe that clear communication, trust, and attention to detail are what set a great experience apart from an average one.</p>
                  <p className="text-sm sm:text-base">When I'm not working on Renovation Bridge, I spend my time writing and creating music. I've released two full-length albums, channeling my passion for creativity into everything I do.</p>
                  <p className="text-sm sm:text-base">Hearing the personal stories from homeowners — about how Renovation Bridge helped make their renovation journey easier and more affordable — has truly touched me. It's the heart of why I do what I do. I'm passionate about continuing to grow Renovation Bridge into a name families can trust, and I'm committed to reaching and helping as many homeowners as possible.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Gradient transition to white footer */}
      <div className="h-96 sm:h-120 w-full bg-gradient-to-b from-black to-white"></div>
    </div>
  );
}
