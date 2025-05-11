'use client';

import React, { useEffect } from 'react';
import { useChat } from 'ai/react';
import { useSearchParams } from 'next/navigation';
import { FaEdit } from "react-icons/fa";
import { ChatHeader } from '@/components/ui/ChatHeader';
import { ChatThread } from '@/components/ui/ChatThread';
import { ChatInput } from '@/components/ui/ChatInput';
import { ConversationContext } from '@/components/ui/ConversationContext';

export default function ChatPageClient() {
  const searchParams = useSearchParams();
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

  // Handle incoming query parameter
  useEffect(() => {
    if (!searchParams) return;
    const query = searchParams.get('q');
    if (query && messages.length === 0) {
      append({ content: query, role: 'user' });
    }
  }, [searchParams, messages.length, append]);

  useEffect(() => {
    if (error) {
      console.error('An error occurred in the chat:', error);
    }
  }, [error]);

  const customHandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    handleSubmit(e); 
  };

  const handleChipClick = (chipText: string) => {
    append({ content: chipText, role: 'user' });
  };

  const handleNewChat = () => {
    window.location.reload();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault();
        handleNewChat();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative flex flex-col flex-grow w-full max-w-5xl mx-auto bg-slate-950 overflow-visible h-[90vh] rounded-xl shadow-lg">
      <div className="flex items-center justify-between px-4 py-3">
        <ChatHeader title="Renovation AI Assistant" />
      </div>
      <div className="flex-1 min-h-0 flex flex-col">
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6" style={{ maxHeight: 'calc(100vh - 220px)' }}>
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
              <ConversationContext messages={messages} onChipClick={handleChipClick} />
            </div>
          )}
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
      
      <div className="fixed bottom-20 right-8 z-50 bg-slate-800/90 text-slate-300 text-xs px-3 py-1.5 rounded-full border border-slate-700/50 shadow-lg">
        Pro tip: Press ⌘ + Enter for new chat
      </div>
    </div>
  );
} 