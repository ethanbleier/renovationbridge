import { GalleryImage } from '../types';
import { projectInfo } from './galleryDataService';

// Mapping of project names to their actual image counts
const projectImageCounts: Record<string, number> = {
  'alamo': 7,
  'oakland': 9,
  'Tice': 8,
  'Berkeley': 9,
  'CastroValley': 7,
  'Danville': 8,
  'Fremont': 7,
  'Lafayette': 6,
  'Moraga': 5,
  'Orinda': 8,
  'RedwoodCity': 7,
  'SanFrancisco': 9,
  'SanJose': 6,
  'Saratoga': 8,
  'WalnutCreek': 7
};

// Specific naming exceptions for some projects
const filenameExceptions: Record<string, string> = {
  'alamo': 'alamo',
  'oakland': 'oakland'
};

// Function to get directory path for a project
function getDirectoryPath(projectName: string): string {
  // Handle inconsistent casing in directory paths
  if (projectName === 'alamo') {
    return `/images/gallery/Project-alamo`;
  } else if (projectName === 'oakland') {
    return `/images/gallery/project-oakland`;
  } else {
    return `/images/gallery/Project-${projectName}`;
  }
}

// Function to get the correct file prefix for image filenames
function getFilenamePrefix(projectName: string): string {
  return filenameExceptions[projectName] || projectName;
}

// Function to get all project images with the right path pattern
export function getProjectImages(projectName: string): GalleryImage[] {
  const info = projectInfo[projectName];
  if (!info) return [];

  const imageCount = projectImageCounts[projectName] || 0;
  const directoryPath = getDirectoryPath(projectName);
  const filenamePrefix = getFilenamePrefix(projectName);
  const images: GalleryImage[] = [];

  for (let i = 1; i <= imageCount; i++) {
    const imagePath = `${directoryPath}/${filenamePrefix}-${i}.jpg`;
    
    images.push({
      src: imagePath,
      alt: `${info.title} - ${generateImageDescription(info.category, i)}`
    });
  }

  return images;
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

// Get a list of all project directory names
export function getAllProjectNames(): string[] {
  return Object.keys(projectImageCounts);
}

// Get a featured project image
export function getProjectFeaturedImage(projectName: string): string {
  const directoryPath = getDirectoryPath(projectName);
  const filenamePrefix = getFilenamePrefix(projectName);
  
  return `${directoryPath}/${filenamePrefix}-1.jpg`;
} 