import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Script from 'next/script'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Renovation Bridge - Connecting Homeowners with Quality Contractors',
  description: 'Renovation Bridge helps Bay Area homeowners renovate smarter by connecting them with vetted contractors for their renovation projects.',
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.ico',
    shortcut: '/favicon.ico',
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
      <body className={`${inter.variable} font-sans antialiased`}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
        
        {/* GoHighLevel Tracking Script - Replace with your actual tracking code from GHL */}
        <Script
          id="ghl-tracking-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              // Your GoHighLevel tracking code will go here
              // You'll get this from your GoHighLevel account
              // Example:
              // (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              // new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              // j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              // 'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              // })(window,document,'script','dataLayer','YOUR-GHL-CONTAINER-ID');
            `
          }}
        />
      </body>
    </html>
  )
} 