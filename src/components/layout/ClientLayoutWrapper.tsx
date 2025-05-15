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
    // Reset scroll position on mount
    window.scrollTo(0, 0);
    
    // Clean up any stale inline overflow properties that could block scrolling (e.g. from a modal)
    document.body.style.overflow = '';

    // No cleanup necessary
    return undefined;
  }, []);

  return (
    <>
      <main className={`flex-grow bg-white overflow-x-hidden overflow-y-auto min-h-screen ${pathname === '/for-contractors' ? 'pt-0' : 'pt-20'}`}>
        {children}
      </main>
      <Footer />
    </>
  );
};

export default ClientLayoutWrapper; 