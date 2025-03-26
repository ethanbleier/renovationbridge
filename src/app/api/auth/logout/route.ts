import { NextRequest, NextResponse } from 'next/server';

export async function POST() {
  // Create response
  const response = NextResponse.json({ 
    message: 'Logged out successfully' 
  });
  
  // Clear the auth cookie directly in the response
  response.cookies.set({
    name: 'auth_token',
    value: '',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 0, // Expire immediately
  });
  
  return response;
}