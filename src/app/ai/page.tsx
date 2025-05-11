'use client';

import React, { useEffect } from 'react';
import { useChat } from 'ai/react';
import { FaEdit } from "react-icons/fa";
import { ChatHeader } from '@/components/ui/ChatHeader';
import { ChatThread } from '@/components/ui/ChatThread';
import { ChatInput } from '@/components/ui/ChatInput';
import { ConversationContext } from '@/components/ui/ConversationContext';

// Add global style for html and body background
<style jsx global>{`
  html, body {
    background-color: #020617 !important;
    min-height: 100vh;
  }
`}</style>

export default function ChatPage() {
  const { 
    messages, 
    input, 
    handleInputChange, 
    handleSubmit, 
    isLoading, 
    error,
    setInput,
    append,
  } = useChat({
    api: '/api/chat',
    onFinish: (message) => {
      console.log('Chat finished with message:', message.id);
    },
    onError: (err) => {
      console.error('Chat error:', err);
    }
  });

  useEffect(() => {
    if (error) {
      // Consider displaying a user-friendly error message in the UI
      console.error('An error occurred in the chat:', error);
    }
  }, [error]);

  // The customHandleSubmit might not be strictly necessary if ChatInput handles Enter key submits correctly
  // and the form can be submitted by the button click as well.
  // However, if useChat's handleSubmit requires a specific event type, this can be kept.
  const customHandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    handleSubmit(e); 
  };

  // Function to handle chip click
  const handleChipClick = (chipText: string) => {
    // setInput(chipText); // Removed: No longer just setting input
    // Optionally, you could also immediately submit the form here
    // if that's the desired behavior, e.g., by calling handleSubmit directly
    // or by creating a synthetic event if handleSubmit requires one.
    append({ content: chipText, role: 'user' }); // Added: Send message directly
  };

  // Update function to handle new chat
  const handleNewChat = () => {
    // Reload the page to start a completely fresh chat
    window.location.reload();
  };

  // Add keyboard shortcut handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for Command (Mac) + Enter
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault();
        handleNewChat();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []); // Empty dependency array since handleNewChat is stable

  return (
    // Main layout: full viewport height, dark background, vertical flex
    <main className="min-h-screen h-screen bg-slate-950 flex flex-col text-slate-100 pt-16">
      {/* Center chat content horizontally, take available vertical space */}
      <div className="relative flex flex-col flex-grow w-full max-w-5xl mx-auto bg-slate-950 overflow-visible h-[90vh] rounded-xl shadow-lg">
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800">
          <ChatHeader title="Renovation AI Assistant" />
        </div>
        {/* Fixed-height, scrollable chat area. Height is calculated to leave space for input. */}
        <div className="flex-1 min-h-0 flex flex-col">
          <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6" style={{ maxHeight: 'calc(100vh - 220px)' }}>
            {/* Show intro and chips if no messages */}
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full">
                <div className="text-center my-8 md:my-12">
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold">
                    Meet <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-teal-500 to-indigo-500">RenovateAI</span>,
                  </h1>
                  <p className="text-2xl sm:text-3xl md:text-4xl text-slate-300 mt-2">
                    your personal AI assistant
                  </p>
                </div>
                {/* ConversationContext (chips) shown below the intro text */}
                <ConversationContext messages={messages} onChipClick={handleChipClick} />
              </div>
            )}
            {/* ChatThread displays messages and scrolls within this area */}
            {messages.length > 0 && (
              <ChatThread 
                messages={messages} 
                isLoading={isLoading} 
              />
            )}
          </div>
        </div>
        <ChatInput 
          input={input} 
          handleInputChange={handleInputChange} 
          handleSubmit={customHandleSubmit} 
          isLoading={isLoading} 
        />
        
        {/* Pro Tip Pill */}
        <div className="fixed bottom-20 right-8 z-50 bg-slate-800/90 text-slate-300 text-xs px-3 py-1.5 rounded-full border border-slate-700/50 shadow-lg">
          Pro tip: Press ⌘ + Enter for new chat
        </div>
      </div>
    </main>
  );
}
