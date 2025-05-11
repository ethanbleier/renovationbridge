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
      className="flex-1 overflow-y-auto overflow-x-hidden mb-4 bg-slate-950 rounded-lg"
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
              {/* Animated color-cycling dot with glow for a modern AI look, now 2x smaller */}
              <span
                className="inline-block h-1 w-1 mr-2 rounded-full ai-cycling-dot"
                style={{
                  animation: 'dotPulse 2.2s ease-in-out infinite, colorCycle 3.5s linear infinite',
                  boxShadow: '0 0 12px 2px rgba(80,200,255,0.45), 0 0 24px 6px rgba(120,80,255,0.18)'
                }}
              />
              <style>{`
                @keyframes dotPulse {
                  0%, 100% { transform: scale(1); }
                  50% { transform: scale(1.18); }
                }
                @keyframes colorCycle {
                  0%   { background: #fff; box-shadow: 0 0 12px 2px #38bdf8, 0 0 24px 6px #818cf8; }
                  20%  { background: #38bdf8; box-shadow: 0 0 12px 2px #818cf8, 0 0 24px 6px #06b6d4; }
                  40%  { background: #818cf8; box-shadow: 0 0 12px 2px #06b6d4, 0 0 24px 6px #a21caf; }
                  60%  { background: #06b6d4; box-shadow: 0 0 12px 2px #a21caf, 0 0 24px 6px #38bdf8; }
                  80%  { background: #a21caf; box-shadow: 0 0 12px 2px #38bdf8, 0 0 24px 6px #fff; }
                  100% { background: #fff; box-shadow: 0 0 12px 2px #38bdf8, 0 0 24px 6px #818cf8; }
                }
                .ai-cycling-dot {
                  background: #fff;
                }
              `}</style>
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