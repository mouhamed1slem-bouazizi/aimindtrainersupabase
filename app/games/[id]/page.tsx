import { Badge } from "@/components/ui/badge"
import { Brain, Clock } from "lucide-react"
import { GameDetailHeader } from "@/components/games/game-detail-header"
import { GameStats } from "@/components/games/game-stats"
import { GameBenefits } from "@/components/games/game-benefits"
import { GameBrainRegions } from "@/components/games/game-brain-regions"
import { GameDifficultySelector } from "@/components/games/game-difficulty-selector"

interface GameDetailPageProps {
  params: {
    id: string
  }
}

export default function GameDetailPage({ params }: GameDetailPageProps) {
  // In a real app, you would fetch the game data based on the ID
  const game = {
    id: params.id,
    name:
      params.id === "memory-match"
        ? "Memory Match"
        : params.id === "attention-grid"
          ? "Attention Grid"
          : params.id === "reflex-tap"
            ? "Reflex Tap"
            : "Game",
    description:
      "Test your visual memory by matching pairs of cards with identical symbols. This exercise strengthens your working memory and visual processing skills.",
    domain:
      params.id === "memory-match"
        ? "Memory"
        : params.id === "attention-grid"
          ? "Attention"
          : params.id === "reflex-tap"
            ? "Reflexes"
            : "Memory",
    duration: 3,
    difficulty: "Medium",
    popularity: 4.8,
    improvement: 12,
    lastScore: 85,
    bestScore: 92,
    image: "/placeholder.svg?height=200&width=200",
    benefits: [
      "Improves short-term memory retention",
      "Enhances visual pattern recognition",
      "Strengthens concentration abilities",
    ],
    brainRegions: ["Hippocampus", "Prefrontal Cortex"],
  }

  return (
    <div className="container px-4 py-6 space-y-6">
      <GameDetailHeader game={game} />

      <div className="aspect-video rounded-lg overflow-hidden bg-muted">
        <img src={game.image || "/placeholder.svg"} alt={game.name} className="w-full h-full object-cover" />
      </div>

      <div className="flex justify-between items-center">
        <Badge className="text-xs">
          <Brain className="h-3 w-3 mr-1" />
          {game.domain}
        </Badge>
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="h-4 w-4 mr-1" />
          <span>{game.duration} min</span>
        </div>
      </div>

      <p className="text-sm">{game.description}</p>

      <GameStats game={game} />
      <GameBenefits benefits={game.benefits} />
      <GameBrainRegions regions={game.brainRegions} />
      <GameDifficultySelector gameId={game.id} />
    </div>
  )
}
