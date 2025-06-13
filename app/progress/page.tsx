"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProgressOverview } from "@/components/progress/progress-overview"
import { DomainRadarChart } from "@/components/progress/domain-radar-chart"
import { ProgressHistory } from "@/components/progress/progress-history"
import { Achievements } from "@/components/progress/achievements"
import { Skeleton } from "@/components/ui/skeleton"

// Prevent static generation
export const dynamic = "force-dynamic"

function ProgressPageLoading() {
  return (
    <div className="container px-4 py-6 space-y-6">
      <Skeleton className="h-8 w-48" />

      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="border rounded-lg p-4">
                <Skeleton className="h-4 w-20 mb-2" />
                <Skeleton className="h-6 w-16" />
              </div>
            ))}
          </div>
          <div className="border rounded-lg p-4 space-y-4">
            <Skeleton className="h-5 w-32" />
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-12" />
                </div>
                <Skeleton className="h-2 w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ProgressPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <ProgressPageLoading />
  }

  return (
    <div className="container px-4 py-6 space-y-6">
      <h1 className="text-2xl font-bold">Your Progress</h1>

      <Tabs defaultValue="overview">
        <TabsList className="grid grid-cols-4 h-auto">
          <TabsTrigger value="overview" className="text-xs py-2">
            Overview
          </TabsTrigger>
          <TabsTrigger value="domains" className="text-xs py-2">
            Domains
          </TabsTrigger>
          <TabsTrigger value="history" className="text-xs py-2">
            History
          </TabsTrigger>
          <TabsTrigger value="achievements" className="text-xs py-2">
            Achievements
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="mt-4">
          <ProgressOverview />
        </TabsContent>
        <TabsContent value="domains" className="mt-4">
          <DomainRadarChart />
        </TabsContent>
        <TabsContent value="history" className="mt-4">
          <ProgressHistory />
        </TabsContent>
        <TabsContent value="achievements" className="mt-4">
          <Achievements />
        </TabsContent>
      </Tabs>
    </div>
  )
}
