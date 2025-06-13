"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Send, Lightbulb } from "lucide-react"
import { useAICoach } from "@/context/ai-coach-context"
import { useTraining } from "@/context/training-context"
import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import Link from "next/link"

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
}

export default function CoachPage() {
  const { recommendations, messages: coachMessages, insights } = useAICoach()
  const { domainScores } = useTraining()

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hello! I'm your AI cognitive coach. How can I help you today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ])

  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const handleSendMessage = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponses = [
        "Based on your recent progress, I recommend focusing on memory games to strengthen that cognitive domain.",
        "Your attention skills have improved significantly! Keep up the good work.",
        "I notice you haven't trained your processing speed recently. Would you like to try a game that targets that?",
        "Your cognitive profile shows strengths in problem-solving but could use more work on reflexes.",
        "Regular training in multiple domains leads to better overall cognitive health. Try mixing up your game selection.",
      ]

      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        content: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        sender: "ai",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  return (
    <div className="container px-4 py-6 space-y-6 flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex items-center">
        <Link href="/">
          <Button variant="ghost" size="icon" className="mr-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">AI Coach</h1>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 pb-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
              }`}
            >
              {message.sender === "ai" && (
                <div className="flex items-center mb-1">
                  <Avatar className="h-6 w-6 mr-2">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="AI Coach" />
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                  <span className="text-xs font-medium">AI Coach</span>
                </div>
              )}
              <p className="text-sm">{message.content}</p>
              <p className="text-xs opacity-70 mt-1 text-right">
                {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-lg p-3 bg-muted">
              <div className="flex items-center">
                <Avatar className="h-6 w-6 mr-2">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="AI Coach" />
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="border-t pt-4">
        <Card className="mb-4">
          <CardHeader className="p-3 pb-0">
            <CardTitle className="text-sm flex items-center">
              <Lightbulb className="h-4 w-4 mr-2 text-yellow-500" />
              Suggested Questions
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 pt-2">
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => {
                  setInput("How can I improve my memory?")
                }}
              >
                How can I improve my memory?
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => {
                  setInput("What games are best for attention?")
                }}
              >
                What games are best for attention?
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => {
                  setInput("Create a personalized training plan")
                }}
              >
                Create a personalized training plan
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="flex space-x-2">
          <Input
            placeholder="Ask your AI coach..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage()
              }
            }}
          />
          <Button size="icon" onClick={handleSendMessage}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <style jsx>{`
        .typing-indicator {
          display: flex;
          align-items: center;
        }
        
        .typing-indicator span {
          height: 8px;
          width: 8px;
          margin: 0 1px;
          background-color: #888;
          border-radius: 50%;
          display: inline-block;
          opacity: 0.4;
          animation: typing 1s infinite ease-in-out;
        }
        
        .typing-indicator span:nth-child(1) {
          animation-delay: 0s;
        }
        
        .typing-indicator span:nth-child(2) {
          animation-delay: 0.2s;
        }
        
        .typing-indicator span:nth-child(3) {
          animation-delay: 0.4s;
        }
        
        @keyframes typing {
          0% {
            transform: translateY(0px);
            opacity: 0.4;
          }
          50% {
            transform: translateY(-5px);
            opacity: 0.8;
          }
          100% {
            transform: translateY(0px);
            opacity: 0.4;
          }
        }
      `}</style>
    </div>
  )
}
