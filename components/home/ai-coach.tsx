"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAICoach } from "@/context/ai-coach-context"
import { useTraining } from "@/context/training-context"
import { useRouter } from "next/navigation"

export function AiCoach() {
  const { recommendations } = useAICoach()
  const { domainScores } = useTraining()
  const router = useRouter()

  // Get the first recommendation
  const recommendation =
    recommendations[0] || "Based on your progress, try focusing on Memory games to balance your cognitive training."

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center">
          <MessageSquare className="h-4 w-4 mr-2 text-blue-500" />
          AI Coach
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{recommendation}</p>
        <Button variant="outline" className="w-full mt-3 text-sm" onClick={() => router.push("/coach")}>
          Get personalized recommendations
        </Button>
      </CardContent>
    </Card>
  )
}
