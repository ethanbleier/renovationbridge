import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
  title: 'Blog | Renovation Bridge',
  description: 'Read the latest articles and guides on home renovation from Renovation Bridge.',
}

// This would typically come from a CMS or database
const blogPosts = [
  {
    id: 'renovation-bridge-36-month-guarantee',
    title: 'The Renovation Bridge 36-Month Guarantee',
    excerpt: 'Are you thinking about renovating your home? Your choice plays a crucial role in transforming your space into the home of your dreams.',
    author: 'Onn Matalon',
    date: 'Mar 6',
    readTime: '3 min read',
    coverImage: '/images/blog/kitchen-remodel-1.jpg', // These would be replaced with actual images
    views: 8,
    comments: 0,
  },
  {
    id: 'san-jose-kitchen-renovation',
    title: 'San Jose Kitchen Renovation – Transform Your Space with Expert Design',
    excerpt: 'Discover how our team transformed a dated kitchen into a modern culinary haven in San Jose.',
    author: 'Onn Matalon',
    date: 'Feb 19',
    readTime: '2 min read',
    coverImage: '/images/blog/kitchen-remodel-2.jpg',
    views: 3,
    comments: 0,
    likes: 1,
  },
  {
    id: 'walnut-creek-kitchen-renovation',
    title: 'Walnut Creek Kitchen Renovation – Transform Your Home\'s Heart',
    excerpt: 'See how this Walnut Creek kitchen was transformed from outdated to stunning with our expert renovation.',
    author: 'Onn Matalon',
    date: 'Feb 19',
    readTime: '2 min read',
    coverImage: '/images/blog/kitchen-remodel-3.jpg',
    views: 5,
    comments: 0,
  },
  {
    id: 'bathroom-renovation-tips',
    title: 'Essential Bathroom Renovation Tips for 2024',
    excerpt: 'Learn the top bathroom renovation trends and practical tips to maximize your investment.',
    author: 'Onn Matalon',
    date: 'Jan 24',
    readTime: '4 min read',
    coverImage: '/images/blog/bathroom-renovation.jpg',
    views: 12,
    comments: 2,
  },
  {
    id: 'how-to-choose-contractor',
    title: 'How to Choose the Right Contractor for Your Project',
    excerpt: 'Avoid costly mistakes by following these expert tips for selecting the perfect contractor.',
    author: 'Onn Matalon',
    date: 'Jan 12',
    readTime: '5 min read',
    coverImage: '/images/blog/contractor-selection.jpg',
    views: 15,
    comments: 3,
    likes: 2,
  },
  {
    id: 'renovation-budget-planning',
    title: 'Renovation Budget Planning: Save Without Compromising Quality',
    excerpt: 'Smart strategies to keep your renovation costs in check while achieving beautiful results.',
    author: 'Onn Matalon',
    date: 'Dec 28',
    readTime: '3 min read',
    coverImage: '/images/blog/budget-planning.jpg',
    views: 9,
    comments: 1,
  },
  {
    id: 'sustainable-home-renovations',
    title: 'Sustainable Home Renovations: Eco-Friendly Choices',
    excerpt: 'Discover how to make environmentally responsible choices for your next home renovation project.',
    author: 'Onn Matalon',
    date: 'Dec 15',
    readTime: '4 min read',
    coverImage: '/images/blog/eco-friendly-renovation.jpg',
    views: 7,
    comments: 0,
    likes: 3,
  },
]

export default function BlogPage() {
  return (
    <main className="pt-24 pb-16 bg-cream">
      {/* Hero Section */}
      <section className="bg-lavender py-16 mb-12">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-4">Renovation Insights</h1>
            <p className="text-lg text-gray">
              Expert advice, industry trends, and inspiring stories to help you transform your home
            </p>
          </div>
        </div>
      </section>

      <div className="container-custom">
        {/* Featured Post */}
        <div className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 lg:order-2">
              <div className="relative w-full h-[400px] rounded-lg overflow-hidden shadow-xl">
                <Image
                  src={blogPosts[0].coverImage}
                  alt={blogPosts[0].title}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  priority
                />
              </div>
            </div>
            <div className="lg:col-span-5 lg:order-1 flex flex-col justify-center">
              <div className="bg-white p-8 rounded-lg shadow-lg transform hover:shadow-xl transition-all duration-300 -mt-8 lg:mt-0 lg:-mr-8 relative z-10">
                <div className="flex items-center space-x-2 mb-4">
                  <span className="bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full">Featured</span>
                  <span className="text-sm text-gray">{blogPosts[0].date} • {blogPosts[0].readTime}</span>
                </div>
                <Link href={`/blog/${blogPosts[0].id}`} className="group">
                  <h2 className="text-2xl md:text-3xl font-bold text-secondary mb-3 group-hover:text-primary transition-colors">
                    {blogPosts[0].title}
                  </h2>
                </Link>
                <p className="text-gray mb-4">{blogPosts[0].excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-lavender flex items-center justify-center">
                      <span className="font-semibold text-primary">{blogPosts[0].author.charAt(0)}</span>
                    </div>
                    <span className="font-medium">{blogPosts[0].author}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray">
                    <span className="flex items-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                      {blogPosts[0].views}
                    </span>
                    <span className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                      </svg>
                      {blogPosts[0].comments}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.slice(1).map((post) => (
            <article 
              key={post.id} 
              className="bg-white rounded-lg overflow-hidden shadow-lg transform hover:translate-y-[-5px] transition-all duration-300"
            >
              <Link href={`/blog/${post.id}`} className="block">
                <div className="relative h-52 w-full overflow-hidden">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
              </Link>
              <div className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-gray">{post.date} • {post.readTime}</span>
                  {post.likes && (
                    <span className="flex items-center text-rose-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                      {post.likes}
                    </span>
                  )}
                </div>
                <Link href={`/blog/${post.id}`} className="group">
                  <h3 className="text-xl font-bold text-secondary mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                </Link>
                <p className="text-gray mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-lavender flex items-center justify-center">
                      <span className="font-semibold text-primary text-sm">{post.author.charAt(0)}</span>
                    </div>
                    <span className="font-medium text-sm">{post.author}</span>
                  </div>
                  <div className="flex items-center text-xs text-gray">
                    <span className="flex items-center mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                      {post.views}
                    </span>
                    <span className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                      </svg>
                      {post.comments}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-16 bg-lavender rounded-xl p-8 md:p-12 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-secondary mb-3">Stay Updated</h3>
              <p className="text-gray mb-4">
                Subscribe to our newsletter for the latest renovation tips, trends, and success stories delivered straight to your inbox.
              </p>
            </div>
            <div>
              <form className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-grow px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
                <button 
                  type="submit" 
                  className="btn btn-primary whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
              <p className="text-xs text-gray mt-2">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 