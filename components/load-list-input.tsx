"use client"

import { useState, useEffect } from "react"
import { Search, Plus } from "lucide-react"
import { useSearchComponents } from "@/hooks/useComponents"
import useDebounce from "@/hooks/useDebounce"
// import { useDebounce } from "@/hooks/useDebounce"

interface LoadListInputProps {
  onAddLoad: (name: string, wattage: number) => void
}

export default function LoadListInput({ onAddLoad }: LoadListInputProps) {
  const [search, setSearch] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)

  // Debounce search to avoid too many API calls
  const debouncedSearch = useDebounce(search, 300)

  // Search components from API
  const { data: searchResults, isLoading } = useSearchComponents(
    debouncedSearch,
    10
  )

  const components = searchResults?.data || []

  const handleSelect = (name: string, wattage: number) => {
    onAddLoad(name, wattage)
    setSearch("")
    setShowSuggestions(false)
  }

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-foreground mb-2">Search Appliances</label>
      <div className="relative">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="text"
              placeholder="Search for appliances..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setShowSuggestions(true)
              }}
              onFocus={() => setShowSuggestions(true)}
              className="w-full pl-10 pr-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {showSuggestions && search && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-lg z-10">
            {isLoading ? (
              <div className="p-4 text-center text-muted-foreground text-sm">Searching...</div>
            ) : components.length > 0 ? (
              <ul className="max-h-64 overflow-y-auto">
                {components
                  .filter(comp => comp.category === 'Appliance' && comp.average_wattage > 0)
                  .map((component) => (
                    <li key={component.id} className="border-b border-border last:border-b-0">
                      <button
                        onClick={() => handleSelect(component.product_name, component.average_wattage)}
                        className="w-full text-left px-4 py-3 hover:bg-primary/10 transition flex justify-between items-center group"
                      >
                        <span className="text-foreground">{component.product_name}</span>
                        <span className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">{component.average_wattage}W</span>
                          <Plus className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition" />
                        </span>
                      </button>
                    </li>
                  ))}
              </ul>
            ) : (
              <div className="p-4 text-center text-muted-foreground text-sm">No appliances found</div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
