"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Monitor, Filter } from "lucide-react"

const upcomingTrainings = [
  {
    id: 1,
    title: "Leadership Excellence Workshop",
    date: "2025-01-15",
    time: "09:00 - 17:00",
    location: "Kigali Convention Centre",
    mode: "Physical",
    category: "Leadership",
    spots: 12,
  },
  {
    id: 2,
    title: "Digital Marketing Fundamentals",
    date: "2025-01-20",
    time: "14:00 - 16:00",
    location: "Online Platform",
    mode: "Online",
    category: "Digital",
    spots: 25,
  },
  {
    id: 3,
    title: "Public Speaking Mastery",
    date: "2025-01-25",
    time: "10:00 - 15:00",
    location: "Goodlife Training Center",
    mode: "Physical",
    category: "Communication",
    spots: 8,
  },
  {
    id: 4,
    title: "Financial Literacy for Professionals",
    date: "2025-02-01",
    time: "09:00 - 12:00",
    location: "Online Platform",
    mode: "Online",
    category: "Finance",
    spots: 30,
  },
  {
    id: 5,
    title: "Project Management Certification Prep",
    date: "2025-02-05",
    time: "08:00 - 18:00",
    location: "Kigali Business Center",
    mode: "Physical",
    category: "Leadership",
    spots: 15,
  },
  {
    id: 6,
    title: "AI Tools for Report Writing",
    date: "2025-02-10",
    time: "15:00 - 17:00",
    location: "Online Platform",
    mode: "Online",
    category: "Digital",
    spots: 40,
  },
]

const categories = ["All", "Leadership", "Digital", "Communication", "Finance"]

export default function CalendarSection() {
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredTrainings =
    selectedCategory === "All"
      ? upcomingTrainings
      : upcomingTrainings.filter((training) => training.category === selectedCategory)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <section id="calendar" className="py-20 bg-gradient-to-br from-gray-50 to-terracotta-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Upcoming Training Calendar
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-terracotta-500 to-forest-500 mx-auto rounded-full mb-8" />
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Join our upcoming training sessions and take the next step in your professional development journey.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <Filter className="h-5 w-5 text-gray-500 mr-2 mt-2" />
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full ${
                selectedCategory === category
                  ? "bg-terracotta-600 hover:bg-terracotta-700 text-white"
                  : "border-terracotta-200 text-terracotta-700 hover:bg-terracotta-50"
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Training Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTrainings.map((training) => (
            <Card
              key={training.id}
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-2">
                  <Badge
                    variant="secondary"
                    className={`${
                      training.mode === "Online"
                        ? "bg-forest-100 text-forest-800"
                        : "bg-terracotta-100 text-terracotta-800"
                    }`}
                  >
                    {training.mode === "Online" ? (
                      <Monitor className="h-3 w-3 mr-1" />
                    ) : (
                      <MapPin className="h-3 w-3 mr-1" />
                    )}
                    {training.mode}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {training.spots} spots left
                  </Badge>
                </div>
                <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-terracotta-600 transition-colors">
                  {training.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-4 w-4 mr-2 text-terracotta-500" />
                    <span className="text-sm font-medium">{formatDate(training.date)}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <div className="h-4 w-4 mr-2 flex items-center justify-center">
                      <div className="h-2 w-2 bg-forest-500 rounded-full" />
                    </div>
                    <span className="text-sm">{training.time}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    {training.mode === "Online" ? (
                      <Monitor className="h-4 w-4 mr-2 text-forest-500" />
                    ) : (
                      <MapPin className="h-4 w-4 mr-2 text-terracotta-500" />
                    )}
                    <span className="text-sm">{training.location}</span>
                  </div>
                </div>

                {/* Register Button redirects to /register */}
                <Link href="/register">
                  <Button className="w-full bg-gradient-to-r from-terracotta-600 to-forest-600 hover:from-terracotta-700 hover:to-forest-700 text-white rounded-full font-semibold transition-all duration-300">
                    Register Now
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}