"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Bell, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useUser } from "@/context/user-context"
import { useState } from "react"
import { toast } from "@/components/ui/use-toast"

export function NotificationSettings() {
  const { user, updatePreferences } = useUser()

  const [preferences, setPreferences] = useState({
    reminders: user?.preferences.reminders || false,
    morningReminder: user?.preferences.morningReminder || "08:00",
    eveningReminder: user?.preferences.eveningReminder || "19:00",
    notifications: {
      training: user?.preferences.notifications.training || false,
      achievements: user?.preferences.notifications.achievements || false,
      weeklyReports: user?.preferences.notifications.weeklyReports || false,
      coachTips: user?.preferences.notifications.coachTips || false,
    },
  })

  const handleToggleChange = (key: string, value: boolean) => {
    if (key.includes(".")) {
      const [parent, child] = key.split(".")
      setPreferences((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value,
        },
      }))
    } else {
      setPreferences((prev) => ({
        ...prev,
        [key]: value,
      }))
    }
  }

  const handleTimeChange = (key: string, value: string) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleSave = async () => {
    try {
      await updatePreferences(preferences)
      toast({
        title: "Settings updated",
        description: "Your notification preferences have been saved.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update settings. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center">
            <Bell className="h-4 w-4 mr-2 text-primary" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="training-reminders" className="flex-1">
              Training Reminders
            </Label>
            <Switch
              id="training-reminders"
              checked={preferences.notifications.training}
              onCheckedChange={(checked) => handleToggleChange("notifications.training", checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="achievement-alerts" className="flex-1">
              Achievement Alerts
            </Label>
            <Switch
              id="achievement-alerts"
              checked={preferences.notifications.achievements}
              onCheckedChange={(checked) => handleToggleChange("notifications.achievements", checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="weekly-reports" className="flex-1">
              Weekly Progress Reports
            </Label>
            <Switch
              id="weekly-reports"
              checked={preferences.notifications.weeklyReports}
              onCheckedChange={(checked) => handleToggleChange("notifications.weeklyReports", checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="coach-tips" className="flex-1">
              AI Coach Tips
            </Label>
            <Switch
              id="coach-tips"
              checked={preferences.notifications.coachTips}
              onCheckedChange={(checked) => handleToggleChange("notifications.coachTips", checked)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center">
            <Clock className="h-4 w-4 mr-2 text-primary" />
            Training Schedule
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>Morning Reminder</span>
            </div>
            <div className="flex items-center">
              <input
                type="time"
                value={preferences.morningReminder}
                onChange={(e) => handleTimeChange("morningReminder", e.target.value)}
                className="border rounded p-1 mr-2 text-sm"
              />
              <Switch
                id="morning"
                checked={preferences.reminders}
                onCheckedChange={(checked) => handleToggleChange("reminders", checked)}
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>Evening Reminder</span>
            </div>
            <div className="flex items-center">
              <input
                type="time"
                value={preferences.eveningReminder}
                onChange={(e) => handleTimeChange("eveningReminder", e.target.value)}
                className="border rounded p-1 mr-2 text-sm"
              />
              <Switch
                id="evening"
                checked={preferences.reminders}
                onCheckedChange={(checked) => handleToggleChange("reminders", checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Button className="w-full" onClick={handleSave}>
        Save Notification Settings
      </Button>
    </div>
  )
}
