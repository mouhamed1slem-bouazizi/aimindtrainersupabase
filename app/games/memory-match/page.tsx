"use client"
import dynamic from "next/dynamic"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"

// Disable static generation
const disableStaticGeneration = "force-dynamic"

// Import the client component with no SSR
const MemoryMatchGameClient = dynamic(() => import("./memory-match-client"), {
  ssr: false,
  loading: () => <MemoryMatchLoading />,
})

function MemoryMatchLoading() {
  return (
    <div className="container px-4 py-6 space-y-6">
      <div className="flex items-center">
        <Skeleton className="h-10 w-10 rounded-full mr-2" />
        <Skeleton className="h-8 w-40" />
      </div>

      <Skeleton className="h-64 w-full rounded-lg" />
    </div>
  )
}

export default function MemoryMatchPage() {
  return (
    <Suspense fallback={<MemoryMatchLoading />}>
      <MemoryMatchGameClient />
    </Suspense>
  )
}
