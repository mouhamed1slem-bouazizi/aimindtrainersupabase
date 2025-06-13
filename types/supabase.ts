export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      achievements: {
        Row: {
          id: number
          name: string
          description: string
          icon: string | null
          criteria: Json
        }
        Insert: {
          id?: number
          name: string
          description: string
          icon?: string | null
          criteria: Json
        }
        Update: {
          id?: number
          name?: string
          description?: string
          icon?: string | null
          criteria?: Json
        }
        Relationships: []
      }
      brain_regions: {
        Row: {
          id: number
          name: string
          description: string | null
        }
        Insert: {
          id?: number
          name: string
          description?: string | null
        }
        Update: {
          id?: number
          name?: string
          description?: string | null
        }
        Relationships: []
      }
      cognitive_domains: {
        Row: {
          id: number
          name: string
          description: string | null
          icon: string | null
        }
        Insert: {
          id?: number
          name: string
          description?: string | null
          icon?: string | null
        }
        Update: {
          id?: number
          name?: string
          description?: string | null
          icon?: string | null
        }
        Relationships: []
      }
      domain_progress: {
        Row: {
          id: number
          user_id: string
          domain_id: number
          score: number
          updated_at: string
        }
        Insert: {
          id?: number
          user_id: string
          domain_id: number
          score: number
          updated_at?: string
        }
        Update: {
          id?: number
          user_id?: string
          domain_id?: number
          score?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "domain_progress_domain_id_fkey"
            columns: ["domain_id"]
            referencedRelation: "cognitive_domains"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "domain_progress_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      game_brain_regions: {
        Row: {
          game_id: number
          region_id: number
        }
        Insert: {
          game_id: number
          region_id: number
        }
        Update: {
          game_id?: number
          region_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "game_brain_regions_game_id_fkey"
            columns: ["game_id"]
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "game_brain_regions_region_id_fkey"
            columns: ["region_id"]
            referencedRelation: "brain_regions"
            referencedColumns: ["id"]
          },
        ]
      }
      game_domains: {
        Row: {
          game_id: number
          domain_id: number
          impact_level: number
        }
        Insert: {
          game_id: number
          domain_id: number
          impact_level?: number
        }
        Update: {
          game_id?: number
          domain_id?: number
          impact_level?: number
        }
        Relationships: [
          {
            foreignKeyName: "game_domains_domain_id_fkey"
            columns: ["domain_id"]
            referencedRelation: "cognitive_domains"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "game_domains_game_id_fkey"
            columns: ["game_id"]
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
        ]
      }
      game_sessions: {
        Row: {
          id: string
          user_id: string
          game_id: number
          difficulty_level: number
          score: number
          duration_seconds: number
          completed: boolean
          created_at: string
          metadata: Json | null
        }
        Insert: {
          id?: string
          user_id: string
          game_id: number
          difficulty_level: number
          score: number
          duration_seconds: number
          completed?: boolean
          created_at?: string
          metadata?: Json | null
        }
        Update: {
          id?: string
          user_id?: string
          game_id?: number
          difficulty_level?: number
          score?: number
          duration_seconds?: number
          completed?: boolean
          created_at?: string
          metadata?: Json | null
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
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      games: {
        Row: {
          id: number
          name: string
          description: string | null
          instructions: string | null
          thumbnail_url: string | null
          difficulty_levels: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          name: string
          description?: string | null
          instructions?: string | null
          thumbnail_url?: string | null
          difficulty_levels?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          name?: string
          description?: string | null
          instructions?: string | null
          thumbnail_url?: string | null
          difficulty_levels?: Json | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      insights: {
        Row: {
          id: number
          title: string
          content: string
          source: string | null
          created_at: string
        }
        Insert: {
          id?: number
          title: string
          content: string
          source?: string | null
          created_at?: string
        }
        Update: {
          id?: number
          title?: string
          content?: string
          source?: string | null
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
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          id: string
          name: string | null
          email: string
          avatar_url: string | null
          created_at: string
          preferences: Json | null
        }
        Insert: {
          id: string
          name?: string | null
          email: string
          avatar_url?: string | null
          created_at?: string
          preferences?: Json | null
        }
        Update: {
          id?: string
          name?: string | null
          email?: string
          avatar_url?: string | null
          created_at?: string
          preferences?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      streaks: {
        Row: {
          user_id: string
          current_streak: number
          longest_streak: number
          last_activity_date: string
        }
        Insert: {
          user_id: string
          current_streak?: number
          longest_streak?: number
          last_activity_date?: string
        }
        Update: {
          user_id?: string
          current_streak?: number
          longest_streak?: number
          last_activity_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "streaks_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      training_plan_games: {
        Row: {
          plan_id: number
          game_id: number
          day_number: number
        }
        Insert: {
          plan_id: number
          game_id: number
          day_number: number
        }
        Update: {
          plan_id?: number
          game_id?: number
          day_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "training_plan_games_game_id_fkey"
            columns: ["game_id"]
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "training_plan_games_plan_id_fkey"
            columns: ["plan_id"]
            referencedRelation: "training_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      training_plans: {
        Row: {
          id: number
          name: string
          description: string | null
          duration_days: number
          created_at: string
        }
        Insert: {
          id?: number
          name: string
          description?: string | null
          duration_days: number
          created_at?: string
        }
        Update: {
          id?: number
          name?: string
          description?: string | null
          duration_days?: number
          created_at?: string
        }
        Relationships: []
      }
      user_achievements: {
        Row: {
          user_id: string
          achievement_id: number
          unlocked_at: string
        }
        Insert: {
          user_id: string
          achievement_id: number
          unlocked_at?: string
        }
        Update: {
          user_id?: string
          achievement_id?: number
          unlocked_at?: string
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
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_training_plans: {
        Row: {
          id: string
          user_id: string
          plan_id: number
          start_date: string
          current_day: number
          completed: boolean
          last_activity: string
        }
        Insert: {
          id?: string
          user_id: string
          plan_id: number
          start_date?: string
          current_day?: number
          completed?: boolean
          last_activity?: string
        }
        Update: {
          id?: string
          user_id?: string
          plan_id?: number
          start_date?: string
          current_day?: number
          completed?: boolean
          last_activity?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_training_plans_plan_id_fkey"
            columns: ["plan_id"]
            referencedRelation: "training_plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_training_plans_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
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
