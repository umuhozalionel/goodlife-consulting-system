"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin } from "lucide-react"

export function UpcomingSessions() {
  const sessions = [
    {
      id: 1,
      title: "Personal Training",
      trainer: "Mike Johnson",
      date: "Tomorrow",
      time: "3:00 PM",
      duration: "60 min",
      location: "Downtown Fitness",
      type: "personal",
    },
    {
      id: 2,
      title: "Group Yoga",
      trainer: "Sarah Wilson",
      date: "Thursday",
      time: "6:00 PM",
      duration: "45 min",
      location: "Studio A",
      type: "group",
    },
    {
      id: 3,
      title: "Cardio Blast",
      trainer: "Alex Chen",
      date: "Friday",
      time: "7:00 AM",
      duration: "30 min",
      location: "Main Gym",
      type: "group",
    },
  ]

  const getTypeColor = (type: string) => {
    switch (type) {
      case "personal":
        return "bg-purple-100 text-purple-800"
      case "group":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Sessions</CardTitle>
        <CardDescription>Your scheduled training sessions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sessions.map((session) => (
            <div key={session.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-medium">{session.title}</h4>
                  <p className="text-sm text-muted-foreground">with {session.trainer}</p>
                </div>
                <Badge className={getTypeColor(session.type)}>{session.type}</Badge>
              </div>

              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-3 w-3" />
                  <span>{session.date}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>
                    {session.time} ({session.duration})
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                <MapPin className="h-3 w-3" />
                <span>{session.location}</span>
              </div>

              <div className="flex space-x-2 pt-2">
                <Button size="sm" variant="outline">
                  Reschedule
                </Button>
                <Button size="sm" variant="outline">
                  Cancel
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
