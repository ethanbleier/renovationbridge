import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  console.log('Root middleware executing for:', request.nextUrl.pathname);
  
  // Admin routes have been removed from the codebase
  return NextResponse.next();
}

// Update matcher configuration as admin routes have been removed
export const config = {
  matcher: []
}; 