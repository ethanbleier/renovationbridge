import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db/connection';
import User from '@/lib/models/User';
import { loginSchema } from '@/lib/utils/validation';
import { generateToken } from '@/lib/utils/auth';

export async function POST(request: NextRequest) {
  try {
    // Connect to the database
    await dbConnect();
    
    // Parse the request body
    const body = await request.json();
    
    // Validate the request body
    const validationResult = loginSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.format() },
        { status: 400 }
      );
    }
    
    const { email, password } = validationResult.data;
    
    // Find the user
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }
    
    // Verify password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }
    
    // Generate JWT token
    const token = generateToken(user);
    
    // Create response with cookie
    const response = NextResponse.json({ 
      message: 'Login successful', 
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      }
    });
    
    // Set the cookie in the response
    // Using the cookies API on the response object directly
    response.cookies.set({
      name: 'auth_token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    
    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Failed to log in' },
      { status: 500 }
    );
  }
} 