"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { useSupabase } from "./supabase-context"
import type { UserProfile } from "@/types/user"

interface UserContextType {
  user: UserProfile | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>
  updatePreferences: (preferences: Partial<UserProfile["preferences"]>) => Promise<void>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { supabase } = useSupabase()
  const [user, setUser] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load user data on mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        setIsLoading(true)

        // Get the current session
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (!session) {
          setUser(null)
          return
        }

        // Get user profile data
        const { data: userData, error: userError } = await supabase
          .from("users")
          .select("*")
          .eq("id", session.user.id)
          .single()

        if (userError || !userData) {
          console.error("Error loading user data:", userError)
          setUser(null)
          return
        }

        // Get user preferences
        const { data: preferencesData, error: preferencesError } = await supabase
          .from("user_preferences")
          .select("*")
          .eq("user_id", session.user.id)
          .single()

        if (preferencesError) {
          console.error("Error loading user preferences:", preferencesError)
        }

        // Format user data
        const formattedUser: UserProfile = {
          id: userData.id,
          name: userData.name,
          email: userData.email,
          avatar: userData.avatar_url,
          memberSince: userData.member_since,
          level: userData.level,
          isPremium: userData.is_premium,
          preferences: preferencesData
            ? {
                reminders: preferencesData.reminders,
                morningReminder: preferencesData.morning_reminder,
                eveningReminder: preferencesData.evening_reminder,
                notifications: {
                  training: preferencesData.training_notifications,
                  achievements: preferencesData.achievement_notifications,
                  weeklyReports: preferencesData.weekly_report_notifications,
                  coachTips: preferencesData.coach_tip_notifications,
                },
                theme: preferencesData.theme as "light" | "dark" | "system",
                language: preferencesData.language,
              }
            : {
                reminders: true,
                morningReminder: "08:00",
                eveningReminder: "19:00",
                notifications: {
                  training: true,
                  achievements: true,
                  weeklyReports: true,
                  coachTips: true,
                },
                theme: "system",
                language: "en",
              },
        }

        setUser(formattedUser)
      } catch (error) {
        console.error("Failed to load user:", error)
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    loadUser()

    // Subscribe to auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        loadUser()
      } else if (event === "SIGNED_OUT") {
        setUser(null)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        throw error
      }

      // User data will be loaded by the effect hook
    } catch (error) {
      console.error("Login failed:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      await supabase.auth.signOut()
      setUser(null)
    } catch (error) {
      console.error("Logout failed:", error)
      throw error
    }
  }

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true)
    try {
      // Sign up with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      })

      if (authError) {
        throw authError
      }

      if (!authData.user) {
        throw new Error("User creation failed")
      }

      // Create user profile in the database
      const { error: profileError } = await supabase.from("users").insert({
        id: authData.user.id,
        email,
        name,
        member_since: new Date().toISOString().split("T")[0],
        level: 1,
        is_premium: false,
      })

      if (profileError) {
        throw profileError
      }

      // Create default user preferences
      const { error: preferencesError } = await supabase.from("user_preferences").insert({
        user_id: authData.user.id,
        reminders: true,
        morning_reminder: "08:00:00",
        evening_reminder: "19:00:00",
        training_notifications: true,
        achievement_notifications: true,
        weekly_report_notifications: true,
        coach_tip_notifications: true,
        theme: "system",
        language: "en",
      })

      if (preferencesError) {
        throw preferencesError
      }

      // Initialize domain scores
      const domains = [
        "Memory",
        "Attention",
        "Processing Speed",
        "Reflexes",
        "Executive Control",
        "Problem-Solving",
        "Spatial Reasoning",
        "Language",
        "Numerical Skills",
        "Stress Regulation",
      ]

      for (const domain of domains) {
        await supabase.from("domain_scores").insert({
          user_id: authData.user.id,
          domain,
          score: 50 + Math.floor(Math.random() * 20), // Random starting score between 50-70
          improvement: 0,
        })
      }

      // Initialize training streak
      await supabase.from("training_streaks").insert({
        user_id: authData.user.id,
        current_streak: 0,
        longest_streak: 0,
      })

      // Initialize achievements
      const { data: achievements } = await supabase.from("achievements").select("id, name")

      if (achievements) {
        for (const achievement of achievements) {
          await supabase.from("user_achievements").insert({
            user_id: authData.user.id,
            achievement_id: achievement.id,
            progress: 0,
            target:
              achievement.name === "Consistent Learner"
                ? 7
                : achievement.name === "Memory Master"
                  ? 5
                  : achievement.name === "Attention Expert"
                    ? 10
                    : achievement.name === "Brain Trainer"
                      ? 50
                      : achievement.name === "All-Rounder"
                        ? 10
                        : 20, // Default for others
          })
        }
      }

      // User data will be loaded by the effect hook
    } catch (error) {
      console.error("Registration failed:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return Promise.reject("No user logged in")

    try {
      const { error } = await supabase
        .from("users")
        .update({
          name: updates.name,
          email: updates.email,
          avatar_url: updates.avatar,
        })
        .eq("id", user.id)

      if (error) {
        throw error
      }

      // Update local state
      setUser((prev) => (prev ? { ...prev, ...updates } : null))
      return Promise.resolve()
    } catch (error) {
      console.error("Failed to update profile:", error)
      return Promise.reject(error)
    }
  }

  const updatePreferences = async (preferences: Partial<UserProfile["preferences"]>) => {
    if (!user) return Promise.reject("No user logged in")

    try {
      const { error } = await supabase
        .from("user_preferences")
        .update({
          reminders: preferences.reminders,
          morning_reminder: preferences.morningReminder,
          evening_reminder: preferences.eveningReminder,
          training_notifications: preferences.notifications?.training,
          achievement_notifications: preferences.notifications?.achievements,
          weekly_report_notifications: preferences.notifications?.weeklyReports,
          coach_tip_notifications: preferences.notifications?.coachTips,
          theme: preferences.theme,
          language: preferences.language,
        })
        .eq("user_id", user.id)

      if (error) {
        throw error
      }

      // Update local state
      setUser((prev) =>
        prev
          ? {
              ...prev,
              preferences: { ...prev.preferences, ...preferences },
            }
          : null,
      )
      return Promise.resolve()
    } catch (error) {
      console.error("Failed to update preferences:", error)
      return Promise.reject(error)
    }
  }

  return (
    <UserContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        register,
        updateProfile,
        updatePreferences,
      }}
    >
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
