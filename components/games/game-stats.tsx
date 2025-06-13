"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Award, TrendingUp } from "lucide-react"

interface GameStatsProps {
  game: {
    bestScore: number
    improvement: number
    lastScore?: number
  }
}

export function GameStats({ game }: GameStatsProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Card>
        <CardHeader className="p-3 pb-0">
          <CardTitle className="text-sm flex items-center">
            <Award className="h-4 w-4 mr-1 text-yellow-500" />
            Your Best
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3 pt-1">
          <p className="text-2xl font-bold">{game.bestScore}</p>
          {game.lastScore && <p className="text-xs text-muted-foreground">Last: {game.lastScore}</p>}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="p-3 pb-0">
          <CardTitle className="text-sm flex items-center">
            <TrendingUp className="h-4 w-4 mr-1 text-green-500" />
            Improvement
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3 pt-1">
          <p className="text-2xl font-bold">+{game.improvement}%</p>
          <p className="text-xs text-muted-foreground">Last 30 days</p>
        </CardContent>
      </Card>
    </div>
  )
}
