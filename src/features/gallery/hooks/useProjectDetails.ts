import { useState, useEffect } from 'react';
import { GalleryProject } from '../../../lib/gallery-data';
import { galleryDataService } from '../services/galleryDataService';

/**
 * Hook for accessing project details by slug
 * @param slug Project slug
 * @returns Object containing project details, images, and loading state
 */
export function useProjectDetails(slug: string) {
  const [project, setProject] = useState<GalleryProject | null>(null);
  const [images, setImages] = useState<Array<{ src: string, alt: string }>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    try {
      const projectData = galleryDataService.getProjectBySlug(slug);
      
      if (!projectData) {
        throw new Error(`Project not found: ${slug}`);
      }
      
      setProject(projectData);
      setImages(galleryDataService.getProjectImages(projectData));
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
      setLoading(false);
    }
  }, [slug]);

  return { project, images, loading, error };
}
