"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { useSupabase } from "./supabase-context"
import { useUser } from "./user-context"
import type { CognitiveDomain, GameHistory, GameStats } from "@/types/training"

interface GameProgressContextType {
  gameStats: Record<string, GameStats>
  gameHistory: Record<string, GameHistory[]>
  addGameResult: (gameId: string, domain: CognitiveDomain, result: GameHistory) => Promise<void>
  getGameStats: (gameId: string) => GameStats | null
  getGameHistory: (gameId: string) => GameHistory[]
  getDomainHistory: (domain: CognitiveDomain) => GameHistory[]
  isLoading: boolean
}

const GameProgressContext = createContext<GameProgressContextType | undefined>(undefined)

export function GameProgressProvider({ children }: { children: React.ReactNode }) {
  const { supabase } = useSupabase()
  const { user, isAuthenticated } = useUser()
  const [isLoading, setIsLoading] = useState(true)

  const [gameStats, setGameStats] = useState<Record<string, GameStats>>({})
  const [gameHistory, setGameHistory] = useState<Record<string, GameHistory[]>>({})

  // Load game progress data when user is authenticated
  useEffect(() => {
    const loadGameProgressData = async () => {
      if (!isAuthenticated || !user) {
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      try {
        // Get all games
        const { data: gamesData, error: gamesError } = await supabase.from("games").select("id, name")

        if (gamesError) {
          console.error("Error loading games:", gamesError)
          return
        }

        const stats: Record<string, GameStats> = {}
        const history: Record<string, GameHistory[]> = {}

        // For each game, get stats and history
        for (const game of gamesData) {
          // Get game sessions for this game
          const { data: sessionsData, error: sessionsError } = await supabase
            .from("game_sessions")
            .select("score, duration, difficulty, completed_at")
            .eq("user_id", user.id)
            .eq("game_id", game.id)
            .order("completed_at", { ascending: false })

          if (sessionsError) {
            console.error(`Error loading sessions for game ${game.id}:`, sessionsError)
            continue
          }

          // Calculate stats
          if (sessionsData.length > 0) {
            const scores = sessionsData.map((s) => s.score)
            const bestScore = Math.max(...scores)
            const averageScore = scores.reduce((a, b) => a + b, 0) / scores.length

            // Calculate improvement (comparing to average of first 3 sessions)
            let improvement = 0
            if (sessionsData.length >= 4) {
              const firstThree = sessionsData.slice(-3).map((s) => s.score)
              const firstThreeAvg = firstThree.reduce((a, b) => a + b, 0) / 3

              const latestThree = sessionsData.slice(0, 3).map((s) => s.score)
              const latestThreeAvg = latestThree.reduce((a, b) => a + b, 0) / 3

              improvement = Math.round(((latestThreeAvg - firstThreeAvg) / firstThreeAvg) * 100)
            }

            stats[game.id] = {
              bestScore,
              averageScore,
              totalSessions: sessionsData.length,
              improvement,
              lastPlayed: new Date(sessionsData[0].completed_at).toISOString().split("T")[0],
            }

            // Format history
            history[game.id] = sessionsData.map((session) => ({
              date: session.completed_at,
              score: session.score,
              duration: session.duration,
              difficulty: session.difficulty as GameHistory["difficulty"],
              domain: game.name.includes("Memory")
                ? "Memory"
                : game.name.includes("Attention")
                  ? "Attention"
                  : game.name.includes("Speed")
                    ? "Processing Speed"
                    : game.name.includes("Reflex")
                      ? "Reflexes"
                      : game.name.includes("Task")
                        ? "Executive Control"
                        : game.name.includes("Pattern")
                          ? "Problem-Solving"
                          : game.name.includes("Space")
                            ? "Spatial Reasoning"
                            : game.name.includes("Word")
                              ? "Language"
                              : game.name.includes("Number")
                                ? "Numerical Skills"
                                : "Stress Regulation",
            }))
          }
        }

        setGameStats(stats)
        setGameHistory(history)
      } catch (error) {
        console.error("Error loading game progress data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadGameProgressData()
  }, [isAuthenticated, user, supabase])

  const addGameResult = async (gameId: string, domain: CognitiveDomain, result: GameHistory) => {
    if (!user) return Promise.reject("No user logged in")

    try {
      // Add the game session to the database
      const { error } = await supabase.from("game_sessions").insert({
        user_id: user.id,
        game_id: gameId,
        score: result.score,
        duration: result.duration,
        difficulty: result.difficulty,
        completed_at: new Date().toISOString(),
      })

      if (error) {
        throw error
      }

      // Update local state
      setGameHistory((prev) => ({
        ...prev,
        [gameId]: [...(prev[gameId] || []), { ...result, domain }],
      }))

      // Update game stats
      const currentStats = gameStats[gameId] || {
        bestScore: 0,
        averageScore: 0,
        totalSessions: 0,
        improvement: 0,
        lastPlayed: "",
      }

      const totalSessions = currentStats.totalSessions + 1
      const totalScore = currentStats.averageScore * currentStats.totalSessions + result.score
      const averageScore = totalScore / totalSessions
      const bestScore = Math.max(currentStats.bestScore, result.score)

      // Calculate improvement (comparing to average of first 3 sessions)
      let improvement = currentStats.improvement
      const history = [...(gameHistory[gameId] || []), result]
      if (history.length >= 4) {
        const firstThreeAvg = history.slice(-3).reduce((sum, h) => sum + h.score, 0) / 3
        const latestThreeAvg = history.slice(0, 3).reduce((sum, h) => sum + h.score, 0) / 3
        improvement = Math.round(((latestThreeAvg - firstThreeAvg) / firstThreeAvg) * 100)
      }

      setGameStats((prev) => ({
        ...prev,
        [gameId]: {
          bestScore,
          averageScore,
          totalSessions,
          improvement,
          lastPlayed: new Date().toISOString().split("T")[0],
        },
      }))
    } catch (error) {
      console.error("Error adding game result:", error)
    }
  }

  const getGameStats = (gameId: string) => {
    return gameStats[gameId] || null
  }

  const getGameHistory = (gameId: string) => {
    return gameHistory[gameId] || []
  }

  const getDomainHistory = (domain: CognitiveDomain) => {
    return Object.values(gameHistory)
      .flat()
      .filter((history) => history.domain === domain)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }

  return (
    <GameProgressContext.Provider
      value={{
        gameStats,
        gameHistory,
        addGameResult,
        getGameStats,
        getGameHistory,
        getDomainHistory,
        isLoading,
      }}
    >
      {children}
    </GameProgressContext.Provider>
  )
}

export function useGameProgress() {
  const context = useContext(GameProgressContext)
  if (context === undefined) {
    throw new Error("useGameProgress must be used within a GameProgressProvider")
  }
  return context
}
