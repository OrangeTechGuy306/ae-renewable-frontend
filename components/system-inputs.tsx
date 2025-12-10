"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { CalculationInputs } from "./types"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface SystemInputsProps {
  inputs: CalculationInputs
  onInputChange: (key: keyof CalculationInputs, value: number | string) => void
  totalBatteries: number
}

export default function SystemInputs({ inputs, onInputChange, totalBatteries }: SystemInputsProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-2xl font-bold text-foreground mb-6">System Parameters</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Required Fields */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">Backup Time (hours/day)</label>
          <input
            type="number"
            min="0"
            max="24"
            step="0.5"
            value={inputs.backupTime}
            onChange={(e) => onInputChange("backupTime", Number.parseFloat(e.target.value))}
            className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <p className="text-xs text-muted-foreground mt-1">How long the system should operate in reserve</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">

          {/* SECTION 1: SOLAR PANELS */}
          <div className="md:col-span-2 border-b border-border pb-4 mb-2">
            <h3 className="text-lg font-semibold text-primary mb-4">Solar Panels</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label className="mb-2">Panel Size (Watts)</Label>
                <Input
                  type="number"
                  min="10"
                  step="5"
                  value={inputs.panelSize}
                  onChange={(e) => onInputChange("panelSize", Number.parseFloat(e.target.value))}
                />
                <p className="text-xs text-muted-foreground mt-1">Default: 400W</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Panel Factor (%)</label>
                <input
                  type="number"
                  min="50"
                  max="100"
                  step="1"
                  value={inputs.panelFactor}
                  onChange={(e) => onInputChange("panelFactor", Number.parseFloat(e.target.value))}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <p className="text-xs text-muted-foreground mt-1">Efficiency factor (Default: 80%)</p>
              </div>
              <div>
                <Label className="mb-2">Manual Quantity (Optional)</Label>
                <Input
                  type="number"
                  min="0"
                  step="1"
                  placeholder="Auto-calculated"
                  value={inputs.manualPanelQuantity || ''}
                  onChange={(e) => onInputChange("manualPanelQuantity", Number.parseFloat(e.target.value))}
                />
              </div>
              <div>
                <Label className="mb-2">Unit Price</Label>
                <Input
                  type="number"
                  min="0"
                  step="100"
                  placeholder="0.00"
                  value={inputs.panelPrice || ''}
                  onChange={(e) => onInputChange("panelPrice", Number.parseFloat(e.target.value))}
                />
              </div>
            </div>
          </div>

          {/* SECTION 2: BATTERY BANK */}
          <div className="md:col-span-2 border-b border-border pb-4 mb-2">
            <h3 className="text-lg font-semibold text-accent mb-4">Battery Bank</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label className="mb-2">Battery Voltage</Label>
                <Select
                  value={inputs.batteryVoltage.toString()}
                  onValueChange={(val) => onInputChange("batteryVoltage", Number(val))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Voltage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12">12V</SelectItem>
                    <SelectItem value="24">24V</SelectItem>
                    <SelectItem value="48">48V</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="mb-2">Battery Size (Ah)</Label>
                <Select
                  value={inputs.batterySize.toString()}
                  onValueChange={(val) => onInputChange("batterySize", Number(val))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Capacity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="100">100Ah</SelectItem>
                    <SelectItem value="150">150Ah</SelectItem>
                    <SelectItem value="200">200Ah</SelectItem>
                    <SelectItem value="220">220Ah</SelectItem>
                    <SelectItem value="240">240Ah</SelectItem>
                    <SelectItem value="300">300Ah</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="mb-2">Battery Type</Label>
                <Select
                  value={inputs.batteryType}
                  onValueChange={(val) => onInputChange("batteryType", val)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lithium_battery">Lithium Battery</SelectItem>
                    <SelectItem value="tubular_battery">Tubular Battery</SelectItem>
                    <SelectItem value="dry_cell_battery">Dry Cell Battery</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Depth of Discharge (%)</label>
                <input
                  type="number"
                  min="10"
                  max="100"
                  step="5"
                  value={inputs.depthOfDischarge}
                  onChange={(e) => onInputChange("depthOfDischarge", Number.parseFloat(e.target.value))}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <Label className="mb-2">Manual Quantity (Optional)</Label>
                <Input
                  type="number"
                  min="0"
                  step="1"
                  placeholder="Auto-calculated"
                  value={inputs.manualBatteryQuantity || ''}
                  onChange={(e) => onInputChange("manualBatteryQuantity", Number.parseFloat(e.target.value))}
                />
              </div>

              <div>
                <Label className="mb-2">Unit Price</Label>
                <Input
                  type="number"
                  min="0"
                  step="100"
                  placeholder="0.00"
                  value={inputs.batteryPrice || ''}
                  onChange={(e) => onInputChange("batteryPrice", Number.parseFloat(e.target.value))}
                />
              </div>

              <div>
                <Label className="mb-2">Total Battery Bank Capacity (Usable)</Label>
                <Input
                  type="text"
                  readOnly
                  disabled
                  value={`${(inputs.batteryVoltage * inputs.batterySize * (inputs.depthOfDischarge / 100) * totalBatteries).toLocaleString()} Wh`}
                  className="bg-muted text-muted-foreground"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  = {totalBatteries} × (Voltage × Capacity × DoD)
                </p>
              </div>
            </div>
          </div>

          {/* SECTION 3: INVERTER */}
          <div className="md:col-span-2 pt-2">
            <h3 className="text-lg font-semibold text-secondary mb-4">Inverter Configuration</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label className="mb-2">Inverter Voltage (Auto-suggested)</Label>
                <Select
                  value={inputs.inverterVoltage.toString()}
                  onValueChange={(val) => onInputChange("inverterVoltage", Number(val))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Voltage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12">12V</SelectItem>
                    <SelectItem value="24">24V</SelectItem>
                    <SelectItem value="48">48V</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">
                  Auto-switches based on load (&gt;1600W=24V, &gt;4000W=48V)
                </p>
              </div>

              <div>
                <Label className="mb-2">Inverter Size (Watts) - Manual</Label>
                <Input
                  type="number"
                  min="0"
                  step="100"
                  placeholder="Auto-calculated"
                  value={inputs.inverterSize || ''}
                  onChange={(e) => onInputChange("inverterSize", Number.parseFloat(e.target.value))}
                />
              </div>

              <div>
                <Label className="mb-2">Quantity</Label>
                <Input
                  type="number"
                  min="1"
                  step="1"
                  value={inputs.inverterQuantity}
                  onChange={(e) => onInputChange("inverterQuantity", Number.parseFloat(e.target.value))}
                />
              </div>

              <div>
                <Label className="mb-2">Unit Price</Label>
                <Input
                  type="number"
                  min="0"
                  step="100"
                  placeholder="0.00"
                  value={inputs.inverterPrice || ''}
                  onChange={(e) => onInputChange("inverterPrice", Number.parseFloat(e.target.value))}
                />
              </div>
            </div>
          </div>

          {/* Global Settings (Optional, maybe move to bottom or top if needed, keeping backup time somewhere?) */}
          <div className="md:col-span-2 pt-4 border-t border-border mt-2">
            <h4 className="text-sm font-semibold text-muted-foreground mb-2">Other Settings</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Backup Time (Hours)</label>
                <input
                  type="number"
                  min="1"
                  max="24"
                  step="0.5"
                  value={inputs.backupTime}
                  onChange={(e) => onInputChange("backupTime", Number.parseFloat(e.target.value))}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Peak Sun Hours</label>
                <input
                  type="number"
                  min="1"
                  max="24"
                  step="0.1"
                  value={inputs.peakSunHours}
                  onChange={(e) => onInputChange("peakSunHours", Number.parseFloat(e.target.value))}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Battery Efficiency (%)</label>
                <input
                  type="number"
                  min="50"
                  max="100"
                  step="1"
                  value={inputs.batteryEfficiency}
                  onChange={(e) => onInputChange("batteryEfficiency", Number.parseFloat(e.target.value))}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
