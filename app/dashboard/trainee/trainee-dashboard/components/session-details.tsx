"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, User } from "lucide-react"

interface Session {
  id: number
  title: string
  time: string
  type: string
  trainer?: string
  duration: number
}

interface SessionDetailsProps {
  session: Session | null
}

export function SessionDetails({ session }: SessionDetailsProps) {
  if (!session) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Session Details</CardTitle>
          <CardDescription>Select a session from the calendar to view details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center text-gray-500 py-8">
            <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>No session selected</p>
          </div>
        </CardContent>
      </Card>
    )
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
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{session.title}</CardTitle>
            <CardDescription>Session details and options</CardDescription>
          </div>
          <Badge className={getTypeColor(session.type)}>{session.type}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-sm">
            <Clock className="h-4 w-4 text-gray-500" />
            <span>
              {session.time} ({session.duration} min)
            </span>
          </div>

          {session.trainer && (
            <div className="flex items-center space-x-2 text-sm">
              <User className="h-4 w-4 text-gray-500" />
              <span>{session.trainer}</span>
            </div>
          )}

          <div className="flex items-center space-x-2 text-sm">
            <MapPin className="h-4 w-4 text-gray-500" />
            <span>Main Gym Floor</span>
          </div>
        </div>

        <div className="pt-4 space-y-2">
          <Button className="w-full">Join Session</Button>
          <Button variant="outline" className="w-full bg-transparent">
            Reschedule
          </Button>
          <Button variant="outline" className="w-full text-red-600 hover:text-red-700 bg-transparent">
            Cancel
          </Button>
        </div>

        <div className="pt-4 border-t">
          <h4 className="font-medium mb-2">Session Notes</h4>
          <p className="text-sm text-gray-600">
            {session.type === "personal"
              ? "One-on-one training session focused on your specific goals and needs."
              : "Group session suitable for all fitness levels. Bring water and a towel."}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
