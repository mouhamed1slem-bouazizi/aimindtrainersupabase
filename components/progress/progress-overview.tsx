"use client"

import { useState, useEffect } from "react"
import { useTraining } from "@/context/training-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Award, Brain, Calendar, Clock } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

export function ProgressOverview() {
  const { currentStreak, completedGames, totalGames, domainScores } = useTraining()
  const [mounted, setMounted] = useState(false)
  const [trainingData, setTrainingData] = useState({
    currentStreak: 0,
    completedGames: 0,
    totalGames: 0,
    domainScores: {},
  })

  useEffect(() => {
    setMounted(true)
    setTrainingData({ currentStreak, completedGames, totalGames, domainScores })
  }, [currentStreak, completedGames, totalGames, domainScores])

  if (!mounted) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-4 flex items-center">
                <Skeleton className="h-10 w-10 rounded-full mr-3" />
                <div className="space-y-2">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-5 w-16" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card>
          <CardHeader className="pb-2">
            <Skeleton className="h-5 w-32" />
          </CardHeader>
          <CardContent className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-12" />
                </div>
                <Skeleton className="h-2 w-full" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    )
  }

  const stats = [
    {
      title: "Training Streak",
      value: `${currentStreak} days`,
      icon: Calendar,
      color: "text-blue-500",
    },
    {
      title: "Games Completed",
      value: completedGames,
      icon: Brain,
      color: "text-purple-500",
    },
    {
      title: "Total Training Time",
      value: "3h 45m",
      icon: Clock,
      color: "text-green-500",
    },
    {
      title: "Achievements",
      value: "7/24",
      icon: Award,
      color: "text-yellow-500",
    },
  ]

  const topDomains = Object.entries(domainScores)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 4)
    .map(([domain, score]) => ({ name: domain, progress: score }))

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4 flex items-center">
              <div className={`p-2 rounded-full mr-3 ${stat.color.replace("text", "bg")}/10`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className="text-xl font-bold">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Domain Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {topDomains.map((domain) => (
            <div key={domain.name} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>{domain.name}</span>
                <span className="text-muted-foreground">{domain.progress}%</span>
              </div>
              <Progress value={domain.progress} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Recent Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center">
              <div className="bg-yellow-500/10 p-2 rounded-full mr-3">
                <Award className="h-5 w-5 text-yellow-500" />
              </div>
              <div>
                <p className="font-medium">Speed Demon</p>
                <p className="text-xs text-muted-foreground">Improved reaction time by 20%</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="bg-blue-500/10 p-2 rounded-full mr-3">
                <Calendar className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="font-medium">Consistent Learner</p>
                <p className="text-xs text-muted-foreground">Completed 7 days training streak</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
