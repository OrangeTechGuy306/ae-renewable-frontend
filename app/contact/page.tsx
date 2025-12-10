"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import ContactForm from "@/components/contact-form"
import ContactDetails from "@/components/contact-details"
import ContactMap from "@/components/contact-map"

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Get In Touch</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have questions about our solar solutions? Our team is ready to help you with your project.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2">
              <ContactForm />
            </div>
            <div>
              <ContactDetails />
            </div>
          </div>

          <ContactMap />
        </div>
      </main>
      <Footer />
    </>
  )
}
