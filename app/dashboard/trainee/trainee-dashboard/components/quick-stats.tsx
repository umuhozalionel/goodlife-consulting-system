"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Calendar, Clock } from "lucide-react"

export function QuickStats() {
  const stats = [
    {
      title: "Sessions This Week",
      value: "4",
      change: "+2 from last week",
      trend: "up",
      icon: Calendar,
    },
    {
      title: "Total Hours",
      value: "12.5",
      change: "+3.2 from last week",
      trend: "up",
      icon: Clock,
    },
    {
      title: "Avg Session Time",
      value: "1.8h",
      change: "-0.2 from last week",
      trend: "down",
      icon: TrendingUp,
    },
    {
      title: "Check-in Streak",
      value: "6 days",
      change: "Personal best!",
      trend: "up",
      icon: TrendingUp,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                {stat.trend === "up" ? (
                  <TrendingUp className="inline h-3 w-3 mr-1" />
                ) : (
                  <TrendingDown className="inline h-3 w-3 mr-1" />
                )}
                {stat.change}
              </p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
