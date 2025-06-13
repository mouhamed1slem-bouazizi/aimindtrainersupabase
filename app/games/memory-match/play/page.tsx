"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Brain } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useTraining } from "@/context/training-context"
import { useGameProgress } from "@/context/game-progress-context"
import { useAICoach } from "@/context/ai-coach-context"
import type { GameDifficulty } from "@/types/training"
import { MemoryMatchGame } from "@/components/games/memory-match-game"
import { GameResultModal } from "@/components/games/game-result-modal"

export default function MemoryMatchGamePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const difficulty = (searchParams.get("difficulty") as GameDifficulty) || "medium"

  const { completeGameSession } = useTraining()
  const { addGameResult } = useGameProgress()
  const { getMotivationalMessage, getDomainInsight } = useAICoach()

  const [gameState, setGameState] = useState<"ready" | "playing" | "completed">("ready")
  const [score, setScore] = useState(0)
  const [moves, setMoves] = useState(0)
  const [time, setTime] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [motivationalMessage, setMotivationalMessage] = useState("")
  const [insight, setInsight] = useState("")

  // Handle game completion
  const handleGameComplete = async (gameScore: number, gameMoves: number, gameTime: number) => {
    setScore(gameScore)
    setMoves(gameMoves)
    setTime(gameTime)
    setGameState("completed")

    // Calculate improvement (mock value for demo)
    const improvement = Math.floor(Math.random() * 10) + 5

    // Get motivational message
    const message = await getMotivationalMessage(improvement, "Memory")
    setMotivationalMessage(message)

    // Get neuroscience insight
    const gameInsight = getDomainInsight("Memory")
    setInsight(gameInsight)

    // Record game session
    completeGameSession({
      gameId: "memory-match",
      domain: "Memory",
      score: gameScore,
      duration: Math.floor(gameTime / 1000),
      difficulty,
      improvement,
      timestamp: new Date().toISOString(),
    })

    // Add to game history
    addGameResult("memory-match", "Memory", {
      date: new Date().toISOString(),
      score: gameScore,
      duration: Math.floor(gameTime / 1000),
      difficulty,
      domain: "Memory",
    })

    // Show results modal
    setShowResults(true)
  }

  return (
    <div className="container px-4 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/games/memory-match">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold">Memory Match</h1>
        <div className="w-10"></div> {/* Spacer for alignment */}
      </div>

      {gameState === "ready" && (
        <Card>
          <CardContent className="p-6 space-y-6">
            <div className="text-center">
              <Brain className="h-12 w-12 mx-auto text-primary mb-4" />
              <h2 className="text-xl font-bold mb-2">Memory Match</h2>
              <p className="text-sm text-muted-foreground mb-6">
                Test your visual memory by matching pairs of cards with identical symbols.
              </p>

              <div className="flex items-center justify-center space-x-2 mb-4">
                <Badge variant="outline" className="text-xs capitalize">
                  {difficulty} difficulty
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  Memory
                </Badge>
              </div>
            </div>

            <Button onClick={() => setGameState("playing")} className="w-full">
              Start Game
            </Button>
          </CardContent>
        </Card>
      )}

      {gameState === "playing" && <MemoryMatchGame difficulty={difficulty} onComplete={handleGameComplete} />}

      <GameResultModal
        open={showResults}
        onClose={() => {
          setShowResults(false)
          router.push("/games/memory-match")
        }}
        score={score}
        moves={moves}
        time={time}
        motivationalMessage={motivationalMessage}
        insight={insight}
        onPlayAgain={() => {
          setShowResults(false)
          setGameState("ready")
        }}
      />
    </div>
  )
}

// Missing Badge component
import { Badge } from "@/components/ui/badge"
