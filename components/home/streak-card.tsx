"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useTraining } from "@/context/training-context"
import { useState, useEffect } from "react"

export function StreakCard() {
  const { streak, setStreak } = useTraining() // Declare setStreak here
  const [mounted, setMounted] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    try {
      setStreak(streak)
    } catch (e) {
      console.error("Error accessing training context:", e)
      setError(true)
    }
  }, [streak])

  // Don't render anything on the server
  if (!mounted) return null

  // Show fallback UI if there's an error
  if (error) {
    return (
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Current Streak</h3>
              <p className="text-muted-foreground">Loading streak data...</p>
            </div>
            <div className="text-3xl font-bold">-</div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium">Current Streak</h3>
            <p className="text-muted-foreground">Keep it going!</p>
          </div>
          <div className="text-3xl font-bold">{streak} days</div>
        </div>
      </CardContent>
    </Card>
  )
}
