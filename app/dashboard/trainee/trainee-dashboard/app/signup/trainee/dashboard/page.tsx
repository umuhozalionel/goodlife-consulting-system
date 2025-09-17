"use client"

import { useState } from "react"
import { AuthGuard } from "@/components/auth-guard"
import { DashboardHeader } from "@/components/dashboard-header"
import { QRCheckIn } from "@/components/qr-check-in"
import { QuickStats } from "@/components/quick-stats"
import { RecentActivity } from "@/components/recent-activity"
import { UpcomingSessions } from "@/components/upcoming-sessions"
import { ProfileEditModal } from "@/components/profile-edit-modal"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { QrCode, Calendar, TrendingUp, User } from "lucide-react"

export default function TraineeDashboard() {
  const [showQRScanner, setShowQRScanner] = useState(false)
  const [showProfileModal, setShowProfileModal] = useState(false)

  return (
    <AuthGuard requireAuth={true}>
      <div className="min-h-screen bg-gray-50">
        <DashboardHeader onProfileEdit={() => setShowProfileModal(true)} />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Button
              onClick={() => setShowQRScanner(true)}
              className="h-20 flex flex-col items-center justify-center space-y-2"
            >
              <QrCode className="h-6 w-6" />
              <span>Check In</span>
            </Button>

            <Button
              variant="outline"
              className="h-20 flex flex-col items-center justify-center space-y-2 bg-transparent"
            >
              <Calendar className="h-6 w-6" />
              <span>Schedule</span>
            </Button>

            <Button
              variant="outline"
              className="h-20 flex flex-col items-center justify-center space-y-2 bg-transparent"
            >
              <TrendingUp className="h-6 w-6" />
              <span>Progress</span>
            </Button>

            <Button
              variant="outline"
              onClick={() => setShowProfileModal(true)}
              className="h-20 flex flex-col items-center justify-center space-y-2"
            >
              <User className="h-6 w-6" />
              <span>Profile</span>
            </Button>
          </div>

          {/* Stats Overview */}
          <QuickStats />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              <RecentActivity />

              <Card>
                <CardHeader>
                  <CardTitle>Training Recommendations</CardTitle>
                  <CardDescription>Personalized suggestions based on your progress</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-medium">Focus on Cardio</h4>
                        <p className="text-sm text-muted-foreground">
                          Your endurance metrics suggest increasing cardio sessions by 20%
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-medium">Strength Training</h4>
                        <p className="text-sm text-muted-foreground">
                          Great progress! Continue with current strength routine
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-medium">Recovery Time</h4>
                        <p className="text-sm text-muted-foreground">
                          Consider adding more rest days between intense sessions
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <UpcomingSessions />

              <Card>
                <CardHeader>
                  <CardTitle>Weekly Goals</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Workouts</span>
                        <span>4/5</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: "80%" }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Cardio Hours</span>
                        <span>3.5/4</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: "87.5%" }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Check-ins</span>
                        <span>6/7</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-600 h-2 rounded-full" style={{ width: "85.7%" }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>

        {/* Modals */}
        {showQRScanner && <QRCheckIn onClose={() => setShowQRScanner(false)} />}

        {showProfileModal && <ProfileEditModal onClose={() => setShowProfileModal(false)} />}
      </div>
    </AuthGuard>
  )
}
