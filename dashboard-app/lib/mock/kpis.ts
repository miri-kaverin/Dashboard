import type { KpiCard, TimeSeriesPoint } from "@/lib/types"

function trend(base: number, variance = 0.15): TimeSeriesPoint[] {
  const points: TimeSeriesPoint[] = []
  let value = base
  const now = new Date()
  for (let i = 29; i >= 0; i--) {
    const d = new Date(now)
    d.setDate(d.getDate() - i)
    value = value * (1 + (Math.random() - 0.5) * variance)
    points.push({
      date: d.toISOString().slice(0, 10),
      value: Math.round(value),
    })
  }
  return points
}

export const kpis: KpiCard[] = [
  {
    id: "revenue",
    label: "Revenue",
    value: 284920,
    deltaPct: 12.4,
    format: "currency",
    trend: trend(8200, 0.12),
  },
  {
    id: "orders",
    label: "Orders",
    value: 1842,
    deltaPct: 8.1,
    format: "number",
    trend: trend(58, 0.1),
  },
  {
    id: "customers",
    label: "New customers",
    value: 326,
    deltaPct: -2.3,
    format: "number",
    trend: trend(11, 0.14),
  },
  {
    id: "conversion",
    label: "Conversion rate",
    value: 3.8,
    deltaPct: 0.6,
    format: "percent",
    trend: trend(3.5, 0.08),
  },
]

export const revenueByCategory = [
  { category: "Electronics", revenue: 98400 },
  { category: "Apparel", revenue: 76200 },
  { category: "Home", revenue: 52100 },
  { category: "Beauty", revenue: 34800 },
  { category: "Sports", revenue: 23420 },
]

export function listKpis() {
  return kpis
}
