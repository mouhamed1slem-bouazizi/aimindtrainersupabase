"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { useGameProgress } from "@/context/game-progress-context"
import type { CognitiveDomain } from "@/types/training"

// Sample data for the charts
const memoryData = [
  { date: "Jun 1", score: 65 },
  { date: "Jun 2", score: 68 },
  { date: "Jun 3", score: 67 },
  { date: "Jun 4", score: 70 },
  { date: "Jun 5", score: 72 },
  { date: "Jun 6", score: 75 },
  { date: "Jun 7", score: 73 },
  { date: "Jun 8", score: 78 },
  { date: "Jun 9", score: 80 },
  { date: "Jun 10", score: 82 },
  { date: "Jun 11", score: 85 },
  { date: "Jun 12", score: 83 },
]

const reflexData = [
  { date: "Jun 1", time: 450 },
  { date: "Jun 2", time: 445 },
  { date: "Jun 3", time: 440 },
  { date: "Jun 4", time: 435 },
  { date: "Jun 5", time: 430 },
  { date: "Jun 6", time: 425 },
  { date: "Jun 7", time: 420 },
  { date: "Jun 8", time: 415 },
  { date: "Jun 9", time: 410 },
  { date: "Jun 10", time: 405 },
  { date: "Jun 11", time: 400 },
  { date: "Jun 12", time: 395 },
]

export function ProgressHistory() {
  const [timePeriod, setTimePeriod] = useState("30")
  const [selectedDomain, setSelectedDomain] = useState<CognitiveDomain>("Memory")
  const { getGameHistory, getDomainHistory } = useGameProgress()

  // Get history for memory match game
  const memoryMatchHistory = getGameHistory("memory-match")

  // Get history for selected domain
  const domainHistory = getDomainHistory(selectedDomain)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">Performance History</h2>
        <Select defaultValue={timePeriod} onValueChange={setTimePeriod}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Time period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">Last 7 days</SelectItem>
            <SelectItem value="30">Last 30 days</SelectItem>
            <SelectItem value="90">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Memory Performance</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <ChartContainer
            config={{
              score: {
                label: "Memory Score",
                color: "hsl(var(--chart-1))",
              },
            }}
            className="h-[250px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={memoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[50, 100]} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Line type="monotone" dataKey="score" stroke="var(--color-score)" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Reflex Time (ms)</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <ChartContainer
            config={{
              time: {
                label: "Reaction Time (ms)",
                color: "hsl(var(--chart-2))",
              },
            }}
            className="h-[250px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={reflexData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[350, 500]} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Line type="monotone" dataKey="time" stroke="var(--color-time)" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Recent Training Sessions</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-4">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="flex justify-between items-center border-b pb-3 last:border-0 last:pb-0">
                <div>
                  <p className="font-medium">
                    {["Memory Match", "Attention Grid", "Speed Sort", "Reflex Tap", "Task Switch"][index]}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {["Jun 12, 2023", "Jun 11, 2023", "Jun 10, 2023", "Jun 9, 2023", "Jun 8, 2023"][index]} •{" "}
                    {[3, 4, 2, 3, 5][index]} min
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">Score: {[85, 78, 92, 67, 81][index]}</p>
                  <div className="flex items-center text-xs text-green-600 justify-end">
                    <ArrowUp className="h-3 w-3 mr-1" />
                    <span>+{[5, 3, 8, 2, 4][index]}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Missing ArrowUp component
import { ArrowUp } from "lucide-react"
