// Types
export * from './types';

// Components
export { default as ImageGallery } from './components/ImageGallery';
export { default as ProjectGalleryTemplate } from './components/ProjectGalleryTemplate';

// Hooks
export { useGalleryProjects } from './hooks/useGalleryProjects';
export { useProjectDetails } from './hooks/useProjectDetails';

// Services
export { 
  projectInfo,
  getProjectNameFromDir,
  getSlugFromProjectName,
  generateCompletionDate,
  generateProjectDuration,
  generateServices,
  generateScope,
  generateChallengesSolutions,
  generateProjectDetails
} from './services/galleryDataService';

// Gallery image services are exported as a namespace
export * as galleryImageService from './services/galleryImageService'; 