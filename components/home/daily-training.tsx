"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Brain, Target, Zap } from "lucide-react"
import { useTraining } from "@/context/training-context"

export function DailyTraining() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Card>
        <CardHeader>
          <div className="h-6 w-32 bg-muted animate-pulse rounded" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="h-24 w-full bg-muted animate-pulse rounded" />
            <div className="h-24 w-full bg-muted animate-pulse rounded" />
          </div>
        </CardContent>
      </Card>
    )
  }

  // Rest of the component logic remains the same
  try {
    const { dailyGoal, completedToday } = useTraining()
    const progress = (completedToday / dailyGoal) * 100

    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5" />
            <span>Daily Training</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>
                {completedToday}/{dailyGoal} games
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <Brain className="h-6 w-6" />
              <span className="text-sm">Memory</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <Zap className="h-6 w-6" />
              <span className="text-sm">Attention</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  } catch (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5" />
            <span>Daily Training</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>0/3 games</span>
            </div>
            <Progress value={0} className="h-2" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <Brain className="h-6 w-6" />
              <span className="text-sm">Memory</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <Zap className="h-6 w-6" />
              <span className="text-sm">Attention</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }
}
