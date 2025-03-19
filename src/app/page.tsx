import HeroSection from '@/components/sections/HeroSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import FreeGuideSection from '@/components/sections/FreeGuideSection'
import WhatWeOfferSection from '@/components/sections/WhatWeOfferSection'
import HowItWorksSection from '@/components/sections/HowItWorksSection'
import AsSeenOnTV from '@/components/sections/AsSeenOnTV'
import CTASection from '@/components/sections/CTASection'
import PlatformSection from '@/components/sections/PlatformSection'

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection />
      
      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Trusted By Section */}
      <PlatformSection />

      {/* What We Offer Section */}
      <WhatWeOfferSection />
      
      {/* Free Guide Download Section */}
      <FreeGuideSection />

      {/* How It Works Section */}
      <HowItWorksSection />
      
      {/* As Seen on TV Section */}
      <AsSeenOnTV />
      
      {/* CTA Section */}
      <CTASection />
    </>
  )
} 