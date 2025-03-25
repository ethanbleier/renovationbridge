'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

export default function GuideImageCarousel({ 
  images = [
    "/images/guide/ajar.png",
    "/images/guide/double.png",
    "/images/guide/open.png",
    "/images/guide/guide.png",
  ],
  currentIndex,
  setCurrentIndex
}: {
  images?: string[];
  currentIndex?: number;
  setCurrentIndex?: ((index: number) => void) | React.Dispatch<React.SetStateAction<number>>;
}) {
  const [isHovering, setIsHovering] = useState(false);
  
  // Use internal state if external control is not provided
  const [internalActiveImage, setInternalActiveImage] = useState(0);
  
  // Determine which state to use
  const activeImage = currentIndex !== undefined ? currentIndex : internalActiveImage;
  const setActiveImage = setCurrentIndex || setInternalActiveImage;

  useEffect(() => {
    if (isHovering) return; // Pause rotation when hovering
    
    const interval = setInterval(() => {
      // Calculate the next index
      const nextIndex = (activeImage + 1) % images.length;
      // Call setActiveImage with the direct value
      setActiveImage(nextIndex);
    }, 5000); // Slightly faster rotation
    
    return () => clearInterval(interval);
  }, [images.length, isHovering, setActiveImage, activeImage]);

  return (
    <div 
      className="relative w-full aspect-[3/4] overflow-visible"
      style={{ perspective: '1000px' }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* 3D Book effect wrapper */}
      <div 
        className="relative w-full h-full transition-all duration-700 ease-out"
        style={{ 
          transformStyle: 'preserve-3d',
          transform: isHovering ? 'rotateY(5deg) rotateX(5deg)' : 'none'
        }}
      >
        {/* Gold glowing border */}
        <div className="absolute -inset-2 bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 rounded-xl opacity-75 blur-lg animate-pulse-slow z-0"></div>
        
        {/* Main content with shadow */}
        <div className="relative z-10 rounded-lg shadow-2xl overflow-hidden w-full h-full bg-white">
          {images.map((src, imgIndex) => (
            <div
              key={imgIndex}
              className={`absolute top-0 left-0 w-full h-full transition-all duration-1000
                ${activeImage === imgIndex 
                  ? 'opacity-100 scale-100 z-10' 
                  : 'opacity-0 scale-95 z-0'}`}
              style={{ 
                transform: `translateZ(${activeImage === imgIndex ? '10px' : '-10px'})` 
              }}
            >
              <Image
                src={src}
                alt={`Renovation Guide Preview ${imgIndex + 1}`}
                width={500}
                height={300}
                className="w-full h-full object-cover"
                priority
              />
              
              {/* Overlay with subtle gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-60"></div>
            </div>
          ))}
          
          {/* Shine effect on hover */}
          <div 
            className={`absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-0 
              ${isHovering ? 'animate-shine' : ''}`}
          ></div>
        </div>
      </div>
      
      {/* Decorative elements with enhanced styling */}
      <div className="absolute -top-8 -left-8 w-28 h-28 bg-lavender rounded-full opacity-40 blur-sm animate-float"></div>
      <div className="absolute -bottom-10 -right-10 w-36 h-36 bg-primary rounded-full opacity-20 blur-sm animate-float-delay"></div>
      <div className="absolute bottom-12 -left-6 w-20 h-20 bg-amber-300 rounded-full opacity-20 blur-md animate-float-slow"></div>
    </div>
  );
} 