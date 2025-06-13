"use client"

import type React from "react"

import { ThemeProvider } from "@/components/theme-provider"
import { UserProvider } from "@/context/user-context"
import { TrainingProvider } from "@/context/training-context"
import { NotificationProvider } from "@/context/notification-context"
import { AICoachProvider } from "@/context/ai-coach-context"
import { GameProgressProvider } from "@/context/game-progress-context"
import { SupabaseProvider } from "@/context/supabase-context"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SupabaseProvider>
        <UserProvider>
          <TrainingProvider>
            <GameProgressProvider>
              <NotificationProvider>
                <AICoachProvider>{children}</AICoachProvider>
              </NotificationProvider>
            </GameProgressProvider>
          </TrainingProvider>
        </UserProvider>
      </SupabaseProvider>
    </ThemeProvider>
  )
}
