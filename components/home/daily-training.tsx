"use client"

import { useTraining } from "@/context/training-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, Brain, ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"

export function DailyTraining() {
  const { trainingPlan } = useTraining()
  const router = useRouter()

  // Get today's training
  const today = new Date().toISOString().split("T")[0]
  const todayPlan = trainingPlan.days.find((day) => day.date === today) || trainingPlan.days[0]

  if (!todayPlan) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Today's Training
          <span className="text-sm font-normal text-muted-foreground">
            {new Date(todayPlan.date).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="space-y-4">
          {todayPlan.games.map((game) => (
            <div
              key={game.id}
              className={cn(
                "flex items-center justify-between p-3 rounded-lg",
                game.completed ? "bg-muted/30" : "bg-muted/50",
              )}
            >
              <div className="flex items-center">
                <div className={cn("p-2 rounded-full mr-3", game.completed ? "bg-green-500/10" : "bg-primary/10")}>
                  <Brain className={cn("h-5 w-5", game.completed ? "text-green-500" : "text-primary")} />
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
                variant={game.completed ? "outline" : "ghost"}
                className="rounded-full"
                onClick={() => router.push(`/games/${game.id}`)}
              >
                {game.completed ? "Review" : <ChevronRight className="h-4 w-4" />}
              </Button>
            </div>
          ))}
        </div>
        <Button className="w-full mt-4">Start Training Session</Button>
      </CardContent>
    </Card>
  )
}

// Helper function for conditional class names
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}
