"use client"

import { useState } from "react"
import { AuthGuard } from "@/components/auth-guard"
import { DashboardHeader } from "@/components/dashboard-header"
import { TrainingCalendar } from "@/components/training-calendar"
import { SessionDetails } from "@/components/session-details"
import { ProfileEditModal } from "@/components/profile-edit-modal"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Plus } from "lucide-react"
import Link from "next/link"

export default function CalendarPage() {
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [selectedSession, setSelectedSession] = useState<any>(null)

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
                <h1 className="text-2xl font-bold text-gray-900">Training Calendar</h1>
                <p className="text-gray-600">Manage your training schedule</p>
              </div>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Book Session
            </Button>
          </div>

          {/* Calendar */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <TrainingCalendar onSessionSelect={setSelectedSession} />
            </div>
            <div className="lg:col-span-1">
              <SessionDetails session={selectedSession} />
            </div>
          </div>
        </main>

        {showProfileModal && <ProfileEditModal onClose={() => setShowProfileModal(false)} />}
      </div>
    </AuthGuard>
  )
}
