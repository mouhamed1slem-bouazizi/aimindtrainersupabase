"use client"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import type { CognitiveDomain } from "@/types/training"
import { useRouter, useSearchParams } from "next/navigation"

export function DomainFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentDomain = searchParams.get("domain")

  const domains: CognitiveDomain[] = [
    "Memory",
    "Attention",
    "Processing Speed",
    "Reflexes",
    "Executive Control",
    "Problem-Solving",
    "Spatial Reasoning",
    "Language",
    "Numerical Skills",
    "Stress Regulation",
  ]

  const handleDomainClick = (domain: CognitiveDomain) => {
    if (currentDomain === domain) {
      router.push("/games")
    } else {
      router.push(`/games?domain=${encodeURIComponent(domain)}`)
    }
  }

  return (
    <ScrollArea className="w-full whitespace-nowrap">
      <div className="flex space-x-2 p-1">
        {domains.map((domain) => (
          <Button
            key={domain}
            variant={currentDomain === domain ? "default" : "outline"}
            size="sm"
            className="flex-shrink-0"
            onClick={() => handleDomainClick(domain)}
          >
            {domain}
          </Button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}
