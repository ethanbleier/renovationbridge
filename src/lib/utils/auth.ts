import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import type { IUser } from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  console.error('JWT_SECRET environment variable is not set. Authentication will fail.');
}
const TOKEN_EXPIRY = '7d';

export type TokenPayload = {
  userId: string;
  email: string;
  role: string;
};

export function generateToken(user: IUser): string {
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is not set');
  }
  
  const payload: TokenPayload = {
    userId: user.id,
    email: user.email,
    role: user.role,
  };
  
  return jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
}

export function setAuthCookie(token: string): void {
  cookies().set({
    name: 'auth_token',
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export function getAuthToken(): string | undefined {
  return cookies().get('auth_token')?.value;
}

export function clearAuthCookie(): void {
  cookies().delete('auth_token');
}

export function verifyToken(token: string): TokenPayload | null {
  if (!JWT_SECRET) {
    console.error('JWT_SECRET environment variable is not set');
    return null;
  }
  
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch (error) {
    return null;
  }
}

export function getCurrentUser(req: NextRequest): TokenPayload | null {
  const token = req.cookies.get('auth_token')?.value;
  
  if (!token) {
    return null;
  }
  
  return verifyToken(token);
}

export function authMiddleware(handler: Function) {
  return async (req: NextRequest) => {
    const user = getCurrentUser(req);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    return handler(req, user);
  };
}

export function roleMiddleware(handler: Function, allowedRoles: string[]) {
  return async (req: NextRequest) => {
    const user = getCurrentUser(req);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    if (!allowedRoles.includes(user.role)) {
      return NextResponse.json(
        { error: 'Permission denied' },
        { status: 403 }
      );
    }
    
    return handler(req, user);
  };
} 