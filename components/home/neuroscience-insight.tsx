"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Lightbulb } from "lucide-react"
import { useAICoach } from "@/context/ai-coach-context"

export function NeuroscienceInsight() {
  const { getDomainInsight } = useAICoach()

  // Get a random insight for the home page
  const domains = [
    "Memory",
    "Attention",
    "Processing Speed",
    "Reflexes",
    "Executive Control",
    "Problem-Solving",
    "Spatial Reasoning",
    "Language",
    "Numerical Skills",
    "Stress Regulation",
  ] as const

  const randomDomain = domains[Math.floor(Math.random() * domains.length)]
  const insight = getDomainInsight(randomDomain)

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center">
          <Lightbulb className="h-4 w-4 mr-2 text-yellow-500" />
          Neuroscience Insight
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{insight}</p>
        <Button variant="link" className="text-xs p-0 h-auto mt-2">
          Learn more about this brain region
        </Button>
      </CardContent>
    </Card>
  )
}
