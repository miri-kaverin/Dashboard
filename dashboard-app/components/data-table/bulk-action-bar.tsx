"use client"

import { Button } from "@/components/ui/button"

export function BulkActionBar({
  count,
  onClear,
  actions,
}: {
  count: number
  onClear: () => void
  actions?: React.ReactNode
}) {
  if (count === 0) return null

  return (
    <div className="fixed inset-x-0 bottom-6 z-50 mx-auto flex w-full max-w-2xl items-center justify-between gap-4 border border-border bg-card px-4 py-3 shadow-lg">
      <span className="text-sm font-medium">
        {count} selected
      </span>
      <div className="flex items-center gap-2">
        {actions}
        <Button variant="ghost" size="sm" onClick={onClear}>
          Clear
        </Button>
      </div>
    </div>
  )
}
