"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

interface Notification {
  id: string
  title: string
  message: string
  type: "reminder" | "achievement" | "tip" | "challenge" | "system"
  timestamp: string
  read: boolean
}

interface NotificationContextType {
  notifications: Notification[]
  unreadCount: number
  addNotification: (notification: Omit<Notification, "id" | "timestamp" | "read">) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  clearNotification: (id: string) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)

  // Load initial notifications
  useEffect(() => {
    const initialNotifications: Notification[] = [
      {
        id: "notif-1",
        title: "Training Reminder",
        message: "It's time for your daily brain training session!",
        type: "reminder",
        timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        read: false,
      },
      {
        id: "notif-2",
        title: "Achievement Unlocked",
        message: "Congratulations! You've earned the 'Speed Demon' badge for improving your reaction time by 20%.",
        type: "achievement",
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
        read: false,
      },
      {
        id: "notif-3",
        title: "Weekly Challenge",
        message: "New challenge available: Complete 5 memory games this week to earn bonus points!",
        type: "challenge",
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        read: true,
      },
    ]

    setNotifications(initialNotifications)
    setUnreadCount(initialNotifications.filter((n) => !n.read).length)
  }, [])

  const addNotification = (notification: Omit<Notification, "id" | "timestamp" | "read">) => {
    const newNotification: Notification = {
      ...notification,
      id: `notif-${Date.now()}`,
      timestamp: new Date().toISOString(),
      read: false,
    }

    setNotifications((prev) => [newNotification, ...prev])
    setUnreadCount((prev) => prev + 1)
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id && !notif.read ? { ...notif, read: true } : notif)))

    setUnreadCount((prev) => Math.max(0, prev - 1))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })))

    setUnreadCount(0)
  }

  const clearNotification = (id: string) => {
    const notif = notifications.find((n) => n.id === id)
    setNotifications((prev) => prev.filter((n) => n.id !== id))

    if (notif && !notif.read) {
      setUnreadCount((prev) => Math.max(0, prev - 1))
    }
  }

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        clearNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationProvider")
  }
  return context
}
