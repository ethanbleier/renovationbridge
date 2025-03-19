'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function GuideImageCarousel({ 
  images = [
    "/images/guide/ajar.png",
    "/images/guide/double.png",
    "/images/guide/open.png",
  ]
}) {
  const [activeImage, setActiveImage] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (isHovering) return; // Pause rotation when hovering
    
    const interval = setInterval(() => {
      setActiveImage((current) => (current + 1) % images.length);
    }, 5000); // Slightly faster rotation
    
    return () => clearInterval(interval);
  }, [images.length, isHovering]);

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
          {images.map((src, index) => (
            <div
              key={index}
              className={`absolute top-0 left-0 w-full h-full transition-all duration-1000
                ${activeImage === index 
                  ? 'opacity-100 scale-100 z-10' 
                  : 'opacity-0 scale-95 z-0'}`}
              style={{ 
                transform: `translateZ(${activeImage === index ? '10px' : '-10px'})` 
              }}
            >
              <img
                src={src}
                alt={`Renovation Guide Preview ${index + 1}`}
                className="w-full h-full object-cover"
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
      
      {/* Navigation dots */}
      <div className="absolute -bottom-10 left-0 right-0 flex justify-center space-x-3 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveImage(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 
              ${activeImage === index 
                ? 'bg-amber-400 w-6 shadow-md shadow-amber-300/50' 
                : 'bg-gray-300 hover:bg-amber-200'}`}
            aria-label={`View image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
} 