"use client"

import { User, LogOut } from "lucide-react"

export default function DashboardHeader() {
  return (
    <header className="bg-card border-b border-border px-6 py-4 flex items-center justify-between">
      <div>
        <h1 className="text-xl font-bold text-foreground">Component Management System</h1>
        <p className="text-sm text-muted-foreground">Professional solar component database</p>
      </div>

      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 px-4 py-2 hover:bg-input rounded-lg transition">
          <User className="w-5 h-5 text-muted-foreground" />
          <span className="text-sm text-foreground">Admin</span>
        </button>
        <button className="flex items-center gap-2 px-4 py-2 text-destructive hover:bg-destructive/10 rounded-lg transition">
          <LogOut className="w-5 h-5" />
          <span className="text-sm">Logout</span>
        </button>
      </div>
    </header>
  )
}
