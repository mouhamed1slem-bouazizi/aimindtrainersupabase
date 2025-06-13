export default function Loading() {
  return (
    <div className="container px-4 py-6 space-y-6 flex flex-col h-[calc(100vh-8rem)]">
      <div className="h-8 w-48 bg-muted rounded animate-pulse"></div>

      <div className="flex-1 space-y-4">
        <div className="h-16 w-3/4 bg-muted rounded animate-pulse"></div>
        <div className="h-16 w-3/4 ml-auto bg-muted rounded animate-pulse"></div>
        <div className="h-16 w-3/4 bg-muted rounded animate-pulse"></div>
      </div>

      <div className="h-10 w-full bg-muted rounded animate-pulse"></div>
    </div>
  )
}
