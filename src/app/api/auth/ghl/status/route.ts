import { NextResponse } from 'next/server';
import { getStoredTokens } from '@/utils/ghlAuth';

export async function GET() {
  // Get stored tokens instead of using environment variables
  const tokenData = getStoredTokens();
  const accessToken = tokenData?.accessToken;
  const refreshToken = tokenData?.refreshToken;
  const expiresAt = tokenData?.expiresAt || 0;
  const locationId = tokenData?.locationId || process.env.GHL_LOCATION_ID;
  
  // Check if tokens exist
  const isConnected = !!accessToken && !!refreshToken;
  
  // Check if token is expired
  const isExpired = expiresAt < Date.now();
  
  // Prepare status response
  const status = {
    connected: isConnected,
    expired: isExpired,
    expiresAt: isConnected ? new Date(expiresAt).toISOString() : null,
    locationId: locationId || null
  };
  
  return NextResponse.json(status);
} 