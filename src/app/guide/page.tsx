import Image from 'next/image'
import Link from 'next/link'

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
    <main className="container-custom py-12 md:py-20">
      {/* Back Button */}
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back
        </Link>
      </div>
      
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Renovation Guide</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Your comprehensive resource for planning, executing, and enjoying your home renovation project.
        </p>
      </section>
      
      <section className="mb-16">
        <div className="bg-lavender/20 rounded-xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-semibold mb-4">Why This Guide?</h2>
            <p className="text-gray-700 mb-4">
              Renovation projects can be overwhelming, especially for first-timers. We've created this guide to help you navigate 
              every step of the renovation process with confidence.
            </p>
            <p className="text-gray-700 mb-6">
              Based on our extensive experience and customer feedback, we've compiled the most useful information 
              to ensure your renovation journey is as smooth as possible.
            </p>
            <Link href="#topics" className="btn btn-primary">
              Explore Topics
            </Link>
          </div>
          <div className="md:w-1/2 relative h-64 md:h-80 w-full">
            <Image
              src="/images/guide/guide-preview-1.png"
              alt="Home renovation in progress"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      </section>
      
      <section id="topics" className="mb-16">
        <h2 className="text-3xl font-semibold mb-8 text-center">Guide Topics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guideTopics.map((topic) => (
            <div key={topic.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 flex flex-col">
              <div className="w-12 h-12 bg-lavender/20 rounded-full flex items-center justify-center mb-4">
                <Image src={topic.icon} alt="" width={24} height={24} />
              </div>
              <h3 className="text-xl font-medium mb-2">{topic.title}</h3>
              <p className="text-gray-600 mb-4 flex-grow">{topic.description}</p>
              <Link href={`/guide/${topic.id}`} className="text-primary font-medium hover:underline inline-flex items-center">
                Read more
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </section>
      
      <section className="bg-gray-50 rounded-xl p-8 md:p-12">
        <h2 className="text-3xl font-semibold mb-6 text-center">Need Personalized Help?</h2>
        <p className="text-center text-gray-700 max-w-2xl mx-auto mb-8">
          If you have specific questions or need personalized guidance for your renovation project, 
          our team of experts is ready to help.
        </p>
        <div className="flex justify-center">
          <Link href="/get-started" className="btn btn-primary mr-4">
            Get Started
          </Link>
          <Link href="/how-it-works" className="btn btn-outline">
            Learn More
          </Link>
        </div>
      </section>
    </main>
  )
} 