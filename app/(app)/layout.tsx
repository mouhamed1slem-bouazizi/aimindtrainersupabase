import { Providers } from "../providers"
import { StatusBar } from "@/components/ui/status-bar"
import { BottomNavigation } from "@/components/navigation/bottom-navigation"
import { NotificationProvider } from "@/context/notification-context"
import { UserProvider } from "@/context/user-context"
import { TrainingProvider } from "@/context/training-context"
import { GameProgressProvider } from "@/context/game-progress-context"
import { AICoachProvider } from "@/context/ai-coach-context"
import type { ReactNode } from "react"

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background min-h-screen">
        <Providers>
          <UserProvider>
            <TrainingProvider>
              <GameProgressProvider>
                <AICoachProvider>
                  <NotificationProvider>
                    <StatusBar />
                    <main className="flex flex-col h-screen">
                      <div className="flex-1 overflow-auto pb-16">{children}</div>
                      <BottomNavigation />
                    </main>
                  </NotificationProvider>
                </AICoachProvider>
              </GameProgressProvider>
            </TrainingProvider>
          </UserProvider>
        </Providers>
      </body>
    </html>
  )
}
