import { Message } from 'ai';
import { ChatMessage } from './ChatMessage';
import { useEffect, useRef } from 'react';
import { RiChatAiFill } from 'react-icons/ri';

interface ChatThreadProps {
  messages: Message[];
  isLoading: boolean;
}

export function ChatThread({ messages, isLoading }: ChatThreadProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <div 
      ref={scrollRef}
      className="flex-1 overflow-y-auto overflow-x-hidden mb-4 p-4 md:p-6 space-y-5 bg-slate-950 rounded-lg"
    >
      {messages.length > 0 ? (
        messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))
      ) : (
        <div className="text-center text-slate-400 py-10">
          <p className="text-lg">Start your renovation conversation!</p>
          <p className="text-sm">Ask anything about your project, from planning to execution.</p>
        </div>
      )}
      
      {isLoading && (
        <div className="flex justify-start mb-4">
          <div className="p-4 rounded-xl max-w-[85%] md:max-w-[75%] bg-slate-800 text-slate-100 rounded-bl-none">
            <div className="flex items-center mb-2">
              <RiChatAiFill className="h-6 w-6 mr-2 text-indigo-400" />
              <p className="text-sm font-medium text-slate-200">RenovationBridgeAI</p>
            </div>
            <div className="flex space-x-1.5 items-center pl-8">
              <div className="h-2 w-2 bg-indigo-400 rounded-full animate-pulse" style={{ animationDelay: '0s' }}></div>
              <div className="h-2 w-2 bg-indigo-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="h-2 w-2 bg-indigo-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 