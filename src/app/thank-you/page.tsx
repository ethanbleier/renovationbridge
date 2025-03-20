import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Thank You | Renovation Bridge',
  description: 'Thank you for submitting your project details!',
}

export default function ThankYouPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-16">
      <div className="bg-white shadow-md rounded-lg p-8 text-center">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold text-secondary mb-2">Thank You!</h1>
          <p className="text-gray text-lg mb-8">
            We've received your project details and a Renovation Bridge specialist will be in touch with you shortly.
          </p>
        </div>
        
        <div className="space-y-6 max-w-lg mx-auto text-left mb-8">
          <div className="bg-lavender/50 p-4 rounded-lg">
            <h2 className="font-semibold text-secondary mb-1">What happens next?</h2>
            <p className="text-gray">We'll review your project details and match you with the best pros in your area. You can expect a call or email within 1-2 business days.</p>
          </div>
          
          <div className="bg-lavender/50 p-4 rounded-lg">
            <h2 className="font-semibold text-secondary mb-1">Have questions?</h2>
            <p className="text-gray">Feel free to reach out to our support team at <a href="mailto:support@renovationbridge.com" className="text-primary">support@renovationbridge.com</a> or call us at (925) 693-7590.</p>
          </div>
        </div>
        
        <div className="flex justify-center">
          <Link href="/" className="btn btn-primary">
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  )
} 