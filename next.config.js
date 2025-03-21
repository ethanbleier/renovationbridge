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
    unoptimized: true, // Required for static export
  },
  // Configure output for WordPress plugin compatibility
  output: 'export',
  // Base path if the plugin is not at site root
  basePath: process.env.NODE_ENV === 'production' ? '/wp-content/plugins/renovationbridge/out' : '',
  // Disable asset prefix in development
  assetPrefix: process.env.NODE_ENV === 'production' ? '/wp-content/plugins/renovationbridge/out/' : '',
}

module.exports = nextConfig 