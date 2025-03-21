import Image from 'next/image';
import Link from 'next/link';

type Project = {
  id: string;
  title: string;
  category: string;
  location: string;
  description: string;
  imageSrc: string;
};

// Sample project data - in a real app, this would likely come from a database or CMS
const projects: Project[] = [
  {
    id: 'kitchen-remodel',
    title: 'Modern Kitchen Renovation',
    category: 'Kitchen',
    location: 'San Francisco, CA',
    description: 'Complete kitchen overhaul with custom cabinetry and high-end appliances.',
    imageSrc: '/images/projects/kitchen-1.jpg',
  },
  {
    id: 'bathroom-renovation',
    title: 'Luxury Bathroom Remodel',
    category: 'Bathroom',
    location: 'Palo Alto, CA',
    description: 'Spa-like bathroom with walk-in shower and heated flooring.',
    imageSrc: '/images/projects/bathroom-1.jpg',
  },
  {
    id: 'full-home-renovation',
    title: 'Complete Home Renovation',
    category: 'Full Home',
    location: 'Oakland, CA',
    description: 'Comprehensive renovation of a 1920s craftsman home.',
    imageSrc: '/images/projects/full-home-1.jpg',
  },
  {
    id: 'home-addition',
    title: 'Second Story Addition',
    category: 'Addition',
    location: 'Berkeley, CA',
    description: 'Adding a second story with three bedrooms and two bathrooms.',
    imageSrc: '/images/projects/addition-1.jpg',
  },
  {
    id: 'adu-construction',
    title: 'Backyard ADU Construction',
    category: 'ADU',
    location: 'San Jose, CA',
    description: 'Custom-designed accessory dwelling unit for multi-generational living.',
    imageSrc: '/images/projects/adu-1.jpg',
  },
  {
    id: 'interior-redesign',
    title: 'Interior Redesign',
    category: 'Interior',
    location: 'Marin County, CA',
    description: 'Modern interior redesign with open floor plan and custom millwork.',
    imageSrc: '/images/projects/interior-1.jpg',
  },
  {
    id: 'new-construction',
    title: 'New Home Construction',
    category: 'New Build',
    location: 'Sonoma, CA',
    description: 'Custom-built home with sustainable features and smart home technology.',
    imageSrc: '/images/projects/new-home-1.jpg',
  },
  {
    id: 'house-renovation',
    title: 'Mid-Century Modern Renovation',
    category: 'Full Home',
    location: 'Walnut Creek, CA',
    description: 'Restoration and modernization of a mid-century home.',
    imageSrc: '/images/projects/house-1.jpg',
  },
];

// Filter categories for the filter bar
// const categories = Array.from(new Set(['All', ...projects.map(project => project.category)]));

export default function GalleryPage() {
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
                Our detailed project gallery is coming soon! Check back for complete project showcases.
              </p>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -bottom-8 left-1/4 w-24 h-24 bg-primary rounded-full opacity-10 blur-md animate-float"></div>
        <div className="absolute top-12 right-1/4 w-32 h-32 bg-secondary rounded-full opacity-10 blur-md animate-float-delay"></div>
      </section>

      {/* Main Gallery Section */}
      <section className="py-12 md:py-16">
        <div className="container-custom">
          {/* Gallery grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
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
                  <p className="text-gray mb-4">{project.description}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-xs italic text-gray-500">Detailed showcase coming soon</span>
                    <button 
                      disabled
                      className="btn text-sm bg-gray-300 text-gray-600 cursor-not-allowed"
                    >
                      View Project
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
