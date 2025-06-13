import { Skeleton } from "@/components/ui/skeleton"

export default function MemoryMatchLoading() {
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
