import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
  title: '4 Common Kitchen Renovation Mistakes Bay Area Homeowners Make & How To Avoid Them | Renovation Bridge',
  description: 'Learn about the top four mistakes Bay Area homeowners make when renovating their kitchens and how to avoid them.',
}

export default function KitchenRenovationMistakesPage() {
  const post = {
    title: '4 Common Kitchen Renovation Mistakes Bay Area HomeOwners Make & How To Avoid Them',
    excerpt: 'Discover the top four mistakes Bay Area homeowners make when renovating their kitchens and how you can avoid them.',
    author: 'Onn Matalon',
    authorRole: 'CEO & Founder',
    date: 'Jun 12, 2024',
    readTime: '4 min read',
    coverImage: '/images/blog/kitchen-remodel-2.jpg',
    tags: ['Kitchen', 'Renovation', 'Mistakes', 'Bay Area'],
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
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
            
            {/* Blog Content */}
            <div className="bg-white rounded-xl p-6 md:p-10 shadow-lg mb-8">
              <div className="prose prose-lg max-w-none">
                <p>I will show you the top four mistakes I see Bay Area homeowners make when renovating their kitchens in 2024.</p>
                
                <p>My name is Onn, the founder of Renovation Bridge. I oversee hundreds of kitchen renovations each year. Here are the top four mistakes I personally see homeowners make and how you can avoid them:</p>
                
                <h2>1. Inadequate Planning and Budgeting</h2>
                
                <p>Planning and budgeting are crucial for any renovation project. There's a strange stigma around money and home renovations, leading homeowners to fail to define an accurate budget. This often results in two scenarios:</p>
                
                <ol>
                  <li>Projects get halted midway due to lack of funds.</li>
                  <li>Projects are completed but with very low-quality materials, compromising the final outcome.</li>
                </ol>
                
                <p>To avoid this, do your homework. Define the scope of work and understand why you're renovating. Are you looking to increase your property's value? Improve the kitchen's workflow? Sell the home? Knowing your "why" helps determine how much you're willing to spend. Always leave a 10-20% buffer in your budget to cover unforeseen expenses.</p>
                
                <h2>2. Not Visiting Enough Showrooms</h2>
                
                <p>The rate of innovations in kitchen remodeling is astonishing. New cabinets, fridges, and countertop materials are constantly being introduced. Homeowners often enter a renovation with a fixed idea of what they want, ordering everything online without exploring new options. This can lead to mismatched materials and disappointing results.</p>
                
                <p>Avoid this by visiting showrooms or recently renovated kitchens. Seeing materials in person helps you understand how they look and feel in different settings, preventing 90% of last-minute surprises.</p>
                
                <h2>3. Overlooking Functionality</h2>
                
                <p>While aesthetics are important, your kitchen needs to be functional. A beautiful kitchen that doesn't flow well is frustrating to work in. Older homes often have tiny, flimsy cabinets and poorly planned layouts, making cooking a nightmare.</p>
                
                <p>Follow the triangle rule: ensure your fridge, stove, and sink form a triangle. This layout improves kitchen flow, making cooking easier. Invest in high-quality cabinets with good organization. The extra expense is worth it for the durability and convenience they offer.</p>
                
                <h2>4. Not Using Renovation Bridge</h2>
                
                <p>The most catastrophic mistake Bay Area homeowners make is not using Renovation Bridge. Our free service provides personalized support throughout your renovation process. We help with budgeting, showrooms, and design functionality, ensuring everything fits and looks perfect.</p>
                
                <p>Our dedicated matchmakers guide you from start to finish, making your dream kitchen a reality. It's a no-brainer—our service is free, so why not take advantage of it?</p>
                
                <p>If you or anyone you know is looking to renovate in the Bay Area, visit Renovation Bridge and book a consultation. Fill out a few quick questions, and one of our specialists will call you to ensure you get the best renovation possible.</p>
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
                      src="/images/blog/kitchen-remodel-2.jpg"
                      alt="San Jose Kitchen Renovation"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <Link href="/blog/san-jose-kitchen-renovation" className="font-bold hover:text-primary transition-colors line-clamp-2">
                      San Jose Kitchen Renovation – Transform Your Space with Expert Design
                    </Link>
                    <p className="text-sm text-gray mt-1">Feb 19 • 2 min read</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src="/images/blog/interior-1.jpg"
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
              </div>
            </div>
            
            {/* Categories */}
            <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
              <h3 className="text-xl font-bold border-b pb-4 mb-6">Categories</h3>
              <div className="space-y-2">
                <Link href="#" className="block py-2 px-4 hover:bg-lavender rounded-lg transition-colors">
                  Kitchen Renovations
                </Link>
                <Link href="#" className="block py-2 px-4 hover:bg-lavender rounded-lg transition-colors">
                  Bathroom Remodels
                </Link>
                <Link href="#" className="block py-2 px-4 hover:bg-lavender rounded-lg transition-colors">
                  Home Improvement
                </Link>
                <Link href="#" className="block py-2 px-4 hover:bg-lavender rounded-lg transition-colors">
                  Contractor Selection
                </Link>
                <Link href="#" className="block py-2 px-4 hover:bg-lavender rounded-lg transition-colors">
                  Budget Planning
                </Link>
                <Link href="#" className="block py-2 px-4 hover:bg-lavender rounded-lg transition-colors">
                  Design Trends
                </Link>
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
                  Upgrade Smarter
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
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Transform Your Kitchen with Confidence</h2>
          <p className="text-gray max-w-2xl mx-auto mb-8">
            Ready to start your kitchen renovation journey? Let Renovation Bridge connect you with vetted professionals who can bring your vision to life.
          </p>
          <Link href="/get-started" className="btn btn-primary">
            Start Your Project
          </Link>
        </div>
      </div>
    </main>
  )
} 