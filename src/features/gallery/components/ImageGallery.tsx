'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { GalleryImage } from '../types';

interface ImageGalleryProps {
  images: GalleryImage[];
  title: string;
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [validImages, setValidImages] = useState<GalleryImage[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  // Filter out any invalid image paths when the component mounts
  useEffect(() => {
    // At minimum, set the images we have
    setValidImages(images);
    setImagesLoaded(true);
  }, [images]);

  // Handle image loading errors
  const handleImageError = (index: number) => {
    console.warn(`Failed to load image at index ${index}`);
    setImageErrors(prev => ({...prev, [index]: true}));
  };

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };

  const navigateToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  const navigatePrev = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? validImages.length - 1 : prev - 1));
  };

  const navigateNext = () => {
    setCurrentImageIndex((prev) => (prev === validImages.length - 1 ? 0 : prev + 1));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigatePrev();
    if (e.key === 'ArrowRight') navigateNext();
  };

  if (!imagesLoaded) {
    return <div className="py-8 text-center">Loading gallery...</div>;
  }

  if (validImages.length === 0) {
    return <div className="py-8 text-center">No gallery images available</div>;
  }

  // Filter out images with loading errors
  const displayImages = imageErrors && Object.keys(imageErrors).length > 0 
    ? validImages.filter((_, index) => !imageErrors[index])
    : validImages;

  if (displayImages.length === 0) {
    return <div className="py-8 text-center">Unable to load gallery images</div>;
  }

  return (
    <div className="py-8">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-secondary">{title}</h2>
      
      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {validImages.map((image, index) => (
          <div
            key={index}
            className="relative aspect-[4/3] bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-[1.02]"
            onClick={() => !imageErrors[index] && openLightbox(index)}
            style={{ display: imageErrors[index] ? 'none' : 'block' }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
              onError={() => handleImageError(index)}
              priority={index < 6} // Prioritize loading first 6 images
            />
            <div className="absolute inset-0 bg-black opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {/* Close Button */}
          <button 
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            onClick={closeLightbox}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {/* Navigation Buttons */}
          <button
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
            onClick={(e) => { e.stopPropagation(); navigatePrev(); }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
            onClick={(e) => { e.stopPropagation(); navigateNext(); }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          {/* Main Image */}
          <div 
            className="relative h-full max-h-[80vh] max-w-[90%] mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={validImages[currentImageIndex].src}
              alt={validImages[currentImageIndex].alt}
              fill
              sizes="90vw"
              className="object-contain"
              priority
              onError={() => {
                handleImageError(currentImageIndex);
                navigateNext();
              }}
            />
          </div>
          
          {/* Thumbnails */}
          {validImages.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 overflow-x-auto max-w-[90%] p-2">
              {validImages.map((image, index) => (
                !imageErrors[index] && (
                  <div
                    key={index}
                    className={`relative w-16 h-12 rounded-md overflow-hidden cursor-pointer border-2 transition-all ${
                      currentImageIndex === index ? 'border-primary' : 'border-transparent'
                    }`}
                    onClick={(e) => { e.stopPropagation(); navigateToImage(index); }}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="64px"
                      className="object-cover"
                      onError={() => handleImageError(index)}
                    />
                  </div>
                )
              ))}
            </div>
          )}
          
          {/* Image Counter */}
          <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
            {currentImageIndex + 1} / {
              imageErrors && Object.keys(imageErrors).length > 0
                ? validImages.length - Object.keys(imageErrors).length
                : validImages.length
            }
          </div>
        </div>
      )}
    </div>
  );
} 