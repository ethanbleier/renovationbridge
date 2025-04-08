"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

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
    views: 12,
    comments: 0,
    likes: 0,
  },
  {
    id: 'choosing-the-right-contractor',
    title: 'Choosing the Right Contractor for Your Home Renovation',
    excerpt: 'Learn how to select the perfect contractor for your home renovation project with this comprehensive guide from Renovation Bridge.',
    author: 'Onn Matalon',
    date: 'Apr 17',
    readTime: '2 min read',
    coverImage: '/images/blog/contractor-selection.jpg',
    views: 15,
    comments: 0,
    likes: 0,
  },
  {
    id: 'pricing-calculator-budgeting',
    title: "How Can Renovation Bridge's Pricing Calculator Simplify Your Home Improvement Budgeting?",
    excerpt: 'Discover how our pricing calculator tool can help you budget accurately for your next home renovation project.',
    author: 'Onn Matalon',
    date: 'Feb 11',
    readTime: '3 min read',
    coverImage: '/images/blog/guide.png',
    views: 9,
    comments: 0,
    likes: 0,
  },
  {
    id: 'kim-caffaro-success-story',
    title: 'Redefining Home Renovation: The Success Story of Kim Caffaro',
    excerpt: 'Learn how Renovation Bridge helped homeowner Kim Caffaro transform her kitchen and gain attention from NBC Bay Area.',
    author: 'Onn Matalon',
    date: 'Feb 12',
    readTime: '3 min read',
    coverImage: '/images/blog/kim.jpeg',
    views: 7,
    comments: 0,
  },
  {
    id: 'san-jose-kitchen-renovation',
    title: 'San Jose Kitchen Renovation – Transform Your Space with Expert Craftsmanship',
    excerpt: 'Learn how a well-designed kitchen renovation in San Jose can transform the heart of your home with expert craftsmanship and personalized design.',
    author: 'Onn Matalon',
    date: 'Feb 19',
    readTime: '2 min read',
    coverImage: '/images/blog/kitchen-3.jpg',
    views: 3,
    comments: 0,
    likes: 0,
  },
  {
    id: 'walnut-creek-kitchen-renovation',
    title: "Walnut Creek Kitchen Renovation – Transform Your Home's Heart with Premium Quality",
    excerpt: "Learn how a kitchen renovation in Walnut Creek can elevate your home's value and lifestyle with premium materials and expert craftsmanship.",
    author: 'Onn Matalon',
    date: 'Feb 15',
    readTime: '2 min read',
    coverImage: '/images/blog/kitchen-2.jpg',
    views: 5,
    comments: 0,
    likes: 0,
  },
]

export default function BlogPage() {
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  
  const handleLike = (postId: string) => {
    setLikedPosts(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  return (
    <main className="pt-0 pb-16 bg-cream relative">
      {/* Hero Section */}
      <section className="bg-lavender py-12 mb-12">
        <div className="container-custom">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors mb-8">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back
          </Link>
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
                  <div className="flex items-center space-x-4 text-sm">
                    <button 
                      className="flex items-center transition-all duration-300 focus:outline-none px-2 py-1 rounded-full hover:bg-rose-50 hover:scale-105"
                      onClick={() => handleLike(blogPosts[0].id)}
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className={`h-5 w-5 mr-1 ${likedPosts[blogPosts[0].id] ? 'text-rose-500 fill-rose-500' : 'text-gray-400'}`}
                        viewBox="0 0 20 20" 
                        fill={likedPosts[blogPosts[0].id] ? 'currentColor' : 'none'}
                        stroke="currentColor"
                        strokeWidth={likedPosts[blogPosts[0].id] ? "0" : "1"}
                      >
                        <path 
                          fillRule="evenodd" 
                          d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" 
                          clipRule="evenodd" 
                        />
                      </svg>
                      <span className={likedPosts[blogPosts[0].id] ? 'text-rose-500' : 'text-gray-400'}>
                        {likedPosts[blogPosts[0].id] ? 1 : 0}
                      </span>
                    </button>
                    <button 
                      className="flex items-center text-gray-400 cursor-not-allowed px-2 py-1 rounded-full hover:bg-gray-50 transition-all duration-300"
                      disabled
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5 mr-1" 
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                      >
                        <path 
                          fillRule="evenodd" 
                          d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" 
                          clipRule="evenodd" 
                        />
                      </svg>
                      0
                    </button>
                    <span className="flex items-center text-gray-400 px-2 py-1 rounded-full hover:bg-gray-50 transition-all duration-300">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5 mr-1" 
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                      >
                        <path 
                          d="M10 12a2 2 0 100-4 2 2 0 000 4z" 
                        />
                        <path 
                          fillRule="evenodd" 
                          d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" 
                          clipRule="evenodd" 
                        />
                      </svg>
                      {blogPosts[0].views}
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
                <div className={`relative ${post.id === 'kim-caffaro-success-story' ? 'h-64' : 'h-52'} w-full overflow-hidden rounded-t-lg`}>
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className={`${post.id === 'kim-caffaro-success-story' ? 'object-cover object-top' : 'object-cover'} transition-transform duration-500 hover:scale-110`}
                  />
                </div>
              </Link>
              <div className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-gray">{post.date} • {post.readTime}</span>
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
                  <div className="flex items-center space-x-3 text-xs">
                    <button 
                      className="flex items-center transition-all duration-300 focus:outline-none px-2 py-1 rounded-full hover:bg-rose-50 hover:scale-105"
                      onClick={() => handleLike(post.id)}
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className={`h-4 w-4 mr-1 ${likedPosts[post.id] ? 'text-rose-500 fill-rose-500' : 'text-gray-400'}`}
                        viewBox="0 0 20 20" 
                        fill={likedPosts[post.id] ? 'currentColor' : 'none'}
                        stroke="currentColor"
                        strokeWidth={likedPosts[post.id] ? "0" : "1"}
                      >
                        <path 
                          fillRule="evenodd" 
                          d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" 
                          clipRule="evenodd" 
                        />
                      </svg>
                      <span className={likedPosts[post.id] ? 'text-rose-500' : 'text-gray-400'}>
                        {likedPosts[post.id] ? 1 : 0}
                      </span>
                    </button>
                    <button 
                      className="flex items-center text-gray-400 cursor-not-allowed px-2 py-1 rounded-full hover:bg-gray-50 transition-all duration-300"
                      disabled
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-4 w-4 mr-1" 
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                      >
                        <path 
                          fillRule="evenodd" 
                          d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" 
                          clipRule="evenodd" 
                        />
                      </svg>
                      0
                    </button>
                    <span className="flex items-center text-gray-400 px-2 py-1 rounded-full hover:bg-gray-50 transition-all duration-300">
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
                      {post.views}
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
                  disabled
                />
                <button 
                  type="submit" 
                  className="btn btn-primary whitespace-nowrap opacity-50 cursor-not-allowed"
                  disabled
                >
                  Coming Soon
                </button>
              </form>
              <p className="text-xs text-gray mt-2">
                Newsletter subscription will be available soon. Stay tuned!
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 