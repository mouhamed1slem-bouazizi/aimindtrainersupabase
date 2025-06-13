import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProgressOverview } from "@/components/progress/progress-overview"
import { DomainRadarChart } from "@/components/progress/domain-radar-chart"
import { ProgressHistory } from "@/components/progress/progress-history"
import { Achievements } from "@/components/progress/achievements"

export default function ProgressPage() {
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
