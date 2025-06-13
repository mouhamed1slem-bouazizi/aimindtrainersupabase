"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import type { CognitiveDomain } from "@/types/training"

interface CoachMessage {
  id: string
  type: "tip" | "motivation" | "insight" | "recommendation"
  content: string
  date: string
  read: boolean
}

interface AICoachContextType {
  messages: CoachMessage[]
  insights: Record<CognitiveDomain, string[]>
  recommendations: string[]
  getMotivationalMessage: (improvement: number, domain: CognitiveDomain) => Promise<string>
  getDomainInsight: (domain: CognitiveDomain) => string
  markMessageAsRead: (id: string) => void
  generateRecommendations: (domainScores: Record<CognitiveDomain, number>) => void
}

const AICoachContext = createContext<AICoachContextType | undefined>(undefined)

export function AICoachProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<CoachMessage[]>([])
  const [insights, setInsights] = useState<Record<CognitiveDomain, string[]>>({
    Memory: [
      "Today's exercise strengthened your dorsolateral prefrontal cortex, crucial for working memory and decision-making.",
      "Memory training activates your hippocampus, which helps form and organize new memories.",
      "You're strengthening neural pathways in your medial temporal lobe, improving your ability to recall information.",
    ],
    Attention: [
      "This exercise engaged your anterior cingulate cortex, which helps you focus and ignore distractions.",
      "You've been training your parietal lobe, which helps direct attention to important stimuli.",
      "Your reticular activating system is becoming more efficient at filtering irrelevant information.",
    ],
    "Processing Speed": [
      "You're strengthening white matter pathways, which help transmit signals faster between brain regions.",
      "This exercise targets your cerebellum, which coordinates rapid cognitive processes.",
      "Your basal ganglia are becoming more efficient at processing information quickly.",
    ],
    Reflexes: [
      "Today's training enhanced your motor cortex, improving your reaction time to visual stimuli.",
      "You're strengthening connections between your visual cortex and motor neurons for faster responses.",
      "This exercise targets your cerebellum, which coordinates rapid physical responses.",
    ],
    "Executive Control": [
      "You're strengthening your prefrontal cortex, which manages complex cognitive tasks and decision-making.",
      "This exercise enhances your brain's ability to switch between tasks efficiently.",
      "Your anterior prefrontal cortex is becoming better at managing competing priorities.",
    ],
    "Problem-Solving": [
      "Today's exercise engaged your frontal lobe, which handles complex problem-solving and planning.",
      "You're strengthening connections in your parietal cortex, which helps with logical reasoning.",
      "This training enhances your brain's ability to recognize patterns and apply solutions.",
    ],
    "Spatial Reasoning": [
      "You're developing your right parietal lobe, which processes spatial relationships and mental rotation.",
      "This exercise strengthens your occipital lobe's ability to process visual-spatial information.",
      "Your hippocampus is becoming better at creating mental maps and spatial memory.",
    ],
    Language: [
      "Today's training engaged your left temporal lobe, which processes language comprehension.",
      "You're strengthening Broca's area in your frontal lobe, important for language production.",
      "This exercise enhances connections between Wernicke's area and other language centers.",
    ],
    "Numerical Skills": [
      "You're developing your intraparietal sulcus, which processes numerical quantities and comparisons.",
      "This exercise strengthens your angular gyrus, which connects numerical symbols with their meanings.",
      "Your prefrontal cortex is becoming better at manipulating numbers mentally.",
    ],
    "Stress Regulation": [
      "Today's exercise helped regulate your amygdala, which processes emotional responses to stress.",
      "You're strengthening your anterior cingulate cortex, which helps manage stress responses.",
      "This training enhances your prefrontal cortex's ability to regulate emotional reactions.",
    ],
  })
  const [recommendations, setRecommendations] = useState<string[]>([
    "Based on your progress, try focusing on Memory games to balance your cognitive training.",
    "Your Attention skills are improving rapidly. Challenge yourself with harder difficulty levels.",
    "To maximize improvement, alternate between Reflex and Processing Speed games this week.",
  ])

  // Load initial messages
  useEffect(() => {
    const initialMessages: CoachMessage[] = [
      {
        id: "msg-1",
        type: "motivation",
        content: "Great job on improving your reaction time by 15%! Your consistent practice is paying off.",
        date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        read: false,
      },
      {
        id: "msg-2",
        type: "recommendation",
        content:
          "I've noticed you excel at memory games. Try challenging yourself with the Pattern Solver game to develop complementary skills.",
        date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        read: true,
      },
      {
        id: "msg-3",
        type: "insight",
        content:
          "Your training in spatial reasoning is strengthening connections in your parietal lobe, which also helps with mathematical thinking.",
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        read: true,
      },
    ]

    setMessages(initialMessages)
  }, [])

  const getMotivationalMessage = async (improvement: number, domain: CognitiveDomain): Promise<string> => {
    // In a real app, this would call the Pollinations API
    // For demo purposes, we'll return a predefined message based on the improvement

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    const messages = [
      `Impressive! Your ${domain} skills improved by ${improvement}%. Keep up this momentum!`,
      `You've made significant progress in ${domain}, with a ${improvement}% improvement. Your brain is getting stronger every day.`,
      `Your dedication to training ${domain} is paying off with a ${improvement}% improvement. That's the power of neuroplasticity in action!`,
      `Great work! A ${improvement}% improvement in ${domain} shows your brain is forming stronger neural connections.`,
    ]

    const message = messages[Math.floor(Math.random() * messages.length)]

    // Add to messages
    const newMessage: CoachMessage = {
      id: `msg-${Date.now()}`,
      type: "motivation",
      content: message,
      date: new Date().toISOString(),
      read: false,
    }

    setMessages((prev) => [newMessage, ...prev])

    return message
  }

  const getDomainInsight = (domain: CognitiveDomain): string => {
    const domainInsights = insights[domain] || []
    return (
      domainInsights[Math.floor(Math.random() * domainInsights.length)] ||
      "This exercise strengthens neural pathways related to cognitive processing."
    )
  }

  const markMessageAsRead = (id: string) => {
    setMessages((prev) => prev.map((msg) => (msg.id === id ? { ...msg, read: true } : msg)))
  }

  const generateRecommendations = (domainScores: Record<CognitiveDomain, number>) => {
    // Find weakest and strongest domains
    const domains = Object.keys(domainScores) as CognitiveDomain[]
    const sortedDomains = [...domains].sort((a, b) => domainScores[a] - domainScores[b])

    const weakestDomain = sortedDomains[0]
    const strongestDomain = sortedDomains[sortedDomains.length - 1]

    const newRecommendations = [
      `Focus on ${weakestDomain} games to improve your weakest cognitive area.`,
      `Your ${strongestDomain} skills are impressive! Try applying these strengths to ${sortedDomains[1]} games.`,
      `For balanced cognitive development, alternate between ${weakestDomain} and ${sortedDomains[1]} training.`,
    ]

    setRecommendations(newRecommendations)

    // Add recommendation message
    const newMessage: CoachMessage = {
      id: `msg-${Date.now()}`,
      type: "recommendation",
      content: newRecommendations[0],
      date: new Date().toISOString(),
      read: false,
    }

    setMessages((prev) => [newMessage, ...prev])
  }

  return (
    <AICoachContext.Provider
      value={{
        messages,
        insights,
        recommendations,
        getMotivationalMessage,
        getDomainInsight,
        markMessageAsRead,
        generateRecommendations,
      }}
    >
      {children}
    </AICoachContext.Provider>
  )
}

export function useAICoach() {
  const context = useContext(AICoachContext)
  if (context === undefined) {
    throw new Error("useAICoach must be used within an AICoachProvider")
  }
  return context
}
