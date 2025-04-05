// Interface for token data storage
export interface TokenData {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  locationId?: string;
}

// In-memory cache for development purposes only
// For production, use a proper database or secret management service
let tokenCache: TokenData | null = null;

/**
 * Retrieves stored GHL tokens from cache or storage
 */
export function getStoredTokens(): TokenData | null {
  return tokenCache;
}

/**
 * Save token data to your storage solution
 */
export async function saveTokenData(tokenData: TokenData): Promise<boolean> {
  try {
    // For demonstration only - log token info (with minimal exposure)
    console.log('Token data received:', {
      accessTokenPrefix: tokenData.accessToken.substring(0, 5) + '...',
      refreshTokenPrefix: tokenData.refreshToken.substring(0, 5) + '...',
      expiresAt: new Date(tokenData.expiresAt).toISOString(),
      locationId: tokenData.locationId || 'using default'
    });
    
    // Store in memory cache (for development only)
    tokenCache = tokenData;
    
    // In a real application, you would save this data to a secure database
    // or use a service like AWS Secrets Manager, Azure Key Vault, etc.
    
    // For development, log a reminder about proper storage
    if (process.env.NODE_ENV === 'development') {
      console.log('DEVELOPMENT MODE: Token data stored in memory cache only');
      console.log('WARNING: This is insecure for production. Implement a proper database or secrets manager.');
    }
    
    return true;
  } catch (error) {
    console.error('Error saving token data:', error);
    return false;
  }
} 