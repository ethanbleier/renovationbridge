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
- **Image Processing:** Sharp 0.33+
- **Deployment:** Vercel
- **GraphQL Client:** GraphQL Request

## 📁 Project Structure

```
renovationbridge/
├── public/                 # Static assets
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
│   │   └── ui/          # UI elements
│   ├── lib/             # Core functionality
│   │   ├── db/         # Database connections
│   │   ├── models/     # Data models
│   │   └── utils/      # Utility functions
│   ├── styles/         # Global styles
│   └── utils/          # Helper functions
├── scripts/            # Deployment and utility scripts
├── secrets/            # Environment secrets
├── .github/           # GitHub Actions workflows
└── config files       # Various configuration files
```

## 🛠️ Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/renovationbridge.git
   cd renovationbridge
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration settings
   ```

4. **Start development server**
   ```bash
   npm run dev
   # or
   ./start.sh
   ```

5. **Open [http://localhost:3000](http://localhost:3000)**

## 🌟 Key Features

- **Smart Lead Generation** - Optimized contact forms and CTAs
- **Contractor Management** - Dedicated dashboard for contractors
- **Project Showcase** - Beautiful gallery of completed renovations
- **Resource Library** - Valuable guides and articles
- **Mobile-First Design** - Perfect experience on all devices
- **SEO Optimization** - Built for search engine visibility
- **Incremental Static Regeneration** - Fast page loads with dynamic content

## 🔒 Security & Configuration

The project uses a secure secrets management system:

```
secrets/
├── ghl.env      # Go High Level API credentials
├── mongodb.env  # Database connection strings
├── jwt.env      # JWT authentication secrets
├── email.env    # Email service configuration
```

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
     MONGODB_URI
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

---

<div align="center">
  <p>Built by <a href="https://ethanbleier.com">Ethan Bleier</a></p>
</div> 