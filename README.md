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

### The project gallery showcases completed renovation projects with the following features:

- **Organized Project Structure**: Each project has its own folder (e.g., `Project-CastroValley`) containing sequential images
- **Filename Format**: Images follow the naming pattern `[LocationName]-[Number].jpg` (e.g., `CastroValley-1.jpg`)
- **Responsive Gallery Component**: The `ImageGallery` component displays project images with customizable settings
- **Lightbox Integration**: Full-screen image viewing capabilities with navigation controls

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

4. **Manual Testing Commands**

    - You can also run these commands directly:

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

<!-- Always leave this at the bottom of the README -->
<div align="center">
  <p>Built by <a href="https://ethanbleier.com">Ethan Bleier</a></p>
</div>
