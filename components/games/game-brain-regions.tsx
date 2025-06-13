import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain } from "lucide-react"

interface GameBrainRegionsProps {
  regions: string[]
}

export function GameBrainRegions({ regions }: GameBrainRegionsProps) {
  return (
    <Card>
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-base flex items-center">
          <Brain className="h-4 w-4 mr-2 text-primary" />
          Brain Regions
        </CardTitle>
        <CardDescription className="text-xs">This game primarily activates these brain regions</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex flex-wrap gap-2">
          {regions.map((region, index) => (
            <Badge key={index} variant="outline">
              {region}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
