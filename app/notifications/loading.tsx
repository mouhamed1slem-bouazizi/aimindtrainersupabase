export default function Loading() {
  return (
    <div className="container px-4 py-6 space-y-6">
      <div className="h-8 w-48 bg-muted rounded animate-pulse"></div>

      <div className="h-10 w-full bg-muted rounded animate-pulse"></div>

      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-24 bg-muted rounded animate-pulse"></div>
        ))}
      </div>
    </div>
  )
}
