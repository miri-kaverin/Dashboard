"use client"

import type { Customer } from "@/lib/types"
import { segmentLabels } from "@/lib/mock/customers"
import { formatCurrency, formatDate, formatRelativeDate } from "@/lib/format"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function CustomerDetailSheet({
  open,
  onOpenChange,
  customer,
  onAction,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  customer?: Customer
  onAction: (message: string) => void
}) {
  if (!customer) return null

  const initials = customer.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader>
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div>
              <SheetTitle>{customer.name}</SheetTitle>
              <SheetDescription>{customer.email}</SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <div className="flex flex-col gap-4 px-4 py-2">
          <div className="flex flex-wrap gap-2">
            <Badge>{segmentLabels[customer.segment]}</Badge>
            <Badge variant="outline" className="capitalize">
              {customer.status}
            </Badge>
          </div>

          <dl className="grid grid-cols-2 gap-3 text-sm">
            <dt className="text-muted-foreground">Lifetime value</dt>
            <dd className="font-semibold tabular-nums">
              {formatCurrency(customer.lifetimeValue)}
            </dd>
            <dt className="text-muted-foreground">Orders</dt>
            <dd>{customer.ordersCount}</dd>
            <dt className="text-muted-foreground">Last order</dt>
            <dd>{formatRelativeDate(customer.lastOrderAt)}</dd>
            <dt className="text-muted-foreground">Member since</dt>
            <dd>{formatDate(customer.lastOrderAt)}</dd>
          </dl>

          <Separator />

          <p className="text-xs text-muted-foreground">
            Quick actions update mock state only. Connect your CRM API to
            persist changes.
          </p>
        </div>

        <SheetFooter className="flex-col gap-2 sm:flex-col">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => onAction(`Email sent to ${customer.email} (mock)`)}
          >
            Send email
          </Button>
          <Button
            className="w-full"
            onClick={() => onAction(`Note added for ${customer.name} (mock)`)}
          >
            Add note
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
