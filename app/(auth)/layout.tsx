import { Providers } from "../providers"
import { StatusBar } from "@/components/ui/status-bar"
import type { ReactNode } from "react"

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background min-h-screen">
        <Providers>
          <StatusBar />
          <main className="flex flex-col h-screen">
            <div className="flex-1 overflow-auto pb-4">{children}</div>
          </main>
        </Providers>
      </body>
    </html>
  )
}
