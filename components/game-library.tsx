"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Star, TrendingUp } from "lucide-react"

interface GameLibraryProps {
  domain?: string
  showMore?: boolean
}

const games = [
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
  },
]

export function GameLibrary({ domain, showMore = false }: GameLibraryProps) {
  const router = useRouter()
  const [filteredGames, setFilteredGames] = useState(domain ? games.filter((game) => game.domain === domain) : games)

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
              <div className="w-24 h-24 bg-muted">
                <img src={game.image || "/placeholder.svg"} alt={game.name} className="w-full h-full object-cover" />
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
