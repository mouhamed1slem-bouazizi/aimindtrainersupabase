"use client"

import { Home, Brain, BarChart2, User } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

const navItems = [
  {
    name: "Home",
    href: "/",
    icon: Home,
  },
  {
    name: "Games",
    href: "/games",
    icon: Brain,
  },
  {
    name: "Progress",
    href: "/progress",
    icon: BarChart2,
  },
  {
    name: "Profile",
    href: "/profile",
    icon: User,
  },
]

export function BottomNavigation() {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-background z-10">
      <nav className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <button
              key={item.name}
              onClick={() => router.push(item.href)}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full",
                isActive ? "text-primary" : "text-muted-foreground",
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs mt-1">{item.name}</span>
            </button>
          )
        })}
      </nav>
    </div>
  )
}
