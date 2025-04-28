import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
  title: 'Choosing the Right Contractor for Your Home Renovation | Renovation Bridge',
  description: 'Learn about the different types of contractors and how to choose the right one for your home renovation project.',
}

export default function ChoosingTheRightContractorPage() {
  const post = {
    title: "Choosing the Right Contractor for Your Home Renovation: A Guide by Renovation Bridge",
    excerpt: "When it comes to home renovations, one of the most crucial decisions you'll make is choosing the right contractor. Discover the pros and cons of different types of contractors to help you make an informed decision.",
    author: 'Onn Matalon',
    authorRole: 'CEO & Founder',
    date: 'Apr 17, 2024',
    readTime: '5 min read',
    coverImage: '/images/blog/contractor-selection.jpg',
    tags: ['Contractors', 'Renovation', 'Home Improvement', 'Guide'],
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
                <p>When it comes to home renovations, one of the most crucial decisions you'll make is choosing the right contractor. With so many options available, it can be overwhelming to determine which type of contractor is the best fit for your project. Today, we'll break down the pros and cons of three common types of contractors to help you make an informed decision.</p>
                
                <h2>Full-Service Contractors:</h2>
                
                <p>A full-service contractor takes care of every aspect of your renovation project, from start to finish. They handle everything, allowing you to sit back and relax while your dream home becomes a reality.</p>
                
                <h3>Pros:</h3>
                <ul>
                  <li><strong>Minimal stress:</strong> With a full-service contractor, you won't have to worry about managing subcontractors or coordinating timelines.</li>
                  <li><strong>On-time and under budget:</strong> Full-service contractors are experts at project management, ensuring that your renovation stays on track and within your budget.</li>
                  <li><strong>Ideal for large projects:</strong> If you're undertaking a major renovation, a full-service contractor is the way to go.</li>
                </ul>
                
                <h3>Cons:</h3>
                <ul>
                  <li><strong>Higher price tag:</strong> While the convenience is undeniable, full-service contractors typically come with a higher cost compared to other options.</li>
                </ul>
                
                <h2>Local General Contractors (GCs):</h2>
                
                <p>Local GCs offer many of the benefits of full-service contractors but may be more accessible for smaller projects or tighter budgets.</p>
                
                <h3>Pros:</h3>
                <ul>
                  <li><strong>Dedicated GC oversight:</strong> Local GCs provide the guidance and expertise of a general contractor, ensuring that your project is in good hands.</li>
                  <li><strong>Cost-effective upfront:</strong> Local GCs often have lower initial costs compared to full-service contractors.</li>
                  <li><strong>Utilize their own subcontractors:</strong> Local GCs may have a network of trusted subcontractors to work with.</li>
                </ul>
                
                <h3>Cons:</h3>
                <ul>
                  <li><strong>More hands-on involvement:</strong> You may need to be more involved in the day-to-day management of the project compared to a full-service contractor.</li>
                  <li><strong>Potential for delays and budget overruns:</strong> Without the same level of project management as full-service contractors, timelines and budgets may be more prone to deviations.</li>
                  <li><strong>Upfront payment:</strong> Some local GCs may require payment upfront or at various stages of the project.</li>
                </ul>
                
                <h2>Pick-up Contractors:</h2>
                
                <p>Pick-up contractors offer the most budget-friendly option for renovations but require the most involvement from homeowners.</p>
                
                <h3>Pros:</h3>
                <ul>
                  <li><strong>Cost-effective:</strong> Pick-up contractors typically offer the lowest prices for renovation projects.</li>
                </ul>
                
                <h3>Cons:</h3>
                <ul>
                  <li><strong>Homeowner as GC:</strong> With pick-up contractors, you'll need to take on the role of general contractor, coordinating subcontractors and managing the project yourself.</li>
                  <li><strong>Potential for delays and budget overruns:</strong> Without professional project management, timelines and budgets may be at risk of exceeding projections.</li>
                </ul>
                
                <h2>Conclusion:</h2>
                
                <p>At Renovation Bridge, we understand the importance of choosing the right contractor for your renovation project. Whether you prefer the convenience of a full-service contractor, the guidance of a local GC, or the affordability of a pick-up contractor, our expert team is here to help you make the best choice for your needs. Contact us today to schedule a consultation and take the first step toward your dream renovation.</p>
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
                      src="/images/blog/budget-planning.jpg"
                      alt="Renovation Budget Planning"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <Link href="/blog/pricing-calculator-budgeting" className="font-bold hover:text-primary transition-colors line-clamp-2">
                      How Can Renovation Bridge's Pricing Calculator Simplify Your Home Improvement Budgeting?
                    </Link>
                    <p className="text-sm text-gray mt-1">Feb 11 • 3 min read</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src="/images/blog/kims-kitchen.jpg"
                      alt="Kim Caffaro Success Story"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <Link href="/blog/kim-caffaro-success-story" className="font-bold hover:text-primary transition-colors line-clamp-2">
                      Redefining Home Renovation: The Success Story of Kim Caffaro
                    </Link>
                    <p className="text-sm text-gray mt-1">Feb 12 • 3 min read</p>
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
                <Link href="#" className="block py-2 px-4 bg-lavender rounded-lg transition-colors">
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
                <h3 className="text-xl font-bold mb-4">Ready to Find Your Perfect Contractor?</h3>
                <p className="mb-6 text-white/90">
                  Let Renovation Bridge match you with the right contractor for your specific project needs.
                </p>
                <Link href="/get-started" className="inline-block bg-white text-primary font-medium py-2 px-6 rounded-lg hover:bg-opacity-90 transition-colors">
                  Get Matched Now
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
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Start Your Renovation Journey with Confidence</h2>
          <p className="text-gray max-w-2xl mx-auto mb-8">
            Ready to find the perfect contractor for your project? Let Renovation Bridge's expert matchmaking service connect you with the right professionals.
          </p>
          <Link href="/get-started" className="btn btn-primary">
            Build Your Vision
          </Link>
        </div>
      </div>
    </main>
  )
} 