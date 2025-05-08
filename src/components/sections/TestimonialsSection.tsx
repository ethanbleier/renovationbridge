import Image from 'next/image'

export default function TestimonialsSection() {
  // Example shortened testimonials - replace with actual concise versions
  const testimonials = [
    {
      quote: "Renovation Bridge connected us with highly qualified contractors, providing exceptional support throughout our project. Their partnership was invaluable.",
      name: "Kim C",
      location: "Livermore"
    },
    {
      quote: "A fantastic resource for finding the right contractor. They streamlined the process, connected me with qualified pros, and ensured competitive quotes.",
      name: "Amy C",
      location: "Alamo"
    },
    {
      quote: "Met and exceeded expectations. The streamlined process removed a massive weight, and the personal support was outstanding. Highly recommend.",
      name: "Mick Jordan",
      location: "Walnut Creek"
    }
  ];

  return (
    <section id="testimonials-section" className="py-16 sm:py-20 md:py-24 bg-gray-50 text-gray-900">
      <div className="container-custom px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4 sm:mb-5 text-gray-900">
          What Our Clients Say
        </h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10 sm:mb-16 text-base sm:text-lg">
          Hear from homeowners who leverage Renovation Bridge
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-lg p-6 sm:p-8 transform transition-all duration-300 ease-in-out hover:bg-gray-100 hover:shadow-xl border border-transparent hover:border-primary flex flex-col h-full"
            >
              <blockquote className="text-gray-700 italic mb-6 text-base relative flex-grow">
                <svg className="absolute top-0 left-0 transform -translate-x-3 -translate-y-2 h-8 w-8 text-gray-400" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                  <path d="M9.333 7h-2.666v18h10v-10h-7.333v-8zM25.333 7h-2.666v18h10v-10h-7.333v-8z" />
                </svg>
                <p className="pl-8">{testimonial.quote}</p> 
              </blockquote>
              <div className="text-right">
                <h4 className="font-semibold text-lg text-gray-900">{testimonial.name}</h4>
                <p className="text-gray-500 text-sm">{testimonial.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 