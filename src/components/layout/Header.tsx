'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FiMenu, FiX, FiChevronDown } from 'react-icons/fi'
import { usePathname } from 'next/navigation'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isResourcesOpen, setIsResourcesOpen] = useState(false)
  const [headerVisible, setHeaderVisible] = useState(true)
  const [mobileHeaderVisible, setMobileHeaderVisible] = useState(true)
  const [isHeaderShrunk, setIsHeaderShrunk] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const lastScrollY = useRef(0)
  const pathname = usePathname()
  
  // Check if we're on the get-started page
  const isGetStartedPage = pathname === '/get-started'

  useEffect(() => {
    // Check if we're on mobile
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768) // 768px is the md breakpoint in Tailwind by default
    }
    
    // Run once on mount
    checkIsMobile()
    
    // Add resize listener
    window.addEventListener('resize', checkIsMobile)
    
    return () => {
      window.removeEventListener('resize', checkIsMobile)
    }
  }, [])

  useEffect(() => {
    // Initialize header visibility
    if (isGetStartedPage) {
      setHeaderVisible(false)
      setMobileHeaderVisible(false)
    } else {
      setHeaderVisible(true)
      setMobileHeaderVisible(true)
    }
    
    // Handle scroll events
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      if (isGetStartedPage) {
        // On get-started page, show header when scrolling up, hide when scrolling down
        if (currentScrollY < lastScrollY.current && currentScrollY < 300) {
          setHeaderVisible(true)
          setMobileHeaderVisible(true)
        } else if (currentScrollY > 100 && currentScrollY > lastScrollY.current) {
          setHeaderVisible(false)
          setMobileHeaderVisible(false)
        }
      } else if (isMobile) {
        // On mobile devices only (except get-started page)
        // Show header when scrolling up, hide when scrolling down
        if (currentScrollY < lastScrollY.current) {
          setMobileHeaderVisible(true)
        } else if (currentScrollY > 50 && currentScrollY > lastScrollY.current && !isMenuOpen) {
          setMobileHeaderVisible(false)
        }
      }
      
      // Handle header shrinking on all pages
      if (currentScrollY > 50) {
        setIsHeaderShrunk(true)
      } else {
        setIsHeaderShrunk(false)
      }
      
      lastScrollY.current = currentScrollY
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isGetStartedPage, isMobile, isMenuOpen])

  // Handle menu opening - ensure header is visible when menu is open
  const handleMenuToggle = () => {
    const newMenuState = !isMenuOpen
    setIsMenuOpen(newMenuState)
    if (newMenuState) {
      setMobileHeaderVisible(true)
      if (isGetStartedPage) {
        setHeaderVisible(true)
      }
    }
  }

  return (
    <header className={`bg-white shadow-sm sticky top-0 z-50 transition-all duration-300 ${
      isMobile ? (mobileHeaderVisible ? 'translate-y-0' : '-translate-y-full') : 
      (headerVisible ? 'translate-y-0' : '-translate-y-full')
    } ${isHeaderShrunk ? 'py-1' : 'py-2'}`}>
      <div className={`container-custom ${isHeaderShrunk ? 'py-2' : 'py-4'} pr-3 md:pr-5 lg:pr-8 transition-all duration-300`}>
        <div className="flex items-center justify-between gap-4 lg:gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <Image 
              src="/images/logos/logo.png" 
              alt="Renovation Bridge Logo" 
              width={180} 
              height={40}
              className={`transition-all duration-300 ${
                isHeaderShrunk 
                  ? 'w-[130px] sm:w-[150px] lg:w-[180px]' 
                  : 'w-[150px] sm:w-[170px] lg:w-[220px]'
              }`}
              style={{ height: "auto" }}
              priority
            />
          </Link>

          {/* Desktop Navigation - Hidden on get-started page for improved lead capture */}
          {!isGetStartedPage && (
            <nav className="hidden md:flex items-center space-x-4 lg:space-x-8 flex-grow justify-center">
              <Link href="/how-it-works" className="text-gray-800 hover:text-primary transition-colors whitespace-nowrap">
                How it Works
              </Link>
              
              <Link href="/gallery" className="text-gray-800 hover:text-primary transition-colors">
                Gallery
              </Link>
              
              <Link href="/guide" className="text-gray-800 hover:text-primary transition-colors">
                Guide
              </Link>
              
              <div className="relative group">
                <button 
                  className="flex items-center text-gray-800 hover:text-primary transition-colors"
                  onClick={() => setIsResourcesOpen(!isResourcesOpen)}
                >
                  Resources
                  <FiChevronDown className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
                </button>
                
                <div className="absolute left-0 mt-2 w-56 bg-white rounded-md shadow-lg py-2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300 transform origin-top scale-95 group-hover:scale-100 border border-lavender/30 overflow-hidden">
                  <Link href="/resources/faq" className="block px-4 py-2.5 text-sm text-gray-800 hover:bg-lavender/10 hover:text-primary transition-all duration-200 border-l-0 hover:border-l-2 hover:border-primary hover:pl-[18px]">
                    FAQ
                  </Link>
                  <Link href="/blog" className="block px-4 py-2.5 text-sm text-gray-800 hover:bg-lavender/10 hover:text-primary transition-all duration-200 border-l-0 hover:border-l-2 hover:border-primary hover:pl-[18px]">
                    Blog
                  </Link>
                  <Link href="/pricing" className="block px-4 py-2.5 text-sm text-gray-800 hover:bg-lavender/10 hover:text-primary transition-all duration-200 border-l-0 hover:border-l-2 hover:border-primary hover:pl-[18px] animate-[fadeIn_0.3s_0.1s_both]">
                    Quick Quote
                  </Link>
                  <Link href="/real-estate-referral" className="block px-4 py-2.5 text-sm text-gray-800 hover:bg-lavender/10 hover:text-primary transition-all duration-200 border-l-0 hover:border-l-2 hover:border-primary hover:pl-[18px] animate-[fadeIn_0.3s_0.2s_both]">
                    Referral Program
                  </Link>
                </div>
              </div>
            </nav>
          )}

          {/* CTA Buttons - Hidden on get-started page */}
          {!isGetStartedPage && (
            <div className="hidden md:flex items-center space-x-3 lg:space-x-4 flex-shrink-0">
              <Link href="/for-contractors" className={`transition-all duration-300 ${
                isHeaderShrunk 
                  ? 'px-2.5 py-1.5 lg:px-3.5 lg:py-1.5 text-sm' 
                  : 'px-3 py-2 lg:px-4 lg:py-2 text-sm lg:text-base'
              } border border-gray-300 rounded-md text-gray-700 hover:border-primary hover:text-primary hover:bg-gray-50 transform hover:scale-105 whitespace-nowrap`}>
                For Contractors
              </Link>
              <Link href="/get-started" className={`cta-btn transform hover:scale-105 transition-all duration-300 whitespace-nowrap ${
                isHeaderShrunk 
                  ? 'px-2.5 py-1.5 lg:px-4 lg:py-1.5 text-sm' 
                  : 'px-3 py-2 lg:px-5 lg:py-2 text-sm lg:text-base'
              }`} target="_blank" rel="noopener noreferrer">
                GET STARTED
              </Link>
            </div>
          )}

          {/* On get-started page, add spacer div to push menu button to the right side */}
          {isGetStartedPage && <div className="flex-grow"></div>}

          {/* Mobile Menu Button - Should only be visible on mobile or get-started page */}
          <button
            className={`text-gray-500 hover:text-gray-700 focus:outline-none ${isGetStartedPage ? 'hidden' : 'md:hidden'}`}
            onClick={handleMenuToggle}
          >
            {isMenuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && !isGetStartedPage && (
        <div className={`bg-white px-4 pt-2 pb-4 shadow-inner md:hidden`}>
          <nav className="flex flex-col space-y-3">
            <Link 
              href="/how-it-works" 
              className="text-gray-800 hover:text-primary py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              How it Works
            </Link>
            
            <Link 
              href="/gallery" 
              className="text-gray-800 hover:text-primary py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Gallery
            </Link>
            
            <Link 
              href="/guide" 
              className="text-gray-800 hover:text-primary py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Guide
            </Link>

            <button 
              className="flex items-center justify-between text-gray-800 hover:text-primary py-2 transition-colors"
              onClick={() => setIsResourcesOpen(!isResourcesOpen)}
            >
              <span>Resources</span>
              <FiChevronDown className={`h-4 w-4 transition-transform duration-300 ${isResourcesOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isResourcesOpen && (
              <div className="pl-4 space-y-2 border-l-2 border-lavender animate-slideDown overflow-hidden">
                <Link 
                  href="/resources/faq" 
                  className="block py-2 text-gray-800 hover:text-primary transition-all duration-200 transform translate-x-0 hover:translate-x-1 animate-[fadeIn_0.3s_0.05s_both]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  FAQ
                </Link>
                <Link 
                  href="/blog" 
                  className="block py-2 text-gray-800 hover:text-primary transition-all duration-200 transform translate-x-0 hover:translate-x-1 animate-[fadeIn_0.3s_0.15s_both]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Blog
                </Link>
                <Link 
                  href="/pricing" 
                  className="block py-2 text-gray-800 hover:text-primary transition-all duration-200 transform translate-x-0 hover:translate-x-1 animate-[fadeIn_0.3s_0.25s_both]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Price Calculator
                </Link>
                <Link 
                  href="/real-estate-referral" 
                  className="block py-2 text-gray-800 hover:text-primary transition-all duration-200 transform translate-x-0 hover:translate-x-1 animate-[fadeIn_0.3s_0.35s_both]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Real Estate Referral Program
                </Link>
              </div>
            )}

            <div className="pt-2 flex flex-col space-y-3">
              <Link 
                href="/for-contractors" 
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:border-primary hover:text-primary hover:bg-gray-50 transition-all duration-200 transform hover:scale-105 text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                For Contractors
              </Link>
              <Link 
                href="/get-started" 
                className="cta-btn text-center transform hover:scale-105 transition-transform duration-200 px-3 py-2"
                onClick={() => setIsMenuOpen(false)}
                target="_blank" 
                rel="noopener noreferrer"
              >
                GET STARTED
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header 