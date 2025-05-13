import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const suggestedQuestions = [
  "How much does a kitchen renovation cost?",
  "What permits do I need for an ADU?",
  "How long does a bathroom remodel take?",
  "What's included in a free consultation?",
  "How do you vet contractors?",
];

export default function AIChatFooter() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showTip, setShowTip] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  // Rotate through suggested questions every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuestionIndex((prev) => (prev + 1) % suggestedQuestions.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Handle global Command + Enter shortcut
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault();
        setShowTip(false);
        // Focus the input if it's not focused
        if (document.activeElement !== inputRef.current) {
          inputRef.current?.focus();
        }
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  // Handle input-specific Enter key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (query.trim()) {
        const encodedQuery = encodeURIComponent(query.trim());
        router.push(`/ai?q=${encodedQuery}`);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      const encodedQuery = encodeURIComponent(query.trim());
      router.push(`/ai?q=${encodedQuery}`);
    }
  };

  const handleQuestionClick = (question: string) => {
    const encodedQuery = encodeURIComponent(question);
    router.push(`/ai?q=${encodedQuery}`);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/40 backdrop-blur-sm border-t border-white/10 py-3 z-50">
      <div className="container-custom">
        <div className="flex items-center justify-center gap-4 max-w-3xl mx-auto relative">
          <div className="flex-1">
            <form onSubmit={handleSubmit} className="relative flex items-center">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-6 h-6 bg-white/10 rounded-full">
                <svg
                  className="w-3.5 h-3.5 text-white/70"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={suggestedQuestions[currentQuestionIndex]}
                className="w-full h-[34px] bg-white/10 border-none rounded-[4px] py-1.5 pl-11 pr-4 text-sm text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-white/20"
              />
            </form>
          </div>
          
          <Link
            href="/get-started"
            className="flex items-center justify-center h-[34px] px-4 bg-white rounded-[4px] text-[#393c41] text-sm font-medium hover:bg-white/90 transition-colors whitespace-nowrap"
          >
            Get Started Today
          </Link>

          <span 
            className={`absolute right-0 translate-x-full px-4 text-white/70 text-xs transition-all duration-300 ease-in-out hidden md:block ${
              showTip ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
            }`}
          >
            Press ⌘ + Enter to chat
          </span>
        </div>
      </div>
    </div>
  );
} 