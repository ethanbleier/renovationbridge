# 🏠 Renovation Bridge

> **Connecting homeowners with quality contractors for seamless renovation experiences**

<div align="center">
  <img src="screenshot.png" alt="Renovation Bridge Homepage" width="100%" />
  <p><em>Modern, responsive homepage designed to convert visitors into leads</em></p>
  
  <div style="display: flex; gap: 20px; justify-content: center; margin-top: 20px;">
    <img src="screenshot-2.png" alt="Project Gallery" width="48%" />
    <img src="screenshot-3.png" alt="Contractor Dashboard" width="48%" />
  </div>
  <p><em>Project showcase and contractor management interface</em></p>
</div>

## 🎨 Design System

Our carefully crafted color palette ensures a professional and trustworthy appearance:

- **Primary Blue** `#313bc0` - Trust and professionalism
- **Secondary Dark Blue** `#002c66` - Depth and stability
- **Gray** `#717171` - Balance and readability
- **Black** `#000000` - Contrast and emphasis
- **Cream** `#f2f0e9` - Warmth and approachability
- **Lavender** `#e5e4f0` - Softness and sophistication

## 🚀 Tech Stack

- **Framework:** Next.js 14.2+
- **UI Library:** React 18
- **Styling:** Tailwind CSS 3.4+
- **Animations:** Framer Motion 12.5+
- **Forms:** React Hook Form 7.50+
- **Icons:** React Icons 5.0+
- **Authentication:** JWT, bcrypt.js
- **Data Storage:** In-memory data storage with UUID
- **Image Processing:** Sharp 0.33+
- **SEO:** next-sitemap, JSON-LD structured data
- **HTML Parsing:** jsdom
- **Testing:** Jest, React Testing Library, Playwright for E2E
- **Deployment:** Vercel
- **GraphQL Client:** GraphQL Request

## 📸 Gallery Feature (Updated April 2025)

The project gallery showcases completed renovation projects with the following features:

- **Organized Project Structure**: Each project has its own folder (e.g., `Project-CastroValley`) containing sequential images
- **Filename Format**: Images follow the naming pattern `[LocationName]-[Number].jpg` (e.g., `CastroValley-1.jpg`)
- **Responsive Gallery Component**: The `ImageGallery` component displays project images with customizable settings
- **Lightbox Integration**: Full-screen image viewing capabilities with navigation controls

### Recent Gallery Updates

- Fixed image path construction to correctly reference image filenames without spaces
- Created a comprehensive feature directory structure in `src/features/gallery/`
- Updated Redwood City project to include 6 images previously missing from the data
- Improved start.sh script to gracefully handle missing files

### Gallery Component Usage

```tsx
import { ImageGallery } from '@/features/gallery/components/ImageGallery';
import { galleryDataService } from '@/features/gallery/services/galleryDataService';

// Get a project by slug
const project = galleryDataService.getProjectBySlug('castro-valley');

// Render the gallery
<ImageGallery 
  project={project}
  settings={{
    thumbnailSize: 'medium',
    showCaptions: true,
    lightboxEnabled: true
  }}
/>
```

## 📁 Project Structure

```
renovationbridge/
├── public/                 # Static assets
│   ├── robots.txt        # Search engine crawling rules
│   └── sitemap.xml       # Auto-generated sitemap
├── src/
│   ├── app/               # Next.js App Router pages
│   │   ├── api/          # API routes including revalidation
│   │   ├── blog/         # Blog posts and articles
│   │   ├── contractors/  # Contractor-specific pages
│   │   └── resources/    # Resource and guide pages
│   ├── components/       # Reusable UI components
│   │   ├── forms/       # Form components
│   │   ├── layout/      # Layout components
│   │   ├── sections/    # Page sections
│   │   ├── seo/         # SEO components (JsonLd, PageSeo)
│   │   └── ui/          # UI elements
│   ├── lib/             # Core functionality
│   │   ├── db/         # Database connections
│   │   ├── models/     # Data models
│   │   ├── structured-data.ts  # JSON-LD schema generators
│   │   ├── seo-utils.ts        # SEO utility functions
│   │   └── utils/      # Utility functions
│   ├── styles/         # Global styles
│   └── utils/          # Helper functions
├── scripts/            # Deployment and utility scripts
├── secrets/            # Environment secrets
├── .github/           # GitHub Actions workflows
├── next-sitemap.config.js  # Sitemap configuration
└── config files       # Various configuration files
```

