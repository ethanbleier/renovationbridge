'use client';

import { Suspense } from 'react';
import ChatPageClient from './ChatPageClient';

export default function ChatPage() {
  return (
    <main className="min-h-screen h-screen bg-[#020617] flex flex-col text-slate-100 pt-16">
      <Suspense fallback={<div>Loading...</div>}>
        <ChatPageClient />
      </Suspense>
    </main>
  );
}
