/**
 * Structured data helpers for JSON-LD implementation
 * These functions generate JSON-LD structured data for better SEO
 */
export type StructuredData = Record<string, any>;

/**
 * Organization schema
 */
export const generateOrganizationSchema = (): StructuredData => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://renovationbridge.com/#organization',
    name: 'Renovation Bridge',
    url: 'https://renovationbridge.com',
    logo: 'https://renovationbridge.com/images/logos/logo.png',
    description: 'Renovation Bridge helps Bay Area homeowners renovate smarter by connecting them with vetted contractors.',
    sameAs: [
      'https://twitter.com/renovationbridge',
      'https://www.facebook.com/renovationbridge',
      'https://www.linkedin.com/company/renovationbridge',
      'https://www.instagram.com/renovationbridge'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-415-555-1234',
      contactType: 'customer service',
      email: 'info@renovationbridge.com',
      availableLanguage: ['English']
    }
  };
};

/**
 * Local Business schema
 */
export const generateLocalBusinessSchema = (): StructuredData => {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://renovationbridge.com/#localbusiness',
    name: 'Renovation Bridge',
    image: 'https://renovationbridge.com/images/logos/storefront.jpg',
    url: 'https://renovationbridge.com',
    telephone: '+1-415-555-1234',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Main Street',
      addressLocality: 'San Francisco',
      addressRegion: 'CA',
      postalCode: '94105',
      addressCountry: 'US'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 37.7749,
      longitude: -122.4194
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday'
        ],
        opens: '09:00',
        closes: '17:00'
      }
    ],
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 37.7749,
        longitude: -122.4194
      },
      geoRadius: '50 km'
    }
  };
};

/**
 * Service schema
 */
export const generateServiceSchema = (
  name: string,
  description: string,
  url: string,
  image?: string
): StructuredData => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: name,
    name,
    description,
    provider: {
      '@id': 'https://renovationbridge.com/#organization'
    },
    url,
    image: image || 'https://renovationbridge.com/images/services/default.jpg',
    areaServed: {
      '@type': 'State',
      name: 'California'
    }
  };
};

/**
 * FAQ schema
 */
export const generateFAQSchema = (
  questions: Array<{ question: string; answer: string }>
): StructuredData => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  };
};

/**
 * Breadcrumb schema
 */
export const generateBreadcrumbSchema = (
  items: Array<{ name: string; item: string }>
): StructuredData => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.item
    }))
  };
}; 