import { Skeleton } from "@/components/ui/skeleton"

export default function RegisterSkeleton() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <Skeleton className="h-10 w-3/4 mx-auto mb-6" />
        <Skeleton className="h-4 w-2/3 mx-auto mb-8" />
        <Skeleton className="h-12 w-full mb-4" />
        <Skeleton className="h-12 w-full mb-4" />
        <Skeleton className="h-12 w-full mb-4" />
        <Skeleton className="h-12 w-full mb-6" />
        <Skeleton className="h-10 w-full mb-6" />
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <Skeleton className="h-4 w-24 bg-white px-2" />
          </div>
        </div>
        <Skeleton className="h-10 w-full mb-6" />
        <div className="flex justify-center">
          <Skeleton className="h-4 w-48" />
        </div>
      </div>
    </div>
  )
}
