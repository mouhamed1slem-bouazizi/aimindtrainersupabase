"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart2 } from "lucide-react"
import { useRouter } from "next/navigation"

interface GameDifficultySelectorProps {
  gameId: string
}

export function GameDifficultySelector({ gameId }: GameDifficultySelectorProps) {
  const router = useRouter()

  const handleStartGame = (difficulty: string) => {
    router.push(`/games/${gameId}/play?difficulty=${difficulty.toLowerCase()}`)
  }

  return (
    <Card>
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-base">Select Difficulty</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-3">
        <Button variant="outline" className="w-full justify-between" onClick={() => handleStartGame("Easy")}>
          Easy
          <span className="text-xs text-muted-foreground">For beginners</span>
        </Button>
        <Button variant="outline" className="w-full justify-between" onClick={() => handleStartGame("Medium")}>
          Medium
          <span className="text-xs text-muted-foreground">Recommended</span>
        </Button>
        <Button variant="outline" className="w-full justify-between" onClick={() => handleStartGame("Hard")}>
          Hard
          <span className="text-xs text-muted-foreground">For experts</span>
        </Button>

        <div className="pt-2">
          <Button
            variant="outline"
            className="w-full flex items-center justify-center"
            onClick={() => router.push(`/games/${gameId}/stats`)}
          >
            <BarChart2 className="h-4 w-4 mr-2" />
            View Stats
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
