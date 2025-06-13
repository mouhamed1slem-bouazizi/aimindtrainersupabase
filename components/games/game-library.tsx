"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Star, TrendingUp } from "lucide-react"
import type { CognitiveDomain } from "@/types/training"
import { useTraining } from "@/context/training-context"

interface Game {
  id: string
  name: string
  description: string
  domain: CognitiveDomain
  duration: number
  difficulty: "Easy" | "Medium" | "Hard"
  popularity: number
  improvement: number
  image: string
  isNew?: boolean
  isFavorite?: boolean
}

interface GameLibraryProps {
  domain?: CognitiveDomain
  recommended?: boolean
  favorites?: boolean
}

// Mock games data
const allGames: Game[] = [
  {
    id: "memory-match",
    name: "Memory Match",
    description: "Test your visual memory by matching pairs of cards",
    domain: "Memory",
    duration: 3,
    difficulty: "Medium",
    popularity: 4.8,
    improvement: 12,
    image: "/placeholder.svg?height=100&width=100",
    isFavorite: true,
  },
  {
    id: "attention-grid",
    name: "Attention Grid",
    description: "Find targets among distractors as quickly as possible",
    domain: "Attention",
    duration: 4,
    difficulty: "Hard",
    popularity: 4.5,
    improvement: 8,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "speed-sort",
    name: "Speed Sort",
    description: "Sort items into categories as fast as you can",
    domain: "Processing Speed",
    duration: 2,
    difficulty: "Easy",
    popularity: 4.7,
    improvement: 15,
    image: "/placeholder.svg?height=100&width=100",
    isNew: true,
  },
  {
    id: "reflex-tap",
    name: "Reflex Tap",
    description: "Test your reaction time with this tapping game",
    domain: "Reflexes",
    duration: 3,
    difficulty: "Medium",
    popularity: 4.9,
    improvement: 20,
    image: "/placeholder.svg?height=100&width=100",
    isFavorite: true,
  },
  {
    id: "task-switch",
    name: "Task Switch",
    description: "Practice switching between different tasks quickly",
    domain: "Executive Control",
    duration: 5,
    difficulty: "Hard",
    popularity: 4.3,
    improvement: 10,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "pattern-solver",
    name: "Pattern Solver",
    description: "Identify and complete complex patterns",
    domain: "Problem-Solving",
    duration: 4,
    difficulty: "Hard",
    popularity: 4.6,
    improvement: 9,
    image: "/placeholder.svg?height=100&width=100",
    isNew: true,
  },
  {
    id: "space-navigator",
    name: "Space Navigator",
    description: "Navigate through 3D space using mental rotation",
    domain: "Spatial Reasoning",
    duration: 3,
    difficulty: "Medium",
    popularity: 4.4,
    improvement: 7,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "word-builder",
    name: "Word Builder",
    description: "Create words from letter sets to improve vocabulary",
    domain: "Language",
    duration: 4,
    difficulty: "Medium",
    popularity: 4.2,
    improvement: 6,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "number-crunch",
    name: "Number Crunch",
    description: "Solve math problems quickly to improve numerical skills",
    domain: "Numerical Skills",
    duration: 3,
    difficulty: "Medium",
    popularity: 4.0,
    improvement: 8,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "breath-pacer",
    name: "Breath Pacer",
    description: "Follow guided breathing patterns to reduce stress",
    domain: "Stress Regulation",
    duration: 5,
    difficulty: "Easy",
    popularity: 4.7,
    improvement: 15,
    image: "/placeholder.svg?height=100&width=100",
    isFavorite: true,
  },
]

export function GameLibrary({ recommended = false, favorites = false }: GameLibraryProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const domainFilter = searchParams.get("domain") as CognitiveDomain | null
  const { domainScores } = useTraining()

  const [filteredGames, setFilteredGames] = useState<Game[]>([])

  useEffect(() => {
    let games = [...allGames]

    // Apply domain filter if specified
    if (domainFilter) {
      games = games.filter((game) => game.domain === domainFilter)
    }

    // Apply recommended filter
    if (recommended) {
      // Sort by lowest domain scores to recommend games for weaker areas
      const sortedDomains = Object.entries(domainScores)
        .sort(([, scoreA], [, scoreB]) => scoreA - scoreB)
        .map(([domain]) => domain)

      games = games
        .sort((a, b) => {
          const aDomainIndex = sortedDomains.indexOf(a.domain)
          const bDomainIndex = sortedDomains.indexOf(b.domain)
          return aDomainIndex - bDomainIndex
        })
        .slice(0, 6)
    }

    // Apply favorites filter
    if (favorites) {
      games = games.filter((game) => game.isFavorite)
    }

    setFilteredGames(games)
  }, [domainFilter, recommended, favorites, domainScores])

  if (filteredGames.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No games found matching your criteria.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {filteredGames.map((game) => (
        <Card
          key={game.id}
          className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => router.push(`/games/${game.id}`)}
        >
          <CardContent className="p-0">
            <div className="flex">
              <div className="w-24 h-24 bg-muted relative">
                <img src={game.image || "/placeholder.svg"} alt={game.name} className="w-full h-full object-cover" />
                {game.isNew && <Badge className="absolute top-1 left-1 bg-blue-500">New</Badge>}
              </div>
              <div className="p-3 flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium">{game.name}</h3>
                  <Badge variant="outline" className="text-xs">
                    {game.difficulty}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{game.description}</p>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{game.duration} min</span>
                  </div>
                  <div className="flex items-center text-xs">
                    <Star className="h-3 w-3 mr-1 text-yellow-500" />
                    <span>{game.popularity}</span>
                  </div>
                  <div className="flex items-center text-xs text-green-600">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    <span>+{game.improvement}%</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
