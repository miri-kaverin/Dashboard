"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { useDirection } from "@/components/providers"

const chartConfig = {
  revenue: { label: "Revenue", color: "var(--chart-2)" },
} satisfies ChartConfig

export function CategoryBarChart({
  data,
  className,
}: {
  data: { category: string; revenue: number }[]
  className?: string
}) {
  const { direction } = useDirection()
  const isRtl = direction === "rtl"

  return (
    <ChartContainer config={chartConfig} className={className}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ left: 8, right: 8, top: 8, bottom: 8 }}
      >
        <CartesianGrid horizontal={false} strokeDasharray="3 3" />
        <XAxis type="number" reversed={isRtl} hide />
        <YAxis
          type="category"
          dataKey="category"
          tickLine={false}
          axisLine={false}
          width={100}
          orientation={isRtl ? "right" : "left"}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="revenue" fill="var(--color-revenue)" radius={0} />
      </BarChart>
    </ChartContainer>
  )
}
