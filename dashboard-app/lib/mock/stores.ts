import type { Store } from "@/lib/types"

export const stores: Store[] = [
  { id: "store-1", name: "Maia Commerce", domain: "maia.store" },
  { id: "store-2", name: "Nordic Home", domain: "nordic-home.shop" },
  { id: "store-3", name: "Urban Threads", domain: "urbanthreads.co" },
]

export function listStores() {
  return stores
}
