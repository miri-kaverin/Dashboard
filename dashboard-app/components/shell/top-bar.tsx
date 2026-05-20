"use client"

import * as React from "react"
import {
  IconBell,
  IconMoon,
  IconSearch,
  IconSun,
  IconTextDirectionLtr,
  IconTextDirectionRtl,
} from "@tabler/icons-react"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { useDirection } from "@/components/providers"
import { CommandPalette } from "@/components/shell/command-palette"

export function TopBar() {
  const { resolvedTheme, setTheme } = useTheme()
  const { direction, toggleDirection } = useDirection()
  const searchRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "/" && !e.metaKey && !e.ctrlKey) {
        const tag = (e.target as HTMLElement)?.tagName
        if (tag === "INPUT" || tag === "TEXTAREA") return
        e.preventDefault()
        searchRef.current?.focus()
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <>
      <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border px-4">
        <SidebarTrigger />
        <Separator orientation="vertical" className="h-6" />
        <div className="relative flex flex-1 max-w-md items-center">
          <IconSearch className="pointer-events-none absolute start-3 size-4 text-muted-foreground" />
          <Input
            ref={searchRef}
            placeholder="Search… (press /)"
            className="ps-9 h-9"
            aria-label="Global search"
          />
        </div>
        <div className="ms-auto flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={toggleDirection}
            aria-label="Toggle text direction"
          >
            {direction === "ltr" ? (
              <IconTextDirectionRtl className="size-4" />
            ) : (
              <IconTextDirectionLtr className="size-4" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
            aria-label="Toggle theme"
          >
            {resolvedTheme === "dark" ? (
              <IconSun className="size-4" />
            ) : (
              <IconMoon className="size-4" />
            )}
          </Button>
          <Button variant="ghost" size="icon-sm" aria-label="Notifications">
            <IconBell className="size-4" />
          </Button>
        </div>
      </header>
      <CommandPalette />
    </>
  )
}
