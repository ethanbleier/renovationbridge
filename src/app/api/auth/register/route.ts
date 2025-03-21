'use server';

import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db/connection';
import User from '@/lib/models/User';
import { registerSchema } from '@/lib/utils/validation';
import { generateToken, setAuthCookie } from '@/lib/utils/auth';

export async function POST(request: NextRequest) {
  try {
    // Connect to the database
    await dbConnect();
    
    // Parse the request body
    const body = await request.json();
    
    // Validate the request body
    const validationResult = registerSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.format() },
        { status: 400 }
      );
    }
    
    const { email, password, name, role = 'user' } = validationResult.data;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }
    
    // Create the user
    const newUser = await User.create({
      email,
      password,
      name,
      role,
    });
    
    // Generate JWT token
    const token = generateToken(newUser);
    
    // Set auth cookie
    setAuthCookie(token);
    
    // Return the user (excluding password)
    const userResponse = {
      id: newUser._id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
    };
    
    return NextResponse.json({ 
      message: 'User registered successfully', 
      user: userResponse 
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Failed to register user' },
      { status: 500 }
    );
  }
} 