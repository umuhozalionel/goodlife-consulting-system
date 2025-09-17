"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Target, Plus, CheckCircle } from "lucide-react"

const goals = [
  {
    id: 1,
    title: "Lose 10 pounds",
    description: "Target weight: 155 lbs",
    progress: 70,
    current: "7 lbs lost",
    target: "10 lbs",
    deadline: "March 2024",
    status: "in-progress",
  },
  {
    id: 2,
    title: "Bench Press 150 lbs",
    description: "Increase bench press strength",
    progress: 90,
    current: "135 lbs",
    target: "150 lbs",
    deadline: "February 2024",
    status: "in-progress",
  },
  {
    id: 3,
    title: "Run 5K under 25 minutes",
    description: "Improve cardiovascular endurance",
    progress: 100,
    current: "24:30",
    target: "25:00",
    deadline: "January 2024",
    status: "completed",
  },
  {
    id: 4,
    title: "Attend 20 sessions this month",
    description: "Consistency goal",
    progress: 60,
    current: "12 sessions",
    target: "20 sessions",
    deadline: "End of month",
    status: "in-progress",
  },
]

export function GoalsProgress() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "overdue":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Fitness Goals</h2>
          <p className="text-sm text-gray-600">Track your progress towards your fitness objectives</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Goal
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {goals.map((goal) => (
          <Card key={goal.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    {goal.status === "completed" ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <Target className="h-4 w-4 text-blue-600" />
                    )}
                  </div>
                  <div>
                    <CardTitle className="text-base">{goal.title}</CardTitle>
                    <CardDescription>{goal.description}</CardDescription>
                  </div>
                </div>
                <Badge className={getStatusColor(goal.status)}>{goal.status}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Progress</span>
                  <span>{goal.progress}%</span>
                </div>
                <Progress value={goal.progress} className="h-2" />
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Current</span>
                  <div className="font-medium">{goal.current}</div>
                </div>
                <div>
                  <span className="text-gray-500">Target</span>
                  <div className="font-medium">{goal.target}</div>
                </div>
              </div>

              <div className="text-sm text-gray-500">
                <span>Deadline: {goal.deadline}</span>
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  Edit
                </Button>
                {goal.status !== "completed" && (
                  <Button variant="outline" size="sm">
                    Update Progress
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
