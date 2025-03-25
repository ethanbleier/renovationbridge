import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ProjectGalleryTemplate } from '@/features/gallery';
import { projectInfo } from '@/features/gallery';
import { getProjectImages, getProjectFeaturedImage } from '@/features/gallery/services/galleryImageService';
import { ProjectDetails, GalleryImage } from '@/features/gallery/types';

// Function to get project details for a given slug
async function getProjectBySlug(slug: string): Promise<ProjectDetails | null> {
  try {
    // Normalize the slug to lowercase
    const normalizedSlug = slug.toLowerCase();
    
    // Debug: Log available project keys
    console.log('Available project keys:', Object.keys(projectInfo));
    console.log('Looking for slug:', normalizedSlug);
    
    // Find the project name with case-insensitive matching
    const projectName = Object.keys(projectInfo).find(name => 
      name.toLowerCase() === normalizedSlug
    );
    
    // Debug: Log the found project name
    console.log('Found project name:', projectName);
    
    if (!projectName) {
      console.error(`Project not found for slug: ${normalizedSlug}`);
      return null;
    }
    
    // Get the project info
    const info = projectInfo[projectName];
    if (!info) {
      console.error(`Project info not found for name: ${projectName}`);
      return null;
    }
    
    // Get the images - wrap in try/catch to prevent server errors
    let images: GalleryImage[] = [];
    try {
      images = getProjectImages(projectName);
      console.log(`Loaded ${images.length} images for ${projectName}`);
    } catch (error) {
      console.error(`Error loading images for ${projectName}:`, error);
      images = []; // Fallback to empty array
    }
    
    // Get the featured image - wrap in try/catch
    let featuredImage = '';
    try {
      featuredImage = getProjectFeaturedImage(projectName);
    } catch (error) {
      console.error(`Error loading featured image for ${projectName}:`, error);
      featuredImage = '/images/gallery/placeholder.jpg'; // Fallback image
    }
    
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
  } catch (error) {
    console.error(`Error getting project details for slug ${slug}:`, error);
    return null;
  }
}

// Generate dynamic paths for all projects
export async function generateStaticParams() {
  try {
    // Use projectInfo keys directly and ensure lowercase slugs
    const projectNames = Object.keys(projectInfo);
    
    return projectNames.map(name => ({
      slug: name.toLowerCase()
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

// Generate metadata for the page
export async function generateMetadata({ 
  params 
}: { 
  params: { slug: string } 
}): Promise<Metadata> {
  try {
    const project = await getProjectBySlug(params.slug);
    
    if (!project) {
      return {
        title: 'Project Not Found | Renovation Bridge',
        description: 'The requested project could not be found.',
      };
    }

    return {
      title: `${project.title} | Renovation Bridge`,
      description: project.description.substring(0, 160),
      openGraph: {
        title: `${project.title} | Renovation Bridge`,
        description: project.description.substring(0, 160),
        images: [{ url: project.featuredImage }],
      },
    };
  } catch (error) {
    console.error(`Error generating metadata for ${params.slug}:`, error);
    return {
      title: 'Error | Renovation Bridge',
      description: 'There was an error loading this project.',
    };
  }
}

export default async function ProjectPage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  try {
    const project = await getProjectBySlug(params.slug);
    
    // If project not found, show 404
    if (!project) {
      notFound();
    }

    return (
      <ProjectGalleryTemplate project={project} />
    );
  } catch (error) {
    console.error(`Error rendering project page for ${params.slug}:`, error);
    notFound(); // Fallback to 404 instead of showing a server error
  }
} 