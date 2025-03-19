import ContactForm from '@/components/forms/ContactForm'
import Link from 'next/link'
import Image from 'next/image'

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-lavender to-white pt-16 md:pt-24 pb-20 md:pb-32">
      {/* Decorative elements */}
      <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-primary/10 blur-3xl"></div>
      <div className="absolute top-1/2 -left-32 w-64 h-64 rounded-full bg-secondary/10 blur-3xl"></div>
      
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="space-y-6 md:space-y-8">
            <div className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm">
              Transform Your Space
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-secondary leading-tight">
              Renovate Your Home <span className="text-primary">with Confidence</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 max-w-xl">
              Renovation Bridge connects homeowners with vetted contractors for a seamless renovation experience. Our rigorous vetting process ensures quality workmanship for your project.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/get-started" className="btn btn-primary shadow-lg shadow-primary/20 hover:translate-y-1 transition-all">
                Get Started
              </Link>
              <Link href="/how-it-works" className="btn bg-white text-primary border border-primary/20 hover:bg-lavender hover:shadow-md transition-all">
                How It Works
              </Link>
            </div>
            
            <div className="grid grid-cols-3 gap-6 md:gap-8 pt-8 md:pt-10">
              <div className="text-center p-4 rounded-lg bg-white/70 backdrop-blur-sm shadow-sm">
                <div className="text-3xl md:text-4xl font-bold text-primary">100+</div>
                <p className="text-sm md:text-base text-gray-600">Vetted Contractors</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-white/70 backdrop-blur-sm shadow-sm">
                <div className="text-3xl md:text-4xl font-bold text-primary">500+</div>
                <p className="text-sm md:text-base text-gray-600">Projects Completed</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-white/70 backdrop-blur-sm shadow-sm">
                <div className="text-3xl md:text-4xl font-bold text-primary">95%</div>
                <p className="text-sm md:text-base text-gray-600">Customer Satisfaction</p>
              </div>
            </div>
          </div>
          
          <div className="relative mt-8 lg:mt-0">
            <div className="relative bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-auto">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
      
      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
          <path fill="#ffffff" fillOpacity="1" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
        </svg>
      </div>
    </section>
  )
} 