export default function Hero() {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 via-background to-secondary/5 overflow-hidden">
      {/* Subtle animated background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-40 -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl opacity-40 translate-y-1/2 -translate-x-1/2" />

      <div className="relative max-w-4xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
          Professional Solar Engineering <span className="text-primary">Solutions</span>
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed">
          Complete suite of professional tools for solar system design, sizing, and installation management.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition font-semibold">
            Get Started
          </button>
          <button className="px-8 py-3 border-2 border-primary text-primary rounded-lg hover:bg-primary/5 transition font-semibold">
            Learn More
          </button>
        </div>
      </div>
    </section>
  )
}
