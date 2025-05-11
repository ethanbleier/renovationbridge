import { Message } from 'ai';
import React, { useState, useEffect, useRef } from 'react';

interface ConversationContextProps {
  messages: Message[];
  onChipClick: (chipText: string) => void;
}

export function ConversationContext({ messages, onChipClick }: ConversationContextProps) {
  // Simulate suggestion chips similar to the image
  // For now, these are static, but could be made dynamic later.
  const suggestionChips = [ 
    "Why choose Renovation Bridge?",
    "Typical project timeline with us",
    "Sample cost breakdown",
    "Our licensed contractor network",
    "What happens after you sign",
    "Warranty & after-care support",
  ];

  const [scrollOffset, setScrollOffset] = useState(0);
  const [canStartAnimation, setCanStartAnimation] = useState(false);
  const chipsContainerRef = useRef<HTMLDivElement>(null);
  const animationFrameId = useRef<number | null>(null);
  const firstSetWidth = useRef<number>(0);

  // Effect to start animation after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setCanStartAnimation(true);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  // Effect to calculate the width of one set of chips
  useEffect(() => {
    const calculateWidth = () => {
      if (chipsContainerRef.current && 
          chipsContainerRef.current.children.length === suggestionChips.length * 2 && 
          suggestionChips.length > 0) {
        const currentTotalWidth = chipsContainerRef.current.scrollWidth;
        if (currentTotalWidth > 0) {
            firstSetWidth.current = currentTotalWidth / 2;
        }
      } else if (suggestionChips.length === 0) {
        firstSetWidth.current = 0;
      }
    };

    const timeoutId = setTimeout(calculateWidth, 0);
    window.addEventListener('resize', calculateWidth);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', calculateWidth);
    };
  }, [suggestionChips.length]);

  // Effect for scroll animation
  useEffect(() => {
    if (!canStartAnimation || firstSetWidth.current === 0 || suggestionChips.length === 0) {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
      }
      return;
    }

    const scrollSpeed = 0.1;

    const animateScroll = () => {
      setScrollOffset(prevOffset => {
        let newOffset = prevOffset + scrollSpeed;
        if (newOffset >= firstSetWidth.current) {
          newOffset = newOffset % firstSetWidth.current;
        }
        return newOffset;
      });
      animationFrameId.current = requestAnimationFrame(animateScroll);
    };

    animationFrameId.current = requestAnimationFrame(animateScroll);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [canStartAnimation, suggestionChips.length]);

  if (messages.length > 0 || suggestionChips.length === 0) {
    return null;
  }
  
  return (
    <div 
      className="w-[calc(100%+4rem)] -mx-8 overflow-hidden cursor-default py-2"
      style={{
        maskImage: 'linear-gradient(to right, transparent, black 30px, black calc(100% - 30px), transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 30px, black calc(100% - 30px), transparent)'
      }}
      role="marquee"
      aria-label="Suggested topics carousel"
    >
      <div
        ref={chipsContainerRef}
        className="flex flex-nowrap gap-3 md:gap-4"
        style={{
          transform: `translateX(-${scrollOffset}px)`,
        }}
      >
        {[...suggestionChips, ...suggestionChips].map((chipText, index) => (
          <button 
            key={`${chipText}-${index}`} 
            className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-slate-50 rounded-2xl text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 border border-slate-600 hover:border-slate-500 whitespace-nowrap"
            onClick={() => onChipClick(chipText)}
          >
            {chipText}
          </button>
        ))}
      </div>
    </div>
  );
}

// Original extractTopics function - can be used or adapted later
function extractTopics(messages: Message[]): string[] {
  const userMessages = messages.filter(m => m.role === 'user');
  const commonTopics = ['Renovation', 'Budget', 'Timeline', 'Materials', 'Permits', 'Contractors'];
  
  if (userMessages.length === 0) return [];
  if (userMessages.length === 1) return commonTopics.slice(0, Math.floor(Math.random() * 2) + 1);
  return commonTopics.slice(0, Math.floor(Math.random() * 3) + 2);
} 