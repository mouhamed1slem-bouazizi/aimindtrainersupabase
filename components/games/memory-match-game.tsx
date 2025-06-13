"use client"

import { useState, useEffect } from "react"
import { Clock } from "lucide-react"
import type { GameDifficulty } from "@/types/training"

interface MemoryCard {
  id: number
  symbol: string
  flipped: boolean
  matched: boolean
}

interface MemoryMatchGameProps {
  difficulty: GameDifficulty
  onComplete: (score: number, moves: number, time: number) => void
}

// Emoji symbols for the memory cards
const symbols = ["🍎", "🍌", "🍇", "🍊", "🍓", "🍉", "🍒", "🥝", "🍍", "🥥", "🥭", "🍋"]

export function MemoryMatchGame({ difficulty, onComplete }: MemoryMatchGameProps) {
  const [cards, setCards] = useState<MemoryCard[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [matchedPairs, setMatchedPairs] = useState(0)
  const [moves, setMoves] = useState(0)
  const [startTime, setStartTime] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [totalPairs, setTotalPairs] = useState(0)

  // Initialize the game
  useEffect(() => {
    // Determine number of pairs based on difficulty
    const numPairs = difficulty === "easy" ? 6 : difficulty === "medium" ? 8 : 12
    setTotalPairs(numPairs)

    // Create pairs of cards
    const selectedSymbols = symbols.slice(0, numPairs)
    const cardPairs = [...selectedSymbols, ...selectedSymbols]

    // Shuffle the cards
    const shuffledCards = cardPairs
      .sort(() => Math.random() - 0.5)
      .map((symbol, index) => ({
        id: index,
        symbol,
        flipped: false,
        matched: false,
      }))

    setCards(shuffledCards)
    setFlippedCards([])
    setMatchedPairs(0)
    setMoves(0)
    setStartTime(Date.now())
    setCurrentTime(0)
  }, [difficulty])

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now() - startTime)
    }, 1000)

    return () => clearInterval(timer)
  }, [startTime])

  // Handle card click
  const handleCardClick = (id: number) => {
    // Ignore click if card is already flipped or matched
    if (flippedCards.length === 2 || cards[id].flipped || cards[id].matched) {
      return
    }

    // Flip the card
    const newCards = [...cards]
    newCards[id].flipped = true
    setCards(newCards)

    // Add to flipped cards
    const newFlippedCards = [...flippedCards, id]
    setFlippedCards(newFlippedCards)

    // Check for match if two cards are flipped
    if (newFlippedCards.length === 2) {
      setMoves(moves + 1)

      const [firstId, secondId] = newFlippedCards
      if (cards[firstId].symbol === cards[secondId].symbol) {
        // Match found
        setTimeout(() => {
          const matchedCards = [...cards]
          matchedCards[firstId].matched = true
          matchedCards[secondId].matched = true
          setCards(matchedCards)
          setFlippedCards([])
          setMatchedPairs(matchedPairs + 1)

          // Check if game is completed
          if (matchedPairs + 1 === totalPairs) {
            const endTime = Date.now()
            const gameTime = endTime - startTime

            // Calculate score based on moves, time, and difficulty
            const baseScore = difficulty === "easy" ? 500 : difficulty === "medium" ? 750 : 1000
            const movesPenalty = moves * 5
            const timePenalty = Math.floor(gameTime / 5000) * 10
            const difficultyBonus = difficulty === "easy" ? 0 : difficulty === "medium" ? 200 : 500

            const finalScore = Math.max(0, baseScore - movesPenalty - timePenalty + difficultyBonus)

            // Call onComplete callback
            onComplete(finalScore, moves, gameTime)
          }
        }, 500)
      } else {
        // No match
        setTimeout(() => {
          const resetCards = [...cards]
          resetCards[firstId].flipped = false
          resetCards[secondId].flipped = false
          setCards(resetCards)
          setFlippedCards([])
        }, 1000)
      }
    }
  }

  // Format time as mm:ss
  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000)
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
          <span>{formatTime(currentTime)}</span>
        </div>
        <div>Moves: {moves}</div>
        <div>
          Pairs: {matchedPairs}/{totalPairs}
        </div>
      </div>

      <div
        className={`grid gap-2 ${
          difficulty === "easy" ? "grid-cols-3" : difficulty === "medium" ? "grid-cols-4" : "grid-cols-4 grid-rows-6"
        }`}
      >
        {cards.map((card) => (
          <div
            key={card.id}
            className={`aspect-square rounded-lg flex items-center justify-center text-3xl cursor-pointer transition-all duration-300 transform ${
              card.flipped || card.matched ? "bg-primary/10 rotate-y-180" : "bg-primary"
            } ${card.matched ? "opacity-50" : ""}`}
            onClick={() => handleCardClick(card.id)}
          >
            {(card.flipped || card.matched) && card.symbol}
          </div>
        ))}
      </div>
    </div>
  )
}
