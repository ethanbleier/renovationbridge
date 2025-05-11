import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import React from 'react'
import '@/styles/globals.css'
import Header from '@/components/layout/Header'
import JsonLd from '@/components/seo/JsonLd'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/next'
import { generateOrganizationSchema, generateLocalBusinessSchema } from '@/lib/structured-data'
import { sarabun } from '@/lib/fonts'
import Script from 'next/script'
import FacebookPixel from '@/components/analytics/FacebookPixel'
import ClientLayoutWrapper from '@/components/layout/ClientLayoutWrapper'

const GA_MEASUREMENT_ID = process.env.GA_MEASUREMENT_ID;

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
})

export const metadata: Metadata = {
  title: 'Renovation Bridge',
  description: 'Renovation Bridge helps Bay Area homeowners renovate smarter by connecting them with vetted contractors for their renovation projects.',
  metadataBase: new URL('https://renovationbridge.com'),
  authors: [{ name: 'Renovation Bridge Team' }],
  keywords: ['renovation', 'home remodeling', 'contractors', 'Bay Area', 'home improvement', 'renovation bridge', 'onn matalon', 'ethan bleier'],
  generator: 'Next.js',
  applicationName: 'Renovation Bridge',
  referrer: 'origin-when-cross-origin',
  creator: 'Ethan Bleier',
  publisher: 'Renovation Bridge',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://renovationbridge.com',
    siteName: 'Renovation Bridge',
    title: 'Renovation Bridge - Home Renovation Solutions',
    description: 'Renovation Bridge connects homeowners with vetted contractors for their renovation projects.',
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
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <JsonLd data={[generateOrganizationSchema(), generateLocalBusinessSchema()]} />
      </head>
      <body className={`${inter.variable} ${sarabun.variable} font-sans antialiased`}>
        {/* Google Tag Manager */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-16912546121"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            ${GA_MEASUREMENT_ID ? `gtag('config', '${GA_MEASUREMENT_ID}');` : ''}
            gtag('config', 'AW-16912546121');
          `}
        </Script>
        
        {/* Facebook Pixel */}
        <FacebookPixel />
        
        <div className="min-h-screen flex flex-col">
          <Header />
          <ClientLayoutWrapper>
            {children}
          </ClientLayoutWrapper>
          <SpeedInsights dsn="ZNga99anB7eSaJjchi9phAZv6n7" />
          <Analytics />
        </div>
      </body>
    </html>
  )
} 