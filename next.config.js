/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: '/renovationbridge',
  trailingSlash: true,
  output: 'export',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',
        port: '',
        pathname: '/**',
      },
    ],
    unoptimized: true,
    path: '/renovationbridge/_next/image',
  },
  assetPrefix: '/renovationbridge',
}

module.exports = nextConfig 