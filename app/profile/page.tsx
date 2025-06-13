"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Brain, LogOut } from "lucide-react"
import { useUser } from "@/context/user-context"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProfileSettings } from "@/components/profile/profile-settings"
import { NotificationSettings } from "@/components/profile/notification-settings"
import { SubscriptionSettings } from "@/components/profile/subscription-settings"

export default function ProfilePage() {
  const { user, logout } = useUser()

  if (!user) {
    return (
      <div className="container px-4 py-6 flex items-center justify-center h-[80vh]">
        <Card>
          <CardContent className="p-6 text-center">
            <p className="mb-4">Please log in to view your profile.</p>
            <Button>Log In</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container px-4 py-6 space-y-6">
      <h1 className="text-2xl font-bold">Profile</h1>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center">
            <Avatar className="h-16 w-16 mr-4">
              <AvatarImage src="/placeholder.svg?height=80&width=80" alt={user.name} />
              <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-bold">{user.name}</h2>
              <p className="text-sm text-muted-foreground">Member since {user.memberSince}</p>
              <div className="flex items-center mt-1">
                <Badge variant="secondary" className="mr-2">
                  <Brain className="h-3 w-3 mr-1" />
                  Level {user.level}
                </Badge>
                {user.isPremium && <Badge variant="outline">Premium</Badge>}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="notifications">
        <TabsList className="grid grid-cols-3 h-auto">
          <TabsTrigger value="notifications" className="text-xs py-2">
            Notifications
          </TabsTrigger>
          <TabsTrigger value="account" className="text-xs py-2">
            Account
          </TabsTrigger>
          <TabsTrigger value="subscription" className="text-xs py-2">
            Subscription
          </TabsTrigger>
        </TabsList>
        <TabsContent value="notifications" className="mt-4">
          <NotificationSettings />
        </TabsContent>
        <TabsContent value="account" className="mt-4">
          <ProfileSettings />
        </TabsContent>
        <TabsContent value="subscription" className="mt-4">
          <SubscriptionSettings />
        </TabsContent>
      </Tabs>

      <Button variant="destructive" className="w-full" onClick={logout}>
        <LogOut className="h-4 w-4 mr-2" />
        Sign Out
      </Button>
    </div>
  )
}
