"use client"
import Header from "@/components/header"
import Footer from "@/components/footer"
import LoadCalculator from "@/components/load-calculator"

export default function CalculatorPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">System Sizing Calculator</h1>
            <p className="text-lg text-muted-foreground">
              Professional solar load calculation and system recommendation tool
            </p>
          </div>
          <LoadCalculator />
        </div>
      </main>
      <Footer />
    </>
  )
}
