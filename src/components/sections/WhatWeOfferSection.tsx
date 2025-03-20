export default function WhatWeOfferSection() {
  return (
    <section id="what-we-offer-section" className="py-20 bg-white">
      <div className="container-custom">
        <h2 className="text-3xl font-bold text-center mb-4">What We Offer</h2>
        <p className="text-center text-gray max-w-3xl mx-auto mb-12">
          Our comprehensive services designed to make your renovation journey seamless
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Connections */}
          <div className="bg-cream rounded-lg p-8 shadow-lg overflow-hidden transform transition-all hover:scale-105 flex flex-col h-full">
            <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Connections</h3>
            <p className="text-gray flex-grow">
              Our mission is to help you find the perfect contractor for any home renovation project. Using our boutique algorithm we are able to connect you with a contractor that will fit your project like a glove.
            </p>
          </div>
          
          {/* Professional Advice */}
          <div className="bg-cream rounded-lg p-8 shadow-lg overflow-hidden transform transition-all hover:scale-105 flex flex-col h-full">
            <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Professional Advice</h3>
            <p className="text-gray flex-grow">
              Our Team of local experts have seen almost every single type of project with years of experience in Bay Area renovations, so no matter the size of your question one of our pros is always there for you.
            </p>
          </div>
          
          {/* Negotiations */}
          <div className="bg-cream rounded-lg p-8 shadow-lg overflow-hidden transform transition-all hover:scale-105 flex flex-col h-full">
            <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Negotiations</h3>
            <p className="text-gray flex-grow">
              Due to our extensive vetting process we are able develop a great connection with each of our contractors giving us the upper hand in negotiations allowing us to make sure you as the home owners always get the best deal.
            </p>
          </div>
          
          {/* A Partner */}
          <div className="bg-cream rounded-lg p-8 shadow-lg overflow-hidden transform transition-all hover:scale-105 flex flex-col h-full">
            <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">A Partner</h3>
            <p className="text-gray flex-grow">
              A home renovation is a big investment, and having someone you trust makes all the difference. That's where we come in. Our pros are available 24/7 to support you every step of the way.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
} 