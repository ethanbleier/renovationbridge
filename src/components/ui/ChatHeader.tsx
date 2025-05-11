interface ChatHeaderProps {
  title: string;
}

export function ChatHeader({ title }: ChatHeaderProps) {
  // Simplified header, as the main greeting is now part of the page.tsx content
  // This header might be used for context when chat messages are visible.
  return (
    <div className="py-2 px-4 md:px-6 bg-slate-950 text-center">
      {/* Hidden for now, main title is in page.tsx. This could be a section title later. */}
      {/* <h1 className="text-lg font-medium text-slate-300 truncate">{title}</h1> */}
    </div>
  );
} 