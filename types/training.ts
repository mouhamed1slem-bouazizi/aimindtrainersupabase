export type CognitiveDomain =
  | "Memory"
  | "Attention"
  | "Processing Speed"
  | "Reflexes"
  | "Executive Control"
  | "Problem-Solving"
  | "Spatial Reasoning"
  | "Language"
  | "Numerical Skills"
  | "Stress Regulation"

export type GameDifficulty = "easy" | "medium" | "hard"

export interface GameSession {
  gameId: string
  domain: CognitiveDomain
  score: number
  duration: number
  difficulty: GameDifficulty
  improvement?: number
  timestamp: string
}

export interface GameHistory {
  date: string
  score: number
  duration: number
  difficulty: GameDifficulty
  domain: CognitiveDomain
}

export interface GameStats {
  bestScore: number
  averageScore: number
  totalSessions: number
  improvement: number
  lastPlayed: string
}

export interface TrainingPlanGame {
  id: string
  name: string
  domain: CognitiveDomain
  duration: number
  completed: boolean
}

export interface TrainingPlanDay {
  day: number
  date: string
  games: TrainingPlanGame[]
  completed: boolean
}

export interface TrainingPlan {
  days: TrainingPlanDay[]
  currentDay: number
}

export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  unlockedAt?: string
  progress?: number
  target?: number
}
