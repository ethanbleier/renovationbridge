'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FaFacebookF, FaInstagram, FaYoutube, FaThumbsUp, FaShare, FaEye, FaRegComment } from 'react-icons/fa'
import { FaTiktok, FaXTwitter } from 'react-icons/fa6'

const AsSeenOnTV = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-[#0f0f0f] text-white">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">As Seen on TV</h2>
          <div className="w-16 sm:w-20 h-1 bg-red-600 mx-auto rounded-full mt-2 sm:mt-3"></div>
        </div>
        
        <div className="mb-6 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2 inline-flex items-center">
            <span className="bg-red-600 p-1.5 sm:p-2 rounded-lg mr-2 sm:mr-3">
              <FaYoutube className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </span>
            <Link href="https://www.youtube.com/watch?v=956oI-dZcKQ&ab_channel=NBCBayArea" target="_blank" className="hover:text-red-500 transition-colors">
              NBC Bay Area
            </Link>
          </h2>
          <div className="flex items-center mt-2 sm:mt-3 space-x-2 sm:space-x-4 text-xs sm:text-sm">
            <div className="flex items-center space-x-1 sm:space-x-2">
              <span className="font-medium">349k</span>
              <span className="text-gray-400">Subscribers</span>
              <span className="font-medium">19k</span>
              <span className="text-gray-400">Videos</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Main Featured Video */}
          <div className="lg:col-span-2">
            <div className="bg-[#1f1f1f] rounded-xl overflow-hidden shadow-lg">
              {/* Video Player */}
              <div className="relative aspect-video w-full">
                <iframe 
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/956oI-dZcKQ?enablejsapi=1&origin=https://renovationbridge.com"
                  title="Renovation Bridge on NBC Bay Area"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              
              {/* Video Info */}
              <div className="p-3 sm:p-4">
                <h3 className="text-sm sm:text-xl font-semibold mb-2">Renovation Bridge featured on NBC Bay Area</h3>
                
                <div className="flex items-center justify-between text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <span className="flex items-center"><FaEye className="mr-1" /> 7,177 views</span>
                    <span>Feb 11, 2025</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between border-t border-gray-700 pt-3">
                  <div className="flex space-x-2 sm:space-x-4">
                    <button className="flex items-center space-x-1 hover:text-blue-400 transition text-xs sm:text-sm">
                      <FaThumbsUp />
                      <span>1.2K</span>
                    </button>
                    <button className="flex items-center space-x-1 hover:text-blue-400 transition text-xs sm:text-sm">
                      <FaRegComment />
                      <span>89</span>
                    </button>
                    <button className="flex items-center space-x-1 hover:text-blue-400 transition text-xs sm:text-sm">
                      <FaShare />
                      <span>Share</span>
                    </button>
                  </div>
                  
                  <div className="flex space-x-2 sm:space-x-3">
                    <Link href="https://www.facebook.com/profile.php?id=100093963673999" target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook">
                      <div className="hover:bg-[#3b3b3b] rounded-full p-1.5 sm:p-2 transition-colors">
                        <FaFacebookF className="h-3 w-3 sm:h-4 sm:w-4 text-[#1877F2]" />
                      </div>
                    </Link>
                    <Link href="https://x.com/RenovationBridg" target="_blank" rel="noopener noreferrer" aria-label="Share on X (Twitter)">
                      <div className="hover:bg-[#3b3b3b] rounded-full p-1.5 sm:p-2 transition-colors">
                        <FaXTwitter className="h-3 w-3 sm:h-4 sm:w-4 text-black" />
                      </div>
                    </Link>
                    <Link href="https://www.instagram.com/renovationbridge/" target="_blank" rel="noopener noreferrer" aria-label="Share on Instagram">
                      <div className="hover:bg-[#3b3b3b] rounded-full p-1.5 sm:p-2 transition-colors">
                        <FaInstagram className="h-3 w-3 sm:h-4 sm:w-4 text-[#E4405F]" />
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Video Description */}
            <div className="bg-[#1f1f1f] rounded-xl p-3 sm:p-4 mt-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-sm sm:font-medium">Description</h4>
              </div>
              <p className="text-gray-300 mb-4 text-xs sm:text-sm">
                Many customers wish they have done more digging into the contractor's past before picking them. Now, some innovators are aiming to help people avoid the same predicament. Chris Chmura reports.
              </p>
              <div className="border-t border-gray-700 pt-3 sm:pt-4">
                <p className="text-xs sm:text-sm text-gray-400 mb-2">Stay connected:</p>
                <div className="grid grid-cols-1 xs:grid-cols-2 gap-2">
                  <Link href="https://twitter.com/nbcbayarea" target="_blank" className="text-xs sm:text-sm text-gray-300 hover:text-blue-400 flex items-center">
                    <FaXTwitter className="mr-2 text-black" /> Follow us on X: @nbcbayarea
                  </Link>
                  <Link href="https://facebook.com/nbcbayarea" target="_blank" className="text-xs sm:text-sm text-gray-300 hover:text-blue-400 flex items-center">
                    <FaFacebookF className="mr-2 text-[#1877F2]" /> Like us on Facebook: @nbcbayarea
                  </Link>
                  <Link href="https://instagram.com/nbcbayarea" target="_blank" className="text-xs sm:text-sm text-gray-300 hover:text-blue-400 flex items-center">
                    <FaInstagram className="mr-2 text-[#E4405F]" /> Follow us on Instagram: @nbcbayarea
                  </Link>
                  <Link href="https://tiktok.com/@nbcbayarea" target="_blank" className="text-xs sm:text-sm text-gray-300 hover:text-blue-400 flex items-center">
                    <FaTiktok className="mr-2 text-black" /> Follow us on TikTok: @nbcbayarea
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Sidebar / Recommended */}
          <div className="lg:col-span-1 mt-6 lg:mt-0">
            <h3 className="font-medium mb-3 sm:mb-4 text-base sm:text-lg">Featured Content</h3>
            
            {/* Recommended Video 1 */}
            <div className="bg-[#1f1f1f] rounded-lg overflow-hidden mb-4 hover:bg-[#272727] hover:scale-105 transition-all duration-200 ease-in-out cursor-pointer">
              <Link href="/blog/kim-caffaro-success-story" className="block p-3 sm:p-4">
                <div className="flex items-start gap-x-3 sm:gap-x-4">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 relative shrink-0 overflow-hidden rounded-md">
                    <Image 
                      src="/images/profiles/tv.jpeg"
                      alt="Renovation Bridge featured on NBC Bay Area with Spencer Christian"
                      fill
                      sizes="(max-width: 639px) 96px, 112px"
                      className="object-cover"
                    />
                    <div className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-xxs sm:text-xs px-1">2:45</div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs sm:text-sm font-medium line-clamp-2 mb-0.5 sm:mb-1">Renovation Bridge featured on NBC Bay Area with Spencer Christian</h4>
                    <p className="text-[10px] leading-tight sm:text-xs sm:leading-snug text-gray-400">18K views • 2 months ago</p>
                  </div>
                </div>
              </Link>
            </div>
            
            {/* Recommended Video 2 (Instagram Reel) */}
            <div className="bg-[#1f1f1f] rounded-lg overflow-hidden mb-4 hover:bg-[#272727] hover:scale-105 transition-all duration-200 ease-in-out cursor-pointer">
              <Link href="https://www.instagram.com/renovationbridge/reel/DHBvfoZyh_V/" target="_blank" rel="noopener noreferrer" className="block p-3 sm:p-4">
                <div className="flex items-start gap-x-3 sm:gap-x-4">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 relative shrink-0 overflow-hidden rounded-md">
                    <Image 
                      src="/images/blog/nbc.png" 
                      alt="Renovation Bridge Instagram Reel"
                      fill
                      sizes="(max-width: 639px) 96px, 112px"
                      className="object-cover"
                    />
                    <div className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-xxs sm:text-xs px-1">0:30</div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs sm:text-sm font-medium line-clamp-2 mb-0.5 sm:mb-1">Check out our latest Instagram Reel!</h4>
                    <p className="text-[10px] leading-tight sm:text-xs sm:leading-snug text-gray-400">1.5K views • 1 day ago</p>
                  </div>
                </div>
              </Link>
            </div>

            {/* Article Link */}
            <div className="bg-[#1f1f1f] rounded-lg overflow-hidden mb-4 hover:bg-[#272727] hover:scale-105 transition-all duration-200 ease-in-out">
              <Link href="https://www.nbcbayarea.com/investigations/consumer/entrepreneurs-aim-steep-crooked-incompetent-contractors/3790584/" target="_blank" rel="noopener noreferrer" className="block p-3 sm:p-4">
                <div className="flex items-start gap-x-3 sm:gap-x-4">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 relative shrink-0 overflow-hidden rounded-md">
                    <Image 
                      src="/images/blog/article.png" 
                      alt="Renovation Bridge featured in NBC Bay Area article"
                      fill
                      sizes="(max-width: 639px) 96px, 112px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs sm:text-sm font-medium line-clamp-3 mb-0.5 sm:mb-1">Read about how Renovation Bridge helps homeowners avoid crooked contractors on NBC Bay Area.</h4>
                    <p className="text-[10px] leading-tight sm:text-xs sm:leading-snug text-gray-400 line-clamp-3">By Chris Chmura • Updated on February 11, 2025 at 11:37 pm</p>
                  </div>
                </div>
              </Link>
            </div>
            
            <div className="mt-4 sm:mt-6 bg-[#1f1f1f] rounded-xl p-3 sm:p-4">
              <p className="text-xs sm:text-sm text-gray-300">
                Join thousands of satisfied homeowners who've found their perfect contractors through Renovation Bridge.
              </p>
              <Link href="/get-started" className="mt-3 sm:mt-4 bg-red-600 text-white px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium w-full hover:bg-red-700 transition duration-200 inline-block text-center">
                Get Started Today
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AsSeenOnTV 