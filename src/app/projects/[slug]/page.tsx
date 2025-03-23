import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Metadata } from 'next';

// Temporary placeholder data until Vercel integration is implemented
const getProjectBySlug = async (slug: string) => {
  // This would be replaced with actual data fetching logic in the future
  const projects = {
    'sample-project': {
      title: 'Sample Project',
      excerpt: 'This is a sample project placeholder until Vercel integration is implemented.',
      content: '<p>This is placeholder content for the project details. This will be replaced with actual content from the new backend once implemented.</p>',
      seo: {
        title: 'Sample Project | Renovation Bridge',
        metaDesc: 'This is a sample project placeholder until Vercel integration is implemented.',
        opengraphTitle: 'Sample Project | Renovation Bridge',
        opengraphDescription: 'This is a sample project placeholder until Vercel integration is implemented.',
      },
      featuredImage: null,
      projectDetails: {
        projectStatus: 'Placeholder',
        projectTimeline: 'N/A',
        budgetRange: 'N/A',
        squareFootage: 'N/A',
        servicesProvided: ['Placeholder Service']
      }
    }
  };
  
  return projects[slug as keyof typeof projects] || null;
};

// Placeholder function for image optimization
const getPlaceholderImage = () => {
  return {
    src: '/images/placeholder.jpg',
    alt: 'Placeholder Image',
    width: 1200,
    height: 800,
    placeholder: 'blur' as const,
    blurDataURL: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z/C/HgAGgwJ/lK3Q6wAAAABJRU5ErkJggg=='
  };
};

// Dynamically generate metadata for SEO
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
      };
    }

    return {
      title: project.seo?.title || project.title + ' | Renovation Bridge',
      description: project.seo?.metaDesc || project.excerpt,
      openGraph: {
        title: project.seo?.opengraphTitle || project.title,
        description: project.seo?.opengraphDescription || project.excerpt,
        images: [],
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Project | Renovation Bridge',
      description: 'Explore our renovation projects',
    };
  }
}

export default async function ProjectPage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  // Fetch project data (placeholder for now)
  let project;
  try {
    project = await getProjectBySlug(params.slug);
  } catch (error) {
    console.error('Error fetching project:', error);
  }

  // Return 404 if project not found
  if (!project) {
    notFound();
  }

  // Use placeholder image
  const optimizedImage = getPlaceholderImage();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <article className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Featured Image */}
        <div className="relative w-full h-[40vh] sm:h-[50vh]">
          <Image
            src={optimizedImage.src}
            alt={optimizedImage.alt || project.title}
            placeholder={optimizedImage.placeholder}
            blurDataURL={optimizedImage.blurDataURL}
            fill
            sizes="(max-width: 768px) 100vw, 80vw"
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>

        {/* Project Content */}
        <div className="p-6 sm:p-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#002c66] mb-4">
            {project.title}
          </h1>

          {/* Project Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8 bg-[#f2f0e9] p-6 rounded-lg">
            {project.projectDetails?.projectStatus && (
              <div>
                <h3 className="text-sm font-medium text-gray-500">Project Status</h3>
                <p className="text-lg font-semibold text-[#313bc0]">
                  {project.projectDetails.projectStatus}
                </p>
              </div>
            )}
            
            {project.projectDetails?.projectTimeline && (
              <div>
                <h3 className="text-sm font-medium text-gray-500">Timeline</h3>
                <p className="text-lg font-semibold text-[#313bc0]">
                  {project.projectDetails.projectTimeline}
                </p>
              </div>
            )}
            
            {project.projectDetails?.budgetRange && (
              <div>
                <h3 className="text-sm font-medium text-gray-500">Budget Range</h3>
                <p className="text-lg font-semibold text-[#313bc0]">
                  {project.projectDetails.budgetRange}
                </p>
              </div>
            )}
            
            {project.projectDetails?.squareFootage && (
              <div>
                <h3 className="text-sm font-medium text-gray-500">Square Footage</h3>
                <p className="text-lg font-semibold text-[#313bc0]">
                  {project.projectDetails.squareFootage} sq ft
                </p>
              </div>
            )}
            
            {project.projectDetails?.servicesProvided && project.projectDetails.servicesProvided.length > 0 && (
              <div className="md:col-span-2">
                <h3 className="text-sm font-medium text-gray-500">Services Provided</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.projectDetails.servicesProvided.map((service, index) => (
                    <span 
                      key={index} 
                      className="bg-[#e5e4f0] text-[#313bc0] px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Main Content */}
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: project.content }}
          />
        </div>
      </article>
    </main>
  );
} 