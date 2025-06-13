"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { useSupabase } from "./supabase-context"
import { useUser } from "./user-context"
import type { CognitiveDomain, GameSession, TrainingPlan } from "@/types/training"

interface TrainingContextType {
  currentStreak: number
  lastTrainingDate: string | null
  completedGames: number
  totalGames: number
  trainingPlan: TrainingPlan
  domainScores: Record<CognitiveDomain, number>
  domainImprovements: Record<CognitiveDomain, number>
  completeGameSession: (session: GameSession) => Promise<void>
  generateTrainingPlan: (days: number) => Promise<void>
  isLoading: boolean
}

const TrainingContext = createContext<TrainingContextType | undefined>(undefined)

export function TrainingProvider({ children }: { children: React.ReactNode }) {
  const { supabase } = useSupabase()
  const { user, isAuthenticated } = useUser()
  const [isLoading, setIsLoading] = useState(true)

  const [currentStreak, setCurrentStreak] = useState(0)
  const [lastTrainingDate, setLastTrainingDate] = useState<string | null>(null)
  const [completedGames, setCompletedGames] = useState(0)
  const [totalGames, setTotalGames] = useState(0)

  const [domainScores, setDomainScores] = useState<Record<CognitiveDomain, number>>({
    Memory: 0,
    Attention: 0,
    "Processing Speed": 0,
    Reflexes: 0,
    "Executive Control": 0,
    "Problem-Solving": 0,
    "Spatial Reasoning": 0,
    Language: 0,
    "Numerical Skills": 0,
    "Stress Regulation": 0,
  })

  const [domainImprovements, setDomainImprovements] = useState<Record<CognitiveDomain, number>>({
    Memory: 0,
    Attention: 0,
    "Processing Speed": 0,
    Reflexes: 0,
    "Executive Control": 0,
    "Problem-Solving": 0,
    "Spatial Reasoning": 0,
    Language: 0,
    "Numerical Skills": 0,
    "Stress Regulation": 0,
  })

  const [trainingPlan, setTrainingPlan] = useState<TrainingPlan>({
    days: [],
    currentDay: 1,
  })

  // Load training data when user is authenticated
  useEffect(() => {
    const loadTrainingData = async () => {
      if (!isAuthenticated || !user) {
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      try {
        // Load domain scores
        const { data: domainScoresData, error: domainScoresError } = await supabase
          .from("domain_scores")
          .select("domain, score, improvement")
          .eq("user_id", user.id)

        if (domainScoresError) {
          console.error("Error loading domain scores:", domainScoresError)
        } else if (domainScoresData) {
          const scores: Record<CognitiveDomain, number> = { ...domainScores }
          const improvements: Record<CognitiveDomain, number> = { ...domainImprovements }

          domainScoresData.forEach((item) => {
            scores[item.domain as CognitiveDomain] = item.score
            improvements[item.domain as CognitiveDomain] = item.improvement
          })

          setDomainScores(scores)
          setDomainImprovements(improvements)
        }

        // Load streak data
        const { data: streakData, error: streakError } = await supabase
          .from("training_streaks")
          .select("current_streak, last_training_date")
          .eq("user_id", user.id)
          .single()

        if (streakError) {
          console.error("Error loading streak data:", streakError)
        } else if (streakData) {
          setCurrentStreak(streakData.current_streak)
          setLastTrainingDate(streakData.last_training_date)
        }

        // Load game session count
        const { count: sessionsCount, error: sessionsError } = await supabase
          .from("game_sessions")
          .select("*", { count: "exact", head: true })
          .eq("user_id", user.id)

        if (sessionsError) {
          console.error("Error loading game sessions count:", sessionsError)
        } else {
          setCompletedGames(sessionsCount || 0)
        }

        // Load current training plan
        await loadCurrentTrainingPlan(user.id)
      } catch (error) {
        console.error("Error loading training data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadTrainingData()
  }, [isAuthenticated, user, supabase])

  const loadCurrentTrainingPlan = async (userId: string) => {
    try {
      // Get the most recent training plan
      const { data: planData, error: planError } = await supabase
        .from("training_plans")
        .select("id, start_date, end_date")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(1)
        .single()

      if (planError) {
        if (planError.code === "PGRST116") {
          // No training plan found, generate a new one
          await generateTrainingPlan(7)
          return
        }
        console.error("Error loading training plan:", planError)
        return
      }

      // Get the days for this plan
      const { data: daysData, error: daysError } = await supabase
        .from("training_plan_days")
        .select("id, day_number, date, completed")
        .eq("training_plan_id", planData.id)
        .order("day_number", { ascending: true })

      if (daysError) {
        console.error("Error loading training plan days:", daysError)
        return
      }

      // Get the games for each day
      const days = []
      let totalPlanGames = 0

      for (const day of daysData) {
        const { data: gamesData, error: gamesError } = await supabase
          .from("training_plan_games")
          .select(`
            id, completed,
            games:game_id (id, name, domain, duration)
          `)
          .eq("training_plan_day_id", day.id)

        if (gamesError) {
          console.error("Error loading training plan games:", gamesError)
          continue
        }

        const games = gamesData.map((item) => ({
          id: item.id,
          name: item.games.name,
          domain: item.games.domain as CognitiveDomain,
          duration: item.games.duration,
          completed: item.completed,
        }))

        totalPlanGames += games.length

        days.push({
          day: day.day_number,
          date: day.date,
          games,
          completed: day.completed,
        })
      }

      // Find the current day (first incomplete day or the last day)
      const today = new Date().toISOString().split("T")[0]
      const currentDayIndex = days.findIndex((day) => !day.completed && day.date <= today)

      const currentDay = currentDayIndex >= 0 ? currentDayIndex + 1 : 1

      setTrainingPlan({
        days,
        currentDay,
      })

      setTotalGames(totalPlanGames)
    } catch (error) {
      console.error("Error in loadCurrentTrainingPlan:", error)
    }
  }

  const completeGameSession = async (session: GameSession) => {
    if (!user) return Promise.reject("No user logged in")

    try {
      // Record the game session
      const { data: sessionData, error: sessionError } = await supabase
        .from("game_sessions")
        .insert({
          user_id: user.id,
          game_id: session.gameId,
          score: session.score,
          duration: session.duration,
          difficulty: session.difficulty,
          completed_at: new Date().toISOString(),
        })
        .select()
        .single()

      if (sessionError) {
        throw sessionError
      }

      // Update domain scores
      const { data: currentScore, error: scoreError } = await supabase
        .from("domain_scores")
        .select("score, improvement")
        .eq("user_id", user.id)
        .eq("domain", session.domain)
        .single()

      if (scoreError) {
        console.error("Error fetching current domain score:", scoreError)
      } else {
        const newScore = Math.min(100, currentScore.score + session.score / 100)
        const newImprovement = currentScore.improvement + (session.improvement || 1)

        const { error: updateError } = await supabase
          .from("domain_scores")
          .update({
            score: newScore,
            improvement: newImprovement,
            updated_at: new Date().toISOString(),
          })
          .eq("user_id", user.id)
          .eq("domain", session.domain)

        if (updateError) {
          console.error("Error updating domain score:", updateError)
        } else {
          // Update local state
          setDomainScores((prev) => ({
            ...prev,
            [session.domain]: newScore,
          }))

          setDomainImprovements((prev) => ({
            ...prev,
            [session.domain]: newImprovement,
          }))
        }
      }

      // Update streak
      const today = new Date().toISOString().split("T")[0]

      if (lastTrainingDate !== today) {
        const yesterday = new Date()
        yesterday.setDate(yesterday.getDate() - 1)
        const yesterdayStr = yesterday.toISOString().split("T")[0]

        // Check if the streak continues or resets
        const newStreak = lastTrainingDate === yesterdayStr ? currentStreak + 1 : 1

        const { error: streakError } = await supabase
          .from("training_streaks")
          .update({
            current_streak: newStreak,
            longest_streak: Math.max(newStreak, currentStreak),
            last_training_date: today,
            updated_at: new Date().toISOString(),
          })
          .eq("user_id", user.id)

        if (streakError) {
          console.error("Error updating streak:", streakError)
        } else {
          setCurrentStreak(newStreak)
          setLastTrainingDate(today)
        }
      }

      // Update training plan if this game is part of it
      if (trainingPlan.days.length > 0) {
        // Find the game in the training plan
        for (const day of trainingPlan.days) {
          const gameIndex = day.games.findIndex((g) => g.id === session.gameId)

          if (gameIndex !== -1) {
            // Mark the game as completed
            const { error: gameError } = await supabase
              .from("training_plan_games")
              .update({
                completed: true,
                updated_at: new Date().toISOString(),
              })
              .eq("id", day.games[gameIndex].id)

            if (gameError) {
              console.error("Error updating training plan game:", gameError)
            } else {
              // Check if all games for the day are completed
              const allCompleted = day.games.every((g, i) => i === gameIndex || g.completed)

              if (allCompleted) {
                // Find the day in the database
                const dayId = await getDayIdFromTrainingPlan(day.day)

                if (dayId) {
                  // Mark the day as completed
                  const { error: dayError } = await supabase
                    .from("training_plan_days")
                    .update({
                      completed: true,
                      updated_at: new Date().toISOString(),
                    })
                    .eq("id", dayId)

                  if (dayError) {
                    console.error("Error updating training plan day:", dayError)
                  }
                }
              }

              // Update local state
              setTrainingPlan((prev) => {
                const newDays = prev.days.map((d) => {
                  if (d.day === day.day) {
                    const newGames = d.games.map((g, i) => (i === gameIndex ? { ...g, completed: true } : g))

                    const allGamesCompleted = newGames.every((g) => g.completed)

                    return {
                      ...d,
                      games: newGames,
                      completed: allGamesCompleted,
                    }
                  }
                  return d
                })

                return {
                  ...prev,
                  days: newDays,
                }
              })
            }

            break
          }
        }
      }

      // Update completed games count
      setCompletedGames((prev) => prev + 1)

      return Promise.resolve()
    } catch (error) {
      console.error("Error completing game session:", error)
      return Promise.reject(error)
    }
  }

  const getDayIdFromTrainingPlan = async (dayNumber: number): Promise<string | null> => {
    if (!user) return null

    try {
      // Get the most recent training plan
      const { data: planData, error: planError } = await supabase
        .from("training_plans")
        .select("id")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .single()

      if (planError) {
        console.error("Error getting training plan:", planError)
        return null
      }

      // Get the day ID
      const { data: dayData, error: dayError } = await supabase
        .from("training_plan_days")
        .select("id")
        .eq("training_plan_id", planData.id)
        .eq("day_number", dayNumber)
        .single()

      if (dayError) {
        console.error("Error getting day ID:", dayError)
        return null
      }

      return dayData.id
    } catch (error) {
      console.error("Error in getDayIdFromTrainingPlan:", error)
      return null
    }
  }

  const generateTrainingPlan = async (days: number) => {
    if (!user) return Promise.reject("No user logged in")

    try {
      // Get all games
      const { data: gamesData, error: gamesError } = await supabase.from("games").select("id, name, domain, duration")

      if (gamesError) {
        throw gamesError
      }

      // Sort domains by lowest score to prioritize weaker areas
      const sortedDomains = Object.entries(domainScores)
        .sort(([, scoreA], [, scoreB]) => scoreA - scoreB)
        .map(([domain]) => domain as CognitiveDomain)

      // Create a new training plan
      const startDate = new Date()
      const endDate = new Date()
      endDate.setDate(endDate.getDate() + days - 1)

      const { data: planData, error: planError } = await supabase
        .from("training_plans")
        .insert({
          user_id: user.id,
          start_date: startDate.toISOString().split("T")[0],
          end_date: endDate.toISOString().split("T")[0],
        })
        .select()
        .single()

      if (planError) {
        throw planError
      }

      // Create days and games for the plan
      let totalPlanGames = 0
      const newDays = []

      for (let i = 0; i < days; i++) {
        const date = new Date()
        date.setDate(date.getDate() + i)
        const dateStr = date.toISOString().split("T")[0]

        // Create the day
        const { data: dayData, error: dayError } = await supabase
          .from("training_plan_days")
          .insert({
            training_plan_id: planData.id,
            day_number: i + 1,
            date: dateStr,
            completed: false,
          })
          .select()
          .single()

        if (dayError) {
          console.error("Error creating training plan day:", dayError)
          continue
        }

        // Select 2-3 games for each day, prioritizing weaker domains
        const dayGames = []
        const numGames = Math.floor(Math.random() * 2) + 2 // 2-3 games per day

        for (let j = 0; j < numGames; j++) {
          // Select domain with bias towards weaker areas
          const domainIndex = Math.floor(Math.pow(Math.random(), 1.5) * sortedDomains.length)
          const domain = sortedDomains[domainIndex]

          // Find a game for this domain
          const domainGames = gamesData.filter((g) => g.domain === domain)

          if (domainGames.length === 0) continue

          const game = domainGames[Math.floor(Math.random() * domainGames.length)]

          // Add the game to the training plan
          const { data: planGameData, error: planGameError } = await supabase
            .from("training_plan_games")
            .insert({
              training_plan_day_id: dayData.id,
              game_id: game.id,
              completed: false,
            })
            .select()
            .single()

          if (planGameError) {
            console.error("Error creating training plan game:", planGameError)
            continue
          }

          dayGames.push({
            id: planGameData.id,
            name: game.name,
            domain: game.domain as CognitiveDomain,
            duration: game.duration,
            completed: false,
          })

          totalPlanGames++
        }

        newDays.push({
          day: i + 1,
          date: dateStr,
          games: dayGames,
          completed: false,
        })
      }

      // Update local state
      setTrainingPlan({
        days: newDays,
        currentDay: 1,
      })

      setTotalGames((prev) => prev + totalPlanGames)

      return Promise.resolve()
    } catch (error) {
      console.error("Error generating training plan:", error)
      return Promise.reject(error)
    }
  }

  return (
    <TrainingContext.Provider
      value={{
        currentStreak,
        lastTrainingDate,
        completedGames,
        totalGames,
        trainingPlan,
        domainScores,
        domainImprovements,
        completeGameSession,
        generateTrainingPlan,
        isLoading,
      }}
    >
      {children}
    </TrainingContext.Provider>
  )
}

export function useTraining() {
  const context = useContext(TrainingContext)
  if (context === undefined) {
    throw new Error("useTraining must be used within a TrainingProvider")
  }
  return context
}
