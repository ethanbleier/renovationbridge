import { Message, ToolInvocation } from 'ai';
import { ToolCallDisplay } from './ToolCallDisplay';
import { useState } from 'react';
import { UserCircleIcon, ChevronDownIcon, ChevronUpIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/outline';
import { RiChatAiFill } from 'react-icons/ri';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';
  // Explicitly cast message.role to string for comparison if 'tool' is not in the standard type
  const isTool = (message.role as string) === 'tool'; 
  const [showToolDetails, setShowToolDetails] = useState(false);

  // Define a keyframe animation for message appearance
  const messageAppearAnimation = `
    @keyframes messageAppear {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;

  // Check for tool invocations on assistant messages
  const toolInvocations = message.role === 'assistant' && message.toolInvocations ? message.toolInvocations : [];
  const hasToolInvocations = toolInvocations.length > 0;

  if (isTool) {
    // For tool messages, the 'id' or 'tool_call_id' might be relevant if message.name is not standard.
    // The Vercel AI SDK typically uses tool_call_id on messages with role 'tool'.
    // Let's assume message.tool_call_id contains the identifier.
    const toolIdentifier = (message as any).tool_call_id || 'unknown tool invocation';
    return (
      <div className="flex justify-center my-2">
        {/* Tool output message styled for dark theme */}
        <div className="p-3 rounded-lg bg-slate-700 text-slate-300 text-xs shadow max-w-[85%] md:max-w-[75%]">
          <div className="flex items-center">
            <WrenchScrewdriverIcon className="h-4 w-4 mr-2 flex-shrink-0 text-slate-400" />
            {/* Displaying tool_call_id as the identifier for the tool output */}
            <span className="font-medium mr-1">Tool Output (ID: {toolIdentifier}):</span> 
            <pre className="whitespace-pre-wrap text-xs">{message.content}</pre>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{messageAppearAnimation}</style>
      <div 
        className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 animate-messageAppear`}
        style={{ animation: 'messageAppear 0.3s ease-out forwards' }} // Apply animation
      >
        <div
          // Updated message bubble styles for dark theme
          className={`p-4 rounded-xl max-w-[85%] md:max-w-[75%] shadow-md ${ // General shadow and sizing
            isUser 
              ? 'bg-indigo-600 text-white rounded-br-none' // User message: Indigo background, white text
              : 'bg-slate-800 text-slate-100 rounded-bl-none' // Assistant: Dark grey background, light text
          }`}
        >
          <div className="flex items-center mb-2">
            {isUser ? (
              // User icon color updated for better contrast on indigo
              <UserCircleIcon className="h-6 w-6 mr-2 text-indigo-200" /> 
            ) : (
              // Assistant icon color updated for dark theme
              <RiChatAiFill className="h-6 w-6 mr-2 text-indigo-400" />
            )}
            <p className={`text-sm font-medium ${isUser ? 'text-indigo-100' : 'text-slate-200'}`}>
              {isUser ? 'You' : 'Assistant'}
            </p>
          </div>
          
          {/* Display message content if it's not empty */}
          {message.content && <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</p>}
          
          {/* Display for tool invocations by the assistant */}
          {hasToolInvocations && (
            // Tool invocation section borders and text colors updated for dark theme
            <div className="mt-3 pt-3 border-t border-slate-700">
              <button 
                onClick={() => setShowToolDetails(prev => !prev)}
                className="flex items-center text-xs text-slate-400 hover:text-slate-200 transition-colors w-full p-1 rounded hover:bg-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <WrenchScrewdriverIcon className="h-4 w-4 mr-1 flex-shrink-0" />
                <span>{showToolDetails ? 'Hide Tool Details' : `Called ${toolInvocations.length} Tool(s)`}</span>
                {showToolDetails ? <ChevronUpIcon className="h-4 w-4 ml-auto" /> : <ChevronDownIcon className="h-4 w-4 ml-auto" />}
              </button>
            </div>
          )}
          
          {showToolDetails && hasToolInvocations && (
            <div className="mt-2 space-y-2">
              {toolInvocations.map((toolInvocation: ToolInvocation, index: number) => (
                <ToolCallDisplay 
                  key={toolInvocation.toolCallId || index} 
                  toolName={toolInvocation.toolName}
                  // For invocations by assistant, status is 'running' or a similar pending state.
                  // The actual result and final status comes in a subsequent 'tool' role message.
                  status={'running'} 
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
} 