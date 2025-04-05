import Image from 'next/image'
import Link from 'next/link'
import GuideDownloadForm from '@/components/forms/GuideDownloadForm'

export const metadata = {
  title: 'Renovation Guide | Renovation Bridge',
  description: 'Your complete guide to home renovation with Renovation Bridge.',
}

const guideTopics = [
  {
    id: 'getting-started',
    title: 'Getting Started with Your Renovation',
    description: 'Everything you need to know before starting your home renovation project.',
    icon: '/images/icons/compass.svg',
  },
  {
    id: 'budgeting',
    title: 'Budgeting for Success',
    description: 'How to create and stick to a renovation budget that works for your situation.',
    icon: '/images/icons/calculator.svg',
  },
  {
    id: 'contractor-selection',
    title: 'Selecting the Right Contractor',
    description: 'Tips and strategies for finding and vetting the perfect contractor for your project.',
    icon: '/images/icons/handshake.svg',
  },
  {
    id: 'timeline-planning',
    title: 'Planning Your Timeline',
    description: 'Realistic timelines for different types of renovation projects and how to manage delays.',
    icon: '/images/icons/calendar.svg',
  },
  {
    id: 'design-choices',
    title: 'Making Design Choices',
    description: 'Guidelines for selecting materials, colors, and finishes that will stand the test of time.',
    icon: '/images/icons/palette.svg',
  },
  {
    id: 'living-through-renovation',
    title: 'Living Through a Renovation',
    description: 'Practical advice for maintaining your sanity when living in a construction zone.',
    icon: '/images/icons/home.svg',
  }
];

export default function GuidePage() {
  return (
    <main className="relative min-h-screen scroll-smooth">
      {/* Background image - only for hero section */}
      <div className="hidden md:block absolute top-0 left-0 right-0 h-[330px] z-0">
        <Image 
          src="/images/guide/multiple.png" 
          alt="Background" 
          fill 
          className="object-cover opacity-15"
          priority
        />
      </div>
      
      {/* Add a visual divider */}
      <div className="hidden md:block absolute top-[330px] left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-gray-200 to-transparent z-0"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back
          </Link>
        </div>
        
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Renovation Guide</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
            Your comprehensive resource for planning, executing, and enjoying your home renovation project.
          </p>
        </section>
        
        {/* Premium Guide Download Section - Above the fold for lead capture */}
        <section id="download-guide" className="mb-20">
          <div className="bg-gradient-to-r from-blue-50 to-lavender/30 shadow-xl p-8 md:p-12 rounded-2xl border border-gray-100">
            <div className="flex flex-col-reverse lg:flex-row items-center gap-10">
              <div className="w-full lg:w-3/5 z-10">
                <div className="flex items-center mb-4">
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-2">FREE DOWNLOAD</span>
                  <span className="bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-0.5 rounded-full">PREMIUM CONTENT</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-semibold mb-4 tracking-tight">Complete Renovation Guide</h2>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Get our comprehensive renovation guide with expert tips, checklists, and planning templates to make your renovation project a success.
                </p>
                <ul className="mb-6 space-y-3">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="flex-1">Step-by-step renovation planning framework</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="flex-1">Budgeting templates and cost breakdowns</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="flex-1">Contractor selection checklist</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="flex-1">Timeline planning guide with Gantt chart template</span>
                  </li>
                </ul>
                
                {/* Visual guide mockup for small screens */}
                <div className="block lg:hidden mb-6 relative">
                  <div className="relative w-full max-w-[220px] mx-auto">
                    <div className="relative bg-white p-2 rounded-lg shadow-xl">
                      <Image
                        src="/images/guide/guide-preview-2.png"
                        alt="Complete Renovation Guide Cover"
                        width={220}
                        height={280}
                        className="rounded object-cover"
                      />
                      <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold py-1 px-2 rounded-bl-lg rounded-tr-lg">FREE</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-2/5">
                <div className="flex flex-col items-center">
                  {/* Visual guide mockup with clean design */}
                  <div className="relative mb-8">
                    <div className="relative bg-white p-2 rounded-lg shadow-xl">
                      <Image
                        src="/images/guide/guide-preview-2.png"
                        alt="Complete Renovation Guide Cover"
                        width={240}
                        height={320}
                        className="rounded object-cover"
                      />
                      <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold py-1 px-2 rounded-bl-lg rounded-tr-lg">FREE</div>
                    </div>
                  </div>
                  <GuideDownloadForm 
                    guideTitle="Complete Home Renovation Guide" 
                    guideType="renovation-planner" 
                    downloadUrl="/pdfs/guide.pdf"
                    buttonText="Download Free Guide"
                    successHeading="Your guide is ready!"
                    successMessage="Thanks for your interest in a successful renovation"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="mb-20 pt-6">
          <div className="bg-white shadow-xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-10 rounded-2xl border border-gray-100">
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-semibold mb-6 tracking-tight">Why This Guide?</h2>
              <p className="text-gray-700 mb-5 leading-relaxed">
                Renovation projects can be overwhelming, especially for first-timers. We've created this guide to help you navigate 
                every step of the renovation process with confidence.
              </p>
              <p className="text-gray-700 mb-8 leading-relaxed">
                Based on our extensive experience and customer feedback, we've compiled the most useful information 
                to ensure your renovation journey is as smooth as possible.
              </p>
              <Link href="#topics" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 shadow-sm">
                Explore Topics
              </Link>
            </div>
            <div className="md:w-1/2 relative h-64 md:h-96 w-full rounded-xl overflow-hidden shadow-2xl transform transition-transform hover:scale-[1.02] duration-300">
              <Image
                src="/images/guide/guide-preview-2.png"
                alt="Home renovation in progress"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>
        
        <section id="topics" className="mb-20 scroll-mt-20">
          <h2 className="text-3xl md:text-4xl font-semibold mb-10 text-center tracking-tight">Guide Topics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {guideTopics.map((topic) => (
              <div key={topic.id} className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 flex flex-col h-full transform hover:-translate-y-1">
                <div className="w-14 h-14 bg-lavender/20 rounded-full flex items-center justify-center mb-6">
                  <Image src={topic.icon} alt="" width={28} height={28} />
                </div>
                <h3 className="text-xl font-semibold mb-3">{topic.title}</h3>
                <p className="text-gray-600 mb-6 flex-grow leading-relaxed">{topic.description}</p>
                <a href="#download-guide" className="group text-blue-600 font-medium hover:text-blue-800 inline-flex items-center transition-colors">
                  Read more
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 transform transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </section>
        
        {/* Secondary CTA for Guide Download - Strategic placement after browsing topics */}
        <section className="mb-20">
          <div className="bg-gradient-to-r from-lavender/20 to-blue-50 shadow-lg p-8 rounded-xl text-center">
            <h3 className="text-2xl font-semibold mb-3">Want to take this guide with you?</h3>
            <p className="mb-5 text-gray-700 max-w-2xl mx-auto">
              Download our complete renovation guide PDF to reference offline and share with your family or contractor.
            </p>
            <a href="#download-guide" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Get Your Free Guide
            </a>
          </div>
        </section>
        
        <section className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-12 mb-10">
          <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-center tracking-tight">Need Personalized Help?</h2>
          <p className="text-center text-gray-700 max-w-2xl mx-auto mb-10 leading-relaxed">
            If you have specific questions or need personalized guidance for your renovation project, 
            our team of experts is ready to help.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/get-started" className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 shadow-md">
              Get Started
            </Link>
            <Link href="/how-it-works" className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200 shadow-sm">
              Learn More
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
} 