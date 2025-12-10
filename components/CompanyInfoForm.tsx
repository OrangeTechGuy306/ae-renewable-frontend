"use client"

import { useState, useEffect } from "react"
import { Upload, Building2, X } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible"

export interface CompanyInfo {
    logo: string | null
    name: string
    address: string
    phone: string
    email: string
}

interface CompanyInfoFormProps {
    companyInfo: CompanyInfo
    onUpdate: (info: CompanyInfo) => void
}

export default function CompanyInfoForm({ companyInfo, onUpdate }: CompanyInfoFormProps) {
    const [isOpen, setIsOpen] = useState(false)

    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                alert('Please upload an image file')
                return
            }

            // Validate file size (max 2MB)
            if (file.size > 2 * 1024 * 1024) {
                alert('Image size should be less than 2MB')
                return
            }

            const reader = new FileReader()
            reader.onloadend = () => {
                const base64 = reader.result as string
                onUpdate({ ...companyInfo, logo: base64 })
            }
            reader.readAsDataURL(file)
        }
    }

    const handleRemoveLogo = () => {
        onUpdate({ ...companyInfo, logo: null })
    }

    const handleInputChange = (field: keyof CompanyInfo, value: string) => {
        onUpdate({ ...companyInfo, [field]: value })
    }

    return (
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <Card className="border-2 border-primary/20">
                <CardHeader>
                    <CollapsibleTrigger className="flex items-center justify-between w-full hover:opacity-80 transition">
                        <div className="flex items-center gap-2">
                            <Building2 className="w-5 h-5 text-primary" />
                            <CardTitle>Company Information</CardTitle>
                        </div>
                        <Button variant="ghost" size="sm">
                            {isOpen ? "Hide" : "Show"}
                        </Button>
                    </CollapsibleTrigger>
                    <CardDescription>
                        Add your company details for professional invoices and quotations
                    </CardDescription>
                </CardHeader>

                <CollapsibleContent>
                    <CardContent className="space-y-6">
                        {/* Logo Upload */}
                        <div className="space-y-2">
                            <Label>Company Logo</Label>
                            <div className="flex items-center gap-4">
                                {companyInfo.logo ? (
                                    <div className="relative">
                                        <img
                                            src={companyInfo.logo}
                                            alt="Company Logo"
                                            className="w-24 h-24 object-contain border-2 border-border rounded-lg p-2 bg-background"
                                        />
                                        <Button
                                            variant="destructive"
                                            size="icon"
                                            className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                                            onClick={handleRemoveLogo}
                                        >
                                            <X className="w-3 h-3" />
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="w-24 h-24 border-2 border-dashed border-border rounded-lg flex items-center justify-center bg-muted/50">
                                        <Upload className="w-8 h-8 text-muted-foreground" />
                                    </div>
                                )}
                                <div className="flex-1">
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleLogoUpload}
                                        className="cursor-pointer"
                                    />
                                    <p className="text-xs text-muted-foreground mt-1">
                                        PNG, JPG or SVG (max 2MB)
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Company Name */}
                        <div className="space-y-2">
                            <Label htmlFor="company-name">Company Name *</Label>
                            <Input
                                id="company-name"
                                placeholder="e.g., A.E RENEWABLE LTD"
                                value={companyInfo.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                            />
                        </div>

                        {/* Address */}
                        <div className="space-y-2">
                            <Label htmlFor="company-address">Address</Label>
                            <Input
                                id="company-address"
                                placeholder="e.g., 123 Solar Street, Lagos, Nigeria"
                                value={companyInfo.address}
                                onChange={(e) => handleInputChange('address', e.target.value)}
                            />
                        </div>

                        {/* Phone and Email */}
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="company-phone">Phone</Label>
                                <Input
                                    id="company-phone"
                                    type="tel"
                                    placeholder="e.g., +234 123 456 7890"
                                    value={companyInfo.phone}
                                    onChange={(e) => handleInputChange('phone', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="company-email">Email</Label>
                                <Input
                                    id="company-email"
                                    type="email"
                                    placeholder="e.g., info@company.com"
                                    value={companyInfo.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                />
                            </div>
                        </div>
                    </CardContent>
                </CollapsibleContent>
            </Card>
        </Collapsible>
    )
}
