"use client"

import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendAreaChart } from "@/components/charts/trend-area-chart"
import { CategoryBarChart } from "@/components/charts/category-bar-chart"
import {
  formatCurrency,
  formatNumber,
  formatPercent,
  formatRelativeDate,
} from "@/lib/format"
import type { Customer, KpiCard } from "@/lib/types"
import { segmentLabels } from "@/lib/mock/customers"
import { cn } from "@/lib/utils"

function formatKpiValue(kpi: KpiCard) {
  if (kpi.format === "currency") return formatCurrency(kpi.value)
  if (kpi.format === "percent") return `${kpi.value}%`
  return formatNumber(kpi.value)
}

export function OverviewContent({
  kpis,
  revenueByCategory,
  topCustomers,
}: {
  kpis: KpiCard[]
  revenueByCategory: { category: string; revenue: number }[]
  topCustomers: Customer[]
}) {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => (
          <Card key={kpi.id} size="sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
                {kpi.label}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-2xl font-semibold tabular-nums">
                {formatKpiValue(kpi)}
              </p>
              <div
                className={cn(
                  "flex items-center gap-1 text-xs font-medium",
                  kpi.deltaPct >= 0
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-destructive"
                )}
              >
                {kpi.deltaPct >= 0 ? (
                  <IconTrendingUp className="size-3.5" />
                ) : (
                  <IconTrendingDown className="size-3.5" />
                )}
                {formatPercent(Math.abs(kpi.deltaPct))} vs last period
              </div>
              <TrendAreaChart
                data={kpi.trend}
                className="h-[72px] w-full aspect-auto"
              />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid flex-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm tracking-widest uppercase">
              Revenue by category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CategoryBarChart
              data={revenueByCategory}
              className="h-[280px] w-full aspect-auto"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm tracking-widest uppercase">
              Top customers
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {topCustomers.map((c, i) => (
              <div
                key={c.id}
                className="flex items-center justify-between gap-2 border-b border-border pb-3 last:border-0 last:pb-0"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{c.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {segmentLabels[c.segment]} · {formatRelativeDate(c.lastOrderAt)}
                  </p>
                </div>
                <div className="text-end shrink-0">
                  <p className="text-sm font-semibold tabular-nums">
                    {formatCurrency(c.lifetimeValue)}
                  </p>
                  <Badge variant="outline" className="text-[10px]">
                    #{i + 1}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
