import { ProjectDetails, ProjectMap, GalleryImage } from '../types';

// Map of project slugs to their display information
export const projectInfo: ProjectMap = {
  'Alamo': {
    title: 'Alamo Home Renovation',
    location: 'Alamo, CA',
    category: 'Full Home',
    description: 'This comprehensive home renovation in Alamo, California transformed an outdated residence into a modern, luxurious home. The project included extensive interior and exterior renovations, with a focus on creating open-concept living spaces, upgrading all fixtures and finishes, and enhancing the overall functionality and aesthetic appeal of the home.'
  },
  'Oakland': {
    title: 'Oakland Kitchen Remodel',
    location: 'Oakland, CA',
    category: 'Kitchen',
    description: 'This kitchen renovation project in Oakland\'s Rockridge neighborhood transformed an outdated cooking space into a modern culinary haven. The homeowners, avid cooks who love to entertain, wanted a kitchen that was not only beautiful but highly functional.'
  },
  'Tice': {
    title: 'Tice Valley Bathroom Suite',
    location: 'Walnut Creek, CA',
    category: 'Bathroom',
    description: 'This bathroom renovation in Walnut Creek\'s Tice Valley neighborhood transformed dated, cramped bathrooms into spa-like retreats. The project included a complete overhaul of the primary ensuite bathroom and a guest bathroom, with a focus on creating luxurious, functional spaces.'
  },
  'Berkeley': {
    title: 'Berkeley Craftsman Restoration',
    location: 'Berkeley, CA',
    category: 'Full Home',
    description: 'This historic craftsman home in Berkeley was carefully restored and modernized while preserving its original architectural details. The renovation balanced modern functionality with period-appropriate design elements.'
  },
  'CastroValley': {
    title: 'Castro Valley Kitchen & Bath',
    location: 'Castro Valley, CA',
    category: 'Kitchen & Bath',
    description: 'This Castro Valley project involved a complete renovation of the kitchen and primary bathroom, creating coordinated modern spaces that maximize functionality and style in a mid-century ranch home.'
  },
  'Danville': {
    title: 'Danville Outdoor Living',
    location: 'Danville, CA',
    category: 'Outdoor',
    description: 'This extensive outdoor living project in Danville created a resort-like backyard retreat with an outdoor kitchen, custom pool, landscaping, and entertainment areas for year-round enjoyment.'
  },
  'Fremont': {
    title: 'Fremont Contemporary Update',
    location: 'Fremont, CA',
    category: 'Full Home',
    description: 'This Fremont home was transformed with a comprehensive renovation that brought contemporary style and functionality to every space, featuring an open floor plan and high-end finishes throughout.'
  },
  'Lafayette': {
    title: 'Lafayette Kitchen Expansion',
    location: 'Lafayette, CA',
    category: 'Kitchen',
    description: 'This Lafayette kitchen renovation expanded the existing space and created an open-concept entertainment area perfect for hosting, with premium appliances and custom cabinetry.'
  },
  'Moraga': {
    title: 'Moraga Master Suite',
    location: 'Moraga, CA',
    category: 'Bedroom & Bath',
    description: 'This Moraga project created a luxurious master suite retreat, with a spacious bedroom and spa-like bathroom featuring custom tilework, a freestanding tub, and premium fixtures.'
  },
  'Orinda': {
    title: 'Orinda Indoor-Outdoor Renovation',
    location: 'Orinda, CA',
    category: 'Indoor-Outdoor',
    description: 'This Orinda home was renovated to enhance indoor-outdoor living, with expanded windows, sliding glass doors, and a redesigned patio that creates a seamless transition between interior and exterior spaces.'
  },
  'RedwoodCity': {
    title: 'Redwood City Modern Makeover',
    location: 'Redwood City, CA',
    category: 'Full Home',
    description: 'This comprehensive renovation in Redwood City transformed a traditional home into a modern living space with clean lines, open spaces, and contemporary finishes throughout.'
  },
  'SF': {
    title: 'San Francisco Victorian Update',
    location: 'San Francisco, CA',
    category: 'Historic',
    description: 'This San Francisco Victorian was carefully updated to preserve its historic charm while integrating modern amenities and functionality for contemporary living.'
  },
  'SJ': {
    title: 'San Jose ADU Addition',
    location: 'San Jose, CA',
    category: 'ADU',
    description: 'This San Jose project added a stylish and functional Accessory Dwelling Unit that provides versatile living space while complementing the architecture of the main residence.'
  },
  'Saratoga': {
    title: 'Saratoga Luxury Renovation',
    location: 'Saratoga, CA',
    category: 'Luxury',
    description: 'This luxury renovation in Saratoga elevated every aspect of the home with premium materials, custom details, and sophisticated design elements throughout.'
  },
  'WC': {
    title: 'Walnut Creek Entertainment Space',
    location: 'Walnut Creek, CA',
    category: 'Entertainment',
    description: 'This Walnut Creek project created the ultimate entertainment space, with an open-concept great room, home theater, and bar area designed for hosting family and friends.'
  }
};

