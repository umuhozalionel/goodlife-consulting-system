export interface Program {
  id: string
  name: string
  description: string
  progress?: number
  startDate?: string
  endDate?: string
  status?: "active" | "completed" | "upcoming"
}

export interface User {
  uid: string
  displayName: string
  email: string
}

export interface UserData {
  displayName: string
  progress: number
  currentPrograms: string[]
}
