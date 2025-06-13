"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { useSupabase } from "./supabase-context"
import type { User } from "@/types/user"
import type React from "react"

type UserContextType = {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>
  register: (email: string, password: string, name: string) => Promise<{ success: boolean; message: string }>
  logout: () => Promise<void>
  updateProfile: (data: Partial<User>) => Promise<{ success: boolean; message: string }>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { supabase } = useSupabase()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!supabase) return

    // Check for existing session
    const checkUser = async () => {
      try {
        setIsLoading(true)
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (session) {
          const { data: profile } = await supabase.from("profiles").select("*").eq("id", session.user.id).single()

          if (profile) {
            setUser({
              id: session.user.id,
              email: session.user.email || "",
              name: profile.name || "",
              avatar_url: profile.avatar_url,
              created_at: profile.created_at,
              preferences: profile.preferences || {},
            })
          }
        }
      } catch (error) {
        console.error("Error loading user:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkUser()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session) {
        const { data: profile } = await supabase.from("profiles").select("*").eq("id", session.user.id).single()

        if (profile) {
          setUser({
            id: session.user.id,
            email: session.user.email || "",
            name: profile.name || "",
            avatar_url: profile.avatar_url,
            created_at: profile.created_at,
            preferences: profile.preferences || {},
          })
        }
      } else if (event === "SIGNED_OUT") {
        setUser(null)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase])

  const login = async (email: string, password: string) => {
    if (!supabase) return { success: false, message: "Supabase client not initialized" }

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password })

      if (error) {
        return { success: false, message: error.message }
      }

      return { success: true, message: "Logged in successfully" }
    } catch (error) {
      console.error("Login error:", error)
      return { success: false, message: "An unexpected error occurred" }
    }
  }

  const register = async (email: string, password: string, name: string) => {
    if (!supabase) return { success: false, message: "Supabase client not initialized" }

    try {
      const { error, data } = await supabase.auth.signUp({ email, password })

      if (error) {
        return { success: false, message: error.message }
      }

      if (data.user) {
        // Create a profile for the new user
        const { error: profileError } = await supabase.from("profiles").insert({
          id: data.user.id,
          name,
          email,
          created_at: new Date().toISOString(),
        })

        if (profileError) {
          return { success: false, message: profileError.message }
        }
      }

      return { success: true, message: "Registration successful" }
    } catch (error) {
      console.error("Registration error:", error)
      return { success: false, message: "An unexpected error occurred" }
    }
  }

  const logout = async () => {
    if (!supabase) return

    try {
      await supabase.auth.signOut()
      setUser(null)
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  const updateProfile = async (data: Partial<User>) => {
    if (!supabase || !user) return { success: false, message: "Not authenticated" }

    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          name: data.name,
          avatar_url: data.avatar_url,
          preferences: data.preferences,
        })
        .eq("id", user.id)

      if (error) {
        return { success: false, message: error.message }
      }

      // Update local user state
      setUser({ ...user, ...data })

      return { success: true, message: "Profile updated successfully" }
    } catch (error) {
      console.error("Profile update error:", error)
      return { success: false, message: "An unexpected error occurred" }
    }
  }

  return (
    <UserContext.Provider value={{ user, isLoading, login, register, logout, updateProfile }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
