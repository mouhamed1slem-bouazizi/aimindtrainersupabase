export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string
          avatar_url: string | null
          member_since: string
          level: number
          is_premium: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          name: string
          avatar_url?: string | null
          member_since?: string
          level?: number
          is_premium?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          avatar_url?: string | null
          member_since?: string
          level?: number
          is_premium?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      user_preferences: {
        Row: {
          id: string
          user_id: string
          reminders: boolean
          morning_reminder: string
          evening_reminder: string
          training_notifications: boolean
          achievement_notifications: boolean
          weekly_report_notifications: boolean
          coach_tip_notifications: boolean
          theme: string
          language: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          reminders?: boolean
          morning_reminder?: string
          evening_reminder?: string
          training_notifications?: boolean
          achievement_notifications?: boolean
          weekly_report_notifications?: boolean
          coach_tip_notifications?: boolean
          theme?: string
          language?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          reminders?: boolean
          morning_reminder?: string
          evening_reminder?: string
          training_notifications?: boolean
          achievement_notifications?: boolean
          weekly_report_notifications?: boolean
          coach_tip_notifications?: boolean
          theme?: string
          language?: string
          created_at?: string
          updated_at?: string
        }
      }
      domain_scores: {
        Row: {
          id: string
          user_id: string
          domain: string
          score: number
          improvement: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          domain: string
          score: number
          improvement: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          domain?: string
          score?: number
          improvement?: number
          created_at?: string
          updated_at?: string
        }
      }
      training_streaks: {
        Row: {
          id: string
          user_id: string
          current_streak: number
          longest_streak: number
          last_training_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          current_streak?: number
          longest_streak?: number
          last_training_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          current_streak?: number
          longest_streak?: number
          last_training_date?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      games: {
        Row: {
          id: string
          name: string
          description: string
          domain: string
          duration: number
          difficulty: string
          image_url: string | null
          is_premium: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          domain: string
          duration: number
          difficulty: string
          image_url?: string | null
          is_premium?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          domain?: string
          duration?: number
          difficulty?: string
          image_url?: string | null
          is_premium?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      game_sessions: {
        Row: {
          id: string
          user_id: string
          game_id: string
          score: number
          duration: number
          difficulty: string
          completed_at: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          game_id: string
          score: number
          duration: number
          difficulty: string
          completed_at?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          game_id?: string
          score?: number
          duration?: number
          difficulty?: string
          completed_at?: string
          created_at?: string
        }
      }
      training_plans: {
        Row: {
          id: string
          user_id: string
          start_date: string
          end_date: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          start_date: string
          end_date: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          start_date?: string
          end_date?: string
          created_at?: string
          updated_at?: string
        }
      }
      training_plan_days: {
        Row: {
          id: string
          training_plan_id: string
          day_number: number
          date: string
          completed: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          training_plan_id: string
          day_number: number
          date: string
          completed?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          training_plan_id?: string
          day_number?: number
          date?: string
          completed?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      training_plan_games: {
        Row: {
          id: string
          training_plan_day_id: string
          game_id: string
          completed: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          training_plan_day_id: string
          game_id: string
          completed?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          training_plan_day_id?: string
          game_id?: string
          completed?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      achievements: {
        Row: {
          id: string
          name: string
          description: string
          icon: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          icon: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          icon?: string
          created_at?: string
          updated_at?: string
        }
      }
      user_achievements: {
        Row: {
          id: string
          user_id: string
          achievement_id: string
          unlocked_at: string | null
          progress: number
          target: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          achievement_id: string
          unlocked_at?: string | null
          progress?: number
          target?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          achievement_id?: string
          unlocked_at?: string | null
          progress?: number
          target?: number
          created_at?: string
          updated_at?: string
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          title: string
          message: string
          type: string
          read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          message: string
          type: string
          read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          message?: string
          type?: string
          read?: boolean
          created_at?: string
        }
      }
      coach_messages: {
        Row: {
          id: string
          user_id: string
          content: string
          type: string
          read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          content: string
          type: string
          read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          content?: string
          type?: string
          read?: boolean
          created_at?: string
        }
      }
      user_favorites: {
        Row: {
          id: string
          user_id: string
          game_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          game_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          game_id?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
