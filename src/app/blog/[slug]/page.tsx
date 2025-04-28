import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

// This would typically come from a CMS or database
const blogPosts = [
  {
    id: 'renovation-bridge-36-month-guarantee',
    title: 'The Renovation Bridge 36-Month Guarantee',
    excerpt: 'Are you thinking about renovating your home? Your choice plays a crucial role in transforming your space into the home of your dreams.',
    content: `
      <p>Are you thinking about renovating your home? Your choice plays a crucial role in transforming your space into the home of your dreams.</p>
      
      <p>At Renovation Bridge, we understand that a home renovation is one of the most significant investments you'll make. That's why we stand behind our work with our exclusive 36-Month Guarantee—a promise of quality, reliability, and peace of mind that sets us apart in the industry.</p>
      
      <h2>Why Our Guarantee Matters</h2>
      
      <p>Most contractors offer a standard 12-month warranty on their work. We triple that commitment because we believe in building lasting relationships with our clients and ensuring your renovation stands the test of time.</p>
      
      <p>Our 36-Month Guarantee means that if anything goes wrong with the work completed by our network of vetted contractors within three years of completion, we'll make it right—at no additional cost to you.</p>
      
      <h2>What's Covered Under Our Guarantee</h2>
      
      <ul>
        <li>Structural integrity issues</li>
        <li>Plumbing and electrical malfunctions</li>
        <li>Material defects</li>
        <li>Craftsmanship flaws</li>
        <li>Installation problems</li>
      </ul>
      
      <p>This comprehensive coverage ensures that your investment is protected, giving you confidence in your renovation project from start to finish and long after completion.</p>
      
      <h2>Our Vetting Process: The Foundation of Our Guarantee</h2>
      
      <p>We can offer this industry-leading guarantee because of our rigorous contractor vetting process. Before any contractor joins our network, they undergo:</p>
      
      <ul>
        <li>Thorough background checks</li>
        <li>Verification of licenses, insurance, and bonding</li>
        <li>Review of past project portfolios</li>
        <li>Multiple client reference checks</li>
        <li>In-person interviews with our leadership team</li>
      </ul>
      
      <p>Only 1 in 10 contractors who apply meet our standards. This selective approach ensures that we work with only the best professionals in the industry, which allows us to stand confidently behind our 36-Month Guarantee.</p>
      
      <h2>Real Peace of Mind for Homeowners</h2>
      
      <p>We've heard too many renovation horror stories from homeowners who were left with subpar work and contractors who disappeared when problems arose. Our guarantee is designed to eliminate these worries and provide you with real peace of mind throughout your renovation journey.</p>
      
      <p>With Renovation Bridge, you're never alone in the process. Our dedicated team monitors each project from start to finish, and we remain accessible long after the work is completed, ready to address any concerns that might arise.</p>
      
      <h2>Get Started with Confidence</h2>
      
      <p>Ready to transform your home with the security of our 36-Month Guarantee? Contact us today to discuss your project and experience the Renovation Bridge difference.</p>
      
      <p>Your dream home is too important to trust to chance. Choose Renovation Bridge and renovate with confidence.</p>
    `,
    author: 'Onn Matalon',
    authorRole: 'CEO & Founder',
    date: 'Mar 6, 2024',
    readTime: '3 min read',
    coverImage: '/images/blog/kitchen-remodel-1.jpg',
    views: 8,
    comments: 0,
    tags: ['Guarantee', 'Quality', 'Renovation'],
    relatedPosts: ['san-jose-kitchen-renovation', 'how-to-choose-contractor', 'renovation-budget-planning']
  },
  // Other blog posts would be here
]

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = blogPosts.find(post => post.id === params.slug)
  
  if (!post) {
    return {
      title: 'Blog Post Not Found | Renovation Bridge',
      description: 'The requested blog post could not be found.'
    }
  }
  
  return {
    title: `${post.title} | Renovation Bridge Blog`,
    description: post.excerpt,
  }
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = blogPosts.find(post => post.id === params.slug)
  
  if (!post) {
    notFound()
  }
  
  // Get related posts data
  const relatedPostsData = post.relatedPosts 
    ? post.relatedPosts.map(id => blogPosts.find(post => post.id === id)).filter(Boolean)
    : []
  
  return (
    <main className="pt-24 pb-16 bg-cream">
      {/* Blog Post Header */}
      <section className="bg-lavender py-12 mb-12">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <Link href="/blog" className="inline-flex items-center text-primary hover:text-primary-dark transition-colors mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Back to Blog
            </Link>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map(tag => (
                <span key={tag} className="bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold text-secondary mb-4">{post.title}</h1>
            
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center overflow-hidden">
                  <span className="font-semibold text-primary text-xl">{post.author.charAt(0)}</span>
                </div>
                <div>
                  <h3 className="font-bold">{post.author}</h3>
                  <p className="text-sm text-gray">{post.authorRole}</p>
                </div>
              </div>
              
              <div className="flex items-center text-sm text-gray space-x-4">
                <span>{post.date}</span>
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {post.readTime}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <article className="lg:col-span-8">
            {/* Featured Image */}
            <div className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-lg mb-8">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
            
            {/* Blog Content */}
            <div className="bg-white rounded-xl p-6 md:p-10 shadow-lg mb-8">
              <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.content }}></div>
            </div>
            
            {/* Author Box */}
            <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg mb-8 flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="w-20 h-20 rounded-full bg-lavender flex items-center justify-center flex-shrink-0">
                <span className="font-bold text-primary text-2xl">{post.author.charAt(0)}</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">{post.author}</h3>
                <p className="text-gray mb-4">{post.authorRole} at Renovation Bridge with a passion for helping homeowners create their dream spaces. Expert in connecting the right contractors with the right projects.</p>
                <div className="flex space-x-4">
                  <a href="#" className="text-primary hover:text-primary-dark transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-primary hover:text-primary-dark transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            {/* Comments Section */}
            <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg">
              <h3 className="text-xl font-bold mb-6">Comments ({post.comments})</h3>
              
              {post.comments === 0 ? (
                <div className="text-center py-8">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  <p className="text-gray mb-4">Be the first to comment on this article!</p>
                </div>
              ) : (
                <div className="space-y-6 mb-8">
                  {/* This would be populated with actual comments */}
                </div>
              )}
              
              {/* Comment Form */}
              <form className="space-y-4">
                <h4 className="font-bold text-lg">Leave a Comment</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray mb-1">Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray mb-1">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="comment" className="block text-sm font-medium text-gray mb-1">Comment</label>
                  <textarea 
                    id="comment" 
                    rows={5} 
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                >
                  Post Comment
                </button>
              </form>
            </div>
          </article>
          
          {/* Sidebar */}
          <aside className="lg:col-span-4">
            {/* Related Posts */}
            {relatedPostsData.length > 0 && (
              <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
                <h3 className="text-xl font-bold border-b pb-4 mb-6">Related Articles</h3>
                <div className="space-y-6">
                  {relatedPostsData.map((relatedPost) => (
                    <div key={relatedPost?.id} className="flex gap-4">
                      <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={relatedPost?.coverImage || ''}
                          alt={relatedPost?.title || ''}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <Link href={`/blog/${relatedPost?.id}`} className="font-bold hover:text-primary transition-colors line-clamp-2">
                          {relatedPost?.title}
                        </Link>
                        <p className="text-sm text-gray mt-1">{relatedPost?.date} • {relatedPost?.readTime}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Categories */}
            <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
              <h3 className="text-xl font-bold border-b pb-4 mb-6">Categories</h3>
              <div className="space-y-2">
                <a href="#" className="block py-2 px-4 hover:bg-lavender rounded-lg transition-colors">
                  Kitchen Renovations
                </a>
                <a href="#" className="block py-2 px-4 hover:bg-lavender rounded-lg transition-colors">
                  Bathroom Remodels
                </a>
                <a href="#" className="block py-2 px-4 hover:bg-lavender rounded-lg transition-colors">
                  Home Improvement
                </a>
                <a href="#" className="block py-2 px-4 hover:bg-lavender rounded-lg transition-colors">
                  Contractor Selection
                </a>
                <a href="#" className="block py-2 px-4 hover:bg-lavender rounded-lg transition-colors">
                  Budget Planning
                </a>
                <a href="#" className="block py-2 px-4 hover:bg-lavender rounded-lg transition-colors">
                  Design Trends
                </a>
              </div>
            </div>
            
            {/* Popular Tags */}
            <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
              <h3 className="text-xl font-bold border-b pb-4 mb-6">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                <a href="#" className="bg-lavender text-primary text-sm px-3 py-1 rounded-full hover:bg-primary hover:text-white transition-colors">
                  Renovation
                </a>
                <a href="#" className="bg-lavender text-primary text-sm px-3 py-1 rounded-full hover:bg-primary hover:text-white transition-colors">
                  Kitchen
                </a>
                <a href="#" className="bg-lavender text-primary text-sm px-3 py-1 rounded-full hover:bg-primary hover:text-white transition-colors">
                  Bathroom
                </a>
                <a href="#" className="bg-lavender text-primary text-sm px-3 py-1 rounded-full hover:bg-primary hover:text-white transition-colors">
                  Design
                </a>
                <a href="#" className="bg-lavender text-primary text-sm px-3 py-1 rounded-full hover:bg-primary hover:text-white transition-colors">
                  Contractors
                </a>
                <a href="#" className="bg-lavender text-primary text-sm px-3 py-1 rounded-full hover:bg-primary hover:text-white transition-colors">
                  Budget
                </a>
                <a href="#" className="bg-lavender text-primary text-sm px-3 py-1 rounded-full hover:bg-primary hover:text-white transition-colors">
                  Tips
                </a>
                <a href="#" className="bg-lavender text-primary text-sm px-3 py-1 rounded-full hover:bg-primary hover:text-white transition-colors">
                  Trends
                </a>
              </div>
            </div>
            
            {/* CTA Box */}
            <div className="bg-primary text-white rounded-xl p-6 shadow-lg overflow-hidden relative">
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-4">Ready to Start Your Project?</h3>
                <p className="mb-6 text-white/90">
                  Connect with top-rated contractors and make your renovation dreams a reality.
                </p>
                <Link href="/get-started" className="inline-block bg-white text-primary font-medium py-2 px-6 rounded-lg hover:bg-opacity-90 transition-colors">
                  Get Started
                </Link>
              </div>
              {/* Background decorative element */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-white opacity-10 rounded-full"></div>
              <div className="absolute top-4 -left-4 w-16 h-16 bg-white opacity-10 rounded-full"></div>
            </div>
          </aside>
        </div>
        
        {/* Bottom CTA - Get Started */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Transform Your Home with Confidence</h2>
          <p className="text-gray max-w-2xl mx-auto mb-8">
            Ready to start your renovation journey? Let Renovation Bridge connect you with vetted professionals who can bring your vision to life.
          </p>
          <Link href="/get-started" className="btn btn-primary">
            Start Your Project
          </Link>
        </div>
      </div>
    </main>
  )
} 