'use client';

import { useEffect } from 'react';
import { useChat } from 'ai/react';
import { ChatHeader } from '@/components/ui/ChatHeader';
import { ChatThread } from '@/components/ui/ChatThread';
import { ChatInput } from '@/components/ui/ChatInput';
import { ConversationContext } from '@/components/ui/ConversationContext';

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
    // Assuming you might want to use reload or stop functions
    // reload,
    // stop,
  } = useChat({
    api: '/api/chat',
    onFinish: (message) => {
      console.log('Chat finished with message:', message.id);
      // Potentially trigger other actions upon completion
    },
    onError: (err) => {
      console.error('Chat error:', err);
      // Handle errors more visibly in the UI if desired
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

  return (
    // Updated for a dark, full-height layout, with content centered horizontally
    <main className="h-screen bg-slate-950 flex flex-col text-slate-100">
      {/* This div centers the chat content horizontally and makes it take available vertical space */}
      <div className="flex flex-col flex-grow w-full max-w-3xl mx-auto bg-slate-950 overflow-visible">
        <ChatHeader title="Renovation AI Assistant" />
        
        {/* Scrollable container for messages, "Meet RenovateAI" text, and chips */}
        <div className="flex-grow overflow-y-auto overflow-x-hidden p-4 md:p-6">
          {/* Show "Meet RenovateAI" and chips only if there are no messages */}
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full"> {/* h-full to center content vertically */}
              <div className="text-center my-8 md:my-12"> {/* Adjusted margins */}
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

          {/* ChatThread will display messages and push the above content out of view if messages exist */}
          {messages.length > 0 && (
            <ChatThread 
              messages={messages} 
              isLoading={isLoading} 
            />
          )}
        </div>
        
        {/* ChatInput is a direct child of the flex-grow container, using its own sticky positioning */}
        <ChatInput 
          input={input} 
          handleInputChange={handleInputChange} 
          handleSubmit={customHandleSubmit} 
          isLoading={isLoading} 
        />
      </div>
    </main>
  );
}
