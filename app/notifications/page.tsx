"use client"

import { useNotifications } from "@/context/notification-context"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bell, Calendar, Award, MessageSquare, Zap, Trash2 } from "lucide-react"
import { useState } from "react"

export default function NotificationsPage() {
  const { notifications, markAsRead, markAllAsRead, clearNotification } = useNotifications()
  const [filter, setFilter] = useState<string | null>(null)

  const filteredNotifications = filter ? notifications.filter((n) => n.type === filter) : notifications

  const getIcon = (type: string) => {
    switch (type) {
      case "reminder":
        return <Calendar className="h-5 w-5 text-blue-500" />
      case "achievement":
        return <Award className="h-5 w-5 text-yellow-500" />
      case "tip":
        return <MessageSquare className="h-5 w-5 text-green-500" />
      case "challenge":
        return <Zap className="h-5 w-5 text-purple-500" />
      default:
        return <Bell className="h-5 w-5 text-gray-500" />
    }
  }

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / (1000 * 60))
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffMins < 60) {
      return `${diffMins} min ago`
    } else if (diffHours < 24) {
      return `${diffHours} hr ago`
    } else {
      return `${diffDays} day ago`
    }
  }

  return (
    <div className="container px-4 py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Notifications</h1>
        <Button variant="ghost" size="sm" onClick={() => markAllAsRead()}>
          Mark all as read
        </Button>
      </div>

      <div className="flex space-x-2 overflow-x-auto pb-2">
        <Button variant={filter === null ? "default" : "outline"} size="sm" onClick={() => setFilter(null)}>
          All
        </Button>
        <Button variant={filter === "reminder" ? "default" : "outline"} size="sm" onClick={() => setFilter("reminder")}>
          Reminders
        </Button>
        <Button
          variant={filter === "achievement" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("achievement")}
        >
          Achievements
        </Button>
        <Button
          variant={filter === "challenge" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("challenge")}
        >
          Challenges
        </Button>
        <Button variant={filter === "tip" ? "default" : "outline"} size="sm" onClick={() => setFilter("tip")}>
          Tips
        </Button>
      </div>

      <div className="space-y-4">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => (
            <Card
              key={notification.id}
              className={notification.read ? "opacity-70" : ""}
              onClick={() => markAsRead(notification.id)}
            >
              <CardContent className="p-4 flex items-start">
                <div className="p-2 rounded-full mr-3 bg-muted">{getIcon(notification.type)}</div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium">{notification.title}</h3>
                    <div className="flex items-center">
                      <span className="text-xs text-muted-foreground mr-2">{formatDate(notification.timestamp)}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={(e) => {
                          e.stopPropagation()
                          clearNotification(notification.id)
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm mt-1">{notification.message}</p>
                  {!notification.read && (
                    <div className="mt-2 flex justify-end">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-8">
            <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No notifications found.</p>
          </div>
        )}
      </div>
    </div>
  )
}
