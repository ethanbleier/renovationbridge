'use client'

import Link from 'next/link'
import { FaFacebookF, FaInstagram, FaYoutube, FaXTwitter } from 'react-icons/fa6'
import FooterContactForm from '../forms/FooterContactForm'
import FooterTechSupportForm from '../forms/FooterTechSupportForm'
import { usePathname } from 'next/navigation'

const Footer = () => {
  const pathname = usePathname()
  
  // Don't render the footer on the get-started page OR the home page
  if (pathname === '/get-started' || pathname === '/home' || pathname === '/ai') {
    return null
  }
  
  return (
    <footer className="bg-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Resources Column */}
          <div className="lg:col-span-3">
            <h4 className="text-lg font-semibold text-black mb-4">Resources</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/blog" className="text-gray hover:text-primary transition-colors flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
                  </svg>
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/guide" className="text-gray hover:text-primary transition-colors flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                  </svg>
                  Renovation Guide
                </Link>
              </li>
              <li>
                <Link href="/resources/faq" className="text-gray hover:text-primary transition-colors flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray hover:text-primary transition-colors flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  Price Calculator
                </Link>
              </li>
              <li>
                <Link href="/real-estate-referral" className="text-gray hover:text-primary transition-colors flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                  Real Estate Referral
                </Link>
              </li>
            </ul>
            
            {/* Social Media Links */}
            <div className="flex space-x-4 mt-6">
              <Link href="https://www.facebook.com/profile.php?id=100093963673999" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FaFacebookF className="h-5 w-5 text-[#1877F2] hover:opacity-80 transition-opacity" />
              </Link>
              <Link href="https://x.com/RenovationBridg" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
                <FaXTwitter className="h-5 w-5 text-black hover:opacity-80 transition-opacity" />
              </Link>
              <Link href="https://www.instagram.com/renovationbridge/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram className="h-5 w-5 text-[#E4405F] hover:opacity-80 transition-opacity" />
              </Link>
              <Link href="https://www.youtube.com/@Renovationbridge" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <FaYoutube className="h-5 w-5 text-[#FF0000] hover:opacity-80 transition-opacity" />
              </Link>
            </div>
          </div>
          
          {/* Quick Links Column */}
          <div className="lg:col-span-2">
            <h4 className="text-lg font-semibold text-black mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/how-it-works" className="text-gray hover:text-primary transition-colors flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                  </svg>
                  How it works
                </Link>
              </li>
              <li>
                <Link href="/for-contractors" className="text-gray hover:text-primary transition-colors flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                  For Contractors
                </Link>
              </li>
              <li>
                <Link href="/get-started" className="text-gray hover:text-primary transition-colors flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                  </svg>
                  Get Started
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Form Column */}
          <div className="lg:col-span-4">
            <FooterContactForm />
          </div>
          
          {/* Tech Support Form Column */}
          <div className="lg:col-span-3">
            <FooterTechSupportForm />
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray/20 text-center">
          <p className="text-gray text-sm">
            &copy; {new Date().getFullYear()} Renovation Bridge. All rights reserved.
          </p>
          <div className="mt-2 flex justify-center space-x-6 text-sm">
            <Link href="/privacy" className="text-gray hover:text-primary transition-colors px-4 py-1.5 rounded-full border border-gray/20 hover:border-primary">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 