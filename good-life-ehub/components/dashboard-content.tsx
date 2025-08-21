import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Users, Gift, CheckCircle, HelpCircle, Play, Crown } from "lucide-react"

interface UserData {
  displayName: string
  progress: number
  currentPrograms: string[]
}

interface Program {
  id: string
  name: string
  description: string
  progress: number
}

interface DashboardContentProps {
  user: any
  userData: UserData
  programs: Program[]
}

export function DashboardContent({ user, userData, programs }: DashboardContentProps) {
  const featureCards = [
    { title: "Start Learning", icon: BookOpen, href: "/learning" },
    { title: "Connect to Community", icon: Users, href: "/community" },
    { title: "Earn Rewards", icon: Gift, href: "/rewards" },
    { title: "Check In", icon: CheckCircle, href: "/checkin" },
    { title: "Need Support?", icon: HelpCircle, href: "/support" },
    { title: "View My Profile", icon: Play, href: "/profile" },
  ]

  return (
    <div className="flex-1 overflow-auto">
      {/* Header */}
      <header className="bg-white shadow-sm border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Hello, {user.displayName}!</h1>
            <p className="text-gray-600 mt-1">Embrace challenges. They're opportunities for growth.</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6 space-y-8">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-lg p-8 text-white">
          <h2 className="text-3xl font-bold mb-2">Welcome to the Good life eHub</h2>
          <p className="text-indigo-100 text-lg">
            Your Learning Journey Starts Here. Trace your progress, achieve your goals.
          </p>
        </section>

        {/* Welcome Video Section */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="w-5 h-5 text-indigo-600" />
                Welcome Video
              </CardTitle>
              <CardDescription>Get started with your Good life journey by watching our welcome video</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
                <div className="text-center">
                  <Play className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Video player placeholder</p>
                  <p className="text-sm text-gray-500 mt-2">Welcome video content will be embedded here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* All Access Plus Promotion */}
        <section>
          <Card className="border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-indigo-800">
                <Crown className="w-5 h-5" />
                All Access Plus
              </CardTitle>
              <CardDescription className="text-indigo-600">
                Unlock premium content and exclusive features
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                Get unlimited access to all programs, exclusive community features, and personalized coaching support.
              </p>
              <Button className="bg-indigo-600 hover:bg-indigo-700">Choose Now</Button>
            </CardContent>
          </Card>
        </section>

        {/* Current Programs */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">Current Programs</h3>
            <Button variant="outline" className="text-indigo-600 border-indigo-600 hover:bg-indigo-50 bg-transparent">
              View More
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {programs?.map((program) => (
              <Card key={program.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{program.name}</CardTitle>
                  <CardDescription>{program.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span className="font-medium">{program.progress}%</span>
                    </div>
                    <Progress value={program.progress} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Feature Cards Grid */}
        <section>
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {featureCards.map((card) => {
              const Icon = card.icon
              return (
                <Card key={card.title} className="hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardContent className="p-6 text-center">
                    <Icon className="w-12 h-12 text-indigo-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                    <h4 className="font-semibold text-gray-900">{card.title}</h4>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>
      </main>
    </div>
  )
}
