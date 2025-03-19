import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
  title: 'San Jose Kitchen Renovation – Transform Your Space with Expert Design | Renovation Bridge',
  description: 'Discover how a San Jose kitchen renovation can transform your space with expert design and craftsmanship through Renovation Bridge.',
}

export default function SanJoseKitchenRenovationPage() {
  const post = {
    title: 'San Jose Kitchen Renovation – Transform Your Space with Expert Craftsmanship',
    excerpt: 'Learn how a well-designed kitchen renovation in San Jose can transform the heart of your home with expert craftsmanship and personalized design.',
    author: 'Onn Matalon',
    authorRole: 'CEO & Founder',
    date: 'Feb 19, 2024',
    readTime: '2 min read',
    coverImage: '/images/blog/kitchen-remodel-2.jpg',
    views: 3,
    comments: 0,
    likes: 1,
    tags: ['Kitchen', 'Renovation', 'San Jose', 'Expert Design'],
  }
  
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
                alt="Modern kitchen with blue island, wood cabinets, quartz countertops, skylight, and a large sliding window overlooking the backyard"
                fill
                className="object-cover"
                priority
              />
            </div>
            
            {/* Blog Content */}
            <div className="bg-white rounded-xl p-6 md:p-10 shadow-lg mb-8">
              <div className="prose prose-lg max-w-none">
                <p>A well-designed kitchen is more than just a place to cook—it's the heart of your home. Whether you envision a sleek modern space or a warm traditional kitchen, a San Jose kitchen renovation can bring your vision to life. At Renovation Bridge, we specialize in connecting homeowners with top-rated kitchen contractors to ensure a seamless and stress-free renovation experience.</p>
                
                <h2>Why Renovate Your Kitchen in San Jose?</h2>
                <p>Upgrading your kitchen is one of the best investments you can make in your home. A well-planned San Jose kitchen renovation can:</p>
                <ul>
                  <li>Improve functionality with a better layout and storage solutions</li>
                  <li>Enhance energy efficiency with modern appliances and lighting</li>
                  <li>Increase home value and attract potential buyers</li>
                  <li>Create a welcoming space for family gatherings and entertaining</li>
                </ul>
                
                <h2>Our Expert Kitchen Remodelers in San Jose</h2>
                <p>At Renovation Bridge, we make finding the right kitchen contractor easy. With our matchmaking service, we connect you with licensed, experienced professionals who align with your style, budget, and needs.</p>
                
                <h3>Custom Kitchen Designs</h3>
                <p>Every contractor in our network has an in-house design team to craft a kitchen layout tailored to your lifestyle.</p>
                
                <h3>High-Quality Materials & Craftsmanship</h3>
                <p>We work with contractors who have exclusive partnerships with top-tier vendors, ensuring your kitchen features durable, stylish materials.</p>
                
                <h3>Perfect Fit for Your Home</h3>
                <p>With Renovation Bridge's matchmaking service, you get more than just a renovation—you get a contractor who understands your vision and meets your expectations.</p>
                
                <h2>Renovation Bridge's Kitchen Renovation Process – What to Expect</h2>
                <p>Our step-by-step approach makes your kitchen remodel simple and stress-free.</p>
                
                <h3>1. Initial Matchmaking Consultation</h3>
                <p>Discuss your dream kitchen with a Renovation Bridge expert, covering everything from design preferences to budget.</p>
                
                <h3>2. Meet Your Ideal Contractors</h3>
                <p>We handpick qualified San Jose kitchen contractors and schedule meetings for you to discuss your project.</p>
                
                <h3>3. Review Bids & Select Your Contractor</h3>
                <p>Receive detailed proposals from contractors, and work with your Renovation Bridge matchmaker to choose the best fit for your project.</p>
                
                <h3>4. Start Your Renovation!</h3>
                <p>Once you've selected a contractor, sign the contract and get ready for your dream kitchen to take shape.</p>
                
                <h2>Why Choose Renovation Bridge for Your San Jose Kitchen Renovation?</h2>
                <p>We are committed to helping homeowners find the perfect contractor for their kitchen remodel. Here's why we stand out:</p>
                <ul>
                  <li><strong>Expert Matchmaking:</strong> We connect you with licensed, vetted contractors who specialize in high-quality kitchen renovations.</li>
                  <li><strong>Personalized Service:</strong> We help you navigate design, budgeting, and contractor selection effortlessly.</li>
                  <li><strong>Stress-Free Process:</strong> From the first call to project completion, we are here to support you every step of the way.</li>
                </ul>
                
                <h2>Get Started on Your San Jose Kitchen Renovation Today!</h2>
                <p>Let's turn your kitchen dreams into reality! Contact Renovation Bridge today for a free consultation and let us match you with top San Jose kitchen contractors.</p>
                
                <div className="bg-lavender/30 p-6 rounded-lg my-8 text-center">
                  <h3 className="text-xl font-bold mb-3">Ready to transform your kitchen?</h3>
                  <p className="mb-4">Call us at (925) 693-7590 or click below to get started!</p>
                  <Link href="/get-started" className="inline-block bg-primary text-white font-medium py-3 px-6 rounded-lg hover:bg-primary-dark transition-colors">
                    Get Started
                  </Link>
                </div>
              </div>
              
              {/* Share and Engagement */}
              <div className="border-t border-gray-200 mt-10 pt-6 flex flex-wrap justify-between items-center">
                <div className="flex items-center space-x-6 mb-4 md:mb-0">
                  <span className="text-gray">Share this article:</span>
                  <div className="flex space-x-4">
                    <a href="#" className="text-primary hover:text-primary-dark transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                      </svg>
                    </a>
                    <a href="#" className="text-primary hover:text-primary-dark transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                      </svg>
                    </a>
                    <a href="#" className="text-primary hover:text-primary-dark transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </a>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="flex items-center text-gray">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                    {post.views} views
                  </span>
                  <span className="flex items-center text-rose-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                    {post.likes}
                  </span>
                </div>
              </div>
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
            <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
              <h3 className="text-xl font-bold border-b pb-4 mb-6">Related Articles</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src="/images/blog/kitchen-remodel-1.jpg"
                      alt="Walnut Creek Kitchen Renovation"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <Link href="/blog/walnut-creek-kitchen-renovation" className="font-bold hover:text-primary transition-colors line-clamp-2">
                      Walnut Creek Kitchen Renovation – Transform Your Home's Heart
                    </Link>
                    <p className="text-sm text-gray mt-1">Feb 19 • 2 min read</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src="/images/blog/kitchen-remodel-2.jpg"
                      alt="Kitchen Renovation Mistakes"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <Link href="/blog/kitchen-renovation-mistakes" className="font-bold hover:text-primary transition-colors line-clamp-2">
                      4 Common Kitchen Renovation Mistakes Bay Area Homeowners Make
                    </Link>
                    <p className="text-sm text-gray mt-1">Jun 12 • 2 min read</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Gallery CTA */}
            <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
              <h3 className="text-xl font-bold mb-4">Inspiration Gallery</h3>
              <p className="text-gray mb-6">Browse our gallery of stunning kitchen renovations to spark ideas for your own project.</p>
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="aspect-square relative rounded-lg overflow-hidden">
                  <Image
                    src="/images/blog/kitchen-1.jpg"
                    alt="Kitchen inspiration"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="aspect-square relative rounded-lg overflow-hidden">
                  <Image
                    src="/images/blog/kitchen-2.jpg"
                    alt="Kitchen inspiration"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="aspect-square relative rounded-lg overflow-hidden">
                  <Image
                    src="/images/blog/kitchen-3.jpg"
                    alt="Kitchen inspiration"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="aspect-square relative rounded-lg overflow-hidden">
                  <Image
                    src="/images/blog/kitchen-4.jpg"
                    alt="Kitchen inspiration"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <Link href="/gallery" className="block text-center bg-lavender text-primary font-medium py-2 rounded-lg hover:bg-lavender/80 transition-colors">
                View More
              </Link>
            </div>
            
            {/* CTA Box */}
            <div className="bg-primary text-white rounded-xl p-6 shadow-lg overflow-hidden relative">
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-4">Ready to Transform Your Kitchen?</h3>
                <p className="mb-6 text-white/90">
                  Let us connect you with top-rated San Jose kitchen renovation experts today.
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
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Start Your Kitchen Renovation Journey?</h2>
          <p className="text-gray max-w-2xl mx-auto mb-8">
            Take the first step toward your dream kitchen by connecting with our network of top-rated San Jose contractors.
          </p>
          <Link href="/get-started" className="btn btn-primary">
            Get Started Today
          </Link>
        </div>
      </div>
    </main>
  )
} 