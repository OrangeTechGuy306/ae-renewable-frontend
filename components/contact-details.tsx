import { MapPin, Phone, Mail, Clock } from "lucide-react"

export default function ContactDetails() {
  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-bold text-foreground mb-4">Contact Information</h3>

        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Address</p>
              <p className="text-foreground font-semibold">123 Solar Avenue, Energy City, EC 12345</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Phone className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Phone</p>
              <p className="text-foreground font-semibold">+1 (555) 123-4567</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Mail className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="text-foreground font-semibold">info@aerenewable.com</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Business Hours</p>
              <p className="text-foreground font-semibold">Mon - Fri: 9:00 AM - 6:00 PM</p>
              <p className="text-sm text-muted-foreground">Sat - Sun: Closed</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 rounded-lg p-6">
        <h4 className="font-semibold text-foreground mb-3">Response Time</h4>
        <p className="text-sm text-muted-foreground">
          We typically respond to inquiries within 24 business hours. For urgent matters, please call us directly.
        </p>
      </div>
    </div>
  )
}
