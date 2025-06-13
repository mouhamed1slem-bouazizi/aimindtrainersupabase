"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Heart } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

interface GameDetailHeaderProps {
  game: {
    id: string
    name: string
  }
}

export function GameDetailHeader({ game }: GameDetailHeaderProps) {
  const [isFavorite, setIsFavorite] = useState(false)

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <Link href="/games">
          <Button variant="ghost" size="icon" className="mr-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">{game.name}</h1>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsFavorite(!isFavorite)}
        className={isFavorite ? "text-red-500" : ""}
      >
        <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
      </Button>
    </div>
  )
}
