"use client"

// context/user-context.tsx

import type React from "react"
import { createContext, useState, useEffect, useContext, type ReactNode } from "react"

interface User {
  id: string
  email: string
  name: string
  // Add other user properties as needed
}

interface UserContextType {
  user: User | null
  login: (email: string, password?: string) => Promise<void>
  logout: () => void
  updateProfile: (updates: Partial<User>) => Promise<void>
  updatePreferences: (preferences: any) => Promise<void> // Replace 'any' with a more specific type
  loading: boolean
  error: Error | null
}

const UserContext = createContext<UserContextType | undefined>(undefined)

interface UserProviderProps {
  children: ReactNode
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    // Simulate fetching user data from local storage or an API
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (e) {
        console.error("Error parsing stored user:", e)
        setError(new Error("Error parsing stored user data."))
      } finally {
        setLoading(false)
      }
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (email: string, password?: string) => {
    setLoading(true)
    setError(null)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const fakeUser: User = {
        id: "123",
        email: email,
        name: "Test User",
      }

      setUser(fakeUser)
      localStorage.setItem("user", JSON.stringify(fakeUser))
    } catch (err: any) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  const updateProfile = async (updates: Partial<User>) => {
    setLoading(true)
    setError(null)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      const updatedUser = { ...user, ...updates } as User
      setUser(updatedUser)
      localStorage.setItem("user", JSON.stringify(updatedUser))
    } catch (err: any) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  const updatePreferences = async (preferences: any) => {
    // Simulate updating user preferences
    setLoading(true)
    setError(null)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      // In a real application, you would update the user object
      // and persist the changes to a database or local storage.
      console.log("Updating preferences:", preferences)
    } catch (err: any) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  const value: UserContextType = {
    user,
    login,
    logout,
    updateProfile,
    updatePreferences,
    loading,
    error,
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export function useUser(): UserContextType {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}

// Safe hook that doesn't throw errors during build
export function useSafeUser() {
  try {
    return useUser()
  } catch (error) {
    // Return safe defaults when context is not available
    return {
      user: null,
      login: async () => {},
      logout: () => {},
      updateProfile: async () => {},
      updatePreferences: async () => {},
      loading: false,
      error: null,
    }
  }
}
