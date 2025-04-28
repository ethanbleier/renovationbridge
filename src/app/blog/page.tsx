"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'

// TODO: GET posts from a CMS or database
const blogPosts = [
  {
    id: 'kitchen-renovation-mistakes',
    title: '4 Common Kitchen Renovation Mistakes Bay Area Homeowners Make & How To Avoid Them',
    excerpt: 'Discover the most common mistakes homeowners make during kitchen renovations in the Bay Area and learn expert strategies to avoid them.',
    author: 'Onn Matalon',
    date: 'Jun 12',
    readTime: '2 min read',
    coverImage: '/images/blog/kitchen-remodel-1.jpg',
    views: 3542,
    categories: ['Kitchen', 'Tips'],
  },
  {
    id: 'choosing-the-right-contractor',
    title: 'Choosing the Right Contractor for Your Home Renovation',
    excerpt: 'Learn how to select the perfect contractor for your home renovation project with this comprehensive guide from Renovation Bridge.',
    author: 'Onn Matalon',
    date: 'Apr 17',
    readTime: '2 min read',
    coverImage: '/images/blog/contractor-selection.jpg',
    views: 2875,
    categories: ['Contractor', 'Guide'],
  },
  {
    id: 'pricing-calculator-budgeting',
    title: "How Can Renovation Bridge's Pricing Calculator Simplify Your Home Improvement Budgeting?",
    excerpt: 'Discover how our pricing calculator tool can help you budget accurately for your next home renovation project.',
    author: 'Onn Matalon',
    date: 'Feb 11',
    readTime: '3 min read',
    coverImage: '/images/blog/guide.png',
    views: 4218,
    categories: ['Tools', 'Budgeting'],
  },
  {
    id: 'kim-caffaro-success-story',
    title: 'Redefining Home Renovation: The Success Story of Kim Caffaro',
    excerpt: 'Learn how Renovation Bridge helped homeowner Kim Caffaro transform her kitchen and gain attention from NBC Bay Area.',
    author: 'Onn Matalon',
    date: 'Feb 12',
    readTime: '3 min read',
    coverImage: '/images/blog/kim.jpeg',
    views: 6742,
    categories: ['Success Story', 'Kitchen'],
  },
  {
    id: 'san-jose-kitchen-renovation',
    title: 'San Jose Kitchen Renovation – Transform Your Space with Expert Craftsmanship',
    excerpt: 'Learn how a well-designed kitchen renovation in San Jose can transform the heart of your home with expert craftsmanship and personalized design.',
    author: 'Onn Matalon',
    date: 'Feb 19',
    readTime: '2 min read',
    coverImage: '/images/blog/kitchen-3.jpg',
    views: 1986,
    categories: ['Kitchen', 'San Jose'],
  },
  {
    id: 'walnut-creek-kitchen-renovation',
    title: "Walnut Creek Kitchen Renovation – Transform Your Home's Heart with Premium Quality",
    excerpt: "Learn how a kitchen renovation in Walnut Creek can elevate your home's value and lifestyle with premium materials and expert craftsmanship.",
    author: 'Onn Matalon',
    date: 'Feb 15',
    readTime: '2 min read',
    coverImage: '/images/blog/kitchen-2.jpg',
    views: 3127,
    categories: ['Kitchen', 'Walnut Creek'],
  },
]

