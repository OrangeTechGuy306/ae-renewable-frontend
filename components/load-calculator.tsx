"use client"

import { useState, useRef, useEffect } from "react"
import { Save, FileText, Printer, Download } from "lucide-react"
import { useReactToPrint } from "react-to-print"
import jsPDF from "jspdf"
import html2canvas from "html2canvas"
import LoadListInput from "./load-list-input"
import LoadScheduleTable from "./load-schedule-table"
import SystemInputs from "./system-inputs"
import CalculationResults from "./calculation-results"
import CompanyInfoForm, { type CompanyInfo } from "./CompanyInfoForm"
import InvoiceTemplate from "./InvoiceTemplate"
import { useSaveCalculation } from "@/hooks/useCalculations"
import { useAuthContext } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { toast } from "sonner"

import type { CalculationInputs, LoadItem } from "./types"

const DEFAULT_INPUTS: CalculationInputs = {
  backupTime: 8,
  peakSunHours: 5,
  panelFactor: 80,
  depthOfDischarge: 80,
  batteryEfficiency: 90,
  percentageOnLoad: 100,
  batteryVoltage: 12,
  batterySize: 200,
  batteryType: "lithium",
  inverterSize: 0,
  inverterVoltage: 12,
  panelSize: 400,

  manualBatteryQuantity: 0,
  panelPrice: 0,
  manualPanelQuantity: 0,
  batteryPrice: 0,
  inverterPrice: 0,
  inverterQuantity: 1,
}

const DEFAULT_COMPANY_INFO: CompanyInfo = {
  logo: null,
  name: "",
  address: "",
  phone: "",
  email: "",
}

