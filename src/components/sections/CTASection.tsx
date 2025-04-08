import Link from 'next/link'

export default function CTASection() {
  return (
    <section className="py-10 sm:py-12 md:py-16 bg-primary text-white">
      <div className="container-custom text-center px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Ready to Start Your Project?</h2>
        <p className="max-w-2xl mx-auto mb-6 sm:mb-8 text-base sm:text-lg opacity-90">
          Connect with top-rated contractors in your area and get your renovation started right.
        </p>
        <Link href="/get-started" className="btn bg-white text-primary hover:bg-opacity-90 text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3" target="_blank" rel="noopener noreferrer">
          Reimagine Your Home
        </Link>
      </div>
    </section>
  )
} 