'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa'
import { FaThumbsUp, FaShare, FaEye, FaRegComment } from 'react-icons/fa'
import { FaTiktok } from 'react-icons/fa6'

const AsSeenOnTV = () => {
  return (
    <section className="py-20 bg-[#0f0f0f] text-white">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-white">As Seen on TV</h2>
          <div className="w-20 h-1 bg-red-600 mx-auto rounded-full mt-3"></div>
        </div>
        
        <div className="mb-10">
          <h2 className="text-3xl font-bold mb-2 inline-flex items-center">
            <span className="bg-red-600 p-2 rounded-lg mr-3">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="white">
                <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.58 3.5 12 3.5 12 3.5s-7.58 0-9.38.55A3.02 3.02 0 0 0 .5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.8.55 9.38.55 9.38.55s7.58 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14c.5-1.88.5-5.81.5-5.81s0-3.93-.5-5.81z"/>
                <path fill="#0f0f0f" d="M9.5 15.5V8.5l6 3.5-6 3.5z"/>
              </svg>
            </span>
            <Link href="https://www.youtube.com/watch?v=956oI-dZcKQ&ab_channel=NBCBayArea" target="_blank" className="hover:text-red-500 transition-colors">
              NBC Bay Area
            </Link>
          </h2>
          <div className="flex items-center mt-3 space-x-4">
            <div className="flex items-center space-x-2 text-sm">
              <span className="font-medium">349k</span>
              <span className="text-gray-400">Subscribers</span>
              <span className="font-medium">19k</span>
              <span className="text-gray-400">Videos</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Featured Video */}
          <div className="lg:col-span-2">
            <div className="bg-[#1f1f1f] rounded-xl overflow-hidden shadow-lg">
              {/* Video Player */}
              <div className="relative aspect-video w-full">
                <iframe 
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/956oI-dZcKQ?enablejsapi=0"
                  title="Renovation Bridge on NBC Bay Area"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              
              {/* Video Info */}
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">Renovation Bridge featured on NBC Bay Area</h3>
                
                <div className="flex items-center justify-between text-gray-400 text-sm mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="flex items-center"><FaEye className="mr-1" /> 7,177 views</span>
                    <span>Feb 11, 2025</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between border-t border-gray-700 pt-3">
                  <div className="flex space-x-4">
                    <button className="flex items-center space-x-1 hover:text-blue-400 transition">
                      <FaThumbsUp />
                      <span>1.2K</span>
                    </button>
                    <button className="flex items-center space-x-1 hover:text-blue-400 transition">
                      <FaRegComment />
                      <span>89</span>
                    </button>
                    <button className="flex items-center space-x-1 hover:text-blue-400 transition">
                      <FaShare />
                      <span>Share</span>
                    </button>
                  </div>
                  
                  <div className="flex space-x-3">
                    <Link href="https://www.facebook.com/profile.php?id=100093963673999" target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook">
                      <div className="hover:bg-[#3b3b3b] rounded-full p-2 transition-colors">
                        <FaFacebookF className="h-4 w-4" />
                      </div>
                    </Link>
                    <Link href="https://x.com/RenovationBridg" target="_blank" rel="noopener noreferrer" aria-label="Share on X (Twitter)">
                      <div className="hover:bg-[#3b3b3b] rounded-full p-2 transition-colors">
                        <FaTwitter className="h-4 w-4" />
                      </div>
                    </Link>
                    <Link href="https://www.instagram.com/renovationbridge/" target="_blank" rel="noopener noreferrer" aria-label="Share on Instagram">
                      <div className="hover:bg-[#3b3b3b] rounded-full p-2 transition-colors">
                        <FaInstagram className="h-4 w-4" />
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Video Description */}
            <div className="bg-[#1f1f1f] rounded-xl p-4 mt-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium">Description</h4>
                <button className="text-sm text-blue-400">Show more</button>
              </div>
              <p className="text-gray-300 mb-4">
                Many customers wish they have done more digging into the contractor's past before picking them. Now, some innovators are aiming to help people avoid the same predicament. Chris Chmura reports.
              </p>
              <div className="border-t border-gray-700 pt-4">
                <p className="text-sm text-gray-400 mb-2">Stay connected:</p>
                <div className="grid grid-cols-2 gap-2">
                  <Link href="https://twitter.com/nbcbayarea" target="_blank" className="text-sm text-gray-300 hover:text-blue-400 flex items-center">
                    <FaTwitter className="mr-2" /> Follow us on Twitter: @nbcbayarea
                  </Link>
                  <Link href="https://facebook.com/nbcbayarea" target="_blank" className="text-sm text-gray-300 hover:text-blue-400 flex items-center">
                    <FaFacebookF className="mr-2" /> Like us on Facebook: @nbcbayarea
                  </Link>
                  <Link href="https://instagram.com/nbcbayarea" target="_blank" className="text-sm text-gray-300 hover:text-blue-400 flex items-center">
                    <FaInstagram className="mr-2" /> Follow us on Instagram: @nbcbayarea
                  </Link>
                  <Link href="https://tiktok.com/@nbcbayarea" target="_blank" className="text-sm text-gray-300 hover:text-blue-400 flex items-center">
                    <FaTiktok className="mr-2" /> Follow us on TikTok: @nbcbayarea
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Sidebar / Recommended */}
          <div className="lg:col-span-1">
            <h3 className="font-medium mb-4 text-lg">Featured Content</h3>
            
            {/* Recommended Video 1 */}
            <div className="bg-[#1f1f1f] rounded-lg overflow-hidden mb-4 hover:bg-[#272727] transition cursor-pointer">
              <div className="flex">
                <div className="w-40 relative h-24">
                  <Image 
                    src="/images/profiles/tv.jpeg"
                    alt="Renovation Bridge featured on NBC Bay Area with Spencer Christian"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-xs px-1">2:45</div>
                </div>
                <div className="p-2">
                  <h4 className="text-sm font-medium line-clamp-2">Renovation Bridge featured on NBC Bay Area with Spencer Christian</h4>
                  <p className="text-xs text-gray-400 mt-1">18K views • 2 months ago</p>
                </div>
              </div>
            </div>
            
            
            <div className="mt-6 bg-[#1f1f1f] rounded-xl p-4">
              <p className="text-sm text-gray-300">
                Join thousands of satisfied homeowners who've found their perfect contractors through Renovation Bridge.
              </p>
              <button className="mt-4 bg-red-600 text-white px-4 py-2 rounded-full text-sm font-medium w-full hover:bg-red-700 transition duration-200">
                Get Started Today
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AsSeenOnTV 