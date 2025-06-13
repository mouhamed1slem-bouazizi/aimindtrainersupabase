import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-medium mb-6">Page Not Found</h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        Oops! It seems like your brain took a wrong turn. The page you're looking for doesn't exist or has been moved.
      </p>
      <Link href="/">
        <Button>Return to Home</Button>
      </Link>
    </div>
  )
}
