"use client"

import { useState } from "react"
import ComponentDataTable from "./component-data-table"
import ComponentFormModal from "./component-form-modal"
import { Plus, Download, Upload, AlertTriangle } from "lucide-react"
import { useComponents, useCreateComponent, useUpdateComponent, useDeleteComponent, useComponentStats } from "@/hooks/useComponents"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { Component, CreateComponentData } from "@/types/api"

// Map API component to local interface
const mapComponent = (comp: Component) => ({
  id: comp.id,
  productName: comp.product_name,
  category: comp.category,
  sku: comp.sku,
  averageWattage: comp.average_wattage,
  nominalVoltage: comp.nominal_voltage,
  surgeWattage: comp.surge_wattage,
  imageUrl: comp.image_url,
  dailyRunTime: comp.daily_run_time,
  isACLoad: comp.is_ac_load,
})

export default function ComponentDataDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState<string>("")
  const [page, setPage] = useState(1)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingComponent, setEditingComponent] = useState<any | null>(null)

  // Fetch components with filters
  const { data: componentsData, isLoading, error } = useComponents({
    page,
    limit: 50,
    category: filterCategory || undefined,
    search: searchTerm || undefined,
  })

  // Fetch stats
  const { data: statsData } = useComponentStats()

  // Mutations
  const createComponent = useCreateComponent()
  const updateComponent = useUpdateComponent()
  const deleteComponent = useDeleteComponent()

  const components = componentsData?.data.map(mapComponent) || []
  const stats = statsData?.data
  const missingWattageCount = stats?.missingWattage || 0

  const handleAddComponent = async (newComponent: Omit<any, "id">) => {
    const componentData: CreateComponentData = {
      product_name: newComponent.productName,
      category: newComponent.category,
      sku: newComponent.sku,
      average_wattage: newComponent.averageWattage,
      nominal_voltage: newComponent.nominalVoltage,
      surge_wattage: newComponent.surgeWattage,
      image_url: newComponent.imageUrl,
      daily_run_time: newComponent.dailyRunTime,
      is_ac_load: newComponent.isACLoad,
    }

    if (editingComponent) {
      await updateComponent.mutateAsync({
        id: editingComponent.id,
        data: componentData,
      })
    } else {
      await createComponent.mutateAsync(componentData)
    }

    setIsFormOpen(false)
    setEditingComponent(null)
  }

  const handleDeleteComponent = async (id: string) => {
    if (confirm("Are you sure you want to delete this component?")) {
      await deleteComponent.mutateAsync(id)
    }
  }

  const handleEditComponent = (component: any) => {
    setEditingComponent(component)
    setIsFormOpen(true)
  }

  if (error) {
    return (
      <div className="p-6">
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Failed to load components. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Component Database</h2>
        <p className="text-muted-foreground">Manage technical specifications and component data</p>
      </div>

      {/* Top Stats */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-sm text-muted-foreground">Total Components</p>
          {isLoading ? (
            <Skeleton className="h-8 w-16 mt-1" />
          ) : (
            <p className="text-2xl font-bold text-foreground">{componentsData?.pagination.total || 0}</p>
          )}
        </div>
        <div className="bg-card border border-destructive/30 bg-destructive/5 rounded-lg p-4">
          <p className="text-sm text-muted-foreground">Missing Wattage Data</p>
          {isLoading ? (
            <Skeleton className="h-8 w-16 mt-1" />
          ) : (
            <p className="text-2xl font-bold text-destructive">{missingWattageCount}</p>
          )}
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-sm text-muted-foreground">Categories</p>
          {isLoading ? (
            <Skeleton className="h-8 w-16 mt-1" />
          ) : (
            <p className="text-2xl font-bold text-foreground">{stats?.byCategory.length || 4}</p>
          )}
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-card border border-border rounded-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-6">
          <div className="flex-1 w-full md:w-auto">
            <input
              type="text"
              placeholder="Search by product name or SKU..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">All Categories</option>
            <option value="Appliance">Appliances</option>
            <option value="Panel">Panels</option>
            <option value="Battery">Batteries</option>
            <option value="Inverter">Inverters</option>
          </select>

          <div className="flex gap-2">
            <button
              onClick={() => {
                setEditingComponent(null)
                setIsFormOpen(true)
              }}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition font-semibold"
            >
              <Plus className="w-4 h-4" />
              Add Component
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border-2 border-border text-foreground rounded-lg hover:bg-input transition">
              <Upload className="w-4 h-4" />
              Import
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border-2 border-border text-foreground rounded-lg hover:bg-input transition">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        <p className="text-sm text-muted-foreground">
          {isLoading ? (
            <Skeleton className="h-4 w-48" />
          ) : (
            `Showing ${components.length} of ${componentsData?.pagination.total || 0} components`
          )}
        </p>
      </div>

      {/* Data Table */}
      {isLoading ? (
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <Skeleton className="h-12 w-12 rounded" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-3 w-32" />
                </div>
                <Skeleton className="h-8 w-24" />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <ComponentDataTable components={components} onDelete={handleDeleteComponent} onEdit={handleEditComponent} />
      )}

      {/* Form Modal */}
      {isFormOpen && (
        <ComponentFormModal
          onClose={() => {
            setIsFormOpen(false)
            setEditingComponent(null)
          }}
          onSubmit={handleAddComponent}
          initialData={editingComponent || undefined}
        />
      )}
    </div>
  )
}
