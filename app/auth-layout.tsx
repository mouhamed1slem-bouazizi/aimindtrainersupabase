import type React from "react"
import { Providers } from "./providers"
import { StatusBar } from "@/components/ui/status-bar"

export default function AuthLayout({
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
            <div className="flex-1 overflow-auto">{children}</div>
          </main>
        </Providers>
      </body>
    </html>
  )
}
