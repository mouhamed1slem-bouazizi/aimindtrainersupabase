"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export function ChallengeCard() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Don't render anything on the server
  if (!mounted) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily Challenge</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p>Complete today's special challenge to earn bonus points!</p>
        <Button onClick={() => router.push("/games/memory-match")} variant="outline" className="w-full">
          Play Memory Match
        </Button>
      </CardContent>
    </Card>
  )
}
