import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Lightbulb } from "lucide-react"
import Link from "next/link"

export default function CoachPageLoading() {
  return (
    <div className="container px-4 py-6 space-y-6 flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex items-center">
        <Link href="/">
          <Button variant="ghost" size="icon" className="mr-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">AI Coach</h1>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 pb-4">
        <div className="flex justify-start">
          <div className="max-w-[80%] rounded-lg p-3 bg-muted">
            <div className="flex items-center mb-1">
              <Skeleton className="h-6 w-6 rounded-full mr-2" />
              <Skeleton className="h-4 w-16" />
            </div>
            <Skeleton className="h-4 w-64 mb-1" />
            <Skeleton className="h-4 w-48 mb-1" />
            <Skeleton className="h-4 w-56" />
            <div className="flex justify-end mt-1">
              <Skeleton className="h-3 w-12" />
            </div>
          </div>
        </div>
      </div>

      <div className="border-t pt-4">
        <Card className="mb-4">
          <CardHeader className="p-3 pb-0">
            <CardTitle className="text-sm flex items-center">
              <Lightbulb className="h-4 w-4 mr-2 text-yellow-500" />
              Suggested Questions
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 pt-2">
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-8 w-40" />
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-8 w-56" />
            </div>
          </CardContent>
        </Card>

        <div className="flex space-x-2">
          <div className="flex-1">
            <Skeleton className="h-10 w-full" />
          </div>
          <Skeleton className="h-10 w-10" />
        </div>
      </div>
    </div>
  )
}
