"use client"

export default function ContactMap() {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-foreground mb-6">Find Us</h2>
      <div className="bg-card border border-border rounded-lg overflow-hidden h-96">
        <iframe
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2219901290355!2d-74.00601!3d40.71282!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a317d5e2f2d%3A0x5e5d5d5d5d5d5d5d!2s123%20Solar%20Avenue%2C%20New%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1234567890"
        />
      </div>
    </div>
  )
}
