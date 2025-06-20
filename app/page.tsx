"use client"

import { useEffect, useState } from "react"
import { DailyTraining } from "@/components/home/daily-training"
import { StreakCard } from "@/components/home/streak-card"
import { NeuroscienceInsight } from "@/components/home/neuroscience-insight"
import { AiCoach } from "@/components/home/ai-coach"
import { ChallengeCard } from "@/components/home/challenge-card"
import Loading from "./loading"

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <Loading />
  }

  return (
    <div className="container px-4 py-6 space-y-6">
      <h1 className="text-2xl font-bold">MindTrainer</h1>
      <StreakCard />
      <DailyTraining />
      <ChallengeCard />
      <NeuroscienceInsight />
      <AiCoach />
    </div>
  )
}