## 🛠️ Getting Started

1. **Prerequisites**
   - Node.js 20.0.0 or higher
   - npm 10.0.0 or higher (comes with Node.js 20)

2. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/renovationbridge.git
   cd renovationbridge
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Configure environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration settings
   # Note: MONGODB_URI is no longer required as we use in-memory storage
   ```

5. **Start development server**
   ```bash
   npm run dev
   # or
   ./start.sh
   ```

6. **Open [http://localhost:3000](http://localhost:3000)**

## 🧪 Local Testing

Renovation Bridge includes a comprehensive suite of testing tools to ensure code quality and functionality.

### Using the Testing Script

A convenient testing script is provided to run various testing operations:

```bash
# Make the script executable (first time only)
chmod +x scripts/testing.sh

# Run the testing script
./scripts/testing.sh
```

The script provides the following options:
1. Start development server
2. Run linting
3. Run unit tests
4. Run end-to-end tests
5. Run all tests

### Manual Testing Commands

You can also run these commands directly:

```bash
# Lint the codebase
npm run lint

# Run unit tests
npm test

# Run unit tests with watch mode
npm test -- --watch

# Run end-to-end tests
npm run test:e2e

# Check TypeScript types
npm run type-check
```

### Testing Strategies

- **Unit Tests**: Located in `__tests__` directories alongside the components they test
- **Integration Tests**: Found in the `tests/integration` directory
- **End-to-End Tests**: Uses Cypress located in the `cypress` directory

## 🌟 Key Features

- **Smart Lead Generation** - Optimized contact forms and CTAs
- **In-Memory Data Storage** - No database setup
- **Project Showcase** - Beautiful gallery of completed renovations including:
  - Interactive image galleries with lightbox functionality
  - Detailed project information and specifications
  - Organized by project type (kitchen, bathroom, full home)
  - Responsive design for optimal viewing on all devices
- **Resource Library** - Valuable guides and articles
- **Mobile-First Design** - Perfect experience on all devices
- **Advanced SEO** - Complete with:
  - Automatic sitemap generation
  - Robots.txt configuration
  - JSON-LD structured data (Organization, LocalBusiness, Services)
  - Comprehensive OpenGraph and Twitter card metadata
  - Canonical URLs
  - Dynamic meta descriptions
- **Incremental Static Regeneration** - Fast page loads with dynamic content

## 🚀 Deployment

### Vercel Deployment

Renovation Bridge is configured for seamless deployment on Vercel's platform.

1. **Prerequisites**
   - A [Vercel account](https://vercel.com/signup)
   - Vercel CLI (optional, for command-line deployment)
     ```bash
     npm install -g vercel
     ```

2. **Connect Repository to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New" > "Project"
   - Select your GitHub repository
   - Configure the project:
     - Framework Preset: Next.js
     - Root Directory: ./
     - Build Command: `npm run build`
     - Output Directory: .next

3. **Set Environment Variables**
   - In Vercel dashboard, navigate to your project
   - Go to Settings > Environment Variables
   - Add all required environment variables from `.env.production.local`
   - Key variables to include:
     ```
     JWT_SECRET
     REVALIDATION_SECRET
     API_URL
     API_TOKEN
     ```

4. **Deploy Using the Script**
   ```bash
   # Run the deployment script
   ./scripts/test-deploy.sh
   # Select option 3 for production deployment
   ```

5. **Manual Deployment Using Vercel CLI**
   ```bash
   # Login to Vercel
   vercel login
   
   # Deploy to development environment
   vercel
   
   # Deploy to production
   vercel --prod
   ```

6. **Automatic Deployments**
   - Every push to the `main` branch will trigger an automatic deployment
   - Preview deployments are created for pull requests
   - Configure branch deployments in the Vercel dashboard under Settings > Git

7. **Revalidation API**
   - Content revalidation is configured at `/api/revalidate`
   - Use this endpoint with the appropriate secret token to refresh content
   - Example:
     ```bash
     curl -X POST https://your-domain.vercel.app/api/revalidate \
       -H "Authorization: Bearer YOUR_REVALIDATION_SECRET" \
       -H "Content-Type: application/json" \
       -d '{"contentType":"post","slug":"example-post"}'
     ```

8. **Monitoring**
   - Monitor your deployment through the Vercel dashboard
   - View logs, analytics, and performance metrics
   - Set up status alerts for your production deployment

## 🔄 Recent Updates

### Google Ads Conversion Tracking Implementation (April 2025)

Added Google Ads conversion tracking to enable accurate ROI measurement for advertising campaigns:

- **What Changed**: 
  - Integrated Google Ads tag (gtag.js) with the measurement ID AW-16912546121
  - Added conversion tracking on the thank-you page with the "signup" conversion label
  - Added form submission tracking in the GetStartedForm with the "form_submission" conversion label
  - Created a reusable GoogleAdsTracker component for conversion tracking
  - Added environment variables for Google Ads configuration
- **Files Modified**:
  - `src/app/layout.tsx` - Added Google Ads tag configuration alongside Google Analytics
  - `src/components/analytics/GoogleAdsTracker.tsx` - Created new component for Google Ads conversion tracking
  - `src/app/thank-you/page.tsx` - Added Google Ads conversion tracking to the form submission success page
  - `src/components/forms/GetStartedForm.tsx` - Added Google Ads conversion tracking to the lead generation form
  - `.env` and `.env.example` - Added `GOOGLE_ADS_ID` and `NEXT_PUBLIC_GOOGLE_ADS_ID` environment variables
- **Implementation Details**:
  - Uses Google Ads ID (AW-16912546121) with support for multiple conversion labels
  - Server-side configuration available via `GOOGLE_ADS_ID` environment variable
  - Client-side configuration available via `NEXT_PUBLIC_GOOGLE_ADS_ID` environment variable
  - Supports two conversion types: "signup" (page load) and "form_submission" (form submit)
  - Supports conversion value tracking for ROI calculation
  - Works alongside existing Google Analytics implementation
  - Zero impact on initial page load performance (uses same async gtag.js script)
  - Follows best practices for conversion tracking implementation

**Benefits**: This integration enables accurate tracking of advertising performance and ROI in Google Ads, allowing for better campaign optimization and budget allocation. The conversion tracking helps identify which ads and keywords are driving valuable leads, improving overall marketing effectiveness.

### Google Analytics Implementation (April 2025)

Implemented Google Analytics 4 tracking with Google tag:

- **What Changed**: 
  - Integrated Google Analytics 4 using the official Google tag implementation
  - Updated the measurement ID to G-XQ8QS58PK0
  - Configured to track pageviews and user interactions
  - Added environment variables for Google Analytics configuration
- **Files Modified**:
  - `src/app/layout.tsx` - Updated Google tag script in the head section to use the environment variable
  - `src/components/analytics/ConversionTracker.tsx` - Updated to use the environment variable for conversion tracking
  - `.env` and `.env.example` - Added `GA_MEASUREMENT_ID` and `NEXT_PUBLIC_GA_MEASUREMENT_ID` environment variables
- **Implementation Details**:
  - Uses Google Analytics 4 (GA4) measurement ID format
  - Server-side configuration available via `GA_MEASUREMENT_ID` environment variable
  - Client-side configuration available via `NEXT_PUBLIC_GA_MEASUREMENT_ID` environment variable
  - Asynchronously loads the gtag.js script to minimize performance impact
  - Automatically tracks page views across the site
  - Works with Next.js App Router architecture
  - Follows privacy best practices with no cookie banner requirements when configured properly in Google Analytics

**Benefits**: This integration enables accurate tracking of user behavior, page views, and engagement metrics, providing valuable insights into site performance and user journeys to help optimize the user experience and marketing efforts.

### Gallery Image Optimization Fix (April 2025)

Fixed image rendering issues that were causing 400 errors for some gallery projects:

- **What Changed**: 
  - Removed the `unoptimized` flag in the Image component that was causing Next.js image optimization failures
  - Fixed case sensitivity issues in image paths by ensuring consistent use of `project.id` instead of `project.name`
- **Files Modified**:
  - `src/features/gallery/components/ImageGallery.tsx` - Removed the `unoptimized` flag that was incorrectly bypassing Next.js image optimization in production
  - `src/app/gallery/[slug]/page.tsx` - Fixed OpenGraph image URL to use `project.id` instead of `project.name` to match the actual file naming convention
- **Implementation Details**:
  - Identified that the `unoptimized={process.env.NODE_ENV === 'production'}` flag was causing 400 errors for some images
  - Discovered case sensitivity mismatch between the metadata image URLs and actual file paths
  - Fixed OpenGraph metadata to use consistent file naming with the same case as the actual files
  - Removed the unoptimized flag to allow Next.js to properly optimize all images
  - Fixed broken image URLs for Alamo, Oakland, and Tice projects
  - Maintained consistent image rendering across all projects
  - No changes required to the file structure or naming conventions

**Benefits**: All gallery images now render correctly across the site with proper Next.js image optimization, providing a consistent visual experience for users browsing project showcases with optimal performance. The fix ensures compatibility with case-sensitive file systems and servers in production environments.

### Interactive Gallery Showcase Implementation (October 2025)

Implemented a comprehensive gallery showcase with dynamic project pages and interactive features:

- **What Changed**: Created a new gallery system with dynamic routing, lightbox functionality, and optimized image loading
- **Files Created/Modified**:
  - `src/app/gallery/page.tsx` - Main gallery page with project grid
  - `src/app/gallery/[slug]/page.tsx` - Dynamic project pages for each location
  - `src/lib/gallery-data.ts` - Centralized gallery data management
  - `src/components/gallery/GalleryImage.tsx` - Responsive image component with loading states
  - `src/components/gallery/GalleryLightbox.tsx` - Interactive lightbox for image viewing
  - `src/components/gallery/ProjectGallery.tsx` - Client component for gallery with lightbox integration
  - `src/lib/utils.ts` - Added utility functions for class name handling
- **Implementation Details**:
  - Created dynamic routing for 15 project locations across the Bay Area
  - Implemented responsive image grid with optimized loading
  - Added interactive lightbox with keyboard navigation and touch support
  - Optimized image loading with placeholder fallbacks
  - Created SEO-friendly metadata for each project
  - Implemented proper error handling for missing images
  - Used static generation with dynamic paths for optimal performance
  - Maintained consistent design language throughout the gallery
  - Added graceful loading states with skeleton placeholders

**Benefits**: The new gallery showcase provides an immersive way for potential clients to browse completed renovation projects with high-quality images. The implementation is performant, SEO-friendly, and offers an excellent user experience with features like lightbox viewing and keyboard navigation. The centralized data management makes it easy to add new projects in the future.

### Gallery Pages Restructured for Static Routing (September 2025)

Completely redesigned the gallery project pages to use static routing instead of dynamic routes:

- **What Changed**: Replaced dynamic slug-based routing with hardcoded static pages for each project
- **Files Modified**:
  - `src/features/gallery/services/galleryImageService.ts` - Simplified for direct project name access
  - Created individual project pages:
    - `src/app/gallery/alamo/page.tsx`
    - `src/app/gallery/berkeley/page.tsx`
    - `src/app/gallery/castrovalley/page.tsx`
    - `src/app/gallery/danville/page.tsx`
    - `src/app/gallery/fremont/page.tsx`
    - `src/app/gallery/lafayette/page.tsx`
    - `src/app/gallery/moraga/page.tsx`
    - `src/app/gallery/oakland/page.tsx`
    - `src/app/gallery/orinda/page.tsx`
    - `src/app/gallery/redwoodcity/page.tsx`
    - `src/app/gallery/saratoga/page.tsx`
    - `src/app/gallery/sf/page.tsx`
    - `src/app/gallery/sj/page.tsx`
    - `src/app/gallery/tice/page.tsx`
    - `src/app/gallery/wc/page.tsx`
  - `src/app/gallery/page.tsx` - Updated to link to static project pages
- **Implementation Details**:
  - Removed complex case-insensitive slug matching logic
  - Eliminated dynamic route handling
  - Each page now directly uses its hardcoded project name
  - Simplified image service to work with direct project names
  - Enhanced reliability by eliminating URL parameter parsing
  - Removed all slug transformation code
  - Created unique React components for each project page
  - Each page handles its own metadata generation
  - Created consistent error handling across all project pages

**Benefits**: This change significantly improves reliability by eliminating dynamic route handling and case-sensitive slug matching. Each project now has its own dedicated page component, making debugging easier and ensuring consistent rendering. The hardcoded approach eliminates URL parsing errors and provides more predictable behavior.

### Gallery Image Service Robustness Improvements (September 2025)

Enhanced the gallery image service to provide more reliable image loading:

- **What Changed**: Improved the gallery image service with robust error handling and better case-insensitive matching
- **Files Modified**:
  - `src/features/gallery/services/galleryImageService.ts` - Completely refactored with better configuration and error handling
  - `src/features/gallery/hooks/useProjectDetails.ts` - Updated to use improved service API
  - `src/app/gallery/[slug]/page.tsx` - Simplified with consistent data retrieval approach
- **Implementation Details**:
  - Added comprehensive error logging for easier debugging
  - Implemented robust path validation to avoid 404 errors
  - Improved project name matching with case-insensitive lookup
  - Added boundaries and checks for image indices to prevent out-of-range errors
  - Consolidated special case handling within project configurations
  - Created fallback mechanism with proper placeholder image
  - Improved JSDoc comments for better code documentation
  - Enhanced readability with clear separation of concerns
  - Maintained backward compatibility with existing image naming conventions

**Benefits**: All gallery images now reliably render on both client and server-rendered components, providing a consistent experience across the site. The improved error handling ensures users never see broken images, and the robust path generation supports inconsistent file naming conventions without requiring file reorganization.

### Gallery Image Count Fix (September 2025)

Fixed an issue with incorrect image counts in gallery project pages:

- **What Changed**: Updated the image count configuration to match the actual number of images available for each project
- **Files Modified**:
  - `src/features/gallery/services/galleryImageService.ts` - Corrected image counts for Alamo, CastroValley, RedwoodCity and other projects
  - Fixed off-by-one error in image loop iteration logic
- **Implementation Details**:
  - Verified actual image counts in the filesystem
  - Updated image configuration to match real directory contents
  - Fixed loop calculation to prevent attempting to access non-existent images
  - Added additional error handling for image path generation
  - Made image loading more resilient to missing images

**Benefits**: All projects now display the correct number of images in their galleries, with no 404 errors or missing images. The system is now more resilient to filesystem changes or inconsistencies.

### Gallery Image Service Export Fix (April 2025)

Fixed an issue with gallery image not rendering on individual project pages:

- **What Changed**: Updated the export mechanism for the gallery image service to ensure compatibility with server components
- **Files Modified**:
  - `src/features/gallery/services/galleryImageService.ts` - Changed export format and added error handling
  - `src/features/gallery/index.ts` - Updated to provide direct exports for server component compatibility 
  - `src/app/gallery/[slug]/page.tsx` - Updated import statements to use the feature index exports
- **Implementation Details**:
  - Removed module.exports in favor of consistent named exports
  - Added comprehensive error handling in all gallery image functions
  - Ensured export consistency between client and server components
  - Updated import paths to follow best practices
  - Created a fallback placeholder image
  - Added error logging for easier debugging

**Benefits**: All gallery project pages now correctly display images, with proper error handling and fallback mechanisms in place. The improved export structure ensures compatibility across both client and server components in the Next.js application.

### Complete Gallery Image Service Rewrite (April 2025)

Completely redesigned the gallery image system with a more robust, configuration-driven approach:

- **What Changed**: Replaced the ad-hoc gallery image handling with a comprehensive configuration-driven system
- **Files Modified**:
  - `src/features/gallery/services/galleryImageService.ts` - Complete rewrite with configuration-based approach
  - `src/features/gallery/services/galleryDataService.ts` - Updated to use the new image service
  - `src/features/gallery/hooks/useGalleryProjects.ts` - Updated to use the new image service
  - `src/features/gallery/hooks/useProjectDetails.ts` - Updated with error handling and new service usage
  - `src/app/gallery/[slug]/page.tsx` - Simplified with new image service integration
  - Added placeholder image to provide graceful fallback
- **Implementation Details**:
  - Created a centralized image configuration system that explicitly maps projects to file patterns
  - Implemented special case handling for inconsistent naming patterns
  - Added strong typing with TypeScript interfaces for configuration
  - Implemented a robust path generation system with clear separation of concerns
  - Created a proper fallback system with placeholder image
  - Added comprehensive error handling throughout
  - Improved code organization with clear sections (Configuration, Helpers, Public API)
  - Added JSDoc comments to improve code maintainability 
  - Zero impact on page load performance
  - No database changes required

**Benefits**: All gallery images now render correctly across the site in both the gallery list view and the detailed project pages, providing a complete visual experience for users browsing project showcases. The new configuration-driven approach makes it easy to add new projects with different naming conventions and provides a more maintainable codebase for future development.

### Gallery Image Path Handling Improvements (April 2025)

Fixed inconsistent gallery image rendering with an improved image path handling system:

- **What Changed**: Enhanced the gallery image service to handle inconsistent file naming patterns
- **Files Modified**:
  - `src/features/gallery/services/galleryImageService.ts` - Improved the getImagePath function to handle various naming patterns
  - Added a proper placeholder.jpg for fallback image display
- **Implementation Details**:
  - Added special case handling for inconsistent file naming conventions
  - Fixed case sensitivity issues with image paths (e.g., oakland-1.jpg vs Danville-1.jpg)
  - Improved handling of project-specific naming formats (CastroValley with special format for image 9)
  - Implemented a more robust path generation system to accommodate different naming patterns
  - Created a comprehensive mapping of file naming patterns by project type
  - Added detailed debug logging to identify path construction issues
  - Created a proper placeholder image to prevent 404 errors
  - Zero impact on page load performance
  - No database changes required

**Benefits**: All gallery images now render across the site in both the gallery list view and the detailed project pages, providing a complete visual experience for users browsing project showcases. The implementation is backward compatible and handles the existing inconsistent naming patterns without requiring renaming of files.

### Google Tag Integration for Conversion Tracking (April 2025)

Added Google Tag (gtag.js) implementation for Askshachar to enable conversion tracking on Google Ads and Analytics:

- **What Changed**: Integrated Google Tag Manager script with conversion tracking for form submissions
- **Files Modified**:
  - `src/app/layout.tsx` - Added Google Tag script in the head section
  - `src/components/analytics/ConversionTracker.tsx` - Created client component for tracking conversions
  - `src/types/gtag.d.ts` - Added TypeScript declarations for gtag
  - `src/app/thank-you/page.tsx` - Added conversion tracking to thank-you page
  - `src/components/forms/GetStartedForm.tsx` - Added conversion tracking to main lead generation form
  - `src/components/forms/ContactForm.tsx` - Added conversion tracking to contact form
  - `src/components/forms/FooterContactForm.tsx` - Added conversion tracking to footer form
- **Implementation Details**:
  - Uses Google Tag ID 'Askshachar' for tracking
  - Tracks various conversion types with different labels (form_submission, get_started_form, contact_form, footer_form)
  - Implements client-side tracking with fallbacks for SSR
  - Supports enhanced conversion tracking with value assignment
  - Zero impact on initial page load performance (async script)
  - Works with Next.js App Router architecture

**Benefits**: This integration enables accurate tracking of lead generation and form submissions in Google Ads and Analytics, allowing for better ROI measurement and campaign optimization.

### In-Memory Data Storage Implementation (April 2025)

Replaced MongoDB with an in-memory data storage system for simplified deployment:

- **What Changed**: Removed MongoDB dependency in favor of a simple in-memory data storage solution
- **Files Modified**:
  - `src/lib/db/connection.ts` - Replaced MongoDB connection with a dummy function
  - `src/lib/models/User.ts` - Implemented in-memory user storage with UUID
  - `src/lib/models/Project.ts` - Implemented in-memory project storage
  - `src/app/api/*` - Updated all API routes to work with the new storage system
  - `package.json` - Removed mongoose dependency and added uuid
  - `.env.example` - Removed MongoDB-related environment variables
  - `README.md` - Updated documentation to reflect the changes
- **Implementation Details**:
  - Uses `uuid` package for generating unique IDs
  - Maintains CRUD operations with similar interface to previous MongoDB implementation
  - Stores data in memory, which means data is lost on server restart
  - No database setup required, simplifying deployment
  - JWT authentication still works the same way

**Benefits**: This update simplifies deployment by eliminating the need for a MongoDB database, making the application more portable and easier to set up for development and testing. Note that for production use with persistent data, you might want to implement a file-based storage solution or reintegrate a database.

### Node.js 20 Requirement (Update)

Updated development environment to require Node.js 20.0.0 or higher:

- **What Changed**: Added Node.js engine requirement in package.json to ensure compatibility with the latest dependencies
- **Files Modified**:
  - `package.json` - Added engines field requiring Node.js >=20.0.0
  - `README.md` - Updated prerequisites in Getting Started section
- **Implementation Details**:
  - Ensures compatibility with latest Next.js 14.2.0 features
  - Provides performance improvements from Node.js 20
  - Leverages security updates available in newer Node.js versions
  - Required for several dependencies that now expect Node.js 20+

**Benefits**: This update brings improved performance, better security, and ensures compatibility with the latest versions of all project dependencies.

### Vercel SpeedInsights Integration (Added)

Added Vercel SpeedInsights to monitor and improve web performance:

- **What Changed**: Integrated the `@vercel/speed-insights` package with a custom DSN for self-hosting
- **Files Modified**:
  - `src/app/layout.tsx` - Added the SpeedInsights component with custom DSN
- **Implementation Details**:
  - Self-hosted with custom DSN: `ZNga99anB7eSaJjchi9phAZv6n7`
  - Automatically collects Web Vitals metrics
  - Provides insights on real-user performance
  - Zero impact on page loading performance
  - Privacy-focused analytics with no cookie requirements

**Benefits**: This integration enables real-time monitoring of site performance metrics, helping identify and address performance bottlenecks to improve user experience.

### Case-Sensitivity Fix for Gallery URLs

Fixed an issue where gallery project pages were generating 404 errors when accessed with different letter casing in URLs:

- **What Changed**: Updated the URL slug matching logic to be case-insensitive, normalizing all gallery URLs
- **Files Modified**:
  - `src/app/gallery/[slug]/page.tsx` - Improved slug matching with case normalization
  - `src/features/gallery/services/galleryImageService.ts` - Enhanced project name lookup to handle case variations

**Usage Example**: 
The following URLs now all correctly display the same project page:
- `/gallery/alamo`
- `/gallery/Alamo`
- `/gallery/ALAMO`

This ensures consistent user experience regardless of how the URL is typed or linked.

### CI/CD Workflow Fix (March 26, 2025)

- Fixed GitHub Actions build errors related to webpack configuration
- Updated the webpack.yml workflow to use Next.js build command instead of direct webpack execution
- Streamlined CI/CD by standardizing on Node.js 18.x for GitHub Actions workflows
- Improved build performance by using `npm ci` instead of `npm install` in CI/CD pipelines

### API Routes Cleanup (March 26, 2025)

- Resolved conflicting API route definitions by removing legacy Pages Router routes
- Standardized on App Router API routes for authentication endpoints (`/api/auth/me`)
- This change ensures compatibility with Next.js 14.2.0 which doesn't support mixing Pages and App routers for the same routes

### API Routes Authentication Fix (March 26, 2025)

- Fixed compatibility issues with authentication API routes in App Router
- Removed `'use server'` directives from Next.js API route handlers that were causing build failures
- Updated cookie handling in auth routes to use direct response methods instead of server actions
- Standardized authentication flow implementation across login, logout, register, and user endpoints

## 📈 SEO Implementation

The project includes comprehensive SEO features:

1. **Sitemap Generation**
   - Automatic sitemap.xml generation using next-sitemap
   - Custom priority configurations for different page types
   - Custom change frequency settings

2. **Robots.txt**
   - Properly configured robots.txt file in public directory
   - Controls search engine crawling behavior

3. **Structured Data**
   - JSON-LD implementation for rich search results
   - Schemas for Organization, LocalBusiness, Service, FAQ, and BreadcrumbList
   - Reusable structured data components

4. **Meta Tags**
   - Enhanced metadata in layout.tsx
   - OpenGraph and Twitter card meta tags
   - Canonical URL implementation
   - Dynamic meta descriptions

## 🖼️ Project Gallery

The project showcase gallery features:

- Grid-based showcase of completed projects
- Filtering by project category
- Detailed project pages with image galleries
- Responsive design optimized for all devices
- Lightbox image gallery with navigation
- Project metadata including:
  - Services provided
  - Project duration
  - Completion date
  - Category/type of project
- Automatic image gallery generation based on available images
- Image paths follow a consistent pattern:
  - `public/images/gallery/Project-[ProjectName]/[projectname]-[n].jpg`

### Feature Module Organization

Gallery code is now organized into a feature module structure:

```
src/features/gallery/
├── components/    # UI components specific to gallery
│   ├── ImageGallery.tsx       # Reusable gallery grid with lightbox
│   └── ProjectGalleryTemplate.tsx  # Project detail layout
├── hooks/         # Custom hooks for gallery functionality
│   ├── useGalleryProjects.ts  # Hook for project listing/filtering 
│   └── useProjectDetails.ts   # Hook for getting project details
├── services/      # Data services for gallery
│   ├── galleryDataService.ts  # Project data and metadata
│   └── galleryImageService.ts # Image path handling
├── types/         # Type definitions
│   └── index.ts               # Shared gallery types
└── index.ts       # Barrel file exporting public API
```

This modular approach provides:
- Clear separation of concerns
- Well-defined interfaces between components
- Improved maintainability
- Easier testing
- Reusable components and hooks

To use gallery components and services, import from the feature module:

```typescript
import { 
  ImageGallery,
  ProjectGalleryTemplate,
  useGalleryProjects,
  useProjectDetails
} from '@/features/gallery';
```

## 🧪 Testing

The project uses a comprehensive testing strategy:

1. **Unit and Component Testing**
   - Jest for test runner and assertions
   - React Testing Library for component testing
   - Run tests with:
     ```bash
     # Run all tests
     npm test
     
     # Watch mode for development
     npm run test:watch
     
     # Generate test coverage report
     npm run test:coverage
     ```

2. **End-to-End Testing**
   - Playwright for browser-based end-to-end testing
   - Tests run against multiple browsers (Chrome, Firefox, Safari)
   - Mobile device simulation for responsive testing
   - Enhanced timeout configuration for reliable mobile testing
   - Run E2E tests with:
     ```bash
     # Run all E2E tests
     npm run test:e2e
     
     # Run tests in a specific browser
     npx playwright test --project=chromium
     
     # Run only mobile tests
     npx playwright test --project="Mobile Chrome" --project="Mobile Safari"
     
     # Run tests in UI mode for debugging
     npx playwright test --ui
     ```

3. **Test Structure**
   - Unit/component tests in `src/__tests__/`
   - E2E tests in `e2e/`
   - Component tests paired with their respective components
   - Integration tests for key user flows

## Deployment Notes

### GitHub Actions Build Issues

If you encounter errors like `Field 'browser' doesn't contain a valid alias configuration` or `src/index.json doesn't exist` during GitHub Actions builds, this is likely due to webpack resolution issues. We've added specific webpack configuration in `next.config.js` to address this:

```js
webpack: (config, { isServer }) => {
  // Ensures webpack resolves modules correctly
  config.resolve.modules = ['node_modules', '.']
  
  // Explicitly tell webpack how to resolve
  config.resolve.extensions = ['.js', '.jsx', '.ts', '.tsx']
  
  return config
},
```

This configuration helps webpack properly resolve module paths in the GitHub Actions environment.


<!-- Always leave this at the bottom of the README -->
<div align="center">
  <p>Built by <a href="https://ethanbleier.com">Ethan Bleier</a></p>
</div>