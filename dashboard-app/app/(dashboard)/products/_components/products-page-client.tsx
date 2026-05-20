"use client"

import * as React from "react"
import {
  parseAsString,
  parseAsStringLiteral,
  useQueryState,
} from "nuqs"
import type { ColumnDef, RowSelectionState } from "@tanstack/react-table"
import { IconFilter, IconTrash } from "@tabler/icons-react"
import { toast } from "sonner"
import type { Product, ProductStatus } from "@/lib/types"
import { formatCurrency, formatDate } from "@/lib/format"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DataTable,
  SelectColumn,
  type TableDensity,
} from "@/components/data-table/data-table"
import { BulkActionBar } from "@/components/data-table/bulk-action-bar"
import { ProductDetailSheet } from "@/app/(dashboard)/products/_components/product-detail-sheet"
import { cn } from "@/lib/utils"

const statuses = ["active", "draft", "archived"] as const

const statusVariant: Record<
  ProductStatus,
  "default" | "secondary" | "outline"
> = {
  active: "default",
  draft: "secondary",
  archived: "outline",
}

export function ProductsPageClient({ products }: { products: Product[] }) {
  const [q, setQ] = useQueryState("q", parseAsString.withDefault(""))
  const [status, setStatus] = useQueryState(
    "status",
    parseAsStringLiteral(statuses)
  )
  const [category, setCategory] = useQueryState(
    "category",
    parseAsString.withDefault("")
  )
  const [selectedId, setSelectedId] = useQueryState("id", parseAsString)
  const [create, setCreate] = useQueryState("create", parseAsString)
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({})
  const [density, setDensity] = React.useState<TableDensity>(() => {
    if (typeof window === "undefined") return "compact"
    const stored = localStorage.getItem("table-density")
    return stored === "comfortable" ? "comfortable" : "compact"
  })

  const categories = React.useMemo(
    () => [...new Set(products.map((p) => p.category))].sort(),
    [products]
  )

  const filtered = React.useMemo(() => {
    return products.filter((p) => {
      if (status && p.status !== status) return false
      if (category && p.category !== category) return false
      if (q) {
        const lower = q.toLowerCase()
        return (
          p.name.toLowerCase().includes(lower) ||
          p.sku.toLowerCase().includes(lower)
        )
      }
      return true
    })
  }, [products, q, status, category])

  const selected = products.find((p) => p.id === selectedId)
  const sheetOpen = !!create || !!selectedId

  const columns = React.useMemo<ColumnDef<Product, unknown>[]>(
    () => [
      SelectColumn<Product>(),
      {
        accessorKey: "sku",
        header: "SKU",
        cell: ({ row }) => (
          <span className="font-mono text-xs">{row.original.sku}</span>
        ),
      },
      {
        accessorKey: "name",
        header: "Product",
        cell: ({ row }) => (
          <div>
            <p className="font-medium">{row.original.name}</p>
            <p className="text-xs text-muted-foreground">
              {row.original.category}
            </p>
          </div>
        ),
      },
      {
        accessorKey: "price",
        header: "Price",
        cell: ({ row }) => formatCurrency(row.original.price),
      },
      {
        accessorKey: "stock",
        header: "Stock",
        cell: ({ row }) => (
          <span
            className={cn(
              "tabular-nums",
              row.original.stock < 10 && "text-destructive font-medium"
            )}
          >
            {row.original.stock}
          </span>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
          <Badge variant={statusVariant[row.original.status]}>
            {row.original.status}
          </Badge>
        ),
      },
      {
        accessorKey: "updatedAt",
        header: "Updated",
        cell: ({ row }) => formatDate(row.original.updatedAt),
      },
    ],
    []
  )

  const selectedCount = Object.keys(rowSelection).length

  return (
    <div className="flex flex-1 flex-col gap-3 p-4">
      <div className="flex flex-wrap items-center gap-2">
        <Input
          placeholder="Filter products…"
          value={q}
          onChange={(e) => setQ(e.target.value || null)}
          className="h-8 max-w-xs"
        />
        <Select
          value={status ?? "all"}
          onValueChange={(v) =>
            setStatus(v === "all" ? null : (v as ProductStatus))
          }
        >
          <SelectTrigger className="h-8 w-[130px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            {statuses.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={category || "all"}
          onValueChange={(v) => setCategory(v === "all" ? null : v)}
        >
          <SelectTrigger className="h-8 w-[150px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            {categories.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {(q || status || category) && (
          <Button
            variant="ghost"
            size="xs"
            onClick={() => {
              setQ(null)
              setStatus(null)
              setCategory(null)
            }}
          >
            <IconFilter className="size-3.5" />
            Clear filters
          </Button>
        )}
        <div className="ms-auto flex gap-2">
          <Button
            variant="outline"
            size="xs"
            onClick={() => {
              const next = density === "compact" ? "comfortable" : "compact"
              setDensity(next)
              localStorage.setItem("table-density", next)
            }}
          >
            {density === "compact" ? "Comfortable" : "Compact"}
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {status && (
          <Badge variant="secondary" className="gap-1">
            Status: {status}
            <button
              type="button"
              className="ms-1 hover:opacity-70"
              onClick={() => setStatus(null)}
              aria-label="Remove status filter"
            >
              ×
            </button>
          </Badge>
        )}
        {category && (
          <Badge variant="secondary" className="gap-1">
            {category}
            <button
              type="button"
              className="ms-1 hover:opacity-70"
              onClick={() => setCategory(null)}
              aria-label="Remove category filter"
            >
              ×
            </button>
          </Badge>
        )}
      </div>

      <DataTable
        data={filtered}
        columns={columns}
        density={density}
        rowSelection={rowSelection}
        onRowSelectionChange={setRowSelection}
        getRowId={(row) => row.id}
        onRowClick={(row) => {
          setCreate(null)
          setSelectedId(row.id)
        }}
        emptyMessage="No products match your filters."
      />

      <ProductDetailSheet
        open={sheetOpen}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedId(null)
            setCreate(null)
          }
        }}
        product={selected}
        isCreate={create === "1"}
        onSaved={() => {
          toast.success(
            create === "1" ? "Product created (mock)" : "Product updated (mock)"
          )
          setSelectedId(null)
          setCreate(null)
        }}
      />

      <BulkActionBar
        count={selectedCount}
        onClear={() => setRowSelection({})}
        actions={
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => toast.message("Archive (mock)", { description: `${selectedCount} items` })}
            >
              Archive
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                toast.error("Delete (mock)", { description: `${selectedCount} items` })
                setRowSelection({})
              }}
            >
              <IconTrash className="size-3.5" />
              Delete
            </Button>
          </>
        }
      />
    </div>
  )
}
