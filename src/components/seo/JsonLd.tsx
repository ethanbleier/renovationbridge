import React from 'react';
import { StructuredData } from '@/lib/structured-data';

interface JsonLdProps {
  data: StructuredData | StructuredData[];
}

/**
 * Component for embedding JSON-LD structured data into pages
 * @param data - Structured data object or array of structured data objects
 */
export default function JsonLd({ data }: JsonLdProps) {
  const jsonLdString = JSON.stringify(
    Array.isArray(data) ? data : [data],
    null,
    process.env.NODE_ENV === 'development' ? 2 : 0
  );

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLdString }}
    />
  );
} 