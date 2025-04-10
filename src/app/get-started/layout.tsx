import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Get Started | Renovation Bridge',
  description: 'Tell us about your project to get started with Renovation Bridge',
}

export default function GetStartedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>{children}</>
  )
} 