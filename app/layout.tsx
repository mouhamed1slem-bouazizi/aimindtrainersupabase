import type React from "react"
import { Providers } from "./providers"
import { BottomNavigation } from "@/components/navigation/bottom-navigation"
import { StatusBar } from "@/components/ui/status-bar"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background min-h-screen">
        <Providers>
          <StatusBar />
          <main className="flex flex-col h-screen">
            <div className="flex-1 overflow-auto pb-16">{children}</div>
            <BottomNavigation />
          </main>
        </Providers>
      </body>
    </html>
  )
}


import './globals.css'

export const metadata = {
      generator: 'v0.dev'
    };
