import { 
  GalleryProject, 
  galleryProjects, 
  getProjectBySlug, 
  getProjectImages,
  getVisibleProjects,
  getMaintenanceProjects
} from '../../../lib/gallery-data';

/**
 * Service for retrieving gallery project data
 */
export const galleryDataService = {
  /**
   * Get all gallery projects
   * @returns Array of gallery projects
   */
  getAllProjects: (): GalleryProject[] => {
    return galleryProjects;
  },

  /**
   * Get only visible gallery projects (not under maintenance)
   * @returns Array of visible gallery projects
   */
  getVisibleProjects: (): GalleryProject[] => {
    return getVisibleProjects();
  },

  /**
   * Get projects that are currently under maintenance
   * @returns Array of projects under maintenance
   */
  getMaintenanceProjects: (): GalleryProject[] => {
    return getMaintenanceProjects();
  },

  /**
   * Get a project by its slug
   * @param slug Project slug
   * @returns Project data or undefined if not found
   */
  getProjectBySlug: (slug: string): GalleryProject | undefined => {
    return getProjectBySlug(slug);
  },

  /**
   * Get images for a project
   * @param project Gallery project
   * @returns Array of image objects with src and alt properties
   */
  getProjectImages: (project: GalleryProject) => {
    return getProjectImages(project);
  }
};
