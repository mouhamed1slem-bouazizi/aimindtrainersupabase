export default function Loading() {
  return (
    <div className="container px-4 py-6 space-y-6">
      <div className="h-8 w-48 bg-muted rounded animate-pulse"></div>

      <div className="h-10 w-full bg-muted rounded animate-pulse"></div>

      <div className="h-10 w-full bg-muted rounded animate-pulse"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-24 bg-muted rounded animate-pulse"></div>
        ))}
      </div>
    </div>
  )
}