export default function LoadCalculator() {
  const [loads, setLoads] = useState<LoadItem[]>([])
  const [inputs, setInputs] = useState<CalculationInputs>(DEFAULT_INPUTS)
  const [showSaveDialog, setShowSaveDialog] = useState(false)
  const [showInvoiceDialog, setShowInvoiceDialog] = useState(false)
  const [calculationName, setCalculationName] = useState("")
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>(() => {
    // Load from localStorage on mount
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('company_info')
      return saved ? JSON.parse(saved) : DEFAULT_COMPANY_INFO
    }
    return DEFAULT_COMPANY_INFO
  })

  const invoiceRef = useRef<HTMLDivElement>(null)
  const { isAuthenticated } = useAuthContext()
  const router = useRouter()
  const saveCalculation = useSaveCalculation()

  const totalLoadPower = loads.reduce((sum, load) => sum + load.wattage, 0)
  const averageDailyUsage = loads.reduce((sum, load) => sum + load.wattage * load.hoursPerDay, 0)

  // Determine system voltage (auto-logic for suggestion, but user selects manually via inputs)
  // Logic: > 4000W => 48V, > 1600W => 24V, else 12V (or user defined)
  useEffect(() => {
    if (totalLoadPower >= 4000) {
      if (inputs.inverterVoltage !== 48) {
        setInputs(prev => ({ ...prev, inverterVoltage: 48 }))
        toast.info("Inverter voltage suggested: 48V (High Load)")
      }
    } else if (totalLoadPower > 1600) {
      if (inputs.inverterVoltage !== 24 && inputs.inverterVoltage !== 48) {
        // Only suggest 24V if not already 48V (user might want 48V for lower loads too)
        // Or if strictly following "indicate 24V when > 1600":
        if (inputs.inverterVoltage !== 24) {
          setInputs(prev => ({ ...prev, inverterVoltage: 24 }))
          toast.info("Inverter voltage suggested: 24V (Medium Load)")
        }
      }
    }
  }, [totalLoadPower]) // Logic dependent on totalLoadPower only. 
  // Note: We don't depend on inputs.inverterVoltage to avoid loop, but we check it inside.

  // Calculate results
  const batteryCapacity = (averageDailyUsage * inputs.backupTime) / (inputs.depthOfDischarge / 100) / (inputs.batteryEfficiency / 100)
  const solarPanelCapacity = (averageDailyUsage / inputs.peakSunHours) / (inputs.panelFactor / 100)
  const inverterSize = totalLoadPower * (inputs.percentageOnLoad / 100) * 1.5 // Multiply by 1.5

  // New Battery Calculation Logic
  const usableBatteryCapacityWh = inputs.batteryVoltage * inputs.batterySize * (inputs.depthOfDischarge / 100)
  const calculatedRequiredBatteries = Math.ceil(averageDailyUsage / usableBatteryCapacityWh)
  const requiredBatteries = inputs.manualBatteryQuantity > 0 ? inputs.manualBatteryQuantity : calculatedRequiredBatteries

  const batteryBankSizeAh = requiredBatteries * inputs.batterySize // Total Ah if connected in parallel (simplification for display)

  const panelSize = inputs.panelSize || 400 // Use input or default 400

  // Panel Calculation based on Battery Capacity
  // Formula: Recommended Panels = Total Battery Capacity / Panel Daily Energy
  // Panel Daily Energy = Panel Size * (Factor/100) * Peak Sun Hours
  const totalSystemBatteryCapacityWh = usableBatteryCapacityWh * requiredBatteries
  const panelDailyEnergy = panelSize * (inputs.panelFactor / 100) * inputs.peakSunHours
  const calculatedPanelQuantity = Math.ceil(totalSystemBatteryCapacityWh / panelDailyEnergy)
  const panelQuantity = inputs.manualPanelQuantity > 0 ? inputs.manualPanelQuantity : calculatedPanelQuantity

  const inverterQuantity = inputs.inverterQuantity > 0 ? inputs.inverterQuantity : 1

  // Cost Calculations
  const totalPanelCost = panelQuantity * inputs.panelPrice
  const totalBatteryCost = requiredBatteries * inputs.batteryPrice
  const totalInverterCost = inverterQuantity * inputs.inverterPrice
  const totalSystemCost = totalPanelCost + totalBatteryCost + totalInverterCost

  const results = {
    totalLoadPower,
    averageDailyUsage,
    batteryCapacity,
    solarPanelCapacity,
    inverterSize,
    panelQuantity,
    batteryBankSizeAh,
    requiredBatteries,
    batteryType: inputs.batteryType,
    batteryVoltage: inputs.batteryVoltage,
    batterySize: inputs.batterySize,
    manualInverterSize: inputs.inverterSize,
    manualInverterVoltage: inputs.inverterVoltage,
    panelSize: inputs.panelSize,
    manualBatteryQuantity: inputs.manualBatteryQuantity,
    calculatedRequiredBatteries,
    // Pricing
    panelPrice: inputs.panelPrice,
    batteryPrice: inputs.batteryPrice,
    inverterPrice: inputs.inverterPrice,
    inverterQuantity,
    totalPanelCost,
    totalBatteryCost,
    totalInverterCost,
    totalSystemCost,
  }

  const handleAddLoad = (name: string, wattage: number) => {
    setLoads([
      ...loads,
      {
        id: Date.now().toString(),
        name,
        wattage: Number(wattage),
        hoursPerDay: 4,
      },
    ])
  }

  const handleRemoveLoad = (id: string) => {
    setLoads(loads.filter((load) => load.id !== id))
  }

  const handleUpdateLoad = (id: string, hoursPerDay: number) => {
    const validHours = Number(hoursPerDay)
    if (isNaN(validHours) || validHours < 0) return
    setLoads(loads.map((load) => (load.id === id ? { ...load, hoursPerDay: validHours } : load)))
  }

  const handleInputChange = (key: keyof CalculationInputs, value: number | string) => {
    setInputs({ ...inputs, [key]: value })
  }

  const handleCompanyInfoUpdate = (info: CompanyInfo) => {
    setCompanyInfo(info)
    // Save to localStorage
    localStorage.setItem('company_info', JSON.stringify(info))
  }

  const handleSaveClick = () => {
    if (!isAuthenticated) {
      router.push('/auth/login')
      return
    }
    setShowSaveDialog(true)
  }

  const handleSaveCalculation = () => {
    saveCalculation.mutate(
      {
        calculation_name: calculationName || `Calculation ${new Date().toLocaleDateString()}`,
        loads: loads.map(load => ({
          id: load.id,
          name: load.name,
          wattage: load.wattage,
          hoursPerDay: load.hoursPerDay,
        })),
        system_inputs: {
          backupTime: inputs.backupTime,
          peakSunHours: inputs.peakSunHours,
          panelFactor: inputs.panelFactor,
          depthOfDischarge: inputs.depthOfDischarge,
          batteryEfficiency: inputs.batteryEfficiency,
          percentageOnLoad: inputs.percentageOnLoad,
        },
        results: {
          totalLoadPower,
          averageDailyUsage,
          batteryCapacity,
          solarPanelCapacity,
          inverterSize,
        },
      },
      {
        onSuccess: () => {
          setShowSaveDialog(false)
          setCalculationName("")
        },
      }
    )
  }

  const handleGenerateInvoice = () => {
    if (!companyInfo.name) {
      toast.error("Please add your company name before generating an invoice")
      return
    }
    setShowInvoiceDialog(true)
  }

  const handlePrint = useReactToPrint({
    contentRef: invoiceRef,
  })

  const handleDownloadPDF = async () => {
    if (!invoiceRef.current) return

    try {
      toast.loading("Generating PDF...")

      const canvas = await html2canvas(invoiceRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
      })

      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      })

      const imgWidth = 210 // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight)
      pdf.save(`Solar_Quotation_${Date.now()}.pdf`)

      toast.dismiss()
      toast.success("PDF downloaded successfully!")
    } catch (error) {
      toast.dismiss()
      toast.error("Failed to generate PDF")
      console.error("PDF generation error:", error)
    }
  }

  return (
    <>
      <div className="space-y-8">
        {/* Company Info Section */}
        <CompanyInfoForm companyInfo={companyInfo} onUpdate={handleCompanyInfoUpdate} />

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Inputs */}
          <div className="lg:col-span-2 space-y-8">
            {/* Load List Section */}
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">Load Schedule</h2>
                {loads.length > 0 && (
                  <div className="flex gap-2">
                    <Button onClick={handleGenerateInvoice} variant="default" size="sm" className="gap-2">
                      <FileText className="w-4 h-4" />
                      Generate Invoice
                    </Button>
                    <Button onClick={handleSaveClick} variant="outline" size="sm" className="gap-2">
                      <Save className="w-4 h-4" />
                      Save Calculation
                    </Button>
                  </div>
                )}
              </div>

              <LoadListInput onAddLoad={handleAddLoad} />

              {loads.length > 0 ? (
                <LoadScheduleTable loads={loads} onRemoveLoad={handleRemoveLoad} onUpdateLoad={handleUpdateLoad} />
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <p>No loads added yet. Start by searching for appliances above.</p>
                </div>
              )}

              {/* Total Load Display */}
              {loads.length > 0 && (
                <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="min-w-0">
                      <p className="text-sm text-muted-foreground mb-1">Total Load Power</p>
                      <p className="text-2xl font-bold text-primary break-words">
                        {isNaN(totalLoadPower) ? '0' : totalLoadPower.toLocaleString()} W
                      </p>
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm text-muted-foreground mb-1">Daily Energy Usage</p>
                      <p className="text-2xl font-bold text-primary break-words">
                        {isNaN(averageDailyUsage) ? '0' : averageDailyUsage.toLocaleString()} Wh
                      </p>
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm text-muted-foreground mb-1">Items Added</p>
                      <p className="text-2xl font-bold text-primary">{loads.length}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* System Input Fields */}
            <SystemInputs
              inputs={inputs}
              onInputChange={handleInputChange}
              totalBatteries={requiredBatteries}
            />
          </div>

          {/* Right Column - Results */}
          <div className="lg:col-span-1">
            <CalculationResults
              totalLoadPower={totalLoadPower}
              averageDailyUsage={averageDailyUsage}
              inputs={inputs}
              hasLoads={loads.length > 0}
              requiredBatteries={requiredBatteries}
              batteryType={inputs.batteryType}
              batteryVoltage={inputs.batteryVoltage}
              batterySize={inputs.batterySize}
              panelQuantity={panelQuantity}
            />
          </div>
        </div>
      </div>

      {/* Save Dialog */}
      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Calculation</DialogTitle>
            <DialogDescription>
              Give your calculation a name to save it for future reference.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Input
              placeholder="e.g., Home Solar System"
              value={calculationName}
              onChange={(e) => setCalculationName(e.target.value)}
              disabled={saveCalculation.isPending}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSaveDialog(false)} disabled={saveCalculation.isPending}>
              Cancel
            </Button>
            <Button onClick={handleSaveCalculation} disabled={saveCalculation.isPending}>
              {saveCalculation.isPending ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Invoice Dialog */}
      <Dialog open={showInvoiceDialog} onOpenChange={setShowInvoiceDialog}>
        <DialogContent className="max-w-6xl w-[95vw] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Solar System Quotation</DialogTitle>
            <DialogDescription>
              Preview and download your professional quotation
            </DialogDescription>
          </DialogHeader>

          <div className="my-4">
            <InvoiceTemplate
              ref={invoiceRef}
              companyInfo={companyInfo}
              loads={loads}
              inputs={inputs}
              results={results}
            />
          </div>

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setShowInvoiceDialog(false)}>
              Close
            </Button>
            <Button variant="outline" onClick={handlePrint} className="gap-2">
              <Printer className="w-4 h-4" />
              Print
            </Button>
            <Button onClick={handleDownloadPDF} className="gap-2">
              <Download className="w-4 h-4" />
              Download PDF
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
