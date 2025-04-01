import React, { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface GalleryImageProps {
  src: string;
  alt: string;
  priority?: boolean;
  aspectRatio?: 'square' | 'video' | 'auto';
  width?: number;
  height?: number;
  sizes?: string;
  className?: string;
  fill?: boolean;
  onClick?: () => void;
}

export default function GalleryImage({ 
  src, 
  alt, 
  priority = false, 
  aspectRatio = 'auto', 
  width, 
  height, 
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw', 
  className,
  fill = false,
  onClick
}: GalleryImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [placeholderError, setPlaceholderError] = useState(false);
  
  // Handle image loading
  const handleImageLoad = () => {
    setIsLoading(false);
  };
  
  // Handle image loading error - replace with placeholder
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = '/images/gallery/placeholder.jpg';
    setIsLoading(false);
  };

  // Use same image for placeholder but at lower quality via Next.js
  const placeholderSrc = '/images/gallery/placeholder.jpg';

  return (
    <div
      className={cn(
        'overflow-hidden relative',
        aspectRatio === 'square' && 'aspect-square',
        aspectRatio === 'video' && 'aspect-video',
        isLoading && 'animate-pulse bg-gray-100',
        className,
        onClick && 'cursor-pointer'
      )}
      onClick={onClick}
    >
      {/* Simple placeholder when loading */}
      {isLoading && (
        <div 
          className="absolute inset-0 bg-gray-200 blur-sm opacity-50"
          aria-hidden="true"
        />
      )}
      
      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        sizes={sizes}
        priority={priority}
        onLoad={handleImageLoad}
        onError={handleImageError}
        loading={priority ? 'eager' : 'lazy'}
        unoptimized={true}
        className={cn(
          'object-cover transition-all duration-300',
          isLoading ? 'scale-110 blur-2xl opacity-0' : 'scale-100 blur-0 opacity-100',
          onClick && 'hover:scale-105 transition-transform duration-300'
        )}
      />
    </div>
  );
} 