"use client"

import { Home, Brain, BarChart2, User, Bell } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { useNotifications } from "@/context/notification-context"
import { Badge } from "@/components/ui/badge"

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
    name: "Notifications",
    href: "/notifications",
    icon: Bell,
    badge: true,
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
  const { unreadCount } = useNotifications()

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
                "flex flex-col items-center justify-center w-full h-full relative",
                isActive ? "text-primary" : "text-muted-foreground",
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs mt-1">{item.name}</span>
              {item.badge && unreadCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute top-0 right-1/4 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {unreadCount}
                </Badge>
              )}
            </button>
          )
        })}
      </nav>
    </div>
  )
}
