// Shared types — these mirror the JSON shapes returned by the FastAPI backend.

export type DeviceStatus = "active" | "offline"
export type DeviceOS = "Windows" | "Linux"

export interface Device {
  id: string
  deviceName: string
  os: DeviceOS
  ipAddress: string
  lastAudit: string // ISO 8601 timestamp
  status: DeviceStatus
}

export type LicenseType = "Commercial" | "Open Source" | "Freeware" | "Subscription"
export type ComplianceStatus = "Compliant" | "Over-licensed" | "Unlicensed"

export interface SoftwareAsset {
  id: string
  applicationName: string
  version: string
  totalInstallations: number
  licenseType: LicenseType
  complianceStatus: ComplianceStatus
}

export interface DashboardMetrics {
  totalDevices: number
  totalSoftwareAssets: number
  complianceAlerts: number
  potentialSavings: number // in USD
}

export interface DashboardData {
  metrics: DashboardMetrics
  devices: Device[]
  software: SoftwareAsset[]
}
