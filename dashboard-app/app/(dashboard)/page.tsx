import { ContextStrip } from "@/components/shell/context-strip"
import { OverviewContent } from "@/app/(dashboard)/_components/overview-content"
import { listKpis, revenueByCategory, getTopCustomers } from "@/lib/data"

export default function OverviewPage() {
  const kpis = listKpis()
  const topCustomers = getTopCustomers(5)

  return (
    <>
      <ContextStrip breadcrumbs={[{ label: "Overview" }]} />
      <OverviewContent
        kpis={kpis}
        revenueByCategory={revenueByCategory}
        topCustomers={topCustomers}
      />
    </>
  )
}
