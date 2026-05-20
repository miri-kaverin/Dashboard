"use client"

import * as React from "react"
import { ThemeProvider } from "next-themes"
import { NuqsAdapter } from "nuqs/adapters/next/app"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Toaster } from "@/components/ui/sonner"

type Direction = "ltr" | "rtl"

const DirectionContext = React.createContext<{
  direction: Direction
  setDirection: (d: Direction) => void
  toggleDirection: () => void
} | null>(null)

export function useDirection() {
  const ctx = React.useContext(DirectionContext)
  if (!ctx) throw new Error("useDirection must be used within Providers")
  return ctx
}

function readStoredDirection(): Direction {
  if (typeof window === "undefined") return "ltr"
  const stored = localStorage.getItem("dashboard-dir")
  return stored === "rtl" ? "rtl" : "ltr"
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [direction, setDirection] = React.useState<Direction>(readStoredDirection)

  React.useEffect(() => {
    document.documentElement.setAttribute("dir", direction)
    localStorage.setItem("dashboard-dir", direction)
  }, [direction])

  const toggleDirection = React.useCallback(() => {
    setDirection((d) => (d === "ltr" ? "rtl" : "ltr"))
  }, [])

  return (
    <DirectionContext.Provider
      value={{ direction, setDirection, toggleDirection }}
    >
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <NuqsAdapter>
          <TooltipProvider delay={0}>{children}</TooltipProvider>
          <Toaster richColors position={direction === "rtl" ? "top-left" : "top-right"} />
        </NuqsAdapter>
      </ThemeProvider>
    </DirectionContext.Provider>
  )
}
