import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  console.log('Root middleware executing for:', request.nextUrl.pathname);
  
  // Simple protection for admin routes - also protect the main /admin route
  if (request.nextUrl.pathname === '/admin' || 
      request.nextUrl.pathname === '/admin/' || 
      request.nextUrl.pathname.includes('/admin/')) {
      
    console.log('Admin route detected in root middleware');
    
    // Get the Authorization header from the request
    const authHeader = request.headers.get('authorization');
    console.log('Auth header present:', authHeader ? 'Yes' : 'No');
    
    const adminPassword = process.env.ADMIN_PASSWORD;
    console.log('ADMIN_PASSWORD environment variable set:', adminPassword ? 'Yes' : 'No');
    
    // If header is present, try to validate it
    if (authHeader) {
      try {
        // Extract the base64 encoded part
        const base64Credentials = authHeader.split(' ')[1];
        // Decode the base64 string
        const credentials = atob(base64Credentials);
        // Basic auth format is "username:password"
        const [username, password] = credentials.split(':');
        
        console.log('Username provided:', username);
        // Don't log the actual password, just its presence and length
        console.log('Password provided length:', password ? password.length : 0);
        console.log('Expected password length:', adminPassword ? adminPassword.length : 0);
        console.log('Password match:', password === adminPassword);
        
        if (password === adminPassword) {
          console.log('Authentication successful, proceeding');
          return NextResponse.next();
        } else {
          console.log('Password mismatch, denying access');
        }
      } catch (error) {
        console.error('Error parsing authentication header:', error);
      }
    }
    
    // If we got here, authentication failed or wasn't provided
    console.log('Sending 401 Unauthorized response');
    return new NextResponse('Unauthorized', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Admin Access Required"'
      }
    });
  }
  
  return NextResponse.next();
}

// Configure to match all requests to ensure middleware gets triggered
export const config = {
  matcher: ['/admin', '/admin/:path*']
}; 