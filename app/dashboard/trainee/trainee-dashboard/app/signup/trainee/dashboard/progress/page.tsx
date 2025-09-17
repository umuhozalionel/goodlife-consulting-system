"use client"

import { useState } from "react"
import { AuthGuard } from "@/components/auth-guard"
import { DashboardHeader } from "@/components/dashboard-header"
import { ProgressChart } from "@/components/progress-chart"
import { WorkoutHistory } from "@/components/workout-history"
import { GoalsProgress } from "@/components/goals-progress"
import { ProfileEditModal } from "@/components/profile-edit-modal"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, TrendingUp, Target, Calendar } from "lucide-react"
import Link from "next/link"

export default function ProgressPage() {
  const [showProfileModal, setShowProfileModal] = useState(false)

  return (
    <AuthGuard requireAuth={true}>
      <div className="min-h-screen bg-gray-50">
        <DashboardHeader onProfileEdit={() => setShowProfileModal(true)} />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Link href="/signup/trainee/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Progress Tracker</h1>
                <p className="text-gray-600">Track your fitness journey and achievements</p>
              </div>
            </div>
          </div>

          {/* Progress Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Workouts</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">47</div>
                <p className="text-xs text-green-600">+12% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Hours Trained</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">68.5</div>
                <p className="text-xs text-green-600">+8% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Goals Achieved</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8/10</div>
                <p className="text-xs text-blue-600">2 goals remaining</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="charts" className="space-y-6">
            <TabsList>
              <TabsTrigger value="charts">Progress Charts</TabsTrigger>
              <TabsTrigger value="history">Workout History</TabsTrigger>
              <TabsTrigger value="goals">Goals</TabsTrigger>
            </TabsList>

            <TabsContent value="charts" className="space-y-6">
              <ProgressChart />
            </TabsContent>

            <TabsContent value="history" className="space-y-6">
              <WorkoutHistory />
            </TabsContent>

            <TabsContent value="goals" className="space-y-6">
              <GoalsProgress />
            </TabsContent>
          </Tabs>
        </main>

        {showProfileModal && <ProfileEditModal onClose={() => setShowProfileModal(false)} />}
      </div>
    </AuthGuard>
  )
}
