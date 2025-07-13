"use client"

import Link from "next/link"
import TrainingHeader from "@/components/layout/TrainingHeader"
import Footer from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import {
  Mic,
  HeartHandshake,
  SmilePlus,
  MessageSquare,
} from "lucide-react"

export default function CommunicationTrainingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-100 via-white to-terracotta-100 px-4 py-10">
      <TrainingHeader title="Communication & Growth" />

      <div className="max-w-screen-md mx-auto space-y-12 mt-8">
        {/* 📢 Intro */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-terracotta-700">
            Communication & Personal Development Programs
          </h1>
          <p className="text-md text-gray-700">
            Empower your voice, refine your presence, and connect with purpose.
            These trainings help you grow in how you speak, lead, and support others — professionally and personally.
          </p>
        </div>

        {/* 💬 Training Cards */}
        <div className="grid gap-8 sm:grid-cols-2">
          {/* Public Speaking & Presentation */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">
            <div className="flex items-center gap-3 mb-4 text-terracotta-700">
              <Mic className="h-6 w-6" />
              <h2 className="font-semibold text-lg">Public Speaking & Presentation</h2>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Build poise and clarity in your message delivery — from small meetings to big stages.
            </p>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/signup/trainee">Register Now</Link>
            </Button>
          </div>

          {/* Counseling & Empathy Tools */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">
            <div className="flex items-center gap-3 mb-4 text-terracotta-700">
              <HeartHandshake className="h-6 w-6" />
              <h2 className="font-semibold text-lg">Counseling & Empathy Tools</h2>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Learn frameworks for support, active listening, and meaningful client engagement.
            </p>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/signup/trainee">Register Now</Link>
            </Button>
          </div>

          {/* Personal Growth & Productivity */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">
            <div className="flex items-center gap-3 mb-4 text-terracotta-700">
              <SmilePlus className="h-6 w-6" />
              <h2 className="font-semibold text-lg">Personal Growth & Productivity</h2>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Explore techniques for goal-setting, self-management, and building discipline with impact.
            </p>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/signup/trainee">Register Now</Link>
            </Button>
          </div>

          {/* Conflict Management & Dialogue */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">
            <div className="flex items-center gap-3 mb-4 text-terracotta-700">
              <MessageSquare className="h-6 w-6" />
              <h2 className="font-semibold text-lg">Conflict Management & Dialogue</h2>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Gain confidence in navigating tough conversations and building consensus in teams.
            </p>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/signup/trainee">Register Now</Link>
            </Button>
          </div>
        </div>

        {/* 🔙 Back to Home */}
        <div className="text-center pt-4">
          <Link href="/">
            <button className="text-sm text-gray-500 hover:text-green-700 transition">
              ← Back to Home
            </button>
          </Link>
        </div>
      </div>

      {/* ⬇️ Global Footer */}
      <Footer />
    </main>
  )
}