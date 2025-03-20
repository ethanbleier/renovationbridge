import { NextResponse } from 'next/server';
import { clearAuthCookie } from '@/lib/utils/auth';

export async function POST() {
  // Clear the auth cookie
  clearAuthCookie();
  
  return NextResponse.json({ 
    message: 'Logged out successfully' 
  });
} 