/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',
        port: '',
        pathname: '/**',
      },
    ],
    // Ensure static images are properly processed in production
    domains: ['renovationbridge.com', 'renovationbridge.vercel.app', 'localhost'],
    // Add common image formats to be optimized
    formats: ['image/avif', 'image/webp'],
    // Set reasonable size limits
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    // Allow unoptimized images to prevent issues
    unoptimized: process.env.NODE_ENV !== 'production',
  },
  // Configuration for Vercel deployment
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // No output: 'export' needed for Vercel
  
  // Fix webpack resolution issues
  webpack: (config, { isServer }) => {
    // Ensures webpack resolves modules correctly
    config.resolve.modules = ['node_modules', '.']
    
    // Explicitly tell webpack how to resolve
    config.resolve.extensions = ['.js', '.jsx', '.ts', '.tsx']
    
    return config
  },
}

module.exports = nextConfig 