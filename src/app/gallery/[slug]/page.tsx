import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getProjectBySlug, getProjectImages } from '@/lib/gallery-data';
import { galleryDataService } from '@/features/gallery/services/galleryDataService';
import ProjectGallery from '@/components/gallery/ProjectGallery';
import { CalendarIcon, HomeIcon, TagIcon } from '@heroicons/react/24/outline';

// Generate metadata for each project
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = getProjectBySlug(params.slug);
  
  if (!project) {
    return {
      title: 'Project Not Found | Renovation Bridge',
      description: 'The requested renovation project could not be found.'
    };
  }
  
  return {
    title: `${project.name} Renovation Project | Renovation Bridge`,
    description: project.description,
    keywords: ['renovation project', project.name, 'home transformation', 'Bay Area renovation'],
    alternates: {
      canonical: `https://renovationbridge.com/gallery/${project.slug}`,
    },
    openGraph: {
      title: `${project.name} Renovation Project | Renovation Bridge`,
      description: project.description,
      url: `https://renovationbridge.com/gallery/${project.slug}`,
      images: [
        {
          url: project.imageCount > 0 
            ? `/images/gallery/${project.folder}/${project.id}-1.jpg` 
            : '/images/gallery/placeholder.jpg',
          width: 1200,
          height: 630,
          alt: `${project.name} Renovation Project`,
        },
      ],
    },
  };
}

// Generate all valid paths for static generation
export async function generateStaticParams() {
  // Generate paths only for visible projects
  return galleryDataService.getVisibleProjects().map(project => ({
    slug: project.slug,
  }));
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);
  
  // Return 404 if project not found or is under maintenance
  if (!project || project.underMaintenance) {
    notFound();
  }
  
  // Get project images
  const projectImages = getProjectImages(project);

  // Get visible projects for related projects section
  const visibleProjects = galleryDataService.getVisibleProjects();

  return (
    <main className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex items-center space-x-2 text-sm">
          <li>
            <Link href="/" className="text-gray-500 hover:text-gray-700">
              Home
            </Link>
          </li>
          <li className="text-gray-500">/</li>
          <li>
            <Link href="/gallery" className="text-gray-500 hover:text-gray-700">
              Gallery
            </Link>
          </li>
          <li className="text-gray-500">/</li>
          <li className="text-gray-900 font-medium" aria-current="page">
            {project.name}
          </li>
        </ol>
      </nav>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Project Info Sidebar */}
        <div className="order-2 lg:order-1 lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Project Details</h2>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <HomeIcon className="h-5 w-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-900">Location</h3>
                  <p className="text-sm text-gray-500">{project.name}, California</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <TagIcon className="h-5 w-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-900">Project Type</h3>
                  <p className="text-sm text-gray-500">Complete Home Renovation</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <CalendarIcon className="h-5 w-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-900">Completion</h3>
                  <p className="text-sm text-gray-500">2024</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-gray-700 text-sm mb-6">{project.description}</p>
              <Link 
                href="/get-started" 
                className="block w-full bg-indigo-600 text-center text-white font-semibold px-6 py-3 rounded-lg shadow-sm hover:bg-indigo-700 transition-all"
              >
                Start Your Project
              </Link>
            </div>
          </div>
        </div>
        
        {/* Project Gallery */}
        <div className="order-1 lg:order-2 lg:col-span-2">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">{project.name} Renovation</h1>
          
          {/* Project Gallery with Improved Rendering */}
          <ProjectGallery 
            images={projectImages} 
            heroImageIndex={0} 
          />
          
          {/* Related Projects Section - Only show visible projects */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Explore More Projects</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {visibleProjects
                .filter(p => p.slug !== project.slug)
                .slice(0, 2)
                .map(relatedProject => (
                  <Link 
                    key={relatedProject.slug} 
                    href={`/gallery/${relatedProject.slug}`}
                    className="group"
                  >
                    <div className="aspect-video relative rounded-lg overflow-hidden bg-gray-100">
                      <Image 
                        src={`/images/gallery/${relatedProject.folder}/${relatedProject.id}-1.jpg`}
                        alt={`${relatedProject.name} Renovation`}
                        width={600}
                        height={338}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        priority={false}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-40 transition-all flex items-end">
                        <div className="p-4 w-full">
                          <h3 className="text-white font-semibold text-lg">{relatedProject.name}</h3>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 