'use client'

import React, { useEffect } from 'react'
import Footer from './Footer'
import { usePathname } from 'next/navigation'

interface ClientLayoutWrapperProps {
  children: React.ReactNode;
}

const ClientLayoutWrapper: React.FC<ClientLayoutWrapperProps> = ({ children }) => {
  const pathname = usePathname();
  // Add effect to ensure proper scroll behavior
  useEffect(() => {
    // Reset scroll position on navigation
    window.scrollTo(0, 0);
    
    // Ensure both html and body are scrollable and their heights are not fixed
    // This helps prevent issues where parent elements might block scrolling.
    document.documentElement.style.overflow = ''; // For <html> element
    document.documentElement.style.height = '';   // For <html> element
    document.body.style.overflow = '';            // For <body> element
    document.body.style.height = '';              // For <body> element

    // No specific cleanup function needed for these style resets,
    // as they should generally remain permissive to allow scrolling.
    return undefined;
  }, [pathname]); // Re-run this effect when the pathname changes

  return (
    <>
      <main className={`flex-grow bg-white overflow-x-hidden overflow-y-auto min-h-screen pt-16`}>
        {children}
      </main>
      <Footer />
    </>
  );
};

export default ClientLayoutWrapper;