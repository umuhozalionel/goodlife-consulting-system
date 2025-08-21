/* This component fetches data on the server. Replace placeholder functions with real Firestore queries from 'lib/firestore' */

import { Sidebar } from "@/components/sidebar"
import { Footer } from "@/components/footer"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getCurrentPrograms, getRecommendedPrograms } from "@/lib/firestore"
import { Play, Users, Gift, CheckCircle, HelpCircle, User, ArrowRight } from "lucide-react"

export default async function DashboardPage() {
  /* FIREBASE AUTH INTEGRATION POINT */
  const userName = "John Doe" // TODO: Replace with user.displayName from useAuthState()

  // FIREBASE INTEGRATION: Replace with real Firestore collection fetch
  const programs = await getCurrentPrograms()
  const recommendedPrograms = await getRecommendedPrograms()

  const actionCards = [
    {
      title: "Start Learning",
      icon: Play,
      description: "Begin your next course",
      color: "bg-indigo-50 text-indigo-600",
    },
    {
      title: "Connect to Community",
      icon: Users,
      description: "Join discussions",
      color: "bg-green-50 text-green-600",
    },
    { title: "Earn Rewards", icon: Gift, description: "Check your points", color: "bg-purple-50 text-purple-600" },
    { title: "Check In", icon: CheckCircle, description: "Daily progress", color: "bg-blue-50 text-blue-600" },
    { title: "Need Support?", icon: HelpCircle, description: "Get help", color: "bg-orange-50 text-orange-600" },
    { title: "View My Profile", icon: User, description: "Manage account", color: "bg-gray-50 text-gray-600" },
  ]

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto p-6">
          {/* User Welcome Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Hello, {userName}!</h1>
            <p className="text-lg text-gray-600 italic">"Embrace challenges. They're opportunities for growth."</p>
          </div>

          {/* Hero Section */}
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-xl p-8 text-white mb-8">
            <h2 className="text-4xl font-bold mb-4">Welcome to the Good life eHub</h2>
            <p className="text-xl text-indigo-100">
              Your gateway to personal and professional transformation through continuous learning
            </p>
          </div>

          {/* Welcome Video Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="w-5 h-5 text-indigo-600" />
                Welcome Video
              </CardTitle>
              <CardDescription>Get started with your learning journey</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                <div className="text-center">
                  <Play className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Welcome Video Placeholder</p>
                </div>
              </div>
              <p className="text-gray-600">
                Watch this introductory video to learn how to make the most of your Good life eHub experience.
              </p>
            </CardContent>
          </Card>

          {/* Promotional Banner */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 text-white mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2">Upgrade to All Access Plus</h3>
                <p className="text-purple-100">Unlock premium content, 1-on-1 mentoring, and exclusive resources</p>
              </div>
              <Button className="bg-white text-purple-600 hover:bg-gray-100">Learn More</Button>
            </div>
          </div>

          {/* Current Programs Section */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Current Programs</h3>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {programs.map((program) => (
                <Card key={program.id} className="bg-white shadow-md rounded-xl">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{program.name}</CardTitle>
                      {program.status === "completed" ? (
                        <Badge className="bg-green-100 text-green-800">Completed</Badge>
                      ) : (
                        <Badge className="bg-indigo-100 text-indigo-800">Active</Badge>
                      )}
                    </div>
                    <CardDescription>{program.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {program.progress !== undefined && program.status !== "completed" && (
                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-gray-600 mb-2">
                          <span>Progress</span>
                          <span>{program.progress}%</span>
                        </div>
                        <Progress value={program.progress} />
                      </div>
                    )}
                    {program.startDate && program.endDate && (
                      <div className="text-sm text-gray-500 mb-4">
                        {program.startDate} - {program.endDate}
                      </div>
                    )}
                    <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                      {program.status === "completed" ? "Review" : "Continue"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Recommended Programs Section */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Recommended Programs</h3>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {recommendedPrograms.map((program) => (
                <Card key={program.id} className="bg-white shadow-md rounded-xl">
                  <CardHeader>
                    <CardTitle className="text-lg">{program.name}</CardTitle>
                    <CardDescription>{program.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                      <span>Explore</span>
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Action Grid */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {actionCards.map((card) => (
                <Card
                  key={card.title}
                  className="bg-white shadow-md rounded-xl hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 rounded-lg ${card.color} flex items-center justify-center mb-4`}>
                      <card.icon className="w-6 h-6" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">{card.title}</h4>
                    <p className="text-gray-600 text-sm">{card.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </div>
  )
}
