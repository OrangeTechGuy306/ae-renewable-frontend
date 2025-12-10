"use client"

import { AlertTriangle, Package, Layers, TrendingUp } from "lucide-react"
import { useDashboardStats, useDashboardActivity } from "@/hooks/useDashboard"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function DashboardHome() {
  const { data: statsData, isLoading: statsLoading, error: statsError } = useDashboardStats()
  const { data: activityData, isLoading: activityLoading } = useDashboardActivity(3)

  const stats = statsData?.data

  const statCards = stats ? [
    {
      label: "Total Components",
      value: stats.components.total.toString(),
      change: `${stats.components.byCategory.length} categories`,
      icon: Package,
      color: "primary",
    },
    {
      label: "Missing Wattage Data",
      value: stats.components.missingWattage.toString(),
      change: stats.components.missingWattage > 0 ? "Requires attention" : "All complete",
      icon: AlertTriangle,
      color: stats.components.missingWattage > 0 ? "destructive" : "primary",
    },
    {
      label: "Contact Inquiries",
      value: stats.inquiries.total.toString(),
      description: `${stats.inquiries.lastWeek} this week`,
      icon: Layers,
      color: "secondary",
    },
    {
      label: "Total Calculations",
      value: stats.calculations.total.toString(),
      description: `${stats.calculations.lastWeek} this week`,
      icon: TrendingUp,
      color: "primary",
    },
  ] : []

  if (statsError) {
    return (
      <div className="p-6">
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Failed to load dashboard statistics. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Dashboard</h2>
        <p className="text-muted-foreground">Manage technical specifications and component data</p>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsLoading ? (
          // Loading skeletons
          Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="bg-card border rounded-lg p-6">
              <Skeleton className="h-12 w-12 rounded-lg mb-4" />
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-8 w-16 mb-2" />
              <Skeleton className="h-3 w-32" />
            </div>
          ))
        ) : (
          statCards.map((stat) => {
            const Icon = stat.icon
            const colorClass =
              stat.color === "primary"
                ? "border-primary/30 bg-primary/5"
                : stat.color === "destructive"
                  ? "border-destructive/30 bg-destructive/5"
                  : "border-secondary/30 bg-secondary/5"

            return (
              <div key={stat.label} className={`bg-card border ${colorClass} rounded-lg p-6`}>
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color === "primary"
                        ? "bg-primary/10"
                        : stat.color === "destructive"
                          ? "bg-destructive/10"
                          : "bg-secondary/10"
                      }`}
                  >
                    <Icon
                      className={`w-6 h-6 ${stat.color === "primary"
                          ? "text-primary"
                          : stat.color === "destructive"
                            ? "text-destructive"
                            : "text-secondary"
                        }`}
                    />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-foreground mb-2">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.change || stat.description}</p>
              </div>
            )
          })
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-bold text-foreground mb-4">Quick Actions</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <button className="px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition font-semibold">
            Add New Component
          </button>
          <button className="px-4 py-3 border-2 border-primary text-primary rounded-lg hover:bg-primary/5 transition font-semibold">
            Upload Data
          </button>
          <button className="px-4 py-3 border-2 border-border text-foreground rounded-lg hover:bg-input transition font-semibold">
            Export Database
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8 bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-bold text-foreground mb-4">Recent Activity</h3>
        {activityLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="flex items-start gap-4 pb-4 border-b border-border">
                <Skeleton className="w-2 h-2 rounded-full mt-2" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-3 w-32" />
                </div>
                <Skeleton className="h-3 w-20" />
              </div>
            ))}
          </div>
        ) : activityData?.data && activityData.data.length > 0 ? (
          <div className="space-y-4">
            {activityData.data.map((activity, idx) => (
              <div key={idx} className="flex items-start gap-4 pb-4 border-b border-border last:border-b-0">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-foreground font-medium">
                    {activity.type === 'component' && 'Added new component'}
                    {activity.type === 'calculation' && 'Saved calculation'}
                    {activity.type === 'inquiry' && 'New contact inquiry'}
                  </p>
                  <p className="text-sm text-muted-foreground">{activity.name}</p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {new Date(activity.created_at).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-8">No recent activity</p>
        )}
      </div>
    </div>
  )
}
