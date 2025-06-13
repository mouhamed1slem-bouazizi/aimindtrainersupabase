"use client"

import { ThemeProvider } from "@/components/theme-provider"
import { UserProvider } from "@/context/user-context"
import { TrainingProvider } from "@/context/training-context"
import { GameProgressProvider } from "@/context/game-progress-context"
import { AICoachProvider } from "@/context/ai-coach-context"
import { NotificationProvider } from "@/context/notification-context"
import { SupabaseProvider } from "@/context/supabase-context"
import { Toaster } from "@/components/ui/toast"
import type React from "react"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SupabaseProvider>
        <UserProvider>
          <TrainingProvider>
            <GameProgressProvider>
              <AICoachProvider>
                <NotificationProvider>
                  {children}
                  <Toaster />
                </NotificationProvider>
              </AICoachProvider>
            </GameProgressProvider>
          </TrainingProvider>
        </UserProvider>
      </SupabaseProvider>
    </ThemeProvider>
  )
}
