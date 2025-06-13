export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      achievements: {
        Row: {
          id: string
          name: string
          description: string
          icon: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          icon?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          icon?: string | null
          created_at?: string
        }
        Relationships: []
      }
      cognitive_domains: {
        Row: {
          id: string
          name: string
          description: string
          icon: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          icon?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          icon?: string | null
          created_at?: string
        }
        Relationships: []
      }
      game_sessions: {
        Row: {
          id: string
          user_id: string
          game_id: string
          score: number
          duration: number
          difficulty: string
          completed: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          game_id: string
          score: number
          duration: number
          difficulty: string
          completed: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          game_id?: string
          score?: number
          duration?: number
          difficulty?: string
          completed?: boolean
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "game_sessions_game_id_fkey"
            columns: ["game_id"]
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "game_sessions_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      games: {
        Row: {
          id: string
          name: string
          description: string
          instructions: string
          thumbnail: string | null
          difficulty_levels: string[]
          domain_id: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          instructions: string
          thumbnail?: string | null
          difficulty_levels: string[]
          domain_id: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          instructions?: string
          thumbnail?: string | null
          difficulty_levels?: string[]
          domain_id?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "games_domain_id_fkey"
            columns: ["domain_id"]
            referencedRelation: "cognitive_domains"
            referencedColumns: ["id"]
          },
        ]
      }
      neuroscience_insights: {
        Row: {
          id: string
          title: string
          content: string
          image_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          content: string
          image_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          content?: string
          image_url?: string | null
          created_at?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          title: string
          message: string
          read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          message: string
          read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          message?: string
          read?: boolean
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      training_plans: {
        Row: {
          id: string
          user_id: string
          name: string
          description: string
          games: string[]
          schedule: Json
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          description: string
          games: string[]
          schedule: Json
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          description?: string
          games?: string[]
          schedule?: Json
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "training_plans_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_achievements: {
        Row: {
          id: string
          user_id: string
          achievement_id: string
          earned_at: string
        }
        Insert: {
          id?: string
          user_id: string
          achievement_id: string
          earned_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          achievement_id?: string
          earned_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_achievements_achievement_id_fkey"
            columns: ["achievement_id"]
            referencedRelation: "achievements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_achievements_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profiles: {
        Row: {
          id: string
          user_id: string
          full_name: string
          email: string
          avatar_url: string | null
          bio: string | null
          preferences: Json | null
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          full_name: string
          email: string
          avatar_url?: string | null
          bio?: string | null
          preferences?: Json | null
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          full_name?: string
          email?: string
          avatar_url?: string | null
          bio?: string | null
          preferences?: Json | null
          created_at?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_profiles_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
