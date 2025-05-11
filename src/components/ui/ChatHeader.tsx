interface ChatHeaderProps {
  title: string;
}

export function ChatHeader({ title }: ChatHeaderProps) {
  // Simplified header, as the main greeting is now part of the page.tsx content
  // This header might be used for context when chat messages are visible.
  return (
    <div className="py-2 px-4 md:px-6 bg-slate-950 text-center relative">
      <div className="flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="relative">
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
          </div>
          <span className="text-xs font-medium text-emerald-500"></span>
        </div>
      </div>
    </div>
  );
} 