interface ToolCallDisplayProps {
  toolName: string;
  status: 'running' | 'completed' | 'error';
  result?: string;
  args?: string;
}

export function ToolCallDisplay({ toolName, status, result, args }: ToolCallDisplayProps) {
  return (
    <div className="border border-gray-200 dark:border-slate-600 rounded-lg p-3 my-2 bg-gray-50 dark:bg-slate-700/50 text-xs shadow-sm">
      <div className="flex items-center gap-2 mb-1.5">
        <ToolIcon />
        <p className="font-semibold text-gray-700 dark:text-slate-200">{toolName}</p>
        <StatusBadge status={status} />
      </div>
      
      {args && (status === 'running' || status === 'completed') && (
         <div className="mt-1 mb-2 pl-1">
           <p className="text-gray-500 dark:text-slate-400 text-xxs uppercase font-medium mb-0.5">Arguments:</p>
           <pre className="p-1.5 bg-gray-100 dark:bg-slate-800 rounded text-gray-600 dark:text-slate-300 whitespace-pre-wrap break-all text-xxs">
             {args}
           </pre>
         </div>
      )}
      
      {result && status === 'completed' && (
        <div className="mt-1 pl-1">
          <p className="text-gray-500 dark:text-slate-400 text-xxs uppercase font-medium mb-0.5">Result:</p>
          <div className="p-1.5 bg-white dark:bg-slate-600/70 rounded border border-gray-200 dark:border-slate-500">
            <pre className="text-gray-700 dark:text-slate-200 whitespace-pre-wrap break-all text-xs">{result}</pre>
          </div>
        </div>
      )}
      
      {status === 'error' && (
        <div className="mt-2 p-2 bg-red-50 dark:bg-red-800/30 text-red-700 dark:text-red-300 rounded border border-red-200 dark:border-red-500/50">
          <p>Failed to execute tool or tool returned an error.</p>
          {result && <pre className="mt-1 text-xs whitespace-pre-wrap break-all">{result}</pre>}
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: 'running' | 'completed' | 'error' }) {
  const styles = {
    running: 'bg-sky-100 text-sky-700 dark:bg-sky-700/30 dark:text-sky-300',
    completed: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-700/30 dark:text-emerald-300',
    error: 'bg-red-100 text-red-700 dark:bg-red-700/30 dark:text-red-300'
  };
  
  const labels = {
    running: 'Running',
    completed: 'Completed',
    error: 'Error'
  };
  
  return (
    <span className={`text-xxs px-2 py-0.5 rounded-full font-medium ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}

function ToolIcon() {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="14" 
      height="14" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className="text-gray-500 dark:text-slate-400"
    >
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
    </svg>
  );
} 