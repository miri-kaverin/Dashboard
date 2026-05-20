"use client"

import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { useDirection } from "@/components/providers"
import type { TimeSeriesPoint } from "@/lib/types"

const chartConfig = {
  value: { label: "Value", color: "var(--chart-1)" },
} satisfies ChartConfig

export function TrendAreaChart({
  data,
  className,
}: {
  data: TimeSeriesPoint[]
  className?: string
}) {
  const { direction } = useDirection()
  const isRtl = direction === "rtl"

  return (
    <ChartContainer config={chartConfig} className={className}>
      <AreaChart data={data} margin={{ left: 0, right: 0, top: 8, bottom: 0 }}>
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          reversed={isRtl}
          tickFormatter={(v) =>
            new Date(v).toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
            })
          }
        />
        <YAxis hide reversed={isRtl} orientation={isRtl ? "right" : "left"} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Area
          type="monotone"
          dataKey="value"
          stroke="var(--color-value)"
          fill="var(--color-value)"
          fillOpacity={0.2}
        />
      </AreaChart>
    </ChartContainer>
  )
}
