export type ProductStatus = "active" | "draft" | "archived"
export type CustomerStatus = "active" | "inactive" | "churned"
export type CustomerSegment = "vip" | "regular" | "new" | "at_risk"

export interface TimeSeriesPoint {
  date: string
  value: number
}

export interface Product {
  id: string
  sku: string
  name: string
  category: string
  price: number
  currency: string
  stock: number
  status: ProductStatus
  image?: string
  createdAt: string
  updatedAt: string
}

export interface Customer {
  id: string
  name: string
  email: string
  segment: CustomerSegment
  lifetimeValue: number
  ordersCount: number
  lastOrderAt: string
  status: CustomerStatus
  avatar?: string
}

export interface KpiCard {
  id: string
  label: string
  value: number
  deltaPct: number
  trend: TimeSeriesPoint[]
  format: "currency" | "number" | "percent"
}

export interface Store {
  id: string
  name: string
  domain: string
}
