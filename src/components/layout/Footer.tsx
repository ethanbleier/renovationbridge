'use client'

import Link from 'next/link'
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaTiktok } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Resources Column */}
          <div>
            <h4 className="text-lg font-semibold text-black mb-4">Resources:</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/blog" className="text-gray hover:text-primary transition-colors">
                  News and Blogs
                </Link>
              </li>
              <li>
                <Link href="/guide" className="text-gray hover:text-primary transition-colors">
                  Renovation Guide
                </Link>
              </li>
              <li>
                <Link href="/calculator" className="text-gray hover:text-primary transition-colors">
                  Budget Calculator
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/vetting-process" className="text-gray hover:text-primary transition-colors">
                  Our Vetting Process
                </Link>
              </li>
            </ul>
            
            {/* Social Media Links */}
            <div className="flex space-x-4 mt-6">
              <Link href="https://www.facebook.com/profile.php?id=100093963673999" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FaFacebookF className="h-5 w-5 text-gray hover:text-primary transition-colors" />
              </Link>
              <Link href="https://x.com/RenovationBridg" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
                <FaTwitter className="h-5 w-5 text-gray hover:text-primary transition-colors" />
              </Link>
              <Link href="https://www.instagram.com/renovationbridge/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram className="h-5 w-5 text-gray hover:text-primary transition-colors" />
              </Link>
              <Link href="https://www.youtube.com/@Renovationbridge" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <FaYoutube className="h-5 w-5 text-gray hover:text-primary transition-colors" />
              </Link>
            </div>
          </div>
          
          {/* Quick Links Column */}
          <div>
            <h4 className="text-lg font-semibold text-black mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/how-it-works" className="text-gray hover:text-primary transition-colors">
                  How it works
                </Link>
              </li>
              <li>
                <Link href="/project-types" className="text-gray hover:text-primary transition-colors">
                  Project Types
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="text-gray hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-gray hover:text-primary transition-colors">
                  Resources
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Form Column (Spans 2 columns on lg screens) */}
          <div className="lg:col-span-2">
            <h4 className="text-lg font-semibold text-black mb-4">Get Started Today</h4>
            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="Name" 
                  className="form-input"
                  required
                />
                <input 
                  type="text" 
                  placeholder="City" 
                  className="form-input"
                  required
                />
              </div>
              <input 
                type="email" 
                placeholder="Email" 
                className="form-input"
                required
              />
              <input 
                type="tel" 
                placeholder="Phone Number" 
                className="form-input"
                required
              />
              <textarea 
                placeholder="Description of work" 
                className="form-input resize-none"
                rows={4}
                required
              ></textarea>
              <button 
                type="submit" 
                className="btn btn-primary w-full sm:w-auto"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray/20 text-center">
          <p className="text-gray text-sm">
            &copy; {new Date().getFullYear()} Renovation Bridge. All rights reserved.
          </p>
          <div className="mt-2 flex justify-center space-x-6 text-sm">
            <Link href="/privacy" className="text-gray hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 