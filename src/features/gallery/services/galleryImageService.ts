import { GalleryProject } from '../../../lib/gallery-data';

interface ImageDimensions {
  width: number;
  height: number;
}

/**
 * Service for handling gallery image operations
 */
export const galleryImageService = {
  /**
   * Get optimized image URL with dimensions
   * @param imagePath Original image path
   * @param dimensions Target dimensions
   * @returns Optimized image URL
   */
  getOptimizedImageUrl: (imagePath: string, dimensions: ImageDimensions): string => {
    // In a real implementation, this would use something like Next.js Image optimization
    // or another image processing service
    return imagePath;
  },

  /**
   * Preload images for a project
   * @param project Gallery project
   */
  preloadProjectImages: (project: GalleryProject): void => {
    // Implementation would preload images for better UX
    // This is a placeholder
  }
};
