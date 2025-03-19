import ContactForm from '@/components/forms/ContactForm'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="relative bg-lavender pt-10 md:pt-20 pb-16 md:pb-32">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
          <div className="space-y-4 md:space-y-8">
            <h1 className="text-3xl md:text-5xl font-bold text-secondary leading-tight">
              Renovate Your Home with Confidence
            </h1>
            <p className="text-lg md:text-xl text-gray">
              Renovation Bridge connects homeowners with vetted contractors for a seamless renovation experience. Our rigorous vetting process ensures quality workmanship for your project.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <Link href="/get-started" className="btn btn-primary">
                Get Started
              </Link>
              <Link href="/how-it-works" className="btn bg-white text-primary hover:bg-lavender">
                How It Works
              </Link>
            </div>
            
            <div className="grid grid-cols-3 gap-2 md:gap-4 pt-4 md:pt-8">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary">100+</div>
                <p className="text-sm md:text-base text-gray">Vetted Contractors</p>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary">500+</div>
                <p className="text-sm md:text-base text-gray">Projects Completed</p>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary">95%</div>
                <p className="text-sm md:text-base text-gray">Customer Satisfaction</p>
              </div>
            </div>
          </div>
          
          <div className="relative mt-8 lg:mt-0">
            <div className="bg-white rounded-lg shadow-xl p-1 w-full max-w-md mx-auto">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative Shapes */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-white" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0)' }}></div>
    </section>
  )
} 