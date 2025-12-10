import type { CalculationInputs } from "./types"

interface CalculationResultsProps {
  totalLoadPower: number
  averageDailyUsage: number
  inputs: CalculationInputs
  hasLoads: boolean
  requiredBatteries: number
  batteryType: string
  batteryVoltage: number
  batterySize: number
  panelQuantity: number
}

export default function CalculationResults({
  totalLoadPower,
  averageDailyUsage,
  inputs,
  hasLoads,
  requiredBatteries,
  batteryType,
  batteryVoltage,

  batterySize,
  panelQuantity,
}: CalculationResultsProps) {
  // Calculations
  const requiredBatteryCapacity = (averageDailyUsage * inputs.backupTime) / (inputs.depthOfDischarge / 100)
  const requiredInverterSize = (totalLoadPower * inputs.percentageOnLoad) / 100 * 1.5 // Multiply by 1.5
  const panelSize = inputs.panelSize || 400

  return (
    <div className="sticky top-24 space-y-6">
      <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary rounded-lg p-6">
        <h2 className="text-xl font-bold text-foreground mb-6">System Recommendations</h2>

        {hasLoads ? (
          <div className="space-y-4">
            <div className="bg-card rounded-lg p-4 border border-primary/30">
              <p className="text-xs text-muted-foreground mb-1">Recommended Solar Panels</p>
              <p className="text-3xl font-bold text-primary">{panelQuantity}</p>
              <p className="text-xs text-muted-foreground mt-1">@ {panelSize}W panels</p>
            </div>

            <div className="bg-card rounded-lg p-4 border border-secondary/30">
              <p className="text-xs text-muted-foreground mb-1">Minimum Inverter Size</p>
              <div className="flex flex-col">
                <p className="text-3xl font-bold text-secondary">
                  {isNaN(requiredInverterSize) || !isFinite(requiredInverterSize)
                    ? '0'
                    : Math.ceil(requiredInverterSize).toLocaleString()}
                </p>
                {inputs.inverterSize > 0 && (
                  <p className="text-sm font-medium text-muted-foreground mt-1">
                    Selected: <span className="text-foreground">{inputs.inverterSize.toLocaleString()}</span>
                  </p>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-1">VA / Watts</p>
            </div>

            <div className="bg-card rounded-lg p-4 border border-accent/30">
              <p className="text-xs text-muted-foreground mb-1">Battery Bank Size</p>
              <div className="flex flex-col">
                <p className="text-3xl font-bold text-accent">
                  {requiredBatteries} Units
                </p>
                {inputs.manualBatteryQuantity > 0 && (
                  <p className="text-sm font-medium text-muted-foreground mt-1">
                    Selected: <span className="text-foreground">{inputs.manualBatteryQuantity}</span>
                  </p>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-1 capitalize">
                {batteryVoltage}V {batterySize}Ah {batteryType.replace('_', ' ')}
              </p>
            </div>

            <div className="mt-6 p-4 bg-muted/20 rounded-lg text-sm text-muted-foreground space-y-2">
              <p>
                <span className="font-semibold text-foreground">Daily Energy:</span>{" "}
                {averageDailyUsage.toLocaleString()} Wh
              </p>
              <p>
                <span className="font-semibold text-foreground">Peak Load:</span> {totalLoadPower.toLocaleString()} W
              </p>
              <p>
                <span className="font-semibold text-foreground">Total Capacity:</span>{" "}
                {Math.ceil(requiredBatteryCapacity).toLocaleString()} Wh
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <p className="text-sm">Add loads to see recommendations</p>
          </div>
        )}
      </div>
    </div>
  )
}
