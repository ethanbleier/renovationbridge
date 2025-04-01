import React, { useState } from 'react';
import Image from 'next/image';
import { GalleryProject } from '../../../lib/gallery-data';
import { galleryDataService } from '../services/galleryDataService';
import { GallerySettings } from '../types';

interface ImageGalleryProps {
  project: GalleryProject;
  settings?: Partial<GallerySettings>;
}

/**
 * Component for displaying a gallery of project images
 */
export const ImageGallery: React.FC<ImageGalleryProps> = ({ 
  project,
  settings = {
    thumbnailSize: 'medium',
    showCaptions: true,
    lightboxEnabled: true
  }
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  
  const images = galleryDataService.getProjectImages(project);
  
  const openLightbox = (index: number) => {
    if (settings.lightboxEnabled) {
      setActiveImageIndex(index);
      setLightboxOpen(true);
    }
  };
  
  const closeLightbox = () => {
    setLightboxOpen(false);
  };
  
  // Placeholder implementation
  return (
    <div className="image-gallery">
      <div className="thumbnails-grid">
        {images.map((image, index) => (
          <div 
            key={index} 
            className={`thumbnail thumbnail-${settings.thumbnailSize}`}
            onClick={() => openLightbox(index)}
          >
            <Image 
              src={image.src} 
              alt={image.alt} 
              width={240}
              height={160}
              className="object-cover"
            />
            {settings.showCaptions && <p className="caption">{image.alt}</p>}
          </div>
        ))}
      </div>
      
      {lightboxOpen && (
        <div className="lightbox" onClick={closeLightbox}>
          <div className="lightbox-content">
            <Image 
              src={images[activeImageIndex].src} 
              alt={images[activeImageIndex].alt} 
              width={800}
              height={600}
              className="object-contain"
            />
            <button className="close-button" onClick={closeLightbox}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};
