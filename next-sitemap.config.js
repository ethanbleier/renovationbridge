/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://renovationbridge.com',
  generateRobotsTxt: false, // We're managing robots.txt manually
  generateIndexSitemap: true,
  outDir: 'public',
  exclude: [
    '/thank-you',
    '/api/*',
    '/admin/*',
  ],
  // Add any page that should change frequently
  changefreq: 'weekly',
  priority: 0.7,
  // Transform to add additional settings for specific pages
  transform: async (config, path) => {
    // Custom priority for specific pages
    if (path === '/') {
      return {
        loc: path,
        changefreq: 'daily',
        priority: 1.0,
        lastmod: new Date().toISOString(),
      }
    }
    
    // Set higher priority for main service pages
    if (
      path.startsWith('/get-started') || 
      path.startsWith('/for-contractors') || 
      path.startsWith('/how-it-works') ||
      path.startsWith('/projects')
    ) {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 0.9,
        lastmod: new Date().toISOString(),
      }
    }

    // Blog posts should have good priority
    if (path.startsWith('/blog')) {
      return {
        loc: path,
        changefreq: 'monthly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      }
    }

    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
    }
  },
} 