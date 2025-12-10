export interface LoadItem {
  id: string
  name: string
  wattage: number
  hoursPerDay: number
}

export interface CalculationInputs {
  backupTime: number
  peakSunHours: number
  panelFactor: number
  depthOfDischarge: number
  batteryEfficiency: number
  percentageOnLoad: number
  batteryVoltage: number
  batterySize: number
  batteryType: string
  inverterSize: number
  inverterVoltage: number
  panelSize: number
  manualBatteryQuantity: number
  // Pricing & Quantity Overrides
  panelPrice: number
  manualPanelQuantity: number
  batteryPrice: number
  inverterPrice: number
  inverterQuantity: number
}
