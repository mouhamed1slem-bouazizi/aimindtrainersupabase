"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useTraining } from "@/context/training-context"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export function DailyTraining() {
  const router = useRouter()
  const { dailyProgress, dailyGoal, recommendedGames } = useTraining()
  const [mounted, setMounted] = useState(false)
  const [trainingData, setTrainingData] = useState({
    dailyProgress: 0,
    dailyGoal: 3,
    recommendedGames: [],
  })
  const [error, setError] = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      setTrainingData({ dailyProgress, dailyGoal, recommendedGames })
    } catch (e) {
      console.error("Error accessing training context:", e)
      setError(true)
    }
  }, [])

  // Don't render anything on the server
  if (!mounted) return null

  // Show fallback UI if there's an error
  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Daily Training</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span>Progress</span>
              <span>Loading...</span>
            </div>
            <Progress value={0} />
          </div>
          <Button onClick={() => router.push("/games")} className="w-full">
            Start Training
          </Button>
        </CardContent>
      </Card>
    )
  }

  const progressPercentage = (trainingData.dailyProgress / trainingData.dailyGoal) * 100

  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily Training</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between mb-2">
            <span>Progress</span>
            <span>
              {trainingData.dailyProgress} / {trainingData.dailyGoal} games
            </span>
          </div>
          <Progress value={progressPercentage} />
        </div>
        <Button onClick={() => router.push("/games")} className="w-full">
          {trainingData.dailyProgress >= trainingData.dailyGoal ? "Continue Training" : "Start Training"}
        </Button>
      </CardContent>
    </Card>
  )
}
