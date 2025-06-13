"use client"

import { useState, useEffect } from "react"
import { useTraining } from "@/context/training-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, Legend } from "recharts"
import { ChartContainer } from "@/components/ui/chart"
import { Button } from "@/components/ui/button"
import { ArrowUp } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

export function DomainRadarChart() {
  const trainingContext = useTraining() // Moved useTraining hook to the top level
  const [mounted, setMounted] = useState(false)
  const [chartData, setChartData] = useState([])
  const [domainScores, setDomainScores] = useState({})
  const [domainImprovements, setDomainImprovements] = useState({})

  useEffect(() => {
    setMounted(true)
    try {
      setDomainScores(trainingContext.domainScores)
      setDomainImprovements(trainingContext.domainImprovements)

      const data = Object.entries(trainingContext.domainScores).map(([domain, score]) => ({
        subject: domain,
        score: score,
        fullMark: 100,
      }))
      setChartData(data)
    } catch (error) {
      console.log("Training context not available, using fallback data")
      const fallbackScores = {
        Memory: 85,
        Attention: 78,
        Processing: 82,
        Flexibility: 75,
      }
      const fallbackImprovements = {
        Memory: 12,
        Attention: 8,
        Processing: 15,
        Flexibility: 6,
      }

      setDomainScores(fallbackScores)
      setDomainImprovements(fallbackImprovements)

      const data = Object.entries(fallbackScores).map(([domain, score]) => ({
        subject: domain,
        score: score,
        fullMark: 100,
      }))
      setChartData(data)
    }
  }, [])

  if (!mounted) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader className="pb-2">
            <Skeleton className="h-5 w-48" />
          </CardHeader>
          <CardContent className="pt-0">
            <Skeleton className="h-[350px] w-full" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <Skeleton className="h-5 w-32" />
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex justify-between items-center">
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                  <div className="text-right space-y-1">
                    <Skeleton className="h-6 w-8" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
              ))}
            </div>
            <Skeleton className="h-10 w-full mt-4" />
          </CardContent>
        </Card>
      </div>
    )
  }

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
