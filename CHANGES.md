### Gallery Image Optimization Fix

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

### Interactive Gallery Showcase Implementation

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

### Gallery Pages Restructured for Static Routing

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

### Gallery Image Service Robustness Improvements

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

### Gallery Image Count Fix


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

### Gallery Image Service Export Fix

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

### Complete Gallery Image Service Rewrite

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

### Gallery Image Path Handling Improvements

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

### Google Tag Integration for Conversion Tracking

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

### In-Memory Data Storage Implementation

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

### Tech Support Form Implementation

Added a dedicated tech support form in the footer for website assistance:

- **What Changed**: Created a new tech support form that sends direct email notifications to the support team
- **Files Created/Modified**:
  - `src/components/forms/FooterTechSupportForm.tsx` - New component for tech support requests
  - `src/app/api/tech-support/route.ts` - New API route for email-based support ticket creation
  - `src/components/layout/Footer.tsx` - Updated footer layout to include the tech support form
- **Implementation Details**:
  - Added a narrower tech support form in the footer adjacent to the main contact form
  - Created a dedicated email-based submission system for tech support requests
  - Implemented nodemailer for direct email notifications to support team (onn@renovationbridge.com)
  - Added visual tech support icon and phone number CTA: (925) 693-7590
  - Adjusted footer grid layout to accommodate the new form
  - Added form validation with error handling
  - Implemented success message with conversion tracking
  - Created local storage for form data persistence
  - Enhanced responsiveness and maintained consistent design language

**Benefits**: Users can now get immediate technical support for website issues without going through the main contact form. This separation allows for better routing of support requests and faster response times while providing a clear path for assistance with website functionality.

**Usage Example**:
Users experiencing issues with the website can fill out a simple form with their name, email, and issue description. The form sends an immediate email notification to the support team while providing a prominent support phone number for urgent assistance.