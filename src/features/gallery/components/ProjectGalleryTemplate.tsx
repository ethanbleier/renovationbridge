import Link from 'next/link';
import Image from 'next/image';
import ImageGallery from './ImageGallery';
import { ProjectDetails } from '../types';

interface ProjectGalleryTemplateProps {
  project: ProjectDetails;
}

export default function ProjectGalleryTemplate({ project }: ProjectGalleryTemplateProps) {
  return (
    <div className="bg-cream min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[50vh] md:h-[60vh]">
        <Image
          src={project.featuredImage}
          alt={`${project.title} - Featured Image`}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 container-custom">
          <Link href="/gallery" className="inline-flex items-center text-white mb-4 hover:underline">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Gallery
          </Link>
          <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-2">{project.title}</h1>
          <div className="flex items-center text-white/90 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span>{project.location}</span>
          </div>
          <div className="bg-primary px-4 py-1 text-white inline-block rounded-full text-sm font-medium mb-2">
            {project.category}
          </div>
        </div>
      </div>

      {/* Project Content */}
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Project Description */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-secondary">Project Overview</h2>
            <p className="text-gray mb-8">{project.description}</p>
            
            {project.details.challenges && (
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-3 text-secondary">Challenges</h3>
                <p className="text-gray">{project.details.challenges}</p>
              </div>
            )}
            
            {project.details.solutions && (
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-3 text-secondary">Solutions</h3>
                <p className="text-gray">{project.details.solutions}</p>
              </div>
            )}
          </div>

          {/* Project Details Sidebar */}
          <div className="bg-lavender rounded-lg p-6 h-fit">
            <h3 className="text-xl font-bold mb-4 text-secondary">Project Details</h3>
            
            <div className="mb-4">
              <h4 className="font-medium text-gray">Completion Date</h4>
              <p className="text-secondary font-semibold">{project.completionDate}</p>
            </div>
            
            <div className="mb-4">
              <h4 className="font-medium text-gray">Project Duration</h4>
              <p className="text-secondary font-semibold">{project.details.duration}</p>
            </div>
            
            <div className="mb-4">
              <h4 className="font-medium text-gray">Project Scope</h4>
              <p className="text-secondary">{project.details.scope}</p>
            </div>
            
            <div>
              <h4 className="font-medium text-gray mb-2">Services Provided</h4>
              <div className="flex flex-wrap gap-2">
                {project.details.services.map((service, index) => (
                  <span 
                    key={index} 
                    className="bg-white text-primary px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <ImageGallery 
          images={project.images} 
          title="Project Gallery" 
        />

        {/* Call to Action */}
        <div className="mt-16 text-center p-8 bg-lavender rounded-lg">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-secondary">Ready to Start Your Project?</h2>
          <p className="text-gray max-w-2xl mx-auto mb-8">
            Contact us today to discuss your renovation needs and discover how we can transform your space.
          </p>
          <Link 
            href="/get-started" 
            className="btn btn-primary inline-block"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
} 