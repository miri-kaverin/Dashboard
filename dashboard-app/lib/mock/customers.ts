import type { Customer, CustomerSegment } from "@/lib/types"

const customers: Customer[] = [
  {
    id: "cust-001",
    name: "Amina Hassan",
    email: "amina.hassan@email.com",
    segment: "vip",
    lifetimeValue: 4820,
    ordersCount: 28,
    lastOrderAt: "2026-05-18T10:22:00Z",
    status: "active",
  },
  {
    id: "cust-002",
    name: "James Chen",
    email: "j.chen@email.com",
    segment: "regular",
    lifetimeValue: 1240,
    ordersCount: 9,
    lastOrderAt: "2026-05-17T14:05:00Z",
    status: "active",
  },
  {
    id: "cust-003",
    name: "Sofia Martinez",
    email: "sofia.m@email.com",
    segment: "new",
    lifetimeValue: 186,
    ordersCount: 1,
    lastOrderAt: "2026-05-19T09:11:00Z",
    status: "active",
  },
  {
    id: "cust-004",
    name: "Oliver Wright",
    email: "oliver.w@email.com",
    segment: "at_risk",
    lifetimeValue: 890,
    ordersCount: 6,
    lastOrderAt: "2026-04-02T16:40:00Z",
    status: "inactive",
  },
  {
    id: "cust-005",
    name: "Yuki Tanaka",
    email: "yuki.t@email.com",
    segment: "vip",
    lifetimeValue: 6120,
    ordersCount: 41,
    lastOrderAt: "2026-05-19T18:30:00Z",
    status: "active",
  },
  {
    id: "cust-006",
    name: "Emma Wilson",
    email: "emma.w@email.com",
    segment: "regular",
    lifetimeValue: 2100,
    ordersCount: 14,
    lastOrderAt: "2026-05-16T11:00:00Z",
    status: "active",
  },
  {
    id: "cust-007",
    name: "Lucas Bernard",
    email: "lucas.b@email.com",
    segment: "new",
    lifetimeValue: 320,
    ordersCount: 2,
    lastOrderAt: "2026-05-15T08:45:00Z",
    status: "active",
  },
  {
    id: "cust-008",
    name: "Priya Sharma",
    email: "priya.s@email.com",
    segment: "regular",
    lifetimeValue: 1580,
    ordersCount: 11,
    lastOrderAt: "2026-05-14T20:12:00Z",
    status: "active",
  },
  {
    id: "cust-009",
    name: "Noah Kim",
    email: "noah.k@email.com",
    segment: "at_risk",
    lifetimeValue: 640,
    ordersCount: 4,
    lastOrderAt: "2026-03-28T12:00:00Z",
    status: "churned",
  },
  {
    id: "cust-010",
    name: "Isabella Rossi",
    email: "isabella.r@email.com",
    segment: "vip",
    lifetimeValue: 3890,
    ordersCount: 22,
    lastOrderAt: "2026-05-18T22:18:00Z",
    status: "active",
  },
  {
    id: "cust-011",
    name: "Marcus Johnson",
    email: "marcus.j@email.com",
    segment: "regular",
    lifetimeValue: 980,
    ordersCount: 7,
    lastOrderAt: "2026-05-12T15:30:00Z",
    status: "active",
  },
  {
    id: "cust-012",
    name: "Fatima Al-Rashid",
    email: "fatima.ar@email.com",
    segment: "vip",
    lifetimeValue: 7200,
    ordersCount: 52,
    lastOrderAt: "2026-05-19T07:55:00Z",
    status: "active",
  },
]

export function listCustomers() {
  return [...customers]
}

export function getCustomerById(id: string) {
  return customers.find((c) => c.id === id)
}

export function getTopCustomers(limit = 5) {
  return [...customers]
    .sort((a, b) => b.lifetimeValue - a.lifetimeValue)
    .slice(0, limit)
}

export const segmentLabels: Record<CustomerSegment, string> = {
  vip: "VIP",
  regular: "Regular",
  new: "New",
  at_risk: "At risk",
}
