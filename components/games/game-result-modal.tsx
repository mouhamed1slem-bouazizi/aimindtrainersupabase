"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Award, Clock, Lightbulb, MessageSquare, Share2 } from "lucide-react"

interface GameResultModalProps {
  open: boolean
  onClose: () => void
  score: number
  moves: number
  time: number
  motivationalMessage: string
  insight: string
  onPlayAgain: () => void
}

export function GameResultModal({
  open,
  onClose,
  score,
  moves,
  time,
  motivationalMessage,
  insight,
  onPlayAgain,
}: GameResultModalProps) {
  // Format time as mm:ss
  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000)
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Game Completed!</DialogTitle>
          <DialogDescription className="text-center">Great job! Here's how you did:</DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="text-center mb-6">
            <div className="text-4xl font-bold mb-1">{score}</div>
            <div className="text-sm text-muted-foreground">points</div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center">
              <div className="flex justify-center mb-1">
                <Clock className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="font-medium">{formatTime(time)}</div>
              <div className="text-xs text-muted-foreground">Time</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-1">
                <Award className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="font-medium">{moves}</div>
              <div className="text-xs text-muted-foreground">Moves</div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-muted p-3 rounded-lg flex">
              <MessageSquare className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
              <p className="text-sm">{motivationalMessage}</p>
            </div>

            <div className="bg-muted p-3 rounded-lg flex">
              <Lightbulb className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
              <p className="text-sm">{insight}</p>
            </div>
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-col gap-2">
          <Button onClick={onPlayAgain} className="w-full">
            Play Again
          </Button>
          <div className="flex gap-2 w-full">
            <Button variant="outline" className="flex-1" onClick={onClose}>
              Back to Games
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
