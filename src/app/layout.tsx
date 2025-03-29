import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import React from 'react'
import '@/styles/globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import JsonLd from '@/components/seo/JsonLd'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { generateOrganizationSchema, generateLocalBusinessSchema } from '@/lib/structured-data'
import { sarabun } from '@/lib/fonts'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Renovation Bridge',
  description: 'Renovation Bridge helps Bay Area homeowners renovate smarter by connecting them with vetted contractors for their renovation projects.',
  metadataBase: new URL('https://renovationbridge.com'),
  authors: [{ name: 'Renovation Bridge Team' }],
  keywords: ['renovation', 'home remodeling', 'contractors', 'Bay Area', 'home improvement'],
  generator: 'Next.js',
  applicationName: 'Renovation Bridge',
  referrer: 'origin-when-cross-origin',
  creator: 'Renovation Bridge',
  publisher: 'Renovation Bridge',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://renovationbridge.com',
    siteName: 'Renovation Bridge',
    title: 'Renovation Bridge - Smart Home Renovation Solutions',
    description: 'Renovation Bridge helps Bay Area homeowners renovate smarter by connecting them with vetted contractors for their renovation projects.',
    images: [
      {
        url: '/images/logos/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Renovation Bridge'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Renovation Bridge - Smart Home Renovation Solutions',
    description: 'Renovation Bridge helps Bay Area homeowners renovate smarter by connecting them with vetted contractors for their renovation projects.',
    images: ['/images/logos/twitter-image.jpg'],
    creator: '@renovationbridge'
  },
  alternates: {
    canonical: 'https://renovationbridge.com',
  },
  icons: {
    icon: '/images/logos/favicon.ico',
    apple: '/images/logos/favicon.ico',
    shortcut: '/images/logos/favicon.ico',
  },
  other: {
    'Permissions-Policy': 'accelerometer=(), autoplay=(), clipboard-write=(), encrypted-media=(), gyroscope=(), picture-in-picture=()'
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <JsonLd data={[generateOrganizationSchema(), generateLocalBusinessSchema()]} />
      </head>
      <body className={`${inter.variable} ${sarabun.variable} font-sans antialiased`}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <SpeedInsights dsn="ZNga99anB7eSaJjchi9phAZv6n7" />
        </div>
      </body>
    </html>
  )
} 