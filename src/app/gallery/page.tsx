import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { galleryDataService } from '@/features/gallery/services/galleryDataService';

export const metadata: Metadata = {
  title: 'Project Gallery | Renovation Bridge',
  description: 'Explore our portfolio of home renovation projects across the Bay Area, including before and after transformations.',
  keywords: ['renovation projects', 'home transformations', 'Bay Area renovations', 'before and after', 'renovation gallery'],
  alternates: {
    canonical: 'https://renovationbridge.com/gallery',
  },
  openGraph: {
    title: 'Project Gallery | Renovation Bridge',
    description: 'Explore our portfolio of home renovation projects across the Bay Area, including before and after transformations.',
    url: 'https://renovationbridge.com/gallery',
    images: [
      {
        url: '/images/logos/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Renovation Bridge Project Gallery',
      },
    ],
  },
};

export default function GalleryPage() {
  const visibleProjects = galleryDataService.getVisibleProjects();
  const maintenanceProjects = galleryDataService.getMaintenanceProjects();
  
  return (
    <main className="pt-28 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      <Link href="/" className="absolute left-4 top-4 inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Back
      </Link>

      <div className="text-center mb-12 mt-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Renovation Projects</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Explore our portfolio of home renovation projects across the Bay Area. Each project showcases our commitment to quality, craftsmanship, and customer satisfaction.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {visibleProjects.map((project) => (
          <Link href={`/gallery/${project.slug}`} key={project.id} className="h-full">
            <div className="group bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl h-full flex flex-col">
              <div className="relative h-64 w-full">
                <Image
                  src={project.imageCount > 0 
                    ? `/images/gallery/${project.folder}/${project.id}-1.jpg` 
                    : '/images/gallery/placeholder.jpg'}
                  alt={`${project.name} Renovation Project`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{project.name}</h2>
                <p className="text-gray-600 mb-4 flex-grow">{project.description}</p>
                <div className="flex items-center justify-between mt-auto pt-4">
                  <span className="text-sm font-medium text-indigo-600">
                    {project.imageCount} {project.imageCount === 1 ? 'photo' : 'photos'}
                  </span>
                  <span className="inline-flex items-center text-indigo-600 group-hover:text-indigo-800 font-semibold">
                    View Project 
                    <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {maintenanceProjects.length > 0 && (
        <div className="mt-16">
          <div className="border border-indigo-100 bg-indigo-50 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Projects Being Enhanced</h2>
            <p className="text-gray-700">
              Our team is currently enhancing the following project showcases with additional high-resolution imagery and detailed transformation documentation. 
              These exclusive projects will be available soon.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 opacity-70">
            {maintenanceProjects.map((project) => (
              <div key={project.id} className="bg-white rounded-lg overflow-hidden shadow-md h-full flex flex-col">
                <div className="relative h-64 w-full bg-gray-100 flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                    <span className="text-gray-500 font-medium">Coming Soon</span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{project.name}</h2>
                  <p className="text-gray-600 mb-4 flex-grow">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
} 