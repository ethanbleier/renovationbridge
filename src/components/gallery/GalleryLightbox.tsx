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
  const [zoomLevel, setZoomLevel] = useState(1);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });

  // Navigation functions with useCallback
  const nextImage = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    // Reset zoom level and position when changing images
    setZoomLevel(1);
    setImagePosition({ x: 0, y: 0 });
    // Wait for animation to complete
    setTimeout(() => setIsAnimating(false), 300);
  }, [isAnimating, images.length]);

  const previousImage = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    // Reset zoom level and position when changing images
    setZoomLevel(1);
    setImagePosition({ x: 0, y: 0 });
    // Wait for animation to complete
    setTimeout(() => setIsAnimating(false), 300);
  }, [isAnimating, images.length]);

  // Zoom functions
  const zoomIn = useCallback(() => {
    setZoomLevel(prevZoom => Math.min(prevZoom + 0.25, 3)); // Max zoom of 3x
  }, []);

  const zoomOut = useCallback(() => {
    setZoomLevel(prevZoom => {
      const newZoom = Math.max(prevZoom - 0.25, 1); // Min zoom of 1x
      // Reset position if we're back to normal size
      if (newZoom === 1) {
        setImagePosition({ x: 0, y: 0 });
      }
      return newZoom;
    });
  }, []);

  const resetZoom = useCallback(() => {
    setZoomLevel(1);
    setImagePosition({ x: 0, y: 0 });
  }, []);

  // Pan image when zoomed in
  const handleImageMouseDown = useCallback((e: React.MouseEvent) => {
    if (zoomLevel === 1) return;
    
    const startX = e.clientX;
    const startY = e.clientY;
    const startPosX = imagePosition.x;
    const startPosY = imagePosition.y;
    
    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;
      setImagePosition({
        x: startPosX + deltaX,
        y: startPosY + deltaY
      });
    };
    
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [zoomLevel, imagePosition]);

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
      } else if (e.key === '+' || e.key === '=') {
        zoomIn();
      } else if (e.key === '-' || e.key === '_') {
        zoomOut();
      } else if (e.key === '0') {
        resetZoom();
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
  }, [isOpen, onClose, nextImage, previousImage, zoomIn, zoomOut, resetZoom]);

  // Update current index when selected index changes
  useEffect(() => {
    setCurrentIndex(selectedIndex);
    setIsLoading(true);
    // Reset zoom when opening new image
    setZoomLevel(1);
    setImagePosition({ x: 0, y: 0 });
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
        {/* Zoom controls - inside the image container */}
        <div className="absolute top-1/2 right-6 z-20 flex flex-col space-y-2 -translate-y-1/2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              zoomIn();
            }}
            className="text-white bg-black/30 p-2 rounded-full hover:bg-black/50 transition-colors"
            aria-label="Zoom in"
            disabled={zoomLevel >= 3}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"></path>
            </svg>
          </button>
          {zoomLevel > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                resetZoom();
              }}
              className="text-white bg-black/30 p-2 rounded-full hover:bg-black/50 transition-colors"
              aria-label="Reset zoom"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
            </button>
          )}
          {zoomLevel > 1 && (
            <span className="text-white bg-black/30 px-2 py-1 rounded-full text-sm text-center">
              {Math.round(zoomLevel * 100)}%
            </span>
          )}
        </div>

        <div className="relative w-full h-full flex items-center justify-center">
          {/* Loading spinner */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
            </div>
          )}
          
          {/* Current image */}
          <div 
            className={cn(
              "relative transition-transform duration-300 w-full h-full",
              zoomLevel > 1 ? "cursor-move" : "cursor-default"
            )}
            style={{ 
              transform: `scale(${zoomLevel}) translate(${imagePosition.x}px, ${imagePosition.y}px)`,
              transformOrigin: 'center'
            }}
            onMouseDown={handleImageMouseDown}
          >
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
              draggable={false}
            />
          </div>
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
                  onClick={() => {
                    setCurrentIndex(index);
                    resetZoom();
                  }}
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