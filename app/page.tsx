import Header from "@/components/header"
import Hero from "@/components/hero"
import ToolHub from "@/components/tool-hub"
import AboutUs from "@/components/about-us"
import Footer from "@/components/footer"

export const metadata = {
  title: "A.E RENEWABLE LTD - Solar Solutions & Tools",
  description: "Complete suite of professional tools for solar system design, sizing, and installation management.",
}

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <ToolHub />
      <AboutUs />
      <Footer />
    </main>
  )
}
