import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { galleryProjects } from '@/lib/gallery-data';

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
  return (
    <main className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Renovation Projects</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Explore our portfolio of home renovation projects across the Bay Area. Each project showcases our commitment to quality, craftsmanship, and customer satisfaction.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {galleryProjects.map((project) => (
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
    </main>
  );
} 