import { Message, ToolInvocation } from 'ai';
import { ToolCallDisplay } from './ToolCallDisplay';
import { useState } from 'react';
import { UserCircleIcon, ChevronDownIcon, ChevronUpIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/outline';
import { RiChatAiFill } from 'react-icons/ri';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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

  // Add custom styles for markdown elements
  const markdownStyles = {
    // Headers
    'h1,h2,h3,h4,h5,h6': 'font-bold text-slate-100 mt-4 mb-2',
    'h1': 'text-xl',
    'h2': 'text-lg',
    'h3': 'text-base',
    // Lists
    'ul,ol': 'list-inside my-2 space-y-1',
    'ul': 'list-disc',
    'ol': 'list-decimal',
    // Code blocks
    'pre': 'bg-slate-900 p-3 rounded-lg my-2 overflow-x-auto',
    'code': 'bg-slate-900 px-1.5 py-0.5 rounded text-sm font-mono',
    // Links
    'a': 'text-indigo-400 hover:text-indigo-300 underline',
    // Blockquotes
    'blockquote': 'border-l-4 border-slate-600 pl-4 my-2 italic text-slate-300',
    // Tables
    'table': 'border-collapse w-full my-2',
    'th,td': 'border border-slate-600 px-3 py-2 text-left',
    'th': 'bg-slate-800 font-semibold',
    // Horizontal rule
    'hr': 'border-t border-slate-600 my-4',
    // Paragraphs
    'p': 'my-2',
  };

  // Convert markdownStyles object to CSS classes
  const markdownClassNames = Object.entries(markdownStyles)
    .map(([selector, classes]) => `${selector} { @apply ${classes}; }`)
    .join('\n');

  // Add high-contrast color overrides for markdown in dark mode
  const markdownColorOverrides = `
    .prose.prose-invert {
      --tw-prose-body: #e5e7eb; /* slate-200 */
      --tw-prose-headings: #fff; /* white */
      --tw-prose-links: #a5b4fc; /* indigo-300 */
      --tw-prose-bold: #fff; /* white */
      --tw-prose-counters: #cbd5e1; /* slate-400 */
      --tw-prose-bullets: #a5b4fc; /* indigo-300 */
      --tw-prose-hr: #334155; /* slate-700 */
      --tw-prose-quotes: #f1f5f9; /* slate-100 */
      --tw-prose-quote-borders: #818cf8; /* indigo-400 */
      --tw-prose-captions: #cbd5e1; /* slate-400 */
      --tw-prose-code: #fbbf24; /* yellow-400 */
      --tw-prose-pre-bg: #1e293b; /* slate-800 */
      --tw-prose-pre-code: #f1f5f9; /* slate-100 */
      --tw-prose-th-borders: #64748b; /* slate-500 */
      --tw-prose-td-borders: #334155; /* slate-700 */
    }
    .prose.prose-invert h1,
    .prose.prose-invert h2,
    .prose.prose-invert h3,
    .prose.prose-invert h4,
    .prose.prose-invert h5,
    .prose.prose-invert h6 {
      color: #fff !important;
    }
    .prose.prose-invert a {
      color: #a5b4fc !important;
      text-decoration: underline;
    }
    .prose.prose-invert strong {
      color: #fff !important;
    }
    .prose.prose-invert em {
      color: #e0e7ef !important;
    }
    .prose.prose-invert ul > li::marker,
    .prose.prose-invert ol > li::marker {
      color: #a5b4fc !important;
    }
    .prose.prose-invert code {
      color: #fbbf24 !important;
      background: #1e293b !important;
    }
    .prose.prose-invert pre {
      background: #1e293b !important;
      color: #f1f5f9 !important;
    }
    .prose.prose-invert blockquote {
      color: #f1f5f9 !important;
      border-left-color: #818cf8 !important;
    }
    .prose.prose-invert th, .prose.prose-invert td {
      border-color: #334155 !important;
    }
  `;

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
      <style>{`
        ${messageAppearAnimation}
        ${markdownClassNames}
        ${markdownColorOverrides}
      `}</style>
      <div 
        className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 animate-messageAppear`}
        style={{ animation: 'messageAppear 0.3s ease-out forwards' }}
      >
        <div
          className={`p-5 rounded-2xl max-w-[85%] md:max-w-[75%] shadow-md transition-all duration-150
            ${isUser 
              ? 'bg-indigo-600 text-white' 
              : 'bg-slate-800 text-slate-100'
            }`
          }
          style={{ marginBottom: '0.25rem' }}
        >
          <div className="flex items-center mb-2">
            {isUser ? null : (
              <>
                <RiChatAiFill className="h-6 w-6 mr-2 text-indigo-400" />
                <p className="text-sm font-medium text-slate-200">Renovation Bridge</p>
              </>
            )}
          </div>
          
          {/* Replace plain text with Markdown rendering */}
          {message.content && (
            <div className="prose prose-invert max-w-none">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  // Customize code block rendering
                  code: ({className, children, ...props}) => {
                    const match = /language-(\w+)/.exec(className || '');
                    return !className?.includes('inline') ? (
                      <pre className={className}>
                        <code className={match ? `language-${match[1]}` : ''} {...props}>
                          {String(children).replace(/\n$/, '')}
                        </code>
                      </pre>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  },
                  // Customize link rendering to open in new tab
                  a: (props) => (
                    <a {...props} target="_blank" rel="noopener noreferrer" />
                  )
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          )}
          
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