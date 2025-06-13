"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Brain, Calendar, Zap, Trophy, Target, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Achievement {
  id: string
  name: string
  description: string
  icon: React.ElementType
  iconColor: string
  unlocked: boolean
  progress?: number
  total?: number
  date?: string
}

export function Achievements() {
  // Mock achievements data
  const achievements: Achievement[] = [
    {
      id: "streak-7",
      name: "Consistent Learner",
      description: "Complete a 7-day training streak",
      icon: Calendar,
      iconColor: "text-blue-500",
      unlocked: true,
      date: "Jun 8, 2023",
    },
    {
      id: "speed-demon",
      name: "Speed Demon",
      description: "Improve reaction time by 20%",
      icon: Zap,
      iconColor: "text-yellow-500",
      unlocked: true,
      date: "Jun 10, 2023",
    },
    {
      id: "memory-master",
      name: "Memory Master",
      description: "Score 90+ in 5 memory games",
      icon: Brain,
      iconColor: "text-purple-500",
      unlocked: false,
      progress: 3,
      total: 5,
    },
    {
      id: "attention-expert",
      name: "Attention Expert",
      description: "Complete 10 attention games",
      icon: Target,
      iconColor: "text-red-500",
      unlocked: false,
      progress: 4,
      total: 10,
    },
    {
      id: "brain-trainer",
      name: "Brain Trainer",
      description: "Complete 50 training sessions",
      icon: Trophy,
      iconColor: "text-amber-500",
      unlocked: false,
      progress: 23,
      total: 50,
    },
    {
      id: "all-rounder",
      name: "All-Rounder",
      description: "Train all 10 cognitive domains",
      icon: Star,
      iconColor: "text-indigo-500",
      unlocked: false,
      progress: 6,
      total: 10,
    },
  ]

  const unlockedAchievements = achievements.filter((a) => a.unlocked)
  const inProgressAchievements = achievements.filter((a) => !a.unlocked)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">Your Achievements</h2>
        <Badge variant="outline" className="text-xs">
          {unlockedAchievements.length}/{achievements.length}
        </Badge>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="grid grid-cols-2 h-auto">
          <TabsTrigger value="all" className="text-xs py-2">
            All
          </TabsTrigger>
          <TabsTrigger value="unlocked" className="text-xs py-2">
            Unlocked
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4 space-y-4">
          {achievements.map((achievement) => (
            <AchievementCard key={achievement.id} achievement={achievement} />
          ))}
        </TabsContent>

        <TabsContent value="unlocked" className="mt-4 space-y-4">
          {unlockedAchievements.length > 0 ? (
            unlockedAchievements.map((achievement) => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No achievements unlocked yet.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

function AchievementCard({ achievement }: { achievement: Achievement }) {
  return (
    <Card className={achievement.unlocked ? "border-green-500/20" : ""}>
      <CardContent className="p-4 flex items-start">
        <div className={`p-3 rounded-full mr-4 ${achievement.iconColor.replace("text", "bg")}/10`}>
          <achievement.icon className={`h-6 w-6 ${achievement.iconColor}`} />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium">{achievement.name}</h3>
              <p className="text-sm text-muted-foreground">{achievement.description}</p>
            </div>
            {achievement.unlocked && (
              <Badge variant="secondary" className="ml-2">
                Unlocked
              </Badge>
            )}
          </div>

          {!achievement.unlocked && achievement.progress !== undefined && (
            <div className="mt-2">
              <div className="flex justify-between text-xs mb-1">
                <span>Progress</span>
                <span>
                  {achievement.progress}/{achievement.total}
                </span>
              </div>
              <Progress value={(achievement.progress / (achievement.total || 1)) * 100} className="h-1.5" />
            </div>
          )}

          {achievement.unlocked && achievement.date && (
            <p className="text-xs text-muted-foreground mt-1">Unlocked on {achievement.date}</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
