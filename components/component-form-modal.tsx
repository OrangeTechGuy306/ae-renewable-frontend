"use client"

import type React from "react"

import { useState } from "react"
import { X } from "lucide-react"
import type { ComponentData } from "./component-data-dashboard"

interface ComponentFormModalProps {
  onClose: () => void
  onSubmit: (component: Omit<ComponentData, "id">) => void
  initialData?: ComponentData
}

export default function ComponentFormModal({ onClose, onSubmit, initialData }: ComponentFormModalProps) {
  const [formData, setFormData] = useState({
    productName: initialData?.productName || "",
    category: (initialData?.category || "Appliance") as "Appliance" | "Panel" | "Battery" | "Inverter",
    sku: initialData?.sku || "",
    averageWattage: initialData?.averageWattage || 0,
    nominalVoltage: initialData?.nominalVoltage || 0,
    surgeWattage: initialData?.surgeWattage || 0,
    imageUrl: initialData?.imageUrl || "",
    dailyRunTime: initialData?.dailyRunTime || 0,
    isACLoad: initialData?.isACLoad || false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : type === "number" ? Number(value) : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-2xl max-h-screen overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">{initialData ? "Edit Component" : "Add New Component"}</h2>
          <button onClick={onClose} className="p-2 hover:bg-input rounded transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Essential Fields */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Essential Information</h3>
            <div className="grid md:grid-cols-2 gap-4 space-y-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">Product Name *</label>
                <input
                  type="text"
                  name="productName"
                  value={formData.productName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g., Solar Panel 450W"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="Appliance">Appliance</option>
                  <option value="Panel">Panel</option>
                  <option value="Battery">Battery</option>
                  <option value="Inverter">Inverter</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">SKU/Product Code *</label>
                <input
                  type="text"
                  name="sku"
                  value={formData.sku}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g., SP-450-BLK"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Average Operating Wattage (W) *
                </label>
                <input
                  type="number"
                  name="averageWattage"
                  value={formData.averageWattage}
                  onChange={handleChange}
                  min="0"
                  required
                  className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Nominal Operating Voltage (V) *
                </label>
                <input
                  type="number"
                  name="nominalVoltage"
                  value={formData.nominalVoltage}
                  onChange={handleChange}
                  min="0"
                  required
                  className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Surge/Peak Wattage (W) *</label>
                <input
                  type="number"
                  name="surgeWattage"
                  value={formData.surgeWattage}
                  onChange={handleChange}
                  min="0"
                  required
                  className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          {/* Optional Fields */}
          <div className="border-t border-border pt-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Optional Information</h3>
            <div className="grid md:grid-cols-2 gap-4 space-y-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">Image URL</label>
                <input
                  type="url"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Daily Run Time Factor</label>
                <input
                  type="number"
                  name="dailyRunTime"
                  value={formData.dailyRunTime}
                  onChange={handleChange}
                  min="0"
                  max="24"
                  className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="0"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isACLoad"
                  name="isACLoad"
                  checked={formData.isACLoad}
                  onChange={handleChange}
                  className="w-4 h-4 accent-primary"
                />
                <label htmlFor="isACLoad" className="text-sm font-medium text-foreground">
                  Is AC Load
                </label>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-6 border-t border-border">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border-2 border-border text-foreground rounded-lg hover:bg-input transition font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition font-semibold"
            >
              {initialData ? "Update Component" : "Add Component"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
