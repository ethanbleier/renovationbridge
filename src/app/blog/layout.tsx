import '@/styles/globals.css'
import React from 'react'

export const metadata = {
  title: 'Blog | Renovation Bridge',
  description: 'Read the latest articles and guides on home renovation from Renovation Bridge.',
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      {children}
    </section>
  )
} 