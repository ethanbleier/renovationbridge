'use client'

import React from 'react'
import Footer from './Footer'

interface ClientLayoutWrapperProps {
  children: React.ReactNode;
}

const ClientLayoutWrapper: React.FC<ClientLayoutWrapperProps> = ({ children }) => {
  return (
    <>
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default ClientLayoutWrapper; 