"use client"

import { useTraining } from "@/context/training-context"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Trophy } from "lucide-react"

export function StreakCard() {
  const { currentStreak, completedGames, totalGames } = useTraining()
  const progressPercentage = (completedGames / totalGames) * 100

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="bg-yellow-500/10 p-2 rounded-full mr-3">
              <Trophy className="h-5 w-5 text-yellow-500" />
            </div>
            <div>
              <h3 className="text-lg font-medium">Current Streak</h3>
              <p className="text-3xl font-bold">{currentStreak} days</p>
            </div>
          </div>
          <div className="text-right">
            <h3 className="text-lg font-medium">Weekly Progress</h3>
            <p className="text-sm text-muted-foreground">
              {completedGames}/{totalGames} games
            </p>
          </div>
        </div>
        <Progress value={progressPercentage} className="h-2 mt-4" />
      </CardContent>
    </Card>
  )
}
