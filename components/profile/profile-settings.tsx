"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { User, Lock, Moon } from "lucide-react"
import { useUser } from "@/context/user-context"
import { useState } from "react"
import { toast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ProfileSettings() {
  const { user, updateProfile, updatePreferences } = useUser()

  const [profile, setProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
  })

  const [theme, setTheme] = useState(user?.preferences.theme || "system")
  const [language, setLanguage] = useState(user?.preferences.language || "en")

  const handleProfileChange = (key: string, value: string) => {
    setProfile((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleSaveProfile = async () => {
    try {
      await updateProfile(profile)
      toast({
        title: "Profile updated",
        description: "Your profile information has been saved.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleSavePreferences = async () => {
    try {
      await updatePreferences({ theme: theme as any, language })
      toast({
        title: "Preferences updated",
        description: "Your app preferences have been saved.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update preferences. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center">
            <User className="h-4 w-4 mr-2 text-primary" />
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" value={profile.name} onChange={(e) => handleProfileChange("name", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={profile.email}
              onChange={(e) => handleProfileChange("email", e.target.value)}
            />
          </div>
          <Button className="w-full" onClick={handleSaveProfile}>
            Save Profile
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center">
            <Lock className="h-4 w-4 mr-2 text-primary" />
            Password
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">Current Password</Label>
            <Input id="current-password" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-password">New Password</Label>
            <Input id="new-password" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <Input id="confirm-password" type="password" />
          </div>
          <Button className="w-full">Change Password</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center">
            <Moon className="h-4 w-4 mr-2 text-primary" />
            Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="theme">Theme</Label>
            <Select value={theme} onValueChange={setTheme}>
              <SelectTrigger>
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="language">Language</Label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger>
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
                <SelectItem value="de">German</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="w-full" onClick={handleSavePreferences}>
            Save Preferences
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
