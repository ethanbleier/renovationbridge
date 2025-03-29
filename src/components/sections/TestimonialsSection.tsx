import Image from 'next/image'

export default function TestimonialsSection() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-cream">
      <div className="container-custom px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-3 sm:mb-4">What Our Clients Say</h2>
        <p className="text-center text-gray max-w-3xl mx-auto mb-8 sm:mb-12 text-sm sm:text-base">
          Don't just take our word for it — hear from homeowners who've used Renovation Bridge
        </p>
        
        <div className="relative">
          {/* Testimonial Cards - Carousel Style */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-lg shadow-lg overflow-visible transform transition-all hover:scale-105">
              <div className="bg-primary h-2 sm:h-3"></div>
              <div className="p-5 sm:p-8 pt-12 sm:pt-14 relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 -top-8 sm:-top-10">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center border-4 border-white shadow-md overflow-hidden">
                    <Image 
                      src="/images/profiles/kim-profile-pic.png"
                      alt="Kim C" 
                      width={80} 
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex justify-center mb-3 sm:mb-4">
                  <div className="flex text-yellow-400">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray italic mb-4 sm:mb-6 text-center text-xs sm:text-sm line-clamp-6 sm:line-clamp-none">
                  "I would recommend this company to anyone! I didn't know what I was getting with them in the best way possible. I expected that they would help me connect with qualified contractors in my area. I did not expect the level of support Renovation Bridge provided through our project. Their partnership was truly appreciated during our project and we felt heard and valued every step of the way. Thank you Renovation Bridge!!"
                </p>
                <div className="text-center">
                  <h4 className="font-bold text-base sm:text-lg">Kim C</h4>
                  <p className="text-gray text-xs sm:text-sm">Livermore</p>
                </div>
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-white rounded-lg shadow-lg overflow-visible transform transition-all hover:scale-105">
              <div className="bg-primary h-2 sm:h-3"></div>
              <div className="p-5 sm:p-8 pt-12 sm:pt-14 relative flex flex-col h-full">
                <div className="absolute left-1/2 transform -translate-x-1/2 -top-8 sm:-top-10">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center border-4 border-white shadow-md overflow-hidden">
                    <Image 
                      src="/images/profiles/amy-profile-pic.png" 
                      alt="Amy C" 
                      width={80} 
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex justify-center mb-3 sm:mb-4">
                  <div className="flex text-yellow-400">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray italic mb-4 sm:mb-6 text-center text-xs sm:text-sm flex-grow line-clamp-6 sm:line-clamp-none">
                  "Renovation Bridge is a great resource for finding a contractor that is right for you. They were great at getting me set up with qualified contractors for my project. I was able to get competitive quotes and had a great experience with the contractor I chose through Renovation Bridge. I highly recommend this service!"
                </p>
                <div className="text-center mt-auto">
                  <h4 className="font-bold text-base sm:text-lg">Amy C</h4>
                  <p className="text-gray text-xs sm:text-sm">Alamo</p>
                </div>
              </div>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-white rounded-lg shadow-lg overflow-visible transform transition-all hover:scale-105">
              <div className="bg-primary h-2 sm:h-3"></div>
              <div className="p-5 sm:p-8 pt-12 sm:pt-14 relative flex flex-col h-full">
                <div className="absolute left-1/2 transform -translate-x-1/2 -top-8 sm:-top-10">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center border-4 border-white shadow-md overflow-hidden">
                    <Image 
                      src="/images/profiles/jonah-profile-pic.png" 
                      alt="Jonah K" 
                      width={80} 
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex justify-center mb-3 sm:mb-4">
                  <div className="flex text-yellow-400">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray italic mb-4 sm:mb-6 text-center text-xs sm:text-sm flex-grow line-clamp-6 sm:line-clamp-none">
                  "I had nothing short of a fantastic experience working with Renovation Bridge to find a contractor for my project. The team was professional, responsive, and made the entire process smooth and hassle-free. They quickly connected me with a highly skilled contractor who exceeded my expectations in terms of quality, cost, and timeliness."
                </p>
                <div className="text-center mt-auto">
                  <h4 className="font-bold text-base sm:text-lg">Jonah K</h4>
                  <p className="text-gray text-xs sm:text-sm">Walnut Creek</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Carousel Navigation - For Visual Effect */}
          <div className="flex justify-center mt-6 sm:mt-8">
          </div>
        </div>
      </div>
    </section>
  )
} 