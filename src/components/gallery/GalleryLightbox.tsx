import React, { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export interface GalleryImage {
  src: string;
  alt: string;
}

interface GalleryLightboxProps {
  images: GalleryImage[];
  selectedIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function GalleryLightbox({ 
  images, 
  selectedIndex, 
  isOpen, 
  onClose 
}: GalleryLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(selectedIndex);
  const [isLoading, setIsLoading] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  // Navigation functions with useCallback
  const nextImage = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    // Wait for animation to complete
    setTimeout(() => setIsAnimating(false), 300);
  }, [isAnimating, images.length]);

  const previousImage = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    // Wait for animation to complete
    setTimeout(() => setIsAnimating(false), 300);
  }, [isAnimating, images.length]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        previousImage();
      } else if (e.key === 'ArrowRight') {
        nextImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    // Lock body scroll when lightbox is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('lightbox-open');
    }
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      document.body.classList.remove('lightbox-open');
    };
  }, [isOpen, onClose, nextImage, previousImage]);

  // Update current index when selected index changes
  useEffect(() => {
    setCurrentIndex(selectedIndex);
    setIsLoading(true);
  }, [selectedIndex]);

  // Reset loading state when current index changes
  useEffect(() => {
    setIsLoading(true);
  }, [currentIndex]);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  if (!isOpen || images.length === 0) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute top-4 right-4 z-10 text-white bg-black/30 p-2 rounded-full hover:bg-black/50 transition-colors"
        aria-label="Close lightbox"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>

      {/* Previous button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          previousImage();
        }}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white bg-black/30 p-3 rounded-full hover:bg-black/50 transition-colors"
        aria-label="Previous image"
        disabled={isAnimating}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
        </svg>
      </button>

      {/* Image container */}
      <div 
        className="relative w-full max-w-6xl h-[85vh] mx-auto"
        onClick={(e) => e.stopPropagation()}
        style={{ resize: 'none', overflow: 'hidden' }}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Loading spinner */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
            </div>
          )}
          
          {/* Current image */}
          <Image
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            fill
            className={cn(
              "object-contain transition-opacity duration-300",
              isLoading ? "opacity-0" : "opacity-100"
            )}
            sizes="(max-width: 768px) 100vw, 90vw"
            priority
            onLoad={handleImageLoad}
          />
        </div>
        
        {/* Image counter and caption */}
        <div className="absolute bottom-6 left-0 right-0 flex flex-col items-center gap-2">
          {/* Image caption */}
          <p className="text-white text-sm max-w-md text-center px-4 py-2 bg-black/50 rounded-lg">
            {images[currentIndex].alt}
          </p>
          
          {/* Image counter */}
          <div className="bg-black/50 text-white px-3 py-1 rounded-full text-sm">
            {currentIndex + 1} / {images.length}
          </div>

          {/* Thumbnail navigation - moved below counter */}
          {images.length > 1 && (
            <div className="mt-4 flex justify-center gap-2 max-w-[90vw]">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={cn(
                    "w-14 h-10 flex-shrink-0 rounded-md overflow-hidden border-2 transition-all",
                    currentIndex === index ? "border-white scale-110" : "border-transparent opacity-60 hover:opacity-100"
                  )}
                >
                  <Image 
                    src={image.src} 
                    alt={`Thumbnail ${index + 1}`} 
                    className="w-full h-full object-cover"
                    width={56}
                    height={40}
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Next button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          nextImage();
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white bg-black/30 p-3 rounded-full hover:bg-black/50 transition-colors"
        aria-label="Next image"
        disabled={isAnimating}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </button>
    </div>
  );
} 