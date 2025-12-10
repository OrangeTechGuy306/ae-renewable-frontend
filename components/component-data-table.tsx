"use client"

import { Edit2, Trash2 } from "lucide-react"
import type { ComponentData } from "./component-data-dashboard"

interface ComponentDataTableProps {
  components: ComponentData[]
  onDelete: (id: string) => void
  onEdit: (component: ComponentData) => void
}

export default function ComponentDataTable({ components, onDelete, onEdit }: ComponentDataTableProps) {
  if (components.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-12 text-center">
        <p className="text-muted-foreground">No components found matching your criteria.</p>
      </div>
    )
  }

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-input border-b border-border">
              <th className="text-left py-4 px-6 font-semibold text-foreground">Product Name</th>
              <th className="text-left py-4 px-6 font-semibold text-foreground">SKU/Code</th>
              <th className="text-left py-4 px-6 font-semibold text-foreground">Category</th>
              <th className="text-right py-4 px-6 font-semibold text-foreground">Avg Wattage (W)</th>
              <th className="text-right py-4 px-6 font-semibold text-foreground">Nominal Voltage (V)</th>
              <th className="text-right py-4 px-6 font-semibold text-foreground">Surge Wattage (W)</th>
              <th className="text-center py-4 px-6 font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {components.map((component, idx) => (
              <tr
                key={component.id}
                className={`border-b border-border hover:bg-primary/5 transition ${
                  idx % 2 === 0 ? "bg-background" : "bg-card"
                }`}
              >
                <td className="py-4 px-6 text-foreground font-medium">{component.productName}</td>
                <td className="py-4 px-6 text-muted-foreground text-sm">{component.sku}</td>
                <td className="py-4 px-6">
                  <span
                    className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                      component.category === "Panel"
                        ? "bg-primary/10 text-primary"
                        : component.category === "Battery"
                          ? "bg-secondary/10 text-secondary"
                          : component.category === "Inverter"
                            ? "bg-accent/30 text-accent-foreground"
                            : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {component.category}
                  </span>
                </td>
                <td className="py-4 px-6 text-right text-foreground">
                  {component.averageWattage > 0 ? component.averageWattage.toLocaleString() : "—"}
                </td>
                <td className="py-4 px-6 text-right text-foreground">{component.nominalVoltage}</td>
                <td className="py-4 px-6 text-right text-foreground">
                  {component.surgeWattage > 0 ? component.surgeWattage.toLocaleString() : "—"}
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => onEdit(component)}
                      className="p-2 hover:bg-primary/10 text-primary rounded transition"
                      title="Edit component"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm("Are you sure you want to delete this component?")) {
                          onDelete(component.id)
                        }
                      }}
                      className="p-2 hover:bg-destructive/10 text-destructive rounded transition"
                      title="Delete component"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
