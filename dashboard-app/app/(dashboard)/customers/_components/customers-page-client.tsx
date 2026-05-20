"use client"

import * as React from "react"
import {
  parseAsString,
  parseAsStringLiteral,
  useQueryState,
} from "nuqs"
import type { ColumnDef, RowSelectionState } from "@tanstack/react-table"
import { toast } from "sonner"
import type { Customer, CustomerSegment } from "@/lib/types"
import { segmentLabels } from "@/lib/mock/customers"
import { formatCurrency, formatRelativeDate } from "@/lib/format"
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DataTable,
  SelectColumn,
} from "@/components/data-table/data-table"
import { BulkActionBar } from "@/components/data-table/bulk-action-bar"
import { CustomerDetailSheet } from "@/app/(dashboard)/customers/_components/customer-detail-sheet"

const segments = ["vip", "regular", "new", "at_risk"] as const

const segmentVariant: Record<
  CustomerSegment,
  "default" | "secondary" | "outline" | "destructive"
> = {
  vip: "default",
  regular: "secondary",
  new: "outline",
  at_risk: "destructive",
}

export function CustomersPageClient({
  customers,
}: {
  customers: Customer[]
}) {
  const [q, setQ] = useQueryState("q", parseAsString.withDefault(""))
  const [segment, setSegment] = useQueryState(
    "segment",
    parseAsStringLiteral(segments)
  )
  const [selectedId, setSelectedId] = useQueryState("id", parseAsString)
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({})

  const filtered = React.useMemo(() => {
    return customers.filter((c) => {
      if (segment && c.segment !== segment) return false
      if (q) {
        const lower = q.toLowerCase()
        return (
          c.name.toLowerCase().includes(lower) ||
          c.email.toLowerCase().includes(lower)
        )
      }
      return true
    })
  }, [customers, q, segment])

  const selected = customers.find((c) => c.id === selectedId)

  const columns = React.useMemo<ColumnDef<Customer, unknown>[]>(
    () => [
      SelectColumn<Customer>(),
      {
        accessorKey: "name",
        header: "Customer",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <Avatar size="sm">
              <AvatarFallback>
                {row.original.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{row.original.name}</p>
              <p className="text-xs text-muted-foreground">
                {row.original.email}
              </p>
            </div>
          </div>
        ),
      },
      {
        accessorKey: "segment",
        header: "Segment",
        cell: ({ row }) => (
          <Badge variant={segmentVariant[row.original.segment]}>
            {segmentLabels[row.original.segment]}
          </Badge>
        ),
      },
      {
        accessorKey: "lifetimeValue",
        header: "LTV",
        cell: ({ row }) => (
          <span className="font-medium tabular-nums">
            {formatCurrency(row.original.lifetimeValue)}
          </span>
        ),
      },
      {
        accessorKey: "ordersCount",
        header: "Orders",
      },
      {
        accessorKey: "lastOrderAt",
        header: "Last order",
        cell: ({ row }) => formatRelativeDate(row.original.lastOrderAt),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
          <Badge variant="outline" className="capitalize">
            {row.original.status}
          </Badge>
        ),
      },
    ],
    []
  )

  const selectedCount = Object.keys(rowSelection).length

  return (
    <div className="flex flex-1 flex-col gap-3 p-4">
      <div className="flex flex-wrap items-center gap-2">
        <Input
          placeholder="Search customers…"
          value={q}
          onChange={(e) => setQ(e.target.value || null)}
          className="h-8 max-w-xs"
        />
        <Select
          value={segment ?? "all"}
          onValueChange={(v) =>
            setSegment(v === "all" ? null : (v as CustomerSegment))
          }
        >
          <SelectTrigger className="h-8 w-[140px]">
            <SelectValue placeholder="Segment" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All segments</SelectItem>
            {segments.map((s) => (
              <SelectItem key={s} value={s}>
                {segmentLabels[s]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {(q || segment) && (
          <Button
            variant="ghost"
            size="xs"
            onClick={() => {
              setQ(null)
              setSegment(null)
            }}
          >
            Clear filters
          </Button>
        )}
      </div>

      {segment && (
        <Badge variant="secondary" className="w-fit gap-1">
          Segment: {segmentLabels[segment]}
          <button
            type="button"
            className="ms-1"
            onClick={() => setSegment(null)}
            aria-label="Clear segment"
          >
            ×
          </button>
        </Badge>
      )}

      <DataTable
        data={filtered}
        columns={columns}
        rowSelection={rowSelection}
        onRowSelectionChange={setRowSelection}
        getRowId={(row) => row.id}
        onRowClick={(row) => setSelectedId(row.id)}
        emptyMessage="No customers match your search."
      />

      <CustomerDetailSheet
        open={!!selectedId}
        onOpenChange={(open) => !open && setSelectedId(null)}
        customer={selected}
        onAction={(msg) => {
          toast.success(msg)
          setSelectedId(null)
        }}
      />

      <BulkActionBar
        count={selectedCount}
        onClear={() => setRowSelection({})}
        actions={
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              toast.message("Export CSV (mock)", {
                description: `${selectedCount} customers`,
              })
            }
          >
            Export
          </Button>
        }
      />
    </div>
  )
}
