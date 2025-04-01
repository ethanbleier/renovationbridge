'use client';

import React, { useState } from 'react';
import GalleryImage from './GalleryImage';
import GalleryLightbox, { GalleryImage as GalleryImageType } from './GalleryLightbox';

interface ProjectGalleryProps {
  images: GalleryImageType[];
  heroImageIndex?: number;
}

export default function ProjectGallery({ 
  images, 
  heroImageIndex = 0 
}: ProjectGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Skip the hero image in the grid if it's shown separately
  const gridImages = heroImageIndex === 0 
    ? images.slice(1) 
    : [...images.slice(0, heroImageIndex), ...images.slice(heroImageIndex + 1)];

  const heroImage = images[heroImageIndex];

  // Open lightbox with the clicked image
  const openLightbox = (index: number) => {
    // If we're opening from the grid, we need to adjust the index
    // to account for the hero image
    let adjustedIndex = index;
    if (heroImageIndex === 0) {
      adjustedIndex = index + 1; // Add 1 because we skip the first image in the grid
    } else if (index >= heroImageIndex) {
      adjustedIndex = index + 1; // We need to add 1 to account for the removed hero image
    }
    
    setSelectedImageIndex(adjustedIndex);
    setLightboxOpen(true);
  };

  // Open lightbox with the hero image
  const openHeroLightbox = () => {
    setSelectedImageIndex(heroImageIndex);
    setLightboxOpen(true);
  };

  // Group images for masonry-style layout
  const leftColumnImages = gridImages.filter((_, i) => i % 3 === 0);
  const middleColumnImages = gridImages.filter((_, i) => i % 3 === 1);
  const rightColumnImages = gridImages.filter((_, i) => i % 3 === 2);

  return (
    <div className="space-y-10">
      {/* Hero Image */}
      {heroImage && (
        <div 
          onClick={openHeroLightbox}
          className="relative overflow-hidden rounded-xl shadow-lg cursor-pointer transition-transform hover:shadow-xl"
        >
          <GalleryImage
            src={heroImage.src}
            alt={heroImage.alt}
            aspectRatio="video"
            priority
            fill
            className="relative w-full h-[50vh] sm:h-[60vh]"
            onClick={openHeroLightbox}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 opacity-0 hover:opacity-100 transition-opacity flex items-end justify-center">
            <div className="text-white p-4 font-medium text-center">
              <span className="bg-black/80 text-white px-4 py-2 rounded-full text-sm font-medium inline-flex items-center shadow-lg transform transition-transform hover:scale-105">
                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
                View Larger
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Image Gallery - Masonry Style Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Left Column */}
        <div className="space-y-4 sm:space-y-6">
          {leftColumnImages.map((image, index) => (
            <div 
              key={`left-${index}`} 
              className="overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
            >
              <GalleryImage
                src={image.src}
                alt={image.alt}
                aspectRatio={index % 2 === 0 ? "square" : "video"}
                className="w-full"
                priority={index === 0} // Load first image with priority
                fill
                onClick={() => openLightbox(leftColumnImages.indexOf(image))}
              />
            </div>
          ))}
        </div>
        
        {/* Middle Column */}
        <div className="space-y-4 sm:space-y-6">
          {middleColumnImages.map((image, index) => (
            <div 
              key={`middle-${index}`} 
              className="overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
            >
              <GalleryImage
                src={image.src}
                alt={image.alt}
                aspectRatio={index % 2 === 1 ? "square" : "video"}
                className="w-full"
                priority={index === 0} // Load first image with priority
                fill
                onClick={() => openLightbox(middleColumnImages.indexOf(image))}
              />
            </div>
          ))}
        </div>
        
        {/* Right Column */}
        {rightColumnImages.length > 0 && (
          <div className="space-y-4 sm:space-y-6">
            {rightColumnImages.map((image, index) => (
              <div 
                key={`right-${index}`} 
                className="overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
              >
                <GalleryImage
                  src={image.src}
                  alt={image.alt}
                  aspectRatio={index % 2 === 0 ? "video" : "square"}
                  className="w-full"
                  priority={index === 0} // Load first image with priority
                  fill
                  onClick={() => openLightbox(rightColumnImages.indexOf(image))}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <GalleryLightbox
        images={images}
        selectedIndex={selectedImageIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  );
} 