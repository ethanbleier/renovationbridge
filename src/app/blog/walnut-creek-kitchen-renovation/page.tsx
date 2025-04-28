import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
  title: "Walnut Creek Kitchen Renovation – Transform Your Home's Heart | Renovation Bridge",
  description: 'Discover how a Walnut Creek kitchen renovation can transform your space with premium quality, expert design, and trusted contractors through Renovation Bridge.',
}

export default function WalnutCreekKitchenRenovationPage() {
  const post = {
    title: "Walnut Creek Kitchen Renovation – Transform Your Home's Heart with Premium Quality",
    excerpt: "Learn how a kitchen renovation in Walnut Creek can elevate your home's value and lifestyle with premium materials and expert craftsmanship.",
    author: 'Onn Matalon',
    authorRole: 'CEO & Founder',
    date: 'Feb 15, 2024',
    readTime: '3 min read',
    coverImage: '/images/blog/interior-1.jpg',
    tags: ['Kitchen', 'Renovation', 'Walnut Creek', 'Premium Design'],
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
                alt="Elegant kitchen with custom white cabinetry, marble countertops, and premium appliances"
                fill
                className="object-cover"
                priority
              />
            </div>
            
            {/* Blog Content */}
            <div className="bg-white rounded-xl p-6 md:p-10 shadow-lg mb-8">
              <div className="prose prose-lg max-w-none">
                <p>A kitchen renovation in Walnut Creek isn't just about updating an outdated space—it's about creating the heart of your home where family and friends gather, meals are prepared with love, and memories are made. At Renovation Bridge, we connect Walnut Creek homeowners with premier kitchen renovation contractors who understand the unique blend of luxury and functionality that defines homes in this desirable community.</p>
                
                <h2>Why Choose a Kitchen Renovation in Walnut Creek?</h2>
                <p>Walnut Creek homes are known for their quality and attention to detail. A premium kitchen renovation can:</p>
                <ul>
                  <li>Significantly increase your property value in this competitive market</li>
                  <li>Create a stunning centerpiece that reflects the upscale character of Walnut Creek</li>
                  <li>Improve functionality with innovative storage and premium appliances</li>
                  <li>Transform your daily experience with elegant, durable materials</li>
                </ul>
                
                <h2>Premium Kitchen Renovation Features for Walnut Creek Homes</h2>
                <p>When you work with Renovation Bridge's vetted contractors in Walnut Creek, you gain access to the finest kitchen renovation options:</p>
                
                <h3>Custom Cabinetry</h3>
                <p>Our network includes craftsmen who create bespoke cabinetry that maximizes your kitchen's storage while maintaining a sleek, sophisticated appearance. From inset doors to custom organizational systems, these cabinets are built to last for decades.</p>
                
                <h3>Luxury Materials</h3>
                <p>Walnut Creek kitchens deserve the best—whether that's quartzite countertops, hardwood flooring, or custom tile work. Our contractors source premium materials that withstand the test of time while making a stunning visual impact.</p>
                
                <h3>Innovative Appliance Packages</h3>
                <p>From wine refrigerators to professional-grade ranges, the right appliances elevate both the function and value of your Walnut Creek kitchen. Our contractors can guide you through selecting and integrating high-performance appliances.</p>
                
                <h3>Intelligent Lighting Design</h3>
                <p>Layer ambient, task, and accent lighting to create the perfect atmosphere for any occasion. Smart lighting systems can be programmed to your preferences, enhancing both the beauty and functionality of your space.</p>
                
                <h2>The Renovation Bridge Process for Walnut Creek Kitchen Renovations</h2>
                <p>Renovating your Walnut Creek kitchen is straightforward when you partner with Renovation Bridge:</p>
                
                <h3>1. Complimentary Consultation</h3>
                <p>Share your vision, budget, and timeline with our experts. We'll listen carefully to understand exactly what you're looking for in your Walnut Creek kitchen renovation.</p>
                
                <h3>2. Contractor Matching</h3>
                <p>We'll connect you with 2-3 pre-screened Walnut Creek contractors who specialize in kitchen renovations matching your style and specifications. Each has been thoroughly vetted for license, insurance, expertise, and customer satisfaction.</p>
                
                <h3>3. Compare Proposals</h3>
                <p>Receive detailed bids from each contractor. Your Renovation Bridge advisor will help you evaluate the proposals, ensuring you understand the value offered by each option.</p>
                
                <h3>4. Seamless Project Execution</h3>
                <p>Once you've selected your contractor, they'll guide you through design, material selection, and the renovation process. Your kitchen will be transformed with minimal disruption to your daily life.</p>
                
                <h2>Why Walnut Creek Homeowners Trust Renovation Bridge</h2>
                <p>Our commitment to excellence has made us the preferred choice for kitchen renovations in Walnut Creek:</p>
                <ul>
                  <li><strong>Local Expertise:</strong> Our contractors understand Walnut Creek's architectural styles and homeowner preferences.</li>
                  <li><strong>Quality Assurance:</strong> Every contractor in our network maintains the highest standards of craftsmanship.</li>
                  <li><strong>Stress-Free Process:</strong> We handle the contractor vetting and matching, so you can focus on the exciting aspects of your renovation.</li>
                  <li><strong>Exceptional Results:</strong> Our goal is your complete satisfaction with a kitchen that enhances your home and lifestyle.</li>
                </ul>
                
                <h2>Start Your Walnut Creek Kitchen Renovation Today</h2>
                <p>Ready to transform the heart of your home? Renovation Bridge is here to connect you with Walnut Creek's finest kitchen renovation contractors. Our service is complimentary, and there's no obligation to proceed until you find the perfect match for your project.</p>
                
                <div className="bg-lavender/30 p-6 rounded-lg my-8 text-center">
                  <h3 className="text-xl font-bold mb-3">Ready to elevate your Walnut Creek kitchen?</h3>
                  <p className="mb-4">Call us at <a href="tel:9256937590" className="text-primary hover:text-primary-dark transition-colors">(925) 693-7590</a></p>
                  <p className="mb-4">or click below to begin your renovation!</p>
                  <Link href="/get-started" className="inline-block bg-primary text-white font-medium py-3 px-8 rounded-lg hover:bg-primary-dark hover:text-white/90 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl no-underline flex items-center justify-center gap-2">
                    Get Started
                  </Link>
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
                      src="/images/blog/kitchen-5.jpg"
                      alt="San Jose Kitchen Renovation"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <Link href="/blog/san-jose-kitchen-renovation" className="font-bold hover:text-primary transition-colors line-clamp-2">
                      San Jose Kitchen Renovation – Transform Your Space with Expert Craftsmanship
                    </Link>
                    <p className="text-sm text-gray mt-1">Feb 19 • 2 min read</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src="/images/blog/kitchen-2.jpg"
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
                  Let us connect you with top-rated Walnut Creek kitchen renovation experts today.
                </p>
                <Link href="/get-started" className="inline-block bg-white text-primary font-medium py-2 px-6 rounded-lg hover:bg-opacity-90 transition-colors">
                  Plan Your Perfect Remodel
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
            Take the first step toward your dream kitchen by connecting with our network of top-rated Walnut Creek contractors.
          </p>
          <Link href="/get-started" className="btn btn-primary">
            Maximize Your Investment
          </Link>
        </div>
      </div>
    </main>
  )
} 