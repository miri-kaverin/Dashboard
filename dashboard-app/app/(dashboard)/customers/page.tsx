import { ContextStrip } from "@/components/shell/context-strip"
import { CustomersPageClient } from "@/app/(dashboard)/customers/_components/customers-page-client"
import { listCustomers } from "@/lib/data"

export default function CustomersPage() {
  const customers = listCustomers()

  return (
    <>
      <ContextStrip
        breadcrumbs={[
          { label: "Overview", href: "/" },
          { label: "Customers" },
        ]}
      />
      <CustomersPageClient customers={customers} />
    </>
  )
}
