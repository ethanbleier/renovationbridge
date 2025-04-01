import { useState, useEffect } from 'react';
import { GalleryProject } from '../../../lib/gallery-data';
import { galleryDataService } from '../services/galleryDataService';

/**
 * Hook for accessing gallery projects
 * @returns Object containing gallery projects and loading state
 */
export function useGalleryProjects() {
  const [projects, setProjects] = useState<GalleryProject[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    try {
      const data = galleryDataService.getAllProjects();
      setProjects(data);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
      setLoading(false);
    }
  }, []);

  return { projects, loading, error };
}
