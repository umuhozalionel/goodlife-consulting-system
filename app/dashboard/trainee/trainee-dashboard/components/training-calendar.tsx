"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Session {
  id: number
  title: string
  time: string
  type: string
  trainer?: string
  duration: number
}

interface CalendarDay {
  date: number
  isCurrentMonth: boolean
  sessions: Session[]
}

interface TrainingCalendarProps {
  onSessionSelect: (session: Session) => void
}

export function TrainingCalendar({ onSessionSelect }: TrainingCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())

  // Mock calendar data
  const generateCalendarDays = (): CalendarDay[] => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())

    const days: CalendarDay[] = []
    const currentDateObj = new Date(startDate)

    for (let i = 0; i < 42; i++) {
      const isCurrentMonth = currentDateObj.getMonth() === month
      const sessions: Session[] = []

      // Mock sessions for certain dates
      if (isCurrentMonth && [5, 7, 12, 14, 19, 21, 26, 28].includes(currentDateObj.getDate())) {
        sessions.push({
          id: Math.random(),
          title: "Personal Training",
          time: "3:00 PM",
          type: "personal",
          trainer: "Mike Johnson",
          duration: 60,
        })
      }

      if (isCurrentMonth && [3, 10, 17, 24, 31].includes(currentDateObj.getDate())) {
        sessions.push({
          id: Math.random(),
          title: "Group Yoga",
          time: "6:00 PM",
          type: "group",
          trainer: "Sarah Wilson",
          duration: 45,
        })
      }

      days.push({
        date: currentDateObj.getDate(),
        isCurrentMonth,
        sessions,
      })

      currentDateObj.setDate(currentDateObj.getDate() + 1)
    }

    return days
  }

  const calendarDays = generateCalendarDays()
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const navigateMonth = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate)
    if (direction === "prev") {
      newDate.setMonth(newDate.getMonth() - 1)
    } else {
      newDate.setMonth(newDate.getMonth() + 1)
    }
    setCurrentDate(newDate)
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "personal":
        return "bg-purple-100 text-purple-800"
      case "group":
        return "bg-green-100 text-green-800"
      default:
        return "bg-blue-100 text-blue-800"
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </CardTitle>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={() => navigateMonth("prev")}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => navigateMonth("next")}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1 mb-4">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((day, index) => (
            <div
              key={index}
              className={`min-h-[100px] p-2 border rounded-lg ${
                day.isCurrentMonth ? "bg-white" : "bg-gray-50"
              } ${day.date === new Date().getDate() && day.isCurrentMonth ? "ring-2 ring-blue-500" : ""}`}
            >
              <div className={`text-sm font-medium mb-1 ${day.isCurrentMonth ? "text-gray-900" : "text-gray-400"}`}>
                {day.date}
              </div>
              <div className="space-y-1">
                {day.sessions.map((session) => (
                  <button key={session.id} onClick={() => onSessionSelect(session)} className="w-full text-left">
                    <Badge className={`${getTypeColor(session.type)} text-xs px-1 py-0.5 w-full`}>{session.time}</Badge>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
