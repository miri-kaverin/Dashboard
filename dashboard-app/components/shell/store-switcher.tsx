"use client"

import * as React from "react"
import { IconChevronDown, IconBuildingStore } from "@tabler/icons-react"
import { listStores } from "@/lib/data"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"

export function StoreSwitcher() {
  const stores = listStores()
  const [active, setActive] = React.useState(stores[0])

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <SidebarMenuButton
                size="lg"
                className="data-open:bg-sidebar-accent data-open:text-sidebar-accent-foreground"
              >
                <div className="flex aspect-square size-8 items-center justify-center rounded-none bg-sidebar-primary text-sidebar-primary-foreground">
                  <IconBuildingStore className="size-4" />
                </div>
                <div className="grid flex-1 text-start text-xs leading-tight">
                  <span className="truncate font-semibold tracking-wider uppercase">
                    {active.name}
                  </span>
                  <span className="truncate text-muted-foreground">
                    {active.domain}
                  </span>
                </div>
                <IconChevronDown className="ms-auto size-4 opacity-50" />
              </SidebarMenuButton>
            }
          />
          <DropdownMenuContent align="start" className="w-56">
            {stores.map((store) => (
              <DropdownMenuItem
                key={store.id}
                onClick={() => setActive(store)}
              >
                <div className="flex flex-col">
                  <span className="font-medium">{store.name}</span>
                  <span className="text-muted-foreground text-xs">
                    {store.domain}
                  </span>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
