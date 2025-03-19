import { Metadata } from 'next'
import GetStartedForm from '@/components/forms/GetStartedForm'

export const metadata: Metadata = {
  title: 'Get Started | Renovation Bridge',
  description: 'Tell us about your project to get started with Renovation Bridge',
}

export default function GetStartedPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <GetStartedForm />
    </div>
  )
} 