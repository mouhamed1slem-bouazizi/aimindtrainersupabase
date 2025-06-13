"use client"

import { ThemeProvider } from "@/components/theme-provider"
import { SupabaseProvider } from "@/context/supabase-context"
import { Toaster } from "@/components/ui/toast"
import type { ReactNode } from "react"

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SupabaseProvider>
        <Toaster />
        {children}
      </SupabaseProvider>
    </ThemeProvider>
  )
}
