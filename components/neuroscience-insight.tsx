import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Lightbulb } from "lucide-react"

export function NeuroscienceInsight() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center">
          <Lightbulb className="h-4 w-4 mr-2 text-yellow-500" />
          Neuroscience Insight
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm">
          Today's exercise strengthened your dorsolateral prefrontal cortex, crucial for working memory and
          decision-making under pressure.
        </p>
        <Button variant="link" className="text-xs p-0 h-auto mt-2">
          Learn more about this brain region
        </Button>
      </CardContent>
    </Card>
  )
}
