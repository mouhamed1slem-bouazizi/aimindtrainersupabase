"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import type { SupabaseClient } from "@supabase/supabase-js"
import type { Database } from "@/types/supabase"
import type React from "react"

type SupabaseContextType = {
  supabase: SupabaseClient<Database> | null
}

const SupabaseContext = createContext<SupabaseContextType>({ supabase: null })

export function SupabaseProvider({ children }: { children: React.ReactNode }) {
  const [supabaseClient, setSupabaseClient] = useState<SupabaseClient<Database> | null>(null)

  useEffect(() => {
    // Only initialize the Supabase client on the client side
    try {
      const client = createClientComponentClient<Database>()
      setSupabaseClient(client)
    } catch (error) {
      console.error("Failed to initialize Supabase client:", error)
    }
  }, [])

  return <SupabaseContext.Provider value={{ supabase: supabaseClient }}>{children}</SupabaseContext.Provider>
}

export function useSupabase() {
  return useContext(SupabaseContext)
}
