import type { Product } from "@/lib/types"

const categories = [
  "Electronics",
  "Apparel",
  "Home",
  "Beauty",
  "Sports",
  "Accessories",
]

const names = [
  "Wireless Earbuds Pro",
  "Organic Cotton Tee",
  "Smart Desk Lamp",
  "Hydrating Serum Set",
  "Running Shoes X2",
  "Leather Crossbody Bag",
  "Bluetooth Speaker Mini",
  "Linen Throw Blanket",
  "Vitamin C Moisturizer",
  "Yoga Mat Premium",
  "Stainless Water Bottle",
  "Wool Blend Sweater",
  "Ceramic Planter Set",
  "SPF 50 Sunscreen",
  "Resistance Band Kit",
  "Noise-Cancel Headphones",
  "Silk Scarf Collection",
  "LED Monitor Light",
  "Night Repair Cream",
  "Trail Backpack 28L",
]

export const products: Product[] = names.map((name, i) => {
  const status =
    i % 7 === 0 ? "draft" : i % 11 === 0 ? "archived" : "active"
  const created = new Date()
  created.setDate(created.getDate() - (i + 3) * 2)
  const updated = new Date(created)
  updated.setDate(updated.getDate() + Math.floor(i / 2))
  return {
    id: `prod-${String(i + 1).padStart(3, "0")}`,
    sku: `SKU-${1000 + i}`,
    name,
    category: categories[i % categories.length],
    price: Math.round((29 + i * 7.5 + (i % 3) * 12) * 100) / 100,
    currency: "USD",
    stock: status === "archived" ? 0 : Math.floor(Math.random() * 240) + 4,
    status,
    image: `https://api.dicebear.com/7.x/shapes/svg?seed=${i}`,
    createdAt: created.toISOString(),
    updatedAt: updated.toISOString(),
  }
})

export function listProducts() {
  return [...products]
}

export function getProductById(id: string) {
  return products.find((p) => p.id === id)
}
