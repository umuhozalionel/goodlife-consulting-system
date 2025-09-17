"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dumbbell, Heart, Clock, Calendar } from "lucide-react"

const workoutHistory = [
  {
    id: 1,
    date: "2024-01-15",
    type: "Strength Training",
    duration: 75,
    exercises: ["Bench Press", "Squats", "Deadlifts", "Pull-ups"],
    calories: 320,
    notes: "Great session, increased weight on bench press",
    icon: Dumbbell,
  },
  {
    id: 2,
    date: "2024-01-13",
    type: "Cardio",
    duration: 45,
    exercises: ["Treadmill", "Rowing Machine"],
    calories: 280,
    notes: "Steady pace, felt good throughout",
    icon: Heart,
  },
  {
    id: 3,
    date: "2024-01-11",
    type: "Full Body",
    duration: 90,
    exercises: ["Squats", "Push-ups", "Planks", "Burpees"],
    calories: 410,
    notes: "Challenging workout, pushed through fatigue",
    icon: Dumbbell,
  },
  {
    id: 4,
    date: "2024-01-09",
    type: "Yoga",
    duration: 60,
    exercises: ["Sun Salutations", "Warrior Poses", "Meditation"],
    calories: 150,
    notes: "Relaxing session, improved flexibility",
    icon: Heart,
  },
]

export function WorkoutHistory() {
  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "strength training":
        return "bg-purple-100 text-purple-800"
      case "cardio":
        return "bg-red-100 text-red-800"
      case "full body":
        return "bg-blue-100 text-blue-800"
      case "yoga":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Workout History</CardTitle>
        <CardDescription>Your recent training sessions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {workoutHistory.map((workout) => {
            const Icon = workout.icon
            return (
              <div key={workout.id} className="border rounded-lg p-4 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Icon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">{workout.type}</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(workout.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{workout.duration} min</span>
                        </div>
                        <span>{workout.calories} cal</span>
                      </div>
                    </div>
                  </div>
                  <Badge className={getTypeColor(workout.type)}>{workout.type}</Badge>
                </div>

                <div>
                  <h5 className="text-sm font-medium mb-2">Exercises</h5>
                  <div className="flex flex-wrap gap-2">
                    {workout.exercises.map((exercise, index) => (
                      <Badge key={index} variant="outline">
                        {exercise}
                      </Badge>
                    ))}
                  </div>
                </div>

                {workout.notes && (
                  <div>
                    <h5 className="text-sm font-medium mb-1">Notes</h5>
                    <p className="text-sm text-gray-600">{workout.notes}</p>
                  </div>
                )}

                <div className="flex justify-end">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
