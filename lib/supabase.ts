import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/types/supabase"

// Create a single supabase client for the browser
export const createBrowserClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    if (typeof window !== "undefined") {
      console.error("Supabase URL or Anon Key is missing")
    }
    // During build/SSR, we'll return a dummy client or throw an error
    // depending on the environment
    if (process.env.NODE_ENV === "production") {
      throw new Error("Supabase credentials are required in production")
    }

    // For development, return a mock client to avoid breaking the build
    return createClient("https://placeholder-url.supabase.co", "placeholder-key") as any
  }

  return createClient<Database>(supabaseUrl, supabaseAnonKey)
}

// For server components and server actions
export const createServerClient = () => {
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("Supabase server credentials are required in production")
    }

    // For development, return a mock client to avoid breaking the build
    return createClient("https://placeholder-url.supabase.co", "placeholder-key", {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }) as any
  }

  return createClient<Database>(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}
