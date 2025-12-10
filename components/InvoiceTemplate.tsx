"use client"

import { forwardRef } from "react"
import type { LoadItem, CalculationInputs } from "./types"
import type { CompanyInfo } from "./CompanyInfoForm"

interface InvoiceTemplateProps {
    companyInfo: CompanyInfo
    loads: LoadItem[]
    inputs: CalculationInputs
    results: {
        totalLoadPower: number
        averageDailyUsage: number
        batteryCapacity: number
        solarPanelCapacity: number
        inverterSize: number
        panelQuantity: number
        requiredBatteries: number
        batteryType: string
        batteryVoltage: number
        batterySize: number
        manualInverterSize: number

        panelSize: number
        manualBatteryQuantity: number
        calculatedRequiredBatteries: number
        manualInverterVoltage: number
        panelPrice: number
        batteryPrice: number
        inverterPrice: number
        inverterQuantity: number
        totalPanelCost: number
        totalBatteryCost: number
        totalInverterCost: number
        totalSystemCost: number
    }
}

const InvoiceTemplate = forwardRef<HTMLDivElement, InvoiceTemplateProps>(
    ({ companyInfo, loads, inputs, results }, ref) => {
        const invoiceNumber = `INV-${Date.now().toString().slice(-6)}`
        const invoiceDate = new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })

        return (
            <>
                <style>{`
          @media print {
            @page {
              size: A4;
              margin: 15mm;
            }
            body {
              print-color-adjust: exact;
              -webkit-print-color-adjust: exact;
            }
            .invoice-container {
              width: 210mm;
              min-height: 297mm;
              padding: 20px;
              margin: 0;
              box-sizing: border-box;
            }
            .no-print {
              display: none !important;
            }
          }
          @media screen {
            .invoice-container {
              max-width: 210mm;
              min-height: 297mm;
              margin: 0 auto;
            }
          }
        `}</style>
                <div ref={ref} className="invoice-container bg-white text-black p-8">
                    {/* Header with Company Info */}
                    <div className="flex items-start justify-between mb-8 pb-6 border-b-2 border-gray-300">
                        <div className="flex items-start gap-4">
                            {companyInfo.logo && (
                                <img
                                    src={companyInfo.logo}
                                    alt="Company Logo"
                                    className="w-20 h-20 object-contain"
                                />
                            )}
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    {companyInfo.name || "Your Company Name"}
                                </h1>
                                {companyInfo.address && (
                                    <p className="text-sm text-gray-600 mt-1">{companyInfo.address}</p>
                                )}
                                <div className="flex gap-4 mt-1 text-sm text-gray-600">
                                    {companyInfo.phone && <span>{companyInfo.phone}</span>}
                                    {companyInfo.email && <span>{companyInfo.email}</span>}
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                            <h2 className="text-xl font-bold text-gray-900">QUOTATION</h2>
                            <p className="text-sm text-gray-600 mt-1">#{invoiceNumber}</p>
                            <p className="text-sm text-gray-600">{invoiceDate}</p>
                        </div>
                    </div>

                    {/* Load Schedule */}
                    <div className="mb-8">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 bg-gray-100 p-2">
                            LOAD SCHEDULE
                        </h3>
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="border-b-2 border-gray-300">
                                    <th className="text-left py-2 px-2 text-sm font-semibold text-gray-700">
                                        Appliance
                                    </th>
                                    <th className="text-right py-2 px-2 text-sm font-semibold text-gray-700">
                                        Wattage (W)
                                    </th>
                                    <th className="text-right py-2 px-2 text-sm font-semibold text-gray-700">
                                        Hours/Day
                                    </th>
                                    <th className="text-right py-2 px-2 text-sm font-semibold text-gray-700">
                                        Daily Usage (Wh)
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {loads.map((load) => (
                                    <tr key={load.id} className="border-b border-gray-200">
                                        <td className="py-2 px-2 text-sm">{load.name}</td>
                                        <td className="py-2 px-2 text-sm text-right">{load.wattage.toLocaleString()}</td>
                                        <td className="py-2 px-2 text-sm text-right">{load.hoursPerDay}</td>
                                        <td className="py-2 px-2 text-sm text-right">
                                            {(load.wattage * load.hoursPerDay).toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                                <tr className="border-t-2 border-gray-300 font-bold">
                                    <td className="py-2 px-2 text-sm">TOTAL</td>
                                    <td className="py-2 px-2 text-sm text-right">
                                        {results.totalLoadPower.toLocaleString()} W
                                    </td>
                                    <td className="py-2 px-2 text-sm text-right">-</td>
                                    <td className="py-2 px-2 text-sm text-right">
                                        {results.averageDailyUsage.toLocaleString()} Wh
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* System Recommendations */}
                    <div className="mb-8">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 bg-gray-100 p-2">
                            RECOMMENDED SYSTEM COMPONENTS
                        </h3>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="border border-gray-300 p-4 rounded">
                                <p className="text-xs text-gray-600 mb-1">Solar Panels</p>
                                <p className="text-2xl font-bold text-gray-900">{results.panelQuantity}</p>
                                <p className="text-xs text-gray-600 mt-1">@ {results.panelSize || 400}W panels</p>
                            </div>
                            <div className="border border-gray-300 p-4 rounded">
                                <p className="text-xs text-gray-600 mb-1">Inverter Size {results.manualInverterSize > 0 ? '(Manual)' : '(Recommended)'}</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {Math.ceil(results.manualInverterSize > 0 ? results.manualInverterSize : results.inverterSize).toLocaleString()}
                                </p>
                                <p className="text-xs text-gray-600 mt-1">VA / Watts {results.manualInverterVoltage}V</p>
                            </div>
                            <div className="border border-gray-300 p-4 rounded">
                                <p className="text-xs text-gray-600 mb-1">Battery Bank {results.manualBatteryQuantity > 0 ? '(Manual)' : '(Recommended)'}</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {results.requiredBatteries} Units
                                </p>
                                <p className="text-xs text-gray-600 mt-1 capitalize">
                                    {results.batteryVoltage}V {results.batterySize}Ah {results.batteryType.replace('_', ' ')}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* System Parameters */}
                    <div className="mb-8">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 bg-gray-100 p-2">
                            SYSTEM PARAMETERS
                        </h3>
                        <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Backup Time:</span>
                                <span className="font-semibold">{inputs.backupTime} hours</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Peak Sun Hours:</span>
                                <span className="font-semibold">{inputs.peakSunHours} hours</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Panel Factor:</span>
                                <span className="font-semibold">{inputs.panelFactor}%</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Depth of Discharge:</span>
                                <span className="font-semibold">{inputs.depthOfDischarge}%</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Battery Efficiency:</span>
                                <span className="font-semibold">{inputs.batteryEfficiency}%</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Percentage on Load:</span>
                                <span className="font-semibold">{inputs.percentageOnLoad}%</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Battery Voltage:</span>
                                <span className="font-semibold">{inputs.batteryVoltage}V</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Battery Capacity:</span>
                                <span className="font-semibold">{inputs.batterySize}Ah</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Battery Type:</span>
                                <span className="font-semibold capitalize">{inputs.batteryType.replace('_', ' ')}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Inverter Size:</span>
                                <span className="font-semibold">{inputs.inverterSize > 0 ? `${inputs.inverterSize} W` : 'Auto'}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Inverter Voltage:</span>
                                <span className="font-semibold">{inputs.inverterVoltage}V</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Panel Size:</span>
                                <span className="font-semibold">{inputs.panelSize || 400}W</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Battery Quantity:</span>
                                <span className="font-semibold">{inputs.manualBatteryQuantity > 0 ? `${inputs.manualBatteryQuantity} (Manual)` : 'Auto'}</span>
                            </div>
                        </div>
                    </div>

                    {/* Footer Notes */}
                    <div className="mt-8 pt-6 border-t-2 border-gray-300">
                        <div className="bg-gray-50 p-4 rounded text-sm text-gray-700">
                            <p className="font-semibold mb-2">Notes:</p>
                            <ul className="list-disc list-inside space-y-1 text-xs">
                                <li>This quotation is based on the load schedule and parameters provided above</li>
                                <li>Professional installation and commissioning services available</li>
                                <li>All components come with manufacturer warranties</li>
                                <li>Contact us for detailed pricing and customization options</li>
                            </ul>
                        </div>
                        <div className="mt-4 text-center text-xs text-gray-500">
                            <p>Generated on {invoiceDate}</p>
                            {companyInfo.name && <p className="mt-1">© {new Date().getFullYear()} {companyInfo.name}. All rights reserved.</p>}
                        </div>
                    </div>
                </div>
            </>
        )
    }
)

InvoiceTemplate.displayName = "InvoiceTemplate"

export default InvoiceTemplate
