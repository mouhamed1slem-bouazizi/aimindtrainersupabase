"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Flame } from "lucide-react"
import { useTraining } from "@/context/training-context"

export function StreakCard() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="h-4 w-20 bg-muted animate-pulse rounded" />
              <div className="h-8 w-16 bg-muted animate-pulse rounded" />
            </div>
            <div className="h-12 w-12 bg-muted animate-pulse rounded-full" />
          </div>
        </CardContent>
      </Card>
    )
  }

  // Rest of the component logic remains the same
  try {
    const { streak } = useTraining()

    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Current Streak</p>
              <p className="text-3xl font-bold">{streak}</p>
            </div>
            <div className="flex items-center space-x-2">
              <Flame className="h-8 w-8 text-orange-500" />
              <Badge variant="secondary">{streak} days</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  } catch (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Current Streak</p>
              <p className="text-3xl font-bold">0</p>
            </div>
            <div className="flex items-center space-x-2">
              <Flame className="h-8 w-8 text-orange-500" />
              <Badge variant="secondary">0 days</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }
}