// Get the normalized directory name from the project directory
export function getProjectNameFromDir(dirName: string): string {
  return dirName.replace('Project-', '');
}

// Get the slug from the project name
export function getSlugFromProjectName(projectName: string): string {
  return projectName.toLowerCase();
}

// Generate completion date (for mock data)
export function generateCompletionDate(projectName: string): string {
  // Generate a random recent date for mock purposes
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const years = [2022, 2023, 2024];
  
  // Use the project name as a seed for "random" but consistent date
  const nameSum = projectName.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const month = months[nameSum % 12];
  const year = years[nameSum % 3];
  
  return `${month} ${year}`;
}

// Generate project duration (for mock data)
export function generateProjectDuration(projectName: string): string {
  // Generate a random duration for mock purposes
  const durations = ['2 weeks', '4 weeks', '6 weeks', '2 months', '3 months', '4 months', '6 months', '8 months'];
  
  // Use the project name as a seed for "random" but consistent duration
  const nameSum = projectName.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return durations[nameSum % durations.length];
}

// Generate project services based on category (for mock data)
export function generateServices(category: string): string[] {
  const baseServices = ['Demolition', 'Design Consultation', 'Permit Acquisition'];
  
  const categoryServices: { [key: string]: string[] } = {
    'Kitchen': ['Kitchen Design', 'Custom Cabinetry', 'Countertop Installation', 'Appliance Installation', 'Lighting Design', 'Tile Installation'],
    'Bathroom': ['Bathroom Design', 'Custom Tilework', 'Shower Installation', 'Vanity Installation', 'Fixture Selection', 'Glass Shower Enclosures'],
    'Full Home': ['Interior Design', 'Structural Renovation', 'Electrical Updates', 'Plumbing Upgrades', 'Flooring Installation', 'Painting', 'Fixture Installation'],
    'Outdoor': ['Landscape Design', 'Hardscape Installation', 'Outdoor Kitchen', 'Deck/Patio Construction', 'Irrigation Systems', 'Lighting Installation'],
    'ADU': ['ADU Design', 'Foundation Work', 'Framing', 'Roofing', 'Interior Finishing', 'Kitchenette Installation'],
    'Historic': ['Historic Preservation', 'Period-Appropriate Restoration', 'Custom Millwork', 'Facade Renovation', 'Interior Modernization']
  };
  
  // Get services for the specific category or use Full Home as default
  const specificServices = categoryServices[category] || categoryServices['Full Home'];
  
  // Combine base services with category-specific services
  return [...baseServices, ...specificServices].slice(0, 8); // Limit to 8 services
}

// Generate project scope based on category (for mock data)
export function generateScope(category: string, location: string): string {
  const scopeTemplates: { [key: string]: string[] } = {
    'Kitchen': [
      'Complete renovation of a {size} sq ft kitchen in a {style} home',
      'Full kitchen remodel with new layout, cabinetry, and appliances in {location}'
    ],
    'Bathroom': [
      'Complete renovation of primary bathroom ({size} sq ft) and guest bathroom',
      'Full bathroom remodel with custom tilework and fixtures in {location}'
    ],
    'Full Home': [
      'Complete interior and exterior renovation of a {size} sq ft single-family home',
      'Comprehensive renovation of a {style} home in {location}, including all living spaces'
    ],
    'Outdoor': [
      'Creation of a {size} sq ft outdoor living space with kitchen and entertainment areas',
      'Complete backyard transformation with landscaping, hardscaping, and water features'
    ],
    'ADU': [
      'Construction of a {size} sq ft detached accessory dwelling unit',
      'Conversion of existing garage into a fully-functional living space with separate entrance'
    ]
  };
  
  // Get templates for the specific category or use Full Home as default
  const templates = scopeTemplates[category] || scopeTemplates['Full Home'];
  
  // Choose a template based on location (for consistent but "random" selection)
  const locationSum = location.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const template = templates[locationSum % templates.length];
  
  // Generate size values
  const sizes = {
    'Kitchen': ['250', '300', '350', '400'],
    'Bathroom': ['80', '100', '120', '150'],
    'Full Home': ['1,800', '2,200', '2,500', '3,500'],
    'Outdoor': ['500', '750', '1,000', '1,500'],
    'ADU': ['400', '550', '650', '800']
  };
  
  const sizeOptions = sizes[category as keyof typeof sizes] || sizes['Full Home'];
  const size = sizeOptions[locationSum % sizeOptions.length];
  
  // Generate style values
  const styles = ['Craftsman', 'Modern', 'Traditional', 'Mid-century', 'Victorian', 'Ranch', 'Contemporary'];
  const style = styles[locationSum % styles.length];
  
  // Replace placeholders
  return template
    .replace('{size}', size)
    .replace('{style}', style)
    .replace('{location}', location);
}

