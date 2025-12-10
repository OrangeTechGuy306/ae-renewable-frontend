"use client"

import { X } from "lucide-react"
import type { LoadItem } from "./load-calculator"

interface LoadScheduleTableProps {
  loads: LoadItem[]
  onRemoveLoad: (id: string) => void
  onUpdateLoad: (id: string, hoursPerDay: number) => void
}

export default function LoadScheduleTable({ loads, onRemoveLoad, onUpdateLoad }: LoadScheduleTableProps) {
  return (
    <div className="overflow-x-auto mt-6">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 px-4 font-semibold text-foreground">Appliance Name</th>
            <th className="text-left py-3 px-4 font-semibold text-foreground">Wattage (W)</th>
            <th className="text-left py-3 px-4 font-semibold text-foreground">Hours/Day</th>
            <th className="text-left py-3 px-4 font-semibold text-foreground">Daily Wh</th>
            <th className="text-center py-3 px-4 font-semibold text-foreground">Action</th>
          </tr>
        </thead>
        <tbody>
          {loads.map((load) => (
            <tr key={load.id} className="border-b border-border hover:bg-primary/5 transition">
              <td className="py-3 px-4 text-foreground">{load.name}</td>
              <td className="py-3 px-4 text-muted-foreground">{load.wattage.toLocaleString()}</td>
              <td className="py-3 px-4">
                <input
                  type="number"
                  min="0"
                  step="0.5"
                  value={load.hoursPerDay}
                  onChange={(e) => onUpdateLoad(load.id, Number.parseFloat(e.target.value) || 0)}
                  className="w-20 px-2 py-1 bg-input border border-border rounded text-foreground text-center"
                />
              </td>
              <td className="py-3 px-4 font-semibold text-primary">
                {(load.wattage * load.hoursPerDay).toLocaleString()}
              </td>
              <td className="py-3 px-4 text-center">
                <button
                  onClick={() => onRemoveLoad(load.id)}
                  className="inline-flex items-center justify-center w-8 h-8 hover:bg-destructive/10 text-destructive rounded transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
