import React from 'react';
import { ImageGallery } from './ImageGallery';
import { useProjectDetails } from '../hooks/useProjectDetails';

interface ProjectGalleryTemplateProps {
  slug: string;
}

/**
 * Template component for rendering a project gallery page
 */
export const ProjectGalleryTemplate: React.FC<ProjectGalleryTemplateProps> = ({ slug }) => {
  const { project, images, loading, error } = useProjectDetails(slug);
  
  if (loading) {
    return <div>Loading project details...</div>;
  }
  
  if (error || !project) {
    return <div>Project not found or error loading project details.</div>;
  }
  
  return (
    <div className="project-gallery-template">
      <header className="project-header">
        <h1>{project.name}</h1>
        <p className="project-description">{project.description}</p>
      </header>
      
      <section className="project-gallery">
        <ImageGallery 
          project={project}
          settings={{
            thumbnailSize: 'medium',
            showCaptions: true,
            lightboxEnabled: true
          }}
        />
      </section>
      
      <footer className="project-footer">
        <p>View more renovation projects in our gallery.</p>
      </footer>
    </div>
  );
};
