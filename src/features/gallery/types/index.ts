export interface GalleryImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface ProjectDetails {
  title: string;
  location: string;
  description: string;
  featuredImage: string;
  category: string;
  completionDate: string;
  details: {
    services: string[];
    scope: string;
    challenges?: string;
    solutions?: string;
    duration: string;
  };
  images: GalleryImage[];
}

export interface ProjectMap {
  [key: string]: {
    title: string;
    location: string;
    category: string;
    description: string;
  }
}

export type Project = {
  id: string;
  title: string;
  category: string;
  location: string;
  description: string;
  imageSrc: string;
  slug: string;
  available: boolean;
}; 