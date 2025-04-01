// Re-export types from lib/gallery-data
export * from '../../../lib/gallery-data';

// Additional gallery-specific types can be added here
export interface GallerySettings {
  thumbnailSize: 'small' | 'medium' | 'large';
  showCaptions: boolean;
  lightboxEnabled: boolean;
}
