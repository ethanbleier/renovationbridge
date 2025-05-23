import HeroSection from '@/components/sections/HeroSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import FreeGuideSection from '@/components/sections/FreeGuideSection'
import WhatWeOfferSection from '@/components/sections/WhatWeOfferSection'
import HowItWorksSection from '@/components/sections/HowItWorksSection'
import AsSeenOnTV from '@/components/sections/AsSeenOnTV'
import CTASection from '@/components/sections/CTASection'
import PlatformSection from '@/components/sections/PlatformSection'
import ServiceAreaMapSection from '@/components/sections/ServiceAreaMapSection'
import PageSeo from '@/components/seo/PageSeo'
import { generateServiceSchema, generateFAQSchema } from '@/lib/structured-data'
import { Metadata } from 'next'
import SectionHotkeys from '@/components/SectionHotkeys'

export const metadata: Metadata = {
  title: 'Renovation Bridge | Smart Home Renovation Solutions in Bay Area',
  description: 'Renovation Bridge connects Bay Area homeowners with vetted contractors, providing transparent pricing, project management, and peace of mind for your renovation.',
  keywords: ['home renovation', 'Bay Area contractors', 'renovation services', 'home remodeling', 'bathroom renovation', 'kitchen renovation'],
  alternates: {
    canonical: 'https://renovationbridge.com',
  }
}

export default function Home() {
  const faqSchema = generateFAQSchema([
    {
      question: "How does Renovation Bridge work?",
      answer: "We connect homeowners with vetted contractors, provide transparent pricing, and offer project management services to ensure your renovation goes smoothly."
    },
    {
      question: "What areas do you serve?",
      answer: "We currently serve the Bay Area, including San Francisco, Oakland, San Jose, and surrounding communities."
    },
    {
      question: "How much does it cost to use Renovation Bridge?",
      answer: "Our service is free for homeowners. We make money by charging contractors a small fee for the projects they receive through our platform."
    }
  ]);

  // Services structured data
  const serviceSchema = generateServiceSchema(
    "Home Renovation Services",
    "Renovation Bridge helps homeowners connect with vetted contractors for renovation projects.",
    "https://renovationbridge.com/services",
    "https://renovationbridge.com/images/services/renovation.jpg"
  );

  return (
    <>
      <SectionHotkeys />
      <PageSeo structuredData={[faqSchema, serviceSchema]} />
      
      {/* Hero Section */}
      <HeroSection />

      {/* Trusted By Section */}
      <PlatformSection />

      {/* What We Offer Section */}
      <WhatWeOfferSection />
            
      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Service Area Map Section */}
      <ServiceAreaMapSection />

      {/* How It Works Section */}
      <HowItWorksSection />

      {/* Free Guide Download Section */}
      <FreeGuideSection />
      
      {/* As Seen on TV Section */}
      <AsSeenOnTV />
      
      {/* CTA Section */}
      <CTASection />
    </>
  )
} 