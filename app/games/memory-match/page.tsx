"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Clock, Brain } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useTraining } from "@/context/training-context"

// Emoji symbols for the memory cards
const symbols = ["🍎", "🍌", "🍇", "🍊", "🍓", "🍉", "🍒", "🥝", "🍍", "🥥", "🥭", "🍋"]

interface MemoryCard {
  id: number
  symbol: string
  flipped: boolean
  matched: boolean
}

export default function MemoryMatchGame() {
  const router = useRouter()
  const { completeGame } = useTraining()
  const [cards, setCards] = useState<MemoryCard[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [matchedPairs, setMatchedPairs] = useState(0)
  const [moves, setMoves] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameCompleted, setGameCompleted] = useState(false)
  const [timer, setTimer] = useState(0)
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("easy")
  const [score, setScore] = useState(0)

  // Initialize the game
  const initializeGame = (diff: "easy" | "medium" | "hard") => {
    setDifficulty(diff)

    // Determine number of pairs based on difficulty
    const numPairs = diff === "easy" ? 6 : diff === "medium" ? 8 : 12

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
    setTimer(0)
    setGameStarted(true)
    setGameCompleted(false)
  }

  // Handle card click
  const handleCardClick = (id: number) => {
    // Ignore click if card is already flipped or matched
    if (flippedCards.length === 2 || cards[id].flipped || cards[id].matched || gameCompleted) {
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
          if (matchedPairs + 1 === cards.length / 2) {
            const finalScore = calculateScore()
            setScore(finalScore)
            setGameCompleted(true)
            completeGame("memory-match", finalScore, "Memory")
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

  // Calculate score based on moves, time, and difficulty
  const calculateScore = () => {
    const baseScore = difficulty === "easy" ? 500 : difficulty === "medium" ? 750 : 1000
    const movesPenalty = moves * 5
    const timePenalty = Math.floor(timer / 5)
    const difficultyBonus = difficulty === "easy" ? 0 : difficulty === "medium" ? 200 : 500

    return Math.max(0, baseScore - movesPenalty - timePenalty + difficultyBonus)
  }

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (gameStarted && !gameCompleted) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1)
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [gameStarted, gameCompleted])

  return (
    <div className="container px-4 py-6 space-y-6">
      <div className="flex items-center">
        <Link href="/games">
          <Button variant="ghost" size="icon" className="mr-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Memory Match</h1>
      </div>

      {!gameStarted ? (
        <Card>
          <CardContent className="p-6 space-y-6">
            <div className="text-center">
              <Brain className="h-12 w-12 mx-auto text-primary mb-4" />
              <h2 className="text-xl font-bold mb-2">Memory Match</h2>
              <p className="text-sm text-muted-foreground mb-6">
                Test your visual memory by matching pairs of cards with identical symbols.
              </p>
            </div>

            <div className="space-y-3">
              <Button onClick={() => initializeGame("easy")} className="w-full" variant="outline">
                Easy (6 pairs)
              </Button>
              <Button onClick={() => initializeGame("medium")} className="w-full" variant="outline">
                Medium (8 pairs)
              </Button>
              <Button onClick={() => initializeGame("hard")} className="w-full">
                Hard (12 pairs)
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
              <span>
                {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, "0")}
              </span>
            </div>
            <div>Moves: {moves}</div>
            <div>
              Pairs: {matchedPairs}/{cards.length / 2}
            </div>
          </div>

          <div
            className={`grid gap-2 ${
              difficulty === "easy" ? "grid-cols-3" : difficulty === "medium" ? "grid-cols-4" : "grid-cols-4"
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

          {gameCompleted && (
            <Card>
              <CardContent className="p-6 text-center">
                <h2 className="text-xl font-bold mb-2">Game Completed!</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  You completed the game in {moves} moves and {Math.floor(timer / 60)}:
                  {(timer % 60).toString().padStart(2, "0")} minutes.
                </p>
                <div className="text-3xl font-bold mb-6">Score: {score}</div>
                <div className="space-y-3">
                  <Button onClick={() => initializeGame(difficulty)} className="w-full">
                    Play Again
                  </Button>
                  <Button variant="outline" className="w-full" onClick={() => router.push("/games")}>
                    Back to Games
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  )
}
