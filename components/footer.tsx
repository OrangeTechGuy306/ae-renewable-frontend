import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-foreground text-primary-foreground py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="font-semibold mb-4">A.E RENEWABLE LTD</h4>
            <p className="text-sm opacity-80">Professional solar engineering solutions.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li>
                <Link href="/" className="hover:opacity-100 transition">
                  Tools
                </Link>
              </li>
              <li>
                <Link href="/calculator" className="hover:opacity-100 transition">
                  Calculator
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:opacity-100 transition">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li>
                <Link href="/contact" className="hover:opacity-100 transition">
                  Contact
                </Link>
              </li>
              <li>
                <a href="#" className="hover:opacity-100 transition">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-100 transition">
                  Terms
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li>
                <a href="#" className="hover:opacity-100 transition">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-100 transition">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-100 transition">
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm opacity-80">
          <p>&copy; 2025 A.E Renewable Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
