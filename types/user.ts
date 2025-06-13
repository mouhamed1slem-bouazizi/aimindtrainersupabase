export interface User {
  id: string
  email: string
  name: string
  avatar_url?: string
  created_at: string
  preferences?: {
    theme?: "light" | "dark" | "system"
    notifications?: {
      email?: boolean
      push?: boolean
      reminders?: boolean
    }
    accessibility?: {
      reducedMotion?: boolean
      highContrast?: boolean
      largeText?: boolean
    }
  }
}
