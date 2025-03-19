import Link from 'next/link'

export default function CTASection() {
  return (
    <section className="py-16 bg-primary text-white">
      <div className="container-custom text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
        <p className="max-w-2xl mx-auto mb-8 text-lg opacity-90">
          Connect with top-rated contractors in your area and get your renovation started right.
        </p>
        <Link href="/get-started" className="btn bg-white text-primary hover:bg-opacity-90">
          Get Started Today
        </Link>
      </div>
    </section>
  )
} 