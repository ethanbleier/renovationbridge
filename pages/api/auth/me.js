import { someService } from '@/lib/services'

export default async function handler(req, res) {
  // ... existing code ...
  
  // Add error handling to prevent build failures
  try {
    // Your authentication logic
  } catch (error) {
    console.error('Auth error:', error)
    return res.status(500).json({ error: 'Authentication error' })
  }
  
  // ... existing code ...
} 