"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Database, Home, BarChart3, Settings } from "lucide-react"

const navItems = [
  { label: "Home", href: "/dashboard", icon: Home },
  { label: "Components", href: "/dashboard/components", icon: Database },
  { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
]

export default function DashboardSidebar() {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 md:hidden p-2 hover:bg-input rounded-lg transition"
        aria-label="Toggle sidebar"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`w-64 bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } md:static fixed h-full md:h-screen z-40`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-sidebar-border mt-12 md:mt-0">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-sidebar-primary flex items-center justify-center">
              <span className="text-sidebar-primary-foreground font-bold text-sm">AE</span>
            </div>
            <div>
              <p className="font-bold text-sidebar-foreground text-sm">A.E RENEWABLE</p>
              <p className="text-xs text-sidebar-accent-foreground opacity-70">Engineering</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 text-sidebar-foreground hover:bg-sidebar-accent rounded-lg transition group"
              >
                <Icon className="w-5 h-5 text-sidebar-accent-foreground group-hover:text-sidebar-primary transition" />
                <span className="font-medium">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-sidebar-border">
          <div className="text-xs text-sidebar-accent-foreground opacity-70 space-y-1">
            <p className="font-semibold">Component Database</p>
            <p>Version 1.0.0</p>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 md:hidden z-30" onClick={() => setIsOpen(false)} aria-hidden="true" />
      )}
    </>
  )
}
