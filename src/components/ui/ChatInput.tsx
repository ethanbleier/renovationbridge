import React, { ChangeEvent, FormEvent, KeyboardEvent, useRef, useEffect } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid'; // Using solid for a more prominent send icon

interface ChatInputProps {
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}

export function ChatInput({ input, handleInputChange, handleSubmit, isLoading }: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent newline on Enter
      // Manually submit the form - ensure handleSubmit can be called without form event if needed
      // or that the form element is accessible to trigger submit.
      // For simplicity, assuming handleSubmit can be triggered directly.
      if (!isLoading && input.trim()) {
        // A bit of a workaround: create a synthetic form event if handleSubmit strictly expects it
        const form = e.currentTarget.closest('form');
        if (form) {
            handleSubmit(new Event('submit', { cancelable: true, bubbles: true }) as any as FormEvent<HTMLFormElement>);
        }
      }
    }
    // Allow Shift+Enter for newline by default textarea behavior
  };

  // Auto-resize textarea
  const autoResizeTextarea = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Reset height
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  };

  // Adjust height on input change
  const onInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    handleInputChange(e);
    autoResizeTextarea();
  };
  
  // Initial resize on mount and when input changes programmatically (e.g. after submit clears it)
  useEffect(() => {
    autoResizeTextarea();
  }, [input]);

  return (
    <div className="sticky bottom-0 w-full bg-slate-900 rounded-tl-xl rounded-tr-xl mx-2 sm:mx-4 md:mx-auto overflow-visible">
      <form 
        onSubmit={handleSubmit} 
        className="relative mb-2 sm:mb-4 bg-slate-900 w-full max-w-3xl rounded-xl shadow-xl overflow-visible"
      >
        <textarea
          ref={textareaRef}
          className="w-full p-4 pr-12 border-0 focus:border-0 bg-slate-800 text-slate-100 placeholder-slate-400 transition-colors duration-150 ease-in-out shadow-sm rounded-xl resize-none focus:outline-none focus:ring-1 focus:ring-indigo-500"
          value={input}
          onChange={onInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Ask Anything..."
          disabled={isLoading}
          rows={1}
          style={{ maxHeight: '150px', overflowY: 'auto' }}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 bg-slate-700 text-slate-300 rounded-full hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150 ease-in-out shadow-md"
          aria-label="Send message"
        >
          {isLoading ? (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          ) : (
            <PaperAirplaneIcon className="h-5 w-5" />
          )}
        </button>
      </form>
    </div>
  );
} 