export default function BlogPage() {
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    setIsLoaded(true);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="pt-0 pb-16 bg-gradient-to-b from-cream to-white relative">
      {/* Decorative elements */}
      <div className="hidden md:block absolute top-0 right-0 w-1/3 h-screen pointer-events-none z-0 opacity-40">
        <div className="absolute top-40 right-20 w-64 h-64 rounded-full bg-primary/10 blur-3xl"></div>
        <div className="absolute top-96 right-40 w-80 h-80 rounded-full bg-secondary/10 blur-3xl"></div>
      </div>
      <div className="hidden md:block absolute top-0 left-0 w-1/3 h-screen pointer-events-none z-0 opacity-40">
        <div className="absolute top-96 left-20 w-72 h-72 rounded-full bg-lavender/30 blur-3xl"></div>
      </div>
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-lavender/80 to-lavender py-24 mb-16 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/images/pattern.svg')] bg-repeat"></div>
        </div>
        <div className="absolute right-0 top-0 w-1/3 h-full bg-primary/5 -skew-x-12 transform origin-top-right"></div>
        <div className="container-custom relative z-10">
        <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors mb-8">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back
          </Link>
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block relative mb-6">
              <span className="relative z-10 text-sm font-medium px-4 py-1 bg-primary/10 text-primary rounded-full">Our Blog</span>
              <div className="absolute inset-0 blur-xl bg-primary/20 rounded-full transform -rotate-3"></div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-secondary mb-6 relative">
              Renovation <span className="relative inline-block">Insights
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 358 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 9C118.957 4.47226 242.456 1.27226 355 9" stroke="#FF7D53" strokeWidth="6" strokeLinecap="round"/>
                </svg>
              </span>
            </h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Expert advice, industry trends, and inspiring stories to help you transform your home into the space of your dreams
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-cream to-transparent"></div>
      </section>

      <div className="container-custom relative z-10">
        {/* Featured Post */}
        <div className="mb-20 opacity-0 animate-fadeIn" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 lg:order-2">
              <div className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-2xl group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10"></div>
                <Image
                  src={blogPosts[0].coverImage}
                  alt={blogPosts[0].title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  priority
                />
                <div className="absolute top-4 left-4 z-20">
                  <div className="flex flex-wrap gap-2">
                    {blogPosts[0].categories?.map(category => (
                      <span key={category} className="bg-white/20 backdrop-blur-md text-white text-xs font-medium px-3 py-1 rounded-full">
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 lg:order-1 flex flex-col justify-center">
              <div className="bg-white rounded-2xl shadow-xl p-10 transform hover:shadow-2xl transition-all duration-500 -mt-8 lg:mt-0 lg:-mr-12 relative z-10">
                <div className="flex items-center space-x-2 mb-6">
                  <span className="bg-gradient-to-r from-primary to-primary/80 text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow-sm">Featured</span>
                  <span className="text-sm text-gray-500">{blogPosts[0].date} • {blogPosts[0].readTime}</span>
                </div>
                <Link href={`/blog/${blogPosts[0].id}`} className="group">
                  <h2 className="text-3xl font-bold text-secondary mb-4 group-hover:text-primary transition-colors">
                    {blogPosts[0].title}
                  </h2>
                </Link>
                <p className="text-gray-600 mb-6 text-lg">{blogPosts[0].excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-lavender flex items-center justify-center shadow-md">
                      <span className="font-semibold text-primary">{blogPosts[0].author.charAt(0)}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium">{blogPosts[0].author}</span>
                      <span className="text-xs text-gray-500">Author</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="flex items-center text-gray-400 px-3 py-1.5 rounded-full hover:bg-gray-50 transition-all duration-300">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5 mr-1.5" 
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                      >
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path 
                          fillRule="evenodd" 
                          d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" 
                          clipRule="evenodd" 
                        />
                      </svg>
                      {blogPosts[0].views.toLocaleString()}
                    </span>
                  </div>
                </div>
                <Link href={`/blog/${blogPosts[0].id}`} className="mt-6 inline-flex items-center text-primary font-medium group">
                  Read Article
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.slice(1).map((post, index) => (
            <article 
              key={post.id} 
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform transition-all duration-500 hover:-translate-y-2 opacity-0 animate-fadeIn"
              style={{ animationDelay: `${0.3 + index * 0.1}s`, animationFillMode: 'forwards' }}
            >
              <Link href={`/blog/${post.id}`} className="block">
                <div className="relative h-64 w-full overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent z-10"></div>
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className={`${post.id === 'kim-caffaro-success-story' ? 'object-cover object-top' : 'object-cover'} transition-transform duration-700 group-hover:scale-110`}
                  />
                  <div className="absolute top-4 left-4 z-20">
                    <div className="flex flex-wrap gap-2">
                      {post.categories?.map(category => (
                        <span key={category} className="bg-white/20 backdrop-blur-md text-white text-xs font-medium px-3 py-1 rounded-full">
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
              <div className="p-8">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-gray-500">{post.date} • {post.readTime}</span>
                </div>
                <Link href={`/blog/${post.id}`} className="group">
                  <h3 className="text-xl font-bold text-secondary mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                </Link>
                <p className="text-gray-600 mb-6 line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-lavender flex items-center justify-center shadow">
                      <span className="font-semibold text-primary text-sm">{post.author.charAt(0)}</span>
                    </div>
                    <span className="font-medium text-sm">{post.author}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-xs">
                    <span className="flex items-center text-gray-400 px-2 py-1 rounded-full transition-all duration-300">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-4 w-4 mr-1" 
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                      >
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path 
                          fillRule="evenodd" 
                          d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" 
                          clipRule="evenodd" 
                        />
                      </svg>
                      {post.views.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-20 relative opacity-0 animate-fadeIn" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
          <div className="absolute -top-10 -left-10 w-20 h-20 bg-lavender/30 rounded-full blur-xl"></div>
          <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-primary/20 rounded-full blur-xl"></div>
          
          <div className="relative bg-gradient-to-r from-lavender/90 to-lavender rounded-3xl p-10 md:p-14 shadow-xl overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center relative z-10">
              <div>
                <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-medium text-secondary mb-4">
                  Stay Connected
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Get Expert Renovation Tips</h3>
                <p className="text-secondary/80 mb-6 text-lg">
                  Subscribe to our newsletter for the latest renovation tips, trends, and success stories delivered straight to your inbox.
                </p>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="w-12 h-12 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="w-12 h-12 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  </div>
                </div>
              </div>
              <div>
                <form className="bg-white p-6 rounded-2xl shadow-lg">
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input 
                      type="email" 
                      id="email"
                      placeholder="youremail@example.com" 
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      required
                      disabled
                    />
                  </div>
                  <div className="mb-6">
                    <label htmlFor="interests" className="block text-sm font-medium text-gray-700 mb-1">Interests</label>
                    <select 
                      id="interests"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      disabled
                    >
                      <option>All renovation topics</option>
                      <option>Kitchen renovations</option>
                      <option>Bathroom renovations</option>
                      <option>Outdoor projects</option>
                    </select>
                  </div>
                  <button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-primary to-primary/80 text-white font-medium py-3 rounded-lg hover:from-primary/90 hover:to-primary/70 transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 opacity-50 cursor-not-allowed"
                    disabled
                  >
                    Subscribe — Coming Soon
                  </button>
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    Newsletter subscription will be available soon. Stay tuned!
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating back to top button */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-8 right-8 z-50 bg-primary text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
          scrollY > 500 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
      
      {/* Add these styles to your global CSS or as a style tag */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </main>
  )
} 