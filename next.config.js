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