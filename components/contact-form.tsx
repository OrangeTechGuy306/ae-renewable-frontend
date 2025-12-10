"use client"

import type React from "react"

import { useState } from "react"
import { Mail, AlertCircle, CheckCircle2 } from "lucide-react"
import { useSubmitContact } from "@/hooks/useContact"

export default function ContactForm() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const submitContact = useSubmitContact()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    submitContact.mutate(formState, {
      onSuccess: () => {
        // Reset form
        setFormState({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        })
      },
    })
  }

  return (
    <div className="bg-card border border-border rounded-lg p-8">
      <div className="flex items-center gap-3 mb-6">
        <Mail className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold text-foreground">Send us a Message</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formState.name}
              onChange={handleChange}
              required
              disabled={submitContact.isPending}
              className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition disabled:opacity-50"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              required
              disabled={submitContact.isPending}
              className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition disabled:opacity-50"
              placeholder="john@example.com"
            />
          </div>
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-foreground mb-2">
            Phone Number (Optional)
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formState.phone}
            onChange={handleChange}
            disabled={submitContact.isPending}
            className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition disabled:opacity-50"
            placeholder="+234 XXX XXX XXXX"
          />
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-semibold text-foreground mb-2">
            Subject
          </label>
          <select
            id="subject"
            name="subject"
            value={formState.subject}
            onChange={handleChange}
            required
            disabled={submitContact.isPending}
            className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition disabled:opacity-50"
          >
            <option value="">Select a subject</option>
            <option value="general">General Inquiry</option>
            <option value="support">Technical Support</option>
            <option value="partnership">Partnership Opportunity</option>
            <option value="quote">Request a Quote</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-2">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formState.message}
            onChange={handleChange}
            required
            rows={6}
            disabled={submitContact.isPending}
            className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition resize-none disabled:opacity-50"
            placeholder="Tell us about your solar project..."
          />
        </div>

        {/* Status Messages */}
        {submitContact.isSuccess && (
          <div className="flex items-center gap-3 p-4 bg-primary/10 border border-primary rounded-lg">
            <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
            <p className="text-sm text-primary font-medium">Message sent successfully! We'll be in touch soon.</p>
          </div>
        )}

        {submitContact.isError && (
          <div className="flex items-center gap-3 p-4 bg-destructive/10 border border-destructive rounded-lg">
            <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
            <p className="text-sm text-destructive font-medium">
              {(submitContact.error as any)?.response?.data?.message || "Failed to send message. Please try again."}
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={submitContact.isPending}
          className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitContact.isPending ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  )
}
