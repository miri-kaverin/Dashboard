"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  IconChartBar,
  IconMoon,
  IconPackage,
  IconPlus,
  IconSun,
  IconTextDirectionLtr,
  IconTextDirectionRtl,
  IconUsers,
} from "@tabler/icons-react"
import { useTheme } from "@/components/theme-provider"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { useDirection } from "@/components/providers"
import { navItems } from "@/components/shell/nav-config"

export function CommandPalette() {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()
  const { resolvedTheme, setTheme } = useTheme()
  const { direction, toggleDirection } = useDirection()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const run = (fn: () => void) => {
    setOpen(false)
    fn()
  }

  return (
    <CommandDialog open={open} onOpenChange={setOpen} title="Command palette">
      <CommandInput placeholder="Search commands, pages…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigation">
          {navItems.map((item) => (
            <CommandItem
              key={item.href}
              onSelect={() => run(() => router.push(item.href))}
            >
              <item.icon className="opacity-60" />
              {item.title}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Quick actions">
          <CommandItem onSelect={() => run(() => router.push("/products?create=1"))}>
            <IconPlus />
            Create product
            <CommandShortcut>N</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => run(() => router.push("/customers"))}>
            <IconUsers />
            View customers
          </CommandItem>
          <CommandItem onSelect={() => run(() => router.push("/"))}>
            <IconChartBar />
            Analytics overview
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Preferences">
          <CommandItem
            onSelect={() =>
              run(() =>
                setTheme(resolvedTheme === "dark" ? "light" : "dark")
              )
            }
          >
            {resolvedTheme === "dark" ? <IconSun /> : <IconMoon />}
            Toggle theme
          </CommandItem>
          <CommandItem onSelect={() => run(toggleDirection)}>
            {direction === "ltr" ? (
              <IconTextDirectionRtl />
            ) : (
              <IconTextDirectionLtr />
            )}
            Toggle direction ({direction === "ltr" ? "RTL" : "LTR"})
          </CommandItem>
          <CommandItem onSelect={() => run(() => router.push("/products"))}>
            <IconPackage />
            Products
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
