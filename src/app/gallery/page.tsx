'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useGalleryProjects } from '@/features/gallery';

export default function GalleryPage() {
  const { 
    filteredProjects, 
    categories, 
    selectedCategory, 
    setSelectedCategory 
  } = useGalleryProjects();
  
  return (
    <div className="bg-cream">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-lavender to-cream">
        <div className="container-custom relative">
          <Link href="/" className="absolute left-0 top-0 inline-flex items-center text-blue-600 hover:text-blue-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back
          </Link>
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="mb-4 text-secondary">Our Project Gallery</h1>
            <p className="text-lg md:text-xl mb-8 text-gray">
              Explore our portfolio of successful renovation projects across the Bay Area.
              Each project represents our commitment to quality craftsmanship and customer satisfaction.
            </p>
            <div className="bg-primary bg-opacity-10 rounded-lg p-4 mb-8 inline-block">
              <p className="font-medium text-primary">
                Browse our featured projects below to discover our work and get inspired for your next renovation.
              </p>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -bottom-8 left-1/4 w-24 h-24 bg-primary rounded-full opacity-10 blur-md animate-float"></div>
        <div className="absolute top-12 right-1/4 w-32 h-32 bg-secondary rounded-full opacity-10 blur-md animate-float-delay"></div>
      </section>

      {/* Filter Bar */}
      <section className="py-8 border-b border-gray/10">
        <div className="container-custom">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  category === selectedCategory
                    ? 'bg-primary text-white'
                    : 'bg-lavender text-secondary hover:bg-primary hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Gallery Section */}
      <section className="py-12 md:py-16">
        <div className="container-custom">
          {/* Category Title */}
          {selectedCategory !== 'All' && (
            <div className="mb-10 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-secondary">{selectedCategory} Projects</h2>
              <p className="text-gray mt-2">
                Showing {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'} in the {selectedCategory} category
              </p>
            </div>
          )}
          
          {/* Gallery grid */}
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <div 
                  key={project.id} 
                  className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={project.imageSrc}
                      alt={project.title}
                      fill
                      className="object-cover transition-all duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300"></div>
                    <div className="absolute top-4 right-4 bg-primary text-white text-sm font-medium py-1 px-3 rounded-full">
                      {project.category}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-secondary">{project.title}</h3>
                    <p className="text-sm text-gray mb-3">{project.location}</p>
                    <p className="text-gray mb-4 line-clamp-2">{project.description}</p>
                    <div className="mt-4 flex justify-between items-center">
                      {project.available ? (
                        <span className="text-xs italic text-green-500">Project showcase available</span>
                      ) : (
                        <span className="text-xs italic text-gray-500">Detailed showcase coming soon</span>
                      )}
                      
                      {project.available && project.slug ? (
                        <Link 
                          href={`/gallery/${project.slug}`}
                          className="btn btn-primary text-sm"
                        >
                          View Project
                        </Link>
                      ) : (
                        <button 
                          disabled
                          className="btn text-sm bg-gray-300 text-gray-600 cursor-not-allowed"
                        >
                          View Project
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-bold text-secondary mb-2">No projects found</h3>
              <p className="text-gray">
                We couldn't find any projects in the {selectedCategory} category. Please try another category.
              </p>
              <button
                onClick={() => setSelectedCategory('All')}
                className="mt-4 btn btn-primary"
              >
                View All Projects
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
