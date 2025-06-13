"use client"

import { useTraining } from "@/context/training-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, Legend } from "recharts"
import { ChartContainer } from "@/components/ui/chart"

export function DomainRadarChart() {
  const { domainScores } = useTraining()

  // Format data for the radar chart
  const chartData = domainScores.map((item) => ({
    subject: item.domain,
    score: item.score,
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
            {domainScores.map((domain) => (
              <div key={domain.domain} className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{domain.domain}</p>
                  <div className="flex items-center text-xs text-green-600">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-1"
                    >
                      <path
                        d="M7 17L17 7M17 7H8M17 7V16"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>+{domain.improvement}% improvement</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold">{domain.score}</p>
                  <p className="text-xs text-muted-foreground">out of 100</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
