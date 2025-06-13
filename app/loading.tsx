export default function Loading() {
  return (
    <div className="container flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center">
        <div className="relative">
          <div className="h-16 w-16 rounded-full border-4 border-muted animate-spin"></div>
          <div className="absolute top-0 left-0 h-16 w-16 rounded-full border-t-4 border-primary animate-spin"></div>
        </div>
        <p className="mt-4 text-muted-foreground">Loading...</p>
      </div>
    </div>
  )
}
