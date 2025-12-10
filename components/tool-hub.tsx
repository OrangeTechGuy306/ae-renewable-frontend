import { Zap, Cpu, Gauge, Cable, Package, Database } from "lucide-react"

const tools = [
  {
    title: "Integrated Tool Hub",
    description: "Centralized platform for all your solar engineering calculations and component management needs.",
    icon: Database,
  },
  {
    title: "Panel Sizing Tool",
    description: "Accurately calculate optimal solar panel quantities and configurations for your project.",
    icon: Zap,
  },
  {
    title: "Charge Controller Sizer",
    description: "Determine the correct charge controller specifications based on your system requirements.",
    icon: Cpu,
  },
  {
    title: "Breaker Selection Tool",
    description: "Select appropriate circuit breakers and protection devices for safe system operation.",
    icon: Gauge,
  },
  {
    title: "Cable Sizer",
    description: "Calculate correct cable gauge and sizes for optimal power transmission and safety.",
    icon: Cable,
  },
  {
    title: "Equipment Kits",
    description: "Pre-configured equipment packages for rapid system design and procurement.",
    icon: Package,
  },
]

export default function ToolHub() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Integrated Tool Hub</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Access six powerful tools designed for professional solar engineers
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => {
            const Icon = tool.icon
            return (
              <div
                key={tool.title}
                className="p-6 bg-card border border-border rounded-lg hover:border-primary/50 hover:shadow-lg transition group cursor-pointer"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{tool.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{tool.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
