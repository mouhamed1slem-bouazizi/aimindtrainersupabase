"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { createBrowserClient } from "@/lib/supabase"
import type { SupabaseClient } from "@supabase/supabase-js"
import type { Database } from "@/types/supabase"
import type React from "react"

type SupabaseContext = {
  supabase: SupabaseClient<Database>
}

const Context = createContext<SupabaseContext | undefined>(undefined)

export function SupabaseProvider({ children }: { children: React.ReactNode }) {
  const [supabase] = useState(() => createBrowserClient())

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      // Refresh the page on auth state change to update server components
      // This is a simple approach - in a more complex app, you might want to use
      // a more sophisticated approach to avoid full page refreshes
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase])

  return <Context.Provider value={{ supabase }}>{children}</Context.Provider>
}

export function useSupabase() {
  const context = useContext(Context)
  if (context === undefined) {
    throw new Error("useSupabase must be used within a SupabaseProvider")
  }
  return context
}
