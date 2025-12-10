import { CheckCircle2, TrendingUp, Wrench } from "lucide-react"

const features = [
  {
    title: "Precision Engineering",
    description: "Accurate calculations and detailed technical specifications for optimal system design.",
    icon: CheckCircle2,
  },
  {
    title: "Cost Efficiency",
    description: "Maximize system performance while minimizing component costs and installation time.",
    icon: TrendingUp,
  },
  {
    title: "Professional Tools",
    description: "Enterprise-grade tools trusted by solar engineers worldwide for complex projects.",
    icon: Wrench,
  },
]

export default function AboutUs() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">About A.E Renewable Ltd</h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
            A.E Renewable Ltd provides comprehensive solar engineering solutions for residential, commercial, and
            industrial projects. Our professional toolkit ensures accurate system sizing, optimal component selection,
            and reliable installation management.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div key={feature.title} className="flex flex-col gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
