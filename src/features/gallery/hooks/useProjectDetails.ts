import { useMemo } from 'react';
import { ProjectDetails } from '../types';
import { projectInfo } from '../services/galleryDataService';
import { getProjectImages, getProjectFeaturedImage } from '../services/galleryImageService';

export function useProjectDetails(slug: string): ProjectDetails | null {
  return useMemo(() => {
    // Find the project name that matches the slug
    const projectName = Object.keys(projectInfo).find(
      name => name.toLowerCase() === slug.toLowerCase()
    );
    
    if (!projectName) return null;
    
    // Get the project info
    const info = projectInfo[projectName];
    if (!info) return null;
    
    // Get the images
    const images = getProjectImages(projectName);
    
    // Get the featured image
    const featuredImage = getProjectFeaturedImage(projectName);
    
    // Generate random completion date and duration (for demo purposes)
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const month = months[Math.floor(Math.random() * months.length)];
    const year = 2022 + Math.floor(Math.random() * 3); // 2022, 2023, or 2024
    const completionDate = `${month} ${year}`;
    
    const durations = ['2 weeks', '4 weeks', '6 weeks', '2 months', '3 months', '4 months', '6 months', '8 months'];
    const duration = durations[Math.floor(Math.random() * durations.length)];
    
    // Generate services based on category
    const baseServices = ['Design Consultation', 'Demolition', 'Permit Acquisition'];
    let categoryServices: string[] = [];
    
    switch (info.category) {
      case 'Kitchen':
        categoryServices = ['Kitchen Design', 'Custom Cabinetry', 'Countertop Installation', 'Appliance Installation', 'Lighting Design'];
        break;
      case 'Bathroom':
        categoryServices = ['Bathroom Design', 'Custom Tilework', 'Shower Installation', 'Vanity Installation', 'Fixture Selection'];
        break;
      case 'Full Home':
        categoryServices = ['Interior Design', 'Structural Renovation', 'Electrical Updates', 'Plumbing Upgrades', 'Flooring Installation'];
        break;
      default:
        categoryServices = ['Space Planning', 'Material Selection', 'Fixture Updates', 'Custom Millwork', 'Finish Selection'];
    }
    
    const services = [...baseServices, ...categoryServices];
    
    // Generate challenges and solutions based on category
    let challenges = 'The project presented several challenges, including working with an older home that required significant structural updates. Additionally, we needed to carefully integrate modern systems and features while preserving certain character elements of the original home.';
    let solutions = 'Our team collaborated closely with structural engineers to develop innovative solutions for the renovation. We also created custom millwork and cabinetry to maximize storage and functionality while maintaining a clean, modern aesthetic throughout the home.';
    
    return {
      title: info.title,
      location: info.location,
      description: info.description,
      featuredImage,
      category: info.category,
      completionDate,
      details: {
        services,
        scope: `Complete renovation project in ${info.location}`,
        challenges,
        solutions,
        duration,
      },
      images,
    };
  }, [slug]);
} 