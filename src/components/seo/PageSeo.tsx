import React from 'react';
import { Metadata } from 'next';
import JsonLd from './JsonLd';
import { StructuredData } from '@/lib/structured-data';

interface PageSeoProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'profile' | 'book';
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  structuredData?: StructuredData | StructuredData[];
  keywords?: string[];
  children?: React.ReactNode;
}

/**
 * Generate Next.js metadata from PageSeo props
 */
export function generateMetadata({
  title,
  description,
  canonical,
  ogImage,
  ogType,
  twitterCard,
  keywords,
}: Omit<PageSeoProps, 'structuredData' | 'children'>): Metadata {
  const baseUrl = 'https://renovationbridge.com';
  const imageUrl = ogImage || '/images/logos/og-image.jpg';
  
  return {
    title: title,
    description: description,
    keywords: keywords,
    alternates: {
      canonical: canonical ? `${baseUrl}${canonical}` : undefined,
    },
    openGraph: {
      title: title,
      description: description,
      type: ogType || 'website',
      url: canonical ? `${baseUrl}${canonical}` : baseUrl,
      images: [
        {
          url: imageUrl.startsWith('http') ? imageUrl : `${baseUrl}${imageUrl}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: twitterCard || 'summary_large_image',
      title: title,
      description: description,
      images: [imageUrl.startsWith('http') ? imageUrl : `${baseUrl}${imageUrl}`],
    },
  };
}

/**
 * Page SEO component for dynamic structured data
 * Use metadata = generateMetadata(...) in your page component
 * Then use <PageSeo structuredData={...} /> in your JSX
 */
export default function PageSeo({ structuredData, children }: PageSeoProps) {
  return (
    <>
      {structuredData && <JsonLd data={structuredData} />}
      {children}
    </>
  );
} 