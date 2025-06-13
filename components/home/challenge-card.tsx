"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation"

export function ChallengeCard() {
  const router = useRouter()

  // Mock challenge data
  const challenge = {
    title: "Memory Master",
    description: "Complete 5 memory games this week",
    progress: 3,
    total: 5,
    reward: "200 points + Memory Master badge",
    expiresIn: "2 days",
  }

  const progressPercentage = (challenge.progress / challenge.total) * 100

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center justify-between">
          <div className="flex items-center">
            <Zap className="h-4 w-4 mr-2 text-purple-500" />
            Weekly Challenge
          </div>
          <span className="text-xs font-normal text-muted-foreground">Expires in {challenge.expiresIn}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <h3 className="font-medium">{challenge.title}</h3>
        <p className="text-sm text-muted-foreground mb-3">{challenge.description}</p>

        <div className="flex justify-between items-center text-xs mb-1">
          <span>Progress</span>
          <span>
            {challenge.progress}/{challenge.total}
          </span>
        </div>
        <Progress value={progressPercentage} className="h-2 mb-3" />

        <div className="flex items-center text-xs text-muted-foreground mb-3">
          <Trophy className="h-3 w-3 mr-1 text-yellow-500" />
          <span>Reward: {challenge.reward}</span>
        </div>

        <Button variant="default" className="w-full" onClick={() => router.push("/games?domain=Memory")}>
          Continue Challenge
        </Button>
      </CardContent>
    </Card>
  )
}
