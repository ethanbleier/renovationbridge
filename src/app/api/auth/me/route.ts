import { NextRequest, NextResponse } from 'next/server';
import User from '@/lib/models/User';
import { getCurrentUser } from '@/lib/utils/auth';

export async function GET(request: NextRequest) {
  try {
    // Get the current user from the auth token
    const userToken = getCurrentUser(request);
    
    if (!userToken) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Find the user
    const user = await User.findById(userToken.userId);
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    // Return the user (excluding password)
    return NextResponse.json({ 
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      } 
    });
  } catch (error) {
    console.error('Get current user error:', error);
    return NextResponse.json(
      { error: 'Failed to get user information' },
      { status: 500 }
    );
  }
} 