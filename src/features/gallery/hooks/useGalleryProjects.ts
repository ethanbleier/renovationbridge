import { useState, useMemo } from 'react';
import { Project } from '../types';
import { projectInfo } from '../services/galleryDataService';
import { getAllProjectNames, getProjectFeaturedImage } from '../services/galleryImageService';

export function useGalleryProjects() {
  // Generate all projects from the project info
  const allProjects = useMemo<Project[]>(() => {
    const projectNames = getAllProjectNames();
    
    return projectNames
      .map(name => {
        const info = projectInfo[name];
        if (!info) return null;
        
        return {
          id: name.toLowerCase(),
          title: info.title,
          category: info.category,
          location: info.location,
          description: info.description,
          imageSrc: getProjectFeaturedImage(name),
          slug: name.toLowerCase(),
          available: true
        };
      })
      .filter(Boolean) as Project[];
  }, []);

  // Filter categories for the filter bar
  const categories = useMemo<string[]>(() => {
    return Array.from(new Set(['All', ...allProjects.map(project => project.category)])).sort();
  }, [allProjects]);

  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Filter projects based on selected category
  const filteredProjects = useMemo(() => {
    return selectedCategory === 'All'
      ? allProjects
      : allProjects.filter(project => project.category === selectedCategory);
  }, [allProjects, selectedCategory]);

  return {
    allProjects,
    filteredProjects,
    categories,
    selectedCategory,
    setSelectedCategory
  };
} 