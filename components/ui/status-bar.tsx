"use client"

import { useEffect, useState } from "react"
import { Battery, Signal, Wifi } from "lucide-react"

export function StatusBar() {
  const [time, setTime] = useState("")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const hours = now.getHours()
      const minutes = now.getMinutes()
      setTime(`${hours}:${minutes.toString().padStart(2, "0")}`)
    }

    updateTime()
    const interval = setInterval(updateTime, 60000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex justify-between items-center px-4 py-2 bg-background text-foreground text-xs">
      <div>{time}</div>
      <div className="flex items-center space-x-2">
        <Signal className="h-3 w-3" />
        <Wifi className="h-3 w-3" />
        <Battery className="h-3 w-3" />
      </div>
    </div>
  )
}
