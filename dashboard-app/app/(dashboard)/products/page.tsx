import { ContextStrip } from "@/components/shell/context-strip"
import { ProductsPageClient } from "@/app/(dashboard)/products/_components/products-page-client"
import { listProducts } from "@/lib/data"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { IconPlus } from "@tabler/icons-react"

export default function ProductsPage() {
  const products = listProducts()

  return (
    <>
      <ContextStrip
        breadcrumbs={[
          { label: "Overview", href: "/" },
          { label: "Products" },
        ]}
        actions={
          <Button size="sm" render={<Link href="/products?create=1" />}>
            <IconPlus className="size-4" />
            New product
          </Button>
        }
      />
      <ProductsPageClient products={products} />
    </>
  )
}
