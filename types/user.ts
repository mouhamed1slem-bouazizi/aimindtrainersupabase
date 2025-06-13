export interface UserProfile {
  id: string
  name: string
  email: string
  avatar?: string
  memberSince: string
  level: number
  isPremium: boolean
  preferences: {
    reminders: boolean
    morningReminder: string
    eveningReminder: string
    notifications: {
      training: boolean
      achievements: boolean
      weeklyReports: boolean
      coachTips: boolean
    }
    theme: "light" | "dark" | "system"
    language: string
  }
}
