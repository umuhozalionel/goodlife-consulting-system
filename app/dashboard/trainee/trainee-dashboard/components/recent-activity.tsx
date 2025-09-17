"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, Dumbbell, Heart } from "lucide-react"

export function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: "check-in",
      title: "Gym Check-in",
      description: "Downtown Fitness Center",
      time: "2 hours ago",
      status: "completed",
      icon: CheckCircle,
    },
    {
      id: 2,
      type: "workout",
      title: "Strength Training",
      description: "Upper body focus - 45 minutes",
      time: "2 hours ago",
      status: "completed",
      icon: Dumbbell,
    },
    {
      id: 3,
      type: "cardio",
      title: "Cardio Session",
      description: "Treadmill - 30 minutes",
      time: "3 hours ago",
      status: "completed",
      icon: Heart,
    },
    {
      id: 4,
      type: "scheduled",
      title: "Personal Training",
      description: "With trainer Mike - Tomorrow 3:00 PM",
      time: "Upcoming",
      status: "scheduled",
      icon: Clock,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "scheduled":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your latest training sessions and check-ins</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = activity.icon
            return (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Icon className="h-4 w-4 text-blue-600" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                    <Badge className={getStatusColor(activity.status)}>{activity.status}</Badge>
                  </div>
                  <p className="text-sm text-gray-500">{activity.description}</p>
                  <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
