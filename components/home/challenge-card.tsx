"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trophy, Clock } from "lucide-react"

export function ChallengeCard() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="h-6 w-40 bg-muted animate-pulse rounded" />
            <div className="h-4 w-full bg-muted animate-pulse rounded" />
            <div className="h-10 w-32 bg-muted animate-pulse rounded" />
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          <span>Weekly Challenge</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold">Memory Master</h3>
          <p className="text-sm text-muted-foreground">Complete 5 memory games with 90%+ accuracy</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Badge variant="outline">3/5 completed</Badge>
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>2 days left</span>
            </div>
          </div>
          <Button size="sm">Continue</Button>
        </div>
      </CardContent>
    </Card>
  )
}
