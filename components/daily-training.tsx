"use client"

import { useTraining } from "@/context/training-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, Brain, ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"

export function DailyTraining() {
  const { trainingPlan } = useTraining()
  const router = useRouter()

  const currentDay = trainingPlan.days[trainingPlan.currentDay - 1]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Today's Training</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="space-y-4">
          {currentDay.games.map((game) => (
            <div key={game.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center">
                <div className="bg-primary/10 p-2 rounded-full mr-3">
                  <Brain className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">{game.name}</h4>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <span className="bg-primary/20 text-primary px-2 py-0.5 rounded-full mr-2">{game.domain}</span>
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{game.duration} min</span>
                  </div>
                </div>
              </div>
              <Button
                size="sm"
                variant="ghost"
                className="rounded-full"
                onClick={() => router.push(`/games/${game.id}`)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
        <Button className="w-full mt-4">Start Training Session</Button>
      </CardContent>
    </Card>
  )
}
