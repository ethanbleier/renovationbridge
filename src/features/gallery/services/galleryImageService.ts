'use client';

import { GalleryImage } from '../types';
import { projectInfo } from './galleryDataService';

// List of all project names - ensure these match keys in projectInfo
const PROJECT_NAMES = Object.keys(projectInfo);

// Mapping of project names to their actual image counts
const projectImageCounts: Record<string, number> = {
  'Alamo': 7,
  'Oakland': 9,
  'Tice': 8,
  'Berkeley': 9,
  'CastroValley': 11,
  'Danville': 6,
  'Fremont': 6,
  'Lafayette': 6,
  'Moraga': 6,
  'Orinda': 8,
  'RedwoodCity': 7,
  'SF': 6,
  'SJ': 7,
  'Saratoga': 7,
  'WC': 6
};

// Function to get directory path for a project
function getDirectoryPath(projectName: string): string {
  try {
    return `/images/gallery/Project-${projectName}`;
  } catch (error) {
    console.error(`Error generating directory path for ${projectName}:`, error);
    return `/images/gallery/Project-${projectName}`;
  }
}

// Function to get the correct file prefix for image filenames
function getFilenamePrefix(projectName: string): string {
  try {
    return projectName;
  } catch (error) {
    console.error(`Error getting filename prefix for ${projectName}:`, error);
    return projectName;
  }
}

// Function to generate image paths with proper format
function getImagePath(directoryPath: string, prefix: string, index: number, projectName: string): string {
  // Standard format with dash
  return `${directoryPath}/${prefix}-${index}.jpg`;
}

// Generate more descriptive alt text for images
function generateImageDescription(category: string, imageIndex: number): string {
  const kitchenDescriptions = [
    'Full view of renovated kitchen',
    'Custom cabinetry with modern hardware',
    'Countertop detail with premium materials',
    'Kitchen island with seating area',
    'Professional-grade appliances',
    'Open shelving and storage solutions',
    'Sink area with designer fixtures',
    'Lighting features and ceiling detail',
    'Breakfast nook with natural light'
  ];

  const bathroomDescriptions = [
    'Master bathroom overview',
    'Custom vanity with modern fixtures',
    'Walk-in shower with custom tilework',
    'Freestanding bathtub with floor-mounted filler',
    'Detailed view of premium fixtures',
    'Custom storage solutions',
    'Accent wall with decorative elements',
    'Glass shower enclosure with frameless design',
    'Heated flooring system'
  ];

  const homeDescriptions = [
    'Front exterior view of renovated home',
    'Open concept living room design',
    'Dining area with custom lighting',
    'Primary bedroom with custom built-ins',
    'Home office with integrated storage',
    'Hallway with architectural details',
    'Custom staircase with designer railing',
    'Family room with entertainment center',
    'Exterior rear view with landscaping'
  ];

  let descriptions: string[];
  
  switch (category) {
    case 'Kitchen':
    case 'Kitchen & Bath':
      descriptions = kitchenDescriptions;
      break;
    case 'Bathroom':
    case 'Bedroom & Bath':
      descriptions = bathroomDescriptions;
      break;
    default:
      descriptions = homeDescriptions;
  }
  
  // Get the description for this index (with fallback)
  const index = imageIndex - 1;
  return index < descriptions.length 
    ? descriptions[index] 
    : `Project image ${imageIndex}`;
}

// Define all exports at the bottom
const getAllProjectNames = () => PROJECT_NAMES;

const getProjectImages = (projectName: string): GalleryImage[] => {
  if (!projectName) {
    console.error('Project name is undefined or null');
    return [];
  }
  
  try {
    // Find the correct casing of the project name
    const actualName = PROJECT_NAMES.find(name => 
      name.toLowerCase() === projectName.toLowerCase()
    ) || projectName;
    
    const info = projectInfo[actualName];
    if (!info) {
      console.error(`Project info not found for "${actualName}"`);
      return [];
    }

    const imageCount = projectImageCounts[actualName] || 0;
    if (imageCount === 0) {
      console.warn(`No images defined for project "${actualName}"`);
      return [];
    }
    
    const directoryPath = getDirectoryPath(actualName);
    const filenamePrefix = getFilenamePrefix(actualName);
    const images: GalleryImage[] = [];

    for (let i = 1; i <= imageCount; i++) {
      // Get the appropriate image path based on project naming conventions
      const imagePath = getImagePath(directoryPath, filenamePrefix, i, actualName);
      
      images.push({
        src: imagePath,
        alt: `${info.title} - ${generateImageDescription(info.category, i)}`
      });
    }

    console.log(`Generated ${images.length} image paths for ${actualName}`);
    return images;
  } catch (error) {
    console.error(`Error getting project images for "${projectName}":`, error);
    return [];
  }
};

const getProjectFeaturedImage = (projectName: string): string => {
  if (!projectName) {
    console.error('Project name is undefined or null');
    return '/images/gallery/placeholder.jpg'; // Fallback image
  }
  
  try {
    // Find the correct casing of the project name
    const actualName = PROJECT_NAMES.find(name => 
      name.toLowerCase() === projectName.toLowerCase()
    ) || projectName;
    
    const directoryPath = getDirectoryPath(actualName);
    const filenamePrefix = getFilenamePrefix(actualName);
    
    // Always use index 1 for featured image, with standard dash format
    return `${directoryPath}/${filenamePrefix}-1.jpg`;
  } catch (error) {
    console.error(`Error getting featured image for "${projectName}":`, error);
    return '/images/gallery/placeholder.jpg'; // Fallback image
  }
};

// Export functions in a clear, explicit way
export {
  getAllProjectNames,
  getProjectImages,
  getProjectFeaturedImage
}; 