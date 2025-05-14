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
    
    // Prevent overscroll bounce effect on iOS
    document.body.style.overscrollBehavior = 'none';
    
    return () => {
      document.body.style.overscrollBehavior = '';
    };
  }, []);

  return (
    <>
      <main className={`flex-grow bg-white overflow-x-hidden ${pathname === '/for-contractors' ? 'pt-0' : 'pt-20'}`}>
        {children}
      </main>
      <Footer />
    </>
  );
};

export default ClientLayoutWrapper; 