// Generate challenges and solutions (for mock data)
export function generateChallengesSolutions(category: string): { challenges: string; solutions: string } {
  const challengesTemplates: { [key: string]: string[] } = {
    'Kitchen': [
      'The original kitchen had an awkward layout with limited counter space and outdated systems. Additionally, the homeowners wanted to incorporate a kitchen island despite space constraints.',
      'The existing kitchen lacked sufficient natural light and storage space, and the layout didn\'t allow for easy movement or social interaction during cooking and entertaining.'
    ],
    'Bathroom': [
      'The primary challenge was working within the existing footprint to create more spacious-feeling bathrooms. The original bathrooms featured outdated fixtures, inefficient layouts, and inadequate lighting.',
      'The bathroom had significant water damage and plumbing issues that needed to be addressed, along with creating a more accessible space that would accommodate aging-in-place needs.'
    ],
    'Full Home': [
      'The project presented several challenges, including working with an older home that required significant structural updates to support the new open-concept design. Additionally, we needed to carefully integrate modern systems and features while preserving certain character elements of the original home.',
      'This project required extensive coordination of multiple trades while the homeowners remained living in the home. Additionally, supply chain delays presented scheduling challenges that needed to be carefully managed.'
    ],
    'Outdoor': [
      'The sloped lot presented drainage challenges, and existing mature trees needed to be preserved while creating new landscape features. Additionally, the project required careful integration with the existing architecture.',
      'The property had limited access for construction equipment, and the design needed to account for extreme seasonal weather conditions while creating a year-round usable space.'
    ]
  };
  
  const solutionsTemplates: { [key: string]: string[] } = {
    'Kitchen': [
      'We reconfigured the layout to maximize efficiency, designing custom cabinetry that extended to the ceiling to increase storage. A carefully scaled island was incorporated to provide additional workspace without impeding traffic flow.',
      'We removed a non-load-bearing wall to open the kitchen to adjacent living spaces and installed larger windows to increase natural light. Custom storage solutions were designed to maximize every inch of available space.'
    ],
    'Bathroom': [
      'We utilized a monochromatic color scheme and large-format tiles to create a sense of spaciousness. Wall-mounted vanities and a frameless glass shower enclosure contributed to the airy feel, while recessed lighting and LED mirrors addressed the lighting issues.',
      'We completely gutted the space to address water damage, updating all plumbing systems and incorporating universal design elements like a curbless shower, comfort-height fixtures, and strategic grab bars that blend seamlessly with the design.'
    ],
    'Full Home': [
      'Our team collaborated with structural engineers to develop innovative solutions for the renovation, including the installation of steel beams to support the open-concept layout. We also created custom millwork that complemented the home\'s original character while offering modern functionality.',
      'We developed a phased approach that allowed the homeowners to remain in portions of the home throughout the renovation, carefully coordinating trade schedules to minimize disruption. Additionally, we pre-ordered key materials early in the process to avoid supply chain delays.'
    ],
    'Outdoor': [
      'We designed a comprehensive drainage system with permeable hardscaping and strategic grading to address water flow. The landscape design worked around existing trees, incorporating them as focal points in the new outdoor living areas.',
      'We developed creative access solutions for equipment and materials, and designed an outdoor living space with a combination of covered and open areas to provide enjoyment regardless of weather conditions.'
    ]
  };
  
  // Select appropriate templates based on category
  const selectedChallengeTemplates = challengesTemplates[category] || challengesTemplates['Full Home'];
  const selectedSolutionTemplates = solutionsTemplates[category] || solutionsTemplates['Full Home'];
  
  // Use the category name to seed "random" selection for consistent but varied text
  const categorySum = category.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const challengeIndex = categorySum % selectedChallengeTemplates.length;
  const solutionIndex = categorySum % selectedSolutionTemplates.length;
  
  return {
    challenges: selectedChallengeTemplates[challengeIndex],
    solutions: selectedSolutionTemplates[solutionIndex]
  };
}

// Generate complete project details
export function generateProjectDetails(projectName: string): ProjectDetails | null {
  // Get the project info
  const info = projectInfo[projectName];
  if (!info) return null;
  
  // Get the images - this will be implemented in the imageService
  const images: GalleryImage[] = [];
  
  // Get the featured image
  const imageDir = `/images/gallery/Project-${projectName}`;
  
  // Generate project details
  const completionDate = generateCompletionDate(projectName);
  const duration = generateProjectDuration(projectName);
  const services = generateServices(info.category);
  const scope = generateScope(info.category, info.location);
  const { challenges, solutions } = generateChallengesSolutions(info.category);
  
  return {
    title: info.title,
    location: info.location,
    description: info.description,
    featuredImage: `${imageDir}/${projectName.toLowerCase()}-1.jpg`,
    category: info.category,
    completionDate,
    details: {
      services,
      scope,
      challenges,
      solutions,
      duration,
    },
    images,
  };
} 