"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"

const workoutData = [
  { month: "Jan", workouts: 12, hours: 18 },
  { month: "Feb", workouts: 15, hours: 22 },
  { month: "Mar", workouts: 18, hours: 27 },
  { month: "Apr", workouts: 14, hours: 21 },
  { month: "May", workouts: 20, hours: 30 },
  { month: "Jun", workouts: 16, hours: 24 },
]

const strengthData = [
  { exercise: "Bench Press", weight: 135 },
  { exercise: "Squat", weight: 185 },
  { exercise: "Deadlift", weight: 225 },
  { exercise: "Overhead Press", weight: 95 },
]

export function ProgressChart() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Workout Frequency */}
      <Card>
        <CardHeader>
          <CardTitle>Workout Frequency</CardTitle>
          <CardDescription>Monthly workout sessions and total hours</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={workoutData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="workouts" stroke="#3b82f6" strokeWidth={2} name="Workouts" />
              <Line type="monotone" dataKey="hours" stroke="#10b981" strokeWidth={2} name="Hours" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Strength Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Strength Progress</CardTitle>
          <CardDescription>Current personal records (lbs)</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={strengthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="exercise" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="weight" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Body Composition */}
      <Card>
        <CardHeader>
          <CardTitle>Body Composition</CardTitle>
          <CardDescription>Weight and body fat percentage over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Current Weight</span>
              <span className="text-2xl font-bold">165 lbs</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Body Fat %</span>
              <span className="text-2xl font-bold">12.5%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Muscle Mass</span>
              <span className="text-2xl font-bold">144 lbs</span>
            </div>
            <div className="pt-4">
              <div className="text-sm text-green-600">↓ 3 lbs from last month</div>
              <div className="text-sm text-blue-600">↑ 2 lbs muscle gained</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Activity */}
      <Card>
        <CardHeader>
          <CardTitle>This Week's Activity</CardTitle>
          <CardDescription>Daily workout completion</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => (
              <div key={day} className="text-center">
                <div className="text-xs text-gray-500 mb-1">{day}</div>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                    index < 4
                      ? "bg-green-100 text-green-800"
                      : index === 4
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {index < 4 ? "✓" : index === 4 ? "•" : ""}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-sm text-gray-600">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-green-100 rounded-full"></div>
                <span>Completed</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-blue-100 rounded-full"></div>
                <span>Today</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-gray-100 rounded-full"></div>
                <span>Planned</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
