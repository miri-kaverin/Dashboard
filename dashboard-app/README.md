# Maia Commerce — Ecommerce Admin Dashboard

Next.js admin dashboard for managing an online store, built with the shadcn **base-sera** preset (`b45TtPLVb`), Base UI, RTL support, and mock data.

## Getting started

```bash
cd dashboard-app
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Features

- **Overview** — KPI cards, revenue-by-category chart, top customers
- **Products** — Dense table, URL filters, bulk actions, create/edit drawer
- **Customers** — Segments, LTV, detail drawer with quick actions
- **Orders / Settings** — Placeholder empty states
- **Power-user UX** — Command palette (`⌘K`), `/` to focus search, row selection, density toggle
- **RTL** — Toggle direction from the top bar; logical Tailwind utilities throughout

## Stack

- Next.js 16 (App Router)
- shadcn/ui (Base UI + Tabler icons)
- TanStack Table, Recharts, nuqs, next-themes, Sonner

## Project structure

```
app/(dashboard)/     # Dashboard routes
components/shell/    # Sidebar, top bar, command palette
components/data-table/
lib/types/           # Domain types
lib/mock/            # Mock data (swap for API via lib/data/)
```
