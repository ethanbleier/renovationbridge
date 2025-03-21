'use client';

import React from 'react';
import { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
}

export const AccordionItem = ({ title, children }: AccordionItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        className="flex w-full justify-between items-center py-5 px-4 text-left font-medium text-gray-800 hover:text-primary focus:outline-none transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{title}</span>
        <FiChevronDown 
          className={`h-5 w-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-4 pt-0 pb-5 text-gray-700">
          {children}
        </div>
      </div>
    </div>
  );
};

interface AccordionProps {
  children: React.ReactNode;
  className?: string;
}

const Accordion = ({ children, className = '' }: AccordionProps) => {
  return (
    <div className={`rounded-lg border border-gray-200 divide-y divide-gray-200 bg-white ${className}`}>
      {children}
    </div>
  );
};

export default Accordion; 