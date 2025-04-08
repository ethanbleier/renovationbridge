'use client'

import React from 'react'
import { FaHeadset } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'

const FooterTechSupportForm = () => {
  return (
    <div className="w-full rounded-lg bg-white p-4 shadow-md transition-all hover:shadow-lg">
      <h3 className="text-lg font-bold mb-3 text-gray-800 relative inline-block after:content-[''] after:absolute after:w-1/2 after:h-0.5 after:bg-primary after:left-0 after:-bottom-1">Tech Support</h3>
      
      <div className="mb-3 flex items-center text-gray-600">
        <FaHeadset className="mr-2 text-primary" />
        <span className="text-sm">Need help with the website? We're here to assist!</span>
      </div>
      
      <div className="mb-5 flex items-center font-medium text-gray-700">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-primary" viewBox="0 0 20 20" fill="currentColor">
          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
        </svg>
        <a href="tel:+19256937590" className="text-sm hover:text-primary transition-colors">
          (925) 693-7590
        </a>
      </div>
      
      <div className="flex justify-center">
        <a
          href="https://mail.google.com/mail/u/0/?fs=1&to=onn@renovationbridge.com&tf=cm"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center px-4 py-2 bg-primary hover:bg-opacity-90 text-white text-sm font-medium rounded-md shadow transition-all hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
          aria-label="Email tech support"
        >
          <MdEmail className="mr-2" />
          Email Support
        </a>
      </div>
    </div>
  )
}

export default FooterTechSupportForm 