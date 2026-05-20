"use client"

import * as React from "react"
import type { Product, ProductStatus } from "@/lib/types"
import { formatCurrency, formatDate } from "@/lib/format"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

function ProductForm({
  product,
  isCreate,
  onSaved,
  onCancel,
}: {
  product?: Product
  isCreate?: boolean
  onSaved: () => void
  onCancel: () => void
}) {
  const [name, setName] = React.useState(isCreate ? "" : (product?.name ?? ""))
  const [sku, setSku] = React.useState(isCreate ? "" : (product?.sku ?? ""))
  const [price, setPrice] = React.useState(
    isCreate ? "" : String(product?.price ?? "")
  )
  const [stock, setStock] = React.useState(
    isCreate ? "" : String(product?.stock ?? "")
  )
  const [status, setStatus] = React.useState<ProductStatus>(
    isCreate ? "draft" : (product?.status ?? "active")
  )

  return (
    <>
      <div className="flex flex-col gap-4 px-4 py-2">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="sku">SKU</Label>
          <Input id="sku" value={sku} onChange={(e) => setSku(e.target.value)} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="stock">Stock</Label>
            <Input
              id="stock"
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Status</Label>
          <Select
            value={status}
            onValueChange={(v) => setStatus(v as ProductStatus)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {product && !isCreate && (
          <>
            <Separator />
            <dl className="grid grid-cols-2 gap-2 text-xs">
              <dt className="text-muted-foreground">Category</dt>
              <dd>{product.category}</dd>
              <dt className="text-muted-foreground">List price</dt>
              <dd>{formatCurrency(product.price)}</dd>
              <dt className="text-muted-foreground">Created</dt>
              <dd>{formatDate(product.createdAt)}</dd>
            </dl>
          </>
        )}
      </div>

      <SheetFooter className="flex-row gap-2 sm:justify-end">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={onSaved}>
          {isCreate ? "Create" : "Save changes"}
        </Button>
      </SheetFooter>
    </>
  )
}

export function ProductDetailSheet({
  open,
  onOpenChange,
  product,
  isCreate,
  onSaved,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  product?: Product
  isCreate?: boolean
  onSaved: () => void
}) {
  const formKey = isCreate ? "create" : (product?.id ?? "none")

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="tracking-widest uppercase">
            {isCreate ? "New product" : "Edit product"}
          </SheetTitle>
          <SheetDescription>
            {isCreate
              ? "Add a new catalog item. Changes are mock-only."
              : product
                ? `SKU ${product.sku} · Updated ${formatDate(product.updatedAt)}`
                : ""}
          </SheetDescription>
        </SheetHeader>

        {open && (
          <ProductForm
            key={formKey}
            product={product}
            isCreate={isCreate}
            onSaved={onSaved}
            onCancel={() => onOpenChange(false)}
          />
        )}
      </SheetContent>
    </Sheet>
  )
}
