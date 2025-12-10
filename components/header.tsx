"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">AE</span>
          </div>
          <span className="font-semibold text-foreground hidden sm:inline">A.E RENEWABLE LTD</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-foreground hover:text-primary transition">
            Home
          </Link>
          <Link href="/calculator" className="text-foreground hover:text-primary transition">
            Calculator
          </Link>
          <Link href="/contact" className="text-foreground hover:text-primary transition">
            Contact
          </Link>
          {/* <Link
            href="/dashboard"
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition"
          >
            Dashboard
          </Link> */}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="absolute top-16 left-0 right-0 bg-card border-b border-border md:hidden">
            <div className="flex flex-col p-4 gap-4">
              <Link href="/" className="text-foreground hover:text-primary transition">
                Home
              </Link>
              <Link href="/calculator" className="text-foreground hover:text-primary transition">
                Calculator
              </Link>
              <Link href="/contact" className="text-foreground hover:text-primary transition">
                Contact
              </Link>
              {/* <Link
                href="/dashboard"
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition text-center"
              >
                Dashboard
              </Link> */}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
