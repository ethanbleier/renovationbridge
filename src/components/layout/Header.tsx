'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FiMenu, FiX, FiChevronDown } from 'react-icons/fi'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isResourcesOpen, setIsResourcesOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image 
              src="/images/logos/rb-logo-1.png" 
              alt="Renovation Bridge Logo" 
              width={180} 
              height={40} 
              style={{ height: "auto" }}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/how-it-works" className="text-gray-800 hover:text-primary transition-colors">
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

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/for-contractors" className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:border-primary hover:text-primary hover:bg-gray-50 transition-all duration-200 transform hover:scale-105">
              For Contractors
            </Link>
            <Link href="/get-started" className="contractor-btn transform hover:scale-105 transition-transform duration-200">
              GET STARTED
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white px-4 pt-2 pb-4 shadow-inner">
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
                  href="/blog" 
                  className="block py-2 text-gray-800 hover:text-primary transition-all duration-200 transform translate-x-0 hover:translate-x-1 animate-[fadeIn_0.3s_0.05s_both]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Blog
                </Link>
                <Link 
                  href="/pricing" 
                  className="block py-2 text-gray-800 hover:text-primary transition-all duration-200 transform translate-x-0 hover:translate-x-1 animate-[fadeIn_0.3s_0.15s_both]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Price Calculator
                </Link>
                <Link 
                  href="/real-estate-referral" 
                  className="block py-2 text-gray-800 hover:text-primary transition-all duration-200 transform translate-x-0 hover:translate-x-1 animate-[fadeIn_0.3s_0.25s_both]"
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
                className="contractor-btn text-center transform hover:scale-105 transition-transform duration-200"
                onClick={() => setIsMenuOpen(false)}
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