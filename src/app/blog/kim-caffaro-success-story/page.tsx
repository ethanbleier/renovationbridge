import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
  title: 'Redefining Home Renovation: The Success Story of Kim Caffaro | Renovation Bridge',
  description: 'Discover how Renovation Bridge helped Kim Caffaro transform her kitchen and caught the attention of NBC Bay Area.',
}

export default function KimCaffaroSuccessStoryPage() {
  const post = {
    title: "Redefining Home Renovation: The Untold Success Story of Kim Caffaro and NBC Bay Area's Interview",
    excerpt: "Discover the inspiring journey of Kim Caffaro and how Renovation Bridge helped her achieve her dream kitchen, gaining attention from NBC Bay Area.",
    author: 'Onn Matalon',
    authorRole: 'CEO & Founder',
    date: 'Feb 12, 2024',
    readTime: '3 min read',
    coverImage: '/images/blog/kim.jpeg',
    views: 7,
    comments: 0,
    tags: ['Success Story', 'Kitchen Renovation', 'NBC', 'Customer Experience'],
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
                <p>Home renovation can feel overwhelming. Homeowners often face tough decisions about budgeting, design, and finding the right team for their projects. However, amidst the chaos, stories emerge that highlight the power of collaboration and expert guidance. One such inspiring tale is that of Kim Caffaro and her journey to a dream kitchen, which gained attention from Chris Chamura of NBC Bay Area.</p>
                
                <h2>Meeting Kim at the Pleasanton Home Show</h2>
                
                <p>The journey began at the Pleasanton Home Show, a lively event that connects homeowners eager to refresh their spaces with contractors ready to showcase their skills. Our booth aimed to teach Bay Area homeowners about Renovation Bridge and how we can help them discover ideal contractors for their renovation needs.</p>
                
                <figure className="my-8 text-center">
                  <Image
                    src="/images/blog/booth.jpg"
                    alt="Our Booth At The Pleasanton Home Show!"
                    width={700}
                    height={400}
                    className="rounded-lg mx-auto"
                  />
                  <figcaption className="text-gray text-sm mt-2">Our Booth At The Pleasanton Home Show!</figcaption>
                </figure>
                
                <p>As we set up, excitement filled the atmosphere. It wasn't just about meeting potential customers but also discovering remarkable stories just waiting to be told. That's when Kim Caffaro walked into our booth, eager yet slightly daunted by the renovation process ahead. She had a clear vision for her kitchen but felt lost on how to begin.</p>
                
                <h2>Helping Kim on Her Renovation Journey</h2>
                
                <p>From the start, we recognized Kim's passion and determination. Listening to her dreams and inspirations, we knew the importance of connecting her with a contractor who could bring those ideas to life.</p>
                
                <p>Initially, we provided Kim with helpful resources and practical tips to kickstart her journey. For instance, we shared insights about setting a realistic budget and the different kitchen styles, such as modern minimalism or traditional elegance, that she could choose from. Our team then introduced her to a selection of experienced contractors who specialize in kitchen renovations.</p>
                
                <p>Kim's experience showcased the significance of having a strong support system while navigating home improvements—a principle at the core of Renovation Bridge's mission. Eventually, she found a team committed to crafting her dream kitchen, thanks to our streamlined contractor matching framework, which makes the selection easier and more efficient for homeowners.</p>
                
                <figure className="my-8 text-center">
                  <Image
                    src="/images/blog/kims-kitchen.jpg"
                    alt="Kim's New Kitchen"
                    width={700}
                    height={400}
                    className="rounded-lg mx-auto"
                  />
                  <figcaption className="text-gray text-sm mt-2">Kim's New Kitchen</figcaption>
                </figure>
                
                <h2>The NBC Bay Area Feature</h2>
                
                <p>As word of Kim's success spread, Chris Chamura from NBC Bay Area took notice. Chamura was intrigued by our innovative approach that reshapes the traditional renovation process, making it more user-friendly for homeowners like Kim.</p>
                
                <p>NBC Bay Area conducted an interview, believing this story would resonate with many residents facing similar renovation hurdles. Filming took place in Kim's beautifully renovated kitchen, where she shared her transformative experience with Renovation Bridge and the empowerment that came from finding the right contractor.</p>
                
                <p>During the interview, Kim articulated how Renovation Bridge made her renovation journey enjoyable rather than stressful. She emphasized that successful renovations are not solely about aesthetics; they hinge on building trust and strong connections with the people who help turn a house into a home.</p>
                
                <div className="my-8 aspect-video relative">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/956oI-dZcKQ?si=3alfIG0SGlCcxWx8&amp;controls=0" 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerPolicy="strict-origin-when-cross-origin" 
                    allowFullScreen
                    className="rounded-lg absolute inset-0"
                  ></iframe>
                  <figcaption className="text-gray text-sm mt-2 text-center">Our TV Slot Highlighting Kim's Project</figcaption>
                </div>
                
                <h2>Key Insights for Homeowners</h2>
                
                <p>Home renovation does not have to be a lonely or stressful undertaking. For those contemplating a renovation, here are essential insights from Kim Caffaro's experience that can simplify your journey:</p>
                
                <ul>
                  <li><strong>Gather Support:</strong> Use services like Renovation Bridge, talk to friends, or research online reviews for contractor recommendations. The more information you have, the better your decisions will be.</li>
                  <li><strong>Communicate Openly:</strong> Be upfront about your vision and budget. This helps ensure everyone is aligned from the beginning, reducing the likelihood of misunderstandings during the project.</li>
                </ul>
                
                <p>Kim's journey illustrates how vital guidance, understanding, and effective communication can be in realizing the home of your dreams.</p>
                
                <h2>The Journey Ahead</h2>
                
                <p>The essence of Kim Caffaro's story is about more than just achieving a stunning kitchen. It serves as a reminder of the powerful connections formed during home renovations. With the support of Renovation Bridge and a dedicated team, homeowners are finding not just contractors, but partners in their quest to make their houses truly feel like home.</p>
                
                <p>This experience inspires us to continue promoting transparency and comfort in the renovation process. As you embark on your renovation journey, take a lesson from Kim's experience and explore the endless possibilities awaiting you in your dream project.</p>
                
                <p>Home is where the heart is, and with the right team by your side, your dream home is just a project away. Happy renovating!</p>
                
                <div className="bg-lavender/30 p-6 rounded-lg my-8 text-center">
                  <h3 className="text-xl font-bold mb-3">Want to try out Renovation Bridge for yourself?</h3>
                  <Link href="/get-started" className="inline-block bg-primary text-white font-medium py-3 px-6 rounded-lg hover:bg-primary-dark transition-colors">
                    Click Here To Get Started Today!
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
                  <button className="flex items-center text-primary hover:text-primary-dark transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    Like
                  </button>
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
                      src="/images/blog/contractor-selection.jpg"
                      alt="Choosing the Right Contractor"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <Link href="/blog/choosing-the-right-contractor" className="font-bold hover:text-primary transition-colors line-clamp-2">
                      Choosing the Right Contractor for Your Home Renovation
                    </Link>
                    <p className="text-sm text-gray mt-1">Apr 17 • 2 min read</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Testimonials */}
            <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
              <h3 className="text-xl font-bold border-b pb-4 mb-6">Testimonials</h3>
              <div className="space-y-6">
                <div className="bg-lavender/20 p-4 rounded-lg">
                  <p className="italic text-gray-700 mb-3">"Renovation Bridge made finding a contractor so easy! I was nervous about my kitchen remodel, but they matched me with the perfect team. Couldn't be happier with the results!"</p>
                  <p className="font-semibold">— Jennifer S., San Francisco</p>
                </div>
                <div className="bg-lavender/20 p-4 rounded-lg">
                  <p className="italic text-gray-700 mb-3">"After struggling to find reliable contractors for months, Renovation Bridge connected me with professionals who understood my vision and budget. My bathroom renovation was completed on time and looks amazing."</p>
                  <p className="font-semibold">— Michael L., Oakland</p>
                </div>
              </div>
            </div>
            
            {/* CTA Box */}
            <div className="bg-primary text-white rounded-xl p-6 shadow-lg overflow-hidden relative">
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-4">Ready for Your Success Story?</h3>
                <p className="mb-6 text-white/90">
                  Let us connect you with trusted contractors who can bring your renovation vision to life.
                </p>
                <Link href="/get-started" className="inline-block bg-white text-primary font-medium py-2 px-6 rounded-lg hover:bg-opacity-90 transition-colors">
                  Start Your Journey
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
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Create Your Own Renovation Success Story</h2>
          <p className="text-gray max-w-2xl mx-auto mb-8">
            Join homeowners like Kim who have transformed their spaces with the help of Renovation Bridge's expert contractor matching service.
          </p>
          <Link href="/get-started" className="btn btn-primary">
            Get Started Today
          </Link>
        </div>
      </div>
    </main>
  )
} 