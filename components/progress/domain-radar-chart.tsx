"use client"

import { useTraining } from "@/context/training-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, Legend } from "recharts"
import { ChartContainer } from "@/components/ui/chart"
import { Button } from "@/components/ui/button"
import { ArrowUp } from "lucide-react"

export function DomainRadarChart() {
  const { domainScores, domainImprovements } = useTraining()

  // Format data for the radar chart
  const chartData = Object.entries(domainScores).map(([domain, score]) => ({
    subject: domain,
    score: score,
    fullMark: 100,
  }))

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Cognitive Domain Strengths</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <ChartContainer
            config={{
              score: {
                label: "Current Score",
                color: "hsl(var(--chart-1))",
              },
            }}
            className="h-[350px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10 }} />
                <Radar
                  name="Score"
                  dataKey="score"
                  stroke="var(--color-score)"
                  fill="var(--color-score)"
                  fillOpacity={0.6}
                />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Domain Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-4">
            {Object.entries(domainScores).map(([domain, score]) => (
              <div key={domain} className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{domain}</p>
                  <div className="flex items-center text-xs text-green-600">
                    <ArrowUp className="h-3 w-3 mr-1" />
                    <span>+{domainImprovements[domain as keyof typeof domainImprovements]}% improvement</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold">{score}</p>
                  <p className="text-xs text-muted-foreground">out of 100</p>
                </div>
              </div>
            ))}
          </div>

          <Button variant="outline" className="w-full mt-4">
            View Detailed Analysis
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
