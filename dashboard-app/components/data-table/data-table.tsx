"use client"

import * as React from "react"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type RowSelectionState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

export type TableDensity = "compact" | "comfortable"

const densityClass: Record<TableDensity, string> = {
  compact: "[&_td]:py-1.5 [&_th]:py-2 text-xs",
  comfortable: "[&_td]:py-3 [&_th]:py-3",
}

export function DataTable<TData>({
  data,
  columns,
  density = "compact",
  rowSelection,
  onRowSelectionChange,
  sorting,
  onSortingChange,
  columnVisibility,
  onColumnVisibilityChange,
  onRowClick,
  getRowId,
  pageSize = 10,
  emptyMessage = "No results.",
}: {
  data: TData[]
  columns: ColumnDef<TData, unknown>[]
  density?: TableDensity
  rowSelection?: RowSelectionState
  onRowSelectionChange?: (s: RowSelectionState) => void
  sorting?: SortingState
  onSortingChange?: (s: SortingState) => void
  columnVisibility?: VisibilityState
  onColumnVisibilityChange?: (v: VisibilityState) => void
  onRowClick?: (row: TData) => void
  getRowId?: (row: TData) => string
  pageSize?: number
  emptyMessage?: string
}) {
  const [internalSorting, setInternalSorting] = React.useState<SortingState>([])
  const [internalSelection, setInternalSelection] =
    React.useState<RowSelectionState>({})
  const [internalVisibility, setInternalVisibility] =
    React.useState<VisibilityState>({})

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting: sorting ?? internalSorting,
      rowSelection: rowSelection ?? internalSelection,
      columnVisibility: columnVisibility ?? internalVisibility,
    },
    enableRowSelection: true,
    onSortingChange: onSortingChange
      ? (updater) => {
          const next =
            typeof updater === "function"
              ? updater(sorting ?? internalSorting)
              : updater
          onSortingChange(next)
        }
      : setInternalSorting,
    onRowSelectionChange: onRowSelectionChange
      ? (updater) => {
          const next =
            typeof updater === "function"
              ? updater(rowSelection ?? internalSelection)
              : updater
          onRowSelectionChange(next)
        }
      : setInternalSelection,
    onColumnVisibilityChange: onColumnVisibilityChange
      ? (updater) => {
          const next =
            typeof updater === "function"
              ? updater(columnVisibility ?? internalVisibility)
              : updater
          onColumnVisibilityChange(next)
        }
      : setInternalVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getRowId,
    initialState: { pagination: { pageSize } },
  })

  return (
    <div className="space-y-3">
      <div className={cn("rounded-none border", densityClass[density])}>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={onRowClick ? "cursor-pointer" : undefined}
                  onClick={() => onRowClick?.(row.original)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
        <span>
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount() || 1}
        </span>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="xs"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="xs"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

export function SelectColumn<TData>(): ColumnDef<TData, unknown> {
  return {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        indeterminate={table.getIsSomePageRowsSelected()}
        onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)}
        aria-label="Select all"
        onClick={(e) => e.stopPropagation()}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(v) => row.toggleSelected(!!v)}
        aria-label="Select row"
        onClick={(e) => e.stopPropagation()}
      />
    ),
    enableSorting: false,
    size: 40,
  }
}
