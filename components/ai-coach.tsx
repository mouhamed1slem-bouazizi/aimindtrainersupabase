import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AiCoach() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center">
          <MessageSquare className="h-4 w-4 mr-2 text-blue-500" />
          AI Coach
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm">
          Great job on improving your reaction time by 15%! Your consistent practice is paying off. Tomorrow, try
          focusing on memory games to balance your training.
        </p>
        <Button variant="outline" className="w-full mt-3 text-sm">
          Get personalized recommendations
        </Button>
      </CardContent>
    </Card>
  )
}
