export interface GalleryProject {
  id: string;
  name: string;
  slug: string;
  imageCount: number;
  description: string;
  folder: string;
}

export const galleryProjects: GalleryProject[] = [
  {
    id: 'Alamo',
    name: 'Alamo',
    slug: 'alamo',
    imageCount: 7,
    description: 'Before and after renovation photos. Interior and exterior shots.',
    folder: 'Project-Alamo',
  },
  {
    id: 'Berkeley',
    name: 'Berkeley',
    slug: 'berkeley',
    imageCount: 9,
    description: 'Comprehensive home transformation. Multiple room renovations. Exterior improvements.',
    folder: 'Project-Berkeley',
  },
  {
    id: 'CastroValley',
    name: 'Castro Valley',
    slug: 'castro-valley',
    imageCount: 11,
    description: 'Extensive property renovation. Detailed progression documentation. Multiple room transformations.',
    folder: 'Project-CastroValley',
  },
  {
    id: 'Danville',
    name: 'Danville',
    slug: 'danville',
    imageCount: 6,
    description: 'Complete home renovation documentation. Progressive renovation stages.',
    folder: 'Project-Danville',
  },
  {
    id: 'Fremont',
    name: 'Fremont',
    slug: 'fremont',
    imageCount: 6,
    description: 'Full home renovation. Interior design updates.',
    folder: 'Project-Fremont',
  },
  {
    id: 'Lafayette',
    name: 'Lafayette',
    slug: 'lafayette',
    imageCount: 6,
    description: 'Luxury renovation project.',
    folder: 'Project-Lafayette',
  },
  {
    id: 'Moraga',
    name: 'Moraga',
    slug: 'moraga',
    imageCount: 6,
    description: 'Interior renovation showcase. Modern design implementation.',
    folder: 'Project-Moraga',
  },
  {
    id: 'Oakland',
    name: 'Oakland',
    slug: 'oakland',
    imageCount: 9,
    description: 'Urban property renovation. Complete home transformation. Detailed progress documentation.',
    folder: 'Project-Oakland',
  },
  {
    id: 'Orinda',
    name: 'Orinda',
    slug: 'orinda',
    imageCount: 6,
    description: 'Luxury home renovation. High-end finishes. Complete interior transformation.',
    folder: 'Project-Orinda',
  },
  {
    id: 'RedwoodCity',
    name: 'Redwood City',
    slug: 'redwood-city',
    imageCount: 6,
    description: 'Bay Area renovation project.',
    folder: 'Project-RedwoodCity',
  },
  {
    id: 'SanFrancisco',
    name: 'San Francisco',
    slug: 'san-francisco',
    imageCount: 6,
    description: 'Urban renovation project. Modern design transformation.',
    folder: 'Project-SanFrancisco',
  },
  {
    id: 'SanJose',
    name: 'San Jose',
    slug: 'san-jose',
    imageCount: 7,
    description: 'Comprehensive renovation coverage. Multiple room transformations.',
    folder: 'Project-SanJose',
  },
  {
    id: 'Saratoga',
    name: 'Saratoga',
    slug: 'saratoga',
    imageCount: 7,
    description: 'Luxury property renovation.',
    folder: 'Project-Saratoga',
  },
  {
    id: 'Tice',
    name: 'Tice',
    slug: 'tice',
    imageCount: 8,
    description: 'Extensive renovation project. Interior and exterior updates. Detailed progress shots.',
    folder: 'Project-Tice',
  },
  {
    id: 'WalnutCreek',
    name: 'Walnut Creek',
    slug: 'walnut-creek',
    imageCount: 6,
    description: 'Modern home renovation. Complete interior transformation.',
    folder: 'Project-WalnutCreek',
  },
];

/**
 * Gets a project by its slug
 * @param slug The project slug to find
 * @returns The project data or undefined if not found
 */
export function getProjectBySlug(slug: string): GalleryProject | undefined {
  return galleryProjects.find(project => project.slug === slug);
}

/**
 * Generates an array of image objects for a project
 * @param project The gallery project
 * @returns Array of image objects with src and alt properties
 */
export function getProjectImages(project: GalleryProject) {
  // Use the id for image naming as it matches the actual file structure
  const imageBaseName = project.id;
  
  const projectImages = Array.from({ length: project.imageCount }, (_, i) => ({
    src: `/images/gallery/${project.folder}/${imageBaseName}-${i + 1}.jpg`,
    alt: `${project.name} Renovation - Image ${i + 1}`,
  }));
  
  // If no images, use placeholder
  if (projectImages.length === 0) {
    projectImages.push({
      src: '/images/gallery/placeholder.jpg',
      alt: `${project.name} Renovation - Placeholder Image`,
    });
  }
  
  return projectImages;
} 